"use client";

import dynamic from "next/dynamic";

const PretextLab = dynamic(
  () => import("@/components/pretext-lab").then((module) => module.PretextLab),
  {
    ssr: false,
  },
);

export function PretextLabShell() {
  return <PretextLab />;
}
