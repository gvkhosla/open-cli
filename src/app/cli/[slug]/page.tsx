import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { clis, getCliBySlug, getRelatedClis } from "@/data/clis";
import { formatCompactNumber, formatMetric } from "@/lib/format";

type CliPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return clis.map((cli) => ({ slug: cli.slug }));
}

export async function generateMetadata({ params }: CliPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cli = getCliBySlug(slug);

  if (!cli) {
    return {
      title: "CLI not found • Open CLI",
    };
  }

  return {
    title: `${cli.name} • Open CLI`,
    description: cli.tagline,
  };
}

function AgentSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-white/8 bg-[#0b0c0e]/65 p-3">
      <div className="text-xs uppercase tracking-[0.16em] text-white/28">{label}</div>
      <div className="mt-2 text-sm text-white/72">{value}</div>
    </div>
  );
}

export default async function CliPage({ params }: CliPageProps) {
  const { slug } = await params;
  const cli = getCliBySlug(slug);

  if (!cli) {
    notFound();
  }

  const relatedClis = getRelatedClis(cli);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/48 transition hover:text-white">
          ← Back to directory
        </Link>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">{cli.category}</div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">{cli.name}</h1>
              {cli.official ? (
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">
                  Official
                </span>
              ) : null}
              {cli.agentFriendly ? (
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">
                  Agent-friendly
                </span>
              ) : null}
            </div>
            <div className="text-sm text-white/42">
              by{" "}
              <Link href={`/makers/${cli.makerSlug}`} className="transition hover:text-white">
                {cli.makerName}
              </Link>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-white/56">{cli.description}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {cli.useCases.map((useCase) => (
                <span key={useCase} className="rounded-full border border-white/8 px-3 py-1.5 text-sm text-white/44">
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-l border-white/8 pl-0 lg:pl-6">
            <div>
              <div className="text-sm text-white/36">GitHub stars</div>
              <div className="mt-1 text-3xl font-medium text-white">
                {cli.githubStars !== null ? formatCompactNumber(cli.githubStars) : "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/36">Verified install metric</div>
              <div className="mt-1 text-lg text-white">
                {formatMetric(cli.metricValue, cli.metricLabel) ?? "Not available yet"}
              </div>
              {cli.metricSource ? <div className="mt-1 text-xs text-white/34">Source: {cli.metricSource}</div> : null}
            </div>
            <div>
              <div className="text-sm text-white/36">Latest release activity</div>
              <div className="mt-1 text-lg text-white">{cli.latestRelease ? new Date(cli.latestRelease).toLocaleDateString() : "Unknown"}</div>
            </div>
            <div>
              <div className="text-sm text-white/36">License</div>
              <div className="mt-1 text-lg text-white">{cli.license ?? "Unknown"}</div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-8">
            <div>
              <div className="section-kicker">Install</div>
              <div className="mt-4 flex items-center justify-between gap-4 border-y border-white/8 bg-[#0b0c0e]/70 px-4 py-4">
                <code className="overflow-x-auto font-mono text-sm text-white/86">
                  <span className="text-white/28">$</span> {cli.installCommand}
                </code>
                <CopyButton compact value={cli.installCommand} />
              </div>
            </div>

            <div>
              <div className="section-kicker">First useful command</div>
              <div className="mt-4 flex items-center justify-between gap-4 border-y border-white/8 bg-[#0b0c0e]/70 px-4 py-4">
                <code className="overflow-x-auto font-mono text-sm text-white/74">
                  <span className="text-white/28">$</span> {cli.quickStart}
                </code>
                <CopyButton compact value={cli.quickStart} label="Copy run" />
              </div>
            </div>

            <div>
              <div className="section-kicker">Workflow notes</div>
              <div className="mt-4 overflow-hidden border-y border-white/8">
                {cli.exampleWorkflow.map((command, index) => (
                  <div
                    key={`${command}-${index}`}
                    className="flex items-center justify-between gap-4 border-b border-white/6 py-4 last:border-b-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="font-mono text-sm text-white/32">{String(index + 1).padStart(2, "0")}</div>
                      <code className="overflow-x-auto font-mono text-sm text-white/82">{command}</code>
                    </div>
                    <CopyButton compact value={command} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="section-kicker">Agent-readiness</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <AgentSignal label="JSON output" value={cli.supportsJsonOutput ? "Yes" : "Not obvious"} />
                <AgentSignal label="Non-interactive" value={cli.supportsNonInteractive ? "Good fit" : "Mostly interactive"} />
                <AgentSignal label="CI-friendly" value={cli.ciFriendly ? "Yes" : "Probably manual-first"} />
                <AgentSignal label="Auth" value={cli.requiresAuth ? "Usually required" : "Often optional"} />
                <AgentSignal label="Network" value={cli.requiresNetwork ? "Usually needed" : "Can work locally"} />
                <AgentSignal label="Risk" value={cli.destructivePotential} />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div>
              <div className="section-kicker">Links</div>
              <div className="mt-4 space-y-3 text-sm text-white/56">
                <a href={cli.website} target="_blank" rel="noreferrer" className="block transition hover:text-[var(--accent-lilac)]">
                  Website ↗
                </a>
                <a href={cli.github} target="_blank" rel="noreferrer" className="block transition hover:text-[var(--accent-lilac)]">
                  GitHub ↗
                </a>
                <a href={cli.docs} target="_blank" rel="noreferrer" className="block transition hover:text-[var(--accent-lilac)]">
                  Docs ↗
                </a>
              </div>
            </div>

            <div>
              <div className="section-kicker">Why it stands out</div>
              <p className="mt-4 text-sm leading-7 text-white/48">
                A practical CLI with a clear install path and a useful first command.
              </p>
            </div>

            {relatedClis.length > 0 ? (
              <div>
                <div className="section-kicker">Related CLIs</div>
                <div className="mt-4 space-y-3 border-y border-white/8 py-3">
                  {relatedClis.map((related) => (
                    <Link key={related.slug} href={`/cli/${related.slug}`} className="block transition hover:text-white">
                      <div className="text-sm text-white">{related.shortName}</div>
                      <div className="mt-1 text-sm text-white/42">{related.tagline}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>
      </main>
    </>
  );
}
