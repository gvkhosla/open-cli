"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function TerminalMockup() {
  const [lines, setLines] = useState<string[]>([]);
  const fullLines = [
    { text: "$ opencli search \"deploy next.js\"", delay: 0 },
    { text: "→ Vercel CLI  —  4.2M installs", delay: 400 },
    { text: "→ Railway CLI —  890K installs", delay: 550 },
    { text: "→ flyctl      —  2.1M installs", delay: 700 },
    { text: "", delay: 900 },
    { text: "$ opencli install vercel", delay: 1100 },
    { text: "✓ Installed  vercel@latest", delay: 1500 },
    { text: "✓ Verified   vercel --version", delay: 1700 },
  ];

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    fullLines.forEach((line) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
      }, line.delay + 600);
      timeouts.push(t);
    });
    const reset = setTimeout(() => {
      setLines([]);
    }, 4000);
    timeouts.push(reset);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-sm xl:max-w-md">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent opacity-60 blur-xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]/90 shadow-2xl backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
          <span className="ml-3 font-mono text-[10px] text-white/25">opencli — zsh</span>
        </div>
        {/* Terminal body */}
        <div className="p-4 font-mono text-[13px] leading-6 sm:text-sm">
          <div className="text-white/40">
            <span className="text-cyan-400/70">$</span> opencli --help
          </div>
          <div className="mt-1 text-white/30">Search and install the right CLI for any job.</div>
          <div className="mt-3 space-y-1">
            {lines.map((line, i) => (
              <motion.div
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={
                  line.startsWith("$")
                    ? "text-white/50"
                    : line.startsWith("→")
                    ? "text-white/70"
                    : line.startsWith("✓")
                    ? "text-emerald-400/80"
                    : "text-white/40"
                }
              >
                {line.startsWith("$") ? (
                  <>
                    <span className="text-cyan-400/70">$</span>{" "}
                    <span className="text-white/60">{line.slice(2)}</span>
                    {i === lines.length - 1 && lines.length < fullLines.length && (
                      <span className="terminal-cursor" />
                    )}
                  </>
                ) : (
                  line
                )}
              </motion.div>
            ))}
            {lines.length === 0 && (
              <div className="text-white/20">
                <span className="text-cyan-400/70">$</span>{" "}
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        </div>
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </div>
  );
}

function StatPill({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
      <span className="text-sm font-semibold text-white/90">{value}</span>
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
      {/* Background glow */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/[0.035] blur-3xl" />
      <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="space-y-6">
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/40 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400/60" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-white/50">
              Task-first CLI directory
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="space-y-3"
          >
            <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.05em]">
              <span className="gradient-text-hero">Find the right CLI</span>
              <br />
              <span className="text-white/50">for the job.</span>
            </h1>
            <p className="max-w-lg text-base leading-7 text-white/55 sm:text-[17px] sm:leading-8">
              Search by task when you are exploring, or type the exact tool when you already know
              what you want. Get install commands, verify steps, and companion skills.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <StatPill value={stats.total.toLocaleString()} label="tools" />
            <StatPill value={stats.official} label="official" />
            <StatPill value={stats.builders} label="builder-made" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <a
              href="#directory"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Explore directory
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 2l5 5-5 5" />
              </svg>
            </a>
            <a
              href="https://github.com/gvkhosla/open-cli"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white/70 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Terminal visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <TerminalMockup />
        </motion.div>
      </div>
    </section>
  );
}
