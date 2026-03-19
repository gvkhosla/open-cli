"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CliLogoMarquee } from "@/components/cli-logo-marquee";
import { CopyButton } from "@/components/copy-button";
import { builderClis, getSearchHighlights, officialClis, searchClis, type BuilderLaunch, type CliCategory } from "@/data/clis";
import { formatCompactNumber } from "@/lib/format";

type DirectoryMode = "all" | "official" | "builders" | "agent-friendly";
type CategoryFilter = "All" | CliCategory;
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

const taskShortcuts = [
  "deploy",
  "git",
  "postgres",
  "browser automation",
  "local models",
  "scrape",
];

export function HomeView({}: { builderLaunches?: BuilderLaunch[] }) {
  const [search, setSearch] = useState("");
  const [mode] = useState<DirectoryMode>("all");
  const [category] = useState<CategoryFilter>("All");
  const [activeExample, setActiveExample] = useState<QuickExample>(quickExamples[0]);

  const filteredClis = useMemo(() => {
    const results = searchClis(search, { mode, category });

    if (search.trim()) {
      return results;
    }

    return [...results].sort(
      (a, b) =>
        (b.metricValue ?? -1) - (a.metricValue ?? -1) ||
        (b.githubStars ?? 0) - (a.githubStars ?? 0) ||
        a.name.localeCompare(b.name),
    );
  }, [category, mode, search]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-12">
        <div className="space-y-4">
          <div className="section-kicker">The Open CLI Ecosystem</div>
          <h1 className="max-w-4xl text-5xl font-medium tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl lg:leading-[0.95]">
            Find the right CLI for the job, from official tools to indie builder gems.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-white/56">
            Open CLI is a curated directory of terminal tools. Search by task, company, builder, package, or
            binary name, then copy the install command and run the first useful command right away.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs uppercase tracking-[0.18em] text-white/34">
            <span>{formatCompactNumber(filteredClis.length)} matching now</span>
            <span>{formatCompactNumber(officialClis.length)} official</span>
            <span>{formatCompactNumber(builderClis.length)} from builders</span>
          </div>
        </div>

        <div className="panel-texture rounded-[20px] border border-white/8 p-4">
          <div className="section-kicker">Try it now</div>
          <p className="mt-3 text-sm leading-6 text-white/48">
            Switch between a few different kinds of CLIs to see how quickly you can install something and get
            to the first meaningful command.
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-kicker">Directory</div>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-white">Search CLIs</h2>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/42">
            <Link href="/makers" className="transition hover:text-white">
              Browse makers →
            </Link>
            <Link href="/submit" className="transition hover:text-white">
              Submit a CLI →
            </Link>
          </div>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-white/24">
            ⌕
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search gh, deploy, postgres, browser automation..."
            className="h-12 w-full rounded-none border-x-0 border-t-0 border-b border-white/12 bg-transparent pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-[var(--accent-lilac)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-white/40">
          <span className="mr-1 text-white/28">Try:</span>
          {taskShortcuts.map((shortcut) => (
            <button
              key={shortcut}
              type="button"
              onClick={() => setSearch(shortcut)}
              className="rounded-full border border-white/8 px-3 py-1.5 font-mono text-xs text-white/46 transition hover:border-white/16 hover:text-white"
            >
              {shortcut}
            </button>
          ))}
        </div>

        <div className="text-xs text-white/28">Ranked by exact install or adoption metric when available.</div>

        <div className="overflow-hidden border-y border-white/8">
          <div className="hidden grid-cols-[64px_minmax(0,1.2fr)_220px_140px] gap-4 border-b border-white/8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/38 md:grid">
            <div>#</div>
            <div>CLI</div>
            <div>Maker</div>
            <div className="text-right">Primary metric</div>
          </div>

          {filteredClis.length === 0 ? (
            <div className="py-8 text-sm text-white/42">
              No CLIs matched your search yet. Try a tool name, a builder, or a job like scrape, deploy, git,
              browser automation, or local models.
            </div>
          ) : null}

          {filteredClis.map((cli, index) => (
            <Link
              key={cli.slug}
              href={`/cli/${cli.slug}`}
              className="grid gap-2 border-b border-white/6 py-4 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[64px_minmax(0,1.2fr)_220px_140px] md:items-center md:gap-4"
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
                <p className="mt-1 text-sm text-white/44">{cli.bestFor}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {getSearchHighlights(cli, search).map((highlight) => (
                    <span key={highlight} className="rounded-full border border-white/8 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/34">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-white/58">{cli.makerName}</div>
                <div className="mt-1 font-mono text-xs text-white/32">{cli.githubRepo}</div>
              </div>
              <div className="text-sm md:text-right">
                {cli.metricValue !== null && cli.metricLabel ? (
                  <div>
                    <div className="text-base font-medium text-[var(--accent-peach)]">
                      {formatCompactNumber(cli.metricValue)}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#d8ab86]">
                      {cli.metricLabel}
                    </div>
                  </div>
                ) : (
                  <div className="font-mono text-xs text-white/28">No exact install metric yet</div>
                )}
                {cli.githubStars !== null ? (
                  <div className="mt-2 text-xs text-white/30">{formatCompactNumber(cli.githubStars)} GitHub stars</div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-sm text-white/36">
          Open any CLI to see install, fit, quick start, verified data, and alternatives.
        </div>
      </section>
    </div>
  );
}
