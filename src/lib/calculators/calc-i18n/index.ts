import type { Locale } from "@/lib/i18n/config";
import type { CalcMeta } from "@/lib/calculators/registry";
import de from "./de";
import fr from "./fr";
import es from "./es";
import pt from "./pt";

/** Translatable text of a calculator (English lives inline in registry.ts). */
export type CalcText = {
  title?: string;
  excerpt?: string;
  intent?: string;
  intro?: string[];
  notes?: string[];
  faq?: { q: string; a: string }[];
  offersHeading?: string;
  offers?: { name?: string; blurb?: string; cta?: string }[];
};

export const CALC_TR: Partial<Record<Locale, Record<string, CalcText>>> = {
  de,
  fr,
  es,
  pt,
};

/** Return a calculator with its prose localized (glyph, slug, hrefs, badges kept). */
export function localizedCalc(c: CalcMeta, l: Locale): CalcMeta {
  const tr = CALC_TR[l]?.[c.slug];
  if (!tr) return c;
  return {
    ...c,
    title: tr.title ?? c.title,
    excerpt: tr.excerpt ?? c.excerpt,
    intent: tr.intent ?? c.intent,
    intro: tr.intro ?? c.intro,
    notes: tr.notes ?? c.notes,
    faq: tr.faq ?? c.faq,
    offersHeading: tr.offersHeading ?? c.offersHeading,
    offers: c.offers.map((o, i) => ({
      ...o,
      name: tr.offers?.[i]?.name ?? o.name,
      blurb: tr.offers?.[i]?.blurb ?? o.blurb,
      cta: tr.offers?.[i]?.cta ?? o.cta,
    })),
  };
}
