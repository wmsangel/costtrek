import type { Locale } from "@/lib/i18n/config";
import type { Country } from "../schema";
import de from "./de";
import fr from "./fr";
import es from "./es";
import pt from "./pt";

/** Translatable text fields of a country (English lives inline in countries.ts). */
export type CountryText = {
  summary?: string;
  visaFreeNote?: string;
  residencyNote?: string;
  nomadNote?: string;
  healthcareNote?: string;
  incomeTaxNote?: string;
  vatNote?: string;
  socialNote?: string;
  cgNote?: string;
  taxNotes?: string[];
  visaNotes?: (string | null)[]; // by visaTypes index; null = keep English
};

export const COUNTRY_TR: Partial<Record<Locale, Record<string, CountryText>>> = {
  de,
  fr,
  es,
  pt,
};

/** Return a Country with its prose fields localized (numbers, codes and official
 *  visa-program names untouched). Falls back to English field-by-field. */
export function translateCountry(c: Country, l: Locale): Country {
  const tr = COUNTRY_TR[l]?.[c.code];
  if (!tr) return c;
  const t = c.taxes;
  const im = c.immigration;
  return {
    ...c,
    taxes: {
      ...t,
      incomeTax: { ...t.incomeTax, note: tr.incomeTaxNote ?? t.incomeTax.note },
      vat: t.vat ? { ...t.vat, note: tr.vatNote ?? t.vat.note } : t.vat,
      socialSecurity: t.socialSecurity
        ? { ...t.socialSecurity, note: tr.socialNote ?? t.socialSecurity.note }
        : t.socialSecurity,
      capitalGains: t.capitalGains
        ? { ...t.capitalGains, note: tr.cgNote ?? t.capitalGains.note }
        : t.capitalGains,
      notes: tr.taxNotes ?? t.notes,
    },
    immigration: {
      ...im,
      summary: tr.summary ?? im.summary,
      visaFreeNote: tr.visaFreeNote ?? im.visaFreeNote,
      visaTypes: im.visaTypes.map((v, i) => ({
        ...v,
        note: tr.visaNotes?.[i] ?? v.note,
      })),
      residency: im.residency
        ? { ...im.residency, note: tr.residencyNote ?? im.residency.note }
        : im.residency,
      digitalNomad: im.digitalNomad
        ? { ...im.digitalNomad, note: tr.nomadNote ?? im.digitalNomad.note }
        : im.digitalNomad,
    },
    healthcare: c.healthcare
      ? { ...c.healthcare, note: tr.healthcareNote ?? c.healthcare.note }
      : c.healthcare,
  };
}
