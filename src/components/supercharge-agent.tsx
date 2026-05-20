"use client";

import { motion } from "motion/react";

const stackPreview = [
  { name: "gh", role: "Pull requests + issues", score: "94", tone: "from-cyan-300/18" },
  { name: "vercel", role: "Preview deploys + logs", score: "82", tone: "from-white/14" },
  { name: "playwright", role: "Browser checks", score: "88", tone: "from-emerald-300/14" },
];

const workExamples = ["Review PRs", "Deploy preview", "Inspect DB", "Test signup"];

function StackPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0">
      <div className="absolute -inset-6 rounded-[42px] bg-cyan-300/8 blur-3xl" />
      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-cyan-200/40 to-transparent" />
        <div className="rounded-[26px] border border-white/10 bg-[#0b1118]/80 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="ui-label">Work request</div>
              <p className="mt-2 text-base leading-7 text-white/78 sm:text-sm sm:leading-6">Ship my app, check the preview, then open a PR note.</p>
            </div>
            <div className="rounded-full border border-cyan-200/14 bg-cyan-200/[0.06] px-3 py-1 font-mono text-sm text-cyan-100/70">agent-ready</div>
          </div>
        </div>

        <div className="mt-3 space-y-2.5">
          {stackPreview.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", visualDuration: 0.45, bounce: 0.14, delay: 0.18 + index * 0.08 }}
              className={`group relative overflow-hidden rounded-[22px] border border-white/10 bg-linear-to-br ${item.tone} to-white/[0.035] p-4 transition hover:border-white/16`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-black/18 font-mono text-sm text-white/82">{index + 1}</div>
                  <div className="min-w-0">
                    <div className="font-mono text-base text-white">{item.name}</div>
                    <div className="truncate text-sm text-white/50">{item.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg text-white tabular-nums">{item.score}</div>
                  <div className="text-[10px] uppercase tracking-wide text-white/34">score</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            "Install + verify",
            "Safe first commands",
            "Guardrails",
            "Copy agent pack",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-white/54">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatPill({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
      <span className="text-sm font-semibold text-white/90 tabular-nums">{value}</span>
      <span className="text-[11px] uppercase tracking-[0.12em] text-white/40">{label}</span>
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
    <section className="relative">
      <div className="absolute -left-24 -top-24 size-72 rounded-full bg-cyan-400/[0.045] blur-3xl" />
      <div className="absolute -right-16 top-8 size-56 rounded-full bg-emerald-300/[0.035] blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200/12 bg-cyan-200/[0.04] px-3 py-1"
          >
            <span className="size-1.5 rounded-full bg-cyan-300/70" />
            <span className="text-sm font-medium text-cyan-50/62">CLI stacks for agent work</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="max-w-[12ch] text-balance text-[clamp(3rem,7vw,5.8rem)] font-semibold tracking-[-0.07em] text-white">
              Bring the work. Get the CLI stack.
            </h1>
            <p className="max-w-[58ch] text-pretty text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Tell OpenCLI what you or your agent are trying to accomplish. We map the job to the right set of CLIs, verify steps, safe commands, and copyable agent instructions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="flex flex-wrap gap-2"
          >
            {workExamples.map((example) => (
              <a key={example} href="#directory" className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-white/58 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">
                {example}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <StatPill value={stats.total.toLocaleString()} label="tools" />
            <StatPill value={stats.official} label="official" />
            <StatPill value={stats.builders} label="builder-made" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <a href="#directory" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-black transition hover:bg-white/90">
              Describe your work
              <svg className="size-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 2l5 5-5 5" />
              </svg>
            </a>
            <a href="/agent" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/70 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">
              How agents use it
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <StackPreview />
        </motion.div>
      </div>
    </section>
  );
}
