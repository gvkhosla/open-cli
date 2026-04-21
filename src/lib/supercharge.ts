import { clis, findDirectCliMatch, searchClis, type CliEntry } from "@/data/clis";
import { capabilityDefinitions, detectCapabilityMatches, getCapabilityBySlug, type CapabilityDefinition } from "@/lib/capabilities";

export type SuperchargeCliSummary = {
  slug: string;
  shortName: string;
  name: string;
  installCommand: string;
  metricValue: number | null;
  metricLabel: string | null;
};

export type SuperchargeAlternative = {
  slug: string;
  shortName: string;
  name: string;
  reason: string;
};

export type SuperchargeRecommendation = {
  matchType: "direct" | "intent";
  capability: {
    slug: string;
    label: string;
  };
  primary: SuperchargeCliSummary;
  alternatives: SuperchargeAlternative[];
  rationale: string;
  whyReasons: string[];
  watchouts: string[];
  verifyCommand: string;
  verifySignal: string;
  loopName: string;
  loopSteps: string[];
};

const verifyOverrides: Record<string, { command: string; signal: string }> = {
  gh: { command: "gh auth status", signal: "Shows the signed-in GitHub account and scopes." },
  vercel: { command: "vercel whoami", signal: "Shows the active Vercel account or team." },
  wrangler: { command: "wrangler whoami", signal: "Prints the active Cloudflare identity." },
  flyctl: { command: "fly auth whoami", signal: "Shows the active org or user identity." },
  railway: { command: "railway whoami", signal: "Confirms the authenticated account." },
  supabase: { command: "supabase --version", signal: "The CLI responds and is ready for local project setup." },
  ollama: { command: "ollama --version", signal: "Responds locally and is ready for models." },
  docker: { command: "docker version", signal: "Docker responds and the daemon is reachable." },
  kubectl: { command: "kubectl config current-context", signal: "Prints the active cluster context." },
  terraform: { command: "terraform version", signal: "Responds and is ready to inspect or plan." },
};

function defaultVerify(cli: CliEntry) {
  if (cli.requiresAuth) {
    return {
      command: `${cli.shortName} --help`,
      signal: `${cli.shortName} responds locally and you can move on to authentication or project setup.`,
    };
  }
  return {
    command: `${cli.shortName} --version`,
    signal: `${cli.shortName} responds locally and is ready for the first real command.`,
  };
}

function getVerifyStep(cli: CliEntry) {
  return verifyOverrides[cli.slug] ?? defaultVerify(cli);
}

function stripBestFor(bestFor: string) {
  return bestFor.replace(/^Best for\s*/i, "").replace(/\.$/, "");
}

function buildWatchouts(cli: CliEntry) {
  const watchouts: string[] = [];
  if (cli.requiresAuth) watchouts.push("Sign in before real work.");
  if (cli.requiresNetwork) watchouts.push("Needs network access.");
  if (!cli.supportsNonInteractive) watchouts.push("Automation can be brittle.");
  if (!cli.supportsJsonOutput) watchouts.push("Output is mostly plain text.");
  if (cli.destructivePotential === "high") watchouts.push("Start with read-only or dry-run commands.");
  if (!cli.ciFriendly) watchouts.push("Better for local use than CI.");
  if (watchouts.length === 0) watchouts.push("Run the verify command first.");
  return watchouts.slice(0, 3);
}

function buildWhyReasons(cli: CliEntry, capability: CapabilityDefinition) {
  const reasons = [
    `${cli.shortName} fits ${capability.label.toLowerCase()} well, especially for ${stripBestFor(cli.bestFor)}.`,
  ];
  if (cli.official) {
    reasons.push(`It is the official CLI from ${cli.makerName}.`);
  } else if (cli.metricValue !== null && cli.metricLabel) {
    reasons.push(`${cli.metricValue.toLocaleString()} ${cli.metricLabel.toLowerCase()}.`);
  } else {
    reasons.push(`A solid pick from ${cli.makerName}.`);
  }
  if (cli.supportsJsonOutput && cli.supportsNonInteractive) {
    reasons.push("Good for scripts and agents.");
  } else if (cli.supportsNonInteractive) {
    reasons.push("Easy to automate.");
  } else {
    reasons.push(`Verify with \`${getVerifyStep(cli).command}\` first.`);
  }
  return reasons.slice(0, 3);
}

