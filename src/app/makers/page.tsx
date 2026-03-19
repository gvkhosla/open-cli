import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { featuredMakers, getClisByMaker, makers } from "@/data/clis";
import { formatCompactNumber, formatMetric } from "@/lib/format";

export const metadata: Metadata = {
  title: "Makers • Open CLI",
  description: "Browse the people, teams, and companies behind the CLIs in the Open CLI directory.",
};

export default function MakersPage() {
  const featuredGroups = featuredMakers
    .map((maker) => ({ maker, clis: getClisByMaker(maker.slug).slice(0, 3) }))
    .filter((group) => group.clis.length > 0)
    .slice(0, 18);

  const allGroups = makers
    .map((maker) => ({ maker, clis: getClisByMaker(maker.slug).slice(0, 3) }))
    .filter((group) => group.clis.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Makers</div>
            <h1 className="max-w-4xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
              Browse CLIs by maker.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-white/54">
              Companies, small teams, and independent builders all ship great terminal tools. This page keeps them easy to find.
            </p>
          </div>

          <div className="panel-texture rounded-[20px] border border-white/8 p-4">
            <div className="section-kicker">At a glance</div>
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <div>
                Makers in directory: <span className="text-white">{makers.length}</span>
              </div>
              <div>
                Featured makers: <span className="text-white">{featuredGroups.length}</span>
              </div>
              <div>
                Community path: <Link href="/submit" className="text-white underline underline-offset-4">submit a CLI</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="section-kicker">Featured makers</div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredGroups.map(({ maker, clis }) => (
              <Link
                key={maker.slug}
                href={`/makers/${maker.slug}`}
                className="rounded-[18px] border border-white/8 bg-[#0b0c0e]/55 p-4 transition hover:border-white/14 hover:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-medium text-white">{maker.name}</div>
                    <div className="mt-1 text-xs text-white/36">{maker.type}</div>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">
                    {maker.cliCount} tools
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-white/50">
                  {clis.map((cli) => (
                    <div key={cli.slug} className="flex items-center justify-between gap-3">
                      <span>{cli.shortName}</span>
                      <span className="font-mono text-xs text-white/30">
                        {formatMetric(cli.metricValue, cli.metricLabel) ?? (cli.githubStars !== null ? `${formatCompactNumber(cli.githubStars)}★` : "—")}
                      </span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="section-kicker">All makers</div>
          <div className="overflow-hidden border-y border-white/8">
            {allGroups.map(({ maker, clis }) => (
              <Link
                key={maker.slug}
                href={`/makers/${maker.slug}`}
                className="grid gap-2 border-b border-white/6 py-4 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[220px_minmax(0,1fr)_140px] md:items-center md:gap-4"
              >
                <div>
                  <div className="text-base font-medium text-white">{maker.name}</div>
                  <div className="mt-1 text-sm text-white/38">{maker.type}</div>
                </div>
                <div className="text-sm text-white/48">
                  {clis.map((cli) => cli.shortName).join(" · ")}
                </div>
                <div className="font-mono text-sm text-white/34 md:text-right">{maker.cliCount} tools</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
