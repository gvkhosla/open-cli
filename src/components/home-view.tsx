"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CliLogoMarquee } from "@/components/cli-logo-marquee";
import { CopyButton } from "@/components/copy-button";
import { categories, clis, featuredClis, leaderboardClis, packageManagers } from "@/data/clis";
import { formatCompactNumber, titleCase } from "@/lib/format";

const statItems = [
  { label: "Curated CLIs", value: `${clis.length}` },
  { label: "Categories", value: `${categories.length}` },
  { label: "Install formats", value: `${packageManagers.length}` },
];

const heroCommandExamples = {
  brew: {
    install: "brew install uv",
    run: "uv init demo && uv run main.py",
    label: "brew",
  },
  npm: {
    install: "npm i -g vercel",
    run: "vercel login && vercel",
    label: "npm",
  },
  cargo: {
    install: "cargo install ripgrep",
    run: "rg \"TODO\" src",
    label: "cargo",
  },
  curl: {
    install: "curl -fsSL https://bun.sh/install | bash",
    run: "bun create next-app open-cli",
    label: "curl",
  },
} as const;

type HeroManager = keyof typeof heroCommandExamples;

export function HomeView() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeManager, setActiveManager] = useState<string>("All");
  const [heroManager, setHeroManager] = useState<HeroManager>("brew");

  const heroExample = heroCommandExamples[heroManager];

  const filteredClis = useMemo(() => {
    return clis.filter((cli) => {
      const matchesSearch =
        search.length === 0 ||
        [cli.name, cli.shortName, cli.tagline, cli.category, ...cli.useCases]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory = activeCategory === "All" || cli.category === activeCategory;
      const matchesManager = activeManager === "All" || cli.installWith === activeManager;

      return matchesSearch && matchesCategory && matchesManager;
    });
  }, [activeCategory, activeManager, search]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-16 pt-6 sm:gap-16 sm:px-6 lg:px-8 lg:pt-8">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="space-y-7">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/64">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-peach)]" />
              Discover the best command line tools
            </div>
            <div className="space-y-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-white/42 sm:text-xs">
                THE OPEN CLI ECOSYSTEM
              </div>
              <h1 className="max-w-3xl text-4xl font-medium tracking-[-0.06em] text-white sm:text-6xl lg:text-[76px] lg:leading-[0.96]">
                Browse polished CLIs with a simple way to install and use them.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
                Open CLI is a curated directory of developer command-line tools. Discover what to use,
                compare traction, copy the install command, and get the first workflow right away.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {statItems.map((stat) => (
              <div key={stat.label} className="min-w-[132px] rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
                <div className="text-2xl font-medium tracking-tight text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.85)] sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-[rgba(183,182,233,0.12)] blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-[rgba(238,176,140,0.1)] blur-3xl" />
          <div className="relative flex h-full flex-col gap-5">
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-white/52">Quick install</div>
              <p className="max-w-md text-sm leading-6 text-white/54">
                A CLI is a command-line interface: a tool you install once and use from your terminal to
                run fast, repeatable workflows.
              </p>
            </div>

            <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black/30">
              <div className="flex items-center gap-1 border-b border-white/8 px-3 py-2.5">
                {(Object.keys(heroCommandExamples) as HeroManager[]).map((manager) => (
                  <button
                    key={manager}
                    type="button"
                    onClick={() => setHeroManager(manager)}
                    className={`rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                      heroManager === manager
                        ? "bg-white text-black"
                        : "text-white/46 hover:bg-white/[0.04] hover:text-white/82"
                    }`}
                  >
                    {heroCommandExamples[manager].label}
                  </button>
                ))}
                <div className="ml-auto text-[10px] font-mono uppercase tracking-[0.18em] text-white/30">CLI</div>
              </div>

              <div className="space-y-0">
                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <code className="overflow-x-auto font-mono text-sm text-white/86 sm:text-[15px]">
                    <span className="text-white/30">$</span> {heroExample.install}
                  </code>
                  <CopyButton compact value={heroExample.install} />
                </div>
                <div className="h-px w-full bg-white/8" />
                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <code className="overflow-x-auto font-mono text-sm text-white/72 sm:text-[15px]">
                    <span className="text-white/30">$</span> {heroExample.run}
                  </code>
                  <CopyButton compact value={heroExample.run} label="Copy run" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-white/52">
                Available install formats
              </div>
              <div className="flex flex-wrap gap-2">
                {["brew", "npm", "cargo", "pipx", "curl", "go install"].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/62"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-8">
        <div className="space-y-4">
          <div className="section-kicker">What is a CLI?</div>
          <h2 className="max-w-xl text-2xl font-medium tracking-tight text-white sm:text-3xl">
            CLIs are command-line tools you run in your terminal to move faster through real workflows.
          </h2>
          <p className="max-w-lg text-base leading-7 text-white/54">
            Install one with a single command, then use it to ship code, manage cloud infrastructure,
            query data, or automate repetitive work without leaving the keyboard.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-white/52">
            Some of the CLIs you&apos;ll find here
          </div>
          <CliLogoMarquee />
        </div>
      </section>

      <section id="featured" className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Featured CLIs</div>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
              A cleaner first-stop list for the tools developers reach for most.
            </h2>
          </div>
          <Link href="/leaderboard" className="hidden text-sm text-white/52 transition hover:text-white sm:inline-flex">
            View full leaderboard →
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {featuredClis.map((cli) => (
            <Link
              key={cli.slug}
              href={`/cli/${cli.slug}`}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.04]"
            >
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.22em] text-white/42">{cli.category}</div>
                  <h3 className="mt-3 text-xl font-medium tracking-tight text-white">{cli.name}</h3>
                </div>
                <div className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/58">
                  {cli.shortName}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/58">{cli.tagline}</p>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/25 p-3 font-mono text-sm text-white/84">
                <span className="text-white/30">$</span> {cli.installCommand}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {cli.useCases.slice(0, 3).map((useCase) => (
                  <span key={useCase} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-white/48">
                    {useCase}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-white/46">
                <span>{formatCompactNumber(cli.monthlyDownloads)} monthly</span>
                <span className="text-[var(--accent-peach)]">+{cli.trendingAmount}%</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="section-kicker">Browse the directory</div>
        <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.02] p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/34">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by tool, category, or use case"
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/25 pl-11 pr-4 text-sm text-white outline-none ring-0 placeholder:text-white/28 focus:border-white/18"
            />
          </label>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {["All", ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  activeCategory === category
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/[0.03] text-white/56 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 lg:col-span-2">
            {["All", ...packageManagers].map((manager) => (
              <button
                key={manager}
                type="button"
                onClick={() => setActiveManager(manager)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                  activeManager === manager
                    ? "border-transparent bg-[linear-gradient(135deg,rgba(183,182,233,0.95),rgba(238,176,140,0.95),rgba(236,176,162,0.95))] text-black"
                    : "border-white/10 bg-transparent text-white/52 hover:text-white/88"
                }`}
              >
                {titleCase(manager)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredClis.map((cli) => (
            <div key={cli.slug} className="rounded-[24px] border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">{cli.category}</div>
                  <Link href={`/cli/${cli.slug}`} className="mt-3 block text-lg font-medium tracking-tight text-white transition hover:text-white/78">
                    {cli.name}
                  </Link>
                </div>
                <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/46">
                  {cli.installWith}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/56">{cli.tagline}</p>

              <div className="mt-5 rounded-2xl border border-white/8 bg-black/25 p-3">
                <div className="font-mono text-sm text-white/84">
                  <span className="text-white/30">$</span> {cli.installCommand}
                </div>
                <div className="mt-3 font-mono text-sm text-white/56">
                  <span className="text-white/30">$</span> {cli.quickStart}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-sm text-white/42">
                <span>{formatCompactNumber(cli.stars)} stars</span>
                <span>{formatCompactNumber(cli.monthlyDownloads)} downloads</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Leaderboard</div>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Compare traction and discover what is rising fastest.
            </h2>
          </div>
          <Link href="/leaderboard" className="text-sm text-white/52 transition hover:text-white">
            Open full leaderboard →
          </Link>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
          <div className="hidden grid-cols-[72px_1.5fr_0.8fr_0.8fr_120px] gap-4 border-b border-white/8 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 md:grid">
            <div>#</div>
            <div>CLI</div>
            <div>Stars</div>
            <div>Downloads</div>
            <div className="text-right">Score</div>
          </div>

          <div>
            {leaderboardClis.slice(0, 6).map((cli, index) => (
              <Link
                key={cli.slug}
                href={`/cli/${cli.slug}`}
                className="grid gap-2 border-b border-white/6 px-5 py-4 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[72px_1.5fr_0.8fr_0.8fr_120px] md:items-center md:gap-4"
              >
                <div className="font-mono text-sm text-white/38">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <div className="text-base font-medium text-white">{cli.name}</div>
                  <div className="mt-1 text-sm text-white/42">{cli.tagline}</div>
                </div>
                <div className="text-sm text-white/56">{formatCompactNumber(cli.stars)}</div>
                <div className="text-sm text-white/56">{formatCompactNumber(cli.monthlyDownloads)}</div>
                <div className="flex items-center justify-between md:justify-end md:gap-4">
                  <span className="text-sm text-[var(--accent-peach)]">+{cli.trendingAmount}%</span>
                  <span className="text-base font-medium text-white">{cli.score}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
