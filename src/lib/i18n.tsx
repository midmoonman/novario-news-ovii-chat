import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TranslationContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: (text: string) => string;
};

const TranslationContext = createContext<TranslationContextType>({
  lang: "en",
  setLang: () => {},
  t: (text: string) => text,
});

const CACHE_KEY = "novario-translations-cache";

// Simple in-memory cache to avoid duplicate API calls
const memCache: Record<string, Record<string, string>> = {};
let localCache: Record<string, Record<string, string>> = {};

try {
  localCache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
} catch (e) {
  localCache = {};
}

// Ensure nested object exists
const getCacheObj = (lang: string) => {
  if (!localCache[lang]) localCache[lang] = {};
  if (!memCache[lang]) memCache[lang] = {};
};

const saveCache = () => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(localCache));
  } catch (e) {}
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Try to load user's last selected language, default to 'en'
  const [lang, setLangState] = useState<string>(() => {
    try {
      return localStorage.getItem("novario-lang") || "en";
    } catch {
      return "en";
    }
  });

  const [tick, setTick] = useState(0); // Used to force re-render when a new translation arrives

  const setLang = (newLang: string) => {
    // Extract base language code (e.g., 'hi-IN' -> 'hi'), except for 'zh'
    let gtCode = newLang;
    if (newLang !== 'en' && newLang.includes("-") && !newLang.startsWith("zh")) {
      gtCode = newLang.split("-")[0];
    }
    
    setLangState(gtCode);
    try {
      localStorage.setItem("novario-lang", gtCode);
    } catch {}
  };

  const translateText = async (text: string, targetLang: string) => {
    if (!text || text.trim() === "" || targetLang === "en") return;
    
    getCacheObj(targetLang);

    // If we already have it, no need to fetch
    if (localCache[targetLang][text] || memCache[targetLang][text]) return;

    // Mark as fetching to avoid concurrent duplicate requests
    memCache[targetLang][text] = "fetching...";

    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await res.json();
      
      let translated = "";
      if (data && data[0]) {
        for (let i = 0; i < data[0].length; i++) {
          translated += data[0][i][0];
        }
      }

      if (translated) {
        localCache[targetLang][text] = translated;
        memCache[targetLang][text] = translated;
        saveCache();
        // Force a re-render so components get the new text
        setTick((t) => t + 1);
      } else {
        delete memCache[targetLang][text];
      }
    } catch (e) {
      console.error("Translation failed for:", text, e);
      delete memCache[targetLang][text];
    }
  };

  const t = (text: string): string => {
    if (!text || lang === "en" || lang === "zulad") return text;
    
    getCacheObj(lang);

    // Return from cache if available
    const cached = localCache[lang][text];
    if (cached) return cached;

    // If not in cache and not currently fetching, initiate fetch
    if (!memCache[lang][text]) {
      translateText(text, lang);
    }

    // Return original text temporarily while fetching
    return text;
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
