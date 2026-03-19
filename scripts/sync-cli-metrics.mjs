import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const clisPath = resolve(root, "src/content/clis.json");
const metricsPath = resolve(root, "src/content/cli-metrics.json");

const clis = JSON.parse(readFileSync(clisPath, "utf8"));

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

function inferNpmPackage(cli) {
  if (cli.packageName) {
    return cli.packageName;
  }

  if (cli.installWith !== "npm") {
    return null;
  }

  const tokens = cli.installCommand.split(/\s+/).filter(Boolean);
  const packages = tokens.filter(
    (token) =>
      ![
        "npm",
        "i",
        "install",
        "-g",
        "--global",
        "-D",
        "--save-dev",
        "&&",
      ].includes(token) && !token.startsWith("http"),
  );

  return packages.length === 1 ? packages[0] : null;
}

function inferBrewFormula(cli) {
  if (cli.installWith !== "brew") {
    return null;
  }

  const match = cli.installCommand.match(/brew install(?: --cask)?\s+([^\s]+)/);
  if (!match) {
    return null;
  }

  const token = match[1];
  return token.split("/").pop() ?? null;
}

function inferCargoCrate(cli) {
  if (cli.installWith !== "cargo") {
    return null;
  }

  const match = cli.installCommand.match(/cargo install\s+([^\s]+)/);
  return match?.[1] ?? null;
}

async function fetchGitHubMetrics(repo) {
  const data = await fetchJson(`https://api.github.com/repos/${repo}`, { headers: githubHeaders });
  if (!data) {
    return {
      githubStars: null,
      latestRelease: null,
      license: null,
    };
  }

  return {
    githubStars: typeof data.stargazers_count === "number" ? data.stargazers_count : null,
    latestRelease: typeof data.pushed_at === "string" ? data.pushed_at : null,
    license: typeof data.license?.spdx_id === "string" ? data.license.spdx_id : null,
  };
}

async function fetchNpmMetric(packageName) {
  const encoded = encodeURIComponent(packageName);
  const data = await fetchJson(`https://api.npmjs.org/downloads/point/last-week/${encoded}`);
  if (!data || typeof data.downloads !== "number") {
    return null;
  }

  return {
    metricLabel: "npm weekly downloads",
    metricValue: data.downloads,
    metricSource: "npm",
  };
}

async function fetchBrewMetric(formula) {
  const data = await fetchJson(`https://formulae.brew.sh/api/formula/${formula}.json`);
  const installs = data?.analytics?.install?.["30d"]?.[formula];

  if (typeof installs !== "number") {
    return null;
  }

  return {
    metricLabel: "Homebrew installs (30d)",
    metricValue: installs,
    metricSource: "homebrew",
  };
}

async function fetchCrateMetric(crate) {
  const data = await fetchJson(`https://crates.io/api/v1/crates/${crate}`);
  const downloads = data?.crate?.recent_downloads;

  if (typeof downloads !== "number") {
    return null;
  }

  return {
    metricLabel: "crates recent downloads",
    metricValue: downloads,
    metricSource: "crates.io",
  };
}

async function buildMetric(cli) {
  const github = await fetchGitHubMetrics(cli.githubRepo);
  let metric = null;

  const npmPackage = inferNpmPackage(cli);
  const brewFormula = inferBrewFormula(cli);
  const cargoCrate = inferCargoCrate(cli);

  if (npmPackage) {
    metric = await fetchNpmMetric(npmPackage);
  }

  if (!metric && brewFormula) {
    metric = await fetchBrewMetric(brewFormula);
  }

  if (!metric && cargoCrate) {
    metric = await fetchCrateMetric(cargoCrate);
  }

  return {
    githubStars: github.githubStars,
    latestRelease: github.latestRelease,
    license: github.license,
    metricLabel: metric?.metricLabel ?? null,
    metricValue: metric?.metricValue ?? null,
    metricSource: metric?.metricSource ?? null,
    metricAsOf: new Date().toISOString(),
  };
}

async function main() {
  const metrics = {};

  for (const cli of clis) {
    process.stdout.write(`Syncing ${cli.slug}...\n`);
    metrics[cli.slug] = await buildMetric(cli);
  }

  mkdirSync(dirname(metricsPath), { recursive: true });
  writeFileSync(metricsPath, `${JSON.stringify(metrics, null, 2)}\n`);
  process.stdout.write(`\nSaved metrics to ${metricsPath}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
