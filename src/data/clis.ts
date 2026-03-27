import builderLaunchesJson from "@/content/builder-launches.json";
import cliMetricsJson from "@/content/cli-metrics.json";
import cliSeedsJson from "@/content/clis.json";
import makersJson from "@/content/makers.json";
import { detectCapabilityMatches, normalizeIntentText } from "@/lib/capabilities";

export type PackageManager = "brew" | "npm" | "cargo" | "pipx" | "curl" | "go";
export type MakerType = "org" | "individual" | "small-team";
export type DestructivePotential = "low" | "medium" | "high";
export type CliCategory =
  | "AI"
  | "Browser Automation"
  | "Cloud"
  | "Containers / Infra"
  | "Data"
  | "Database"
  | "Deploy"
  | "Docs / Content"
  | "Git"
  | "Observability"
  | "Package Management"
  | "Productivity"
  | "Scraping"
  | "Security"
  | "Shell Utilities";

export type Maker = {
  slug: string;
  name: string;
  type: MakerType;
  url: string;
  officialPlatformMaker?: boolean;
  featuredBuilder?: boolean;
  cliCount?: number;
};

type CliSeed = {
  slug: string;
  name: string;
  shortName: string;
  maker: string;
  category: CliCategory;
  installWith: PackageManager;
  installCommand: string;
  quickStart: string;
  tagline?: string;
  githubRepo: string;
  website?: string;
  docs?: string;
  packageName?: string;
  npmPackage?: string;
  brewFormula?: string;
  brewCask?: string;
  crateName?: string;
  pypiPackage?: string;
  goPackage?: string;
  dockerImage?: string;
  bestFor?: string;
  useThisIf?: string;
  skipIf?: string;
  useCases: string[];
  aliases?: string[];
  keywords?: string[];
  tags?: string[];
  exampleWorkflow?: string[];
  featured?: boolean;
  agentFriendly?: boolean;
  supportsJsonOutput?: boolean;
  supportsNonInteractive?: boolean;
  supportsDryRun?: boolean;
  requiresAuth?: boolean;
  requiresNetwork?: boolean;
  ciFriendly?: boolean;
  localFirst?: boolean;
  destructivePotential?: DestructivePotential;
};

export type CliMetric = {
  githubStars: number | null;
  latestRelease?: string | null;
  license?: string | null;
  metricLabel?: string | null;
  metricValue?: number | null;
  metricSource?: string | null;
  metricAsOf?: string | null;
};

export type CliEntry = {
  slug: string;
  name: string;
  shortName: string;
  binaryName: string;
  makerSlug: string;
  makerName: string;
  makerType: MakerType;
  makerUrl: string;
  official: boolean;
  featuredBuilder: boolean;
  tagline: string;
  description: string;
  category: CliCategory;
  installWith: PackageManager;
  installCommand: string;
  quickStart: string;
  exampleWorkflow: string[];
  website: string;
  github: string;
  docs: string;
  githubRepo: string;
  packageName?: string;
  npmPackage?: string;
  brewFormula?: string;
  brewCask?: string;
  crateName?: string;
  pypiPackage?: string;
  goPackage?: string;
  dockerImage?: string;
  bestFor: string;
  useThisIf: string;
  skipIf: string;
  whatHappensNext: string;
  featured?: boolean;
  agentFriendly: boolean;
  supportsJsonOutput: boolean;
  supportsNonInteractive: boolean;
  supportsDryRun: boolean;
  requiresAuth: boolean;
  requiresNetwork: boolean;
  ciFriendly: boolean;
  localFirst: boolean;
  destructivePotential: DestructivePotential;
  aliases: string[];
  keywords: string[];
  tags: string[];
  useCases: string[];
  githubStars: number | null;
  latestRelease: string | null;
  license: string | null;
  metricLabel: string | null;
  metricValue: number | null;
  metricSource: string | null;
  metricAsOf: string | null;
};

export type BuilderLaunchStatus = "pending" | "approved" | "rejected";
export type BuilderLaunchSource = "manual" | "discovered";

