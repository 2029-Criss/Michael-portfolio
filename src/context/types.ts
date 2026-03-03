import type { TranslationKey } from "@/context/translations";

export type Lang = "fr" | "en";

export interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}
