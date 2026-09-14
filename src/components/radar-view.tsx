"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import type { RadarCandidate, RadarVerdict } from "@/lib/radar";

type RadarState = Record<string, { vote: -1 | 0 | 1; comments: string[] }>;
type Filter = "try" | "wait" | "all";

const storageKey = "opencli-radar-v2";

function readStoredRadarState(): RadarState {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") as RadarState;
  } catch {
    return {};
  }
}

function verdictLabel(verdict: RadarVerdict | undefined) {
  if (verdict === "try") return "Try now";
  if (verdict === "skip") return "Skip";
  return "Wait";
}

export function RadarView({ candidates }: { candidates: RadarCandidate[] }) {
  const [state, setState] = useState<RadarState>(readStoredRadarState);
  const [filter, setFilter] = useState<Filter>("try");

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const live = useMemo(
    () => candidates.filter((candidate) => candidate.status !== "promoted"),
    [candidates],
  );
  const visible = live.filter((candidate) => (filter === "all" ? true : (candidate.verdict ?? "wait") === filter));
  const tryCount = live.filter((candidate) => candidate.verdict === "try").length;
  const waitCount = live.filter((candidate) => (candidate.verdict ?? "wait") === "wait").length;

  function vote(slug: string, value: -1 | 1) {
    setState((current) => ({
      ...current,
      [slug]: { vote: current[slug]?.vote === value ? 0 : value, comments: current[slug]?.comments ?? [] },
    }));
  }

  function comment(slug: string, body: string) {
    const trimmed = body.trim();
    if (!trimmed) return;
    setState((current) => ({
      ...current,
      [slug]: { vote: current[slug]?.vote ?? 0, comments: [trimmed, ...(current[slug]?.comments ?? [])].slice(0, 5) },
    }));
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/12 bg-cyan-200/[0.04] px-3 py-1 text-sm text-cyan-50/62">
            <span className="size-1.5 rounded-full bg-cyan-300/70" />
            New tools, with a first command
          </div>
          <div className="space-y-4">
            <h1 className="max-w-[12ch] text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl">OpenCLI Radar</h1>
            <p className="max-w-[66ch] text-pretty text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Not a launch dump. Each card is a CLI that is not in the directory yet, with a real install, a first command, and a call: try now, wait, or skip.
            </p>
          </div>
        </div>
        <div className="ui-panel-soft rounded-[26px] p-4 sm:p-5">
          <div className="ui-label">How to use this</div>
          <p className="mt-2 text-base leading-7 text-white/62 sm:text-sm sm:leading-6">
            Start with Try now. Copy the first command. If it earns a slot in your workflow, it can graduate into the directory.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["try", `Try now (${tryCount})`],
            ["wait", `Wait (${waitCount})`],
            ["all", `All (${live.length})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${filter === value ? "bg-white text-black" : "border border-white/10 bg-white/[0.03] text-white/58 hover:border-white/16 hover:text-white"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <p className="text-sm text-white/64">Nothing in this bucket right now.</p>
          <p className="mt-1 text-xs text-white/42">Try the other filter, or browse the directory for tools that already earned a page.</p>
        </div>
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {visible.map((candidate) => {
            const itemState = state[candidate.slug] ?? { vote: 0, comments: [] };
            const firstCommand = candidate.detectedFirstCommand ?? candidate.detectedInstallCommand;
            const score = Math.min(99, candidate.agentReadinessGuess + itemState.vote * 4 + itemState.comments.length * 2);
            const verdict = candidate.verdict ?? "wait";
            return (
              <article key={candidate.slug} className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] transition hover:border-white/16 hover:bg-white/[0.05]">
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-medium tracking-tight text-white">{candidate.name}</h2>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] ${verdict === "try" ? "bg-emerald-300/90 text-black" : "border border-white/10 bg-white/[0.04] text-white/50"}`}>
                          {verdictLabel(verdict)}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/42">{candidate.detectedCategory}</span>
                      </div>
                      <p className="mt-2 text-base leading-7 text-white/64 sm:text-sm sm:leading-6">{candidate.description}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-mono text-2xl text-white tabular-nums">{score}</div>
                      <div className="text-[10px] uppercase tracking-wide text-white/34">agent fit</div>
                    </div>
                  </div>

                  {candidate.beatsIncumbent ? (
                    <p className="mt-4 text-sm leading-6 text-white/52">
                      <span className="text-white/36">Choose this over </span>
                      {candidate.beatsIncumbent}
                    </p>
                  ) : null}

                  <div className="mt-5 space-y-2">
                    <CommandRow label="Install" value={candidate.detectedInstallCommand} />
                    <CommandRow label="First command" value={firstCommand} />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <Signal label="Stars" value={candidate.signals.stars.toLocaleString()} />
                    <Signal label="Why now" value={candidate.signals.growth} />
                    <Signal label="Seen" value={candidate.signals.lastSeen} />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/44">{candidate.whyFound}</p>
                </div>

                <div className="border-t border-white/8 bg-black/10 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => vote(candidate.slug, 1)} className={`rounded-full px-3 py-1.5 text-sm transition ${itemState.vote === 1 ? "bg-emerald-300 text-black" : "border border-white/10 text-white/58 hover:bg-white/[0.06] hover:text-white"}`}>Useful</button>
                      <button type="button" onClick={() => vote(candidate.slug, -1)} className={`rounded-full px-3 py-1.5 text-sm transition ${itemState.vote === -1 ? "bg-rose-300 text-black" : "border border-white/10 text-white/58 hover:bg-white/[0.06] hover:text-white"}`}>Noisy</button>
                    </div>
                    <a href={candidate.sourceUrl} target="_blank" rel="noreferrer" className="text-sm text-white/46 transition hover:text-white">Source →</a>
                  </div>
                  <CommentBox slug={candidate.slug} onSubmit={comment} />
                  {itemState.comments.length > 0 ? (
                    <div className="mt-3 space-y-2">
                      {itemState.comments.map((body, index) => <p key={`${body}-${index}`} className="rounded-2xl border border-white/8 bg-white/[0.025] px-3 py-2 text-sm leading-6 text-white/58">{body}</p>)}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}

function CommandRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/16 p-3">
      <div className="mb-1.5 ui-label">{label}</div>
      <div className="flex items-center gap-2">
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-white/78">{value}</code>
        <CopyButton compact value={value} label="Copy" />
      </div>
    </div>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-3">
      <div className="ui-label">{label}</div>
      <div className="mt-1 truncate font-mono text-sm text-white/72 tabular-nums">{value}</div>
    </div>
  );
}

function CommentBox({ slug, onSubmit }: { slug: string; onSubmit: (slug: string, body: string) => void }) {
  const [body, setBody] = useState("");
  return (
    <form className="mt-3 flex gap-2" onSubmit={(event) => { event.preventDefault(); onSubmit(slug, body); setBody(""); }}>
      <input value={body} onChange={(event) => setBody(event.target.value)} placeholder="I would use this for…" className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-base text-white outline-none placeholder:text-white/32 focus:border-cyan-300/24 sm:text-sm" />
      <button type="submit" className="rounded-full bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/90">Comment</button>
    </form>
  );
}
