"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/site-header";
import { categories, getSearchHighlights, searchClis, type CliCategory } from "@/data/clis";
import { formatCompactNumber, formatMetric } from "@/lib/format";

type DirectoryMode = "all" | "official" | "builders" | "agent-friendly";
type CategoryFilter = "All" | CliCategory;

const modeOptions: Array<{ value: DirectoryMode; label: string }> = [
  { value: "all", label: "All" },
  { value: "official", label: "Official" },
  { value: "builders", label: "Builders" },
  { value: "agent-friendly", label: "Agent-friendly" },
];

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<DirectoryMode>("all");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const filteredClis = useMemo(() => searchClis(search, { mode, category }), [category, mode, search]);
  const categoryOptions = useMemo(() => ["All", ...categories] as CategoryFilter[], []);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section>
          <div className="section-kicker">CLI Leaderboard</div>
          <h1 className="mt-3 max-w-4xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
            A broader directory of official tools, indie builders, and terminal-native power-user CLIs.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/54">
            Search by task, maker, binary, category, or package. The point is not just popularity — it is to
            help you find something good enough to install and use immediately.
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
              placeholder="Search builder names, CLI binaries, deploy, postgres, browser automation..."
              className="h-12 w-full rounded-none border-x-0 border-t-0 border-b border-white/12 bg-transparent pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
            />
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs text-white/48">
            {modeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setMode(option.value)}
                className={`rounded-full border px-3 py-1.5 transition ${
                  mode === option.value
                    ? "border-[var(--accent-lilac)] text-white"
                    : "border-white/8 hover:border-white/16 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs text-white/42">
            {categoryOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`rounded-full border px-3 py-1.5 transition ${
                  category === option
                    ? "border-[var(--accent-peach)] text-white"
                    : "border-white/8 hover:border-white/16 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="overflow-hidden border-y border-white/8">
            <div className="hidden grid-cols-[64px_minmax(0,1.3fr)_160px_220px] gap-4 border-b border-white/8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/38 md:grid">
              <div>#</div>
              <div>CLI</div>
              <div>Maker</div>
              <div className="text-right">Verified data</div>
            </div>

            {filteredClis.length === 0 ? (
              <div className="py-8 text-sm text-white/42">
                No CLIs matched your search. Try a maker like GitHub or Peter Steinberger, or a job like deploy,
                scrape, local models, shell utilities, or database.
              </div>
            ) : null}

            {filteredClis.map((cli, index) => (
              <Link
                key={cli.slug}
                href={`/cli/${cli.slug}`}
                className="grid gap-2 border-b border-white/6 py-4 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[64px_minmax(0,1.3fr)_160px_220px] md:items-center md:gap-4"
              >
                <div className="font-mono text-sm text-white/34">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-medium text-white">{cli.shortName}</span>
                    <span className="font-mono text-xs text-white/32">{cli.name}</span>
                    {cli.official ? (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/46">
                        Official
                      </span>
                    ) : null}
                    {cli.agentFriendly ? (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/46">
                        Agent
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-white/44">{cli.tagline}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getSearchHighlights(cli, search).map((highlight) => (
                      <span key={highlight} className="rounded-full border border-white/8 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/34">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-white/52">{cli.makerName}</div>
                <div className="text-sm text-white/52 md:text-right">
                  {cli.githubStars !== null ? <div>{formatCompactNumber(cli.githubStars)} GitHub stars</div> : null}
                  {formatMetric(cli.metricValue, cli.metricLabel) ? (
                    <div className="mt-1 font-mono text-xs text-white/34">{formatMetric(cli.metricValue, cli.metricLabel)}</div>
                  ) : (
                    <div className="mt-1 font-mono text-xs text-white/28">No exact install metric yet</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
