import { useEffect, useState } from "react";
import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";
import { OViiChat } from "@/components/novario/OViiChat";

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
  const [showOvii, setShowOvii] = useState(() => {
    const noLockUntil = localStorage.getItem("ovii_no_lock_until");
    return (noLockUntil && parseInt(noLockUntil) > Date.now());
  });
  const [unlocked, setUnlocked] = useState(() => {
    const noLockUntil = localStorage.getItem("ovii_no_lock_until");
    return (noLockUntil && parseInt(noLockUntil) > Date.now());
  });

  const chatOpen = showOvii && unlocked;

  useEffect(() => {
    const handleOpen = () => setShowOvii(true);
    window.addEventListener("open-ovii", handleOpen);
    return () => window.removeEventListener("open-ovii", handleOpen);
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
      {showOvii && !unlocked && (
        <PasswordModal onUnlock={() => setUnlocked(true)} />
      )}
      {chatOpen && (
        <OViiChat onLock={() => { setUnlocked(false); setShowOvii(false); }} />
      )}
    </div>
  );
}
