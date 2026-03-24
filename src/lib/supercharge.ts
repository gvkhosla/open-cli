import { clis, searchClis, type CliEntry } from "@/data/clis";
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

export type WorkflowPack = {
  cliSlug: string;
  cliShortName: string;
  cliName: string;
  title: string;
  summary: string;
  installCommand: string;
  verifyCommand: string;
  verifySignal: string;
  firstSteps: string[];
  whyReasons: string[];
  watchouts: string[];
  loopName: string;
  loopSteps: string[];
  markdown: string;
  fileName: string;
};

export type SuperchargeRecommendation = {
  capability: {
    slug: string;
    label: string;
  };
  primary: SuperchargeCliSummary;
  alternatives: SuperchargeAlternative[];
  rationale: string;
  whyReasons: string[];
  watchouts: string[];
  setupSteps: string[];
  verifyCommand: string;
  verifySignal: string;
  workflowPack: WorkflowPack;
  skillTitle: string;
  skillFileName: string;
  skillBody: string;
  loopName: string;
  loopSteps: string[];
};

const verifyOverrides: Record<string, { command: string; signal: string }> = {
  gh: { command: "gh auth status", signal: "The command shows the signed-in GitHub account and scopes." },
  vercel: { command: "vercel whoami", signal: "You see the active Vercel account or team." },
  wrangler: { command: "wrangler whoami", signal: "Wrangler prints the active Cloudflare identity." },
  flyctl: { command: "fly auth whoami", signal: "Fly shows the active org or user identity." },
  railway: { command: "railway whoami", signal: "Railway confirms the authenticated account." },
  supabase: { command: "supabase --version", signal: "The CLI responds and is ready for local project setup." },
  pgcli: { command: "pgcli --version", signal: "pgcli responds locally before you point it at a database." },
  usql: { command: "usql --help", signal: "usql responds and shows available connection options." },
  "sqlite-utils": { command: "sqlite-utils --help", signal: "sqlite-utils responds and is ready for local database work." },
  playwright: { command: "playwright --help", signal: "Playwright responds and the CLI is available on PATH." },
  "browser-use": { command: "python -c 'import browser_use; print(browser_use.__version__)'", signal: "Python imports browser-use successfully." },
  ollama: { command: "ollama --version", signal: "Ollama responds locally and is ready for models." },
  llm: { command: "llm --help", signal: "The llm CLI responds and is ready for prompts." },
  aider: { command: "aider --help", signal: "The aider CLI responds and is ready for coding loops." },
  codex: { command: "codex --help", signal: "The Codex CLI responds and is ready for agent workflows." },
  "claude-code": { command: "claude --help", signal: "Claude Code responds and is ready for use." },
  "gemini-cli": { command: "gemini --help", signal: "Gemini CLI responds and is ready for use." },
  kubectl: { command: "kubectl config current-context", signal: "kubectl prints the active cluster context." },
  terraform: { command: "terraform version", signal: "Terraform responds and is ready to inspect or plan." },
  helm: { command: "helm version", signal: "Helm responds and is ready for chart work." },
  docker: { command: "docker version", signal: "Docker responds and the daemon is reachable." },
  tempo: { command: "tempo wallet whoami", signal: "Tempo prints the active wallet or prompts you to log in first." },
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

function buildSetupSteps(cli: CliEntry, capability: CapabilityDefinition) {
  const steps = [...capability.setupChecklist];

  if (cli.requiresAuth) {
    steps.unshift(`Authenticate ${cli.shortName} before asking the agent to do real work.`);
  }

  if (cli.supportsJsonOutput) {
    steps.push(`Prefer JSON or machine-readable output from ${cli.shortName} when the agent can use it.`);
  }

  return Array.from(new Set(steps)).slice(0, 4);
}

function buildWatchouts(cli: CliEntry) {
  const watchouts: string[] = [];

  if (cli.requiresAuth) {
    watchouts.push("Sign in before real work.");
  }

  if (cli.requiresNetwork) {
    watchouts.push("Needs network access.");
  }

  if (!cli.supportsNonInteractive) {
    watchouts.push("Automation can be brittle.");
  }

  if (!cli.supportsJsonOutput) {
    watchouts.push("Output is mostly plain text.");
  }

  if (cli.destructivePotential === "high") {
    watchouts.push("Start with read-only or dry-run commands.");
  }

  if (!cli.ciFriendly) {
    watchouts.push("Better for local use than CI.");
  }

  if (watchouts.length === 0) {
    watchouts.push("Run the verify command first.");
  }

  return watchouts.slice(0, 3);
}

function buildWhyReasons(cli: CliEntry, capability: CapabilityDefinition, verify: { command: string; signal: string }) {
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
    reasons.push(`Verify with \`${verify.command}\` first.`);
  }

  return reasons.slice(0, 3);
}

