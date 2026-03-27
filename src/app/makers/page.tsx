import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getClisByMaker, makers } from "@/data/clis";
import { formatCompactNumber, formatMetric } from "@/lib/format";

export const metadata: Metadata = {
  title: "Makers • Open CLI",
  description: "Browse the teams and individuals behind the CLIs in the Open CLI directory.",
};

export default function MakersPage() {
  const groups = makers
    .map((maker) => ({ maker, clis: getClisByMaker(maker.slug).slice(0, 5) }))
    .filter((group) => group.clis.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 font-mono text-sm text-white/46">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <Chevron />
          <span className="text-white/64">makers</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Makers</div>
            <h1 className="ui-title-lg max-w-[12ch]">The teams behind the tools.</h1>
            <p className="ui-body max-w-3xl">
              Browse the people, companies, and small teams behind the tools in Open CLI. Use maker pages when you want to stay inside one ecosystem instead of comparing unrelated tools.
            </p>
          </div>

          <aside className="space-y-4 lg:pt-8">
            <SidebarMetric label="Makers indexed" value={String(groups.length)} />
            <SidebarMetric
              label="Official platforms"
              value={String(groups.filter(({ maker }) => maker.officialPlatformMaker).length)}
            />
            <SidebarMetric
              label="Featured builders"
              value={String(groups.filter(({ maker }) => maker.featuredBuilder).length)}
            />
          </aside>
        </section>

        <section className="space-y-6">
          {groups.map(({ maker, clis }) => (
            <Link
              key={maker.slug}
              href={`/makers/${maker.slug}`}
              className="group block border-b border-white/8 pb-6 transition hover:border-white/14"
            >
              <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)_160px] lg:items-start">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-medium tracking-[-0.03em] text-white">{maker.name}</h2>
                    {maker.officialPlatformMaker ? <InlineTag>official</InlineTag> : null}
                    {maker.featuredBuilder ? <InlineTag>featured</InlineTag> : null}
                  </div>
                  <p className="text-sm text-white/46">{maker.type} · {maker.cliCount} tools</p>
                </div>

                <div className="space-y-3">
                  <div className="ui-label">Top tools</div>
                  <div className="space-y-2.5">
                    {clis.map((cli) => (
                      <div key={cli.slug} className="flex items-center justify-between gap-3 text-sm">
                        <div className="min-w-0">
                          <span className="text-white/84">{cli.shortName}</span>
                          <span className="ml-2 text-white/42">{cli.tagline}</span>
                        </div>
                        <span className="flex-shrink-0 font-mono text-xs text-white/48">
                          {formatMetric(cli.metricValue, cli.metricLabel) ?? (cli.githubStars !== null ? `${formatCompactNumber(cli.githubStars)} ★` : "—")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-white/42 lg:justify-end lg:gap-3">
                  <span>View maker</span>
                  <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:text-white/76" />
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

function SidebarMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="ui-label">{label}</div>
      <div className="font-mono text-sm text-white/78">{value}</div>
    </div>
  );
}

function InlineTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/48">
      {children}
    </span>
  );
}

function Chevron() {
  return <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>;
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 7h12M8 2l5 5-5 5" />
    </svg>
  );
}
