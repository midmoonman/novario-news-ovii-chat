import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { WeatherWidget } from "./WeatherWidget";
import { LiveCounter } from "./LiveCounter";
import { LanguageMenu } from "./LanguageMenu";

const NAV: { label: string; cat?: string }[] = [
  { label: "Home" },
  { label: "India", cat: "India" },
  { label: "World", cat: "World" },
  { label: "Business", cat: "Business" },
  { label: "Tech", cat: "Tech" },
  { label: "Sports", cat: "Sports" },
];

export function Header() {
  const [today, setToday] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setToday(new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
  }, []);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between gap-4 py-2 text-xs text-muted-foreground border-b border-border/60">
          <div suppressHydrationWarning>{today || "\u00A0"}</div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <LiveCounter />
              <WeatherWidget />
            </div>
            <LanguageMenu />
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <Link to="/news" className="flex items-baseline gap-2">
            <span className="serif text-3xl md:text-4xl font-extrabold tracking-tight">
              Nov<span className="text-primary">a</span>rio
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">News</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to="/news"
                search={{ cat: n.cat }}
                className="hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-full border border-border overflow-hidden focus-within:border-primary/50 transition-colors h-9">
              <span className="pl-3 text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none px-2 w-32 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const q = e.currentTarget.value.trim();
                    if (q) navigate({ to: "/news", search: { cat: q } });
                  }
                }}
              />
            </div>
            <button 
              onClick={() => alert("Subscribe feature coming soon!")}
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
            >
              Subscribe
            </button>
          </div>
        </div>
        {/* Mobile category nav */}
        <nav className="md:hidden flex items-center gap-4 overflow-x-auto scrollbar-hide pb-3 text-sm font-medium">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to="/news"
              search={{ cat: n.cat }}
              className="shrink-0 hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
