import radarCandidatesJson from "@/content/radar-candidates.json";

export type RadarVerdict = "try" | "wait" | "skip";

export type RadarCandidate = {
  slug: string;
  name: string;
  sourceUrl: string;
  description: string;
  detectedCategory: string;
  detectedUseCases: string[];
  detectedInstallCommand: string;
  detectedFirstCommand?: string;
  whyFound: string;
  beatsIncumbent?: string;
  verdict?: RadarVerdict;
  signals: {
    stars: number;
    growth: string;
    lastSeen: string;
    hasBin: boolean;
    jsonOutput: boolean;
    dryRun: boolean;
  };
  agentReadinessGuess: number;
  status: string;
};

export const radarCandidates = radarCandidatesJson as RadarCandidate[];

export function getRadarCandidates(options: { verdict?: RadarVerdict | "all"; excludePromoted?: boolean } = {}) {
  const excludePromoted = options.excludePromoted ?? true;
  return radarCandidates.filter((candidate) => {
    if (excludePromoted && candidate.status === "promoted") return false;
    if (!options.verdict || options.verdict === "all") return true;
    return (candidate.verdict ?? "wait") === options.verdict;
  });
}

export function getRadarPreview(limit = 3) {
  const preferred = getRadarCandidates({ verdict: "try" });
  const fallback = preferred.length > 0 ? preferred : getRadarCandidates();
  return fallback.slice(0, limit);
}