export type BuilderLaunch = {
  id?: string;
  name: string;
  creator: string;
  creatorUrl: string;
  tagline: string;
  installCommand: string;
  href: string;
  released: string;
  packageName?: string;
  githubRepo?: string;
  stars?: number | null;
  monthlyDownloads?: number | null;
  publishedAt?: string | null;
  status?: BuilderLaunchStatus;
  source?: BuilderLaunchSource;
  auditScore?: number | null;
  createdAt?: string | null;
};

const makerSeeds = makersJson as Maker[];
const cliSeeds = cliSeedsJson as CliSeed[];
const cliMetrics = cliMetricsJson as Record<string, CliMetric>;
const makersBySlug = new Map(makerSeeds.map((maker) => [maker.slug, maker]));

/* ─── Copy generators ───
 *
 * These produce the prose users see. The goal is natural, specific
 * copy that reads like a human curator wrote it — not like a chatbot
 * stringing together array values.
 *
 * Pattern inspired by skills.sh: lead with what the tool DOES in
 * one verb-forward sentence. Never start with the tool name.
 */

function formatUseCaseList(useCases: string[], limit = 3) {
  const items = useCases.slice(0, limit).map((s) => s.toLowerCase());
  if (items.length === 0) return "common terminal tasks";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function categoryNoun(category: CliCategory) {
  const map: Record<CliCategory, string> = {
    AI: "AI models and inference",
    "Browser Automation": "browser automation",
    Cloud: "cloud infrastructure",
    "Containers / Infra": "containers and infrastructure",
    Data: "data processing",
    Database: "databases",
    Deploy: "deployments",
    "Docs / Content": "docs and content",
    Git: "git workflows",
    Observability: "observability",
    "Package Management": "packages and builds",
    Productivity: "productivity workflows",
    Scraping: "web scraping",
    Security: "security scanning",
    "Shell Utilities": "shell utilities",
  };
  return map[category] ?? "terminal workflows";
}

function buildTagline(seed: CliSeed) {
  if (seed.tagline) return seed.tagline;

  // "{Use case}, {use case}, and {use case} from the terminal."
  // e.g. "Pull requests, issue triage, and GitHub Actions from the terminal."
  const items = seed.useCases.slice(0, 3);
  if (items.length === 0) return `A CLI for ${categoryNoun(seed.category)}.`;
  if (items.length === 1) return `${items[0]} from the terminal.`;
  if (items.length === 2) return `${items[0]} and ${items[1].toLowerCase()} from the terminal.`;
  return `${items[0]}, ${items[1].toLowerCase()}, and ${items[2].toLowerCase()} from the terminal.`;
}

function buildDescription(seed: CliSeed, maker: Maker) {
  const parts: string[] = [];

  if (maker.officialPlatformMaker) {
    parts.push(`The official CLI from ${maker.name}.`);
    parts.push(buildTagline(seed));
  } else {
    parts.push(buildTagline(seed));
    parts.push(`Built by ${maker.name}.`);
  }

  if (seed.exampleWorkflow && seed.exampleWorkflow.length > 0) {
    parts.push(`Start with \`${seed.exampleWorkflow[0]}\` and go from there.`);
  }

  if (seed.agentFriendly && seed.supportsJsonOutput) {
    parts.push("Supports structured output — good for scripts and agents.");
  }

  if (seed.localFirst) {
    parts.push("Runs entirely on your machine.");
  }

  return parts.join(" ");
}

function buildBestFor(seed: CliSeed) {
  if (seed.bestFor) return seed.bestFor;
  return `${formatUseCaseList(seed.useCases)} from the terminal.`;
}

// Makers where "You're on X" makes sense — they ARE the platform.
const platformMakers = new Set([
  "github", "vercel", "cloudflare", "supabase", "railway", "fly",
  "netlify", "docker", "hashicorp", "kubernetes", "stripe",
  "aws", "google-cloud", "digitalocean", "mongodb",
]);

function buildUseThisIf(seed: CliSeed, maker: Maker) {
  if (seed.useThisIf) return seed.useThisIf;

  if (maker.officialPlatformMaker && platformMakers.has(maker.slug)) {
    return `You're on ${maker.name} and want the official terminal experience.`;
  }

  if (seed.localFirst) {
    return `You want ${categoryNoun(seed.category)} that runs entirely on your machine.`;
  }

  if (seed.agentFriendly && seed.supportsJsonOutput) {
    return `You want ${categoryNoun(seed.category)} you can script with structured output.`;
  }

  if (seed.ciFriendly) {
    return `You need ${categoryNoun(seed.category)} in both local dev and CI.`;
  }

  return `You work with ${categoryNoun(seed.category)} and want a fast terminal interface.`;
}

function buildSkipIf(seed: CliSeed) {
  if (seed.skipIf) return seed.skipIf;

  if (seed.destructivePotential === "high" && seed.requiresAuth) {
    return "You're not comfortable with a tool that can write to production.";
  }

  if (seed.requiresAuth && seed.requiresNetwork) {
    return "You need something that works offline or without an account.";
  }

  if (seed.requiresAuth) {
    return "You need a tool that works without an account.";
  }

  if (!seed.supportsNonInteractive) {
    return "You need fully non-interactive usage for CI.";
  }

  return `You don't work with ${categoryNoun(seed.category)}.`;
}

function buildWhatHappensNext(seed: CliSeed) {
  if (seed.exampleWorkflow && seed.exampleWorkflow.length >= 2) {
    return `Run \`${seed.exampleWorkflow[1]}\` to see it in action.`;
  }
  return `Run \`${seed.quickStart}\` and see what comes back.`;
}

function popularityValue(cli: CliEntry) {
  return (cli.metricValue ?? 0) + (cli.githubStars ?? 0);
}

function createCli(seed: CliSeed): CliEntry {
  const maker = makersBySlug.get(seed.maker);

  if (!maker) {
    throw new Error(`Unknown maker: ${seed.maker}`);
  }

  const metric = cliMetrics[seed.slug] ?? { githubStars: null };

  return {
    slug: seed.slug,
    name: seed.name,
    shortName: seed.shortName,
    binaryName: seed.shortName,
    makerSlug: maker.slug,
    makerName: maker.name,
    makerType: maker.type,
    makerUrl: maker.url,
    official: Boolean(maker.officialPlatformMaker),
    featuredBuilder: Boolean(maker.featuredBuilder),
    tagline: buildTagline(seed),
    description: buildDescription(seed, maker),
    category: seed.category,
    installWith: seed.installWith,
    installCommand: seed.installCommand,
    quickStart: seed.quickStart,
    exampleWorkflow: seed.exampleWorkflow ?? [seed.quickStart],
    website: seed.website ?? `https://github.com/${seed.githubRepo}`,
    github: `https://github.com/${seed.githubRepo}`,
    docs: seed.docs ?? seed.website ?? `https://github.com/${seed.githubRepo}`,
    githubRepo: seed.githubRepo,
    packageName: seed.packageName,
    npmPackage: seed.npmPackage,
    brewFormula: seed.brewFormula,
    brewCask: seed.brewCask,
    crateName: seed.crateName,
    pypiPackage: seed.pypiPackage,
    goPackage: seed.goPackage,
    dockerImage: seed.dockerImage,
    bestFor: buildBestFor(seed),
    useThisIf: buildUseThisIf(seed, maker),
    skipIf: buildSkipIf(seed),
    whatHappensNext: buildWhatHappensNext(seed),
    featured: seed.featured,
    agentFriendly: seed.agentFriendly ?? false,
    supportsJsonOutput: seed.supportsJsonOutput ?? false,
    supportsNonInteractive: seed.supportsNonInteractive ?? true,
    supportsDryRun: seed.supportsDryRun ?? false,
    requiresAuth: seed.requiresAuth ?? false,
    requiresNetwork: seed.requiresNetwork ?? true,
    ciFriendly: seed.ciFriendly ?? false,
    localFirst: seed.localFirst ?? false,
    destructivePotential: seed.destructivePotential ?? "medium",
    aliases: seed.aliases ?? [],
    keywords: seed.keywords ?? [],
    tags: seed.tags ?? [],
    useCases: seed.useCases,
    githubStars: metric.githubStars ?? null,
    latestRelease: metric.latestRelease ?? null,
    license: metric.license ?? null,
    metricLabel: metric.metricLabel ?? null,
    metricValue: metric.metricValue ?? null,
    metricSource: metric.metricSource ?? null,
    metricAsOf: metric.metricAsOf ?? null,
  };
}

export const clis: CliEntry[] = cliSeeds
  .map(createCli)
  .sort((a, b) => popularityValue(b) - popularityValue(a) || a.name.localeCompare(b.name));

export const builderLaunches = builderLaunchesJson as BuilderLaunch[];

export const makers = makerSeeds
  .map((maker) => ({
    ...maker,
    cliCount: clis.filter((cli) => cli.makerSlug === maker.slug).length,
  }))
  .filter((maker) => maker.cliCount && maker.cliCount > 0)
  .sort((a, b) => (b.cliCount ?? 0) - (a.cliCount ?? 0) || a.name.localeCompare(b.name));

export const categories = Array.from(new Set(clis.map((cli) => cli.category))).sort();
export const packageManagers = Array.from(new Set(clis.map((cli) => cli.installWith))).sort();
export const featuredClis = clis.filter((cli) => cli.featured);
export const officialClis = clis.filter((cli) => cli.official);
export const builderClis = clis.filter((cli) => !cli.official);
export const featuredMakers = makers.filter((maker) => maker.featuredBuilder || maker.officialPlatformMaker);
export const leaderboardClis = [...clis];

export function getCliBySlug(slug: string) {
  return clis.find((cli) => cli.slug === slug);
}

export function getMakerBySlug(slug: string) {
  return makers.find((maker) => maker.slug === slug);
}

export function getClisByMaker(slug: string) {
  return clis
    .filter((cli) => cli.makerSlug === slug)
    .sort((a, b) => popularityValue(b) - popularityValue(a) || a.name.localeCompare(b.name));
}

export function getRelatedClis(cli: CliEntry, limit = 4) {
  return clis
    .filter((candidate) => candidate.slug !== cli.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.makerSlug === cli.makerSlug) score += 6;
      if (candidate.category === cli.category) score += 4;
      score += candidate.tags.filter((tag) => cli.tags.includes(tag)).length * 2;
      score += candidate.useCases.filter((useCase) => cli.useCases.includes(useCase)).length;
      score += Math.min(6, Math.round((candidate.githubStars ?? 0) / 10000));
      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || popularityValue(b.candidate) - popularityValue(a.candidate))
    .slice(0, limit)
    .map((item) => item.candidate);
}

