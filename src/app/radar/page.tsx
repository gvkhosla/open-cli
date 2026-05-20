import type { Metadata } from "next";

import { RadarView } from "@/components/radar-view";
import { SiteHeader } from "@/components/site-header";
import candidates from "@/content/radar-candidates.json";

export const metadata: Metadata = {
  title: "Radar • Open CLI",
  description: "Community-reviewed CLI candidates discovered from GitHub and package registries.",
};

export default function RadarPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <RadarView candidates={candidates} />
      </main>
    </>
  );
}
