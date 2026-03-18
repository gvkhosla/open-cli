import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="section-kicker">404</div>
        <h1 className="mt-4 text-4xl font-medium tracking-tight text-white">That CLI could not be found.</h1>
        <p className="mt-4 max-w-lg text-white/56">
          Try going back to the directory and browsing the leaderboard or featured collection.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm text-white/82 transition hover:border-white/18 hover:bg-white/[0.06]"
        >
          Back to Open CLI
        </Link>
      </main>
    </>
  );
}
