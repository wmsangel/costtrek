import type { Locale } from "@/lib/i18n/config";
import de from "./de";
import fr from "./fr";
import es from "./es";
import pt from "./pt";

export type LegalBody = (p: { l: Locale }) => React.ReactNode;

/** Translated legal-page bodies per locale, keyed by page ("about","privacy",…). */
export const LEGAL_TR: Partial<Record<Locale, Record<string, LegalBody>>> = {
  de,
  fr,
  es,
  pt,
};

/** Localized legal body, or the English `fallback` JSX when no translation exists. */
export function legalBody(
  key: string,
  l: Locale,
  fallback: React.ReactNode,
): React.ReactNode {
  const body = LEGAL_TR[l]?.[key];
  return body ? body({ l }) : fallback;
}
