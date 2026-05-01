import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/novario/Header";
import { BottomNav } from "@/components/novario/BottomNav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Novario" },
      { name: "description", content: "Reach the Novario newsroom, tip line, and corrections desk." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-12 flex-1">
        <h1 className="serif text-4xl md:text-5xl font-extrabold">Contact Novario</h1>
        <p className="mt-4 text-muted-foreground">
          Tips, corrections, partnerships — we read everything.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase text-muted-foreground tracking-wider">Newsroom</div>
            <div className="mt-1 font-medium">tips@novario.in</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase text-muted-foreground tracking-wider">Corrections</div>
            <div className="mt-1 font-medium">corrections@novario.in</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs uppercase text-muted-foreground tracking-wider">Press</div>
            <div className="mt-1 font-medium">press@novario.in</div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="mt-10 rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Your name" className="rounded-md bg-background border border-border px-3 py-2 text-sm" />
            <input required type="email" placeholder="you@email.com" className="rounded-md bg-background border border-border px-3 py-2 text-sm" />
          </div>
          <textarea required rows={5} placeholder="Your message" className="w-full rounded-md bg-background border border-border px-3 py-2 text-sm" />
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90">
            {sent ? "✓ Sent" : "Send message"}
          </button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
