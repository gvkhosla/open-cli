import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const clisPath = resolve(root, "src/content/clis.json");
const metricsPath = resolve(root, "src/content/cli-metrics.json");
const userAgent = "open-cli-metrics/0.1 (+https://opencli.co)";

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
  "User-Agent": userAgent,
  ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
};

async function fetchJson(url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "User-Agent": userAgent,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

function inferNpmPackage(cli) {
  if (cli.npmPackage) {
    return cli.npmPackage;
  }

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

function inferCargoCrate(cli) {
  if (cli.crateName) {
    return cli.crateName;
  }

  const cargoCommand = cli.installCommand.match(/cargo install\s+([^\s]+)/);
  return cargoCommand?.[1] ?? null;
}

function extractBrewInstall(cli) {
  if (cli.brewCask) {
    return { kind: "cask", token: cli.brewCask };
  }

  if (cli.brewFormula) {
    return { kind: "formula", token: cli.brewFormula };
  }

  const match = cli.installCommand.match(/brew install(\s+--cask)?\s+([^\s]+)/);
  if (!match) {
    return null;
  }

  return {
    kind: match[1] ? "cask" : null,
    token: match[2].split("/").pop() ?? null,
  };
}

let brewIndexPromise = null;

function addBrewLookup(map, key, value) {
  if (key) {
    map.set(key.toLowerCase(), value);
  }
}

async function getBrewIndex() {
  if (!brewIndexPromise) {
    brewIndexPromise = (async () => {
      const [formulae, casks] = await Promise.all([
        fetchJson("https://formulae.brew.sh/api/formula.json"),
        fetchJson("https://formulae.brew.sh/api/cask.json"),
      ]);

      const formula = new Map();
      const cask = new Map();

      for (const item of formulae ?? []) {
        const entry = { kind: "formula", token: item.name };
        addBrewLookup(formula, item.name, entry);
        addBrewLookup(formula, item.full_name, entry);
        for (const alias of item.aliases ?? []) addBrewLookup(formula, alias, entry);
        for (const oldName of item.oldnames ?? []) addBrewLookup(formula, oldName, entry);
      }

      for (const item of casks ?? []) {
        const entry = { kind: "cask", token: item.token };
        addBrewLookup(cask, item.token, entry);
        addBrewLookup(cask, item.full_token, entry);
        for (const oldToken of item.old_tokens ?? []) addBrewLookup(cask, oldToken, entry);
      }

      return { formula, cask };
    })();
  }

  return brewIndexPromise;
}

async function resolveBrewPackage(cli) {
  const candidate = extractBrewInstall(cli);
  if (!candidate?.token) {
    return null;
  }

  const index = await getBrewIndex();
  const key = candidate.token.toLowerCase();

  if (candidate.kind === "formula") {
    return index.formula.get(key) ?? { kind: "formula", token: candidate.token };
  }

  if (candidate.kind === "cask") {
    return index.cask.get(key) ?? { kind: "cask", token: candidate.token };
  }

  return index.formula.get(key) ?? index.cask.get(key) ?? { kind: "formula", token: candidate.token };
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

async function fetchBrewMetric(pkg) {
  const endpoint =
    pkg.kind === "cask"
      ? `https://formulae.brew.sh/api/cask/${pkg.token}.json`
      : `https://formulae.brew.sh/api/formula/${pkg.token}.json`;

  const data = await fetchJson(endpoint);
  if (!data) {
    return null;
  }

  const analyticsKey = pkg.kind === "cask" ? data.token ?? pkg.token : data.name ?? pkg.token;
  const installs =
    data?.analytics?.install?.["30d"]?.[analyticsKey] ??
    data?.analytics?.install_on_request?.["30d"]?.[analyticsKey];

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

async function fetchPyPiMetric(packageName) {
  const encoded = encodeURIComponent(packageName);
  const data = await fetchJson(`https://pypistats.org/api/packages/${encoded}/recent`);
  const downloads = data?.data?.last_week;

  if (typeof downloads !== "number") {
    return null;
  }

  return {
    metricLabel: "PyPI weekly downloads",
    metricValue: downloads,
    metricSource: "pypistats",
  };
}

async function fetchDockerMetric(image) {
  const encoded = image.split("/").map(encodeURIComponent).join("/");
  const data = await fetchJson(`https://hub.docker.com/v2/repositories/${encoded}/`);
  const pulls = data?.pull_count;

  if (typeof pulls !== "number") {
    return null;
  }

  return {
    metricLabel: "Docker pulls",
    metricValue: pulls,
    metricSource: "docker-hub",
  };
}

async function fetchGitHubReleaseMetric(repo) {
  const releases = await fetchJson(`https://api.github.com/repos/${repo}/releases?per_page=10`, { headers: githubHeaders });
  if (!Array.isArray(releases)) {
    return null;
  }

  const release = releases.find(
    (item) => !item?.draft && !item?.prerelease && Array.isArray(item?.assets) && item.assets.length > 0,
  );

  if (!release) {
    return null;
  }

  const downloads = release.assets.reduce((sum, asset) => sum + (asset?.download_count ?? 0), 0);
  if (downloads <= 0) {
    return null;
  }

  return {
    metricLabel: "GitHub release downloads (latest)",
    metricValue: downloads,
    metricSource: "github",
  };
}

async function buildMetric(cli) {
  const github = await fetchGitHubMetrics(cli.githubRepo);
  let metric = null;

  const npmPackage = inferNpmPackage(cli);
  const brewPackage = await resolveBrewPackage(cli);
  const cargoCrate = inferCargoCrate(cli);
  const pypiPackage = cli.pypiPackage ?? null;
  const dockerImage = cli.dockerImage ?? null;

  if (npmPackage) {
    metric = await fetchNpmMetric(npmPackage);
  }

  if (!metric && brewPackage) {
    metric = await fetchBrewMetric(brewPackage);
  }

  if (!metric && cargoCrate) {
    metric = await fetchCrateMetric(cargoCrate);
  }

  if (!metric && pypiPackage) {
    metric = await fetchPyPiMetric(pypiPackage);
  }

  if (!metric && dockerImage) {
    metric = await fetchDockerMetric(dockerImage);
  }

  if (!metric) {
    metric = await fetchGitHubReleaseMetric(cli.githubRepo);
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
