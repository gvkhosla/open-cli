import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { getClisByMaker, getMakerBySlug, makers } from "@/data/clis";
import { formatCompactNumber, formatMetric } from "@/lib/format";

type MakerPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return makers.map((maker) => ({ slug: maker.slug }));
}

export async function generateMetadata({ params }: MakerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const maker = getMakerBySlug(slug);
  if (!maker) return { title: "Maker not found • Open CLI" };
  return {
    title: `${maker.name} • Makers • Open CLI`,
    description: `Browse CLIs from ${maker.name} on Open CLI.`,
  };
}

export default async function MakerPage({ params }: MakerPageProps) {
  const { slug } = await params;
  const maker = getMakerBySlug(slug);
  if (!maker) notFound();

  const makerClis = getClisByMaker(maker.slug);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 font-mono text-sm text-white/46">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <Chevron />
          <Link href="/makers" className="transition hover:text-white">makers</Link>
          <Chevron />
          <span className="text-white/64">{maker.slug}</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <article className="space-y-6">
            <header className="space-y-4">
              <div className="section-kicker">Maker</div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="ui-title-lg">{maker.name}</h1>
                {maker.officialPlatformMaker ? <InlineTag>official platform</InlineTag> : null}
                {maker.featuredBuilder ? <InlineTag>featured builder</InlineTag> : null}
              </div>
              <p className="ui-body max-w-3xl">
                A tighter view of tools from {maker.name}. Use this page when you already trust the maker and want to compare their CLIs without dropping back into the broader directory.
              </p>
            </header>

            <section className="space-y-3">
              <h2 className="text-[1.65rem] font-medium tracking-[-0.03em] text-white">Tools from {maker.name}</h2>
              <div className="space-y-0 border-t border-white/8">
                {makerClis.map((cli) => (
                  <Link
                    key={cli.slug}
                    href={`/cli/${cli.slug}`}
                    className="group block border-b border-white/8 py-4 transition hover:border-white/14"
                  >
                    <div className="grid gap-3 lg:grid-cols-[170px_minmax(0,1fr)_160px] lg:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[15px] font-medium text-white">{cli.shortName}</span>
                          {cli.official ? <InlineTag>official</InlineTag> : null}
                        </div>
                        <div className="mt-0.5 font-mono text-xs text-white/40">{cli.name}</div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-white/68">{cli.tagline}</p>
                        <code className="block truncate font-mono text-xs text-white/48">
                          <span className="text-white/28">$ </span>
                          {cli.installCommand}
                        </code>
                      </div>

                      <div className="flex flex-col items-start gap-1 text-sm text-white/46 lg:items-end lg:text-right">
                        {cli.githubStars !== null ? <div className="font-mono text-white/70">{formatCompactNumber(cli.githubStars)} stars</div> : null}
                        <div>{formatMetric(cli.metricValue, cli.metricLabel) ?? "—"}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-8 lg:pt-8">
            <SidebarMetric label="Type" value={maker.type} />
            <SidebarMetric label="Tools indexed" value={String(makerClis.length)} />
            <SidebarMetric label="Maker URL" value={maker.url.replace(/^https?:\/\//, "")} />
            <a href={maker.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
              Visit maker
              <ExternalIcon className="h-3 w-3" />
            </a>
          </aside>
        </section>
      </main>
    </>
  );
}

function SidebarMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="ui-label">{label}</div>
      <div className="text-sm text-white/74">{value}</div>
    </div>
  );
}

function InlineTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/48">
      {children}
    </span>
  );
}

function Chevron() {
  return <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>;
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10L10 2M10 2H4M10 2v6" />
    </svg>
  );
}
