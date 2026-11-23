import { permanentRedirect } from "next/navigation";

// Keep previously shared recommendation links useful without a separate page.
export default async function LegacyRecommendation({ searchParams }: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  permanentRedirect(typeof q === "string" && q.trim() ? `/?q=${encodeURIComponent(q.trim())}#directory` : "/");
}
