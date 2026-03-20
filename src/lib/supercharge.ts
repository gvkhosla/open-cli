import { clis, searchClis, type CliEntry } from "@/data/clis";
import { capabilityDefinitions, detectCapabilityMatches, getCapabilityBySlug, type CapabilityDefinition } from "@/lib/capabilities";

export type SuperchargeRecommendation = {
  capability: CapabilityDefinition;
  primary: CliEntry;
  alternatives: CliEntry[];
  rationale: string;
  setupSteps: string[];
  verifyCommand: string;
  verifySignal: string;
  skillTitle: string;
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

function buildSkillBody(cli: CliEntry, capability: CapabilityDefinition, verify: { command: string; signal: string }) {
  return [
    `# Skill: ${capability.label} with ${cli.shortName}`,
    "",
    `Use ${cli.shortName} for ${cli.bestFor.replace(/^Best for\s*/i, "").replace(/\.$/, "")}.`,
    `Maker: ${cli.makerName}`,
    `Install: ${cli.installCommand}`,
    `Verify: ${verify.command}`,
    "",
    "Preferred behavior:",
    `- Start with inspection or read-only commands whenever possible.`,
    `- Use ${cli.shortName} for ${cli.useCases.slice(0, 3).join(", ").toLowerCase()}.`,
    `- Ask before destructive, paid, or write-heavy actions.`,
    cli.supportsJsonOutput ? "- Prefer JSON or structured output when available." : "- Summarize plain-text output clearly for the user.",
    cli.requiresAuth ? "- If auth fails, stop and ask the user to re-authenticate." : "- If the command fails, verify local setup before escalating.",
    "",
    `Success signal: ${verify.signal}`,
  ].join("\n");
}

function chooseCandidates(capability: CapabilityDefinition, prompt: string) {
  const ranked = searchClis(prompt);
  const capabilityPreferred = capability.candidateSlugs
    .map((slug) => clis.find((cli) => cli.slug === slug))
    .filter((cli): cli is CliEntry => Boolean(cli));

  const combined = [...capabilityPreferred, ...ranked]
    .filter((cli, index, array) => array.findIndex((candidate) => candidate.slug === cli.slug) === index)
    .filter((cli) => capability.candidateSlugs.includes(cli.slug) || capability.categories.includes(cli.category));

  return combined;
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

  const alternatives = candidates.filter((cli) => cli.slug !== primary.slug).slice(0, 3);
  const verify = getVerifyStep(primary);

  return {
    capability,
    primary,
    alternatives,
    rationale: `${primary.shortName} is the strongest fit for ${capability.label.toLowerCase()} because it is easy to install, clear to verify, and already maps well to agent workflows.`,
    setupSteps: buildSetupSteps(primary, capability),
    verifyCommand: verify.command,
    verifySignal: verify.signal,
    skillTitle: `${capability.label} skill for ${primary.shortName}`,
    skillBody: buildSkillBody(primary, capability, verify),
    loopName: capability.loopName,
    loopSteps: capability.loopSteps,
  };
}
