import Link from "next/link";
import {
  siAstral,
  siBun,
  siCloudflare,
  siDeno,
  siFlydotio,
  siGithub,
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
];

function LogoBadge({ item }: { item: LogoItem }) {
  return (
    <Link
      href={item.href}
      className="group/logo flex h-14 min-w-14 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] px-4 transition hover:border-[rgba(183,182,233,0.28)] hover:bg-white/[0.04]"
      aria-label={item.name}
      title={item.name}
    >
      <div className="relative flex items-center justify-center text-white/68 transition group-hover/logo:text-white">
        {item.icon ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
            <path d={item.icon.path} />
          </svg>
        ) : null}
        {item.label ? (
          <span className="absolute -bottom-2.5 -right-3 rounded-full border border-white/8 bg-[#0b0c0e] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/48 transition group-hover/logo:text-[var(--accent-peach)]">
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
    <div className="relative overflow-hidden rounded-[18px] border border-white/8 bg-[#0b0c0e] px-3 py-3">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-[#08090b] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-[#08090b] to-transparent" />
      <div className="marquee-track relative flex w-max gap-2">
        {marqueeItems.map((item, index) => (
          <LogoBadge key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
