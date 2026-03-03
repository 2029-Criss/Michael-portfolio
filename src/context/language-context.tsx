import { createContext, useCallback, useState, type ReactNode } from "react";
import { translations, type TranslationKey } from "@/context/translations";
import type { Lang, LanguageContextType } from "@/context/types";

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang") as Lang;
    return saved === "en" ? "en" : "fr";
  });

  const changeLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[key]?.[lang] || key;
    },
    [lang],
  );

  return <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>{children}</LanguageContext.Provider>;
};
