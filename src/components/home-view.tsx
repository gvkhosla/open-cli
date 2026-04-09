"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { CliLogoMarquee } from "@/components/cli-logo-marquee";
import { CopyButton } from "@/components/copy-button";
import { SkillPackActions } from "@/components/skill-pack-actions";
import { SuperchargeAgent } from "@/components/supercharge-agent";
import type { DirectorySearchResponse, DirectoryStats } from "@/lib/directory";
import { formatCompactNumber, formatMetric } from "@/lib/format";
import type { SuperchargeRecommendation } from "@/lib/supercharge";

const promptSuggestions = [
  "review pull requests",
  "deploy next.js app",
  "inspect postgres schema",
  "test signup flow",
  "run local models",
] as const;

const toolSuggestions = ["basecamp", "vercel", "gh", "claude"] as const;

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
 *   0ms  hero settles in
 *  70ms  search surface appears
 * 140ms  recommendation fades up after a query
 */
const HOME_REVEAL = {
  hero: 0,
  search: 0.07,
  recommendation: 0.14,
} as const;

const PANEL_STAGGER = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
} as const;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="M13 13l5 5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RecommendationDetail({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <motion.details
      variants={PANEL_STAGGER.item}
      open={defaultOpen}
      className="group rounded-[22px] border border-white/12 bg-white/[0.05] px-4 py-3.5 transition-colors hover:border-white/16 sm:px-5"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-medium text-white/90">{title}</span>
        <ChevronIcon className="h-3.5 w-3.5 text-white/24 transition duration-300 group-open:rotate-180 group-open:text-white/42" />
      </summary>
      <div className="pt-3 text-sm leading-6 text-white/72">{children}</div>
    </motion.details>
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
  const primaryCompanionSkill = recommendation.companionSkills[0] ?? null;
  const matchLabel = recommendation.matchType === "direct" ? "Direct match" : "Best fit for task";
  const matchDescription =
    recommendation.matchType === "direct"
      ? "Matched from the CLI name you typed."
      : "Matched from the job you described.";

  return (
    <motion.section
      key={recommendation.primary.slug}
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: revealY, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.99 }}
      transition={{ ...transition, delay: HOME_REVEAL.recommendation }}
      className="ui-panel relative overflow-hidden rounded-[30px] p-5 sm:p-7"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 16px 42px rgba(0,0,0,${0.12 + glow * 0.1})` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/14" />
      <motion.div
        variants={PANEL_STAGGER.container}
        initial="hidden"
        animate="visible"
        transition={transition}
        className="relative space-y-5 sm:space-y-6"
      >
        <motion.div variants={PANEL_STAGGER.item} className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="space-y-1">
              <div className="ui-label">{matchLabel}</div>
              <p className="text-xs leading-5 text-white/42">{matchDescription}</p>
            </div>
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2.7rem] sm:leading-none">
                  {recommendation.primary.shortName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-white/46 sm:text-sm">
                  <span>{recommendation.capability.label}</span>
                  {primaryMetric ? <span className="text-white/34">• {primaryMetric}</span> : null}
                  {isLoading ? <span className="text-white/34">• updating</span> : null}
                </div>
              </div>
              <p className="max-w-2xl text-[15px] leading-7 text-white/72 sm:text-[17px] sm:leading-8">
                {recommendation.rationale}
              </p>
              {recommendation.companionSkills[0] ? (
                <p className="max-w-2xl text-sm leading-6 text-white/56">
                  Open CLI integrates this recommendation with skills.sh — start with <span className="text-white/82">{recommendation.companionSkills[0].title}</span> once the CLI is installed.
                </p>
              ) : null}
            </div>
          </div>

          <motion.div variants={PANEL_STAGGER.item}>
            <SkillPackActions
              skillMarkdown={recommendation.skillPack.skillMarkdown}
              fileName={recommendation.skillPack.fileName}
              copyLabel="Copy SKILL.md"
              downloadLabel="Download SKILL.md"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={PANEL_STAGGER.item} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="ui-panel-soft overflow-hidden rounded-[24px]">
            <CommandRow
              label="Install"
              command={recommendation.primary.installCommand}
              copyLabel="Copy install"
            />
            <CommandRow
              label="Verify"
              command={recommendation.verifyCommand}
              copyLabel="Copy verify"
              description={recommendation.verifySignal}
              bordered
            />
          </div>

          <div className="ui-panel-soft rounded-[24px] p-4 sm:p-5">
            <div className="ui-label">Start here</div>
            <ol className="mt-3 space-y-3 text-sm leading-6 text-white/68">
              {recommendation.loopSteps.slice(0, 3).map((step, index) => (
                <li key={`${recommendation.loopName}-${index}`} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-[10px] text-white/58">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        {primaryCompanionSkill ? (
          <motion.div variants={PANEL_STAGGER.item} className="ui-panel-soft rounded-[24px] p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-2">
                <div className="ui-label">Open CLI × skills.sh</div>
                <div className="text-sm font-medium text-white/88">{primaryCompanionSkill.title}</div>
                <p className="text-sm leading-6 text-white/62">
                  Open CLI integrates this recommendation with the right skills.sh companion so you install the tool and the workflow together.
                </p>
              </div>
              <a
                href={primaryCompanionSkill.skillsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/58 transition hover:text-white"
              >
                View on skills.sh
                <svg className="h-3 w-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6" />
                </svg>
              </a>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 font-mono text-xs text-white/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <span className="select-none text-white/20">$ </span>
                {primaryCompanionSkill.installCommand}
              </code>
              <CopyButton compact value={primaryCompanionSkill.installCommand} label="Copy skills.sh install" />
            </div>
          </motion.div>
        ) : null}

        <motion.div variants={PANEL_STAGGER.item} className="space-y-3">
          <RecommendationDetail title="Why this fits" defaultOpen>
            <ul className="space-y-2">
              {recommendation.whyReasons.map((reason) => (
                <li key={reason} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/28" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </RecommendationDetail>

          <RecommendationDetail title="Watch-outs">
            <ul className="space-y-2">
              {recommendation.watchouts.map((watchout) => (
                <li key={watchout} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/20" />
                  <span>{watchout}</span>
                </li>
              ))}
            </ul>
          </RecommendationDetail>

          {recommendation.alternatives.length > 0 ? (
            <RecommendationDetail title="Alternatives">
              <div className="space-y-2">
                {recommendation.alternatives.map((alternative) => (
                  <Link
                    key={alternative.slug}
                    href={`/cli/${alternative.slug}`}
                    className="group flex items-start justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.04] px-3.5 py-3 transition hover:border-white/16 hover:bg-white/[0.06]"
                  >
                    <div>
                      <div className="text-sm font-medium text-white/88">{alternative.shortName}</div>
                      <p className="mt-1 text-sm leading-6 text-white/58">{alternative.reason}</p>
                    </div>
                    <svg className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-white/16 transition group-hover:translate-x-0.5 group-hover:text-white/34" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 7h12M8 2l5 5-5 5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </RecommendationDetail>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function CommandRow({
  label,
  command,
  copyLabel,
  description,
  bordered = false,
}: {
  label: string;
  command: string;
  copyLabel: string;
  description?: string;
  bordered?: boolean;
}) {
  return (
    <motion.div
      variants={PANEL_STAGGER.item}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", visualDuration: 0.22, bounce: 0.12 }}
      className={bordered ? "border-t border-white/8 p-4 sm:p-5" : "p-4 sm:p-5"}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">{label}</div>
      <div className="mt-2 flex items-center gap-2">
        <code className="flex-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3.5 font-mono text-sm text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <span className="select-none text-white/20">$ </span>
          {command}
        </code>
        <CopyButton compact value={command} label={copyLabel} />
      </div>
      {description ? <p className="mt-2 text-xs leading-5 text-white/48">{description}</p> : null}
    </motion.div>
  );
}

export function HomeView({ initialDirectory, directoryStats }: HomeViewProps) {
  const [search, setSearch] = useState(initialDirectory.query);
  const [directory, setDirectory] = useState(initialDirectory);
  const [recommendation, setRecommendation] = useState<SuperchargeRecommendation | null>(null);
  const [limit, setLimit] = useState(initialDirectory.results.length || 125);
  const [activeCategory, setActiveCategory] = useState<(typeof categoryChips)[number]>("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showCatalog, setShowCatalog] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const polish = {
    hero: {
      y: 0,
      scale: 1,
    },
    search: {
      y: 0,
      radius: 26,
    },
    recommendation: {
      y: 0,
      glow: 0.08,
    },
    motion: {
      duration: 0.34,
      bounce: 0.08,
    },
  } as const;

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
    setLimit(125);
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
        setLimit(125);
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
  const catalogLabel = hasQuery
    ? `See ${directory.total} matching tool${directory.total !== 1 ? "s" : ""}`
    : `Browse ${formatCompactNumber(directoryStats.total)} tools`;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.99 }}
        animate={{ opacity: 1, y: polish.hero.y, scale: polish.hero.scale }}
        transition={{ ...motionTransition, delay: HOME_REVEAL.hero }}
      >
        <SuperchargeAgent stats={directoryStats} />
      </motion.div>

      <section id="directory" className="scroll-mt-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: polish.search.y }}
          transition={{ ...motionTransition, delay: HOME_REVEAL.search }}
          className={`ui-panel overflow-hidden rounded-[26px] transition-all duration-300 ${
            isFocused
              ? "border-white/16 shadow-[0_14px_36px_rgba(0,0,0,0.22)]"
              : "border-white/10 shadow-[0_6px_22px_rgba(0,0,0,0.12)]"
          }`}
          style={{ borderRadius: polish.search.radius }}
        >
          <div className="border-b border-white/6 px-5 pb-3 pt-4 sm:px-6">
            <div className="ui-label">Search</div>
            <p className="mt-1 text-sm leading-6 text-white/56">Task, workflow, or exact CLI name.</p>
          </div>

          <div className="p-3 sm:p-4">
            <div
              className={`ui-panel-soft relative rounded-[24px] transition-all duration-300 ${
                isFocused
                  ? "border-white/16 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.04)]"
                  : ""
              }`}
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-5 text-white/34 sm:pl-6">
                <SearchIcon className="h-[15px] w-[15px]" />
              </span>
              <input
                ref={inputRef}
                value={search}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setLimit(event.target.value.trim() ? 40 : 125);
                }}
                placeholder="deploy app, review PRs, basecamp…"
                className="h-16 w-full rounded-[24px] border border-transparent bg-transparent pl-12 pr-28 text-[16px] text-white/96 outline-none placeholder:text-white/40 sm:pl-14 sm:pr-32 sm:text-[17px]"
              />
              <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-5 sm:pr-6">
                {isLoading && <div className="spinner" />}
                {hasQuery ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/52 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
                  >
                    Clear
                  </button>
                ) : (
                  <kbd className="kbd">/</kbd>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/6 px-5 py-3 sm:px-6">
            {!hasQuery ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-[11px] uppercase tracking-[0.14em] text-white/28">Tasks</span>
                  {promptSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestion(suggestion)}
                      className="rounded-full px-2.5 py-1 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-[11px] uppercase tracking-[0.14em] text-white/28">Tools</span>
                  {toolSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestion(suggestion)}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[12px] text-white/56 transition hover:border-white/14 hover:bg-white/[0.06] hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
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
                      className={`rounded-full px-3 py-1.5 text-xs transition ${
                        isActive
                          ? "bg-white text-black"
                          : "text-white/58 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {!hasQuery ? (
          <div className="space-y-3">
            <div className="ui-label px-1">Popular tools</div>
            <CliLogoMarquee />
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          {hasQuery ? (
            <RecommendationPanel
              recommendation={recommendation}
              isLoading={isLoading}
              revealY={polish.recommendation.y}
              glow={polish.recommendation.glow}
              transition={motionTransition}
            />
          ) : null}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3 px-1 pt-1">
          <div className="text-sm text-white/44">
            {hasQuery ? `${directory.total} option${directory.total !== 1 ? "s" : ""} found` : "Curated recommendations for real jobs."}
          </div>
          <button
            type="button"
            onClick={() => setShowCatalog((current) => !current)}
            className="inline-flex items-center gap-2 text-sm text-white/54 transition hover:text-white"
          >
            {showCatalog ? "Hide catalog" : catalogLabel}
            <ChevronIcon className={`h-3.5 w-3.5 transition-transform ${showCatalog ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showCatalog ? (
          <div className="space-y-3">
            <div className="ui-panel-faint overflow-hidden rounded-[22px]">
              {directory.results.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                  <SearchIcon className="h-6 w-6 text-white/18" />
                  <p className="mt-4 text-sm text-white/64">No CLIs match that description.</p>
                  <p className="mt-1 text-xs text-white/42">Try a different phrase or broaden your category filter.</p>
                </div>
              ) : (
                <>
                  <div className="hidden border-b border-white/6 px-5 py-2.5 md:grid md:grid-cols-[minmax(0,1.5fr)_140px_150px] md:items-center md:gap-4">
                    <div className="ui-label">Tool</div>
                    <div className="ui-label">Maker</div>
                    <div className="ui-label text-right">Signal</div>
                  </div>
                  {directory.results.map((cli) => (
                    <Link
                      key={cli.slug}
                      href={`/cli/${cli.slug}`}
                      className="directory-row grid gap-2 border-b border-white/6 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-white/[0.022] md:grid-cols-[minmax(0,1.5fr)_140px_150px] md:items-center md:gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[15px] font-medium text-white">{cli.shortName}</span>
                          {cli.official ? <span className="text-[10px] uppercase tracking-[0.14em] text-white/38">official</span> : null}
                          {cli.agentFriendly ? <span className="text-[10px] uppercase tracking-[0.14em] text-white/30">agent</span> : null}
                        </div>
                        <p className="mt-1 truncate text-sm text-white/68">{cli.tagline}</p>
                        {cli.highlights.length > 0 ? (
                          <p className="mt-1 truncate text-xs text-white/40">{cli.highlights[0]}</p>
                        ) : null}
                      </div>
                      <div className="text-sm text-white/54 md:text-[13px]">{cli.makerName}</div>
                      <div className="text-left text-sm font-mono text-white/48 md:text-right">
                        {formatMetric(cli.metricValue, cli.metricLabel) ?? (cli.githubStars !== null ? `${formatCompactNumber(cli.githubStars)} ★` : "—")}
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>

            <div className="flex items-center gap-3 px-1">
              {!showingAll && directory.results.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setLimit((current) => current + 24)}
                  disabled={isLoading}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 px-4 text-xs text-white/60 transition hover:border-white/18 hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
                >
                  Show more
                  <ChevronIcon className="h-3 w-3" />
                </button>
              ) : null}
              {showingAll && directory.results.length > 0 ? (
                <span className="text-xs text-white/22">Showing all {directory.total} {hasQuery ? "matches" : "tools"}</span>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
