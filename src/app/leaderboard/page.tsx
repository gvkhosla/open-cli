import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { leaderboardClis } from "@/data/clis";
import { formatCompactNumber } from "@/lib/format";

export default function LeaderboardPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="rounded-[30px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="section-kicker">Leaderboard</div>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-6xl">
            A clean scoreboard for the CLIs shaping modern developer workflows.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/56 sm:text-lg">
            Use this page to compare traction, popularity, and momentum. The current version is seeded with
            editorial sample data so you can refine the product and scoring model before wiring real APIs.
          </p>
        </section>

        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
          <div className="hidden grid-cols-[72px_1.4fr_0.9fr_0.9fr_110px_120px] gap-4 border-b border-white/8 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 md:grid">
            <div>#</div>
            <div>CLI</div>
            <div>GitHub stars</div>
            <div>Monthly downloads</div>
            <div>Trend</div>
            <div className="text-right">Score</div>
          </div>

          {leaderboardClis.map((cli, index) => (
            <Link
              key={cli.slug}
              href={`/cli/${cli.slug}`}
              className="grid gap-2 border-b border-white/6 px-6 py-5 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[72px_1.4fr_0.9fr_0.9fr_110px_120px] md:items-center md:gap-4"
            >
              <div className="font-mono text-sm text-white/38">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-medium text-white">{cli.name}</h2>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/42">
                    {cli.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/44">{cli.tagline}</p>
              </div>
              <div className="text-sm text-white/56">{formatCompactNumber(cli.stars)}</div>
              <div className="text-sm text-white/56">{formatCompactNumber(cli.monthlyDownloads)}</div>
              <div className="text-sm text-[var(--accent-peach)]">+{cli.trendingAmount}%</div>
              <div className="text-left text-lg font-medium text-white md:text-right">{cli.score}</div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
