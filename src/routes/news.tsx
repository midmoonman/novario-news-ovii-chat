import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { HeroSlider } from "@/components/novario/HeroSlider";
import { TrendingRow } from "@/components/novario/TrendingRow";
import { CategoryGrid } from "@/components/novario/CategoryGrid";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Novario — Today's premium news" },
      { name: "description", content: "Breaking news, business, tech, sports and more from India and the world." },
    ],
  }),
  component: NewsHome,
});

function NewsHome() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <BreakingTicker />
      <main className="mx-auto max-w-7xl w-full px-4 py-6 space-y-12 flex-1">
        <HeroSlider />
        <TrendingRow />
        <CategoryGrid />
      </main>
      <BottomNav />
    </div>
  );
}
