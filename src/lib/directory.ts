import { builderClis, clis, getSearchHighlights, officialClis, searchClis, type CliEntry } from "@/data/clis";

export type DirectoryCliResult = {
  slug: string;
  shortName: string;
  name: string;
  tagline: string;
  bestFor: string;
  makerName: string;
  githubRepo: string;
  official: boolean;
  agentFriendly: boolean;
  metricValue: number | null;
  metricLabel: string | null;
  githubStars: number | null;
  highlights: string[];
};

export type DirectoryStats = {
  total: number;
  official: number;
  builders: number;
};

export type DirectorySearchResponse = {
  query: string;
  total: number;
  results: DirectoryCliResult[];
};

export type DirectoryQueryOptions = {
  category?: string;
};

function serializeCli(cli: CliEntry, query: string): DirectoryCliResult {
  return {
    slug: cli.slug,
    shortName: cli.shortName,
    name: cli.name,
    tagline: cli.tagline,
    bestFor: cli.bestFor,
    makerName: cli.makerName,
    githubRepo: cli.githubRepo,
    official: cli.official,
    agentFriendly: cli.agentFriendly,
    metricValue: cli.metricValue,
    metricLabel: cli.metricLabel,
    githubStars: cli.githubStars,
    highlights: getSearchHighlights(cli, query),
  };
}

function sortDefaultDirectory(a: CliEntry, b: CliEntry) {
  return (b.metricValue ?? -1) - (a.metricValue ?? -1) || (b.githubStars ?? 0) - (a.githubStars ?? 0) || a.name.localeCompare(b.name);
}

export function getDirectoryStats(): DirectoryStats {
  return {
    total: clis.length,
    official: officialClis.length,
    builders: builderClis.length,
  };
}

export function getDirectoryResults(query: string, limit = 24, options: DirectoryQueryOptions = {}): DirectorySearchResponse {
  const trimmed = query.trim();
  const normalizedCategory = options.category?.trim() || "All";
  const categoryFilter = normalizedCategory === "All" ? "All" : normalizedCategory;
  const matches = trimmed
    ? searchClis(trimmed, { mode: "all", category: categoryFilter as CliEntry["category"] | "All" })
    : [...clis]
        .filter((cli) => (categoryFilter === "All" ? true : cli.category === categoryFilter))
        .sort(sortDefaultDirectory);
  const sliced = matches.slice(0, limit);

  return {
    query: trimmed,
    total: matches.length,
    results: sliced.map((cli) => serializeCli(cli, trimmed)),
  };
}
