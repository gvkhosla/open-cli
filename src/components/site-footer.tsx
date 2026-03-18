export function SiteFooter() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-6xl px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-t border-white/8 pt-5 text-sm text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-[var(--accent-lilac)] via-[var(--accent-peach)] to-[var(--accent-rose)]" />
          <span>Open CLI</span>
        </div>
        <p>
          From the team at{" "}
          <a
            href="https://khoslalab.com"
            target="_blank"
            rel="noreferrer"
            className="text-white/58 transition hover:text-white"
          >
            Khosla Lab
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
