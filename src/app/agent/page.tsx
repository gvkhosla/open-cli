import type { Metadata } from "next";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Agent guide • Open CLI",
  description: "A simple handoff for using OpenCLI with Claude Code, Pi, Codex, Cursor, and other agents.",
};

const agentPrompt = `Use OpenCLI to choose command-line tools for the user's work.

1. Ask what work the user wants done.
2. Search opencli.co with that task, not a tool name unless the user already chose one.
3. Prefer the recommended CLI stack and open each /cli/{slug}/agent.md pack.
4. Install only if missing.
5. Run the verify command before real work.
6. Start read-only and summarize findings.
7. Ask before sending email, changing calendars, deploying, spending money, deleting data, merging code, posting messages, or exposing secrets.`;

const steps = [
  ["1", "Describe the work", "Start with the job: search email, process PDFs, clean a CSV, review PRs, deploy a preview."],
  ["2", "Get the CLI stack", "OpenCLI recommends tools, install commands, verify checks, and alternatives."],
  ["3", "Copy agent packs", "Each CLI has /agent.md with safe commands and guardrails your agent can follow."],
];

export default function AgentGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <section className="space-y-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E1E1D] px-3 py-1.5 text-sm text-[#868684]">
            <span className="size-1.5 rounded-full bg-[#217EFF]" />
            For Claude Code, Pi, Codex, Cursor, and other agents
          </div>
          <div className="space-y-5">
            <h1 className="mx-auto max-w-[12ch] text-balance text-5xl font-medium tracking-[-0.03em] text-white sm:text-6xl">
              How agents should use OpenCLI.
            </h1>
            <p className="mx-auto max-w-[64ch] text-pretty text-base leading-7 text-[#868684] sm:text-[19px] sm:leading-8">
              OpenCLI is a router from work to command-line capability. Paste the prompt below into your agent, then give it an OpenCLI page or task.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <CopyButton value={agentPrompt} label="Copy agent prompt" />
            <Link href="/#directory" className="inline-flex h-10 items-center rounded border border-[#217EFF]/70 bg-[#217EFF] px-3 text-sm font-medium text-white transition hover:bg-[#217EFF]/85">
              Try the router
            </Link>
            <a href="/llms.txt" className="inline-flex h-10 items-center rounded border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/72 transition hover:text-white">
              llms.txt
            </a>
          </div>
        </section>

        <section className="mt-12 grid gap-3 sm:grid-cols-3">
          {steps.map(([number, title, body]) => (
            <div key={number} className="rounded-lg border border-white/10 bg-[#1E1E1D] p-4">
              <div className="font-mono text-sm text-[#6F839F]">{number}</div>
              <h2 className="mt-3 text-xl font-medium tracking-tight text-white">{title}</h2>
              <p className="mt-2 text-base leading-7 text-[#868684] sm:text-sm sm:leading-6">{body}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-lg border border-white/10 bg-[#1E1E1D] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-white">Agent prompt</h2>
              <p className="mt-2 text-base leading-7 text-[#868684] sm:text-sm sm:leading-6">This is the whole handoff. Keep it short and pasteable.</p>
            </div>
            <CopyButton compact value={agentPrompt} label="Copy" />
          </div>
          <pre className="mt-4 overflow-auto whitespace-pre-wrap rounded bg-[#121212] p-4 font-mono text-sm leading-6 text-[#FAFAFA] ring-1 ring-white/10">{agentPrompt}</pre>
        </section>
      </main>
    </>
  );
}
