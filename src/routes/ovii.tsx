import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";
import { OViiChat } from "@/components/novario/OViiChat";

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
  // Always start locked — re-prompt on every refresh per spec.
  const [unlocked, setUnlocked] = useState(false);

  // Suppress Chrome credential / autofill UI at page level
  useEffect(() => {
    // Prevent scroll on the body entirely for this page
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.documentElement.style.overflow = "hidden";

    // Add meta tag to suppress Chrome translate
    const meta = document.createElement("meta");
    meta.name = "google";
    meta.content = "notranslate";
    document.head.appendChild(meta);

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      meta.remove();
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background" style={{ position: 'fixed', inset: 0 }}>
      {!unlocked && <PasswordModal onUnlock={() => setUnlocked(true)} />}
      {unlocked && <OViiChat onLock={() => setUnlocked(false)} />}
    </div>
  );
}
