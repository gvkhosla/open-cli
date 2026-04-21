import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { clis, getAlternativeClis, getCliBySlug, type CliEntry } from "@/data/clis";
import { buildCliAudit } from "@/lib/audits";
import { formatCompactNumber, formatMetric, titleCase } from "@/lib/format";

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
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function OneLiner({ cli }: { cli: CliEntry }) {
  const command = cli.exampleWorkflow[0] ?? cli.quickStart;
  if (!command) return null;
  return (
    <div className="ui-panel-soft rounded-2xl p-4 sm:p-5">
      <div className="ui-label">One-liner to try</div>
      <div className="mt-3 flex items-center gap-2">
        <code className="flex-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 font-mono text-sm text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <span className="select-none text-white/20">$ </span>
          {command}
        </code>
        <CopyButton compact value={command} label="Copy" />
      </div>
    </div>
  );
}

export default async function CliPage({ params }: CliPageProps) {
  const { slug } = await params;
  const cli = getCliBySlug(slug);
  if (!cli) notFound();

  const alternatives = getAlternativeClis(cli);
  const audit = buildCliAudit(cli);
  const releaseDate = formatReleaseDate(cli.latestRelease);
  const verify = cli.requiresAuth
    ? { command: `${cli.shortName} --help`, signal: `${cli.shortName} responds locally and you can move on to authentication.` }
    : { command: `${cli.shortName} --version`, signal: `${cli.shortName} responds locally and is ready for the first real command.` };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-sm text-white/46">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <span>/</span>
          <Link href={`/makers/${cli.makerSlug}`} className="transition hover:text-white">{cli.makerSlug}</Link>
          <span>/</span>
          <span className="text-white/64">{cli.slug}</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-start">
          <article className="min-w-0 space-y-8">
            <header className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">{cli.slug}</h1>
                  <div className="flex flex-wrap gap-2">
                    {audit.badges.map((badge) => (
                      <InlineTag key={badge}>{badge.toLowerCase()}</InlineTag>
                    ))}
                    <InlineTag>{cli.category.toLowerCase()}</InlineTag>
                    <InlineTag>{cli.installWith}</InlineTag>
                  </div>
                </div>
                <p className="text-sm text-white/50">{cli.makerName} · {cli.tagline}</p>
              </div>

              <div className="ui-code flex items-center gap-2 rounded-xl px-3 py-3">
                <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-white/88">
                  <span className="select-none text-white/34">$ </span>
                  {cli.installCommand}
                </code>
                <CopyButton compact value={cli.installCommand} label="Copy install" />
              </div>
            </header>

            <OneLiner cli={cli} />

            <DocSection title="Quick reference">
              <div className="space-y-2.5">
                <ReferenceRow label="Install" value={cli.installCommand} />
                <ReferenceRow label="Verify" value={verify.command} />
                <ReferenceRow label="First command" value={cli.quickStart} />
              </div>
            </DocSection>

            <DocSection title="About">
              <p className="text-sm leading-7 text-white/72">{cli.description}</p>
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
            <SidebarGroup title="Stats">
              {cli.metricValue !== null && cli.metricLabel ? (
                <SidebarMetric label={titleCase(cli.metricLabel)} value={formatCompactNumber(cli.metricValue)} />
              ) : null}
              {cli.githubStars !== null ? (
                <SidebarMetric label="GitHub stars" value={formatCompactNumber(cli.githubStars)} />
              ) : null}
              {releaseDate ? <SidebarMetric label="Last release" value={releaseDate} /> : null}
              <SidebarMetric label="License" value={cli.license ?? "Unknown"} />
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

            <SidebarGroup title="Tags">
              <div className="flex flex-wrap gap-1.5">
                {[
                  cli.localFirst && "local-only",
                  cli.requiresAuth && "requires-auth",
                  cli.requiresNetwork && "needs-network",
                  cli.supportsJsonOutput && "json-output",
                  cli.supportsNonInteractive && "scriptable",
                  cli.ciFriendly && "ci-friendly",
                  cli.supportsDryRun && "dry-run",
                ]
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag as string}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/50"
                    >
                      {tag as string}
                    </span>
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

function ReferenceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ui-code rounded-xl px-3 py-3">
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

function SidebarMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="ui-label">{label}</div>
      <div className="font-mono text-sm text-white/82">{value}</div>
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
