import type { Metadata } from "next";

import { SubmitView } from "@/components/submit-view";

export const metadata: Metadata = {
  title: "Submit",
  description: "Submit a new CLI launch, generate the JSON payload, and open a prefilled GitHub issue.",
};

export default async function SubmitPage({ searchParams }: { searchParams: Promise<{ task?: string }> }) {
  const { task } = await searchParams;
  return <SubmitView task={typeof task === "string" ? task.slice(0, 300) : ""} />;
}
