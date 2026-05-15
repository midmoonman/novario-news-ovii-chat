import { Suspense, useEffect, useState, lazy, useRef } from "react";
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, ensureAnonAuth } from "@/lib/firebase";

const ChampChat = lazy(() => import("@/components/novario/ChampChat").then(m => ({ default: m.ChampChat })));

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground serif">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This story doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link
            to="/news"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to Novario
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});


function RootComponent() {
  const [showChamp, setShowOvii] = useState(() => {
    const noLockUntil = localStorage.getItem("champ_unlocked_at");
    return (noLockUntil && parseInt(noLockUntil) > Date.now());
  });
  const [unlocked, setUnlocked] = useState(() => {
    const noLockUntil = localStorage.getItem("champ_unlocked_at");
    const isUnlocked = localStorage.getItem("champ_unlocked") === "true";
    return isUnlocked || (noLockUntil && parseInt(noLockUntil) > Date.now());
  });
  const [room, setRoom] = useState<string>("champ-room");
  const [password, setPassword] = useState<string>("112233");
  const initialLoadRef = useRef(true);

  // ── Presence Logic ─────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        await ensureAnonAuth();
      } catch (e) {
        console.error("Auth failed", e);
      }
    })();
  }, []);



  const chatOpen = showChamp && unlocked;

  useEffect(() => {
    const handleOpen = () => setShowOvii(true);
    window.addEventListener("open-champ", handleOpen);
    return () => window.removeEventListener("open-champ", handleOpen);
  }, []);

  // Freeze EVERYTHING when chat is open — no leaking, no scrolling
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (chatOpen) {
      html.style.overflow = "hidden";
      html.style.position = "fixed";
      html.style.width = "100%";
      html.style.height = "100%";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      html.style.position = "";
      html.style.width = "";
      html.style.height = "";
      body.style.overflow = "";
    };
  }, [chatOpen]);

  return (
    <div className="w-full overflow-x-hidden relative flex flex-col min-h-screen">
      {/* Only render news page when chat is NOT open to prevent paint-through */}
      {!chatOpen && <Outlet />}
      {showChamp && !unlocked && (
        <PasswordModal onUnlock={(mode, r) => { 
          setRoom(r); 
          setPassword(r === "Champ" ? "786786" : "112233");
          setUnlocked(true); 
          localStorage.setItem("champ_unlocked", "true");
        }} />
      )}
      {chatOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b141a]">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        }>
          <ChampChat onLock={() => { setUnlocked(false); setShowOvii(false); }} room={room} password={password} />
        </Suspense>
      )}
    </div>
  );
}