function buildRationale(cli: CliEntry, capability: CapabilityDefinition, verify: { command: string; signal: string }) {
  const fitReason = `${cli.shortName} is a strong fit for ${capability.label.toLowerCase()}.`;

  if (cli.official && cli.supportsJsonOutput) {
    return `${fitReason} Official and script-friendly.`;
  }

  if (cli.official) {
    return `${fitReason} Official and easy to trust.`;
  }

  if (cli.supportsJsonOutput && cli.supportsNonInteractive) {
    return `${fitReason} Good for scripts and agents.`;
  }

  return `${fitReason} ${verify.signal}`;
}

function buildAlternativeReason(primary: CliEntry, alternative: CliEntry) {
  if (alternative.official && !primary.official) {
    return `Choose this if you want the first-party tool from ${alternative.makerName}.`;
  }

  if (alternative.localFirst && !primary.localFirst) {
    return "Choose this if keeping more of the workflow local matters more than broader platform coverage.";
  }

  if (alternative.supportsJsonOutput && !primary.supportsJsonOutput) {
    return "Choose this if structured output matters more than the default recommendation's ergonomics.";
  }

  if (primary.destructivePotential === "high" && alternative.destructivePotential !== "high") {
    return "Choose this if you want a lower-risk place to start before using a more powerful tool.";
  }

  if (alternative.installWith === "brew" && primary.installWith !== "brew") {
    return "Choose this if you want a simpler Homebrew-first install path.";
  }

  return `Choose this if you care more about ${stripBestFor(alternative.bestFor)}.`;
}

function buildWorkflowPackMarkdown(
  cli: CliEntry,
  capability: CapabilityDefinition,
  verify: { command: string; signal: string },
  whyReasons: string[],
  watchouts: string[],
  firstSteps: string[],
) {
  return [
    `# Workflow Pack: ${capability.label} with ${cli.shortName}`,
    "",
    `Use ${cli.shortName} for ${stripBestFor(cli.bestFor)}.`,
    `Maker: ${cli.makerName}`,
    "",
    "## Install",
    cli.installCommand,
    "",
    "## Verify",
    verify.command,
    "",
    `Success looks like: ${verify.signal}`,
    "",
    "## Safe start",
    ...firstSteps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "## Why this tool",
    ...whyReasons.map((reason) => `- ${reason}`),
    "",
    "## Watch out for",
    ...watchouts.map((watchout) => `- ${watchout}`),
    "",
    "## Suggested loop",
    ...capability.loopSteps.map((step, index) => `${index + 1}. ${step}`),
  ].join("\n");
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

export function buildWorkflowPackForCli(cli: CliEntry, capability = getDefaultCapabilityForCli(cli)): WorkflowPack {
  const verify = getVerifyStep(cli);
  const whyReasons = buildWhyReasons(cli, capability, verify);
  const watchouts = buildWatchouts(cli);
  const setupSteps = buildSetupSteps(cli, capability);
  const firstSteps = [
    `Install ${cli.shortName}.`,
    `Run \`${verify.command}\` first.`,
    `Start with \`${cli.quickStart}\`.`,
    ...setupSteps,
  ].slice(0, 4);

  return {
    cliSlug: cli.slug,
    cliShortName: cli.shortName,
    cliName: cli.name,
    title: `${cli.shortName} pack`,
    summary: `Use ${cli.shortName} for ${stripBestFor(cli.bestFor)}.`,
    installCommand: cli.installCommand,
    verifyCommand: verify.command,
    verifySignal: verify.signal,
    firstSteps,
    whyReasons,
    watchouts,
    loopName: capability.loopName,
    loopSteps: capability.loopSteps,
    markdown: buildWorkflowPackMarkdown(cli, capability, verify, whyReasons, watchouts, firstSteps),
    fileName: `${capability.slug}-${cli.slug}-workflow-pack.md`,
  };
}

export function buildSuperchargeRecommendation(prompt: string, preferredCapabilitySlug?: string): SuperchargeRecommendation | null {
  const directCapability = preferredCapabilitySlug ? getCapabilityBySlug(preferredCapabilitySlug) : null;
  const detectedCapability = detectCapabilityMatches(prompt)[0]?.capability;
  const capability = detectedCapability ?? directCapability ?? capabilityDefinitions[0];
  const candidates = chooseCandidates(capability, prompt);
  const primary = candidates[0];

  if (!primary) {
    return null;
  }

  const workflowPack = buildWorkflowPackForCli(primary, capability);
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
    capability: {
      slug: capability.slug,
      label: capability.label,
    },
    primary: summarizeCli(primary),
    alternatives,
    rationale: buildRationale(primary, capability, {
      command: workflowPack.verifyCommand,
      signal: workflowPack.verifySignal,
    }),
    whyReasons: workflowPack.whyReasons,
    watchouts: workflowPack.watchouts,
    setupSteps: workflowPack.firstSteps,
    verifyCommand: workflowPack.verifyCommand,
    verifySignal: workflowPack.verifySignal,
    workflowPack,
    skillTitle: workflowPack.title,
    skillFileName: workflowPack.fileName,
    skillBody: workflowPack.markdown,
    loopName: workflowPack.loopName,
    loopSteps: workflowPack.loopSteps,
  };
}
