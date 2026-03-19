import type { Metadata } from "next";

import { AdminActions } from "@/components/admin-actions";
import { SiteHeader } from "@/components/site-header";
import { getBuilderLaunches, getLaunchSubmissions } from "@/lib/builder-launches";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Admin",
  description: "Review launch submissions, inspect builder launches, and sync external metadata.",
};

export default async function AdminPage() {
  const [launches, submissions] = await Promise.all([getBuilderLaunches(), getLaunchSubmissions()]);
  const supabaseReady = isSupabaseConfigured();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Admin</div>
            <h1 className="max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
              Manage launch submissions and builder feed content.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/54">
              This page is meant for internal curation. Review new launch submissions, inspect the current
              builder feed, and sync npm or GitHub data into Supabase.
            </p>
          </div>

          <div className="panel-texture rounded-[20px] border border-white/8 p-4">
            <div className="section-kicker">Status</div>
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <div>
                Supabase: <span className="text-white">{supabaseReady ? "Connected" : "Not configured"}</span>
              </div>
              <div>
                Launches: <span className="text-white">{launches.length}</span>
              </div>
              <div>
                Submissions: <span className="text-white">{submissions.length}</span>
              </div>
            </div>
            <div className="mt-5">
              <AdminActions />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="section-kicker">Launch submissions</div>
          <div className="overflow-hidden border-y border-white/8">
            {submissions.length === 0 ? (
              <div className="py-8 text-sm text-white/42">
                No submissions yet. If Supabase is not configured, submissions will not be saved.
              </div>
            ) : null}
            {submissions.map((submission) => (
              <div
                key={submission.id ?? `${submission.name}-${submission.creator}`}
                className="grid gap-2 border-b border-white/6 py-4 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)_140px] md:items-start md:gap-4"
              >
                <div>
                  <div className="text-base font-medium text-white">{submission.name}</div>
                  <div className="mt-1 text-sm text-white/38">{submission.creator}</div>
                </div>
                <div>
                  <div className="text-sm text-white/52">{submission.tagline}</div>
                  {submission.notes ? <div className="mt-2 text-sm text-white/38">{submission.notes}</div> : null}
                </div>
                <div className="text-sm text-white/38 md:text-right">{submission.status ?? "new"}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="section-kicker">Current builder launches</div>
          <div className="overflow-hidden border-y border-white/8">
            {launches.map((launch) => (
              <div
                key={`${launch.name}-${launch.creator}`}
                className="grid gap-2 border-b border-white/6 py-4 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)_180px] md:items-start md:gap-4"
              >
                <div>
                  <div className="text-base font-medium text-white">{launch.name}</div>
                  <div className="mt-1 text-sm text-white/38">{launch.creator}</div>
                </div>
                <div>
                  <div className="text-sm text-white/52">{launch.tagline}</div>
                  <code className="mt-2 block font-mono text-xs text-white/36">{launch.installCommand}</code>
                </div>
                <div className="text-sm text-white/38 md:text-right">
                  {launch.monthlyDownloads ? <div>{launch.monthlyDownloads.toLocaleString()} monthly</div> : null}
                  {launch.stars ? <div>{launch.stars.toLocaleString()} stars</div> : null}
                  <div>{launch.released}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
