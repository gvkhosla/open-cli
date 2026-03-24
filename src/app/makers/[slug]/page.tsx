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
        <nav className="flex items-center gap-2 text-sm text-white/34">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <Chevron />
          <Link href="/makers" className="transition hover:text-white">makers</Link>
          <Chevron />
          <span className="text-white/52">{maker.slug}</span>
        </nav>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Maker</div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">{maker.name}</h1>
              {maker.officialPlatformMaker ? <Badge tone="good" label="Official platform" /> : null}
              {maker.featuredBuilder ? <Badge tone="default" label="Featured builder" /> : null}
            </div>
            <p className="max-w-3xl text-[15px] leading-7 text-white/48 sm:text-base">
              A tighter view of tools from {maker.name}. Use this page when you already trust the maker and want to compare their CLIs without dropping back into the broader directory.
            </p>
          </div>

          <div className="rounded-[20px] border border-white/8 bg-[#0b0d10] p-4 sm:p-5">
            <div className="space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">Quick facts</div>
              <FactRow label="Type" value={maker.type} />
              <FactRow label="Tools in directory" value={String(makerClis.length)} />
              <a
                href={maker.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5 text-sm text-white/52 transition hover:border-white/14 hover:bg-white/[0.04] hover:text-white"
              >
                <span className="truncate">{maker.url.replace(/^https?:\/\//, "")}</span>
                <svg className="ml-3 h-3 w-3 flex-shrink-0 text-white/20 transition group-hover:text-white/40" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M10 2H4M10 2v6" /></svg>
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-[22px] border border-white/8 bg-[#0b0d10] overflow-hidden">
          <div className="border-b border-white/8 px-5 py-4">
            <h2 className="text-lg font-medium text-white">Tools from {maker.name}</h2>
            <p className="mt-1 text-sm text-white/40">Install paths, fit, and momentum in one pass.</p>
          </div>

          <div>
            {makerClis.map((cli) => (
              <Link
                key={cli.slug}
                href={`/cli/${cli.slug}`}
                className="directory-row grid gap-3 border-b border-white/6 px-5 py-4 transition-colors last:border-b-0 hover:bg-white/[0.025] md:grid-cols-[170px_minmax(0,1fr)_150px] md:items-center md:gap-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[15px] font-medium text-white">{cli.shortName}</span>
                    {cli.official ? <TinyPill label="Official" /> : null}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-white/24">{cli.name}</div>
                </div>

                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm text-white/52">{cli.tagline}</p>
                  <code className="block truncate font-mono text-xs text-white/28">
                    <span className="text-white/18">$ </span>
                    {cli.installCommand}
                  </code>
                </div>

                <div className="flex flex-col items-end gap-1 text-right">
                  {cli.githubStars !== null ? (
                    <span className="inline-flex items-center gap-1 font-mono text-sm tabular-nums text-white/40">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" /></svg>
                      {formatCompactNumber(cli.githubStars)}
                    </span>
                  ) : null}
                  <span className="text-xs text-white/28">
                    {formatMetric(cli.metricValue, cli.metricLabel) ?? "—"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function Chevron() {
  return <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>;
}

function Badge({ label, tone = "default" }: { label: string; tone?: "default" | "good" }) {
  const tones = {
    default: "border-white/10 bg-white/[0.03] text-white/44",
    good: "border-white/10 bg-white/[0.03] text-white/44",
  } as const;

  return <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${tones[tone]}`}>{label}</span>;
}

function TinyPill({ label }: { label: string }) {
  return <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">{label}</span>;
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/6 py-2.5 text-sm last:border-b-0 last:pb-0 first:pt-0">
      <span className="text-white/40">{label}</span>
      <span className="font-mono text-white/72">{value}</span>
    </div>
  );
}
