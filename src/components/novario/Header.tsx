import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { WeatherWidget } from "./WeatherWidget";
import { LiveCounter } from "./LiveCounter";
import { LanguageMenu } from "./LanguageMenu";
import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

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
  const { t } = useTranslation();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const searchCat = useRouterState({ select: (s) => {
    try {
      const params = new URLSearchParams(s.location.searchStr);
      return params.get("cat") || undefined;
    } catch { return undefined; }
  }});
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Determine which nav item is active
  const getActiveLabel = () => {
    if (pathname !== "/news" && pathname !== "/news/") return undefined;
    if (!searchCat) return "Home";
    return searchCat;
  };
  const activeLabel = getActiveLabel();

  useEffect(() => {
    setToday(new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-background/90 border-b border-primary/10 w-full overflow-x-hidden shadow-[0_8px_40px_rgba(245,158,11,0.15)]">
      {/* Top Glow Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-50" />
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="flex items-center justify-between gap-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 border-b border-primary/5 min-w-0">
          <div suppressHydrationWarning className="truncate">{today || "\u00A0"}</div>
          <div className="flex items-center gap-3 md:gap-6 shrink-0">
            <div className="hidden md:flex items-center gap-6">
              <LiveCounter />
              <WeatherWidget />
            </div>
            <LanguageMenu />
          </div>
        </div>

        {/* Loading progress bar */}
        {isLoading && (
          <div className="absolute left-0 right-0 top-full h-0.5 z-50 overflow-hidden">
            <div className="h-full w-1/3 bg-primary rounded-full animate-loading-bar shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </div>
        )}

        <div className="flex items-center justify-between py-5 min-w-0 gap-2 relative">
          {/* Logo Bloom */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-20 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
          
          <Link to="/news" className="flex items-baseline gap-2.5 shrink-0 group relative z-10">
            <span className="serif text-3xl md:text-5xl font-black tracking-tighter transition-all group-hover:tracking-normal">
              Nov<span className="text-primary relative">a<span className="absolute -inset-1 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /></span>rio
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary leading-none">News</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-none mt-0.5">Premium Hub</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
            {NAV.map((n) => {
              const isActive = activeLabel === n.label;
              return (
                <Link
                  key={n.label}
                  to="/news"
                  search={{ cat: n.cat }}
                  className={`relative py-1 transition-all duration-300 ${
                    isActive
                      ? "text-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                      : "text-foreground/50 hover:text-primary"
                  }`}
                >
                  {t(n.label)}
                  {isActive && (
                    <motion.span 
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]" 
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center rounded-full bg-muted/50 border border-primary/10 overflow-hidden focus-within:border-primary/50 transition-all h-10 w-48 shadow-inner">
              <span className="pl-4 text-muted-foreground/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input
                type="text"
                placeholder={t("Search...")}
                className="bg-transparent border-none focus:outline-none px-3 w-full text-xs font-bold"
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
              className="rounded-full bg-gradient-to-br from-primary to-orange-600 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(245,158,11,0.3)]"
            >
              {t("Join")}
            </button>
          </div>
        </div>
        {/* Mobile category nav with active glow */}
        <nav className="md:hidden flex items-center gap-6 overflow-x-auto scrollbar-hide pb-4 text-xs font-black uppercase tracking-widest">
          {NAV.map((n) => {
            const isActive = activeLabel === n.label;
            return (
              <Link
                key={n.label}
                to="/news"
                search={{ cat: n.cat }}
                className={`relative shrink-0 pb-1 transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/40 hover:text-primary"
                }`}
              >
                {t(n.label)}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
