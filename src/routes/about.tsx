import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Novario" },
      { name: "description", content: "Novario is independent journalism for a connected India, with newsrooms in 14 cities." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
        <h1 className="serif text-4xl md:text-5xl font-extrabold">About Novario</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Novario is independent journalism for a connected India. We publish premium reporting
          from newsrooms in 14 cities, covering the stories that move markets, shape policy,
          and define our culture.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { k: "14", v: "Newsroom cities" },
            { k: "260+", v: "Journalists & editors" },
            { k: "9M", v: "Monthly readers" },
          ].map((s) => (
            <div key={s.v} className="rounded-xl border border-border bg-card p-6">
              <div className="serif text-3xl font-bold text-primary">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
        <h2 className="serif text-2xl font-bold mt-12">Our charter</h2>
        <p className="mt-3 text-foreground/90 leading-relaxed">
          Accuracy before speed. Sources before opinions. Readers before advertisers. We
          publish corrections in public, fund original reporting from subscriber revenue, and
          decline stories we cannot independently verify.
        </p>
      </main>
      <BottomNav />
    </div>
  );
}
