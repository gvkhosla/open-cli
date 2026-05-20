"use client";

import { motion } from "motion/react";

type SuperchargeAgentProps = {
  stats: {
    total: number;
    official: number;
    builders: number;
  };
};

export function SuperchargeAgent({ stats }: SuperchargeAgentProps) {
  return (
    <section className="py-14 text-center sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-7"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1E1D] px-3 py-1.5 text-sm text-[#868684]">
          <span className="size-1.5 rounded-full bg-[#217EFF]" />
          {stats.total.toLocaleString()} CLIs tracked for agent work
        </div>

        <div className="space-y-5">
          <h1 className="mx-auto max-w-[13ch] text-balance text-5xl font-medium tracking-[-0.03em] text-white sm:text-6xl lg:text-[68px]">
            Describe the work. Get the CLI stack.
          </h1>
          <p className="mx-auto max-w-[60ch] text-pretty text-base leading-7 text-[#868684] sm:text-[19px] sm:leading-8">
            OpenCLI turns jobs like reviewing PRs, deploying previews, or inspecting databases into the right tools, verify commands, and agent-safe instructions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#afaeac]">
          {['review PRs', 'deploy preview', 'inspect database', 'test signup flow'].map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-[#1E1E1D] px-3 py-1.5">{item}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
