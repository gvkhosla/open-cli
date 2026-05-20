import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-6xl px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="border-t border-white/8 pt-8">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto_auto]">
          {/* Brand */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                <svg width="16" height="16" viewBox="0 0 28 28" fill="none" className="text-white/70">
                  <path d="M7 6.5L13 14L7 21.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 20H21" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-sm font-medium tracking-[-0.02em] text-white/82">Open CLI</span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/52">
              Choose the right CLI for the job.<br />
              From the team at{" "}
              <a
                href={siteConfig.links.khoslaLab}
                target="_blank"
                rel="noreferrer"
                className="text-white/72 transition hover:text-white"
              >
                Khosla Lab
              </a>
              .
            </p>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Resources</div>
            <nav className="flex flex-col gap-2 text-sm text-white/56">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white/70">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-5 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Open CLI</span>
          <span className="font-mono">
            Press <kbd className="kbd">/</kbd> to search anywhere
          </span>
        </div>
      </div>
    </footer>
  );
}
