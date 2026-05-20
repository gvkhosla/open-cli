import Link from "next/link";
import {
  siAstral,
  siBun,
  siCloudflare,
  siDeno,
  siDuckdb,
  siFfmpeg,
  siFlydotio,
  siGithub,
  siJira,
  siOllama,
  siPnpm,
  siRailway,
  siStripe,
  siSupabase,
  siVercel,
} from "simple-icons";

type LogoItem = {
  name: string;
  href: string;
  icon?: { path: string; hex: string };
  label?: string;
};

const logoItems: LogoItem[] = [
  { name: "GitHub CLI", href: "/cli/gh", icon: siGithub },
  { name: "Vercel CLI", href: "/cli/vercel", icon: siVercel },
  { name: "uv", href: "/cli/uv", icon: siAstral, label: "uv" },
  { name: "Ollama", href: "/cli/ollama", icon: siOllama },
  { name: "Bun", href: "/cli/bun", icon: siBun },
  { name: "Deno", href: "/cli/deno", icon: siDeno },
  { name: "pnpm", href: "/cli/pnpm", icon: siPnpm },
  { name: "Wrangler", href: "/cli/wrangler", icon: siCloudflare },
  { name: "Railway CLI", href: "/cli/railway", icon: siRailway },
  { name: "flyctl", href: "/cli/flyctl", icon: siFlydotio },
  { name: "Supabase CLI", href: "/cli/supabase", icon: siSupabase },
  { name: "Stripe CLI", href: "/cli/stripe", icon: siStripe },
  { name: "DuckDB", href: "/cli/duckdb", icon: siDuckdb },
  { name: "Pandoc", href: "/cli/pandoc", label: "pd" },
  { name: "ripgrep", href: "/cli/rg", label: "rg" },
  { name: "FFmpeg", href: "/cli/ffmpeg", icon: siFfmpeg },
  { name: "Jira CLI", href: "/cli/jira-cli", icon: siJira },
  { name: "khal", href: "/cli/khal", label: "cal" },
  { name: "Pi", href: "/cli/pi", label: "pi" },
  { name: "Amp", href: "/cli/amp", label: "amp" },
  { name: "Codex", href: "/cli/codex", label: "cx" },
  { name: "Cursor Agent", href: "/cli/cursor-agent", label: "cur" },
  { name: "OpenCode", href: "/cli/opencode", label: "oc" },
];

function LogoBadge({ item }: { item: LogoItem }) {
  return (
    <Link
      href={item.href}
      className="group/logo relative flex h-12 min-w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#1E1E1D] px-3.5 transition-colors duration-200 hover:border-[#217EFF]/70 hover:bg-[#2f2f2f]"
      aria-label={item.name}
      title={item.name}
    >
      <div className="relative flex items-center justify-center text-white/56 transition-colors duration-200 group-hover/logo:text-white/84">
        {item.icon ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
            <path d={item.icon.path} />
          </svg>
        ) : null}
        {item.label ? (
          <span className="absolute -bottom-2.5 -right-3 rounded-full border border-white/10 bg-[#121212] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/50 transition group-hover/logo:border-[#217EFF]/60 group-hover/logo:text-white/70">
            {item.label}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function CliLogoMarquee() {
  const marqueeItems = [...logoItems, ...logoItems];

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#121212] px-3 py-3">
      <div className="pointer-events-none absolute -inset-px rounded-lg bg-linear-to-b from-white/[0.04] to-transparent" />
      <div className="absolute bottom-0 left-0 top-0 z-10 w-12 bg-linear-to-r from-[#121212] to-transparent" />
      <div className="absolute bottom-0 right-0 top-0 z-10 w-12 bg-linear-to-l from-[#121212] to-transparent" />
      <div className="marquee-track relative flex w-max gap-2">
        {marqueeItems.map((item, index) => (
          <LogoBadge key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
