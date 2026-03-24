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
    .map((maker) => ({ maker, clis: getClisByMaker(maker.slug).slice(0, 4) }))
    .filter((group) => group.clis.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-white/34">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <Chevron />
          <span className="text-white/52">makers</span>
        </nav>

        <section className="max-w-3xl space-y-3">
          <div className="section-kicker">Makers</div>
          <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            The teams behind the tools.
          </h1>
          <p className="text-[15px] leading-7 text-white/48 sm:text-base">
            Browse the people, companies, and small teams behind the tools in the directory. Maker pages are useful when you want to stay inside one ecosystem instead of bouncing across unrelated CLIs.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {groups.map(({ maker, clis }) => (
            <Link
              key={maker.slug}
              href={`/makers/${maker.slug}`}
              className="group rounded-[20px] border border-white/8 bg-[#0b0d10] p-5 transition hover:border-white/14 hover:bg-white/[0.03]"
            >
              <div className="flex h-full flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-medium text-white">{maker.name}</span>
                        {maker.officialPlatformMaker ? <Pill tone="good" label="Official" /> : null}
                        {maker.featuredBuilder ? <Pill tone="default" label="Featured" /> : null}
                      </div>
                      <p className="text-sm text-white/34">
                        {maker.type} · {maker.cliCount} tool{(maker.cliCount ?? 0) !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <svg className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-white/18 transition group-hover:translate-x-0.5 group-hover:text-white/36" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 7h12M8 2l5 5-5 5" />
                    </svg>
                  </div>

                  <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3.5 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/26">Top tools</div>
                    <div className="mt-3 space-y-2.5">
                      {clis.map((cli) => (
                        <div key={cli.slug} className="flex items-center justify-between gap-3 text-sm">
                          <span className="truncate text-white/62">{cli.shortName}</span>
                          <span className="flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-white/28">
                            {formatMetric(cli.metricValue, cli.metricLabel) ?? (cli.githubStars !== null ? `${formatCompactNumber(cli.githubStars)} ★` : "—")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/8 pt-3 text-sm text-white/40">
                  <span>View maker</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/24">/{maker.slug}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

function Chevron() {
  return <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>;
}

function Pill({ label, tone = "default" }: { label: string; tone?: "default" | "good" }) {
  const tones = {
    default: "border-white/10 bg-white/[0.03] text-white/44",
    good: "border-white/10 bg-white/[0.03] text-white/44",
  } as const;

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${tones[tone]}`}>
      {label}
    </span>
  );
}
