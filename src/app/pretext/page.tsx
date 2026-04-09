import type { Metadata } from "next";

import { PretextLabShell } from "@/components/pretext-lab-shell";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Pretext demos",
  description: "Interactive demos exploring DOM-free multiline text measurement and layout with Pretext.",
  alternates: {
    canonical: "/pretext",
  },
};

export default function PretextPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PretextLabShell />
      </main>
    </>
  );
}
