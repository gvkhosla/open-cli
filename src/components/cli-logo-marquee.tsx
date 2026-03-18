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
      className="group/logo flex h-16 min-w-[94px] shrink-0 items-center justify-center rounded-[22px] border border-white/8 bg-white/[0.02] px-5 transition duration-300 hover:border-white/16 hover:bg-white/[0.05]"
      aria-label={item.name}
      title={item.name}
    >
      <div className="relative flex items-center justify-center text-white/72 transition group-hover/logo:text-white">
        {item.icon ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
            <path d={item.icon.path} />
          </svg>
        ) : null}
        {item.label ? (
          <span className="absolute -right-4 -bottom-3 rounded-full border border-white/8 bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/56 backdrop-blur-sm transition group-hover/logo:text-[var(--accent-peach)]">
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
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] px-4 py-5 sm:px-5 sm:py-6">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-6 left-8 w-28 rounded-full bg-[rgba(183,182,233,0.18)] blur-3xl" />
      <div className="pointer-events-none absolute inset-y-6 right-8 w-28 rounded-full bg-[rgba(238,176,140,0.14)] blur-3xl" />

      <div className="marquee-track relative flex w-max gap-3">
        {marqueeItems.map((item, index) => (
          <LogoBadge key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
