import type { Metadata } from "next";

import { RadarView } from "@/components/radar-view";
import { SiteHeader } from "@/components/site-header";
import { radarCandidates } from "@/lib/radar";

export const metadata: Metadata = {
  title: "Radar • Open CLI",
  description: "CLIs worth trying that are not in the directory yet — with a first command and a try/wait call.",
};

export default function RadarPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <RadarView candidates={radarCandidates} />
      </main>
    </>
  );
}