export function getAlternativeClis(cli: CliEntry, limit = 3) {
  return clis
    .filter((candidate) => candidate.slug !== cli.slug && candidate.category === cli.category)
    .map((candidate) => {
      let score = 0;
      if (candidate.makerSlug !== cli.makerSlug) score += 4;
      score += candidate.useCases.filter((useCase) => cli.useCases.includes(useCase)).length * 2;
      score += candidate.tags.filter((tag) => cli.tags.includes(tag)).length;
      score += Math.min(6, Math.round((candidate.metricValue ?? 0) / 100000));
      score += Math.min(4, Math.round((candidate.githubStars ?? 0) / 10000));
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || popularityValue(b.candidate) - popularityValue(a.candidate))
    .slice(0, limit)
    .map((item) => item.candidate);
}

function uniqueNormalized(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.map((value) => normalizeIntentText(value ?? "")).filter(Boolean)));
}

const intentSlugBoosts = [
  { terms: ["github", "pull request", "pr", "issue", "workflow"], slugs: ["gh", "lazygit", "gitui"] },
  { terms: ["deploy", "preview", "production", "nextjs", "next js"], slugs: ["vercel", "railway", "flyctl", "wrangler", "netlify"] },
  { terms: ["postgres", "postgresql"], slugs: ["pgcli", "usql", "supabase", "dbmate"] },
  { terms: ["sqlite"], slugs: ["sqlite-utils", "litecli", "usql", "duckdb"] },
  { terms: ["browser", "automation", "playwright", "scrape"], slugs: ["browser-use", "playwright", "firecrawl"] },
  { terms: ["wallet", "tempo", "mpp", "paid requests"], slugs: ["tempo"] },
];

