import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { makers, officialClis } from "@/data/clis";
import { formatCompactNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "Official CLIs • Open CLI",
  description: "Browse first-party CLIs from the companies and platform makers behind the tools.",
};

export default function OfficialPage() {
  const officialMakers = makers
    .filter((maker) => maker.officialPlatformMaker)
    .map((maker) => ({
      maker,
      clis: officialClis.filter((cli) => cli.makerSlug === maker.slug),
    }))
    .filter((group) => group.clis.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Official</div>
            <h1 className="max-w-4xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
              First-party CLIs from the makers who build the platforms themselves.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-white/54">
              This is the trust layer of Open CLI: official tools from companies and platform teams like GitHub,
              Vercel, Cloudflare, Supabase, AWS, Docker, and more. The broader directory still includes indie
              builders and small teams, but this page is the cleanest place to start when you want the maker’s
              own CLI.
            </p>
          </div>

          <div className="panel-texture rounded-[20px] border border-white/8 p-4">
            <div className="section-kicker">At a glance</div>
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <div>
                Official makers: <span className="text-white">{officialMakers.length}</span>
              </div>
              <div>
                Official CLIs: <span className="text-white">{officialClis.length}</span>
              </div>
              <div>
                Browse by maker: <Link href="/makers" className="text-white underline underline-offset-4">see all makers</Link>
              </div>
              <div>
                Community path: <Link href="/submit" className="text-white underline underline-offset-4">submit a CLI</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {officialMakers.map(({ maker, clis }) => (
            <div key={maker.slug} className="space-y-4 border-y border-white/8 py-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-lg font-medium text-white">{maker.name}</div>
                  <a href={maker.url} target="_blank" rel="noreferrer" className="text-sm text-white/42 transition hover:text-white">
                    {maker.url.replace(/^https?:\/\//, "")} ↗
                  </a>
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/34">
                  {clis.length} tool{clis.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {clis.map((cli) => (
                  <Link
                    key={cli.slug}
                    href={`/cli/${cli.slug}`}
                    className="rounded-[18px] border border-white/8 bg-[#0b0c0e]/50 p-4 transition hover:border-white/14 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-base font-medium text-white">{cli.shortName}</div>
                        <div className="mt-1 text-xs text-white/36">{cli.name}</div>
                      </div>
                      <div className="font-mono text-xs text-white/36">{formatCompactNumber(cli.score)}</div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/52">{cli.tagline}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-xs text-white/34">
                      <span>{formatCompactNumber(cli.monthlyDownloads)} adoption</span>
                      <span>{formatCompactNumber(cli.stars)} stars</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
