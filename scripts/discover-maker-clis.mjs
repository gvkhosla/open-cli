import { execSync } from "node:child_process";

const maker = process.argv[2];

if (!maker) {
  console.error("Usage: node scripts/discover-maker-clis.mjs <github-username>");
  process.exit(1);
}

function getGitHubToken() {
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }

  try {
    return execSync("gh auth token", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

const githubToken = getGitHubToken();
const githubHeaders = {
  Accept: "application/vnd.github+json",
  ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
};

async function fetchJson(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

function repoLooksCli(repo) {
  const haystack = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
  const signals = ["cli", "ctl", "command", "terminal", "shell", "tui", "agent", "mcp", "tool"];
  return signals.some((signal) => haystack.includes(signal));
}

function packageLooksCli(pkg) {
  const haystack = `${pkg.package.name} ${pkg.package.description ?? ""}`.toLowerCase();
  const signals = ["cli", "command", "terminal", "shell", "agent", "mcp", "tool"];
  return signals.some((signal) => haystack.includes(signal));
}

async function main() {
  const repos = (await fetchJson(`https://api.github.com/users/${maker}/repos?per_page=100`, { headers: githubHeaders })) ?? [];
  const npmMaintainer =
    (await fetchJson(`https://registry.npmjs.org/-/v1/search?text=maintainer:${encodeURIComponent(maker)}&size=50`))?.objects ?? [];
  const npmBroad = (await fetchJson(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(maker)}&size=50`))?.objects ?? [];

  const repoCandidates = repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      updatedAt: repo.pushed_at,
      cliLike: repoLooksCli(repo),
    }))
    .sort((a, b) => Number(b.cliLike) - Number(a.cliLike) || b.stars - a.stars)
    .slice(0, 25);

  const packageCandidates = [...npmMaintainer, ...npmBroad]
    .filter((item, index, array) => array.findIndex((candidate) => candidate.package.name === item.package.name) === index)
    .map((item) => ({
      name: item.package.name,
      description: item.package.description,
      weeklyDownloads: item.downloads?.weekly ?? null,
      npm: item.package.links?.npm,
      repository: item.package.links?.repository,
      cliLike: packageLooksCli(item),
    }))
    .sort((a, b) => Number(b.cliLike) - Number(a.cliLike) || (b.weeklyDownloads ?? 0) - (a.weeklyDownloads ?? 0))
    .slice(0, 25);

  console.log(
    JSON.stringify(
      {
        maker,
        repoCandidates,
        packageCandidates,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
