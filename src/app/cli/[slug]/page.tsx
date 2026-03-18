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
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/48 transition hover:text-white">
          ← Back to directory
        </Link>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">{cli.category}</div>
            <h1 className="text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">{cli.name}</h1>
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
              <div className="text-sm text-white/36">Score</div>
              <div className="mt-1 text-3xl font-medium text-white">{cli.score}</div>
            </div>
            <div>
              <div className="text-sm text-white/36">GitHub stars</div>
              <div className="mt-1 text-3xl font-medium text-white">{formatCompactNumber(cli.stars)}</div>
            </div>
            <div>
              <div className="text-sm text-white/36">Monthly downloads</div>
              <div className="mt-1 text-3xl font-medium text-white">{formatCompactNumber(cli.monthlyDownloads)}</div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
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
              <div className="section-kicker">Quick start</div>
              <div className="mt-4 flex items-center justify-between gap-4 border-y border-white/8 bg-[#0b0c0e]/70 px-4 py-4">
                <code className="overflow-x-auto font-mono text-sm text-white/74">
                  <span className="text-white/28">$</span> {cli.quickStart}
                </code>
                <CopyButton compact value={cli.quickStart} label="Copy run" />
              </div>
            </div>

            <div>
              <div className="section-kicker">Example workflow</div>
              <div className="mt-4 overflow-hidden border-y border-white/8">
                {cli.exampleWorkflow.map((command, index) => (
                  <div key={command} className="flex items-center justify-between gap-4 border-b border-white/6 py-4 last:border-b-0">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="font-mono text-sm text-white/32">{String(index + 1).padStart(2, "0")}</div>
                      <code className="overflow-x-auto font-mono text-sm text-white/82">{command}</code>
                    </div>
                    <CopyButton compact value={command} />
                  </div>
                ))}
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
              <div className="section-kicker">Why people use it</div>
              <p className="mt-4 text-sm leading-7 text-white/48">
                {cli.name} is useful quickly: the install step is clear, the first command makes sense, and
                you can get real work done without a long setup process.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
