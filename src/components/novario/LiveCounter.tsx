import { useEffect, useState } from "react";

export function LiveCounter() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    setN(8400 + Math.floor(Math.random() * 3000));
    const t = setInterval(() => setN((v) => (v ?? 9000) + Math.floor(Math.random() * 7) - 2), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-breaking opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-breaking" />
      </span>
      <span className="font-semibold tabular-nums">{n?.toLocaleString() ?? "—"}</span>
      <span className="text-muted-foreground">reading now</span>
    </div>
  );
}
