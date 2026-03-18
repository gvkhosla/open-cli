import Link from "next/link";

const navItems = [
  { href: "/", label: "Directory" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "#featured", label: "Featured" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[rgba(5,5,5,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3 text-sm text-white/88">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-[var(--accent-lilac)] blur-[6px]" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[var(--accent-lilac)] via-[var(--accent-peach)] to-[var(--accent-rose)]" />
          </span>
          <span className="font-mono uppercase tracking-[0.24em] text-[12px] text-white/92">
            Open CLI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/52 transition hover:text-white/92"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