function buildRationale(cli: CliEntry, capability: CapabilityDefinition) {
  const fitReason = `${cli.shortName} is a strong fit for ${capability.label.toLowerCase()}.`;
  if (cli.official && cli.supportsJsonOutput) return `${fitReason} Official and script-friendly.`;
  if (cli.official) return `${fitReason} Official and easy to trust.`;
  if (cli.supportsJsonOutput && cli.supportsNonInteractive) return `${fitReason} Good for scripts and agents.`;
  return `${fitReason} ${getVerifyStep(cli).signal}`;
}

function buildAlternativeReason(primary: CliEntry, alternative: CliEntry) {
  if (alternative.official && !primary.official) {
    return `Choose this if you want the first-party tool from ${alternative.makerName}.`;
  }
  if (alternative.localFirst && !primary.localFirst) {
    return "Choose this if keeping more of the workflow local matters.";
  }
  if (alternative.supportsJsonOutput && !primary.supportsJsonOutput) {
    return "Choose this if structured output matters more.";
  }
  if (primary.destructivePotential === "high" && alternative.destructivePotential !== "high") {
    return "Choose this for a lower-risk place to start.";
  }
  return `Choose this if you care more about ${stripBestFor(alternative.bestFor)}.`;
}

function summarizeCli(cli: CliEntry): SuperchargeCliSummary {
  return {
    slug: cli.slug,
    shortName: cli.shortName,
    name: cli.name,
    installCommand: cli.installCommand,
    metricValue: cli.metricValue,
    metricLabel: cli.metricLabel,
  };
}

function getDefaultCapabilityForCli(cli: CliEntry) {
  return (
    capabilityDefinitions.find((capability) => capability.candidateSlugs.includes(cli.slug)) ??
    capabilityDefinitions.find((capability) => capability.categories.includes(cli.category)) ??
    capabilityDefinitions[0]
  );
}

function chooseCandidates(capability: CapabilityDefinition, prompt: string) {
  const ranked = searchClis(prompt);
  const capabilityPreferred = capability.candidateSlugs
    .map((slug) => clis.find((cli) => cli.slug === slug))
    .filter((cli): cli is CliEntry => Boolean(cli));

  return [...capabilityPreferred, ...ranked]
    .filter((cli, index, array) => array.findIndex((candidate) => candidate.slug === cli.slug) === index)
    .filter((cli) => capability.candidateSlugs.includes(cli.slug) || capability.categories.includes(cli.category));
}

export function buildSuperchargeRecommendation(prompt: string, preferredCapabilitySlug?: string): SuperchargeRecommendation | null {
  const directCapability = preferredCapabilitySlug ? getCapabilityBySlug(preferredCapabilitySlug) : null;
  const directCliMatch = findDirectCliMatch(prompt);
  const detectedCapability = detectCapabilityMatches(prompt)[0]?.capability;
  const matchType = directCliMatch ? "direct" : "intent";
  const capability = directCliMatch
    ? getDefaultCapabilityForCli(directCliMatch)
    : detectedCapability ?? directCapability ?? capabilityDefinitions[0];
  const candidates = directCliMatch
    ? [
        directCliMatch,
        ...searchClis(prompt).filter(
          (cli) => cli.slug !== directCliMatch.slug && (cli.category === directCliMatch.category || cli.makerSlug === directCliMatch.makerSlug),
        ),
      ]
    : chooseCandidates(capability, prompt);
  const primary = candidates[0];

  if (!primary) return null;

  const verify = getVerifyStep(primary);
  const alternatives = candidates
    .filter((cli) => cli.slug !== primary.slug)
    .slice(0, 3)
    .map((cli) => ({
      slug: cli.slug,
      shortName: cli.shortName,
      name: cli.name,
      reason: buildAlternativeReason(primary, cli),
    }));

  return {
    matchType,
    capability: { slug: capability.slug, label: capability.label },
    primary: summarizeCli(primary),
    alternatives,
    rationale: buildRationale(primary, capability),
    whyReasons: buildWhyReasons(primary, capability),
    watchouts: buildWatchouts(primary),
    verifyCommand: verify.command,
    verifySignal: verify.signal,
    loopName: capability.loopName,
    loopSteps: capability.loopSteps,
  };
}
