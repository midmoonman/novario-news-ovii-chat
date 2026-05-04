import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function BottomNav() {
  const [joined, setJoined] = useState(false);
  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <Link to="/news" className="serif text-2xl font-extrabold mb-3 inline-block">
              Nov<span className="text-primary">a</span>rio
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed mt-2">
              Independent journalism for a connected India. Premium reporting from newsrooms in 14 cities.
            </p>
          </div>
          <div>
            <div className="font-bold mb-3">Sections</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/news" search={{ cat: "India" }} className="hover:text-foreground">India</Link></li>
              <li><Link to="/news" search={{ cat: "World" }} className="hover:text-foreground">World</Link></li>
              <li><Link to="/news" search={{ cat: "Business" }} className="hover:text-foreground">Business</Link></li>
              <li><Link to="/news" search={{ cat: "Tech" }} className="hover:text-foreground">Tech</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/newsroom" className="hover:text-foreground">Newsroom</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="font-bold mb-3">Subscribe</div>
            <p className="text-xs text-muted-foreground mb-3">Daily briefing, 7am IST.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setJoined(true); }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                className="flex-1 rounded-md bg-background border border-border px-3 py-2 text-xs min-w-0"
                placeholder="you@email.com"
              />
              <button className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shrink-0">
                {joined ? "✓" : "Join"}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span>© 2026 Novario Media Pvt. Ltd.</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] tracking-widest uppercase border border-primary/20">
              100% Authentic
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-foreground cursor-pointer">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground cursor-pointer">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
