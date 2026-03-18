"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { leaderboardClis } from "@/data/clis";
import { formatCompactNumber } from "@/lib/format";

type Mode = "all" | "trending";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("all");

  const filteredClis = useMemo(() => {
    const base = [...leaderboardClis].sort((a, b) => {
      if (mode === "trending") {
        return b.trendingAmount - a.trendingAmount;
      }

      return b.score - a.score;
    });

    return base.filter((cli) => {
      const haystack = [cli.name, cli.shortName, cli.tagline, cli.category, ...cli.useCases]
        .join(" ")
        .toLowerCase();

      return haystack.includes(search.toLowerCase());
    });
  }, [mode, search]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section>
          <div className="section-kicker">CLI Leaderboard</div>
          <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
            A simple scoreboard for tools you can run in Terminal.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/54">
            Search by name or job to be done, compare momentum, and open any CLI to see how to install and
            use it.
          </p>
        </section>

        <section className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-white/24">
              ⌕
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, company, or what you want to do..."
              className="h-12 w-full rounded-none border-x-0 border-t-0 border-b border-white/12 bg-transparent pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
            />
          </div>

          <div className="flex gap-4 font-mono text-sm text-white/48">
            <button
              type="button"
              onClick={() => setMode("all")}
              className={`border-b pb-1 transition ${
                mode === "all" ? "border-white text-white" : "border-transparent hover:text-white"
              }`}
            >
              All Time
            </button>
            <button
              type="button"
              onClick={() => setMode("trending")}
              className={`border-b pb-1 transition ${
                mode === "trending" ? "border-[var(--accent-peach)] text-white" : "border-transparent hover:text-white"
              }`}
            >
              Trending
            </button>
          </div>

          <div className="overflow-hidden border-y border-white/8">
            <div className="hidden grid-cols-[64px_minmax(0,1.2fr)_120px_140px_120px] gap-4 border-b border-white/8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/38 md:grid">
              <div>#</div>
              <div>CLI</div>
              <div>Stars</div>
              <div>Downloads</div>
              <div className="text-right">Score</div>
            </div>

            {filteredClis.map((cli, index) => (
              <Link
                key={cli.slug}
                href={`/cli/${cli.slug}`}
                className="grid gap-2 border-b border-white/6 py-4 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[64px_minmax(0,1.2fr)_120px_140px_120px] md:items-center md:gap-4"
              >
                <div className="font-mono text-sm text-white/34">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-white">{cli.shortName}</span>
                    <span className="font-mono text-xs text-white/32">{cli.name}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/44">{cli.tagline}</p>
                </div>
                <div className="text-sm text-white/52">{formatCompactNumber(cli.stars)}</div>
                <div className="text-sm text-white/52">{formatCompactNumber(cli.monthlyDownloads)}</div>
                <div className="flex items-center justify-between md:justify-end md:gap-4">
                  <span className="text-sm text-[var(--accent-peach)]">+{cli.trendingAmount}%</span>
                  <span className="text-base font-medium text-white">{cli.score}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
