export const locales = ["en", "de", "fr", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * Index-reduction (owner decision 2026-11-18). The site shipped 5 identical
 * language copies of every page; in the SERP they competed with each other and
 * the domain never crossed the threshold where Google indexes the long tail. So
 * only **en + es** stay indexable (es is the one non-English locale with GSC
 * impressions). fr/de/pt still render and are still crawlable (robots
 * index:false, follow:true) with their hreflang kept, but are dropped from the
 * sitemap — removing ~15k URLs from competition. Widen as a locale proves demand.
 */
export const INDEXABLE_LOCALES = new Set<Locale>(["en", "es"]);
export function localeIndexable(locale: Locale): boolean {
  return INDEXABLE_LOCALES.has(locale);
}

/** BCP-47 tags for <html lang> / OpenGraph / Intl formatting. */
export const LOCALE_BCP47: Record<Locale, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  pt: "pt-PT",
};

/** Native language name, for the language switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the best supported locale from an Accept-Language header. */
export function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const requested = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of requested) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return defaultLocale;
}
