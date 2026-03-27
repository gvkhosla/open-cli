import { builderLaunches, clis, type BuilderLaunch } from "@/data/clis";

type NpmSearchObject = {
  package: {
    name: string;
    description?: string;
    date?: string;
    links?: {
      npm?: string;
      homepage?: string;
      repository?: string;
    };
    publisher?: {
      username?: string;
      email?: string;
    };
  };
};

type NpmRegistryPackage = {
  description?: string;
  homepage?: string;
  repository?: string | { url?: string };
  keywords?: string[];
  bin?: string | Record<string, string>;
  deprecated?: string;
  author?: string | { name?: string };
  maintainers?: Array<{ name?: string }>;
  time?: Record<string, string>;
  "dist-tags"?: { latest?: string };
};

type AuditedLaunchCandidate = BuilderLaunch & {
  auditScore: number;
};

const DISCOVERY_QUERIES = [
  "keywords:cli",
  'keywords:"command-line"',
  "keywords:terminal",
  '"terminal cli"',
  '"command line tool"',
] as const;

const DISCOVERY_WINDOW_DAYS = 21;
const DISCOVERY_BATCH_SIZE = 20;
const MAX_DISCOVERED_LAUNCHES = 24;
const AUDIT_MIN_SCORE = 6;

const NAME_BLOCKLIST = /(eslint-config|tsconfig|vite-plugin|webpack|rollup-plugin|babel-plugin|prettier-plugin|tailwindcss|unplugin|@types\/|remark-|rehype-|postcss-|create-react-app)/i;
const DESCRIPTION_BLOCKLIST = /(library|sdk|plugin|loader|preset|component library|react component|design tokens|typescript types|config preset)/i;
const CLI_SIGNAL = /(cli|command line|terminal|shell|tui|developer tool|devtool)/i;

