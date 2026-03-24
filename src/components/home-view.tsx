"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDialKit } from "dialkit";
import { motion } from "motion/react";

import { CliLogoMarquee } from "@/components/cli-logo-marquee";
import { CopyButton } from "@/components/copy-button";
import { SuperchargeAgent } from "@/components/supercharge-agent";
import { WorkflowPackActions } from "@/components/workflow-pack-actions";
import type { DirectorySearchResponse, DirectoryStats } from "@/lib/directory";
import { formatCompactNumber } from "@/lib/format";
import type { SuperchargeRecommendation } from "@/lib/supercharge";

const promptSuggestions = [
  "review pull requests",
  "deploy my app",
  "inspect postgres schema",
  "browser automation",
  "run local models",
  "wallet & payments",
];

const categoryChips = ["All", "Git", "Deploy", "Database", "Browser Automation", "AI", "Wallet / Payments"] as const;

type HomeViewProps = {
  initialDirectory: DirectorySearchResponse;
  directoryStats: DirectoryStats;
};

type RecommendationPayload = {
  recommendation: SuperchargeRecommendation | null;
};

/*
 * HOMEPAGE STORYBOARD
 *
 *  0ms   hero fades in
 * 60ms   search shell settles in
 * 140ms  recommendation surface reveals after a query
 */
const HOME_REVEAL = {
  hero: 0,
  search: 0.06,
  recommendation: 0.14,
} as const;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="M13 13l5 5" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.75v2.5M8 11.75v2.5M14.25 8h-2.5M4.25 8h-2.5M12.596 3.404l-1.768 1.768M5.172 10.828l-1.768 1.768M12.596 12.596l-1.768-1.768M5.172 5.172L3.404 3.404" strokeLinecap="round" />
    </svg>
  );
}

