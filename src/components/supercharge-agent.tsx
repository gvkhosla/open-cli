"use client";

import { motion } from "motion/react";

const stackPreview = [
  { name: "gh", role: "Pull requests", score: "94" },
  { name: "vercel", role: "Preview deploys", score: "82" },
  { name: "playwright", role: "Browser checks", score: "88" },
];

const workExamples = ["Review PRs", "Deploy preview", "Inspect DB", "Test signup"];

function StackPreview() {
  return (
    <div className="rounded-3xl bg-[#1f1f29] p-4 shadow-[var(--shadow-card)] ring-1 ring-black/5">
      <div className="rounded-2xl bg-white/6 p-4 backdrop-blur">
        <div className="text-sm font-medium text-white">Recommended stack</div>
        <p className="mt-1 text-sm text-white/54">For: ship preview + write PR note</p>
      </div>
      <div className="mt-3 divide-y divide-white/8 rounded-2xl bg-white/5">
        {stackPreview.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/8 font-mono text-sm text-white/72">{index + 1}</div>
              <div className="min-w-0">
                <div className="font-mono text-sm text-white">{item.name}</div>
                <div className="truncate text-sm text-white/46">{item.role}</div>
              </div>
            </div>
            <div className="font-mono text-sm text-white/72 tabular-nums">{item.score}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/54">
        <div className="rounded-xl bg-white/6 p-3">Verify first</div>
        <div className="rounded-xl bg-white/6 p-3">Copy agent pack</div>
      </div>
    </div>
  );
}

type SuperchargeAgentProps = {
  stats: {
    total: number;
    official: number;
    builders: number;
  };
};

export function SuperchargeAgent({ stats }: SuperchargeAgentProps) {
  return (
    <section className="grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-14">
      <div className="space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full bg-[#f9faf7] px-3 py-1 text-sm text-[#444141] shadow-[var(--shadow-nav)] ring-1 ring-black/5"
        >
          <span className="size-1.5 rounded-full bg-[#0081c0]" />
          Work-to-CLI routing for agents
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="max-w-[13ch] text-balance text-5xl font-medium tracking-tight text-[#171717] sm:text-6xl lg:text-7xl">
            What are you trying to get done?
          </h1>
          <p className="max-w-[58ch] text-pretty text-base leading-7 text-[#646464] sm:text-lg sm:leading-8">
            Describe the work. OpenCLI recommends the right command-line stack with install commands, verify steps, and guardrails agents can follow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          className="flex flex-wrap gap-2"
        >
          {workExamples.map((example) => (
            <a key={example} href="#directory" className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-[#444141] shadow-[var(--shadow-sm-2)] transition hover:border-[#41a1cf] hover:text-[#171717]">
              {example}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-3"
        >
          <a href="#directory" className="inline-flex h-10 items-center gap-2 rounded bg-[#1f1f29] px-4 text-sm font-medium text-white transition hover:bg-[#282834]">
            Describe your work
            <svg className="size-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </a>
          <a href="/radar" className="inline-flex h-10 items-center rounded border border-[#41a1cf] px-4 text-sm font-medium text-[#171717] transition hover:bg-[#f9faf7]">
            See Radar
          </a>
          <div className="text-sm text-[#646464] tabular-nums">{stats.total.toLocaleString()} tools tracked</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
        className="hidden lg:block"
      >
        <StackPreview />
      </motion.div>
    </section>
  );
}
