import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES } from "@/lib/languages";

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState("English · India");
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 320 });
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        dropRef.current && !dropRef.current.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const vw = window.innerWidth;
      const dropW = Math.min(320, vw - 16);
      let left = rect.right - dropW;
      left = Math.max(8, Math.min(left, vw - dropW - 8));
      setDropdownPos({ top: rect.bottom + 8, left, width: dropW });
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.native.toLowerCase().includes(q) ||
        l.english.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q),
    );
  }, [query]);

  const onPick = (code: string, label: string) => {
    if (code === "zulad") {
      setOpen(false);
      window.dispatchEvent(new Event("open-ovii"));
      return;
    }
    setCurrent(label);
    setOpen(false);
  };

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary/50 transition-colors"
        aria-label="Choose language"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
        <span className="font-medium">{current}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={dropRef}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "fixed",
                top: dropdownPos.top,
                left: dropdownPos.left,
                width: dropdownPos.width,
                zIndex: 99999,
              }}
              className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden"
            >
              <div className="p-3 border-b border-border">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search languages…"
                  className="w-full rounded-md bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                />
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {filtered.map((l) => {
                  const label = l.region ? `${l.native} · ${l.region}` : l.native;
                  return (
                    <button
                      key={l.code}
                      onClick={() => onPick(l.code, label)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted/40 flex items-center justify-between gap-3"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="font-medium truncate block">{l.native}</span>
                        {l.region && (
                          <span className="text-xs text-muted-foreground">{l.english} · {l.region}</span>
                        )}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                        {l.code === "zulad" ? "" : l.code}
                      </span>
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">No matches.</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
