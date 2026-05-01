import { Link } from "@tanstack/react-router";
import { WeatherWidget } from "./WeatherWidget";
import { LiveCounter } from "./LiveCounter";

export function Header() {
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between gap-4 py-2 text-xs text-muted-foreground border-b border-border/60">
          <div>{today}</div>
          <div className="hidden md:flex items-center gap-6">
            <LiveCounter />
            <WeatherWidget />
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <Link to="/news" className="flex items-baseline gap-2">
            <span className="serif text-3xl md:text-4xl font-extrabold tracking-tight">
              Nov<span className="text-primary">a</span>rio
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">premium news</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/news" className="hover:text-primary">Home</Link>
            <a className="hover:text-primary cursor-pointer">India</a>
            <a className="hover:text-primary cursor-pointer">World</a>
            <a className="hover:text-primary cursor-pointer">Business</a>
            <a className="hover:text-primary cursor-pointer">Tech</a>
            <a className="hover:text-primary cursor-pointer">Sports</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-full border border-border hover:border-primary/50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90">Subscribe</button>
          </div>
        </div>
      </div>
    </header>
  );
}
