import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function BottomNav() {
  const [joined, setJoined] = useState(false);
  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
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
          <div>
            <div className="font-bold mb-3">Subscribe</div>
            <p className="text-xs text-muted-foreground mb-3">Daily briefing, 7am IST.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setJoined(true); }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                className="flex-1 rounded-md bg-background border border-border px-3 py-2 text-xs"
                placeholder="you@email.com"
              />
              <button className="rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">
                {joined ? "✓" : "Join"}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div>© 2026 Novario Media Pvt. Ltd.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-foreground cursor-pointer">Terms</a>
            <a className="hover:text-foreground cursor-pointer">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
