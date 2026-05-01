import { useEffect, useState } from "react";
import { detectLocation, fetchWeather, type LocationInfo, type WeatherInfo } from "@/lib/location";

export function WeatherWidget() {
  const [loc, setLoc] = useState<LocationInfo | null>(null);
  const [w, setW] = useState<WeatherInfo | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      const l = await detectLocation();
      if (!alive) return;
      setLoc(l);
      const ww = await fetchWeather(l.lat, l.lon);
      if (alive) setW(ww);
    })();
    return () => { alive = false; };
  }, []);

  if (!loc) {
    return <div className="text-xs text-muted-foreground">Detecting location…</div>;
  }
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-base">{w?.emoji ?? "🌡️"}</span>
      <div className="leading-tight">
        <div className="font-semibold">{loc.city}{loc.region ? `, ${loc.region}` : ""}</div>
        <div className="text-muted-foreground">
          {w ? `${w.tempC}°C · ${w.description}` : "—"}
        </div>
      </div>
    </div>
  );
}
