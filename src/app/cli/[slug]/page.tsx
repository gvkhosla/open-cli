import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { SiteHeader } from "@/components/site-header";
import { clis, getCliBySlug } from "@/data/clis";
import { formatCompactNumber } from "@/lib/format";

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

export default async function CliPage({ params }: CliPageProps) {
  const { slug } = await params;
  const cli = getCliBySlug(slug);

  if (!cli) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/52 transition hover:text-white">
          ← Back to directory
        </Link>

        <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
          <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-[rgba(183,182,233,0.14)] blur-3xl" />
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[rgba(238,176,140,0.12)] blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="section-kicker">{cli.category}</div>
              <h1 className="mt-4 text-4xl font-medium tracking-[-0.06em] text-white sm:text-6xl">
                {cli.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/58">{cli.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {cli.useCases.map((useCase) => (
                  <span key={useCase} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/56">
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="text-sm text-white/42">Score</div>
                <div className="mt-2 text-3xl font-medium text-white">{cli.score}</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="text-sm text-white/42">GitHub stars</div>
                <div className="mt-2 text-3xl font-medium text-white">{formatCompactNumber(cli.stars)}</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <div className="text-sm text-white/42">Monthly downloads</div>
                <div className="mt-2 text-3xl font-medium text-white">{formatCompactNumber(cli.monthlyDownloads)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <div className="section-kicker">Install</div>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/25 p-4">
                <code className="overflow-x-auto font-mono text-sm text-white/86 sm:text-[15px]">
                  <span className="text-white/30">$</span> {cli.installCommand}
                </code>
                <CopyButton compact value={cli.installCommand} />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <div className="section-kicker">Quick start</div>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-black/25 p-4">
                <code className="overflow-x-auto font-mono text-sm text-white/76 sm:text-[15px]">
                  <span className="text-white/30">$</span> {cli.quickStart}
                </code>
                <CopyButton compact value={cli.quickStart} label="Copy run" />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <div className="section-kicker">Example workflow</div>
              <div className="mt-5 space-y-3">
                {cli.exampleWorkflow.map((command, index) => (
                  <div key={command} className="flex items-center justify-between gap-4 rounded-[22px] border border-white/8 bg-black/20 p-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-xs text-white/52">
                        {index + 1}
                      </div>
                      <code className="overflow-x-auto font-mono text-sm text-white/82">{command}</code>
                    </div>
                    <CopyButton compact value={command} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-5">
              <div className="section-kicker">Links</div>
              <div className="mt-4 space-y-3 text-sm text-white/62">
                <a href={cli.website} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                  Website ↗
                </a>
                <a href={cli.github} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                  GitHub ↗
                </a>
                <a href={cli.docs} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                  Docs ↗
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-5">
              <div className="section-kicker">Why it stands out</div>
              <p className="mt-4 text-sm leading-7 text-white/56">
                {cli.name} has a tight command surface, clear installation path, and immediate payoff after the
                first command. That combination is what Open CLI wants to highlight across every entry.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
