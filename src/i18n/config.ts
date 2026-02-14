import type { MarketingDictionary } from "./types";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, () => Promise<MarketingDictionary>> = {
  en: () => import("./locales/en").then((m) => m.default),
  ar: () => import("./locales/ar").then((m) => m.default),
};

export async function getDictionary(locale: string): Promise<MarketingDictionary> {
  const load = dictionaries[locale as Locale];
  if (!load) {
    return dictionaries[defaultLocale]();
  }
  return load();
}
