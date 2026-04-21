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
      className="group/logo relative flex h-12 min-w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-3.5 transition-colors duration-200 hover:border-white/14 hover:bg-white/[0.07]"
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
          <span className="absolute -bottom-2.5 -right-3 rounded-full border border-white/10 bg-[#151d26] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/50 transition group-hover/logo:border-white/14 group-hover/logo:text-white/70">
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
    <div className="ui-panel relative overflow-hidden rounded-[18px] px-3 py-3">
      <div className="absolute -inset-px rounded-[19px] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-[#111821] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-[#111821] to-transparent" />
      <div className="marquee-track relative flex w-max gap-2">
        {marqueeItems.map((item, index) => (
          <LogoBadge key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