function getExpandedQueryTerms(query: string) {
  const normalized = normalizeIntentText(query);
  const directTerms = normalized.split(/\s+/).filter(Boolean);
  const matchedCapabilities = detectCapabilityMatches(query)
    .filter((item) => item.score >= 6)
    .slice(0, 2);

  const capabilityTerms = matchedCapabilities.flatMap((item) => item.capability.searchTerms.map((term) => normalizeIntentText(term)));

  return {
    normalized,
    directTerms,
    expandedTerms: Array.from(new Set([...directTerms, ...capabilityTerms])).filter(Boolean),
    matchedCapabilities,
  };
}

function scoreQueryMatch(cli: CliEntry, query: string) {
  const { normalized, directTerms, expandedTerms, matchedCapabilities } = getExpandedQueryTerms(query);

  if (!normalized) {
    return popularityValue(cli);
  }

  const exactHaystacks = uniqueNormalized([
    cli.slug,
    cli.shortName,
    cli.name,
    cli.binaryName,
    cli.makerName,
    cli.githubRepo,
    cli.packageName,
    cli.npmPackage,
    cli.brewFormula,
    cli.brewCask,
    cli.crateName,
    cli.pypiPackage,
    cli.goPackage,
    cli.dockerImage,
    ...cli.aliases,
  ]);

  const broadHaystacks = uniqueNormalized([
    cli.tagline,
    cli.description,
    cli.bestFor,
    cli.useThisIf,
    cli.skipIf,
    cli.category,
    cli.makerName,
    cli.githubRepo,
    ...cli.useCases,
    ...cli.keywords,
    ...cli.tags,
    ...cli.aliases,
  ]);

  const broadText = ` ${broadHaystacks.join(" ")} `;
  let score = 0;

  if (exactHaystacks.includes(normalized)) score += 180;
  if (normalizeIntentText(cli.name) === normalized) score += 120;
  if (broadText.includes(` ${normalized} `)) score += 90;
  else if (broadText.includes(normalized)) score += 48;

  let directMatches = 0;

  for (const term of expandedTerms) {
    if (term.length < 2) continue;

    if (exactHaystacks.includes(term)) {
      score += 26;
      if (directTerms.includes(term)) directMatches += 1;
      continue;
    }

    const useCaseMatch = cli.useCases.some((value) => normalizeIntentText(value).includes(term));
    const keywordMatch = cli.keywords.some((value) => normalizeIntentText(value).includes(term));
    const broadMatch = broadText.includes(` ${term} `) || broadText.includes(term);

    if (useCaseMatch) {
      score += 18;
      if (directTerms.includes(term)) directMatches += 1;
      continue;
    }

    if (keywordMatch) {
      score += 14;
      if (directTerms.includes(term)) directMatches += 1;
      continue;
    }

    if (broadMatch) {
      score += term.length > 4 ? 10 : 6;
      if (directTerms.includes(term)) directMatches += 1;
    }
  }

  if (directTerms.length > 1 && directMatches >= Math.min(directTerms.length, 2)) {
    score += 22;
  }

  for (const match of matchedCapabilities) {
    const preferredIndex = match.capability.candidateSlugs.indexOf(cli.slug);

    if (preferredIndex >= 0) {
      score += Math.max(16, 42 - preferredIndex * 4) + match.score * 2;
    } else if (match.capability.categories.includes(cli.category)) {
      score += 12 + match.score;
    }
  }

  for (const boost of intentSlugBoosts) {
    const matched = boost.terms.some((term) => normalized.includes(term));
    if (!matched) continue;

    const boostIndex = boost.slugs.indexOf(cli.slug);
    if (boostIndex >= 0) {
      score += Math.max(10, 28 - boostIndex * 4);
    }
  }

  if (normalized.includes("postgres") && cli.slug === "pgcli") score += 40;
  if (normalized.includes("sqlite") && cli.slug === "sqlite-utils") score += 24;
  if ((normalized.includes("github") || normalized.includes("pull request")) && cli.slug === "gh") score += 18;
  if ((normalized.includes("nextjs") || normalized.includes("next js")) && cli.slug === "vercel") score += 18;
  if ((normalized.includes("wallet") || normalized.includes("mpp")) && cli.slug === "tempo") score += 18;

  if ((normalized.includes("agent") || normalized.includes("automation")) && cli.agentFriendly) score += 10;
  if ((normalized.includes("official") || normalized.includes("first party")) && cli.official) score += 10;
  if ((normalized.includes("json") || normalized.includes("structured")) && cli.supportsJsonOutput) score += 8;
  if ((normalized.includes("local") || normalized.includes("offline")) && cli.localFirst) score += 8;

  return score + Math.min(12, Math.round((cli.githubStars ?? 0) / 10000));
}

