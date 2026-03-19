import builderLaunchesJson from "@/content/builder-launches.json";
import cliMetricsJson from "@/content/cli-metrics.json";
import cliSeedsJson from "@/content/clis.json";
import makersJson from "@/content/makers.json";

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

export type BuilderLaunch = {
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
};

const makerSeeds = makersJson as Maker[];
const cliSeeds = cliSeedsJson as CliSeed[];
const cliMetrics = cliMetricsJson as Record<string, CliMetric>;
const makersBySlug = new Map(makerSeeds.map((maker) => [maker.slug, maker]));

function buildTagline(seed: CliSeed) {
  if (seed.tagline) {
    return seed.tagline;
  }

  const useCases = seed.useCases.slice(0, 3).join(", ").toLowerCase();
  return `${seed.name} helps with ${useCases} from the terminal.`;
}

function buildDescription(seed: CliSeed, maker: Maker) {
  const useCases = seed.useCases.slice(0, 3).join(", ").toLowerCase();
  return `${seed.name} comes from ${maker.name} and is useful for ${useCases}. ${buildTagline(seed)}`;
}

function toSentenceList(values: string[], limit = 2) {
  const items = values
    .slice(0, limit)
    .map((value) => value.toLowerCase())
    .filter(Boolean);

  if (items.length === 0) {
    return "terminal work";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function categoryWorkflowLabel(category: CliCategory) {
  switch (category) {
    case "AI":
      return "AI workflows";
    case "Browser Automation":
      return "browser automation";
    case "Cloud":
      return "cloud workflows";
    case "Containers / Infra":
      return "infra work";
    case "Data":
      return "data workflows";
    case "Database":
      return "database work";
    case "Deploy":
      return "deploy workflows";
    case "Docs / Content":
      return "docs and content workflows";
    case "Git":
      return "git workflows";
    case "Observability":
      return "observability work";
    case "Package Management":
      return "package and build workflows";
    case "Productivity":
      return "productivity workflows";
    case "Scraping":
      return "scraping workflows";
    case "Security":
      return "security workflows";
    case "Shell Utilities":
      return "shell workflows";
    default:
      return "terminal workflows";
  }
}

function buildBestFor(seed: CliSeed) {
  return seed.bestFor ?? `Best for ${toSentenceList(seed.useCases)}.`;
}

function buildUseThisIf(seed: CliSeed, maker: Maker) {
  if (seed.useThisIf) {
    return seed.useThisIf;
  }

  if (maker.officialPlatformMaker) {
    return `Use this if you want ${maker.name}'s own CLI for ${toSentenceList(seed.useCases)}.`;
  }

  if (seed.agentFriendly) {
    return `Use this if you want ${toSentenceList(seed.useCases)} in a scriptable terminal workflow.`;
  }

  return `Use this if you want ${toSentenceList(seed.useCases)} without leaving the terminal.`;
}

function buildSkipIf(seed: CliSeed) {
  if (seed.skipIf) {
    return seed.skipIf;
  }

  if (seed.destructivePotential === "high") {
    return "Skip this if you want a lower-risk CLI to learn on first.";
  }

  if (seed.requiresAuth) {
    return "Skip this if you need something that works without signing in.";
  }

  if (seed.requiresNetwork ?? true) {
    return "Skip this if you want a tool that mostly works offline.";
  }

  return `Skip this if you need something outside ${categoryWorkflowLabel(seed.category)}.`;
}

function buildWhatHappensNext(seed: CliSeed) {
  return `After the first command, you can ${toSentenceList(seed.useCases, 3)}.`;
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

function scoreQueryMatch(cli: CliEntry, query: string) {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return popularityValue(cli);
  }

  const terms = trimmed.split(/\s+/).filter(Boolean);
  const exactHaystacks = [
    cli.slug,
    cli.shortName.toLowerCase(),
    cli.name.toLowerCase(),
    cli.binaryName.toLowerCase(),
    cli.makerName.toLowerCase(),
    ...cli.aliases.map((value) => value.toLowerCase()),
  ];
  const broadHaystacks = [
    cli.tagline,
    cli.description,
    cli.category,
    cli.makerName,
    cli.githubRepo,
    ...cli.useCases,
    ...cli.keywords,
    ...cli.tags,
    ...cli.aliases,
  ].map((value) => value.toLowerCase());

  let score = 0;

  if (exactHaystacks.includes(trimmed)) score += 120;
  if (cli.slug.includes(trimmed) || cli.shortName.toLowerCase().includes(trimmed)) score += 60;
  if (cli.name.toLowerCase().includes(trimmed)) score += 40;
  if (cli.makerName.toLowerCase().includes(trimmed)) score += 30;
  if (cli.githubRepo.toLowerCase().includes(trimmed)) score += 24;

  for (const term of terms) {
    if (exactHaystacks.includes(term)) score += 20;
    if (broadHaystacks.some((value) => value.includes(term))) score += 8;
  }

  if (cli.official) score += 4;
  if (cli.agentFriendly) score += 3;

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
  const trimmed = query.trim().toLowerCase();

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

  if (cli.metricLabel && highlights.length < 3) {
    highlights.push(cli.metricLabel);
  } else if (cli.official && highlights.length < 3) {
    highlights.push("Official tool");
  }

  return Array.from(new Set(highlights)).slice(0, 3);
}
