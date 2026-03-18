import { HomeView } from "@/components/home-view";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeView />
      </main>
    </>
  );
}
