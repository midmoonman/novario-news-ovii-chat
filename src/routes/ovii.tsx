import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PasswordModal } from "@/components/novario/PasswordModal";
import { OViiChat } from "@/components/novario/OViiChat";

export const Route = createFileRoute("/ovii")({
  head: () => ({ meta: [{ title: "OVii" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: OViiPage,
});

function OViiPage() {
  // Always start locked — re-prompt on every refresh per spec.
  const [unlocked, setUnlocked] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {!unlocked && <PasswordModal onUnlock={() => setUnlocked(true)} />}
      {unlocked && <OViiChat onLock={() => setUnlocked(false)} />}
    </div>
  );
}
