import { HomeView } from "@/components/home-view";
import { SiteHeader } from "@/components/site-header";
import { getBuilderLaunches } from "@/lib/builder-launches";

export default async function Home() {
  const builderLaunches = await getBuilderLaunches();

  return (
    <>
      <SiteHeader />
      <main>
        <HomeView builderLaunches={builderLaunches} />
      </main>
    </>
  );
}
