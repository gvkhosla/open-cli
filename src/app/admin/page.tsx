import type { Metadata } from "next";

import { AdminActions } from "@/components/admin-actions";
import { BuilderLaunchReviewActions } from "@/components/builder-launch-review-actions";
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
  const pendingLaunches = launches.filter((launch) => launch.status === "pending");
  const approvedLaunches = launches.filter((launch) => launch.status !== "pending" && launch.status !== "rejected");
  const rejectedLaunches = launches.filter((launch) => launch.status === "rejected");

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
              Auto-discovered launches now land in a review queue first. Approve them before they become part of the public feed.
            </p>
          </div>

          <div className="ui-panel rounded-[20px] p-4">
            <div className="section-kicker">Status</div>
            <div className="mt-4 space-y-3 text-sm text-white/62">
              <div>
                Supabase: <span className="text-white">{supabaseReady ? "Connected" : "Not configured"}</span>
              </div>
              <div>
                Pending review: <span className="text-white">{pendingLaunches.length}</span>
              </div>
              <div>
                Approved launches: <span className="text-white">{approvedLaunches.length}</span>
              </div>
              <div>
                Rejected launches: <span className="text-white">{rejectedLaunches.length}</span>
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
          <div className="section-kicker">Pending launch review</div>
          <div className="overflow-hidden border-y border-white/8">
            {pendingLaunches.length === 0 ? (
              <div className="py-8 text-sm text-white/48">
                No pending launches right now. Run a sync to discover new CLI candidates.
              </div>
            ) : null}
            {pendingLaunches.map((launch) => (
              <LaunchRow key={launch.id ?? `${launch.name}-${launch.creator}`} launch={launch} showActions />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="section-kicker">Approved builder launches</div>
          <div className="overflow-hidden border-y border-white/8">
            {approvedLaunches.map((launch) => (
              <LaunchRow key={launch.id ?? `${launch.name}-${launch.creator}`} launch={launch} showActions />
            ))}
          </div>
        </section>

        {rejectedLaunches.length > 0 ? (
          <section className="space-y-4">
            <div className="section-kicker">Rejected launches</div>
            <div className="overflow-hidden border-y border-white/8">
              {rejectedLaunches.map((launch) => (
                <LaunchRow key={launch.id ?? `${launch.name}-${launch.creator}`} launch={launch} showActions />
              ))}
            </div>
          </section>
        ) : null}

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
      </main>
    </>
  );
}

function LaunchRow({
  launch,
  showActions = false,
}: {
  launch: Awaited<ReturnType<typeof getBuilderLaunches>>[number];
  showActions?: boolean;
}) {
  return (
    <div className="grid gap-3 border-b border-white/6 py-4 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)_220px] md:items-start md:gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-base font-medium text-white">{launch.name}</div>
          <StatusPill status={launch.status ?? "approved"} />
        </div>
        <div className="mt-1 text-sm text-white/44">{launch.creator}</div>
        <div className="mt-2 text-xs text-white/36">
          {(launch.source ?? "manual") === "discovered" ? "Auto-discovered" : "Manual"}
          {typeof launch.auditScore === "number" ? ` · audit ${launch.auditScore}` : ""}
        </div>
      </div>

      <div>
        <div className="text-sm text-white/62">{launch.tagline}</div>
        <code className="mt-2 block font-mono text-xs text-white/44">{launch.installCommand}</code>
        {launch.href ? (
          <a href={launch.href} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-white/56 hover:text-white">
            {launch.href.replace(/^https?:\/\//, "")}
          </a>
        ) : null}
      </div>

      <div className="space-y-2 text-sm text-white/50 md:text-right">
        {launch.monthlyDownloads ? <div>{launch.monthlyDownloads.toLocaleString()} monthly</div> : null}
        {launch.stars ? <div>{launch.stars.toLocaleString()} stars</div> : null}
        {launch.publishedAt ? <div>{new Date(launch.publishedAt).toLocaleDateString()}</div> : null}
        {showActions && launch.id ? <BuilderLaunchReviewActions launchId={launch.id} currentStatus={launch.status ?? "approved"} /> : null}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "pending" | "approved" | "rejected" }) {
  const styles = {
    pending: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    rejected: "border-white/12 bg-white/[0.05] text-white/56",
  } as const;

  return <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${styles[status]}`}>{status}</span>;
}
