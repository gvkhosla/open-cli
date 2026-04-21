import type { CliEntry } from "@/data/clis";

export type CliAudit = {
  badges: string[];
};

export function buildCliAudit(cli: CliEntry): CliAudit {
  const badges: string[] = [];

  if (cli.official) badges.push("Official");
  if (cli.supportsJsonOutput && cli.supportsNonInteractive && (cli.ciFriendly || cli.agentFriendly)) {
    badges.push("Scriptable");
  }
  if ((cli.githubStars ?? 0) >= 5000 || (cli.metricValue ?? 0) >= 100000) {
    badges.push("Popular");
  }
  if (cli.localFirst) badges.push("Local-only");
  if (cli.destructivePotential === "high") badges.push("Caution");

  return { badges };
}
