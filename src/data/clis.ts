import builderLaunchesJson from "@/content/builder-launches.json";

export type PackageManager = "brew" | "npm" | "cargo" | "pipx" | "curl" | "go";
export type MakerType = "org" | "individual" | "small-team";
export type DestructivePotential = "low" | "medium" | "high";
export type CliCategory =
  | "AI"
  | "Browser Automation"
  | "Cloud"
  | "Containers / Infra"
  | "Data"
  | "Database"
  | "Deploy"
  | "Docs / Content"
  | "Git"
  | "Observability"
  | "Package Management"
  | "Productivity"
  | "Scraping"
  | "Security"
  | "Shell Utilities";

export type Maker = {
  slug: string;
  name: string;
  type: MakerType;
  url: string;
  officialPlatformMaker?: boolean;
  featuredBuilder?: boolean;
  cliCount?: number;
};

export type CliEntry = {
  slug: string;
  name: string;
  shortName: string;
  binaryName: string;
  makerSlug: string;
  makerName: string;
  makerType: MakerType;
  makerUrl: string;
  official: boolean;
  featuredBuilder: boolean;
  tagline: string;
  description: string;
  category: CliCategory;
  installWith: PackageManager;
  installCommand: string;
  quickStart: string;
  exampleWorkflow: string[];
  website: string;
  github: string;
  docs: string;
  githubRepo: string;
  packageName?: string;
  stars: number;
  monthlyDownloads: number;
  score: number;
  trending: "+" | "-";
  trendingAmount: number;
  featured?: boolean;
  agentFriendly: boolean;
  supportsJsonOutput: boolean;
  supportsNonInteractive: boolean;
  supportsDryRun: boolean;
  requiresAuth: boolean;
  requiresNetwork: boolean;
  ciFriendly: boolean;
  localFirst: boolean;
  destructivePotential: DestructivePotential;
  aliases: string[];
  keywords: string[];
  tags: string[];
  useCases: string[];
};

const makerSeeds: Maker[] = [
  {
    "slug": "github",
    "name": "GitHub",
    "type": "org",
    "url": "https://github.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "vercel",
    "name": "Vercel",
    "type": "org",
    "url": "https://vercel.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "cloudflare",
    "name": "Cloudflare",
    "type": "org",
    "url": "https://cloudflare.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "supabase",
    "name": "Supabase",
    "type": "org",
    "url": "https://supabase.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "railway",
    "name": "Railway",
    "type": "org",
    "url": "https://railway.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "flyio",
    "name": "Fly.io",
    "type": "org",
    "url": "https://fly.io",
    "officialPlatformMaker": true
  },
  {
    "slug": "netlify",
    "name": "Netlify",
    "type": "org",
    "url": "https://netlify.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "firebase",
    "name": "Firebase",
    "type": "org",
    "url": "https://firebase.google.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "aws",
    "name": "AWS",
    "type": "org",
    "url": "https://aws.amazon.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "google-cloud",
    "name": "Google Cloud",
    "type": "org",
    "url": "https://cloud.google.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "microsoft",
    "name": "Microsoft",
    "type": "org",
    "url": "https://microsoft.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "docker",
    "name": "Docker",
    "type": "org",
    "url": "https://docker.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "kubernetes",
    "name": "Kubernetes",
    "type": "org",
    "url": "https://kubernetes.io",
    "officialPlatformMaker": true
  },
  {
    "slug": "helm",
    "name": "Helm",
    "type": "org",
    "url": "https://helm.sh",
    "officialPlatformMaker": true
  },
  {
    "slug": "hashicorp",
    "name": "HashiCorp",
    "type": "org",
    "url": "https://hashicorp.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "pulumi",
    "name": "Pulumi",
    "type": "org",
    "url": "https://pulumi.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "dagger",
    "name": "Dagger",
    "type": "org",
    "url": "https://dagger.io",
    "officialPlatformMaker": true
  },
  {
    "slug": "prisma",
    "name": "Prisma",
    "type": "org",
    "url": "https://prisma.io",
    "officialPlatformMaker": true
  },
  {
    "slug": "turso",
    "name": "Turso",
    "type": "org",
    "url": "https://turso.tech",
    "officialPlatformMaker": true
  },
  {
    "slug": "neon",
    "name": "Neon",
    "type": "org",
    "url": "https://neon.tech",
    "officialPlatformMaker": true
  },
  {
    "slug": "planetscale",
    "name": "PlanetScale",
    "type": "org",
    "url": "https://planetscale.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "stripe",
    "name": "Stripe",
    "type": "org",
    "url": "https://stripe.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "sentry",
    "name": "Sentry",
    "type": "org",
    "url": "https://sentry.io",
    "officialPlatformMaker": true
  },
  {
    "slug": "semgrep",
    "name": "Semgrep",
    "type": "org",
    "url": "https://semgrep.dev",
    "officialPlatformMaker": true
  },
  {
    "slug": "datadog",
    "name": "Datadog",
    "type": "org",
    "url": "https://datadoghq.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "shopify",
    "name": "Shopify",
    "type": "org",
    "url": "https://shopify.dev",
    "officialPlatformMaker": true
  },
  {
    "slug": "ngrok",
    "name": "ngrok",
    "type": "org",
    "url": "https://ngrok.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "tailscale",
    "name": "Tailscale",
    "type": "org",
    "url": "https://tailscale.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "doppler",
    "name": "Doppler",
    "type": "org",
    "url": "https://doppler.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "anthropic",
    "name": "Anthropic",
    "type": "org",
    "url": "https://anthropic.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "openai",
    "name": "OpenAI",
    "type": "org",
    "url": "https://openai.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "google-gemini",
    "name": "Google Gemini",
    "type": "org",
    "url": "https://gemini.google.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "astral",
    "name": "Astral",
    "type": "small-team",
    "url": "https://astral.sh",
    "featuredBuilder": true
  },
  {
    "slug": "pnpm",
    "name": "pnpm",
    "type": "small-team",
    "url": "https://pnpm.io",
    "featuredBuilder": true
  },
  {
    "slug": "oven",
    "name": "Oven",
    "type": "small-team",
    "url": "https://bun.sh",
    "featuredBuilder": true
  },
  {
    "slug": "denoland",
    "name": "Deno",
    "type": "small-team",
    "url": "https://deno.com",
    "featuredBuilder": true
  },
  {
    "slug": "pypa",
    "name": "PyPA",
    "type": "org",
    "url": "https://pypa.io"
  },
  {
    "slug": "poetry",
    "name": "Poetry",
    "type": "small-team",
    "url": "https://python-poetry.org"
  },
  {
    "slug": "hatch",
    "name": "Hatch",
    "type": "small-team",
    "url": "https://hatch.pypa.io"
  },
  {
    "slug": "jdx",
    "name": "jdx",
    "type": "individual",
    "url": "https://github.com/jdx",
    "featuredBuilder": true
  },
  {
    "slug": "direnv",
    "name": "direnv",
    "type": "small-team",
    "url": "https://direnv.net"
  },
  {
    "slug": "casey",
    "name": "casey",
    "type": "individual",
    "url": "https://github.com/casey",
    "featuredBuilder": true
  },
  {
    "slug": "watchexec",
    "name": "watchexec",
    "type": "small-team",
    "url": "https://watchexec.github.io"
  },
  {
    "slug": "starship",
    "name": "Starship",
    "type": "small-team",
    "url": "https://starship.rs"
  },
  {
    "slug": "nushell",
    "name": "Nushell",
    "type": "small-team",
    "url": "https://nushell.sh",
    "featuredBuilder": true
  },
  {
    "slug": "atuin",
    "name": "Atuin",
    "type": "small-team",
    "url": "https://atuin.sh"
  },
  {
    "slug": "ajeetdsouza",
    "name": "Ajeet D'Souza",
    "type": "individual",
    "url": "https://github.com/ajeetdsouza",
    "featuredBuilder": true
  },
  {
    "slug": "burnt-sushi",
    "name": "BurntSushi",
    "type": "individual",
    "url": "https://github.com/BurntSushi",
    "featuredBuilder": true
  },
  {
    "slug": "sharkdp",
    "name": "sharkdp",
    "type": "individual",
    "url": "https://github.com/sharkdp",
    "featuredBuilder": true
  },
  {
    "slug": "junegunn",
    "name": "junegunn",
    "type": "individual",
    "url": "https://github.com/junegunn",
    "featuredBuilder": true
  },
  {
    "slug": "jqlang",
    "name": "jqlang",
    "type": "small-team",
    "url": "https://jqlang.org"
  },
  {
    "slug": "mike-farah",
    "name": "Mike Farah",
    "type": "individual",
    "url": "https://github.com/mikefarah",
    "featuredBuilder": true
  },
  {
    "slug": "eza-community",
    "name": "eza community",
    "type": "small-team",
    "url": "https://github.com/eza-community/eza"
  },
  {
    "slug": "yazi",
    "name": "Yazi",
    "type": "small-team",
    "url": "https://yazi-rs.github.io"
  },
  {
    "slug": "canop",
    "name": "Canop",
    "type": "individual",
    "url": "https://github.com/Canop"
  },
  {
    "slug": "clement-tsang",
    "name": "Clement Tsang",
    "type": "individual",
    "url": "https://github.com/ClementTsang"
  },
  {
    "slug": "dalance",
    "name": "dalance",
    "type": "individual",
    "url": "https://github.com/dalance"
  },
  {
    "slug": "chmln",
    "name": "chmln",
    "type": "individual",
    "url": "https://github.com/chmln"
  },
  {
    "slug": "bootandy",
    "name": "bootandy",
    "type": "individual",
    "url": "https://github.com/bootandy"
  },
  {
    "slug": "muesli",
    "name": "muesli",
    "type": "individual",
    "url": "https://github.com/muesli"
  },
  {
    "slug": "pvolok",
    "name": "Pavol Vargovcik",
    "type": "individual",
    "url": "https://github.com/pvolok"
  },
  {
    "slug": "charmbracelet",
    "name": "Charmbracelet",
    "type": "small-team",
    "url": "https://charm.sh",
    "featuredBuilder": true
  },
  {
    "slug": "pandoc",
    "name": "Pandoc",
    "type": "small-team",
    "url": "https://pandoc.org"
  },
  {
    "slug": "httpie",
    "name": "HTTPie",
    "type": "small-team",
    "url": "https://httpie.io"
  },
  {
    "slug": "ducaale",
    "name": "ducaale",
    "type": "individual",
    "url": "https://github.com/ducaale"
  },
  {
    "slug": "mr-karan",
    "name": "MrKaran",
    "type": "individual",
    "url": "https://github.com/mr-karan"
  },
  {
    "slug": "ollama",
    "name": "Ollama",
    "type": "small-team",
    "url": "https://ollama.com",
    "featuredBuilder": true
  },
  {
    "slug": "aider",
    "name": "aider",
    "type": "small-team",
    "url": "https://aider.chat",
    "featuredBuilder": true
  },
  {
    "slug": "block",
    "name": "Block",
    "type": "org",
    "url": "https://block.xyz"
  },
  {
    "slug": "browser-use",
    "name": "browser-use",
    "type": "small-team",
    "url": "https://browser-use.com",
    "featuredBuilder": true
  },
  {
    "slug": "firecrawl",
    "name": "Firecrawl",
    "type": "small-team",
    "url": "https://firecrawl.dev",
    "featuredBuilder": true
  },
  {
    "slug": "simon-willison",
    "name": "Simon Willison",
    "type": "individual",
    "url": "https://simonwillison.net",
    "featuredBuilder": true
  },
  {
    "slug": "duckdb",
    "name": "DuckDB",
    "type": "small-team",
    "url": "https://duckdb.org"
  },
  {
    "slug": "dbcli",
    "name": "dbcli",
    "type": "small-team",
    "url": "https://www.dbcli.com"
  },
  {
    "slug": "xo",
    "name": "xo",
    "type": "small-team",
    "url": "https://github.com/xo"
  },
  {
    "slug": "wireservice",
    "name": "Wireservice",
    "type": "small-team",
    "url": "https://csvkit.readthedocs.io"
  },
  {
    "slug": "johnkerl",
    "name": "John Kerl",
    "type": "individual",
    "url": "https://github.com/johnkerl"
  },
  {
    "slug": "visidata",
    "name": "VisiData",
    "type": "small-team",
    "url": "https://www.visidata.org"
  },
  {
    "slug": "yt-dlp",
    "name": "yt-dlp",
    "type": "small-team",
    "url": "https://github.com/yt-dlp/yt-dlp"
  },
  {
    "slug": "ffmpeg",
    "name": "FFmpeg",
    "type": "small-team",
    "url": "https://ffmpeg.org"
  },
  {
    "slug": "aquasecurity",
    "name": "Aqua Security",
    "type": "org",
    "url": "https://aquasec.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "anchore",
    "name": "Anchore",
    "type": "org",
    "url": "https://anchore.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "derailed",
    "name": "Derailed",
    "type": "small-team",
    "url": "https://github.com/derailed"
  },
  {
    "slug": "grafana",
    "name": "Grafana",
    "type": "org",
    "url": "https://grafana.com",
    "officialPlatformMaker": true
  },
  {
    "slug": "biome",
    "name": "Biome",
    "type": "small-team",
    "url": "https://biomejs.dev"
  },
  {
    "slug": "eslint",
    "name": "ESLint",
    "type": "small-team",
    "url": "https://eslint.org"
  },
  {
    "slug": "prettier",
    "name": "Prettier",
    "type": "small-team",
    "url": "https://prettier.io"
  },
  {
    "slug": "vitest",
    "name": "Vitest",
    "type": "small-team",
    "url": "https://vitest.dev"
  },
  {
    "slug": "vite",
    "name": "Vite",
    "type": "small-team",
    "url": "https://vite.dev"
  },
  {
    "slug": "drizzle-team",
    "name": "Drizzle Team",
    "type": "small-team",
    "url": "https://orm.drizzle.team"
  },
  {
    "slug": "amacneil",
    "name": "amacneil",
    "type": "individual",
    "url": "https://github.com/amacneil"
  },
  {
    "slug": "steipete",
    "name": "Peter Steinberger",
    "type": "individual",
    "url": "https://github.com/steipete",
    "featuredBuilder": true
  },
  {
    "slug": "traces",
    "name": "Traces",
    "type": "small-team",
    "url": "https://traces.sh"
  },
  {
    "slug": "rclone",
    "name": "rclone",
    "type": "small-team",
    "url": "https://rclone.org"
  },
  {
    "slug": "koalaman",
    "name": "koalaman",
    "type": "individual",
    "url": "https://github.com/koalaman"
  },
  {
    "slug": "mvdan",
    "name": "mvdan",
    "type": "individual",
    "url": "https://github.com/mvdan"
  },
  {
    "slug": "jesse-duffield",
    "name": "Jesse Duffield",
    "type": "individual",
    "url": "https://github.com/jesseduffield",
    "featuredBuilder": true
  },
  {
    "slug": "extrawurst",
    "name": "extrawurst",
    "type": "individual",
    "url": "https://github.com/extrawurst"
  },
  {
    "slug": "jujutsu",
    "name": "Jujutsu",
    "type": "small-team",
    "url": "https://github.com/jj-vcs/jj",
    "featuredBuilder": true
  },
  {
    "slug": "dandavison",
    "name": "Dan Davison",
    "type": "individual",
    "url": "https://github.com/dandavison",
    "featuredBuilder": true
  },
  {
    "slug": "sourcefrog",
    "name": "Sourcefrog",
    "type": "small-team",
    "url": "https://github.com/Wilfred/difftastic"
  },
  {
    "slug": "tldr",
    "name": "tealdeer",
    "type": "small-team",
    "url": "https://github.com/tealdeer-rs/tealdeer"
  }
];

