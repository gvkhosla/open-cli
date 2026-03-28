import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { SkillPackActions } from "@/components/skill-pack-actions";
import { clis, getAlternativeClis, getCliBySlug, type CliEntry } from "@/data/clis";
import { buildCliAudit } from "@/lib/audits";
import { formatCompactNumber, titleCase } from "@/lib/format";
import { buildSkillPackForCli } from "@/lib/supercharge";

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

function buildWhenToApply(cli: CliEntry) {
  const items = [
    cli.bestFor,
    cli.useThisIf,
    ...cli.useCases.slice(0, 3).map((useCase) => `You need ${useCase.toLowerCase()}.`),
  ];

  return Array.from(new Set(items)).slice(0, 5);
}

function buildSummaryBullets(cli: CliEntry, whyReasons: string[]) {
  return [
    ...whyReasons,
    cli.agentFriendly ? "Good fit for coding-agent workflows and repeatable scripts." : "Best treated as a human-first terminal tool.",
    cli.supportsJsonOutput ? "Structured output is available for automation and parsing." : "Output is mostly text-first, so verify results before scripting around it.",
  ].slice(0, 5);
}

function buildQuickReference(cli: CliEntry, verifyCommand: string) {
  return [
    { label: "Install", value: cli.installCommand },
    { label: "Verify", value: verifyCommand },
    { label: "First real command", value: cli.quickStart },
  ];
}

