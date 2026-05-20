import type { CliEntry } from "@/data/clis";

export type AgentReadiness = {
  label: "Great for agents" | "Usable with guardrails" | "Human-first CLI";
  score: number;
  reasons: string[];
  guardrails: string[];
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
  gcloud: { command: "gcloud auth list", signal: "Shows active Google Cloud identities." },
  gsutil: { command: "gsutil ls", signal: "Lists accessible Cloud Storage locations or prompts for auth." },
  bq: { command: "bq ls --format=json", signal: "Returns accessible BigQuery datasets as JSON." },
  az: { command: "az account show --output json", signal: "Shows the active Azure subscription as JSON." },
  m365: { command: "m365 status", signal: "Shows Microsoft 365 CLI login status." },
  pandoc: { command: "pandoc --version", signal: "Pandoc responds and can convert documents." },
  duckdb: { command: "duckdb -c \"select 1\"", signal: "DuckDB executes a local SQL query." },
  rg: { command: "rg --version", signal: "ripgrep responds and can search local files." },
  fd: { command: "fd --version", signal: "fd responds and can find local files." },
  rclone: { command: "rclone listremotes", signal: "Shows configured remotes without listing file contents." },
  notmuch: { command: "notmuch count", signal: "Shows the indexed email count." },
  khal: { command: "khal list today 7d", signal: "Shows calendar events for the next week." },
  gcalcli: { command: "gcalcli agenda", signal: "Shows Google Calendar agenda after auth." },
  icalbuddy: { command: "icalBuddy eventsToday", signal: "Shows today's macOS Calendar events." },
  ocrmypdf: { command: "ocrmypdf --version", signal: "OCRmyPDF responds and can process PDFs." },
  poppler: { command: "pdftotext -v", signal: "Poppler pdftotext responds and can extract PDF text." },
  ffmpeg: { command: "ffmpeg -version", signal: "FFmpeg responds and can inspect media." },
  "whisper-cpp": { command: "whisper-cli --help", signal: "whisper.cpp CLI responds and can transcribe with a model." },
};

export function getVerifyStep(cli: CliEntry) {
  return verifyOverrides[cli.slug] ?? {
    command: cli.requiresAuth ? `${cli.shortName} --help` : `${cli.shortName} --version`,
    signal: cli.requiresAuth
      ? `${cli.shortName} responds locally; authenticate before real work.`
      : `${cli.shortName} responds locally and is ready for the first real command.`,
  };
}

export function getAgentReadiness(cli: CliEntry): AgentReadiness {
  let score = 0;
  const reasons: string[] = [];
  const guardrails: string[] = [];

  if (cli.supportsJsonOutput) { score += 25; reasons.push("Structured output is available for parsing."); }
  else guardrails.push("Prefer small commands and ask the agent to summarize plain text output.");

  if (cli.supportsNonInteractive) { score += 25; reasons.push("Supports non-interactive/scripted use."); }
  else guardrails.push("Expect prompts; keep a human in the loop for interactive flows.");

  if (cli.supportsDryRun) { score += 15; reasons.push("Dry-run or preview mode can reduce risk."); }
  if (cli.ciFriendly) { score += 15; reasons.push("Works well in CI or repeatable automation."); }
  if (cli.localFirst) { score += 10; reasons.push("Can run locally with less credential exposure."); }
  if (cli.agentFriendly) score += 10;

  if (cli.requiresAuth) guardrails.push("Verify identity/account before running task commands.");
  if (cli.requiresNetwork) guardrails.push("Network access is required; avoid leaking secrets in logs.");
  if (cli.destructivePotential === "high") guardrails.push("Require confirmation before apply, delete, deploy, transfer, merge, or write actions.");
  else if (cli.destructivePotential === "medium") guardrails.push("Start read-only, then ask before mutations.");

  const label = score >= 70 ? "Great for agents" : score >= 40 ? "Usable with guardrails" : "Human-first CLI";
  return { label, score: Math.min(score, 100), reasons: reasons.slice(0, 4), guardrails: guardrails.slice(0, 5) };
}

export function buildAgentPack(cli: CliEntry) {
  const verify = getVerifyStep(cli);
  const readiness = getAgentReadiness(cli);
  const safeCommands = [verify.command, cli.quickStart, ...cli.exampleWorkflow]
    .filter(Boolean)
    .filter((command, index, array) => array.indexOf(command) === index)
    .slice(0, 5);

  return `# OpenCLI Agent Pack: ${cli.name}\n\nUse this when an AI agent needs to work with \`${cli.shortName}\`.\n\n## What this CLI is for\n${cli.description}\n\nBest for: ${cli.bestFor}\n\n## Agent readiness\n${readiness.label} (${readiness.score}/100)\n${readiness.reasons.map((reason) => `- ${reason}`).join("\n")}\n\n## Install\n\`\`\`sh\n${cli.installCommand}\n\`\`\`\n\n## Verify before real work\n\`\`\`sh\n${verify.command}\n\`\`\`\nExpected signal: ${verify.signal}\n\n## Safe starting commands\n${safeCommands.map((command) => `\`\`\`sh\n${command}\n\`\`\``).join("\n\n")}\n\n## Guardrails for agents\n${readiness.guardrails.map((rule) => `- ${rule}`).join("\n") || "- Run the verify command first.\n- Summarize findings before taking actions with side effects."}\n\n## Suggested agent instruction\nYou may use ${cli.name} (\`${cli.shortName}\`) for ${cli.bestFor.toLowerCase()}. First install it if missing, then run the verify command. Start with read-only or inspection commands. Summarize what you found before changing anything. Ask for confirmation before commands that mutate remote state, spend money, deploy, delete data, merge code, or expose secrets.\n\nSource: OpenCLI\n`;
}
