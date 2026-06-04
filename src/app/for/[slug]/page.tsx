import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { capabilityDefinitions, getCapabilityBySlug } from "@/lib/capabilities";
import { formatCompactNumber } from "@/lib/format";
import { buildSuperchargeRecommendation, type SuperchargeRecommendation } from "@/lib/supercharge";

const taskIntents: Record<string, string[]> = {
  github: ["review pull requests", "triage issues", "inspect GitHub Actions"],
  deploy: ["deploy a preview", "inspect deployment logs", "rollback safely"],
  database: ["inspect a database", "query CSVs with SQL", "review schema changes"],
  browser: ["test a web flow", "crawl a website", "capture screenshots"],
  ai: ["set up coding agents", "run local models", "compare AI CLIs"],
  infra: ["inspect Kubernetes", "review Terraform", "scan containers"],
  wallet: ["preview paid requests", "discover wallet services", "make agent payments safely"],
  research: ["research a topic", "collect web sources", "extract paper notes"],
  documents: ["process PDFs", "convert Markdown", "OCR scanned docs"],
  "knowledge-files": ["search notes", "find documents", "sync cloud files"],
  spreadsheets: ["clean CSV data", "inspect spreadsheets", "transform tables"],
  media: ["transcribe audio", "extract video metadata", "summarize meeting recordings"],
  "email-calendar": ["search email", "review calendar", "draft replies safely"],
  "project-management": ["summarize todos", "inspect projects", "draft status updates"],
};

type ForPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return capabilityDefinitions.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({ params }: ForPageProps): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapabilityBySlug(slug);
  if (!capability) return { title: "Task stack not found • Open CLI" };

  return {
    title: `Best CLIs for ${capability.label} • Open CLI`,
    description: `${capability.blurb} Get install commands, verify checks, agent packs, and safe alternatives.`,
  };
}

function buildRunbook(recommendation: SuperchargeRecommendation) {
  const stack = recommendation.stack.map((item) => `${item.role}\n- CLI: ${item.cli.name} (${item.cli.shortName})\n- Install: ${item.cli.installCommand}\n- Verify: ${item.verifyCommand}\n- Agent pack: https://opencli.co${item.agentPackUrl}`).join("\n\n");

  return `OpenCLI runbook: ${recommendation.capability.label}

Primary CLI: ${recommendation.primary.name} (${recommendation.primary.shortName})
Install: ${recommendation.primary.installCommand}
Verify: ${recommendation.verifyCommand}
Expected signal: ${recommendation.verifySignal}
Agent pack: https://opencli.co${recommendation.agentPackUrl}

Why:
${recommendation.whyReasons.map((reason) => `- ${reason}`).join("\n")}

Stack:
${stack || "Use the primary CLI above."}

Loop:
${recommendation.loopSteps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

Guardrails:
${recommendation.watchouts.map((watchout) => `- ${watchout}`).join("\n")}
- Ask before destructive, paid, deploy, send, merge, publish, or secret-exposing actions.
`;
}

