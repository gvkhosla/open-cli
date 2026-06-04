import type { Metadata } from "next";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { formatCompactNumber } from "@/lib/format";
import { buildSuperchargeRecommendation, type SuperchargeRecommendation } from "@/lib/supercharge";

export const metadata: Metadata = {
  title: "CLI stack recommendation • Open CLI",
  description: "A shareable OpenCLI recommendation with install commands, verify checks, agent packs, alternatives, and safety guardrails.",
};

type RecommendPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const examples = [
  "process PDFs",
  "clean CSV spreadsheet",
  "review pull requests",
  "research a topic",
  "deploy a preview",
  "transcribe meeting audio",
];

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function buildShareUrl(query: string) {
  return `https://opencli.co/recommend?q=${encodeURIComponent(query)}`;
}

function buildAgentBrief(recommendation: SuperchargeRecommendation, query: string) {
  const stack = recommendation.stack.length > 0
    ? recommendation.stack.map((item) => `- ${item.role}: ${item.cli.name} (${item.cli.shortName})\n  Install: ${item.cli.installCommand}\n  Verify: ${item.verifyCommand}\n  Agent pack: https://opencli.co${item.agentPackUrl}`).join("\n")
    : `- ${recommendation.primary.name} (${recommendation.primary.shortName})\n  Install: ${recommendation.primary.installCommand}\n  Verify: ${recommendation.verifyCommand}\n  Agent pack: https://opencli.co${recommendation.agentPackUrl}`;

  return `OpenCLI recommendation for: ${query || recommendation.capability.label}

Primary CLI: ${recommendation.primary.name} (${recommendation.primary.shortName})
Capability: ${recommendation.capability.label}
Rationale: ${recommendation.rationale}

Why:
${recommendation.whyReasons.map((reason) => `- ${reason}`).join("\n")}

Install primary:
${recommendation.primary.installCommand}

Verify primary before real work:
${recommendation.verifyCommand}
Expected signal: ${recommendation.verifySignal}

Recommended stack:
${stack}

Agent loop: ${recommendation.loopName}
${recommendation.loopSteps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

Watch-outs:
${recommendation.watchouts.map((watchout) => `- ${watchout}`).join("\n")}

Before destructive, paid, deploy, merge, delete, publish, transfer, send-email, calendar-edit, or secret-exposing actions, ask the user for confirmation.

Shareable OpenCLI URL: ${buildShareUrl(query)}
`;
}

function buildInstallScript(recommendation: SuperchargeRecommendation) {
  const commands = [
    recommendation.primary.installCommand,
    ...recommendation.stack.map((item) => item.cli.installCommand),
    recommendation.verifyCommand,
    ...recommendation.stack.map((item) => item.verifyCommand),
  ].filter((command, index, array) => command && array.indexOf(command) === index);

  return commands.join("\n");
}

export default async function RecommendPage({ searchParams }: RecommendPageProps) {
  const params = await searchParams;
  const query = getSingleParam(params.q).trim();
  const capability = getSingleParam(params.capability).trim() || undefined;
  const recommendation = query || capability ? buildSuperchargeRecommendation(query, capability) : null;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {!recommendation ? <EmptyRecommendation /> : <RecommendationView query={query} recommendation={recommendation} />}
      </main>
    </>
  );
}

