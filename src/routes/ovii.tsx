import { useState, useEffect, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";

// Lazy load chat to keep initial bundle small
const OViiChat = lazy(() => import("@/components/novario/OViiChat").then(m => ({ default: m.OViiChat })));

export const Route = createFileRoute("/ovii")({
  head: () => ({
    meta: [
      { title: "OVii" },
      { name: "robots", content: "noindex,nofollow" },
      { name: "google", content: "notranslate" },
      { name: "autocomplete", content: "off" },
    ],
  }),
  component: OViiPage,
});

function OViiPage() {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ovii_unlocked") === "true";
    }
    return false;
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    sessionStorage.setItem("ovii_unlocked", "true");
  };

  const handleLock = () => {
    setUnlocked(false);
    sessionStorage.removeItem("ovii_unlocked");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background" style={{ position: 'fixed', inset: 0 }}>
      {!unlocked && <PasswordModal onUnlock={handleUnlock} />}
      {unlocked && (
        <Suspense fallback={
          <div className="flex items-center justify-center h-full w-full bg-[#0b141a]">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>
        }>
          <OViiChat onLock={handleLock} />
        </Suspense>
      )}
    </div>
  );
}
