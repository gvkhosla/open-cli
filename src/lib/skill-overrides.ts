export type SkillOutputMode = "json" | "text" | "mixed";

export type SkillOverride = {
  safeCommands?: string[];
  askBefore?: string[];
  suggestedPrompts?: string[];
  preferredOutput?: SkillOutputMode;
};

export const skillOverrides: Record<string, SkillOverride> = {
  gh: {
    safeCommands: [
      "gh repo view",
      "gh pr list --json number,title,author,state",
      "gh issue list --json number,title,state",
    ],
    askBefore: ["merge", "close", "push", "delete"],
    suggestedPrompts: [
      "Review open pull requests and summarize the risky ones before suggesting any action.",
      "Check failing GitHub Actions runs and explain the likely cause.",
      "List stale issues, group them by theme, and suggest the safest next step.",
    ],
    preferredOutput: "json",
  },
  vercel: {
    safeCommands: [
      "vercel whoami",
      "vercel project ls",
      "vercel env ls",
    ],
    askBefore: ["deploy to production", "change environment variables", "remove deployments"],
    suggestedPrompts: [
      "Check the current Vercel project and confirm the linked environment before suggesting any deploy.",
      "Inspect preview deployments and summarize anything broken before production.",
      "List environment variables and identify anything missing without changing them.",
    ],
    preferredOutput: "mixed",
  },
  wrangler: {
    safeCommands: [
      "wrangler whoami",
      "wrangler deployments list",
      "wrangler tail --help",
    ],
    askBefore: ["deploy", "delete resources", "change bindings or secrets"],
    suggestedPrompts: [
      "Inspect the active Cloudflare account and recent deployments before suggesting any rollout.",
      "Review worker bindings and explain what each one does without editing them.",
      "Check logs or deployment history and summarize the safest next step.",
    ],
    preferredOutput: "mixed",
  },
  supabase: {
    safeCommands: [
      "supabase --version",
      "supabase status",
      "supabase db diff --help",
    ],
    askBefore: ["push migrations", "reset local data", "link or deploy to production"],
    suggestedPrompts: [
      "Inspect the local Supabase setup and list the key services that are running.",
      "Review pending migration changes before applying anything.",
      "Explain how to safely diff the schema and verify the result first.",
    ],
    preferredOutput: "mixed",
  },
  ollama: {
    safeCommands: [
      "ollama --version",
      "ollama list",
      "ollama show llama3.2",
    ],
    askBefore: ["pull large models", "delete models", "run paid or hosted fallbacks"],
    suggestedPrompts: [
      "Inspect the local Ollama setup and list which models are already available.",
      "Recommend the smallest model that can validate the workflow before pulling anything large.",
      "Show how to run a tiny verification prompt locally and summarize the result.",
    ],
    preferredOutput: "text",
  },
};
