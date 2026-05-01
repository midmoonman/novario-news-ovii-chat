import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export function BottomNav() {
  const [reveal, setReveal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 600) setScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => {
      // OVii reveal: requires scroll AND 25 seconds
    }, 25000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let timeoutId: number | undefined;
    const tryReveal = () => {
      if (scrolled) setReveal(true);
    };
    timeoutId = window.setTimeout(tryReveal, 25000);
    return () => { if (timeoutId) clearTimeout(timeoutId); };
  }, [scrolled]);

  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="serif text-2xl font-extrabold mb-3">Nov<span className="text-primary">a</span>rio</div>
            <p className="text-muted-foreground text-xs leading-relaxed">Independent journalism for a connected India. Premium reporting from newsrooms in 14 cities.</p>
          </div>
          <div>
            <div className="font-bold mb-3">Sections</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a className="hover:text-foreground cursor-pointer">India</a></li>
              <li><a className="hover:text-foreground cursor-pointer">World</a></li>
              <li><a className="hover:text-foreground cursor-pointer">Business</a></li>
              <li><a className="hover:text-foreground cursor-pointer">Tech</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a className="hover:text-foreground cursor-pointer">About</a></li>
              <li><a className="hover:text-foreground cursor-pointer">Newsroom</a></li>
              <li><a className="hover:text-foreground cursor-pointer">Careers</a></li>
              <li><a className="hover:text-foreground cursor-pointer">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Subscribe</div>
            <p className="text-xs text-muted-foreground mb-3">Daily briefing, 7am IST.</p>
            <div className="flex gap-2">
              <input className="flex-1 rounded-md bg-background border border-border px-3 py-2 text-xs" placeholder="you@email.com" />
              <button className="rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Novario Media Pvt. Ltd.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-foreground cursor-pointer">Terms</a>
            <a className="hover:text-foreground cursor-pointer">Privacy</a>
            <AnimatePresence>
              {reveal && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link to="/ovii" className="text-muted-foreground/60 hover:text-primary tracking-widest text-[10px] italic">
                    ovii
                  </Link>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
