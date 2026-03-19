import builderLaunchesJson from "@/content/builder-launches.json";

export type PackageManager = "brew" | "npm" | "cargo" | "pipx" | "curl" | "go";

export type CliEntry = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: "AI" | "Deploy" | "Package Management" | "Git" | "Cloud" | "Data" | "Productivity";
  installWith: PackageManager;
  installCommand: string;
  quickStart: string;
  exampleWorkflow: string[];
  website: string;
  github: string;
  docs: string;
  stars: number;
  monthlyDownloads: number;
  score: number;
  trending: "+" | "-";
  trendingAmount: number;
  featured?: boolean;
  useCases: string[];
};

export const clis: CliEntry[] = [
  {
    slug: "gh",
    name: "GitHub CLI",
    shortName: "gh",
    tagline: "Use GitHub from your terminal for repos, pull requests, issues, and actions.",
    description:
      "GitHub CLI lets you do common GitHub work without opening the browser first. It is easy to install, easy to understand, and useful from the first command.",
    category: "Git",
    installWith: "brew",
    installCommand: "brew install gh",
    quickStart: "gh auth login && gh repo clone vercel/next.js",
    exampleWorkflow: [
      "gh auth login",
      "gh repo clone vercel/next.js",
      "gh pr create --fill",
    ],
    website: "https://cli.github.com",
    github: "https://github.com/cli/cli",
    docs: "https://cli.github.com/manual/",
    stars: 40200,
    monthlyDownloads: 5200000,
    score: 98,
    trending: "+",
    trendingAmount: 6,
    featured: true,
    useCases: ["Pull requests", "Issue triage", "GitHub Actions"],
  },
  {
    slug: "vercel",
    name: "Vercel CLI",
    shortName: "vercel",
    tagline: "Deploy projects, create previews, and manage Vercel from the command line.",
    description:
      "Vercel CLI is a good example of a clean product CLI. You can log in, link a project, and deploy quickly without much setup.",
    category: "Deploy",
    installWith: "npm",
    installCommand: "npm i -g vercel",
    quickStart: "vercel login && vercel",
    exampleWorkflow: [
      "vercel login",
      "vercel link",
      "vercel --prod",
    ],
    website: "https://vercel.com/docs/cli",
    github: "https://github.com/vercel/vercel",
    docs: "https://vercel.com/docs/cli",
    stars: 14800,
    monthlyDownloads: 3100000,
    score: 95,
    trending: "+",
    trendingAmount: 8,
    featured: true,
    useCases: ["Deploy previews", "Project linking", "Environment sync"],
  },
  {
    slug: "uv",
    name: "uv",
    shortName: "uv",
    tagline: "Install Python packages, create projects, and run scripts very quickly.",
    description:
      "uv is one of the fastest ways to start and run Python projects. It is a good example here because the install step is short and the first command is easy to copy and try.",
    category: "Package Management",
    installWith: "brew",
    installCommand: "brew install uv",
    quickStart: "uv init demo && cd demo && uv run main.py",
    exampleWorkflow: [
      "uv init demo",
      "cd demo",
      "uv add httpx && uv run main.py",
    ],
    website: "https://docs.astral.sh/uv/",
    github: "https://github.com/astral-sh/uv",
    docs: "https://docs.astral.sh/uv/",
    stars: 58900,
    monthlyDownloads: 1400000,
    score: 97,
    trending: "+",
    trendingAmount: 11,
    featured: true,
    useCases: ["Python envs", "Fast installs", "Script execution"],
  },
  {
    slug: "pnpm",
    name: "pnpm",
    shortName: "pnpm",
    tagline: "Install JavaScript dependencies quickly, especially in larger projects and monorepos.",
    description:
      "pnpm is popular with JavaScript and TypeScript teams because it is fast and saves disk space. It is a practical tool for everyday development work.",
    category: "Package Management",
    installWith: "npm",
    installCommand: "npm i -g pnpm",
    quickStart: "pnpm create next-app@latest open-cli",
    exampleWorkflow: [
      "pnpm install",
      "pnpm dev",
      "pnpm dlx shadcn@latest init",
    ],
    website: "https://pnpm.io",
    github: "https://github.com/pnpm/pnpm",
    docs: "https://pnpm.io/cli/install",
    stars: 33000,
    monthlyDownloads: 12600000,
    score: 92,
    trending: "+",
    trendingAmount: 4,
    useCases: ["Monorepos", "Fast installs", "Disk efficiency"],
  },
  {
    slug: "bun",
    name: "Bun",
    shortName: "bun",
    tagline: "Run JavaScript, install packages, and use one fast toolkit for common tasks.",
    description:
      "Bun combines a runtime, package manager, and task runner in one CLI. That makes it easy for people to try because one install gives them several useful tools.",
    category: "Package Management",
    installWith: "curl",
    installCommand: "curl -fsSL https://bun.sh/install | bash",
    quickStart: "bun create next-app open-cli",
    exampleWorkflow: [
      "bun install",
      "bun run dev",
      "bunx prettier . --write",
    ],
    website: "https://bun.sh",
    github: "https://github.com/oven-sh/bun",
    docs: "https://bun.sh/docs",
    stars: 84000,
    monthlyDownloads: 2200000,
    score: 90,
    trending: "+",
    trendingAmount: 7,
    useCases: ["JS runtime", "Task runner", "Package management"],
  },
  {
    slug: "deno",
    name: "Deno",
    shortName: "deno",
    tagline: "Run TypeScript or JavaScript with built-in tools for formatting, linting, and tasks.",
    description:
      "Deno gives you a runtime and a few helpful tools in one place. It is easy to explain because the same CLI can run code, format files, and start tasks.",
    category: "Data",
    installWith: "brew",
    installCommand: "brew install deno",
    quickStart: "deno init my-app && cd my-app && deno task start",
    exampleWorkflow: [
      "deno init my-app",
      "deno fmt",
      "deno task dev",
    ],
    website: "https://deno.com",
    github: "https://github.com/denoland/deno",
    docs: "https://docs.deno.com/runtime/reference/cli/",
    stars: 102000,
    monthlyDownloads: 890000,
    score: 88,
    trending: "+",
    trendingAmount: 3,
    useCases: ["TS runtime", "Built-in tooling", "Scripting"],
  },
  {
    slug: "wrangler",
    name: "Wrangler",
    shortName: "wrangler",
    tagline: "Build and deploy Cloudflare Workers and related cloud services from one CLI.",
    description:
      "Wrangler helps you build, test, and deploy Cloudflare projects from Terminal. It is especially helpful if you want a simple path from local development to production.",
    category: "Cloud",
    installWith: "npm",
    installCommand: "npm i -g wrangler",
    quickStart: "wrangler login && wrangler init hello-workers",
    exampleWorkflow: [
      "wrangler login",
      "wrangler dev",
      "wrangler deploy",
    ],
    website: "https://developers.cloudflare.com/workers/wrangler/",
    github: "https://github.com/cloudflare/workers-sdk",
    docs: "https://developers.cloudflare.com/workers/wrangler/",
    stars: 4400,
    monthlyDownloads: 2400000,
    score: 89,
    trending: "+",
    trendingAmount: 5,
    useCases: ["Workers", "Queues", "KV and R2"],
  },
  {
    slug: "ollama",
    name: "Ollama",
    shortName: "ollama",
    tagline: "Download, run, and serve local AI models with a simple CLI.",
    description:
      "Ollama makes local AI approachable. You install it, pull a model, and start using it with just a few commands.",
    category: "AI",
    installWith: "brew",
    installCommand: "brew install ollama",
    quickStart: "ollama run llama3.2",
    exampleWorkflow: [
      "ollama pull llama3.2",
      "ollama run llama3.2",
      "ollama serve",
    ],
    website: "https://ollama.com",
    github: "https://github.com/ollama/ollama",
    docs: "https://github.com/ollama/ollama/tree/main/docs",
    stars: 128000,
    monthlyDownloads: 680000,
    score: 94,
    trending: "+",
    trendingAmount: 13,
    featured: true,
    useCases: ["Local models", "AI prototyping", "Private inference"],
  },
  {
    slug: "railway",
    name: "Railway CLI",
    shortName: "railway",
    tagline: "Manage services, environments, and deployments for Railway projects.",
    description:
      "Railway CLI keeps cloud deployment approachable. It has the right balance of power and simplicity, which makes it ideal for a product-focused CLI directory.",
    category: "Deploy",
    installWith: "npm",
    installCommand: "npm i -g @railway/cli",
    quickStart: "railway login && railway up",
    exampleWorkflow: [
      "railway login",
      "railway link",
      "railway up",
    ],
    website: "https://docs.railway.com/reference/cli-api",
    github: "https://github.com/railwayapp/cli",
    docs: "https://docs.railway.com/reference/cli-api",
    stars: 2800,
    monthlyDownloads: 190000,
    score: 84,
    trending: "+",
    trendingAmount: 9,
    useCases: ["Service deploys", "Secrets", "Logs"],
  },
  {
    slug: "flyctl",
    name: "flyctl",
    shortName: "flyctl",
    tagline: "Deploy apps globally and manage edge infrastructure on Fly.io.",
    description:
      "flyctl feels compact but powerful. It is a strong fit for the infrastructure-minded audience Open CLI will attract.",
    category: "Deploy",
    installWith: "brew",
    installCommand: "brew install flyctl",
    quickStart: "fly auth login && fly launch",
    exampleWorkflow: [
      "fly auth login",
      "fly launch",
      "fly deploy",
    ],
    website: "https://fly.io/docs/flyctl/",
    github: "https://github.com/superfly/flyctl",
    docs: "https://fly.io/docs/flyctl/",
    stars: 2400,
    monthlyDownloads: 110000,
    score: 81,
    trending: "+",
    trendingAmount: 2,
    useCases: ["Global deploys", "Machines", "App scaling"],
  },
  {
    slug: "supabase",
    name: "Supabase CLI",
    shortName: "supabase",
    tagline: "Run local Supabase, generate types, and manage database workflows.",
    description:
      "Supabase CLI bridges product builders and infrastructure workflows. It gives Open CLI a full-stack flavor without becoming too enterprise-heavy.",
    category: "Cloud",
    installWith: "brew",
    installCommand: "brew install supabase/tap/supabase",
    quickStart: "supabase init && supabase start",
    exampleWorkflow: [
      "supabase init",
      "supabase start",
      "supabase db reset",
    ],
    website: "https://supabase.com/docs/guides/cli",
    github: "https://github.com/supabase/cli",
    docs: "https://supabase.com/docs/guides/cli",
    stars: 6200,
    monthlyDownloads: 360000,
    score: 86,
    trending: "+",
    trendingAmount: 6,
    useCases: ["Local backend", "Type generation", "DB workflows"],
  },
  {
    slug: "stripe",
    name: "Stripe CLI",
    shortName: "stripe",
    tagline: "Test webhooks, replay events, and inspect payment flows locally.",
    description:
      "Stripe CLI stands out because it solves a real pain point elegantly. It is exactly the kind of practical CLI people love finding through a curated directory.",
    category: "Productivity",
    installWith: "brew",
    installCommand: "brew install stripe/stripe-cli/stripe",
    quickStart: "stripe login && stripe listen --forward-to localhost:3000/api/webhooks",
    exampleWorkflow: [
      "stripe login",
      "stripe listen --forward-to localhost:3000/api/webhooks",
      "stripe trigger payment_intent.succeeded",
    ],
    website: "https://docs.stripe.com/stripe-cli",
    github: "https://github.com/stripe/stripe-cli",
    docs: "https://docs.stripe.com/stripe-cli",
    stars: 4900,
    monthlyDownloads: 240000,
    score: 83,
    trending: "+",
    trendingAmount: 4,
    useCases: ["Webhook testing", "Payments debugging", "Local dev"],
  },
];

export type BuilderLaunch = {
  name: string;
  creator: string;
  creatorUrl: string;
  tagline: string;
  installCommand: string;
  href: string;
  released: string;
  packageName?: string;
  githubRepo?: string;
  stars?: number | null;
  monthlyDownloads?: number | null;
  publishedAt?: string | null;
};

export const builderLaunches = builderLaunchesJson as BuilderLaunch[];

export const categories = Array.from(new Set(clis.map((cli) => cli.category)));
export const packageManagers = Array.from(new Set(clis.map((cli) => cli.installWith)));

export const featuredClis = clis.filter((cli) => cli.featured);
export const leaderboardClis = [...clis].sort((a, b) => b.score - a.score);

export function getCliBySlug(slug: string) {
  return clis.find((cli) => cli.slug === slug);
}
