import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export const LANGS = ["RU", "KZ", "EN"] as const;
export type Lang = (typeof LANGS)[number];

/** Tuple in order [RU, KZ, EN]. */
export type Tr = readonly [string, string, string];

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (tuple: Tr) => string;
  idx: number;
}

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "abis-lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "RU";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    return stored && (LANGS as readonly string[]).includes(stored) ? stored : "RU";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang === "KZ" ? "kk" : lang === "EN" ? "en" : "ru";
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const idx = LANGS.indexOf(lang);
  const t = useCallback((tuple: Tr) => tuple[idx] ?? tuple[0], [idx]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, idx }}>{children}</LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
