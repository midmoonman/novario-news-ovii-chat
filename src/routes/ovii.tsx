import { useState, useEffect, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";

// Lazy load chat to keep initial bundle small
const OViiChat = lazy(() => import("@/components/novario/OViiChat").then(m => ({ default: m.OViiChat })));
const MasterRoom = lazy(() => import("@/components/novario/MasterRoom").then(m => ({ default: m.MasterRoom })));

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
  const [mode, setMode] = useState<"chat" | "master" | null>(() => {
    if (typeof window !== "undefined") {
      const isMaster = localStorage.getItem("ovii_master_unlocked") === "true";
      const isChat = localStorage.getItem("ovii_unlocked") === "true";
      if (isMaster) return "master";
      if (isChat) return "chat";
    }
    return null;
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

  const handleUnlock = (newMode: "chat" | "master") => {
    setMode(newMode);
    if (newMode === "chat") {
      localStorage.setItem("ovii_unlocked", "true");
      localStorage.removeItem("ovii_master_unlocked");
    } else if (newMode === "master") {
      localStorage.setItem("ovii_master_unlocked", "true");
      localStorage.removeItem("ovii_unlocked");
    }
  };

  const handleLock = () => {
    setMode(null);
    localStorage.removeItem("ovii_unlocked");
    localStorage.removeItem("ovii_master_unlocked");
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background" style={{ position: 'fixed', inset: 0 }}>
      <Suspense fallback={
        <div className="flex items-center justify-center h-full w-full bg-[#0b141a]">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
      }>
        {!mode && <PasswordModal onUnlock={handleUnlock} />}
        {mode === "chat" && <OViiChat onLock={handleLock} />}
        {mode === "master" && <MasterRoom onLock={handleLock} />}
      </Suspense>
    </div>
  );
}
