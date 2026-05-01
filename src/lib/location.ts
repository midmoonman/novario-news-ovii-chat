export type LocationInfo = {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
};

export type WeatherInfo = {
  tempC: number;
  code: number;
  description: string;
  emoji: string;
};

const FALLBACK: LocationInfo = {
  city: "Indore",
  region: "Madhya Pradesh",
  country: "India",
  lat: 22.7196,
  lon: 75.8577,
};

export async function detectLocation(): Promise<LocationInfo> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) throw new Error("ipapi failed");
    const j = await res.json();
    if (!j.city) throw new Error("no city");
    return {
      city: j.city,
      region: j.region || "",
      country: j.country_name || "",
      lat: Number(j.latitude),
      lon: Number(j.longitude),
    };
  } catch {
    return FALLBACK;
  }
}

const WEATHER_CODES: Record<number, { d: string; e: string }> = {
  0: { d: "Clear sky", e: "☀️" },
  1: { d: "Mostly clear", e: "🌤️" },
  2: { d: "Partly cloudy", e: "⛅" },
  3: { d: "Overcast", e: "☁️" },
  45: { d: "Foggy", e: "🌫️" },
  48: { d: "Foggy", e: "🌫️" },
  51: { d: "Light drizzle", e: "🌦️" },
  61: { d: "Light rain", e: "🌧️" },
  63: { d: "Rain", e: "🌧️" },
  65: { d: "Heavy rain", e: "⛈️" },
  71: { d: "Snow", e: "🌨️" },
  80: { d: "Showers", e: "🌦️" },
  95: { d: "Thunderstorm", e: "⛈️" },
};

export async function fetchWeather(lat: number, lon: number): Promise<WeatherInfo | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const j = await res.json();
    const code = j.current?.weather_code ?? 0;
    const meta = WEATHER_CODES[code] || { d: "Fair", e: "🌡️" };
    return {
      tempC: Math.round(j.current?.temperature_2m ?? 0),
      code,
      description: meta.d,
      emoji: meta.e,
    };
  } catch {
    return null;
  }
}