export default async function ForCapabilityPage({ params }: ForPageProps) {
  const { slug } = await params;
  const capability = getCapabilityBySlug(slug);
  if (!capability) notFound();

  const recommendation = buildSuperchargeRecommendation(capability.samplePrompt, capability.slug);
  if (!recommendation) notFound();

  const intents = taskIntents[capability.slug] ?? capability.searchTerms.slice(0, 3);
  const runbook = buildRunbook(recommendation);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <nav className="flex items-center gap-1.5 font-mono text-sm text-white/46">
            <Link href="/" className="transition hover:text-white">open-cli</Link>
            <span>/</span>
            <span>for</span>
            <span>/</span>
            <span className="text-white/64">{capability.slug}</span>
          </nav>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/58">
                <span className="size-1.5 rounded-full bg-[#217EFF]" />
                Curated task stack
              </div>
              <div className="space-y-5">
                <h1 className="max-w-[12ch] text-balance text-5xl font-medium tracking-[-0.055em] text-white sm:text-7xl">
                  Best CLIs for {capability.label}.
                </h1>
                <p className="max-w-3xl text-pretty text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                  {capability.blurb} This is a ready-to-share stack with install commands, verification checks, agent packs, and guardrails.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {intents.map((intent) => (
                  <Link
                    key={intent}
                    href={`/recommend?q=${encodeURIComponent(intent)}`}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-white/58 transition hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
                  >
                    {intent} →
                  </Link>
                ))}
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] sm:p-5 lg:sticky lg:top-20">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">Copy this</div>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">Agent runbook</h2>
              <p className="mt-2 text-sm leading-6 text-white/52">Paste this into Pi, Claude Code, Codex, Amp, or another agent before giving it the real work.</p>
              <div className="mt-4 grid gap-2">
                <CopyButton value={runbook} label="Copy runbook" />
                <CopyButton value={recommendation.primary.installCommand} label="Copy primary install" />
                <Link href={`/recommend?q=${encodeURIComponent(capability.samplePrompt)}`} className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm text-white/62 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">
                  Share recommendation
                </Link>
              </div>
            </aside>
          </section>

          <section className="overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.045]">
            <div className="border-b border-white/8 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">Primary CLI</div>
                  <Link href={`/cli/${recommendation.primary.slug}`} className="mt-2 inline-block text-4xl font-medium tracking-[-0.045em] text-white transition hover:text-white/82">
                    {recommendation.primary.name}
                  </Link>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/56">{recommendation.rationale}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <CopyButton compact value={recommendation.primary.installCommand} label="Install" />
                  <CopyButton compact value={recommendation.verifyCommand} label="Verify" />
                  <Link href={recommendation.agentPackUrl} className="inline-flex h-8 items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-sm text-white/62 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">
                    Agent pack
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid gap-0 divide-y divide-white/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {recommendation.whyReasons.map((reason) => (
                <div key={reason} className="p-4 text-sm leading-6 text-white/62 sm:p-5">{reason}</div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">Stack</div>
                <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-white">Install, verify, then work.</h2>
              </div>
              <CopyButton compact value={recommendation.stack.map((item) => `${item.cli.installCommand}\n${item.verifyCommand}`).join("\n")} label="Copy stack" />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {recommendation.stack.map((item, index) => (
                <article key={`${item.role}-${item.cli.slug}`} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/16 hover:bg-white/[0.05] sm:p-5">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">{index + 1}. {item.role}</div>
                  <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link href={`/cli/${item.cli.slug}`} className="text-2xl font-medium tracking-[-0.03em] text-white transition hover:text-white/82">{item.cli.name}</Link>
                      <MetricLine item={item.cli} />
                    </div>
                    <Link href={item.agentPackUrl} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/62 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">Pack</Link>
                  </div>
                  <div className="mt-4 grid gap-2">
                    <CommandLine label="Install" command={item.cli.installCommand} />
                    <CommandLine label="Verify" command={item.verifyCommand} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">Agent loop</div>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">{recommendation.loopName}</h2>
              <ol className="mt-4 space-y-3">
                {recommendation.loopSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-white/58">
                    <span className="font-mono text-white/30">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-[26px] border border-amber-200/12 bg-amber-200/[0.035] p-5">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-amber-100/42">Safety</div>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">Guardrails</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-50/62">
                {recommendation.watchouts.map((watchout) => <li key={watchout}>• {watchout}</li>)}
                <li>• Ask before destructive, paid, deploy, send, merge, publish, or secret-exposing actions.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function MetricLine({ item }: { item: SuperchargeRecommendation["primary"] }) {
  if (item.metricValue !== null && item.metricLabel) {
    return <p className="mt-1 text-sm text-white/46">{formatCompactNumber(item.metricValue)} {item.metricLabel.toLowerCase()}</p>;
  }
  return <p className="mt-1 text-sm text-white/46">Curated OpenCLI pick</p>;
}

function CommandLine({ label, command }: { label: string; command: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/12 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/34">{label}</span>
        <CopyButton compact value={command} label="Copy" />
      </div>
      <code className="block overflow-x-auto whitespace-nowrap font-mono text-sm text-white/80">{command}</code>
    </div>
  );
}
