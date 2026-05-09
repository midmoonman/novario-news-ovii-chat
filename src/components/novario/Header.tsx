import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { WeatherWidget } from "./WeatherWidget";
import { LiveCounter } from "./LiveCounter";
import { LanguageMenu } from "./LanguageMenu";
import { useTranslation } from "@/lib/i18n";

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
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="flex items-center justify-between gap-4 py-2 text-xs text-muted-foreground border-b border-border/60 min-w-0">
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
            <div className="h-full w-1/3 bg-primary rounded-full animate-loading-bar" />
          </div>
        )}

        <div className="flex items-center justify-between py-4 min-w-0 gap-2">
          <Link to="/news" className="flex items-baseline gap-2 shrink-0">
            <span className="serif text-3xl md:text-4xl font-extrabold tracking-tight">
              Nov<span className="text-primary">a</span>rio
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">News</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV.map((n) => {
              const isActive = activeLabel === n.label;
              return (
                <Link
                  key={n.label}
                  to="/news"
                  search={{ cat: n.cat }}
                  className={`relative py-1 transition-all duration-200 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {t(n.label)}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center rounded-full border border-border overflow-hidden focus-within:border-primary/50 transition-colors h-9">
              <span className="pl-3 text-muted-foreground">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input
                type="text"
                placeholder={t("Search...")}
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
              {t("Subscribe")}
            </button>
          </div>
        </div>
        {/* Mobile category nav with active glow */}
        <nav className="md:hidden flex items-center gap-4 overflow-x-auto scrollbar-hide pb-3 text-sm font-medium">
          {NAV.map((n) => {
            const isActive = activeLabel === n.label;
            return (
              <Link
                key={n.label}
                to="/news"
                search={{ cat: n.cat }}
                className={`relative shrink-0 pb-1 transition-all duration-200 ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {t(n.label)}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