function RecommendationPanel({
  recommendation,
  isLoading,
  revealY,
  glow,
  transition,
}: {
  recommendation: SuperchargeRecommendation | null;
  isLoading: boolean;
  revealY: number;
  glow: number;
  transition: { type: "spring"; visualDuration: number; bounce: number };
}) {
  if (!recommendation) return null;

  const primaryMetric =
    recommendation.primary.metricValue !== null && recommendation.primary.metricLabel
      ? `${formatCompactNumber(recommendation.primary.metricValue)} ${recommendation.primary.metricLabel.toLowerCase()}`
      : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: revealY }}
      transition={{ ...transition, delay: HOME_REVEAL.recommendation }}
      className="relative overflow-hidden rounded-[22px] border border-white/8 bg-[#0b0d10] p-5 sm:p-6"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 16px 40px rgba(0,0,0,${0.16 + glow * 0.14})` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/8" />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="section-kicker flex items-center gap-2">
              <SparkIcon />
              Recommendation
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{recommendation.primary.shortName}</h2>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/40">
                {recommendation.capability.label}
              </span>
              {primaryMetric ? (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">
                  {primaryMetric}
                </span>
              ) : null}
              {isLoading ? (
                <span className="inline-flex items-center gap-2 text-xs text-white/36">
                  <div className="spinner" /> Updating
                </span>
              ) : null}
            </div>
            <p className="max-w-3xl text-sm leading-6 text-white/62 sm:text-[15px]">{recommendation.rationale}</p>
          </div>

          <WorkflowPackActions
            markdown={recommendation.workflowPack.markdown}
            fileName={recommendation.workflowPack.fileName}
            copyLabel="Copy workflow pack"
            downloadLabel="Download workflow pack"
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
          <div className="rounded-[20px] border border-white/8 bg-[#0b0c0e]/58 p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Install</div>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="flex-1 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 font-mono text-sm text-white/72">
                      <span className="select-none text-white/20">$ </span>
                      {recommendation.primary.installCommand}
                    </code>
                    <CopyButton compact value={recommendation.primary.installCommand} label="Copy install" />
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Verify</div>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="flex-1 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 font-mono text-sm text-white/72">
                      <span className="select-none text-white/20">$ </span>
                      {recommendation.verifyCommand}
                    </code>
                    <CopyButton compact value={recommendation.verifyCommand} label="Copy verify" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/34">{recommendation.verifySignal}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Why this one</div>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-white/62">
                    {recommendation.whyReasons.map((reason) => (
                      <li key={reason} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/38" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">How to start</div>
                  <ol className="mt-2 space-y-2 text-sm leading-6 text-white/56">
                    {recommendation.loopSteps.slice(0, 3).map((step, index) => (
                      <li key={`${recommendation.loopName}-${index}`} className="flex items-start gap-3">
                        <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] font-mono text-[10px] text-white/46">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[20px] border border-white/8 bg-[#0b0c0e]/58 p-4 sm:p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Watch out for</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-white/58">
                {recommendation.watchouts.map((watchout) => (
                  <li key={watchout} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/26" />
                    <span>{watchout}</span>
                  </li>
                ))}
              </ul>
            </div>

            {recommendation.alternatives.length > 0 ? (
              <div className="rounded-[20px] border border-white/8 bg-[#0b0c0e]/58 p-4 sm:p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Other good options</div>
                <div className="mt-3 space-y-2">
                  {recommendation.alternatives.map((alternative) => (
                    <Link
                      key={alternative.slug}
                      href={`/cli/${alternative.slug}`}
                      className="group flex items-start justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3.5 py-3 transition hover:border-white/16 hover:bg-white/[0.04]"
                    >
                      <div>
                        <div className="text-sm font-medium text-white">{alternative.shortName}</div>
                        <p className="mt-1 text-xs leading-5 text-white/44">{alternative.reason}</p>
                      </div>
                      <svg className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-white/18 transition group-hover:translate-x-0.5 group-hover:text-white/34" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 7h12M8 2l5 5-5 5" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function HomeView({ initialDirectory, directoryStats }: HomeViewProps) {
  const [search, setSearch] = useState(initialDirectory.query);
  const [directory, setDirectory] = useState(initialDirectory);
  const [recommendation, setRecommendation] = useState<SuperchargeRecommendation | null>(null);
  const [limit, setLimit] = useState(initialDirectory.results.length || 24);
  const [activeCategory, setActiveCategory] = useState<(typeof categoryChips)[number]>("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const polish = useDialKit("Open CLI Home", {
    hero: {
      y: [0, -12, 16],
      scale: [1, 0.98, 1.02],
    },
    search: {
      y: [0, -10, 14],
      radius: [20, 16, 28],
    },
    recommendation: {
      y: [0, -12, 16],
      glow: [0.08, 0, 0.22],
    },
    motion: {
      duration: [0.32, 0.18, 0.7],
      bounce: [0.08, 0, 0.2],
    },
  });

  const motionTransition = {
    type: "spring" as const,
    visualDuration: polish.motion.duration,
    bounce: polish.motion.bounce,
  };

  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      setIsLoading(true);

      const searchParams = new URLSearchParams({ q: search, limit: String(limit), category: activeCategory });
      const recommendationParams = new URLSearchParams({ q: search });

      try {
        const [directoryResponse, recommendationResponse] = await Promise.all([
          fetch(`/api/search?${searchParams.toString()}`),
          search.trim() ? fetch(`/api/supercharge?${recommendationParams.toString()}`) : Promise.resolve(null),
        ]);

        if (!cancelled && directoryResponse.ok) {
          const payload = (await directoryResponse.json()) as DirectorySearchResponse;
          setDirectory(payload);
        }

        if (!cancelled) {
          if (!search.trim()) {
            setRecommendation(null);
          } else if (recommendationResponse?.ok) {
            const payload = (await recommendationResponse.json()) as RecommendationPayload;
            setRecommendation(payload.recommendation);
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }, 140);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [activeCategory, limit, search]);

  function handleSuggestion(value: string) {
    setSearch(value);
    setLimit(40);
    setActiveCategory("All");
    inputRef.current?.focus();
  }

  function handleClearSearch() {
    setSearch("");
    setLimit(24);
    setActiveCategory("All");
    setRecommendation(null);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        setSearch("");
        setLimit(24);
        setActiveCategory("All");
        setRecommendation(null);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const showingAll = directory.results.length >= directory.total;
  const hasQuery = search.trim().length > 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: polish.hero.y, scale: polish.hero.scale }}
        transition={{ ...motionTransition, delay: HOME_REVEAL.hero }}
      >
        <SuperchargeAgent />
      </motion.div>

      <section id="directory" className="scroll-mt-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: polish.search.y }}
          transition={{ ...motionTransition, delay: HOME_REVEAL.search }}
          className={`sticky top-16 z-20 border bg-[#0b0d10]/94 px-2 py-2 backdrop-blur-xl transition-all duration-300 ${
            isFocused
              ? "border-white/16 shadow-[0_12px_32px_rgba(0,0,0,0.24)]"
              : "border-white/8"
          }`}
          style={{ borderRadius: polish.search.radius }}
        >
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-white/24">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              ref={inputRef}
              value={search}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(event) => {
                setSearch(event.target.value);
                setLimit(event.target.value.trim() ? 40 : 24);
              }}
              placeholder="What do you need to do? (e.g. deploy next.js, review PRs, run local models)"
              className="h-12 w-full rounded-[18px] border border-transparent bg-transparent pl-11 pr-24 text-sm text-white outline-none placeholder:text-white/28 sm:h-13"
            />
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
              {isLoading && <div className="spinner" />}
              {hasQuery ? (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/40 transition hover:bg-white/[0.06] hover:text-white"
                >
                  Clear <kbd className="kbd">Esc</kbd>
                </button>
              ) : (
                <kbd className="kbd">/</kbd>
              )}
            </div>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 px-1">
            {categoryChips.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setLimit(24);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs transition-all duration-200 ${
                    isActive
                      ? "border border-white/12 bg-white/[0.06] text-white"
                      : "border border-white/8 text-white/48 hover:border-white/16 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {!hasQuery && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 px-1 pb-0.5">
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/24">Try:</span>
              {promptSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestion(suggestion)}
                  className="rounded-full border border-dashed border-white/10 px-3 py-1 text-xs text-white/40 transition hover:border-white/16 hover:text-white/70"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
            {hasQuery
              ? `${directory.total} result${directory.total !== 1 ? "s" : ""}`
              : `${formatCompactNumber(directoryStats.total)} CLIs · ${formatCompactNumber(directoryStats.official)} official · ${formatCompactNumber(directoryStats.builders)} community`}
          </span>
          <div className="flex gap-3 text-xs text-white/36">
            <Link href="/makers" className="group inline-flex items-center gap-1 transition hover:text-white">
              Makers
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M7 2l4 4-4 4" /></svg>
            </Link>
            <Link href="/submit" className="group inline-flex items-center gap-1 transition hover:text-white">
              Submit
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M7 2l4 4-4 4" /></svg>
            </Link>
          </div>
        </div>

        {hasQuery ? (
          <RecommendationPanel
            recommendation={recommendation}
            isLoading={isLoading}
            revealY={polish.recommendation.y}
            glow={polish.recommendation.glow}
            transition={motionTransition}
          />
        ) : null}

        {!hasQuery && (
          <div className="space-y-2">
            <div className="section-kicker px-1">Popular tools</div>
            <p className="px-1 text-sm text-white/38">Common starting points for deploy, git, database, and AI workflows.</p>
            <CliLogoMarquee />
          </div>
        )}

        <div className="overflow-hidden rounded-[20px] border border-white/8 bg-white/[0.015]">
          <div className="hidden grid-cols-[minmax(0,1.4fr)_180px_120px] gap-4 border-b border-white/8 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/28 md:grid">
            <div>CLI</div>
            <div>Maker</div>
            <div className="text-right">Momentum</div>
          </div>

          {directory.results.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <SearchIcon className="h-6 w-6 text-white/18" />
              <p className="mt-4 text-sm text-white/44">No CLIs match that description.</p>
              <p className="mt-1 text-xs text-white/26">Try a different phrase or broaden your category filter.</p>
            </div>
          )}

          {directory.results.map((cli) => (
            <Link
              key={cli.slug}
              href={`/cli/${cli.slug}`}
              className="directory-row grid gap-2 border-b border-white/6 px-5 py-4 transition-colors last:border-b-0 hover:bg-white/[0.025] md:grid-cols-[minmax(0,1.4fr)_180px_120px] md:items-center md:gap-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[15px] font-medium text-white">{cli.shortName}</span>
                  {cli.official && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/44">
                      <span className="h-1 w-1 rounded-full bg-white/38" /> Official
                    </span>
                  )}
                  {cli.agentFriendly && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/44">
                      Scriptable
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-white/48">{cli.tagline}</p>
              </div>

              <div className="text-sm text-white/44">{cli.makerName}</div>

              <div className="text-right">
                {cli.githubStars !== null ? (
                  <span className="inline-flex items-center gap-1 font-mono text-sm tabular-nums text-white/40">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" /></svg>
                    {formatCompactNumber(cli.githubStars)}
                  </span>
                ) : (
                  <span className="text-xs text-white/22">—</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 px-1">
          {!showingAll && directory.results.length > 0 && (
            <button
              type="button"
              onClick={() => setLimit((current) => current + 24)}
              disabled={isLoading}
              className="group inline-flex h-9 items-center gap-2 rounded-full border border-white/10 px-4 text-xs text-white/52 transition hover:border-white/18 hover:bg-white/[0.04] hover:text-white disabled:opacity-50"
            >
              Show more
              <svg className="h-3 w-3 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l4 4 4-4" /></svg>
            </button>
          )}
          {isLoading && directory.results.length > 0 && (
            <span className="inline-flex items-center gap-2 text-xs text-white/30">
              <div className="spinner" /> Updating…
            </span>
          )}
          {showingAll && directory.results.length > 0 && (
            <span className="text-xs text-white/24">Showing all {directory.total} results</span>
          )}
        </div>
      </section>
    </div>
  );
}
