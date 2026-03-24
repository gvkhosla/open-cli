import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { WorkflowPackActions } from "@/components/workflow-pack-actions";
import { clis, getAlternativeClis, getCliBySlug } from "@/data/clis";
import { buildCliAudit } from "@/lib/audits";
import { formatCompactNumber } from "@/lib/format";
import { buildWorkflowPackForCli } from "@/lib/supercharge";

type CliPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return clis.map((cli) => ({ slug: cli.slug }));
}

export async function generateMetadata({ params }: CliPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cli = getCliBySlug(slug);
  if (!cli) return { title: "CLI not found • Open CLI" };
  return { title: `${cli.name} • Open CLI`, description: cli.tagline };
}

function formatReleaseDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function CliPage({ params }: CliPageProps) {
  const { slug } = await params;
  const cli = getCliBySlug(slug);
  if (!cli) notFound();

  const alternatives = getAlternativeClis(cli);
  const pack = buildWorkflowPackForCli(cli);
  const audit = buildCliAudit(cli);
  const releaseDate = formatReleaseDate(cli.latestRelease);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-sm text-white/34">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <span>/</span>
          <Link href={`/makers/${cli.makerSlug}`} className="transition hover:text-white">{cli.makerSlug}</Link>
          <span>/</span>
          <span className="text-white/52">{cli.slug}</span>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_360px] lg:items-start">
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">{cli.shortName}</h1>
                {cli.official ? <Pill tone="good" label="Official" /> : null}
                {cli.agentFriendly ? <Pill tone="default" label="Scriptable" /> : null}
                <Pill tone="subtle" label={cli.category} />
              </div>
              <div className="max-w-3xl space-y-3">
                <p className="text-lg leading-8 text-white/74">{cli.tagline}</p>
                <p className="text-[15px] leading-7 text-white/48">{cli.description}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <SummaryTile label="Best for" value={cli.bestFor} />
              <SummaryTile label="Choose this if" value={cli.useThisIf} />
              <SummaryTile label="Skip if" value={cli.skipIf} subdued />
            </div>
          </div>

          <div className="rounded-[22px] border border-white/8 bg-[#0b0d10] p-4 sm:p-5">
            <div className="space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Install</div>
                <div className="mt-2 flex items-center gap-2">
                  <code className="flex-1 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 font-mono text-sm text-white/78">
                    <span className="select-none text-white/20">$ </span>
                    {cli.installCommand}
                  </code>
                  <CopyButton compact value={cli.installCommand} label="Copy install" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <CommandCard label="Verify" command={pack.verifyCommand} description={pack.verifySignal} />
                <CommandCard label="First real command" command={cli.quickStart} />
              </div>

              <div className="border-t border-white/8 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Workflow pack</div>
                <p className="mt-2 text-sm leading-6 text-white/46">
                  Export a compact brief with install, verify, and safe-start guidance for this CLI.
                </p>
                <div className="mt-3">
                  <WorkflowPackActions
                    markdown={pack.markdown}
                    fileName={pack.fileName}
                    copyLabel="Copy workflow pack"
                    downloadLabel="Download pack"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-8">
            <SurfaceSection title="Why this one works">
              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Why it fits</div>
                  <ul className="mt-3 space-y-2.5 text-sm leading-6 text-white/58">
                    {pack.whyReasons.map((reason) => (
                      <li key={reason} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/46" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Watch out for</div>
                  <ul className="mt-3 space-y-2.5 text-sm leading-6 text-white/52">
                    {pack.watchouts.map((watchout) => (
                      <li key={watchout} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/28" />
                        <span>{watchout}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SurfaceSection>

            {cli.exampleWorkflow.length > 0 ? (
              <SurfaceSection title="Example workflow" subtitle="A practical starting sequence you can copy one command at a time.">
                <div className="space-y-2.5">
                  {cli.exampleWorkflow.map((command, index) => (
                    <div key={command} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-white/74">
                        <span className="select-none text-white/24">{index + 1}. </span>
                        {command}
                      </code>
                      <CopyButton compact value={command} label="Copy" />
                    </div>
                  ))}
                </div>
              </SurfaceSection>
            ) : null}

            <SurfaceSection title="Safe start" subtitle="Use this sequence to confirm the tool works before you depend on it.">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {pack.firstSteps.map((step, index) => (
                  <div key={`${step}-${index}`} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/24">Step {index + 1}</div>
                    <p className="mt-2 text-sm leading-6 text-white/58">{step}</p>
                  </div>
                ))}
              </div>
            </SurfaceSection>

            {alternatives.length > 0 ? (
              <SurfaceSection title="Alternatives worth considering" subtitle="Use these when your constraints differ from the default recommendation.">
                <div className="space-y-2.5">
                  {alternatives.map((alternative) => (
                    <Link
                      key={alternative.slug}
                      href={`/cli/${alternative.slug}`}
                      className="group flex items-start justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3.5 transition hover:border-white/14 hover:bg-white/[0.04]"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{alternative.shortName}</span>
                          <span className="text-xs text-white/28">{alternative.name}</span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-white/46">{alternative.tagline}</p>
                      </div>
                      <svg className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-white/18 transition group-hover:translate-x-0.5 group-hover:text-white/36" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 7h12M8 2l5 5-5 5" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </SurfaceSection>
            ) : null}
          </div>

          <aside className="space-y-5">
            <SidebarPanel title="Quick facts">
              <FactRow label="Maker" value={cli.makerName} />
              {cli.metricValue !== null && cli.metricLabel ? (
                <FactRow label={cli.metricLabel} value={formatCompactNumber(cli.metricValue)} />
              ) : null}
              {cli.githubStars !== null ? <FactRow label="GitHub stars" value={formatCompactNumber(cli.githubStars)} /> : null}
              {cli.license ? <FactRow label="License" value={cli.license} /> : null}
              {releaseDate ? <FactRow label="Updated" value={releaseDate} /> : null}
            </SidebarPanel>

            <SidebarPanel title="Trust and automation">
              <div className="flex flex-wrap gap-2">
                {audit.badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/42">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2.5">
                <Signal label="JSON output" on={cli.supportsJsonOutput} />
                <Signal label="Non-interactive" on={cli.supportsNonInteractive} />
                <Signal label="CI-friendly" on={cli.ciFriendly} />
              </div>
            </SidebarPanel>

            <SidebarPanel title="Links">
              <div className="space-y-2">
                {[
                  { href: cli.website, label: "Website" },
                  { href: cli.github, label: "GitHub" },
                  { href: cli.docs, label: "Docs" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5 text-sm text-white/52 transition hover:border-white/14 hover:bg-white/[0.04] hover:text-white"
                  >
                    {link.label}
                    <svg className="h-3 w-3 text-white/20 transition group-hover:text-white/40" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 10L10 2M10 2H4M10 2v6" />
                    </svg>
                  </a>
                ))}
              </div>
            </SidebarPanel>
          </aside>
        </section>
      </main>
    </>
  );
}

function Pill({ label, tone = "default" }: { label: string; tone?: "default" | "good" | "subtle" }) {
  const tones = {
    default: "border-white/10 bg-white/[0.03] text-white/48",
    good: "border-white/10 bg-white/[0.03] text-white/48",
    subtle: "border-white/8 bg-transparent text-white/38",
  } as const;

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${tones[tone]}`}>
      {label}
    </span>
  );
}

function SummaryTile({ label, value, subdued = false }: { label: string; value: string; subdued?: boolean }) {
  return (
    <div className="rounded-[18px] border border-white/8 bg-[#0b0d10] p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">{label}</div>
      <p className={`mt-2 text-sm leading-6 ${subdued ? "text-white/44" : "text-white/58"}`}>{value}</p>
    </div>
  );
}

function CommandCard({ label, command, description }: { label: string; command: string; description?: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">{label}</div>
      <div className="mt-2 flex items-center gap-2">
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-white/74">
          <span className="select-none text-white/20">$ </span>
          {command}
        </code>
        <CopyButton compact value={command} label="Copy" />
      </div>
      {description ? <p className="mt-2 text-xs leading-5 text-white/34">{description}</p> : null}
    </div>
  );
}

function SurfaceSection({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[22px] border border-white/8 bg-[#0b0d10] p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium tracking-[-0.02em] text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm leading-6 text-white/42">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function SidebarPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[20px] border border-white/8 bg-[#0b0d10] p-4 sm:p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">{title}</div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/6 py-2.5 text-sm last:border-b-0 last:pb-0 first:pt-0">
      <span className="text-white/40">{label}</span>
      <span className="font-mono text-right text-white/72">{value}</span>
    </div>
  );
}

function Signal({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/42">{label}</span>
      <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${on ? "text-white/68" : "text-white/26"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-white/70" : "bg-white/16"}`} />
        {on ? "Yes" : "No"}
      </span>
    </div>
  );
}
