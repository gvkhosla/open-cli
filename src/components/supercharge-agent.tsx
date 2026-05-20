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
    <section className="py-12 text-center sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f9faf7] px-3 py-1 text-sm text-[#444141] shadow-[var(--shadow-sm-2)]">
          <span className="size-1.5 rounded-full bg-[#0081c0]" />
          {stats.total.toLocaleString()} CLIs tracked for agent work
        </div>

        <div className="space-y-4">
          <h1 className="mx-auto max-w-[12ch] text-balance text-5xl font-medium tracking-tight text-[#171717] sm:text-6xl lg:text-7xl">
            Describe the work. Get the CLI stack.
          </h1>
          <p className="mx-auto max-w-[62ch] text-pretty text-base leading-7 text-[#646464] sm:text-lg sm:leading-8">
            OpenCLI turns a job like “review my PRs” or “deploy this app” into the right tools, verify commands, and agent-safe instructions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#646464]">
          <span className="rounded-full bg-[#f9faf7] px-3 py-1 ring-1 ring-black/5">review PRs</span>
          <span className="rounded-full bg-[#f9faf7] px-3 py-1 ring-1 ring-black/5">deploy preview</span>
          <span className="rounded-full bg-[#f9faf7] px-3 py-1 ring-1 ring-black/5">inspect database</span>
          <span className="rounded-full bg-[#f9faf7] px-3 py-1 ring-1 ring-black/5">test signup flow</span>
        </div>
      </motion.div>
    </section>
  );
}
