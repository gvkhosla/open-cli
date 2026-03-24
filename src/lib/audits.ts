import type { CliEntry } from "@/data/clis";

export type InstallabilityStatus = "ready" | "unknown";
export type RuntimeStatus = "basic" | "unverified";
export type TrustLevel = "high" | "medium" | "low";
export type AutomationLevel = "good" | "okay" | "poor";
export type RiskLevel = "low" | "medium" | "high";
export type AuditTier = "screened" | "trusted" | "automation-ready";

export type CliAudit = {
  mode: "metadata";
  score: number;
  tier: AuditTier;
  installability: {
    status: InstallabilityStatus;
    note: string;
  };
  runtime: {
    status: RuntimeStatus;
    note: string;
  };
  sourceTrust: {
    level: TrustLevel;
    note: string;
  };
  automation: {
    level: AutomationLevel;
    note: string;
  };
  risk: {
    level: RiskLevel;
    note: string;
  };
  badges: string[];
};

function daysSince(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function getInstallability(cli: CliEntry): CliAudit["installability"] {
  if (!cli.installCommand.trim()) {
    return { status: "unknown", note: "No install command." };
  }

  return { status: "ready", note: cli.installWith };
}

function getRuntime(cli: CliEntry): CliAudit["runtime"] {
  if (cli.quickStart.trim()) {
    return { status: "basic", note: "Quick start present." };
  }

  return { status: "unverified", note: "No quick start." };
}

function getSourceTrust(cli: CliEntry): CliAudit["sourceTrust"] {
  const recentDays = daysSince(cli.latestRelease);

  if (cli.official) {
    return { level: "high", note: "Official." };
  }

  if ((cli.githubStars ?? 0) >= 5000 && recentDays !== null && recentDays <= 365 && cli.license) {
    return { level: "high", note: "Active and established." };
  }

  if ((cli.githubStars ?? 0) >= 500 || cli.license || (recentDays !== null && recentDays <= 365)) {
    return { level: "medium", note: "Some trust signals." };
  }

  return { level: "low", note: "Limited trust signals." };
}

function getAutomation(cli: CliEntry): CliAudit["automation"] {
  if (cli.supportsJsonOutput && cli.supportsNonInteractive && (cli.ciFriendly || cli.agentFriendly)) {
    return { level: "good", note: "Structured and scriptable." };
  }

  if (cli.supportsNonInteractive || cli.agentFriendly) {
    return { level: "okay", note: "Usable in scripts." };
  }

  return { level: "poor", note: "Manual-first." };
}

function getRisk(cli: CliEntry): CliAudit["risk"] {
  if (cli.destructivePotential === "high") {
    return { level: "high", note: "Writes live state." };
  }

  if (cli.requiresAuth || cli.requiresNetwork || cli.destructivePotential === "medium") {
    return { level: "medium", note: "Needs care." };
  }

  return { level: "low", note: "Lower-risk start." };
}

function scoreInstallability(status: InstallabilityStatus) {
  return status === "ready" ? 20 : 8;
}

function scoreRuntime(status: RuntimeStatus) {
  return status === "basic" ? 15 : 6;
}

function scoreTrust(level: TrustLevel) {
  if (level === "high") return 25;
  if (level === "medium") return 15;
  return 6;
}

function scoreAutomation(level: AutomationLevel) {
  if (level === "good") return 25;
  if (level === "okay") return 15;
  return 6;
}

function scoreRisk(level: RiskLevel) {
  if (level === "low") return 15;
  if (level === "medium") return 10;
  return 4;
}

function getTier(audit: Omit<CliAudit, "tier" | "badges" | "score" | "mode">, score: number): AuditTier {
  if (
    audit.installability.status === "ready" &&
    audit.runtime.status === "basic" &&
    audit.sourceTrust.level !== "low" &&
    audit.automation.level === "good" &&
    audit.risk.level !== "high" &&
    score >= 70
  ) {
    return "automation-ready";
  }

  if (audit.installability.status === "ready" && audit.sourceTrust.level !== "low" && score >= 50) {
    return "trusted";
  }

  return "screened";
}

function getBadges(cli: CliEntry, audit: Omit<CliAudit, "tier" | "badges" | "score" | "mode">, tier: AuditTier) {
  const badges: string[] = [];

  if (cli.official) badges.push("Official");
  if (audit.installability.status === "ready") badges.push("Install ready");
  if (tier === "trusted") badges.push("Trusted");
  if (tier === "automation-ready") badges.push("Automation-ready");
  if (audit.risk.level === "high") badges.push("Caution");

  return Array.from(new Set(badges));
}

export function buildCliAudit(cli: CliEntry): CliAudit {
  const auditBase = {
    installability: getInstallability(cli),
    runtime: getRuntime(cli),
    sourceTrust: getSourceTrust(cli),
    automation: getAutomation(cli),
    risk: getRisk(cli),
  };

  const score =
    scoreInstallability(auditBase.installability.status) +
    scoreRuntime(auditBase.runtime.status) +
    scoreTrust(auditBase.sourceTrust.level) +
    scoreAutomation(auditBase.automation.level) +
    scoreRisk(auditBase.risk.level);

  const tier = getTier(auditBase, score);

  return {
    mode: "metadata",
    score,
    tier,
    ...auditBase,
    badges: getBadges(cli, auditBase, tier),
  };
}
