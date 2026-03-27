import { clis, searchClis, type CliEntry } from "@/data/clis";
import { capabilityDefinitions, detectCapabilityMatches, getCapabilityBySlug, type CapabilityDefinition } from "@/lib/capabilities";
import { resolveCompanionSkillsForCli, type CompanionSkill } from "@/lib/skill-links";
import { skillOverrides, type SkillOutputMode } from "@/lib/skill-overrides";

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

export type SkillPack = {
  cliSlug: string;
  cliShortName: string;
  cliName: string;
  title: string;
  summary: string;
  installCommand: string;
  verifyCommand: string;
  verifySignal: string;
  firstSteps: string[];
  safeCommands: string[];
  askBefore: string[];
  preferredOutput: SkillOutputMode;
  safeModeLabel: string;
  whyReasons: string[];
  watchouts: string[];
  prompts: string[];
  loopName: string;
  loopSteps: string[];
  companionSkills: CompanionSkill[];
  skillMarkdown: string;
  agentsMarkdown: string;
  harnessJson: string;
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
  companionSkills: CompanionSkill[];
  skillPack: SkillPack;
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

const RISKY_COMMAND_PATTERN = /(deploy|--prod|delete|destroy|remove|rm\b|drop|reset|rollback|merge|close|push|apply|fund|transfer|write|publish)/i;

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

function getPreferredOutput(cli: CliEntry): SkillOutputMode {
  const override = skillOverrides[cli.slug]?.preferredOutput;
  if (override) return override;
  if (cli.supportsJsonOutput) return "json";
  if (cli.supportsNonInteractive) return "mixed";
  return "text";
}

function buildAskBefore(cli: CliEntry) {
  const override = skillOverrides[cli.slug]?.askBefore;
  if (override?.length) {
    return override.slice(0, 4);
  }

  if (cli.destructivePotential === "high") {
    return ["delete or destroy resources", "production changes", "mutations with side effects"];
  }

  if (cli.destructivePotential === "medium") {
    return ["write actions", "state changes", "closing or merging work"];
  }

  return ["destructive or irreversible actions"];
}

function buildSafeModeLabel(cli: CliEntry) {
  if (cli.destructivePotential !== "low" || cli.requiresAuth) {
    return "Read-only first";
  }

  if (cli.supportsJsonOutput) {
    return "Structured output first";
  }

  return "Verify before automation";
}

function buildSafeCommands(cli: CliEntry, verify: { command: string; signal: string }) {
  const override = skillOverrides[cli.slug]?.safeCommands;
  if (override?.length) {
    return override.slice(0, 4);
  }

  const exampleCommands = cli.exampleWorkflow.filter((command) => !RISKY_COMMAND_PATTERN.test(command));

  return Array.from(new Set([verify.command, `${cli.shortName} --help`, ...exampleCommands])).slice(0, 4);
}

function buildPromptSuggestions(cli: CliEntry, capability: CapabilityDefinition) {
  const override = skillOverrides[cli.slug]?.suggestedPrompts;
  if (override?.length) {
    return override.slice(0, 3);
  }

  return [
    capability.samplePrompt,
    `Use ${cli.shortName} in read-only mode first, summarize what you find, and ask before any action with side effects.`,
    cli.supportsJsonOutput
      ? `Use ${cli.shortName} with machine-readable output when possible and return a concise summary.`
      : `Use ${cli.shortName} carefully, prefer inspection commands first, and explain any risky step before running it.`,
  ].slice(0, 3);
}

function buildCompanionSkillSection(companionSkills: CompanionSkill[]) {
  if (companionSkills.length === 0) return [] as string[];

  return [
    "## skills.sh integration",
    "Open CLI integrates this CLI with companion skills from skills.sh so you can add the right workflow, not just the binary.",
    ...companionSkills.flatMap((skill) => [
      `### ${skill.title}`,
      `- ${skill.confidenceLabel}`,
      `- Install: \`${skill.installCommand}\``,
      `- skills.sh: ${skill.skillsUrl}`,
      `- Why: ${skill.whyItPairs}`,
      `- Starter prompt: ${skill.starterPrompt}`,
      "",
    ]),
  ];
}

function buildSkillMarkdown(
  cli: CliEntry,
  capability: CapabilityDefinition,
  verify: { command: string; signal: string },
  whyReasons: string[],
  watchouts: string[],
  firstSteps: string[],
  safeCommands: string[],
  askBefore: string[],
  preferredOutput: SkillOutputMode,
  prompts: string[],
  companionSkills: CompanionSkill[],
) {
  return [
    `# SKILL.md — ${cli.shortName}`,
    "",
    `Use \`${cli.shortName}\` for ${stripBestFor(cli.bestFor)}.`,
    `Maker: ${cli.makerName}`,
    `Capability: ${capability.label}`,
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
    "## Safe commands",
    ...safeCommands.map((command) => `- ${command}`),
    "",
    "## Preferred output",
    preferredOutput === "json"
      ? "Prefer JSON or machine-readable output whenever the CLI supports it."
      : preferredOutput === "mixed"
        ? "Prefer non-interactive commands first and switch to machine-readable output where available."
        : "Treat the output as human-oriented text and verify results before automating around it.",
    "",
    "## Ask before",
    ...askBefore.map((rule) => `- ${rule}`),
    "",
    "## Why this tool",
    ...whyReasons.map((reason) => `- ${reason}`),
    "",
    "## Watch out for",
    ...watchouts.map((watchout) => `- ${watchout}`),
    "",
    "## Suggested prompts",
    ...prompts.map((prompt) => `- ${prompt}`),
    "",
    ...buildCompanionSkillSection(companionSkills),
    `## ${capability.loopName}`,
    ...capability.loopSteps.map((step, index) => `${index + 1}. ${step}`),
  ].join("\n");
}

function buildAgentsMarkdown(
  cli: CliEntry,
  verify: { command: string; signal: string },
  askBefore: string[],
  preferredOutput: SkillOutputMode,
  companionSkills: CompanionSkill[],
) {
  const outputLine =
    preferredOutput === "json"
      ? "Prefer JSON output when possible."
      : preferredOutput === "mixed"
        ? "Prefer non-interactive commands first and use structured output when available."
        : "Treat output as plain text and verify before automating around it.";

  return [
    `## ${cli.name} (${cli.shortName})`,
    `- Install: \`${cli.installCommand}\``,
    `- Verify: \`${verify.command}\``,
    `- ${outputLine}`,
    "- Start with read-only or low-risk commands first.",
    `- Ask before ${askBefore.join(", ")}.`,
    ...(companionSkills.length > 0
      ? [
          "- Open CLI integrates this CLI with skills.sh companion skills:",
          ...companionSkills.map((skill) => `  - ${skill.title}: \`${skill.installCommand}\``),
        ]
      : []),
  ].join("\n");
}

function buildHarnessJson(
  cli: CliEntry,
  verify: { command: string; signal: string },
  firstSteps: string[],
  safeCommands: string[],
  askBefore: string[],
  preferredOutput: SkillOutputMode,
  watchouts: string[],
  prompts: string[],
  companionSkills: CompanionSkill[],
) {
  return JSON.stringify(
    {
      slug: cli.slug,
      title: `${cli.name} skill pack`,
      installCommand: cli.installCommand,
      verifyCommand: verify.command,
      verifySignal: verify.signal,
      safeStart: firstSteps,
      safeCommands,
      preferredOutput,
      askBefore,
      watchouts,
      prompts,
      companionSkills: companionSkills.map((skill) => ({
        title: skill.title,
        confidence: skill.confidence,
        installCommand: skill.installCommand,
        skillsUrl: skill.skillsUrl,
        starterPrompt: skill.starterPrompt,
      })),
    },
    null,
    2,
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

export function buildSkillPackForCli(cli: CliEntry, capability = getDefaultCapabilityForCli(cli)): SkillPack {
  const verify = getVerifyStep(cli);
  const whyReasons = buildWhyReasons(cli, capability, verify);
  const watchouts = buildWatchouts(cli);
  const setupSteps = buildSetupSteps(cli, capability);
  const companionSkills = resolveCompanionSkillsForCli(cli);
  const firstSteps = [
    `Install ${cli.shortName}.`,
    `Run \`${verify.command}\` first.`,
    `Start with \`${cli.quickStart}\`.`,
    ...setupSteps,
  ].slice(0, 4);
  const safeCommands = buildSafeCommands(cli, verify);
  const askBefore = buildAskBefore(cli);
  const preferredOutput = getPreferredOutput(cli);
  const prompts = buildPromptSuggestions(cli, capability);

  return {
    cliSlug: cli.slug,
    cliShortName: cli.shortName,
    cliName: cli.name,
    title: `${cli.shortName} skill pack`,
    summary: `Use ${cli.shortName} for ${stripBestFor(cli.bestFor)}.`,
    installCommand: cli.installCommand,
    verifyCommand: verify.command,
    verifySignal: verify.signal,
    firstSteps,
    safeCommands,
    askBefore,
    preferredOutput,
    safeModeLabel: buildSafeModeLabel(cli),
    whyReasons,
    watchouts,
    prompts,
    loopName: capability.loopName,
    loopSteps: capability.loopSteps,
    companionSkills,
    skillMarkdown: buildSkillMarkdown(
      cli,
      capability,
      verify,
      whyReasons,
      watchouts,
      firstSteps,
      safeCommands,
      askBefore,
      preferredOutput,
      prompts,
      companionSkills,
    ),
    agentsMarkdown: buildAgentsMarkdown(cli, verify, askBefore, preferredOutput, companionSkills),
    harnessJson: buildHarnessJson(cli, verify, firstSteps, safeCommands, askBefore, preferredOutput, watchouts, prompts, companionSkills),
    fileName: `${capability.slug}-${cli.slug}-SKILL.md`,
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

  const skillPack = buildSkillPackForCli(primary, capability);
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
      command: skillPack.verifyCommand,
      signal: skillPack.verifySignal,
    }),
    whyReasons: skillPack.whyReasons,
    watchouts: skillPack.watchouts,
    setupSteps: skillPack.firstSteps,
    verifyCommand: skillPack.verifyCommand,
    verifySignal: skillPack.verifySignal,
    companionSkills: skillPack.companionSkills,
    skillPack,
    skillTitle: skillPack.title,
    skillFileName: skillPack.fileName,
    skillBody: skillPack.skillMarkdown,
    loopName: skillPack.loopName,
    loopSteps: skillPack.loopSteps,
  };
}
