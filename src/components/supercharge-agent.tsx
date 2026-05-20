"use client";

import { motion } from "motion/react";

type SuperchargeAgentProps = {
  stats: {
    total: number;
    official: number;
    builders: number;
  };
  onSelectWork?: (work: string) => void;
};

const workPrompts = [
  { label: "research topic", prompt: "research a topic from web pages and PDFs" },
  { label: "process PDFs", prompt: "extract and summarize text from PDFs" },
  { label: "clean CSV", prompt: "inspect and clean a CSV spreadsheet" },
  { label: "search notes", prompt: "search my notes and documents for context" },
  { label: "transcribe audio", prompt: "transcribe meeting audio and produce notes" },
  { label: "review PRs", prompt: "review pull requests" },
] as const;

export function SuperchargeAgent({ stats, onSelectWork }: SuperchargeAgentProps) {
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
            OpenCLI turns jobs like researching topics, processing PDFs, cleaning CSVs, or reviewing PRs into the right tools, verify commands, and agent-safe instructions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#afaeac]">
          {workPrompts.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelectWork?.(item.prompt)}
              className="rounded-full border border-white/10 bg-[#1E1E1D] px-3 py-1.5 transition hover:border-[#217EFF]/70 hover:bg-[#2f2f2f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#217EFF]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
