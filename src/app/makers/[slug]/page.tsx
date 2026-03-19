import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { getClisByMaker, getMakerBySlug, makers } from "@/data/clis";
import { formatCompactNumber } from "@/lib/format";

type MakerPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return makers.map((maker) => ({ slug: maker.slug }));
}

export async function generateMetadata({ params }: MakerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const maker = getMakerBySlug(slug);

  if (!maker) {
    return {
      title: "Maker not found • Open CLI",
    };
  }

  return {
    title: `${maker.name} • Makers • Open CLI`,
    description: `Browse CLIs from ${maker.name} on Open CLI.`,
  };
}

function buildMakerSummary(name: string, type: string, official?: boolean, featuredBuilder?: boolean) {
  if (official) {
    return `${name} is represented here as a first-party platform maker. This page groups the official CLIs they publish so people can quickly find the tool that comes straight from the source.`;
  }

  if (featuredBuilder) {
    return `${name} is one of the builders we want Open CLI to highlight more intentionally. This page groups the maker’s tools in one place so search does not favor only large companies.`;
  }

  return `${name} is part of the broader open CLI ecosystem. This page makes it easier to browse tools by maker instead of only by package name or category.`;
}

export default async function MakerPage({ params }: MakerPageProps) {
  const { slug } = await params;
  const maker = getMakerBySlug(slug);

  if (!maker) {
    notFound();
  }

  const makerClis = getClisByMaker(maker.slug);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <Link href="/makers" className="inline-flex items-center gap-2 text-sm text-white/48 transition hover:text-white">
          ← Back to makers
        </Link>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Maker</div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">{maker.name}</h1>
              {maker.officialPlatformMaker ? (
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">
                  Official platform maker
                </span>
              ) : null}
              {maker.featuredBuilder ? (
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">
                  Builder we follow
                </span>
              ) : null}
            </div>
            <p className="max-w-3xl text-base leading-7 text-white/54">
              {buildMakerSummary(maker.name, maker.type, maker.officialPlatformMaker, maker.featuredBuilder)}
            </p>
            <a href={maker.url} target="_blank" rel="noreferrer" className="inline-flex text-sm text-white/46 transition hover:text-white">
              Visit {maker.url.replace(/^https?:\/\//, "")} ↗
            </a>
          </div>

          <div className="space-y-4 border-l border-white/8 pl-0 lg:pl-6">
            <div>
              <div className="text-sm text-white/36">Maker type</div>
              <div className="mt-1 text-2xl font-medium text-white">{maker.type}</div>
            </div>
            <div>
              <div className="text-sm text-white/36">CLIs in directory</div>
              <div className="mt-1 text-2xl font-medium text-white">{makerClis.length}</div>
            </div>
            <div>
              <div className="text-sm text-white/36">Combined stars</div>
              <div className="mt-1 text-2xl font-medium text-white">
                {formatCompactNumber(makerClis.reduce((sum, cli) => sum + cli.stars, 0))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="section-kicker">Tools from {maker.name}</div>
          <div className="overflow-hidden border-y border-white/8">
            {makerClis.map((cli) => (
              <Link
                key={cli.slug}
                href={`/cli/${cli.slug}`}
                className="grid gap-2 border-b border-white/6 py-4 transition last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[180px_minmax(0,1fr)_160px] md:items-center md:gap-4"
              >
                <div>
                  <div className="text-base font-medium text-white">{cli.shortName}</div>
                  <div className="mt-1 text-xs text-white/34">{cli.name}</div>
                </div>
                <div>
                  <p className="text-sm text-white/50">{cli.tagline}</p>
                  <code className="mt-2 block font-mono text-xs text-white/34">{cli.installCommand}</code>
                </div>
                <div className="text-sm text-white/38 md:text-right">
                  <div>{formatCompactNumber(cli.monthlyDownloads)} adoption</div>
                  <div>{formatCompactNumber(cli.stars)} stars</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
