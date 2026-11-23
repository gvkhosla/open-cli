import { HomeView } from "@/components/home-view";
import { SiteHeader } from "@/components/site-header";
import { getDirectoryResults, getDirectoryStats } from "@/lib/directory";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const initialDirectory = getDirectoryResults(typeof q === "string" ? q.trim() : "", 24);

  return (
    <>
      <SiteHeader />
      <main>
        <HomeView key={initialDirectory.query} initialDirectory={initialDirectory} directoryStats={getDirectoryStats()} />
      </main>
    </>
  );
}
