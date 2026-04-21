import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export function SubmitView() {
  const issueUrl = `${siteConfig.links.github}/issues/new?labels=cli-suggestion&title=Suggest+CLI:+&body=%23%23+CLI+name%0A%0A%23%23+Install+command%0A%0A%23%23+What+it+does%0A%0A%23%23+Project+link%0A`;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-white/50">
          <Link href="/" className="transition hover:text-white">open-cli</Link>
          <svg className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4" /></svg>
          <span className="text-white/52">submit</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-4">
            <div className="section-kicker">Submit</div>
            <h1 className="ui-title-lg max-w-3xl">Suggest a CLI.</h1>
            <p className="ui-body max-w-2xl">
              If a useful CLI is missing, open a GitHub issue with the name, install command, and what it does. We review suggestions regularly.
            </p>
            <div className="pt-2">
              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Open GitHub issue
              </a>
            </div>
          </div>

          <div className="ui-panel rounded-[20px] p-4 sm:p-5">
            <div className="ui-label">What helps most</div>
            <ul className="mt-3 space-y-2.5 text-sm leading-6 text-white/64">
              <li>• A working project or docs link</li>
              <li>• A real install command</li>
              <li>• A one-line explanation of what the tool does</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