type CliSeed = {
  slug: string;
  name: string;
  shortName: string;
  maker: string;
  category: CliCategory;
  installWith: PackageManager;
  installCommand: string;
  quickStart: string;
  tagline?: string;
  githubRepo: string;
  website?: string;
  docs?: string;
  packageName?: string;
  stars: number;
  monthlyDownloads: number;
  useCases: string[];
  aliases?: string[];
  keywords?: string[];
  tags?: string[];
  exampleWorkflow?: string[];
  featured?: boolean;
  agentFriendly?: boolean;
  supportsJsonOutput?: boolean;
  supportsNonInteractive?: boolean;
  supportsDryRun?: boolean;
  requiresAuth?: boolean;
  requiresNetwork?: boolean;
  ciFriendly?: boolean;
  localFirst?: boolean;
  destructivePotential?: DestructivePotential;
};

const cliSeeds: CliSeed[] = [
  {
    "slug": "gh",
    "name": "GitHub CLI",
    "shortName": "gh",
    "maker": "github",
    "category": "Git",
    "installWith": "brew",
    "installCommand": "brew install gh",
    "quickStart": "gh auth login && gh repo clone vercel/next.js",
    "githubRepo": "cli/cli",
    "website": "https://cli.github.com",
    "docs": "https://cli.github.com/manual/",
    "stars": 40200,
    "monthlyDownloads": 5200000,
    "useCases": [
      "Pull requests",
      "Issue triage",
      "GitHub Actions"
    ],
    "aliases": [
      "github cli"
    ],
    "keywords": [
      "repo",
      "pr",
      "issues",
      "actions"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium",
    "exampleWorkflow": [
      "gh auth login",
      "gh repo clone vercel/next.js",
      "gh pr create --fill"
    ]
  },
  {
    "slug": "git-lfs",
    "name": "Git LFS",
    "shortName": "git-lfs",
    "maker": "github",
    "category": "Git",
    "installWith": "brew",
    "installCommand": "brew install git-lfs",
    "quickStart": "git lfs install && git lfs track '*.psd'",
    "githubRepo": "git-lfs/git-lfs",
    "website": "https://git-lfs.com",
    "docs": "https://github.com/git-lfs/git-lfs",
    "stars": 15600,
    "monthlyDownloads": 420000,
    "useCases": [
      "Large files",
      "Git workflows",
      "Design assets"
    ],
    "aliases": [
      "lfs"
    ],
    "keywords": [
      "git large file storage"
    ],
    "tags": [
      "official",
      "ci-friendly"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "vercel",
    "name": "Vercel CLI",
    "shortName": "vercel",
    "maker": "vercel",
    "category": "Deploy",
    "installWith": "npm",
    "installCommand": "npm i -g vercel",
    "quickStart": "vercel login && vercel",
    "githubRepo": "vercel/vercel",
    "website": "https://vercel.com/docs/cli",
    "docs": "https://vercel.com/docs/cli",
    "stars": 14800,
    "monthlyDownloads": 3100000,
    "useCases": [
      "Deploy previews",
      "Project linking",
      "Environment sync"
    ],
    "aliases": [
      "vercel cli"
    ],
    "keywords": [
      "deploy nextjs previews edge"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high",
    "exampleWorkflow": [
      "vercel login",
      "vercel link",
      "vercel --prod"
    ]
  },
  {
    "slug": "turborepo",
    "name": "Turborepo",
    "shortName": "turbo",
    "maker": "vercel",
    "category": "Package Management",
    "installWith": "npm",
    "installCommand": "npm i -g turbo",
    "quickStart": "turbo run build",
    "githubRepo": "vercel/turborepo",
    "website": "https://turbo.build/repo",
    "docs": "https://turbo.build/repo/docs",
    "stars": 28900,
    "monthlyDownloads": 1800000,
    "useCases": [
      "Monorepos",
      "Build caching",
      "Task pipelines"
    ],
    "aliases": [
      "turbo"
    ],
    "keywords": [
      "monorepo build cache tasks"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "wrangler",
    "name": "Wrangler",
    "shortName": "wrangler",
    "maker": "cloudflare",
    "category": "Cloud",
    "installWith": "npm",
    "installCommand": "npm i -g wrangler",
    "quickStart": "wrangler login && wrangler init hello-workers",
    "githubRepo": "cloudflare/workers-sdk",
    "website": "https://developers.cloudflare.com/workers/wrangler/",
    "docs": "https://developers.cloudflare.com/workers/wrangler/",
    "stars": 4400,
    "monthlyDownloads": 2400000,
    "useCases": [
      "Workers",
      "Queues",
      "KV and R2"
    ],
    "aliases": [
      "cloudflare cli"
    ],
    "keywords": [
      "workers edge deploy"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high",
    "exampleWorkflow": [
      "wrangler login",
      "wrangler dev",
      "wrangler deploy"
    ]
  },
  {
    "slug": "supabase",
    "name": "Supabase CLI",
    "shortName": "supabase",
    "maker": "supabase",
    "category": "Database",
    "installWith": "brew",
    "installCommand": "brew install supabase/tap/supabase",
    "quickStart": "supabase init && supabase start",
    "githubRepo": "supabase/cli",
    "website": "https://supabase.com/docs/guides/cli",
    "docs": "https://supabase.com/docs/guides/cli",
    "stars": 6200,
    "monthlyDownloads": 360000,
    "useCases": [
      "Local backend",
      "Type generation",
      "DB workflows"
    ],
    "aliases": [
      "supabase cli"
    ],
    "keywords": [
      "postgres migrations local stack"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": false,
    "requiresNetwork": false,
    "ciFriendly": true,
    "localFirst": true,
    "destructivePotential": "high",
    "exampleWorkflow": [
      "supabase init",
      "supabase start",
      "supabase db reset"
    ]
  },
  {
    "slug": "railway",
    "name": "Railway CLI",
    "shortName": "railway",
    "maker": "railway",
    "category": "Deploy",
    "installWith": "npm",
    "installCommand": "npm i -g @railway/cli",
    "quickStart": "railway login && railway up",
    "githubRepo": "railwayapp/cli",
    "website": "https://docs.railway.com/reference/cli-api",
    "docs": "https://docs.railway.com/reference/cli-api",
    "stars": 2800,
    "monthlyDownloads": 190000,
    "useCases": [
      "Service deploys",
      "Secrets",
      "Logs"
    ],
    "aliases": [
      "railway cli"
    ],
    "keywords": [
      "deploy logs env"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "flyctl",
    "name": "flyctl",
    "shortName": "flyctl",
    "maker": "flyio",
    "category": "Deploy",
    "installWith": "brew",
    "installCommand": "brew install flyctl",
    "quickStart": "fly auth login && fly launch",
    "githubRepo": "superfly/flyctl",
    "website": "https://fly.io/docs/flyctl/",
    "docs": "https://fly.io/docs/flyctl/",
    "stars": 2400,
    "monthlyDownloads": 110000,
    "useCases": [
      "Global deploys",
      "Machines",
      "App scaling"
    ],
    "aliases": [
      "fly io cli"
    ],
    "keywords": [
      "deploy global apps"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "netlify",
    "name": "Netlify CLI",
    "shortName": "netlify",
    "maker": "netlify",
    "category": "Deploy",
    "installWith": "npm",
    "installCommand": "npm i -g netlify-cli",
    "quickStart": "netlify login && netlify deploy",
    "githubRepo": "netlify/cli",
    "website": "https://docs.netlify.com/cli/get-started/",
    "docs": "https://docs.netlify.com/cli/get-started/",
    "stars": 7600,
    "monthlyDownloads": 450000,
    "useCases": [
      "Deploys",
      "Functions",
      "Sites"
    ],
    "aliases": [
      "netlify cli"
    ],
    "keywords": [
      "deploy preview functions"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "firebase",
    "name": "Firebase CLI",
    "shortName": "firebase",
    "maker": "firebase",
    "category": "Cloud",
    "installWith": "npm",
    "installCommand": "npm i -g firebase-tools",
    "quickStart": "firebase login && firebase init",
    "githubRepo": "firebase/firebase-tools",
    "website": "https://firebase.google.com/docs/cli",
    "docs": "https://firebase.google.com/docs/cli",
    "stars": 6200,
    "monthlyDownloads": 1400000,
    "useCases": [
      "Hosting",
      "Functions",
      "Project setup"
    ],
    "aliases": [
      "firebase cli"
    ],
    "keywords": [
      "hosting functions emulators"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "aws-cli",
    "name": "AWS CLI",
    "shortName": "aws",
    "maker": "aws",
    "category": "Cloud",
    "installWith": "brew",
    "installCommand": "brew install awscli",
    "quickStart": "aws configure && aws s3 ls",
    "githubRepo": "aws/aws-cli",
    "website": "https://aws.amazon.com/cli/",
    "docs": "https://docs.aws.amazon.com/cli/",
    "stars": 16300,
    "monthlyDownloads": 2200000,
    "useCases": [
      "Cloud ops",
      "S3",
      "IAM and infra"
    ],
    "aliases": [
      "aws",
      "amazon cli"
    ],
    "keywords": [
      "s3 ec2 iam cloudformation"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "gcloud",
    "name": "Google Cloud CLI",
    "shortName": "gcloud",
    "maker": "google-cloud",
    "category": "Cloud",
    "installWith": "brew",
    "installCommand": "brew install --cask google-cloud-sdk",
    "quickStart": "gcloud auth login && gcloud config set project my-project",
    "githubRepo": "google-cloud-sdk-unofficial/google-cloud-sdk",
    "website": "https://cloud.google.com/sdk",
    "docs": "https://cloud.google.com/sdk/docs",
    "stars": 1800,
    "monthlyDownloads": 1200000,
    "useCases": [
      "Cloud ops",
      "GCP projects",
      "Deploy and logs"
    ],
    "aliases": [
      "google cloud cli"
    ],
    "keywords": [
      "gcp cloud run app engine"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "az",
    "name": "Azure CLI",
    "shortName": "az",
    "maker": "microsoft",
    "category": "Cloud",
    "installWith": "brew",
    "installCommand": "brew install azure-cli",
    "quickStart": "az login && az account show",
    "githubRepo": "Azure/azure-cli",
    "website": "https://learn.microsoft.com/cli/azure/",
    "docs": "https://learn.microsoft.com/cli/azure/",
    "stars": 4300,
    "monthlyDownloads": 900000,
    "useCases": [
      "Cloud ops",
      "Deployments",
      "Resource groups"
    ],
    "aliases": [
      "azure cli"
    ],
    "keywords": [
      "azure resource groups deployments"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "docker",
    "name": "Docker CLI",
    "shortName": "docker",
    "maker": "docker",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install --cask docker",
    "quickStart": "docker run hello-world",
    "githubRepo": "docker/cli",
    "website": "https://docs.docker.com/engine/reference/commandline/cli/",
    "docs": "https://docs.docker.com/engine/reference/commandline/cli/",
    "stars": 5200,
    "monthlyDownloads": 2600000,
    "useCases": [
      "Containers",
      "Images",
      "Compose workflows"
    ],
    "aliases": [
      "docker cli"
    ],
    "keywords": [
      "containers images compose"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": false,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "kubectl",
    "name": "kubectl",
    "shortName": "kubectl",
    "maker": "kubernetes",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install kubectl",
    "quickStart": "kubectl config get-contexts && kubectl get pods -A",
    "githubRepo": "kubernetes/kubectl",
    "website": "https://kubernetes.io/docs/reference/kubectl/",
    "docs": "https://kubernetes.io/docs/reference/kubectl/",
    "stars": 7400,
    "monthlyDownloads": 1800000,
    "useCases": [
      "Kubernetes",
      "Cluster debugging",
      "Deployments"
    ],
    "aliases": [
      "kubernetes cli"
    ],
    "keywords": [
      "pods deployments contexts"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "helm",
    "name": "Helm",
    "shortName": "helm",
    "maker": "helm",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install helm",
    "quickStart": "helm repo add bitnami https://charts.bitnami.com/bitnami && helm list",
    "githubRepo": "helm/helm",
    "website": "https://helm.sh",
    "docs": "https://helm.sh/docs/",
    "stars": 28700,
    "monthlyDownloads": 850000,
    "useCases": [
      "Helm charts",
      "Kubernetes releases",
      "Templates"
    ],
    "aliases": [
      "helm cli"
    ],
    "keywords": [
      "charts kubernetes releases"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "terraform",
    "name": "Terraform",
    "shortName": "terraform",
    "maker": "hashicorp",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew tap hashicorp/tap && brew install hashicorp/tap/terraform",
    "quickStart": "terraform init && terraform plan",
    "githubRepo": "hashicorp/terraform",
    "website": "https://developer.hashicorp.com/terraform/cli",
    "docs": "https://developer.hashicorp.com/terraform/cli",
    "stars": 44200,
    "monthlyDownloads": 1300000,
    "useCases": [
      "Infrastructure as code",
      "Plans",
      "Provisioning"
    ],
    "aliases": [
      "tf"
    ],
    "keywords": [
      "iac plan apply modules"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high",
    "exampleWorkflow": [
      "terraform init",
      "terraform plan",
      "terraform apply"
    ]
  },
  {
    "slug": "vault",
    "name": "Vault",
    "shortName": "vault",
    "maker": "hashicorp",
    "category": "Security",
    "installWith": "brew",
    "installCommand": "brew tap hashicorp/tap && brew install hashicorp/tap/vault",
    "quickStart": "vault server -dev",
    "githubRepo": "hashicorp/vault",
    "website": "https://developer.hashicorp.com/vault/docs/commands",
    "docs": "https://developer.hashicorp.com/vault/docs/commands",
    "stars": 32100,
    "monthlyDownloads": 320000,
    "useCases": [
      "Secrets",
      "Identity",
      "PKI"
    ],
    "aliases": [
      "hashicorp vault"
    ],
    "keywords": [
      "secrets kv pki"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "consul",
    "name": "Consul",
    "shortName": "consul",
    "maker": "hashicorp",
    "category": "Cloud",
    "installWith": "brew",
    "installCommand": "brew tap hashicorp/tap && brew install hashicorp/tap/consul",
    "quickStart": "consul agent -dev",
    "githubRepo": "hashicorp/consul",
    "website": "https://developer.hashicorp.com/consul/commands",
    "docs": "https://developer.hashicorp.com/consul/commands",
    "stars": 30500,
    "monthlyDownloads": 140000,
    "useCases": [
      "Service discovery",
      "KV",
      "Mesh"
    ],
    "aliases": [
      "hashicorp consul"
    ],
    "keywords": [
      "service discovery kv service mesh"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "nomad",
    "name": "Nomad",
    "shortName": "nomad",
    "maker": "hashicorp",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew tap hashicorp/tap && brew install hashicorp/tap/nomad",
    "quickStart": "nomad agent -dev",
    "githubRepo": "hashicorp/nomad",
    "website": "https://developer.hashicorp.com/nomad/docs/commands",
    "docs": "https://developer.hashicorp.com/nomad/docs/commands",
    "stars": 16100,
    "monthlyDownloads": 90000,
    "useCases": [
      "Scheduling",
      "Jobs",
      "Clusters"
    ],
    "aliases": [
      "hashicorp nomad"
    ],
    "keywords": [
      "job scheduler containers"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "pulumi",
    "name": "Pulumi CLI",
    "shortName": "pulumi",
    "maker": "pulumi",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install pulumi/tap/pulumi",
    "quickStart": "pulumi login && pulumi new",
    "githubRepo": "pulumi/pulumi",
    "website": "https://www.pulumi.com/docs/iac/cli/",
    "docs": "https://www.pulumi.com/docs/iac/cli/",
    "stars": 22700,
    "monthlyDownloads": 220000,
    "useCases": [
      "Infrastructure as code",
      "TypeScript infra",
      "Stacks"
    ],
    "aliases": [
      "pulumi cli"
    ],
    "keywords": [
      "iac cloud typescript"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "dagger",
    "name": "Dagger CLI",
    "shortName": "dagger",
    "maker": "dagger",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install dagger/tap/dagger",
    "quickStart": "dagger init && dagger develop",
    "githubRepo": "dagger/dagger",
    "website": "https://docs.dagger.io/reference/cli/",
    "docs": "https://docs.dagger.io/reference/cli/",
    "stars": 13000,
    "monthlyDownloads": 90000,
    "useCases": [
      "Pipelines",
      "Containers",
      "CI automation"
    ],
    "aliases": [
      "dagger cli"
    ],
    "keywords": [
      "pipelines ci containers"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "prisma",
    "name": "Prisma CLI",
    "shortName": "prisma",
    "maker": "prisma",
    "category": "Database",
    "installWith": "npm",
    "installCommand": "npm i -g prisma",
    "quickStart": "prisma init && prisma migrate dev",
    "githubRepo": "prisma/prisma",
    "website": "https://www.prisma.io/docs/orm/tools/prisma-cli",
    "docs": "https://www.prisma.io/docs/orm/tools/prisma-cli",
    "stars": 43600,
    "monthlyDownloads": 1700000,
    "useCases": [
      "Schema design",
      "Migrations",
      "Type-safe DB workflows"
    ],
    "aliases": [
      "prisma cli"
    ],
    "keywords": [
      "database schema migrate"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "turso",
    "name": "Turso CLI",
    "shortName": "turso",
    "maker": "turso",
    "category": "Database",
    "installWith": "brew",
    "installCommand": "brew install tursodatabase/tap/turso",
    "quickStart": "turso auth login && turso db create opencli",
    "githubRepo": "tursodatabase/turso-cli",
    "website": "https://docs.turso.tech/cli/introduction",
    "docs": "https://docs.turso.tech/cli/introduction",
    "stars": 2100,
    "monthlyDownloads": 85000,
    "useCases": [
      "libSQL",
      "Edge databases",
      "DB management"
    ],
    "aliases": [
      "turso cli"
    ],
    "keywords": [
      "libsql edge database sqlite"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "neonctl",
    "name": "neonctl",
    "shortName": "neonctl",
    "maker": "neon",
    "category": "Database",
    "installWith": "brew",
    "installCommand": "brew install neonctl",
    "quickStart": "neonctl auth && neonctl projects list",
    "githubRepo": "neondatabase/neonctl",
    "website": "https://neon.com/docs/reference/neon-cli",
    "docs": "https://neon.com/docs/reference/neon-cli",
    "stars": 900,
    "monthlyDownloads": 45000,
    "useCases": [
      "Serverless Postgres",
      "Projects",
      "Branches"
    ],
    "aliases": [
      "neon cli"
    ],
    "keywords": [
      "postgres branches serverless"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "pscale",
    "name": "PlanetScale CLI",
    "shortName": "pscale",
    "maker": "planetscale",
    "category": "Database",
    "installWith": "brew",
    "installCommand": "brew install planetscale/tap/pscale",
    "quickStart": "pscale auth login && pscale org list",
    "githubRepo": "planetscale/cli",
    "website": "https://planetscale.com/docs/reference/planetscale-cli",
    "docs": "https://planetscale.com/docs/reference/planetscale-cli",
    "stars": 2900,
    "monthlyDownloads": 70000,
    "useCases": [
      "MySQL branches",
      "Deploy requests",
      "Database workflows"
    ],
    "aliases": [
      "planetscale cli"
    ],
    "keywords": [
      "mysql branches deploy requests"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "stripe",
    "name": "Stripe CLI",
    "shortName": "stripe",
    "maker": "stripe",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install stripe/stripe-cli/stripe",
    "quickStart": "stripe login && stripe listen --forward-to localhost:3000/api/webhooks",
    "githubRepo": "stripe/stripe-cli",
    "website": "https://docs.stripe.com/stripe-cli",
    "docs": "https://docs.stripe.com/stripe-cli",
    "stars": 4900,
    "monthlyDownloads": 240000,
    "useCases": [
      "Webhook testing",
      "Payments debugging",
      "Local dev"
    ],
    "aliases": [
      "stripe cli"
    ],
    "keywords": [
      "payments webhooks events"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "sentry-cli",
    "name": "Sentry CLI",
    "shortName": "sentry-cli",
    "maker": "sentry",
    "category": "Observability",
    "installWith": "brew",
    "installCommand": "brew install getsentry/tools/sentry-cli",
    "quickStart": "sentry-cli login && sentry-cli releases list",
    "githubRepo": "getsentry/sentry-cli",
    "website": "https://docs.sentry.io/cli/",
    "docs": "https://docs.sentry.io/cli/",
    "stars": 2300,
    "monthlyDownloads": 750000,
    "useCases": [
      "Releases",
      "Source maps",
      "Issue debugging"
    ],
    "aliases": [
      "sentry cli"
    ],
    "keywords": [
      "error tracking releases sourcemaps"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "semgrep",
    "name": "Semgrep",
    "shortName": "semgrep",
    "maker": "semgrep",
    "category": "Security",
    "installWith": "brew",
    "installCommand": "brew install semgrep",
    "quickStart": "semgrep scan --config auto",
    "githubRepo": "semgrep/semgrep",
    "website": "https://semgrep.dev/docs/cli-reference",
    "docs": "https://semgrep.dev/docs/cli-reference",
    "stars": 11700,
    "monthlyDownloads": 180000,
    "useCases": [
      "Static analysis",
      "Security scanning",
      "Code rules"
    ],
    "aliases": [
      "semgrep cli"
    ],
    "keywords": [
      "sast security scan"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly",
      "json-output"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "datadog-ci",
    "name": "Datadog CI",
    "shortName": "datadog-ci",
    "maker": "datadog",
    "category": "Observability",
    "installWith": "npm",
    "installCommand": "npm i -g @datadog/datadog-ci",
    "quickStart": "datadog-ci synthetics run-tests",
    "githubRepo": "DataDog/datadog-ci",
    "website": "https://docs.datadoghq.com/continuous_integration/setup_tests/cli/",
    "docs": "https://docs.datadoghq.com/continuous_integration/setup_tests/cli/",
    "stars": 400,
    "monthlyDownloads": 900000,
    "useCases": [
      "CI tests",
      "Source maps",
      "Deploy markers"
    ],
    "aliases": [
      "datadog cli"
    ],
    "keywords": [
      "ci observability sourcemaps synthetics"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "shopify",
    "name": "Shopify CLI",
    "shortName": "shopify",
    "maker": "shopify",
    "category": "Deploy",
    "installWith": "npm",
    "installCommand": "npm i -g @shopify/cli @shopify/theme",
    "quickStart": "shopify auth login && shopify app init",
    "githubRepo": "Shopify/cli",
    "website": "https://shopify.dev/docs/api/shopify-cli",
    "docs": "https://shopify.dev/docs/api/shopify-cli",
    "stars": 4600,
    "monthlyDownloads": 280000,
    "useCases": [
      "App scaffolding",
      "Themes",
      "Store workflows"
    ],
    "aliases": [
      "shopify cli"
    ],
    "keywords": [
      "shopify apps themes"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "ngrok",
    "name": "ngrok",
    "shortName": "ngrok",
    "maker": "ngrok",
    "category": "Cloud",
    "installWith": "brew",
    "installCommand": "brew install ngrok/ngrok/ngrok",
    "quickStart": "ngrok http 3000",
    "githubRepo": "inconshreveable/ngrok",
    "website": "https://ngrok.com/docs",
    "docs": "https://ngrok.com/docs",
    "stars": 28000,
    "monthlyDownloads": 420000,
    "useCases": [
      "Tunnels",
      "Webhooks",
      "Local sharing"
    ],
    "aliases": [
      "tunnel cli"
    ],
    "keywords": [
      "tunnel localhost webhooks"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "tailscale",
    "name": "Tailscale CLI",
    "shortName": "tailscale",
    "maker": "tailscale",
    "category": "Cloud",
    "installWith": "brew",
    "installCommand": "brew install tailscale",
    "quickStart": "tailscale up",
    "githubRepo": "tailscale/tailscale",
    "website": "https://tailscale.com/kb/1080/cli",
    "docs": "https://tailscale.com/kb/1080/cli",
    "stars": 22600,
    "monthlyDownloads": 260000,
    "useCases": [
      "Zero trust networking",
      "Tailnet admin",
      "SSH"
    ],
    "aliases": [
      "tailscale cli"
    ],
    "keywords": [
      "vpn ssh tailnet"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "doppler",
    "name": "Doppler CLI",
    "shortName": "doppler",
    "maker": "doppler",
    "category": "Security",
    "installWith": "brew",
    "installCommand": "brew install dopplerhq/cli/doppler",
    "quickStart": "doppler login && doppler secrets download",
    "githubRepo": "DopplerHQ/cli",
    "website": "https://docs.doppler.com/docs/cli",
    "docs": "https://docs.doppler.com/docs/cli",
    "stars": 3600,
    "monthlyDownloads": 160000,
    "useCases": [
      "Secrets",
      "Environments",
      "Config sync"
    ],
    "aliases": [
      "doppler cli"
    ],
    "keywords": [
      "secrets env vars"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "claude-code",
    "name": "Claude Code",
    "shortName": "claude",
    "maker": "anthropic",
    "category": "AI",
    "installWith": "npm",
    "installCommand": "npm i -g @anthropic-ai/claude-code",
    "quickStart": "claude",
    "githubRepo": "anthropics/claude-code",
    "website": "https://claude.ai/code",
    "docs": "https://docs.anthropic.com/en/docs/claude-code",
    "stars": 6400,
    "monthlyDownloads": 320000,
    "useCases": [
      "Coding agent",
      "Refactors",
      "Codebase search"
    ],
    "aliases": [
      "anthropic cli"
    ],
    "keywords": [
      "agent coding terminal"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": false,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": false,
    "destructivePotential": "high"
  },
  {
    "slug": "codex",
    "name": "Codex CLI",
    "shortName": "codex",
    "maker": "openai",
    "category": "AI",
    "installWith": "npm",
    "installCommand": "npm i -g @openai/codex",
    "quickStart": "codex",
    "githubRepo": "openai/codex",
    "website": "https://openai.com/codex",
    "docs": "https://www.npmjs.com/package/@openai/codex",
    "stars": 3200,
    "monthlyDownloads": 280000,
    "useCases": [
      "Coding agent",
      "Terminal code tasks",
      "Prompted edits"
    ],
    "aliases": [
      "openai codex"
    ],
    "keywords": [
      "agent coding terminal"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": false,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": false,
    "destructivePotential": "high"
  },
  {
    "slug": "gemini-cli",
    "name": "Gemini CLI",
    "shortName": "gemini",
    "maker": "google-gemini",
    "category": "AI",
    "installWith": "npm",
    "installCommand": "npm i -g @google/gemini-cli",
    "quickStart": "gemini",
    "githubRepo": "google-gemini/gemini-cli",
    "website": "https://github.com/google-gemini/gemini-cli",
    "docs": "https://github.com/google-gemini/gemini-cli",
    "stars": 7200,
    "monthlyDownloads": 240000,
    "useCases": [
      "Coding agent",
      "Prompting",
      "Terminal assistance"
    ],
    "aliases": [
      "google gemini cli"
    ],
    "keywords": [
      "agent coding ai terminal"
    ],
    "tags": [
      "official",
      "agent-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": false,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": false,
    "destructivePotential": "high"
  },
  {
    "slug": "uv",
    "name": "uv",
    "shortName": "uv",
    "maker": "astral",
    "category": "Package Management",
    "installWith": "brew",
    "installCommand": "brew install uv",
    "quickStart": "uv init demo && cd demo && uv run main.py",
    "githubRepo": "astral-sh/uv",
    "website": "https://docs.astral.sh/uv/",
    "docs": "https://docs.astral.sh/uv/",
    "stars": 58900,
    "monthlyDownloads": 1400000,
    "useCases": [
      "Python envs",
      "Fast installs",
      "Script execution"
    ],
    "aliases": [
      "astral uv"
    ],
    "keywords": [
      "python package manager virtualenv"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low",
    "exampleWorkflow": [
      "uv init demo",
      "cd demo",
      "uv add httpx && uv run main.py"
    ]
  },
  {
    "slug": "ruff",
    "name": "Ruff",
    "shortName": "ruff",
    "maker": "astral",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install ruff",
    "quickStart": "ruff check . && ruff format .",
    "githubRepo": "astral-sh/ruff",
    "website": "https://docs.astral.sh/ruff/",
    "docs": "https://docs.astral.sh/ruff/",
    "stars": 41000,
    "monthlyDownloads": 2600000,
    "useCases": [
      "Linting",
      "Formatting",
      "Python code quality"
    ],
    "aliases": [
      "python linter"
    ],
    "keywords": [
      "python lint format"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "pnpm",
    "name": "pnpm",
    "shortName": "pnpm",
    "maker": "pnpm",
    "category": "Package Management",
    "installWith": "npm",
    "installCommand": "npm i -g pnpm",
    "quickStart": "pnpm create next-app@latest open-cli",
    "githubRepo": "pnpm/pnpm",
    "website": "https://pnpm.io",
    "docs": "https://pnpm.io/cli/install",
    "stars": 33000,
    "monthlyDownloads": 12600000,
    "useCases": [
      "Monorepos",
      "Fast installs",
      "Disk efficiency"
    ],
    "aliases": [
      "package manager"
    ],
    "keywords": [
      "node monorepo workspaces"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "bun",
    "name": "Bun",
    "shortName": "bun",
    "maker": "oven",
    "category": "Package Management",
    "installWith": "curl",
    "installCommand": "curl -fsSL https://bun.sh/install | bash",
    "quickStart": "bun create next-app open-cli",
    "githubRepo": "oven-sh/bun",
    "website": "https://bun.sh",
    "docs": "https://bun.sh/docs",
    "stars": 84000,
    "monthlyDownloads": 2200000,
    "useCases": [
      "JS runtime",
      "Task runner",
      "Package management"
    ],
    "aliases": [
      "bun runtime"
    ],
    "keywords": [
      "javascript runtime package manager"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "deno",
    "name": "Deno",
    "shortName": "deno",
    "maker": "denoland",
    "category": "Package Management",
    "installWith": "brew",
    "installCommand": "brew install deno",
    "quickStart": "deno init my-app && deno task dev",
    "githubRepo": "denoland/deno",
    "website": "https://deno.com",
    "docs": "https://docs.deno.com/runtime/reference/cli/",
    "stars": 102000,
    "monthlyDownloads": 890000,
    "useCases": [
      "TS runtime",
      "Built-in tooling",
      "Scripting"
    ],
    "aliases": [
      "deno runtime"
    ],
    "keywords": [
      "typescript runtime lint fmt"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "pipx",
    "name": "pipx",
    "shortName": "pipx",
    "maker": "pypa",
    "category": "Package Management",
    "installWith": "brew",
    "installCommand": "brew install pipx",
    "quickStart": "pipx install httpie",
    "githubRepo": "pypa/pipx",
    "website": "https://pipx.pypa.io",
    "docs": "https://pipx.pypa.io/stable/",
    "stars": 13000,
    "monthlyDownloads": 350000,
    "useCases": [
      "Python CLI apps",
      "Isolated installs",
      "Global tools"
    ],
    "aliases": [
      "python cli installer"
    ],
    "keywords": [
      "python isolated cli"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "poetry",
    "name": "Poetry",
    "shortName": "poetry",
    "maker": "poetry",
    "category": "Package Management",
    "installWith": "curl",
    "installCommand": "curl -sSL https://install.python-poetry.org | python3 -",
    "quickStart": "poetry new demo && cd demo && poetry install",
    "githubRepo": "python-poetry/poetry",
    "website": "https://python-poetry.org",
    "docs": "https://python-poetry.org/docs/cli/",
    "stars": 34400,
    "monthlyDownloads": 1700000,
    "useCases": [
      "Python packaging",
      "Dependencies",
      "Virtualenvs"
    ],
    "aliases": [
      "poetry cli"
    ],
    "keywords": [
      "python package manager"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "hatch",
    "name": "Hatch",
    "shortName": "hatch",
    "maker": "hatch",
    "category": "Package Management",
    "installWith": "pipx",
    "installCommand": "pipx install hatch",
    "quickStart": "hatch new demo && hatch run test",
    "githubRepo": "pypa/hatch",
    "website": "https://hatch.pypa.io",
    "docs": "https://hatch.pypa.io/latest/cli/",
    "stars": 2900,
    "monthlyDownloads": 220000,
    "useCases": [
      "Python projects",
      "Env management",
      "Builds"
    ],
    "aliases": [
      "hatch cli"
    ],
    "keywords": [
      "python builds envs"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "mise",
    "name": "mise",
    "shortName": "mise",
    "maker": "jdx",
    "category": "Package Management",
    "installWith": "curl",
    "installCommand": "curl https://mise.run | sh",
    "quickStart": "mise use node@20 python@3.12",
    "githubRepo": "jdx/mise",
    "website": "https://mise.jdx.dev",
    "docs": "https://mise.jdx.dev/cli/",
    "stars": 15800,
    "monthlyDownloads": 180000,
    "useCases": [
      "Tool versions",
      "Polyglot dev",
      "Env setup"
    ],
    "aliases": [
      "rtx"
    ],
    "keywords": [
      "tool version manager"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "direnv",
    "name": "direnv",
    "shortName": "direnv",
    "maker": "direnv",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install direnv",
    "quickStart": "echo 'layout python' > .envrc && direnv allow",
    "githubRepo": "direnv/direnv",
    "website": "https://direnv.net",
    "docs": "https://direnv.net/docs/",
    "stars": 29600,
    "monthlyDownloads": 280000,
    "useCases": [
      "Per-project env vars",
      "Shell automation",
      "Secrets hygiene"
    ],
    "aliases": [
      "environment dir"
    ],
    "keywords": [
      "env vars shell"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": false,
    "destructivePotential": "medium"
  },
  {
    "slug": "just",
    "name": "just",
    "shortName": "just",
    "maker": "casey",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install just",
    "quickStart": "just --choose",
    "githubRepo": "casey/just",
    "website": "https://just.systems",
    "docs": "https://just.systems/man/en/",
    "stars": 23400,
    "monthlyDownloads": 360000,
    "useCases": [
      "Task runner",
      "Project commands",
      "Automation"
    ],
    "aliases": [
      "justfile"
    ],
    "keywords": [
      "task runner recipes"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "watchexec",
    "name": "watchexec",
    "shortName": "watchexec",
    "maker": "watchexec",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install watchexec",
    "quickStart": "watchexec -e ts,tsx npm test",
    "githubRepo": "watchexec/watchexec",
    "website": "https://watchexec.github.io",
    "docs": "https://watchexec.github.io/docs/",
    "stars": 11000,
    "monthlyDownloads": 130000,
    "useCases": [
      "File watching",
      "Automation",
      "Dev loops"
    ],
    "aliases": [
      "watch exec"
    ],
    "keywords": [
      "watch files rerun commands"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": false,
    "destructivePotential": "low"
  },
  {
    "slug": "starship",
    "name": "Starship",
    "shortName": "starship",
    "maker": "starship",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install starship",
    "quickStart": "starship init zsh",
    "githubRepo": "starship/starship",
    "website": "https://starship.rs",
    "docs": "https://starship.rs/guide/",
    "stars": 50900,
    "monthlyDownloads": 420000,
    "useCases": [
      "Prompt customization",
      "Shell UX",
      "Context awareness"
    ],
    "aliases": [
      "shell prompt"
    ],
    "keywords": [
      "prompt shell theme"
    ],
    "tags": [
      "builder"
    ],
    "agentFriendly": false,
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "ciFriendly": false,
    "destructivePotential": "low"
  },
  {
    "slug": "nushell",
    "name": "Nushell",
    "shortName": "nu",
    "maker": "nushell",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install nushell",
    "quickStart": "nu",
    "githubRepo": "nushell/nushell",
    "website": "https://nushell.sh",
    "docs": "https://www.nushell.sh/book/",
    "stars": 35600,
    "monthlyDownloads": 170000,
    "useCases": [
      "Structured shell",
      "Pipelines",
      "Data transforms"
    ],
    "aliases": [
      "nu shell"
    ],
    "keywords": [
      "shell json structured data"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "json-output"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "atuin",
    "name": "Atuin",
    "shortName": "atuin",
    "maker": "atuin",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install atuin",
    "quickStart": "atuin import auto && atuin search git",
    "githubRepo": "atuinsh/atuin",
    "website": "https://atuin.sh",
    "docs": "https://docs.atuin.sh/",
    "stars": 24700,
    "monthlyDownloads": 120000,
    "useCases": [
      "Shell history",
      "Search",
      "Sync"
    ],
    "aliases": [
      "history search"
    ],
    "keywords": [
      "shell history sync"
    ],
    "tags": [
      "builder"
    ],
    "agentFriendly": false,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": false,
    "destructivePotential": "low"
  },
  {
    "slug": "zoxide",
    "name": "zoxide",
    "shortName": "zoxide",
    "maker": "ajeetdsouza",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install zoxide",
    "quickStart": "zoxide init zsh && z src",
    "githubRepo": "ajeetdsouza/zoxide",
    "website": "https://github.com/ajeetdsouza/zoxide",
    "docs": "https://github.com/ajeetdsouza/zoxide",
    "stars": 30600,
    "monthlyDownloads": 330000,
    "useCases": [
      "Jump to directories",
      "Shell navigation",
      "History-based cd"
    ],
    "aliases": [
      "z"
    ],
    "keywords": [
      "cd jump directories"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "agentFriendly": false,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "rg",
    "name": "ripgrep",
    "shortName": "rg",
    "maker": "burnt-sushi",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install ripgrep",
    "quickStart": "rg TODO src",
    "githubRepo": "BurntSushi/ripgrep",
    "website": "https://github.com/BurntSushi/ripgrep",
    "docs": "https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md",
    "stars": 55700,
    "monthlyDownloads": 2500000,
    "useCases": [
      "Code search",
      "Fast grep",
      "Agent codebase scans"
    ],
    "aliases": [
      "ripgrep",
      "grep"
    ],
    "keywords": [
      "search files text codebase"
    ],
    "tags": [
      "builder",
      "shell-essential",
      "agent-friendly",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "fd",
    "name": "fd",
    "shortName": "fd",
    "maker": "sharkdp",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install fd",
    "quickStart": "fd package json src",
    "githubRepo": "sharkdp/fd",
    "website": "https://github.com/sharkdp/fd",
    "docs": "https://github.com/sharkdp/fd",
    "stars": 37700,
    "monthlyDownloads": 1300000,
    "useCases": [
      "File finding",
      "Project scans",
      "Fast traversal"
    ],
    "aliases": [
      "find replacement"
    ],
    "keywords": [
      "find files search"
    ],
    "tags": [
      "builder",
      "shell-essential",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "bat",
    "name": "bat",
    "shortName": "bat",
    "maker": "sharkdp",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install bat",
    "quickStart": "bat README.md",
    "githubRepo": "sharkdp/bat",
    "website": "https://github.com/sharkdp/bat",
    "docs": "https://github.com/sharkdp/bat",
    "stars": 53600,
    "monthlyDownloads": 1600000,
    "useCases": [
      "File previews",
      "Syntax highlighting",
      "Readable diffs"
    ],
    "aliases": [
      "cat replacement"
    ],
    "keywords": [
      "preview files syntax"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "hyperfine",
    "name": "hyperfine",
    "shortName": "hyperfine",
    "maker": "sharkdp",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install hyperfine",
    "quickStart": "hyperfine 'npm test' 'pnpm test'",
    "githubRepo": "sharkdp/hyperfine",
    "website": "https://github.com/sharkdp/hyperfine",
    "docs": "https://github.com/sharkdp/hyperfine",
    "stars": 25600,
    "monthlyDownloads": 180000,
    "useCases": [
      "Benchmarking",
      "Command comparisons",
      "Perf tests"
    ],
    "aliases": [
      "benchmark cli"
    ],
    "keywords": [
      "benchmark command performance"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "fzf",
    "name": "fzf",
    "shortName": "fzf",
    "maker": "junegunn",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install fzf",
    "quickStart": "fzf",
    "githubRepo": "junegunn/fzf",
    "website": "https://junegunn.github.io/fzf/",
    "docs": "https://github.com/junegunn/fzf",
    "stars": 72500,
    "monthlyDownloads": 2100000,
    "useCases": [
      "Fuzzy finding",
      "History search",
      "Interactive filtering"
    ],
    "aliases": [
      "fuzzy finder"
    ],
    "keywords": [
      "fuzzy search interactive"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "jq",
    "name": "jq",
    "shortName": "jq",
    "maker": "jqlang",
    "category": "Data",
    "installWith": "brew",
    "installCommand": "brew install jq",
    "quickStart": "cat package.json | jq '.scripts'",
    "githubRepo": "jqlang/jq",
    "website": "https://jqlang.org",
    "docs": "https://jqlang.org/manual/",
    "stars": 31000,
    "monthlyDownloads": 2700000,
    "useCases": [
      "JSON processing",
      "APIs",
      "Agent output parsing"
    ],
    "aliases": [
      "json cli"
    ],
    "keywords": [
      "json parse transform query"
    ],
    "tags": [
      "builder",
      "shell-essential",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "yq",
    "name": "yq",
    "shortName": "yq",
    "maker": "mike-farah",
    "category": "Data",
    "installWith": "brew",
    "installCommand": "brew install yq",
    "quickStart": "yq '.services.web.image' docker-compose.yml",
    "githubRepo": "mikefarah/yq",
    "website": "https://mikefarah.gitbook.io/yq/",
    "docs": "https://mikefarah.gitbook.io/yq/",
    "stars": 13700,
    "monthlyDownloads": 920000,
    "useCases": [
      "YAML processing",
      "Config edits",
      "Kubernetes files"
    ],
    "aliases": [
      "yaml cli"
    ],
    "keywords": [
      "yaml query edit"
    ],
    "tags": [
      "builder",
      "shell-essential",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "eza",
    "name": "eza",
    "shortName": "eza",
    "maker": "eza-community",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install eza",
    "quickStart": "eza -la --git",
    "githubRepo": "eza-community/eza",
    "website": "https://github.com/eza-community/eza",
    "docs": "https://github.com/eza-community/eza",
    "stars": 15500,
    "monthlyDownloads": 460000,
    "useCases": [
      "File listing",
      "Tree views",
      "Git status in ls"
    ],
    "aliases": [
      "exa",
      "ls replacement"
    ],
    "keywords": [
      "ls tree files"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "yazi-cli",
    "name": "Yazi",
    "shortName": "yazi",
    "maker": "yazi",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install yazi",
    "quickStart": "yazi",
    "githubRepo": "sxyazi/yazi",
    "website": "https://yazi-rs.github.io",
    "docs": "https://yazi-rs.github.io/docs/",
    "stars": 24400,
    "monthlyDownloads": 210000,
    "useCases": [
      "File manager",
      "Previews",
      "Keyboard navigation"
    ],
    "aliases": [
      "terminal file manager"
    ],
    "keywords": [
      "files manager preview"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "medium"
  },
  {
    "slug": "broot",
    "name": "broot",
    "shortName": "broot",
    "maker": "canop",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install broot",
    "quickStart": "broot",
    "githubRepo": "Canop/broot",
    "website": "https://dystroy.org/broot/",
    "docs": "https://dystroy.org/broot/",
    "stars": 11400,
    "monthlyDownloads": 90000,
    "useCases": [
      "Directory trees",
      "Search",
      "Terminal file management"
    ],
    "aliases": [
      "tree manager"
    ],
    "keywords": [
      "files tree search"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "medium"
  },
  {
    "slug": "btm",
    "name": "bottom",
    "shortName": "btm",
    "maker": "clement-tsang",
    "category": "Observability",
    "installWith": "brew",
    "installCommand": "brew install bottom",
    "quickStart": "btm",
    "githubRepo": "ClementTsang/bottom",
    "website": "https://github.com/ClementTsang/bottom",
    "docs": "https://github.com/ClementTsang/bottom",
    "stars": 11000,
    "monthlyDownloads": 140000,
    "useCases": [
      "System monitoring",
      "CPU",
      "Process inspection"
    ],
    "aliases": [
      "bottom",
      "htop alternative"
    ],
    "keywords": [
      "system monitor terminal"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "procs",
    "name": "procs",
    "shortName": "procs",
    "maker": "dalance",
    "category": "Observability",
    "installWith": "brew",
    "installCommand": "brew install procs",
    "quickStart": "procs node",
    "githubRepo": "dalance/procs",
    "website": "https://github.com/dalance/procs",
    "docs": "https://github.com/dalance/procs",
    "stars": 5200,
    "monthlyDownloads": 70000,
    "useCases": [
      "Process listing",
      "Filtering",
      "Readable ps"
    ],
    "aliases": [
      "ps replacement"
    ],
    "keywords": [
      "process search"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "sd",
    "name": "sd",
    "shortName": "sd",
    "maker": "chmln",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install sd",
    "quickStart": "sd 'foo' 'bar' file.txt",
    "githubRepo": "chmln/sd",
    "website": "https://github.com/chmln/sd",
    "docs": "https://github.com/chmln/sd",
    "stars": 9500,
    "monthlyDownloads": 110000,
    "useCases": [
      "Find and replace",
      "Code mods",
      "Regex-lite edits"
    ],
    "aliases": [
      "sed replacement"
    ],
    "keywords": [
      "replace text files"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "dust",
    "name": "dust",
    "shortName": "dust",
    "maker": "bootandy",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install dust",
    "quickStart": "dust -d 2 .",
    "githubRepo": "bootandy/dust",
    "website": "https://github.com/bootandy/dust",
    "docs": "https://github.com/bootandy/dust",
    "stars": 10800,
    "monthlyDownloads": 95000,
    "useCases": [
      "Disk usage",
      "Folder sizing",
      "Space analysis"
    ],
    "aliases": [
      "du replacement"
    ],
    "keywords": [
      "disk usage folders"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "duf",
    "name": "duf",
    "shortName": "duf",
    "maker": "muesli",
    "category": "Observability",
    "installWith": "brew",
    "installCommand": "brew install duf",
    "quickStart": "duf",
    "githubRepo": "muesli/duf",
    "website": "https://github.com/muesli/duf",
    "docs": "https://github.com/muesli/duf",
    "stars": 12600,
    "monthlyDownloads": 150000,
    "useCases": [
      "Disk free",
      "Filesystem status",
      "Readable df"
    ],
    "aliases": [
      "df replacement"
    ],
    "keywords": [
      "disk filesystem usage"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "mprocs",
    "name": "mprocs",
    "shortName": "mprocs",
    "maker": "pvolok",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install mprocs",
    "quickStart": "mprocs 'npm:dev' 'worker:dev'",
    "githubRepo": "pvolok/mprocs",
    "website": "https://github.com/pvolok/mprocs",
    "docs": "https://github.com/pvolok/mprocs",
    "stars": 6600,
    "monthlyDownloads": 50000,
    "useCases": [
      "Process orchestration",
      "Dev services",
      "Parallel commands"
    ],
    "aliases": [
      "process orchestrator"
    ],
    "keywords": [
      "multiple commands parallel"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "medium"
  },
  {
    "slug": "tealdeer",
    "name": "tealdeer",
    "shortName": "tldr",
    "maker": "tldr",
    "category": "Docs / Content",
    "installWith": "brew",
    "installCommand": "brew install tealdeer",
    "quickStart": "tldr tar",
    "githubRepo": "tealdeer-rs/tealdeer",
    "website": "https://github.com/tealdeer-rs/tealdeer",
    "docs": "https://github.com/tealdeer-rs/tealdeer",
    "stars": 8200,
    "monthlyDownloads": 160000,
    "useCases": [
      "Command examples",
      "Cheat sheets",
      "Fast docs"
    ],
    "aliases": [
      "tldr pages"
    ],
    "keywords": [
      "docs command examples"
    ],
    "tags": [
      "builder",
      "shell-essential",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": false,
    "destructivePotential": "low"
  },
  {
    "slug": "glow",
    "name": "glow",
    "shortName": "glow",
    "maker": "charmbracelet",
    "category": "Docs / Content",
    "installWith": "brew",
    "installCommand": "brew install glow",
    "quickStart": "glow README.md",
    "githubRepo": "charmbracelet/glow",
    "website": "https://github.com/charmbracelet/glow",
    "docs": "https://github.com/charmbracelet/glow",
    "stars": 18700,
    "monthlyDownloads": 220000,
    "useCases": [
      "Markdown previews",
      "Terminal docs",
      "Readmes"
    ],
    "aliases": [
      "markdown viewer"
    ],
    "keywords": [
      "markdown render"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "gum",
    "name": "gum",
    "shortName": "gum",
    "maker": "charmbracelet",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install gum",
    "quickStart": "gum choose deploy rollback",
    "githubRepo": "charmbracelet/gum",
    "website": "https://github.com/charmbracelet/gum",
    "docs": "https://github.com/charmbracelet/gum",
    "stars": 20200,
    "monthlyDownloads": 250000,
    "useCases": [
      "Shell UX",
      "Prompts",
      "Interactive scripts"
    ],
    "aliases": [
      "shell ui"
    ],
    "keywords": [
      "interactive shell scripts"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": false,
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "mods",
    "name": "mods",
    "shortName": "mods",
    "maker": "charmbracelet",
    "category": "AI",
    "installWith": "brew",
    "installCommand": "brew install mods",
    "quickStart": "mods 'summarize this repository'",
    "githubRepo": "charmbracelet/mods",
    "website": "https://github.com/charmbracelet/mods",
    "docs": "https://github.com/charmbracelet/mods",
    "stars": 8400,
    "monthlyDownloads": 70000,
    "useCases": [
      "LLM prompts",
      "Terminal AI",
      "Quick synthesis"
    ],
    "aliases": [
      "terminal llm"
    ],
    "keywords": [
      "llm terminal assistant"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "pandoc",
    "name": "Pandoc",
    "shortName": "pandoc",
    "maker": "pandoc",
    "category": "Docs / Content",
    "installWith": "brew",
    "installCommand": "brew install pandoc",
    "quickStart": "pandoc README.md -o README.html",
    "githubRepo": "jgm/pandoc",
    "website": "https://pandoc.org",
    "docs": "https://pandoc.org/MANUAL.html",
    "stars": 37500,
    "monthlyDownloads": 450000,
    "useCases": [
      "Document conversion",
      "Markdown",
      "Publishing"
    ],
    "aliases": [
      "doc converter"
    ],
    "keywords": [
      "markdown pdf html docx"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "httpie",
    "name": "HTTPie",
    "shortName": "http",
    "maker": "httpie",
    "category": "Data",
    "installWith": "brew",
    "installCommand": "brew install httpie",
    "quickStart": "http GET https://api.github.com/repos/vercel/next.js",
    "githubRepo": "httpie/cli",
    "website": "https://httpie.io/cli",
    "docs": "https://httpie.io/docs/cli",
    "stars": 36100,
    "monthlyDownloads": 680000,
    "useCases": [
      "API testing",
      "Readable HTTP",
      "Debugging endpoints"
    ],
    "aliases": [
      "http cli"
    ],
    "keywords": [
      "api rest http requests"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "json-output",
      "ci-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "xh",
    "name": "xh",
    "shortName": "xh",
    "maker": "ducaale",
    "category": "Data",
    "installWith": "brew",
    "installCommand": "brew install xh",
    "quickStart": "xh https://api.github.com/repos/vercel/next.js",
    "githubRepo": "ducaale/xh",
    "website": "https://github.com/ducaale/xh",
    "docs": "https://github.com/ducaale/xh",
    "stars": 5300,
    "monthlyDownloads": 110000,
    "useCases": [
      "HTTP requests",
      "Curl alternative",
      "API testing"
    ],
    "aliases": [
      "curl alternative"
    ],
    "keywords": [
      "http api cli"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "doggo",
    "name": "doggo",
    "shortName": "doggo",
    "maker": "mr-karan",
    "category": "Data",
    "installWith": "brew",
    "installCommand": "brew install doggo",
    "quickStart": "doggo openai.com",
    "githubRepo": "mr-karan/doggo",
    "website": "https://github.com/mr-karan/doggo",
    "docs": "https://github.com/mr-karan/doggo",
    "stars": 3300,
    "monthlyDownloads": 60000,
    "useCases": [
      "DNS lookups",
      "Networking",
      "Debugging records"
    ],
    "aliases": [
      "dns cli"
    ],
    "keywords": [
      "dns records lookup"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "ollama",
    "name": "Ollama",
    "shortName": "ollama",
    "maker": "ollama",
    "category": "AI",
    "installWith": "brew",
    "installCommand": "brew install ollama",
    "quickStart": "ollama run llama3.2",
    "githubRepo": "ollama/ollama",
    "website": "https://ollama.com",
    "docs": "https://github.com/ollama/ollama/tree/main/docs",
    "stars": 128000,
    "monthlyDownloads": 680000,
    "useCases": [
      "Local models",
      "AI prototyping",
      "Private inference"
    ],
    "aliases": [
      "local llm"
    ],
    "keywords": [
      "local models inference"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "local-first"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "localFirst": true,
    "ciFriendly": false,
    "destructivePotential": "medium",
    "exampleWorkflow": [
      "ollama pull llama3.2",
      "ollama run llama3.2",
      "ollama serve"
    ]
  },
  {
    "slug": "aider",
    "name": "aider",
    "shortName": "aider",
    "maker": "aider",
    "category": "AI",
    "installWith": "pipx",
    "installCommand": "pipx install aider-chat",
    "quickStart": "aider --model sonnet",
    "githubRepo": "Aider-AI/aider",
    "website": "https://aider.chat",
    "docs": "https://aider.chat/docs/",
    "stars": 34300,
    "monthlyDownloads": 190000,
    "useCases": [
      "Code editing",
      "Agent loops",
      "Repo-aware chat"
    ],
    "aliases": [
      "aider chat"
    ],
    "keywords": [
      "coding agent ai"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": false,
    "destructivePotential": "high"
  },
  {
    "slug": "goose",
    "name": "Goose",
    "shortName": "goose",
    "maker": "block",
    "category": "AI",
    "installWith": "brew",
    "installCommand": "brew install goose",
    "quickStart": "goose",
    "githubRepo": "block/goose",
    "website": "https://github.com/block/goose",
    "docs": "https://github.com/block/goose",
    "stars": 8700,
    "monthlyDownloads": 90000,
    "useCases": [
      "Coding agent",
      "Terminal actions",
      "Prompted automation"
    ],
    "aliases": [
      "block goose"
    ],
    "keywords": [
      "agent coding terminal"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": false,
    "requiresAuth": true,
    "requiresNetwork": true,
    "destructivePotential": "high"
  },
  {
    "slug": "browser-use",
    "name": "browser-use",
    "shortName": "browser-use",
    "maker": "browser-use",
    "category": "Browser Automation",
    "installWith": "pipx",
    "installCommand": "pipx install browser-use",
    "quickStart": "browser-use open https://opencli.co",
    "githubRepo": "browser-use/browser-use",
    "website": "https://github.com/browser-use/browser-use",
    "docs": "https://github.com/browser-use/browser-use/blob/main/browser_use/skill_cli/README.md",
    "stars": 81200,
    "monthlyDownloads": 90000,
    "useCases": [
      "Browser automation",
      "Persistent sessions",
      "Agent workflows"
    ],
    "aliases": [
      "browser automation"
    ],
    "keywords": [
      "browser automation agent"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": false,
    "destructivePotential": "high"
  },
  {
    "slug": "firecrawl",
    "name": "Firecrawl",
    "shortName": "firecrawl",
    "maker": "firecrawl",
    "category": "Scraping",
    "installWith": "npm",
    "installCommand": "npm i -g firecrawl",
    "quickStart": "firecrawl search 'open source CLI tools' --limit 3",
    "githubRepo": "firecrawl/cli",
    "website": "https://github.com/firecrawl/cli",
    "docs": "https://github.com/firecrawl/cli",
    "stars": 190,
    "monthlyDownloads": 15000,
    "useCases": [
      "Web extraction",
      "Crawling",
      "LLM-ready markdown"
    ],
    "aliases": [
      "crawl web"
    ],
    "keywords": [
      "scrape crawl browser search"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "playwright",
    "name": "Playwright",
    "shortName": "playwright",
    "maker": "microsoft",
    "category": "Browser Automation",
    "installWith": "npm",
    "installCommand": "npm i -D @playwright/test",
    "quickStart": "npx playwright test",
    "githubRepo": "microsoft/playwright",
    "website": "https://playwright.dev",
    "docs": "https://playwright.dev/docs/intro",
    "stars": 73400,
    "monthlyDownloads": 5200000,
    "useCases": [
      "Browser testing",
      "Automation",
      "Headless scripts"
    ],
    "aliases": [
      "playwright cli"
    ],
    "keywords": [
      "browser tests automation"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "llm",
    "name": "LLM",
    "shortName": "llm",
    "maker": "simon-willison",
    "category": "AI",
    "installWith": "pipx",
    "installCommand": "pipx install llm",
    "quickStart": "llm 'Explain this command: rg TODO src'",
    "githubRepo": "simonw/llm",
    "website": "https://github.com/simonw/llm",
    "docs": "https://llm.datasette.io/",
    "stars": 9200,
    "monthlyDownloads": 70000,
    "useCases": [
      "Prompting",
      "Local plugins",
      "Structured LLM outputs"
    ],
    "aliases": [
      "llm cli"
    ],
    "keywords": [
      "prompting models plugins"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "json-output"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresAuth": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "summarize",
    "name": "summarize",
    "shortName": "summarize",
    "maker": "steipete",
    "category": "AI",
    "installWith": "npm",
    "installCommand": "npm i -g @steipete/summarize",
    "quickStart": "summarize https://opencli.co",
    "githubRepo": "steipete/summarize",
    "website": "https://www.npmjs.com/package/@steipete/summarize",
    "docs": "https://www.npmjs.com/package/@steipete/summarize",
    "stars": 180,
    "monthlyDownloads": 12000,
    "useCases": [
      "Summaries",
      "Long-form content",
      "Terminal research"
    ],
    "aliases": [
      "peter summarize"
    ],
    "keywords": [
      "summarize links files content"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "traces",
    "name": "traces",
    "shortName": "traces",
    "maker": "traces",
    "category": "Productivity",
    "installWith": "npm",
    "installCommand": "npm i -g @traces-sh/traces",
    "quickStart": "traces record npm run dev",
    "githubRepo": "Traces-Sys/traces",
    "website": "https://traces.sh",
    "docs": "https://www.npmjs.com/package/@traces-sh/traces",
    "stars": 95,
    "monthlyDownloads": 6000,
    "useCases": [
      "Terminal traces",
      "Workflow recording",
      "Debugging sessions"
    ],
    "aliases": [
      "terminal traces"
    ],
    "keywords": [
      "record terminal sessions"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "sqlite-utils",
    "name": "sqlite-utils",
    "shortName": "sqlite-utils",
    "maker": "simon-willison",
    "category": "Database",
    "installWith": "pipx",
    "installCommand": "pipx install sqlite-utils",
    "quickStart": "sqlite-utils insert data.db items items.json --pk id",
    "githubRepo": "simonw/sqlite-utils",
    "website": "https://sqlite-utils.datasette.io/",
    "docs": "https://sqlite-utils.datasette.io/",
    "stars": 4300,
    "monthlyDownloads": 65000,
    "useCases": [
      "SQLite automation",
      "CSV/JSON imports",
      "Data transforms"
    ],
    "aliases": [
      "sqlite cli"
    ],
    "keywords": [
      "sqlite import data"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "json-output"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "duckdb",
    "name": "DuckDB CLI",
    "shortName": "duckdb",
    "maker": "duckdb",
    "category": "Data",
    "installWith": "brew",
    "installCommand": "brew install duckdb",
    "quickStart": "duckdb ':memory:' 'select 42'",
    "githubRepo": "duckdb/duckdb",
    "website": "https://duckdb.org",
    "docs": "https://duckdb.org/docs/stable/clients/cli/overview",
    "stars": 32000,
    "monthlyDownloads": 500000,
    "useCases": [
      "Local analytics",
      "SQL",
      "CSV/Parquet queries"
    ],
    "aliases": [
      "analytics sql"
    ],
    "keywords": [
      "parquet csv local analytics"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "local-first"
    ],
    "featured": true,
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "localFirst": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "pgcli",
    "name": "pgcli",
    "shortName": "pgcli",
    "maker": "dbcli",
    "category": "Database",
    "installWith": "pipx",
    "installCommand": "pipx install pgcli",
    "quickStart": "pgcli postgres://localhost/postgres",
    "githubRepo": "dbcli/pgcli",
    "website": "https://www.pgcli.com",
    "docs": "https://www.pgcli.com/docs",
    "stars": 12500,
    "monthlyDownloads": 90000,
    "useCases": [
      "Postgres shell",
      "Autocomplete",
      "Readable results"
    ],
    "aliases": [
      "postgres cli"
    ],
    "keywords": [
      "postgres sql shell"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "high"
  },
  {
    "slug": "mycli",
    "name": "mycli",
    "shortName": "mycli",
    "maker": "dbcli",
    "category": "Database",
    "installWith": "pipx",
    "installCommand": "pipx install mycli",
    "quickStart": "mycli mysql://root@localhost",
    "githubRepo": "dbcli/mycli",
    "website": "https://www.mycli.net",
    "docs": "https://www.mycli.net",
    "stars": 11400,
    "monthlyDownloads": 45000,
    "useCases": [
      "MySQL shell",
      "Autocomplete",
      "Readable results"
    ],
    "aliases": [
      "mysql cli"
    ],
    "keywords": [
      "mysql shell"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "high"
  },
  {
    "slug": "usql",
    "name": "usql",
    "shortName": "usql",
    "maker": "xo",
    "category": "Database",
    "installWith": "brew",
    "installCommand": "brew install usql",
    "quickStart": "usql postgres://localhost/postgres",
    "githubRepo": "xo/usql",
    "website": "https://github.com/xo/usql",
    "docs": "https://github.com/xo/usql",
    "stars": 9600,
    "monthlyDownloads": 50000,
    "useCases": [
      "Universal SQL shell",
      "Multiple databases",
      "DB scripts"
    ],
    "aliases": [
      "sql shell"
    ],
    "keywords": [
      "postgres mysql sqlite sql"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "litecli",
    "name": "litecli",
    "shortName": "litecli",
    "maker": "dbcli",
    "category": "Database",
    "installWith": "pipx",
    "installCommand": "pipx install litecli",
    "quickStart": "litecli demo.db",
    "githubRepo": "dbcli/litecli",
    "website": "https://www.mycli.net/",
    "docs": "https://github.com/dbcli/litecli",
    "stars": 2200,
    "monthlyDownloads": 18000,
    "useCases": [
      "SQLite shell",
      "Autocomplete",
      "Readable tables"
    ],
    "aliases": [
      "sqlite shell"
    ],
    "keywords": [
      "sqlite cli"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "medium"
  },
  {
    "slug": "csvkit",
    "name": "csvkit",
    "shortName": "csvkit",
    "maker": "wireservice",
    "category": "Data",
    "installWith": "pipx",
    "installCommand": "pipx install csvkit",
    "quickStart": "csvlook data.csv",
    "githubRepo": "wireservice/csvkit",
    "website": "https://csvkit.readthedocs.io",
    "docs": "https://csvkit.readthedocs.io/",
    "stars": 6600,
    "monthlyDownloads": 95000,
    "useCases": [
      "CSV inspection",
      "Transforms",
      "Data cleaning"
    ],
    "aliases": [
      "csv cli"
    ],
    "keywords": [
      "csv inspect clean"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "mlr",
    "name": "Miller",
    "shortName": "mlr",
    "maker": "johnkerl",
    "category": "Data",
    "installWith": "brew",
    "installCommand": "brew install miller",
    "quickStart": "mlr --csv cut -f name,email data.csv",
    "githubRepo": "johnkerl/miller",
    "website": "https://miller.readthedocs.io",
    "docs": "https://miller.readthedocs.io/",
    "stars": 7600,
    "monthlyDownloads": 85000,
    "useCases": [
      "CSV transforms",
      "Stream processing",
      "Data shaping"
    ],
    "aliases": [
      "miller"
    ],
    "keywords": [
      "csv transform tsv data"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "visidata",
    "name": "VisiData",
    "shortName": "vd",
    "maker": "visidata",
    "category": "Data",
    "installWith": "pipx",
    "installCommand": "pipx install visidata",
    "quickStart": "vd data.csv",
    "githubRepo": "saulpw/visidata",
    "website": "https://www.visidata.org",
    "docs": "https://www.visidata.org/docs/",
    "stars": 11000,
    "monthlyDownloads": 30000,
    "useCases": [
      "Interactive data exploration",
      "Spreadsheets",
      "Terminal analytics"
    ],
    "aliases": [
      "vd"
    ],
    "keywords": [
      "csv spreadsheet terminal"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "medium"
  },
  {
    "slug": "xsv",
    "name": "xsv",
    "shortName": "xsv",
    "maker": "burnt-sushi",
    "category": "Data",
    "installWith": "cargo",
    "installCommand": "cargo install xsv",
    "quickStart": "xsv stats data.csv",
    "githubRepo": "BurntSushi/xsv",
    "website": "https://github.com/BurntSushi/xsv",
    "docs": "https://github.com/BurntSushi/xsv",
    "stars": 9800,
    "monthlyDownloads": 25000,
    "useCases": [
      "CSV indexing",
      "Stats",
      "Fast tabular data"
    ],
    "aliases": [
      "csv stats"
    ],
    "keywords": [
      "csv stats index"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "yt-dlp",
    "name": "yt-dlp",
    "shortName": "yt-dlp",
    "maker": "yt-dlp",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install yt-dlp",
    "quickStart": "yt-dlp https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "githubRepo": "yt-dlp/yt-dlp",
    "website": "https://github.com/yt-dlp/yt-dlp",
    "docs": "https://github.com/yt-dlp/yt-dlp",
    "stars": 112000,
    "monthlyDownloads": 900000,
    "useCases": [
      "Video downloads",
      "Audio extraction",
      "Archiving"
    ],
    "aliases": [
      "youtube download"
    ],
    "keywords": [
      "download video audio"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "ffmpeg",
    "name": "FFmpeg",
    "shortName": "ffmpeg",
    "maker": "ffmpeg",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install ffmpeg",
    "quickStart": "ffmpeg -i input.mov output.mp4",
    "githubRepo": "FFmpeg/FFmpeg",
    "website": "https://ffmpeg.org",
    "docs": "https://ffmpeg.org/ffmpeg.html",
    "stars": 49600,
    "monthlyDownloads": 1800000,
    "useCases": [
      "Media conversion",
      "Audio extraction",
      "Video processing"
    ],
    "aliases": [
      "video cli"
    ],
    "keywords": [
      "audio video convert"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "rclone",
    "name": "rclone",
    "shortName": "rclone",
    "maker": "rclone",
    "category": "Cloud",
    "installWith": "brew",
    "installCommand": "brew install rclone",
    "quickStart": "rclone ls remote:bucket",
    "githubRepo": "rclone/rclone",
    "website": "https://rclone.org",
    "docs": "https://rclone.org/docs/",
    "stars": 51000,
    "monthlyDownloads": 520000,
    "useCases": [
      "Cloud storage",
      "Sync",
      "Backups"
    ],
    "aliases": [
      "cloud sync"
    ],
    "keywords": [
      "sync s3 drive storage"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "trivy",
    "name": "Trivy",
    "shortName": "trivy",
    "maker": "aquasecurity",
    "category": "Security",
    "installWith": "brew",
    "installCommand": "brew install trivy",
    "quickStart": "trivy image node:20",
    "githubRepo": "aquasecurity/trivy",
    "website": "https://trivy.dev",
    "docs": "https://trivy.dev/latest/docs/references/configuration/cli/",
    "stars": 27100,
    "monthlyDownloads": 380000,
    "useCases": [
      "Image scanning",
      "Vulns",
      "IaC checks"
    ],
    "aliases": [
      "container scan"
    ],
    "keywords": [
      "security scan vulnerabilities"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly",
      "json-output"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "syft",
    "name": "Syft",
    "shortName": "syft",
    "maker": "anchore",
    "category": "Security",
    "installWith": "brew",
    "installCommand": "brew install syft",
    "quickStart": "syft dir:.",
    "githubRepo": "anchore/syft",
    "website": "https://github.com/anchore/syft",
    "docs": "https://github.com/anchore/syft",
    "stars": 6700,
    "monthlyDownloads": 170000,
    "useCases": [
      "SBOMs",
      "Package inventory",
      "Supply chain"
    ],
    "aliases": [
      "sbom cli"
    ],
    "keywords": [
      "sbom packages inventory"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly",
      "json-output"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "grype",
    "name": "Grype",
    "shortName": "grype",
    "maker": "anchore",
    "category": "Security",
    "installWith": "brew",
    "installCommand": "brew install grype",
    "quickStart": "grype dir:.",
    "githubRepo": "anchore/grype",
    "website": "https://github.com/anchore/grype",
    "docs": "https://github.com/anchore/grype",
    "stars": 9700,
    "monthlyDownloads": 190000,
    "useCases": [
      "Vulnerability scanning",
      "SBOM analysis",
      "Policies"
    ],
    "aliases": [
      "vuln cli"
    ],
    "keywords": [
      "vulnerability scan sbom"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly",
      "json-output"
    ],
    "agentFriendly": true,
    "supportsJsonOutput": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "dive",
    "name": "Dive",
    "shortName": "dive",
    "maker": "anchore",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install dive",
    "quickStart": "dive node:20",
    "githubRepo": "wagoodman/dive",
    "website": "https://github.com/wagoodman/dive",
    "docs": "https://github.com/wagoodman/dive",
    "stars": 50100,
    "monthlyDownloads": 140000,
    "useCases": [
      "Image layers",
      "Docker optimization",
      "Container inspection"
    ],
    "aliases": [
      "image inspect"
    ],
    "keywords": [
      "docker image layers"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "ciFriendly": false,
    "destructivePotential": "low"
  },
  {
    "slug": "k9s",
    "name": "k9s",
    "shortName": "k9s",
    "maker": "derailed",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install derailed/k9s/k9s",
    "quickStart": "k9s",
    "githubRepo": "derailed/k9s",
    "website": "https://k9scli.io",
    "docs": "https://k9scli.io/topics/commands/",
    "stars": 34700,
    "monthlyDownloads": 220000,
    "useCases": [
      "Kubernetes navigation",
      "Logs",
      "Pod inspection"
    ],
    "aliases": [
      "k8s tui"
    ],
    "keywords": [
      "kubernetes pods logs"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": true,
    "destructivePotential": "high"
  },
  {
    "slug": "stern",
    "name": "stern",
    "shortName": "stern",
    "maker": "derailed",
    "category": "Observability",
    "installWith": "brew",
    "installCommand": "brew install stern",
    "quickStart": "stern api",
    "githubRepo": "stern/stern",
    "website": "https://github.com/stern/stern",
    "docs": "https://github.com/stern/stern",
    "stars": 7800,
    "monthlyDownloads": 90000,
    "useCases": [
      "Kubernetes logs",
      "Multi-pod tails",
      "Debugging"
    ],
    "aliases": [
      "k8s logs"
    ],
    "keywords": [
      "kubernetes logs tail"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": true,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "lazydocker",
    "name": "lazydocker",
    "shortName": "lazydocker",
    "maker": "jesse-duffield",
    "category": "Containers / Infra",
    "installWith": "brew",
    "installCommand": "brew install lazydocker",
    "quickStart": "lazydocker",
    "githubRepo": "jesseduffield/lazydocker",
    "website": "https://github.com/jesseduffield/lazydocker",
    "docs": "https://github.com/jesseduffield/lazydocker",
    "stars": 40800,
    "monthlyDownloads": 180000,
    "useCases": [
      "Docker TUI",
      "Container management",
      "Logs"
    ],
    "aliases": [
      "docker tui"
    ],
    "keywords": [
      "docker containers logs"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "high"
  },
  {
    "slug": "k6",
    "name": "k6",
    "shortName": "k6",
    "maker": "grafana",
    "category": "Observability",
    "installWith": "brew",
    "installCommand": "brew install k6",
    "quickStart": "k6 run script.js",
    "githubRepo": "grafana/k6",
    "website": "https://k6.io",
    "docs": "https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/",
    "stars": 28900,
    "monthlyDownloads": 360000,
    "useCases": [
      "Load testing",
      "Performance",
      "HTTP tests"
    ],
    "aliases": [
      "load test cli"
    ],
    "keywords": [
      "load testing performance api"
    ],
    "tags": [
      "official",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "lazygit",
    "name": "lazygit",
    "shortName": "lazygit",
    "maker": "jesse-duffield",
    "category": "Git",
    "installWith": "brew",
    "installCommand": "brew install lazygit",
    "quickStart": "lazygit",
    "githubRepo": "jesseduffield/lazygit",
    "website": "https://github.com/jesseduffield/lazygit",
    "docs": "https://github.com/jesseduffield/lazygit",
    "stars": 63800,
    "monthlyDownloads": 410000,
    "useCases": [
      "Git workflows",
      "Staging",
      "History browsing"
    ],
    "aliases": [
      "git tui"
    ],
    "keywords": [
      "git ui commit rebase"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "featured": true,
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "high"
  },
  {
    "slug": "gitui",
    "name": "gitui",
    "shortName": "gitui",
    "maker": "extrawurst",
    "category": "Git",
    "installWith": "brew",
    "installCommand": "brew install gitui",
    "quickStart": "gitui",
    "githubRepo": "extrawurst/gitui",
    "website": "https://github.com/extrawurst/gitui",
    "docs": "https://github.com/extrawurst/gitui",
    "stars": 19400,
    "monthlyDownloads": 85000,
    "useCases": [
      "Git TUI",
      "Commits",
      "History"
    ],
    "aliases": [
      "git terminal ui"
    ],
    "keywords": [
      "git ui terminal"
    ],
    "tags": [
      "builder"
    ],
    "supportsNonInteractive": false,
    "requiresNetwork": false,
    "destructivePotential": "high"
  },
  {
    "slug": "jj",
    "name": "Jujutsu",
    "shortName": "jj",
    "maker": "jujutsu",
    "category": "Git",
    "installWith": "brew",
    "installCommand": "brew install jj",
    "quickStart": "jj git init --colocate",
    "githubRepo": "jj-vcs/jj",
    "website": "https://jj-vcs.github.io/jj/latest/",
    "docs": "https://jj-vcs.github.io/jj/latest/",
    "stars": 15000,
    "monthlyDownloads": 80000,
    "useCases": [
      "Version control",
      "Stacked changes",
      "Git-compatible history"
    ],
    "aliases": [
      "jujutsu"
    ],
    "keywords": [
      "version control git replacement"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "delta",
    "name": "delta",
    "shortName": "delta",
    "maker": "dandavison",
    "category": "Git",
    "installWith": "brew",
    "installCommand": "brew install git-delta",
    "quickStart": "git -c core.pager=delta diff",
    "githubRepo": "dandavison/delta",
    "website": "https://github.com/dandavison/delta",
    "docs": "https://github.com/dandavison/delta",
    "stars": 28600,
    "monthlyDownloads": 240000,
    "useCases": [
      "Readable diffs",
      "Git pager",
      "Syntax highlighting"
    ],
    "aliases": [
      "git delta"
    ],
    "keywords": [
      "git diff pager"
    ],
    "tags": [
      "builder",
      "shell-essential"
    ],
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "destructivePotential": "low"
  },
  {
    "slug": "difftastic",
    "name": "difftastic",
    "shortName": "difft",
    "maker": "sourcefrog",
    "category": "Git",
    "installWith": "brew",
    "installCommand": "brew install difftastic",
    "quickStart": "difft file-a.ts file-b.ts",
    "githubRepo": "Wilfred/difftastic",
    "website": "https://github.com/Wilfred/difftastic",
    "docs": "https://github.com/Wilfred/difftastic",
    "stars": 21300,
    "monthlyDownloads": 70000,
    "useCases": [
      "Structural diffs",
      "Code reviews",
      "AST-aware comparisons"
    ],
    "aliases": [
      "syntax diff"
    ],
    "keywords": [
      "diff ast code review"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "biome",
    "name": "Biome",
    "shortName": "biome",
    "maker": "biome",
    "category": "Productivity",
    "installWith": "npm",
    "installCommand": "npm i -g @biomejs/biome",
    "quickStart": "biome check .",
    "githubRepo": "biomejs/biome",
    "website": "https://biomejs.dev",
    "docs": "https://biomejs.dev/guides/getting-started/",
    "stars": 19400,
    "monthlyDownloads": 1500000,
    "useCases": [
      "Linting",
      "Formatting",
      "JS/TS code quality"
    ],
    "aliases": [
      "rome replacement"
    ],
    "keywords": [
      "lint format javascript typescript"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "eslint",
    "name": "ESLint",
    "shortName": "eslint",
    "maker": "eslint",
    "category": "Productivity",
    "installWith": "npm",
    "installCommand": "npm i -g eslint",
    "quickStart": "eslint .",
    "githubRepo": "eslint/eslint",
    "website": "https://eslint.org",
    "docs": "https://eslint.org/docs/latest/use/command-line-interface",
    "stars": 26100,
    "monthlyDownloads": 27000000,
    "useCases": [
      "Linting",
      "JS rules",
      "Code health"
    ],
    "aliases": [
      "js linter"
    ],
    "keywords": [
      "lint javascript typescript"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "prettier",
    "name": "Prettier",
    "shortName": "prettier",
    "maker": "prettier",
    "category": "Productivity",
    "installWith": "npm",
    "installCommand": "npm i -g prettier",
    "quickStart": "prettier . --write",
    "githubRepo": "prettier/prettier",
    "website": "https://prettier.io",
    "docs": "https://prettier.io/docs/en/cli.html",
    "stars": 51400,
    "monthlyDownloads": 46000000,
    "useCases": [
      "Formatting",
      "Markdown",
      "Code consistency"
    ],
    "aliases": [
      "code formatter"
    ],
    "keywords": [
      "format javascript typescript markdown"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "vitest",
    "name": "Vitest",
    "shortName": "vitest",
    "maker": "vitest",
    "category": "Productivity",
    "installWith": "npm",
    "installCommand": "npm i -g vitest",
    "quickStart": "vitest run",
    "githubRepo": "vitest-dev/vitest",
    "website": "https://vitest.dev",
    "docs": "https://vitest.dev/guide/cli",
    "stars": 17200,
    "monthlyDownloads": 14000000,
    "useCases": [
      "Testing",
      "Watch mode",
      "JS unit tests"
    ],
    "aliases": [
      "test runner"
    ],
    "keywords": [
      "test runner vite"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "vite",
    "name": "Vite",
    "shortName": "vite",
    "maker": "vite",
    "category": "Package Management",
    "installWith": "npm",
    "installCommand": "npm i -g vite",
    "quickStart": "vite --host",
    "githubRepo": "vitejs/vite",
    "website": "https://vite.dev",
    "docs": "https://vite.dev/guide/cli",
    "stars": 72200,
    "monthlyDownloads": 30000000,
    "useCases": [
      "Frontend dev server",
      "Build tooling",
      "Scaffolding"
    ],
    "aliases": [
      "vite cli"
    ],
    "keywords": [
      "frontend bundler dev server"
    ],
    "tags": [
      "builder",
      "agent-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "drizzle-kit",
    "name": "drizzle-kit",
    "shortName": "drizzle-kit",
    "maker": "drizzle-team",
    "category": "Database",
    "installWith": "npm",
    "installCommand": "npm i -g drizzle-kit",
    "quickStart": "drizzle-kit generate",
    "githubRepo": "drizzle-team/drizzle-orm",
    "website": "https://orm.drizzle.team/docs/kit-overview",
    "docs": "https://orm.drizzle.team/docs/kit-overview",
    "stars": 30100,
    "monthlyDownloads": 850000,
    "useCases": [
      "Migrations",
      "Schema diffs",
      "TypeScript DB tooling"
    ],
    "aliases": [
      "drizzle cli"
    ],
    "keywords": [
      "migrations schema sql"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "dbmate",
    "name": "dbmate",
    "shortName": "dbmate",
    "maker": "amacneil",
    "category": "Database",
    "installWith": "brew",
    "installCommand": "brew install dbmate",
    "quickStart": "dbmate new create_users_table",
    "githubRepo": "amacneil/dbmate",
    "website": "https://github.com/amacneil/dbmate",
    "docs": "https://github.com/amacneil/dbmate",
    "stars": 5900,
    "monthlyDownloads": 160000,
    "useCases": [
      "SQL migrations",
      "Simple DB workflows",
      "Multiple databases"
    ],
    "aliases": [
      "database migrations"
    ],
    "keywords": [
      "migrations postgres mysql sqlite"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "high"
  },
  {
    "slug": "shellcheck",
    "name": "ShellCheck",
    "shortName": "shellcheck",
    "maker": "koalaman",
    "category": "Security",
    "installWith": "brew",
    "installCommand": "brew install shellcheck",
    "quickStart": "shellcheck script.sh",
    "githubRepo": "koalaman/shellcheck",
    "website": "https://www.shellcheck.net",
    "docs": "https://github.com/koalaman/shellcheck",
    "stars": 37200,
    "monthlyDownloads": 700000,
    "useCases": [
      "Shell linting",
      "Bash safety",
      "Script review"
    ],
    "aliases": [
      "bash linter"
    ],
    "keywords": [
      "shell lint bash"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  },
  {
    "slug": "shfmt",
    "name": "shfmt",
    "shortName": "shfmt",
    "maker": "mvdan",
    "category": "Productivity",
    "installWith": "brew",
    "installCommand": "brew install shfmt",
    "quickStart": "shfmt -w scripts",
    "githubRepo": "mvdan/sh",
    "website": "https://github.com/mvdan/sh",
    "docs": "https://github.com/mvdan/sh",
    "stars": 7400,
    "monthlyDownloads": 320000,
    "useCases": [
      "Shell formatting",
      "Bash style",
      "CI hygiene"
    ],
    "aliases": [
      "shell formatter"
    ],
    "keywords": [
      "shell format bash"
    ],
    "tags": [
      "builder",
      "agent-friendly",
      "ci-friendly"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "medium"
  },
  {
    "slug": "fd-find",
    "name": "fdfind",
    "shortName": "fdfind",
    "maker": "sharkdp",
    "category": "Shell Utilities",
    "installWith": "brew",
    "installCommand": "brew install fd",
    "quickStart": "fdfind src",
    "githubRepo": "sharkdp/fd",
    "website": "https://github.com/sharkdp/fd",
    "docs": "https://github.com/sharkdp/fd",
    "stars": 37700,
    "monthlyDownloads": 120000,
    "useCases": [
      "File finding",
      "Linux package alias",
      "Search shortcuts"
    ],
    "aliases": [
      "fd-find"
    ],
    "keywords": [
      "fdfind fd"
    ],
    "tags": [
      "builder"
    ],
    "agentFriendly": true,
    "supportsNonInteractive": true,
    "requiresNetwork": false,
    "ciFriendly": true,
    "destructivePotential": "low"
  }
];

const makersBySlug = new Map(makerSeeds.map((maker) => [maker.slug, maker]));

function buildTagline(seed: CliSeed) {
  if (seed.tagline) {
    return seed.tagline;
  }

  const useCases = seed.useCases.slice(0, 3).join(", ").toLowerCase();
  return `${seed.name} helps with ${useCases} from the terminal.`;
}

function buildDescription(seed: CliSeed, maker: Maker) {
  const useCases = seed.useCases.slice(0, 3).join(", ").toLowerCase();
  return `${seed.name} comes from ${maker.name} and is useful for ${useCases}. ${buildTagline(seed)}`;
}

function buildScore(seed: CliSeed, maker: Maker) {
  const starsBoost = Math.min(15, Math.round(seed.stars / 8000));
  const adoptionBoost = Math.min(12, Math.round(seed.monthlyDownloads / 600000));
  const officialBoost = maker.officialPlatformMaker ? 5 : 0;
  const builderBoost = maker.featuredBuilder ? 3 : 0;
  const agentBoost = seed.agentFriendly ? 4 : 0;
  return Math.min(99, 62 + starsBoost + adoptionBoost + officialBoost + builderBoost + agentBoost);
}

function buildTrendingAmount(seed: CliSeed) {
  return Math.max(1, Math.min(15, Math.round(seed.monthlyDownloads / 400000) + (seed.featured ? 2 : 0)));
}

function createCli(seed: CliSeed): CliEntry {
  const maker = makersBySlug.get(seed.maker);

  if (!maker) {
    throw new Error(`Unknown maker: ${seed.maker}`);
  }

  return {
    slug: seed.slug,
    name: seed.name,
    shortName: seed.shortName,
    binaryName: seed.shortName,
    makerSlug: maker.slug,
    makerName: maker.name,
    makerType: maker.type,
    makerUrl: maker.url,
    official: Boolean(maker.officialPlatformMaker),
    featuredBuilder: Boolean(maker.featuredBuilder),
    tagline: buildTagline(seed),
    description: buildDescription(seed, maker),
    category: seed.category,
    installWith: seed.installWith,
    installCommand: seed.installCommand,
    quickStart: seed.quickStart,
    exampleWorkflow: seed.exampleWorkflow ?? [seed.quickStart],
    website: seed.website ?? `https://github.com/${seed.githubRepo}`,
    github: `https://github.com/${seed.githubRepo}`,
    docs: seed.docs ?? seed.website ?? `https://github.com/${seed.githubRepo}`,
    githubRepo: seed.githubRepo,
    packageName: seed.packageName,
    stars: seed.stars,
    monthlyDownloads: seed.monthlyDownloads,
    score: buildScore(seed, maker),
    trending: "+",
    trendingAmount: buildTrendingAmount(seed),
    featured: seed.featured,
    agentFriendly: seed.agentFriendly ?? false,
    supportsJsonOutput: seed.supportsJsonOutput ?? false,
    supportsNonInteractive: seed.supportsNonInteractive ?? true,
    supportsDryRun: seed.supportsDryRun ?? false,
    requiresAuth: seed.requiresAuth ?? false,
    requiresNetwork: seed.requiresNetwork ?? true,
    ciFriendly: seed.ciFriendly ?? false,
    localFirst: seed.localFirst ?? false,
    destructivePotential: seed.destructivePotential ?? "medium",
    aliases: seed.aliases ?? [],
    keywords: seed.keywords ?? [],
    tags: seed.tags ?? [],
    useCases: seed.useCases,
  };
}

export const clis: CliEntry[] = cliSeeds.map(createCli).sort((a, b) => b.score - a.score || b.monthlyDownloads - a.monthlyDownloads);

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

export const makers = makerSeeds
  .map((maker) => ({
    ...maker,
    cliCount: clis.filter((cli) => cli.makerSlug === maker.slug).length,
  }))
  .filter((maker) => maker.cliCount > 0)
  .sort((a, b) => (b.cliCount ?? 0) - (a.cliCount ?? 0) || a.name.localeCompare(b.name));

export const categories = Array.from(new Set(clis.map((cli) => cli.category)));
export const packageManagers = Array.from(new Set(clis.map((cli) => cli.installWith)));
export const featuredClis = clis.filter((cli) => cli.featured);
export const officialClis = clis.filter((cli) => cli.official);
export const builderClis = clis.filter((cli) => !cli.official);
export const featuredMakers = makers.filter((maker) => maker.featuredBuilder || maker.officialPlatformMaker);
export const leaderboardClis = [...clis].sort((a, b) => b.score - a.score);

export function getCliBySlug(slug: string) {
  return clis.find((cli) => cli.slug === slug);
}

export function getMakerBySlug(slug: string) {
  return makers.find((maker) => maker.slug === slug);
}

export function getClisByMaker(slug: string) {
  return clis.filter((cli) => cli.makerSlug === slug).sort((a, b) => b.score - a.score || b.monthlyDownloads - a.monthlyDownloads);
}

export function getRelatedClis(cli: CliEntry, limit = 4) {
  return clis
    .filter((candidate) => candidate.slug !== cli.slug)
    .map((candidate) => {
      let score = 0;

      if (candidate.makerSlug === cli.makerSlug) score += 6;
      if (candidate.category === cli.category) score += 4;
      score += candidate.tags.filter((tag) => cli.tags.includes(tag)).length * 2;
      score += candidate.useCases.filter((useCase) => cli.useCases.includes(useCase)).length;

      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.score - a.candidate.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}

function scoreQueryMatch(cli: CliEntry, query: string) {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return cli.score;
  }

  const terms = trimmed.split(/\s+/).filter(Boolean);
  const exactHaystacks = [
    cli.slug,
    cli.shortName.toLowerCase(),
    cli.name.toLowerCase(),
    cli.binaryName.toLowerCase(),
    cli.makerName.toLowerCase(),
    ...cli.aliases.map((value) => value.toLowerCase()),
  ];
  const broadHaystacks = [
    cli.tagline,
    cli.description,
    cli.category,
    cli.makerName,
    cli.githubRepo,
    ...cli.useCases,
    ...cli.keywords,
    ...cli.tags,
    ...cli.aliases,
  ].map((value) => value.toLowerCase());

  let score = 0;

  if (exactHaystacks.includes(trimmed)) score += 120;
  if (cli.slug.includes(trimmed) || cli.shortName.toLowerCase().includes(trimmed)) score += 60;
  if (cli.name.toLowerCase().includes(trimmed)) score += 40;
  if (cli.makerName.toLowerCase().includes(trimmed)) score += 30;
  if (cli.githubRepo.toLowerCase().includes(trimmed)) score += 24;

  for (const term of terms) {
    if (exactHaystacks.includes(term)) score += 20;
    if (broadHaystacks.some((value) => value.includes(term))) score += 8;
  }

  if (cli.official) score += 4;
  if (cli.agentFriendly) score += 3;

  return score + cli.score / 10;
}

export type CliSearchOptions = {
  mode?: "all" | "official" | "builders" | "agent-friendly";
  category?: CliCategory | "All";
};

export function searchClis(query: string, options: CliSearchOptions = {}) {
  const mode = options.mode ?? "all";
  const category = options.category ?? "All";

  return clis
    .filter((cli) => {
      if (mode === "official" && !cli.official) return false;
      if (mode === "builders" && cli.official) return false;
      if (mode === "agent-friendly" && !cli.agentFriendly) return false;
      if (category !== "All" && cli.category !== category) return false;

      const queryScore = scoreQueryMatch(cli, query);
      return query.trim() ? queryScore > cli.score / 10 : true;
    })
    .map((cli) => ({ cli, searchScore: scoreQueryMatch(cli, query) }))
    .sort((a, b) => b.searchScore - a.searchScore || b.cli.score - a.cli.score)
    .map((item) => item.cli);
}

export function getSearchHighlights(cli: CliEntry, query: string) {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return [cli.official ? "Official tool" : `Maker: ${cli.makerName}`, cli.agentFriendly ? "Good for agent workflows" : cli.category];
  }

  const highlights: string[] = [];
  const terms = trimmed.split(/\s+/).filter(Boolean);
  const aliasMatch = cli.aliases.find((alias) => alias.toLowerCase().includes(trimmed) || terms.some((term) => alias.toLowerCase().includes(term)));
  const useCaseMatch = cli.useCases.find((useCase) => useCase.toLowerCase().includes(trimmed) || terms.some((term) => useCase.toLowerCase().includes(term)));
  const keywordMatch = cli.keywords.find((keyword) => keyword.toLowerCase().includes(trimmed) || terms.some((term) => keyword.toLowerCase().includes(term)));

  if (cli.slug === trimmed || cli.shortName.toLowerCase() === trimmed || cli.name.toLowerCase() === trimmed) {
    highlights.push("Exact name match");
  }

  if (cli.makerName.toLowerCase().includes(trimmed) || terms.some((term) => cli.makerName.toLowerCase().includes(term))) {
    highlights.push(`Maker: ${cli.makerName}`);
  }

  if (aliasMatch) {
    highlights.push(`Alias: ${aliasMatch}`);
  }

  if (cli.githubRepo.toLowerCase().includes(trimmed) || terms.some((term) => cli.githubRepo.toLowerCase().includes(term))) {
    highlights.push(`Repo: ${cli.githubRepo}`);
  }

  if (useCaseMatch) {
    highlights.push(`Use case: ${useCaseMatch}`);
  } else if (keywordMatch) {
    highlights.push(`Task: ${keywordMatch}`);
  } else if (cli.category.toLowerCase().includes(trimmed) || terms.some((term) => cli.category.toLowerCase().includes(term))) {
    highlights.push(`Category: ${cli.category}`);
  }

  if (cli.official && highlights.length < 3) {
    highlights.push("Official tool");
  }

  if (cli.agentFriendly && highlights.length < 3) {
    highlights.push("Good for agent workflows");
  }

  return Array.from(new Set(highlights)).slice(0, 3);
}
