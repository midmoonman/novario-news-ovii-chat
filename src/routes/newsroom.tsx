import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Newsroom — Novario" },
      { name: "description", content: "Inside Novario's 14 newsrooms — desks, editors, and how stories get made." },
    ],
  }),
  component: NewsroomPage,
});

const DESKS = [
  { city: "Mumbai", focus: "Business & Markets" },
  { city: "New Delhi", focus: "Politics & Policy" },
  { city: "Bengaluru", focus: "Technology" },
  { city: "Chennai", focus: "Industry & Auto" },
  { city: "Hyderabad", focus: "Pharma & Deep-tech" },
  { city: "Kolkata", focus: "Eastern India" },
  { city: "Indore", focus: "Central India" },
  { city: "Ahmedabad", focus: "Manufacturing" },
  { city: "Pune", focus: "Auto & Education" },
  { city: "Lucknow", focus: "Uttar Pradesh" },
  { city: "Jaipur", focus: "Rajasthan" },
  { city: "Kochi", focus: "South Coast" },
  { city: "Guwahati", focus: "Northeast" },
  { city: "Chandigarh", focus: "Punjab & Haryana" },
];

function NewsroomPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-5xl w-full px-4 py-12 flex-1">
        <h1 className="serif text-4xl md:text-5xl font-extrabold">Inside the Newsroom</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Reporting from 14 desks across India. Each city has its own beat editors, copy
          desk, and audio team.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESKS.map((d) => (
            <div key={d.city} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
              <div className="serif text-xl font-bold">{d.city}</div>
              <div className="text-sm text-muted-foreground mt-1">{d.focus}</div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
