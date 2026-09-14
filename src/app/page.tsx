import { HomeView } from "@/components/home-view";
import { SiteHeader } from "@/components/site-header";
import { getDirectoryResults, getDirectoryStats } from "@/lib/directory";
import { getRadarPreview } from "@/lib/radar";

export default function Home() {
  const initialDirectory = getDirectoryResults("", 125);

  return (
    <>
      <SiteHeader />
      <main>
        <HomeView initialDirectory={initialDirectory} directoryStats={getDirectoryStats()} radarPreview={getRadarPreview()} />
      </main>
    </>
  );
}