function metricRows(cli: CliEntry, releaseDate: string | null) {
  return [
    cli.metricValue !== null && cli.metricLabel ? { label: cli.metricLabel, value: formatCompactNumber(cli.metricValue) } : null,
    cli.githubRepo ? { label: "Repository", value: cli.githubRepo } : null,
    cli.githubStars !== null ? { label: "GitHub stars", value: formatCompactNumber(cli.githubStars) } : null,
    releaseDate ? { label: "First seen", value: releaseDate } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
}

export default async function CliPage({ params }: CliPageProps) {
  const { slug } = await params;
  const cli = getCliBySlug(slug);
  if (!cli) notFound();

  const alternatives = getAlternativeClis(cli);
  const pack = buildSkillPackForCli(cli);
  const audit = buildCliAudit(cli);
  const releaseDate = formatReleaseDate(cli.latestRelease);
  const whenToApply = buildWhenToApply(cli);
  const summaryBullets = buildSummaryBullets(cli, pack.whyReasons);
  const quickReference = buildQuickReference(cli, pack.verifyCommand);
  const sidebarMetrics = metricRows(cli, releaseDate);
  const primaryCompanionSkill = pack.companionSkills[0] ?? null;
  const secondaryCompanionSkills = pack.companionSkills.slice(1);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-sm text-white/46">
          <Link href="/" className="transition hover:text-white">skills</Link>
          <span>/</span>
          <Link href={`/makers/${cli.makerSlug}`} className="transition hover:text-white">{cli.makerSlug}</Link>
          <span>/</span>
          <span className="text-white/64">{cli.slug}</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start">
          <article className="min-w-0 space-y-8">
            <header className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">{cli.slug}</h1>
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/40">
                  {cli.official ? <InlineTag>official</InlineTag> : null}
                  {cli.agentFriendly ? <InlineTag>scriptable</InlineTag> : null}
                  <InlineTag>{cli.category.toLowerCase()}</InlineTag>
                </div>
              </div>

              <div className="ui-code flex items-center gap-2 rounded-xl px-3 py-3">
                <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-white/88">
                  <span className="select-none text-white/34">$ </span>
                  {cli.installCommand}
                </code>
                <CopyButton compact value={cli.installCommand} label="Copy install" />
              </div>

              <div className="ui-panel-soft rounded-2xl p-4 sm:p-5">
                <div className="ui-label">Summary</div>
                <p className="mt-3 text-sm leading-6 text-white/80">{cli.tagline}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-white/66">
                  {summaryBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/30" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </header>

            <section className="space-y-3">
              <div className="ui-label">{pack.fileName}</div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{titleCase(cli.shortName)} guide</h2>
              <p className="ui-body max-w-3xl">{cli.description}</p>
              <p className="ui-body max-w-3xl">
                Open CLI packages the install path, verify step, and safe-start workflow so this tool can move from “interesting CLI” to something you can actually use. It also integrates with skills.sh so each CLI comes with the right companion skills, not just a binary and a docs link.
              </p>
            </section>

            <DocSection title="When to apply">
              <ul className="space-y-2 text-sm leading-6 text-white/70">
                {whenToApply.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/28" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </DocSection>

            <DocSection title="Quick reference">
              <div className="space-y-2.5">
                {quickReference.map((item) => (
                  <ReferenceRow key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </DocSection>

            {primaryCompanionSkill ? (
              <DocSection title="Open CLI × skills.sh">
                <div className="space-y-4">
                  <p className="text-sm leading-6 text-white/66">
                    Open CLI integrates <span className="text-white/84">{cli.shortName}</span> with the right skills.sh companions so you get the tool and the workflow together.
                  </p>

                  <div className="ui-panel-soft rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-medium text-white">{primaryCompanionSkill.title}</h4>
                          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/48">
                            {primaryCompanionSkill.confidenceLabel}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-white/64">{primaryCompanionSkill.whyItPairs}</p>
                      </div>

                      <a
                        href={primaryCompanionSkill.skillsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white/62 transition hover:text-white"
                      >
                        View on skills.sh
                        <ExternalIcon className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="ui-code mt-4 flex items-center gap-2 rounded-xl px-3 py-3">
                      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-white/88">
                        <span className="select-none text-white/34">$ </span>
                        {primaryCompanionSkill.installCommand}
                      </code>
                      <CopyButton compact value={primaryCompanionSkill.installCommand} label="Copy skills.sh install" />
                    </div>

                    <div className="ui-panel-faint mt-4 rounded-xl p-4">
                      <div className="ui-label">Starter prompt</div>
                      <p className="mt-2 text-sm leading-6 text-white/70">{primaryCompanionSkill.starterPrompt}</p>
                    </div>
                  </div>

                  {secondaryCompanionSkills.length > 0 ? (
                    <div className="space-y-2">
                      <div className="ui-label">Also useful from skills.sh</div>
                      <div className="flex flex-wrap gap-2">
                        {secondaryCompanionSkills.map((skill) => (
                          <a
                            key={skill.id}
                            href={skill.skillsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/64 transition hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
                          >
                            <span>{skill.title}</span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/38">skills.sh</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </DocSection>
            ) : null}

            <DocSection title="Why this tool">
              <ul className="space-y-2 text-sm leading-6 text-white/70">
                {pack.whyReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/28" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </DocSection>

            <DocSection title="Watch-outs">
              <ul className="space-y-2 text-sm leading-6 text-white/68">
                {pack.watchouts.map((watchout) => (
                  <li key={watchout} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/22" />
                    <span>{watchout}</span>
                  </li>
                ))}
              </ul>
            </DocSection>

            {cli.exampleWorkflow.length > 0 ? (
              <DocSection title="Example workflow">
                <div className="space-y-2.5">
                  {cli.exampleWorkflow.map((command, index) => (
                    <div key={command} className="ui-code flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-white/88">
                        <span className="select-none text-white/40">{index + 1}. </span>
                        {command}
                      </code>
                      <CopyButton compact value={command} label="Copy" />
                    </div>
                  ))}
                </div>
              </DocSection>
            ) : null}

            <DocSection title="Safe start">
              <div className="grid gap-3 sm:grid-cols-2">
                {pack.firstSteps.map((step, index) => (
                  <div key={`${step}-${index}`} className="ui-panel-soft rounded-xl p-4">
                    <div className="ui-label">Step {index + 1}</div>
                    <p className="mt-2 text-sm leading-6 text-white/72">{step}</p>
                  </div>
                ))}
              </div>
            </DocSection>

            {alternatives.length > 0 ? (
              <DocSection title="Alternatives worth considering">
                <div className="space-y-2.5">
                  {alternatives.map((alternative) => (
                    <Link
                      key={alternative.slug}
                      href={`/cli/${alternative.slug}`}
                      className="group flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-white/16 hover:bg-white/[0.06]"
                    >
                      <div>
                        <div className="text-sm font-medium text-white/88">{alternative.shortName}</div>
                        <p className="mt-1 text-sm leading-6 text-white/58">{alternative.tagline}</p>
                      </div>
                      <ArrowIcon className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-white/42" />
                    </Link>
                  ))}
                </div>
              </DocSection>
            ) : null}
          </article>

          <aside className="space-y-8 lg:sticky lg:top-20">
            <SidebarGroup title={cli.metricLabel ? titleCase(cli.metricLabel) : "Stats"}>
              {sidebarMetrics.map((row) => (
                <SidebarMetric key={row.label} label={row.label} value={row.value} mono={row.label !== "Repository"} />
              ))}
            </SidebarGroup>

            <SidebarGroup title="Security audits">
              <SidebarStatus label="Installability" value={audit.installability.note} tone="pass" />
              <SidebarStatus label="Source trust" value={audit.sourceTrust.note} tone={audit.sourceTrust.level === "low" ? "muted" : "pass"} />
              <SidebarStatus label="Automation" value={audit.automation.note} tone={audit.automation.level === "poor" ? "muted" : "pass"} />
              <SidebarStatus label="Risk" value={audit.risk.note} tone={audit.risk.level === "high" ? "muted" : "pass"} />
            </SidebarGroup>

            <SidebarGroup title="Open CLI pack">
              <div className="space-y-3">
                <ReferenceRow label="Verify" value={pack.verifyCommand} compact />
                <ReferenceRow label="Safe mode" value={pack.safeModeLabel} compact />
                <ReferenceRow label="Ask before" value={pack.askBefore.join(", ")} compact />
                <SkillPackActions
                  skillMarkdown={pack.skillMarkdown}
                  fileName={pack.fileName}
                  agentsMarkdown={pack.agentsMarkdown}
                  harnessJson={pack.harnessJson}
                  copyLabel="Copy SKILL.md"
                  downloadLabel="Download SKILL.md"
                  showSecondary
                />
              </div>
            </SidebarGroup>

            <SidebarGroup title="Links">
              <div className="space-y-2.5">
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
                    className="group flex items-center justify-between text-sm text-white/72 transition hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ExternalIcon className="h-3 w-3 text-white/24 transition group-hover:text-white/48" />
                  </a>
                ))}
              </div>
            </SidebarGroup>
          </aside>
        </section>
      </main>
    </>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-[1.65rem] font-medium tracking-[-0.03em] text-white">{title}</h3>
      {children}
    </section>
  );
}

function InlineTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/48">
      {children}
    </span>
  );
}

function ReferenceRow({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div className={`ui-code rounded-xl px-3 ${compact ? "py-2.5" : "py-3"}`}>
      <div className="flex items-start justify-between gap-3">
        <span className="ui-label pt-0.5">{label}</span>
        <code className="max-w-[70%] text-right font-mono text-sm text-white/88">{value}</code>
      </div>
    </div>
  );
}

function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="ui-label">{title}</div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function SidebarMetric({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-1">
      <div className="ui-label">{label}</div>
      <div className={mono ? "font-mono text-sm text-white/82" : "text-sm text-white/72"}>{value}</div>
    </div>
  );
}

function SidebarStatus({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "pass" | "muted";
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <div>
        <div className="ui-label">{label}</div>
        <div className="mt-1 text-white/68">{value}</div>
      </div>
      <span
        className={`mt-0.5 rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
          tone === "pass" ? "bg-emerald-500/18 text-emerald-200" : "bg-white/[0.06] text-white/46"
        }`}
      >
        {tone === "pass" ? "Pass" : "Note"}
      </span>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 7h12M8 2l5 5-5 5" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10L10 2M10 2H4M10 2v6" />
    </svg>
  );
}
