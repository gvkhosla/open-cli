const WORD_BOUNDARY = /[^a-z0-9]+/g;

export type CapabilityDefinition = {
  slug: string;
  label: string;
  blurb: string;
  samplePrompt: string;
  searchTerms: string[];
  categories: string[];
  candidateSlugs: string[];
  setupChecklist: string[];
  loopName: string;
  loopSteps: string[];
};

export const capabilityDefinitions: CapabilityDefinition[] = [
  {
    slug: "github",
    label: "Git & GitHub",
    blurb: "Review PRs, triage issues, inspect workflows, and keep repo work agent-safe.",
    samplePrompt: "Review open pull requests in my GitHub repo, summarize what changed, and flag anything risky before I merge.",
    searchTerms: ["github", "git", "repo", "repository", "pull request", "pr", "issue", "workflow", "actions", "merge"],
    categories: ["Git"],
    candidateSlugs: ["gh", "lazygit", "gitui", "jj", "delta"],
    setupChecklist: [
      "Install the CLI and make sure it is on your PATH.",
      "Authenticate or point the tool at the repository you want the agent to use.",
      "Prefer JSON or read-only commands first, then ask before merges or writes.",
    ],
    loopName: "GitHub review loop",
    loopSteps: [
      "Inspect the repository and current branch context.",
      "List open PRs or issues, then summarize the highest-signal items.",
      "Check CI status, changed files, and discussion context before proposing action.",
      "Ask for confirmation before merges, closes, or pushes.",
    ],
  },
  {
    slug: "deploy",
    label: "Deploy",
    blurb: "Ship previews, inspect logs, and move safely toward production.",
    samplePrompt: "Deploy my app, check the preview URL, and only suggest production once the preview looks healthy.",
    searchTerms: ["deploy", "deployment", "preview", "production", "hosting", "rollback", "logs", "nextjs", "serverless", "edge"],
    categories: ["Deploy", "Cloud"],
    candidateSlugs: ["vercel", "wrangler", "flyctl", "railway", "netlify", "firebase"],
    setupChecklist: [
      "Install the deploy CLI that best matches your stack.",
      "Log in and link the local project or remote app.",
      "Verify identity and project context before your first real deploy.",
    ],
    loopName: "Preview deploy loop",
    loopSteps: [
      "Check framework and deployment target.",
      "Deploy a preview or staging build first.",
      "Inspect logs, URL health, and environment configuration.",
      "Ask before production deploys, rollbacks, or env changes.",
    ],
  },
  {
    slug: "database",
    label: "Data & DB",
    blurb: "Inspect schemas, run safe queries, and understand your data fast.",
    samplePrompt: "Inspect my Postgres schema, show the key tables, and answer questions with read-only queries first.",
    searchTerms: ["database", "db", "postgres", "postgresql", "sql", "schema", "migration", "query", "sqlite", "mysql"],
    categories: ["Database", "Data"],
    candidateSlugs: ["pgcli", "usql", "sqlite-utils", "duckdb", "mycli", "litecli"],
    setupChecklist: [
      "Install a CLI that matches your database engine.",
      "Provide a safe connection string or local file path.",
      "Start with schema inspection and read-only queries before any writes.",
    ],
    loopName: "Safe database loop",
    loopSteps: [
      "Verify connection details and inspect tables or schema first.",
      "Run read-only queries and summarize findings.",
      "Propose follow-up queries or exports based on the result.",
      "Ask before writes, resets, or migrations.",
    ],
  },
  {
    slug: "browser",
    label: "Browser",
    blurb: "Give your agent a browser it can inspect, test, and automate.",
    samplePrompt: "Use a browser tool to test my signup flow, capture the key steps, and tell me where it fails.",
    searchTerms: ["browser", "automation", "scrape", "crawl", "web", "e2e", "test", "page", "form", "screenshot"],
    categories: ["Browser Automation", "Scraping"],
    candidateSlugs: ["playwright", "browser-use", "firecrawl", "summarize"],
    setupChecklist: [
      "Install the browser or scraping CLI and any required browser dependencies.",
      "Sign in or add API keys only if the workflow needs hosted services.",
      "Verify the tool can reach the target page before running bigger loops.",
    ],
    loopName: "Browser task loop",
    loopSteps: [
      "Open the target page or discover the site structure.",
      "Capture key state, errors, and screenshots as structured output.",
      "Replay or refine the sequence step by step.",
      "Ask before form submissions, purchases, or destructive browser actions.",
    ],
  },
  {
    slug: "ai",
    label: "Local AI",
    blurb: "Set up coding agents, local models, and AI-first terminal workflows.",
    samplePrompt: "Set up an agent-friendly AI stack so I can run local models and coding workflows from the terminal.",
    searchTerms: ["ai", "agent", "local models", "llm", "coding agent", "prompt", "ollama", "claude", "codex", "gemini"],
    categories: ["AI", "Package Management"],
    candidateSlugs: ["claude-code", "codex", "gemini-cli", "ollama", "llm", "aider", "uv"],
    setupChecklist: [
      "Install the CLI and any required runtime, model, or Python environment.",
      "Authenticate if the model provider requires it, or pull the local model first.",
      "Verify a tiny prompt or hello-world command before giving the agent bigger jobs.",
    ],
    loopName: "Agent capability loop",
    loopSteps: [
      "Check model, runtime, and auth state.",
      "Run a small verification prompt or command.",
      "Apply the tool to the real task with structured, non-interactive commands when possible.",
      "Ask before code edits, shell writes, or paid model usage.",
    ],
  },
  {
    slug: "infra",
    label: "Infra",
    blurb: "Work with Kubernetes, Terraform, containers, and ops tooling with more confidence.",
    samplePrompt: "Inspect my infra setup, show me the safest CLI for this stack, and verify it before making changes.",
    searchTerms: ["infra", "kubernetes", "k8s", "terraform", "helm", "docker", "cluster", "container", "ops", "observability"],
    categories: ["Containers / Infra", "Cloud", "Observability", "Security"],
    candidateSlugs: ["kubectl", "helm", "terraform", "docker", "k9s", "stern", "trivy"],
    setupChecklist: [
      "Install the infra CLI and verify kubeconfig, Docker context, or cloud credentials.",
      "Start with inspection commands and current-state reads.",
      "Require confirmation before apply, delete, rollout, or security actions with side effects.",
    ],
    loopName: "Infra inspection loop",
    loopSteps: [
      "Check the active context and target environment.",
      "Inspect current state, recent logs, or plan output.",
      "Summarize what is safe to do next.",
      "Ask before apply, delete, restart, or rollout operations.",
    ],
  },
  {
    slug: "wallet",
    label: "Wallet",
    blurb: "Give your agent wallet-aware capabilities, service discovery, and paid requests.",
    samplePrompt: "Set up a wallet CLI my agent can use to discover services, preview costs, and make paid requests safely.",
    searchTerms: ["wallet", "payments", "paid requests", "tempo", "mpp", "machine payments", "stablecoin", "onchain", "web3", "crypto"],
    categories: ["Wallet / Payments"],
    candidateSlugs: ["tempo"],
    setupChecklist: [
      "Install the wallet CLI and add it to your PATH.",
      "Log in, verify the active wallet, and fund it if the workflow needs paid requests.",
      "Preview costs or dry-run requests before making agent-driven payments.",
    ],
    loopName: "Wallet service loop",
    loopSteps: [
      "Check wallet readiness, identity, and balance.",
      "Discover services and inspect endpoint metadata before making requests.",
      "Preview cost and payment behavior before the real request.",
      "Ask before funding, transfers, or any action with real money implications.",
    ],
  },
];

export function normalizeIntentText(value: string) {
  return value.toLowerCase().replace(WORD_BOUNDARY, " ").trim();
}

export function detectCapabilityMatches(input: string) {
  const normalized = normalizeIntentText(input);
  if (!normalized) {
    return [];
  }

  const padded = ` ${normalized} `;

  return capabilityDefinitions
    .map((capability) => {
      let score = 0;

      for (const term of capability.searchTerms) {
        const normalizedTerm = normalizeIntentText(term);
        if (!normalizedTerm) continue;
        if (normalized === normalizedTerm) score += 12;
        if (padded.includes(` ${normalizedTerm} `)) score += normalizedTerm.includes(" ") ? 10 : 6;
        else if (normalized.includes(normalizedTerm)) score += 3;
      }

      return { capability, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.capability.label.localeCompare(b.capability.label));
}

export function getCapabilityBySlug(slug: string) {
  return capabilityDefinitions.find((capability) => capability.slug === slug);
}
