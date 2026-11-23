import { HomeView } from "@/components/home-view";
import { SiteHeader } from "@/components/site-header";
import { getDirectoryResults, getDirectoryStats } from "@/lib/directory";

export default function Home() {
  const initialDirectory = getDirectoryResults("", 24);

  return (
    <>
      <SiteHeader />
      <main>
        <HomeView initialDirectory={initialDirectory} directoryStats={getDirectoryStats()} />
      </main>
    </>
  );
}
