import type { Country } from "@/lib/data";
import { fill, type Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Amazon Associates — native "Recommended reading & gear" picks for a country.
 *
 * ⚠️ Placed as an ADDITIONAL layer on top of AdSense + the travel toolkit, not a
 * replacement. Gated by `AMAZON_ENABLED` in `src/lib/flags.ts`.
 *
 * v1 uses **tagged search links** (not specific ASINs): evergreen, scale across
 * every country, and need no PA-API — which Amazon only grants after the first 3
 * qualifying sales. That also keeps us compliant without PA-API: no manual
 * prices and no product images. Upgrade to specific products once PA-API is live.
 *
 * Geo: links point at the US store for now. Set up Amazon **OneLink** (free) to
 * auto-route de/fr/es/pt visitors to their local marketplace with the local tag.
 */

// Replace with the real Associates tracking ID after adding costtrek.com in
// Associates Central → Manage Your Websites (each site gets its own tracking ID).
export const AMAZON_TAG = "costtrek-20";

const AMAZON_HOST = "https://www.amazon.com";

export type AmazonPick = { href: string; label: string };

function searchUrl(query: string): string {
  const u = new URL(`${AMAZON_HOST}/s`);
  u.searchParams.set("k", query);
  u.searchParams.set("tag", AMAZON_TAG);
  return u.toString();
}

/**
 * Native picks for a country: a relocation/expat book search, a phrasebook for
 * the local language (skipped where English is primary), and a universal travel
 * adapter. Labels are localized; the Amazon queries stay English (US store).
 */
export function buildAmazonPicks(co: Country, dict: Dictionary): AmazonPick[] {
  const a = dict.amazon;
  const picks: AmazonPick[] = [
    {
      href: searchUrl(`moving to ${co.name} expat guide`),
      label: fill(a.books, { country: co.name }),
    },
  ];

  const lang = co.languages?.[0];
  if (lang && !/english/i.test(lang)) {
    picks.push({
      href: searchUrl(`${lang} phrasebook`),
      label: fill(a.phrasebook, { language: lang }),
    });
  }

  picks.push({ href: searchUrl("universal travel adapter"), label: a.gear });
  return picks;
}