export type CliSearchOptions = {
  mode?: "all" | "official" | "builders" | "agent-friendly";
  category?: CliCategory | "All";
};

export function searchClis(query: string, options: CliSearchOptions = {}) {
  const mode = options.mode ?? "all";
  const category = options.category ?? "All";

  return clis
    .filter((cli) => {
      if (mode === "official" && !cli.official) return false;
      if (mode === "builders" && cli.official) return false;
      if (mode === "agent-friendly" && !cli.agentFriendly) return false;
      if (category !== "All" && cli.category !== category) return false;
      const queryScore = scoreQueryMatch(cli, query);
      return query.trim() ? queryScore > 0 : true;
    })
    .map((cli) => ({ cli, searchScore: scoreQueryMatch(cli, query) }))
    .sort((a, b) => b.searchScore - a.searchScore || popularityValue(b.cli) - popularityValue(a.cli))
    .map((item) => item.cli);
}

export function getSearchHighlights(cli: CliEntry, query: string) {
  const trimmed = normalizeIntentText(query);
  const capabilityMatch = detectCapabilityMatches(query).find(
    (item) => item.capability.candidateSlugs.includes(cli.slug) || item.capability.categories.includes(cli.category),
  );

  if (!trimmed) {
    return [
      cli.official ? "Official tool" : `Maker: ${cli.makerName}`,
      cli.agentFriendly ? "Good for agent workflows" : cli.category,
    ];
  }

  const highlights: string[] = [];
  const terms = trimmed.split(/\s+/).filter(Boolean);
  const aliasMatch = cli.aliases.find((alias) => alias.toLowerCase().includes(trimmed) || terms.some((term) => alias.toLowerCase().includes(term)));
  const useCaseMatch = cli.useCases.find((useCase) => useCase.toLowerCase().includes(trimmed) || terms.some((term) => useCase.toLowerCase().includes(term)));
  const keywordMatch = cli.keywords.find((keyword) => keyword.toLowerCase().includes(trimmed) || terms.some((term) => keyword.toLowerCase().includes(term)));

  if (cli.slug === trimmed || cli.shortName.toLowerCase() === trimmed || cli.name.toLowerCase() === trimmed) {
    highlights.push("Exact name match");
  }

  if (cli.makerName.toLowerCase().includes(trimmed) || terms.some((term) => cli.makerName.toLowerCase().includes(term))) {
    highlights.push(`Maker: ${cli.makerName}`);
  }

  if (aliasMatch) {
    highlights.push(`Alias: ${aliasMatch}`);
  }

  if (cli.githubRepo.toLowerCase().includes(trimmed) || terms.some((term) => cli.githubRepo.toLowerCase().includes(term))) {
    highlights.push(`Repo: ${cli.githubRepo}`);
  }

  if (useCaseMatch) {
    highlights.push(`Use case: ${useCaseMatch}`);
  } else if (keywordMatch) {
    highlights.push(`Task: ${keywordMatch}`);
  } else if (cli.category.toLowerCase().includes(trimmed) || terms.some((term) => cli.category.toLowerCase().includes(term))) {
    highlights.push(`Category: ${cli.category}`);
  }

  if (capabilityMatch && highlights.length < 3) {
    highlights.push(`Capability: ${capabilityMatch.capability.label}`);
  }

  if (cli.metricLabel && highlights.length < 3) {
    highlights.push(cli.metricLabel);
  } else if (cli.official && highlights.length < 3) {
    highlights.push("Official tool");
  }

  return Array.from(new Set(highlights)).slice(0, 3);
}
