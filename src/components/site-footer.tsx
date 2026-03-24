import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-8 w-full max-w-6xl px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="border-t border-white/8 pt-8">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto_auto]">
          {/* Brand */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-2 w-2 rounded-full bg-white/82" />
              <span className="text-sm font-medium tracking-[-0.02em] text-white/72">Open CLI</span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/30">
              Find the right CLI faster. From the team at{" "}
              <a
                href={siteConfig.links.khoslaLab}
                target="_blank"
                rel="noreferrer"
                className="text-white/46 transition hover:text-white"
              >
                Khosla Lab
              </a>
              .
            </p>
          </div>

          {/* Nav */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/28">Directory</div>
            <nav className="flex flex-col gap-2 text-sm text-white/36">
              <Link href="/" className="transition hover:text-white/70">Browse CLIs</Link>
              <Link href="/makers" className="transition hover:text-white/70">Makers</Link>
              <Link href="/submit" className="transition hover:text-white/70">Submit a tool</Link>
            </nav>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/28">Resources</div>
            <nav className="flex flex-col gap-2 text-sm text-white/36">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="transition hover:text-white/70">
                GitHub
              </a>
              <a href={siteConfig.links.khoslaLab} target="_blank" rel="noreferrer" className="transition hover:text-white/70">
                Khosla Lab
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/6 pt-5 text-xs text-white/22 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Open CLI</span>
          <span className="font-mono">
            Press <kbd className="kbd">/</kbd> to search anywhere
          </span>
        </div>
      </div>
    </footer>
  );
}
