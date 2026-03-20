"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { capabilityDefinitions } from "@/lib/capabilities";
import { formatCompactNumber } from "@/lib/format";
import { buildSuperchargeRecommendation } from "@/lib/supercharge";

type SuperchargeAgentProps = {
  onUseRecommendation: (query: string) => void;
};

export function SuperchargeAgent({ onUseRecommendation }: SuperchargeAgentProps) {
  const [activeCapability, setActiveCapability] = useState(capabilityDefinitions[0].slug);
  const [prompt, setPrompt] = useState(capabilityDefinitions[0].samplePrompt);

  const capability = capabilityDefinitions.find((item) => item.slug === activeCapability) ?? capabilityDefinitions[0];
  const recommendation = useMemo(() => buildSuperchargeRecommendation(prompt, activeCapability), [activeCapability, prompt]);

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <div className="section-kicker">Supercharge your agent</div>
        <h1 className="max-w-4xl text-5xl font-medium tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl lg:leading-[0.95]">
          Tell us the job. We’ll pick the CLI, setup, skill, and loop.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-white/56">
          Open CLI is becoming a fast backbone for agent-ready capabilities. Describe the outcome you want,
          then get the best CLI to install, verify, and hand to your agent right away.
        </p>
      </div>

      <div className="panel-texture rounded-[24px] border border-white/8 p-5 sm:p-6 lg:p-7">
        <div className="flex flex-wrap gap-2">
          {capabilityDefinitions.map((item) => {
            const active = item.slug === activeCapability;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setActiveCapability(item.slug);
                  setPrompt(item.samplePrompt);
                }}
                className={`rounded-[14px] border px-4 py-2 text-sm transition ${
                  active
                    ? "border-[var(--accent-lilac)] text-white shadow-[0_0_0_1px_rgba(183,182,233,0.16)]"
                    : "border-white/8 text-white/44 hover:border-white/16 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-[18px] border border-white/8 bg-black/20 p-5">
              <div className="text-sm italic leading-8 text-white/52">“{capability.samplePrompt}”</div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-white/40">What do you want your agent to do?</div>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={4}
                className="min-h-[128px] w-full rounded-[18px] border border-white/10 bg-[#0b0c0e]/90 px-4 py-4 text-sm text-white outline-none placeholder:text-white/24 focus:border-[var(--accent-lilac)]"
                placeholder="Deploy my app, review PRs, inspect my DB, test a browser flow, or set up wallet-powered paid requests..."
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {capabilityDefinitions.slice(0, 4).map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => {
                    setActiveCapability(item.slug);
                    setPrompt(item.samplePrompt);
                  }}
                  className="rounded-full border border-white/8 px-3 py-1.5 font-mono text-xs text-white/44 transition hover:border-white/16 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[22px] border border-white/8 bg-[#0b0c0e]/82 p-5">
            {recommendation ? (
              <>
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                  <div>
                    <div className="section-kicker">Backbone recommendation</div>
                    <div className="mt-2 text-2xl font-medium text-white">{recommendation.primary.shortName}</div>
                    <div className="mt-1 text-sm text-white/40">{recommendation.primary.name}</div>
                  </div>
                  <div className="text-right">
                    {recommendation.primary.metricValue !== null && recommendation.primary.metricLabel ? (
                      <>
                        <div className="text-xl font-medium text-[var(--accent-peach)]">
                          {formatCompactNumber(recommendation.primary.metricValue)}
                        </div>
                        <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#d8ab86]">
                          {recommendation.primary.metricLabel}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-white/28">Why this one</div>
                    <p className="mt-3 text-sm leading-7 text-white/66">{recommendation.rationale}</p>
                  </div>

                  <div className="space-y-3 border-l border-white/8 pl-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-white/28">Install</div>
                      <div className="mt-2 flex items-center justify-between gap-4 rounded-[16px] border border-white/8 bg-white/[0.02] px-4 py-3">
                        <code className="overflow-x-auto font-mono text-sm text-white/84">$ {recommendation.primary.installCommand}</code>
                        <CopyButton compact value={recommendation.primary.installCommand} />
                      </div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-white/28">Verify</div>
                      <div className="mt-2 flex items-center justify-between gap-4 rounded-[16px] border border-white/8 bg-white/[0.02] px-4 py-3">
                        <code className="overflow-x-auto font-mono text-sm text-white/74">$ {recommendation.verifyCommand}</code>
                        <CopyButton compact value={recommendation.verifyCommand} label="Copy verify" />
                      </div>
                      <p className="mt-2 text-sm text-white/42">{recommendation.verifySignal}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {recommendation.setupSteps.map((step, index) => (
                      <div key={step} className="rounded-[16px] border border-white/8 bg-white/[0.02] p-4">
                        <div className="font-mono text-xs text-[var(--accent-peach)]">0{index + 1}</div>
                        <p className="mt-3 text-sm leading-7 text-white/64">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-white/28">Skill</div>
                        <div className="mt-2 text-sm text-white/68">{recommendation.skillTitle}</div>
                      </div>
                      <CopyButton compact value={recommendation.skillBody} label="Copy skill" />
                    </div>
                    <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-white/58">
                      {recommendation.skillBody}
                    </pre>
                  </div>

                  <div className="rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-white/28">Ralph loop</div>
                    <div className="mt-2 text-sm text-white/68">{recommendation.loopName}</div>
                    <div className="mt-4 space-y-3">
                      {recommendation.loopSteps.map((step, index) => (
                        <div key={step} className="flex gap-3">
                          <div className="mt-0.5 font-mono text-xs text-[var(--accent-peach)]">0{index + 1}</div>
                          <p className="text-sm leading-7 text-white/62">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {recommendation.alternatives.length > 0 ? (
                    <div className="rounded-[18px] border border-white/8 bg-white/[0.02] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-white/28">Alternatives</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {recommendation.alternatives.map((cli) => (
                          <Link
                            key={cli.slug}
                            href={`/cli/${cli.slug}`}
                            className="rounded-full border border-white/8 px-3 py-1.5 text-sm text-white/60 transition hover:border-white/16 hover:text-white"
                          >
                            {cli.shortName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onUseRecommendation(prompt)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white/84 transition hover:border-white/18 hover:bg-white/[0.07]"
                  >
                    Search this in the directory
                  </button>
                  <Link
                    href={`/cli/${recommendation.primary.slug}`}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-5 text-sm text-white/56 transition hover:border-white/18 hover:text-white"
                  >
                    Open {recommendation.primary.shortName} →
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-sm text-white/48">Describe the job and Open CLI will recommend an agent-ready capability pack.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