function EmptyRecommendation() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/58">
        <span className="size-1.5 rounded-full bg-[#217EFF]" />
        Shareable CLI stack router
      </div>
      <div className="space-y-5">
        <h1 className="mx-auto max-w-[13ch] text-balance text-5xl font-medium tracking-[-0.05em] text-white sm:text-7xl">
          Turn work into a CLI stack.
        </h1>
        <p className="mx-auto max-w-[62ch] text-pretty text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
          OpenCLI gives you the primary tool, supporting stack, install commands, verify checks, agent packs, and guardrails in one permalink.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <Link
            key={example}
            href={`/recommend?q=${encodeURIComponent(example)}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-white/18 hover:bg-white/[0.06]"
          >
            <div className="text-sm font-medium text-white/88">{example}</div>
            <div className="mt-2 text-sm text-white/42 transition group-hover:text-white/56">Get stack →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RecommendationView({ query, recommendation }: { query: string; recommendation: SuperchargeRecommendation }) {
  const agentBrief = buildAgentBrief(recommendation, query);
  const installScript = buildInstallScript(recommendation);
  const shareUrl = buildShareUrl(query);

  return (
    <div className="space-y-8">
      <nav className="flex items-center gap-1.5 font-mono text-sm text-white/46">
        <Link href="/" className="transition hover:text-white">open-cli</Link>
        <span>/</span>
        <span className="text-white/64">recommend</span>
      </nav>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <article className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#217EFF]/24 bg-[#217EFF]/10 px-3 py-1.5 text-sm text-blue-100/80">
              <span className="size-1.5 rounded-full bg-[#217EFF]" />
              {recommendation.matchType === "direct" ? "Direct CLI match" : "Intent-based stack"}
            </div>
            <h1 className="text-balance text-5xl font-medium tracking-[-0.055em] text-white sm:text-7xl">
              {query ? `CLI stack for ${query}.` : `${recommendation.capability.label} CLI stack.`}
            </h1>
            <p className="max-w-3xl text-pretty text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
              {recommendation.rationale} Use this page as a permalink for humans, agents, and runbooks.
            </p>
          </div>

          <PrimaryCard recommendation={recommendation} />

          <section className="space-y-3">
            <h2 className="text-2xl font-medium tracking-[-0.03em] text-white">Recommended stack</h2>
            <div className="grid gap-3">
              {recommendation.stack.map((item, index) => (
                <div key={`${item.role}-${item.cli.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/16 hover:bg-white/[0.05]">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">{index + 1}. {item.role}</div>
                      <Link href={`/cli/${item.cli.slug}`} className="mt-2 inline-block text-xl font-medium tracking-tight text-white transition hover:text-white/80">
                        {item.cli.name}
                      </Link>
                      <p className="mt-1 text-sm text-white/46">Verify: <code className="font-mono text-white/70">{item.verifyCommand}</code></p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <CopyButton compact value={item.cli.installCommand} label="Install" />
                      <CopyButton compact value={item.verifyCommand} label="Verify" />
                      <Link href={item.agentPackUrl} className="inline-flex h-8 items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-sm text-white/62 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">
                        Pack
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {recommendation.alternatives.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-2xl font-medium tracking-[-0.03em] text-white">Alternatives</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendation.alternatives.slice(0, 6).map((alternative) => (
                  <Link key={alternative.slug} href={`/cli/${alternative.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/16 hover:bg-white/[0.05]">
                    <div className="text-sm font-medium text-white/86">{alternative.name}</div>
                    <p className="mt-2 text-sm leading-6 text-white/52">{alternative.reason}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="space-y-4 lg:sticky lg:top-20">
          <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-5">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">Agent-ready actions</div>
            <div className="mt-4 grid gap-2">
              <CopyButton value={agentBrief} label="Copy agent brief" />
              <CopyButton value={installScript} label="Copy install script" />
              <CopyButton value={shareUrl} label="Copy share URL" />
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-4 sm:p-5">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">Loop</div>
            <h2 className="mt-3 text-xl font-medium tracking-tight text-white">{recommendation.loopName}</h2>
            <ol className="mt-4 space-y-3">
              {recommendation.loopSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-white/58">
                  <span className="font-mono text-white/30">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[26px] border border-amber-200/12 bg-amber-200/[0.035] p-4 sm:p-5">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-amber-100/42">Guardrails</div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-50/62">
              {recommendation.watchouts.map((watchout) => <li key={watchout}>• {watchout}</li>)}
              <li>• Ask before destructive, paid, deploy, send, merge, publish, or secret-exposing actions.</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}

function PrimaryCard({ recommendation }: { recommendation: SuperchargeRecommendation }) {
  const primary = recommendation.primary;
  const metric = primary.metricValue !== null && primary.metricLabel
    ? `${formatCompactNumber(primary.metricValue)} ${primary.metricLabel.toLowerCase()}`
    : "Curated by OpenCLI";

  return (
    <section className="overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">Primary recommendation</div>
            <Link href={`/cli/${primary.slug}`} className="mt-2 inline-block text-3xl font-medium tracking-[-0.04em] text-white transition hover:text-white/82">
              {primary.name}
            </Link>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/56">{metric} · Agent readiness: {recommendation.agentReadiness.label} ({recommendation.agentReadiness.score}/100)</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <CopyButton compact value={primary.installCommand} label="Install" />
            <CopyButton compact value={recommendation.verifyCommand} label="Verify" />
            <Link href={recommendation.agentPackUrl} className="inline-flex h-8 items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-sm text-white/62 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white">
              Agent pack
            </Link>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {recommendation.whyReasons.map((reason) => (
            <div key={reason} className="rounded-2xl border border-white/8 bg-black/10 p-3 text-sm leading-6 text-white/62">
              {reason}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/8 bg-black/12 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <CommandTile label="Install" command={primary.installCommand} />
          <CommandTile label="Verify" command={recommendation.verifyCommand} />
        </div>
      </div>
    </section>
  );
}

function CommandTile({ label, command }: { label: string; command: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/34">{label}</div>
        <CopyButton compact value={command} label="Copy" />
      </div>
      <code className="block overflow-x-auto whitespace-nowrap font-mono text-sm text-white/80">{command}</code>
    </div>
  );
}
