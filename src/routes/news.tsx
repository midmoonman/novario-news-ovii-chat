import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";
import { BreakingTicker } from "@/components/novario/BreakingTicker";
import { HeroSlider } from "@/components/novario/HeroSlider";
import { TrendingRow } from "@/components/novario/TrendingRow";
import { CategoryGrid } from "@/components/novario/CategoryGrid";

type NewsSearch = { cat?: string };

export const Route = createFileRoute("/news")({
  validateSearch: (s: Record<string, unknown>): NewsSearch => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Novario News — Today's premium stories" },
      { name: "description", content: "Breaking news, business, tech, sports and more from India and the world." },
    ],
  }),
  component: NewsHome,
});

function NewsHome() {
  const { cat } = Route.useSearch();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <BreakingTicker />
      <main className="mx-auto max-w-7xl w-full px-4 py-6 space-y-12 flex-1">
        {!cat && <HeroSlider />}
        {!cat && <TrendingRow />}
        <CategoryGrid initial={cat ?? "Top"} />
      </main>
      <BottomNav />
    </div>
  );
}
