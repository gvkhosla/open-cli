import type { Metadata } from "next";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { capabilityDefinitions } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Agent guide • Open CLI",
  description: "How to use OpenCLI as a source of safe command-line capabilities for AI agents.",
};

const agentSystemPrompt = `Use OpenCLI to choose and safely operate command-line tools.

Workflow:
1. Describe the task in terms of the user's desired outcome.
2. Use OpenCLI to identify the right CLI and open its /agent.md pack.
3. Install only if the CLI is missing.
4. Run the verify command before task commands.
5. Start read-only. Summarize findings.
6. Ask before destructive, paid, deploy, merge, delete, transfer, publish, or secret-exposing actions.`;

export default function AgentGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/12 bg-cyan-300/[0.04] px-3 py-1 text-sm text-cyan-100/70">
              <span className="size-1.5 rounded-full bg-cyan-300/70" />
              Agent-readable CLI knowledge
            </div>
            <div className="space-y-4">
              <h1 className="max-w-[12ch] text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                OpenCLI is built for agents.
              </h1>
              <p className="max-w-[62ch] text-pretty text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Every tool gets a plain Markdown agent pack: what the CLI is for, how to install it, how to verify it, safe starting commands, and guardrails for automation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#directory" className="inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-medium text-black transition hover:bg-white/90">
                Build an agent pack
              </Link>
              <a href="/llms.txt" className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/70 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">
                Open llms.txt
              </a>
            </div>
          </div>

          <aside className="ui-panel-soft rounded-[26px] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="ui-label">Agent system prompt</div>
                <p className="mt-2 text-sm leading-6 text-white/56">Paste this into your agent to teach it how to use OpenCLI.</p>
              </div>
              <CopyButton compact value={agentSystemPrompt} label="Copy" />
            </div>
            <pre className="mt-4 max-h-[360px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/8 bg-black/20 p-4 font-mono text-sm leading-6 text-white/70">{agentSystemPrompt}</pre>
          </aside>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            ["/llms.txt", "Machine index", "A top-level map of OpenCLI for crawlers and AI agents."],
            ["/cli/gh/agent.md", "CLI agent packs", "Plain Markdown briefs for each command-line tool."],
            ["/#directory", "Task router", "Describe an outcome and get the safest CLI path."],
          ].map(([href, title, body]) => (
            <a key={href} href={href} className="group rounded-[24px] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.055]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-medium tracking-tight text-white">{title}</h2>
                <span className="text-white/24 transition group-hover:translate-x-0.5 group-hover:text-cyan-200/70">→</span>
              </div>
              <p className="mt-3 text-base leading-7 text-white/58 sm:text-sm sm:leading-6">{body}</p>
              <code className="mt-4 block truncate font-mono text-sm text-white/36">{href}</code>
            </a>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="ui-label">Recipes by capability</div>
              <h2 className="mt-2 text-3xl font-medium tracking-tight text-white">Start with the job, not the tool.</h2>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {capabilityDefinitions.map((capability) => (
              <Link key={capability.slug} href={`/?q=${encodeURIComponent(capability.samplePrompt)}`} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/16 hover:bg-white/[0.05]">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-medium text-white">{capability.label}</h3>
                  <span className="font-mono text-xs text-white/34">{capability.candidateSlugs.slice(0, 3).join(" / ")}</span>
                </div>
                <p className="mt-2 text-base leading-7 text-white/58 sm:text-sm sm:leading-6">{capability.blurb}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
