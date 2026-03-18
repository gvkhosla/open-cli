"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CliLogoMarquee } from "@/components/cli-logo-marquee";
import { CopyButton } from "@/components/copy-button";
import { builderLaunches, leaderboardClis } from "@/data/clis";
import { formatCompactNumber } from "@/lib/format";

type Mode = "all" | "trending";
type QuickExample = {
  id: string;
  label: string;
  install: string;
  run: string;
};

const quickExamples: QuickExample[] = [
  {
    id: "gh",
    label: "gh",
    install: "brew install gh",
    run: "gh auth login",
  },
  {
    id: "vercel",
    label: "vercel",
    install: "npm i -g vercel",
    run: "vercel login",
  },
  {
    id: "uv",
    label: "uv",
    install: "brew install uv",
    run: "uv init demo && uv run main.py",
  },
];

export function HomeView() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("all");
  const [activeExample, setActiveExample] = useState<QuickExample>(quickExamples[0]);

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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-12">
        <div className="space-y-4">
          <div className="section-kicker">The Open CLI Ecosystem</div>
          <h1 className="max-w-4xl text-5xl font-medium tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl lg:leading-[0.95]">
            Find terminal apps you can install in seconds and use right away.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/56">
            A CLI is just an app you use in Terminal. Type one command to install it. Type another to run
            it. That is often faster than clicking through a website or dashboard.
          </p>
        </div>

        <div className="panel-texture rounded-[20px] border border-white/8 p-4">
          <div className="section-kicker">Try it now</div>
          <p className="mt-3 text-sm leading-6 text-white/48">
            These are example CLIs, not a recommendation for one stack. Switch between GitHub, Vercel, and
            uv to see how different tools are installed and started.
          </p>

          <div className="mt-4 flex gap-2 font-mono text-xs text-white/46">
            {quickExamples.map((example) => (
              <button
                key={example.id}
                type="button"
                onClick={() => setActiveExample(example)}
                className={`rounded-full border px-2.5 py-1 transition ${
                  activeExample.id === example.id
                    ? "border-[var(--accent-lilac)] text-white"
                    : "border-white/8 hover:border-white/16 hover:text-white/82"
                }`}
              >
                {example.label}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-[14px] border border-white/10 bg-[#0b0c0e]/90">
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <code className="overflow-x-auto font-mono text-sm text-white/84">
                <span className="text-white/28">$</span> {activeExample.install}
              </code>
              <CopyButton compact value={activeExample.install} />
            </div>
            <div className="h-px bg-white/8" />
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <code className="overflow-x-auto font-mono text-sm text-white/68">
                <span className="text-white/28">$</span> {activeExample.run}
              </code>
              <CopyButton compact value={activeExample.run} label="Copy run" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="section-kicker">Available in the directory</div>
        <CliLogoMarquee />
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Latest from builders</div>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-white">Latest tools from builders we follow.</h2>
          </div>
          <span className="hidden text-sm text-white/34 sm:inline">Fresh launches from people like Peter Steinberger and other respected builders.</span>
        </div>

        <div className="overflow-hidden border-y border-white/8">
          {builderLaunches.map((launch) => (
            <div
              key={launch.name}
              className="grid gap-2 border-b border-white/6 py-4 last:border-b-0 md:grid-cols-[140px_minmax(0,1fr)_220px] md:items-center md:gap-4"
            >
              <div>
                <a
                  href={launch.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-medium text-white transition hover:text-[var(--accent-lilac)]"
                >
                  {launch.name}
                </a>
                <div className="mt-1 font-mono text-xs text-white/34">{launch.released}</div>
              </div>
              <div>
                <p className="text-sm text-white/50">{launch.tagline}</p>
              </div>
              <div className="flex flex-col items-start gap-1 text-sm md:items-end">
                <a
                  href={launch.creatorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 transition hover:text-[var(--accent-lilac)]"
                >
                  {launch.creator}
                </a>
                <code className="font-mono text-xs text-white/34">{launch.installCommand}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-kicker">CLI Leaderboard</div>

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
          <div className="hidden grid-cols-[64px_minmax(0,1fr)_140px_120px] gap-4 border-b border-white/8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/38 md:grid">
            <div>#</div>
            <div>CLI</div>
            <div>Downloads</div>
            <div className="text-right">Score</div>
          </div>

          {filteredClis.length === 0 ? (
            <div className="py-8 text-sm text-white/42">
              No CLIs matched your search. Try a tool name like gh or vercel, or search for something like deploy or AI.
            </div>
          ) : null}

          {filteredClis.map((cli, index) => (
            <Link
              key={cli.slug}
              href={`/cli/${cli.slug}`}
              className="grid gap-2 border-b border-white/6 py-4 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[64px_minmax(0,1fr)_140px_120px] md:items-center md:gap-4"
            >
              <div className="font-mono text-sm text-white/34">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-white">{cli.shortName}</span>
                  <span className="font-mono text-xs text-white/32">{cli.name}</span>
                </div>
                <p className="mt-1 text-sm text-white/44">{cli.tagline}</p>
              </div>
              <div className="text-sm text-white/52">{formatCompactNumber(cli.monthlyDownloads)}</div>
              <div className="flex items-center justify-between md:justify-end md:gap-4">
                <span className="text-sm text-[var(--accent-peach)]">+{cli.trendingAmount}%</span>
                <span className="text-base font-medium text-white">{cli.score}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-sm text-white/36">
          Open any CLI to see how to install it, what to run first, and a few simple example commands.
        </div>
      </section>
    </div>
  );
}