function daysSince(value: string | null | undefined) {
  if (!value) return Number.POSITIVE_INFINITY;
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return Number.POSITIVE_INFINITY;
  return (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
}

function normalizeRepositoryUrl(input: string | undefined) {
  if (!input) return null;
  return input
    .replace(/^git\+/, "")
    .replace(/\.git$/, "")
    .replace(/^git:\/\//, "https://")
    .replace(/^git@github\.com:/, "https://github.com/");
}

function extractGithubRepo(input: string | undefined) {
  const normalized = normalizeRepositoryUrl(input);
  if (!normalized) return null;
  const match = normalized.match(/github\.com\/(.+?)\/(.+?)(?:$|#|\?|\/)/i);
  if (!match) return null;
  return `${match[1]}/${match[2]}`;
}

function pickCreator(searchItem: NpmSearchObject, pkg: NpmRegistryPackage) {
  if (typeof pkg.author === "string" && pkg.author.trim()) return pkg.author.trim();

  const author = typeof pkg.author === "object" && pkg.author ? pkg.author : null;
  if (author?.name?.trim()) return author.name.trim();

  if (searchItem.package.publisher?.username?.trim()) return searchItem.package.publisher.username.trim();
  if (pkg.maintainers?.[0]?.name?.trim()) return pkg.maintainers[0].name.trim();
  return "Unknown";
}

async function fetchNpmDownloads(packageName: string) {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(packageName)}`, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { downloads?: number };
  return typeof data.downloads === "number" ? data.downloads : null;
}

async function fetchNpmPublishedAt(packageName: string) {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    time?: Record<string, string>;
    "dist-tags"?: { latest?: string };
  };

  const latest = data["dist-tags"]?.latest;
  if (!latest || !data.time?.[latest]) {
    return null;
  }

  return data.time[latest];
}

async function fetchGitHubStars(githubRepo: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${githubRepo}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { stargazers_count?: number };
  return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
}

async function searchNpmPackages(query: string) {
  const response = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=${DISCOVERY_BATCH_SIZE}`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) return [];

  const data = (await response.json()) as { objects?: NpmSearchObject[] };
  return data.objects ?? [];
}

async function fetchRegistryPackage(packageName: string) {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  return (await response.json()) as NpmRegistryPackage;
}

async function auditCandidate(searchItem: NpmSearchObject): Promise<AuditedLaunchCandidate | null> {
  const packageName = searchItem.package.name;
  if (!packageName || NAME_BLOCKLIST.test(packageName)) return null;

  const pkg = await fetchRegistryPackage(packageName);
  if (!pkg || pkg.deprecated) return null;

  const latestVersion = pkg["dist-tags"]?.latest;
  const publishedAt = latestVersion && pkg.time?.[latestVersion]
    ? pkg.time[latestVersion]
    : searchItem.package.date ?? null;

  if (daysSince(publishedAt) > DISCOVERY_WINDOW_DAYS) return null;

  const hasBin = Boolean(pkg.bin && (typeof pkg.bin === "string" || Object.keys(pkg.bin).length > 0));
  if (!hasBin) return null;

  const description = (pkg.description ?? searchItem.package.description ?? "").trim();
  if (!description) return null;
  if (DESCRIPTION_BLOCKLIST.test(description) && !CLI_SIGNAL.test(description)) return null;

  const keywordBlob = (pkg.keywords ?? []).join(" ");
  const repositoryUrl = normalizeRepositoryUrl(
    typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url ?? searchItem.package.links?.repository,
  );
  const githubRepo = extractGithubRepo(repositoryUrl ?? undefined);

  let auditScore = 0;
  auditScore += hasBin ? 4 : 0;
  auditScore += CLI_SIGNAL.test(`${description} ${keywordBlob}`) ? 2 : 0;
  auditScore += repositoryUrl ? 1 : 0;
  auditScore += pkg.homepage || searchItem.package.links?.homepage ? 1 : 0;
  auditScore += daysSince(publishedAt) <= 7 ? 2 : 1;

  if (auditScore < AUDIT_MIN_SCORE) return null;

  const creator = pickCreator(searchItem, pkg);
  const href = repositoryUrl ?? pkg.homepage ?? searchItem.package.links?.homepage ?? searchItem.package.links?.npm;
  if (!href) return null;

  return {
    name: packageName.replace(/^@/, ""),
    creator,
    creatorUrl: repositoryUrl ?? pkg.homepage ?? href,
    tagline: description.charAt(0).toUpperCase() + description.slice(1),
    installCommand: `npm i -g ${packageName}`,
    href,
    released: "New",
    packageName,
    githubRepo: githubRepo ?? undefined,
    publishedAt,
    auditScore,
    status: "pending",
    source: "discovered",
  };
}

function stripAudit(candidate: AuditedLaunchCandidate): BuilderLaunch {
  const { auditScore, ...launch } = candidate;
  void auditScore;
  return launch;
}

async function discoverLatestCliLaunches(existingLaunches: BuilderLaunch[]) {
  const knownNames = new Set([
    ...existingLaunches.map((launch) => launch.name.toLowerCase()),
    ...existingLaunches.map((launch) => (launch.packageName ?? "").toLowerCase()).filter(Boolean),
    ...clis.map((cli) => cli.slug.toLowerCase()),
    ...clis.map((cli) => cli.shortName.toLowerCase()),
    ...clis.map((cli) => (cli.npmPackage ?? "").toLowerCase()).filter(Boolean),
  ]);

  const searchResults = await Promise.all(DISCOVERY_QUERIES.map((query) => searchNpmPackages(query)));
  const uniquePackages = new Map<string, NpmSearchObject>();

  for (const results of searchResults) {
    for (const item of results) {
      const name = item.package.name?.toLowerCase();
      if (!name || uniquePackages.has(name) || knownNames.has(name)) continue;
      uniquePackages.set(name, item);
    }
  }

  const audited = await Promise.all(Array.from(uniquePackages.values()).map((item) => auditCandidate(item)));

  return audited
    .filter((item): item is AuditedLaunchCandidate => Boolean(item))
    .sort((a, b) => {
      const publishedDiff = new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();
      return publishedDiff || b.auditScore - a.auditScore || a.name.localeCompare(b.name);
    })
    .slice(0, MAX_DISCOVERED_LAUNCHES)
    .map(stripAudit);
}

export async function buildSyncedLaunches(seedLaunches: BuilderLaunch[] = builderLaunches) {
  const discovered = await discoverLatestCliLaunches(seedLaunches);
  const merged = [...seedLaunches, ...discovered].filter(
    (launch, index, launches) =>
      launches.findIndex(
        (candidate) =>
          candidate.name.toLowerCase() === launch.name.toLowerCase() ||
          (candidate.packageName && launch.packageName && candidate.packageName === launch.packageName),
      ) === index,
  );

  const launches = await Promise.all(
    merged.map(async (launch) => {
      const [monthlyDownloads, publishedAt, stars] = await Promise.all([
        launch.packageName ? fetchNpmDownloads(launch.packageName) : Promise.resolve(launch.monthlyDownloads ?? null),
        launch.packageName ? fetchNpmPublishedAt(launch.packageName) : Promise.resolve(launch.publishedAt ?? null),
        launch.githubRepo ? fetchGitHubStars(launch.githubRepo) : Promise.resolve(launch.stars ?? null),
      ]);

      return {
        ...launch,
        monthlyDownloads,
        publishedAt,
        stars,
      } satisfies BuilderLaunch;
    }),
  );

  return launches.sort(
    (a, b) => new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime(),
  );
}
