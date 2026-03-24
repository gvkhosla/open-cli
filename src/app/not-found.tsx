import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in-up space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/8 bg-white/[0.02]">
            <span className="text-3xl font-medium text-white/84">404</span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            That CLI could not be found.
          </h1>
          <p className="mx-auto max-w-lg text-white/48">
            The tool may have moved, been removed, or the URL may be off. Search the directory to find the right page.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 7H1M1 7l5-5M1 7l5 5" />
              </svg>
              Back to Open CLI
            </Link>
            <Link
              href="/submit"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-5 text-sm text-white/60 transition hover:border-white/18 hover:bg-white/[0.04] hover:text-white"
            >
              Submit a tool
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
