import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** One rotating "house ad" — an internal link to one of our own features. */
export type FeaturedItem = { href: string; icon: string; title: string };

/**
 * The pool the "Featured on CostTrek" footer band rotates through (one per ISO
 * week, client-side). All titles reuse strings already translated elsewhere, so
 * the band needs no new translations beyond its heading. Add a feature = one
 * entry here.
 */
export function buildFeatured(l: Locale, dict: Dictionary): FeaturedItem[] {
  const c = dict.collections;
  return [
    { href: `/${l}/find-your-city`, icon: "🧭", title: dict.finder.nav },
    { href: `/${l}/calculators`, icon: "📊", title: dict.calculators.title },
    { href: `/${l}/best/cheapest`, icon: "💸", title: c.cheapest.title },
    { href: `/${l}/best/walkable`, icon: "🚶", title: c.walkable.title },
    { href: `/${l}/best/nomad`, icon: "🌍", title: c.nomad.title },
    { href: `/${l}/guides`, icon: "📖", title: dict.guides.title },
    { href: `/${l}/countries`, icon: "🗺️", title: dict.countriesIndex.title },
    { href: `/${l}/best/safest`, icon: "🛡️", title: c.safest.title },
  ];
}
