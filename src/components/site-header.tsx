import Link from "next/link";

const navItems = [
  { href: "/", label: "Directory" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[rgba(8,9,11,0.9)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3 text-sm text-white/88">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-[var(--accent-lilac)] opacity-50 blur-[6px]" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--accent-peach)]" />
          </span>
          <span className="font-mono uppercase tracking-[0.24em] text-[12px] text-white/92">Open CLI</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/48 transition hover:text-white/88">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
