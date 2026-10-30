import "server-only";

/**
 * Affiliate link registry + the /go cloaking helper. SERVER-ONLY: the real
 * tracking URLs never reach client markup — pages link to `/go/<id>` instead,
 * and `src/app/go/[id]/route.ts` resolves the id here and 302s a real human to
 * the partner (bots get 204, no Location). This stops affiliate networks from
 * counting crawler hits as clicks (see research/ADS-AND-LINKS.md).
 *
 * `id → { url, net }`. `net` picks the sub-id param we append from the page slug
 * (`subid` for Admitad, `sub_id` for Travelpayouts; direct/indoleads get none).
 *
 * These URLs mirror the deeplinks that still live in the data/components
 * (`toolkit.ts`, `cityProfiles.ts` referral slots, the /best & compare CTAs,
 * `MyTripCard`). `goHref(url, slug)` resolves a raw deeplink to its /go path by
 * exact match; an unknown URL falls through unchanged, so nothing ever breaks —
 * it just isn't cloaked. Keep this list in sync when a deeplink changes.
 */

export type AffiliateNet = "admitad" | "tp" | "indoleads" | "direct";

export type Affiliate = { url: string; net: AffiliateNet };

export const AFFILIATES: Record<string, Affiliate> = {
  // Travelpayouts (tpm.li / i07o — sub_id)
  localrent: { url: "https://localrent.tpm.li/Yh75GbWb", net: "tp" },
  economybookings: { url: "https://economybookings.tpm.li/S2nY6rl8", net: "tp" }, // reserve
  bikesbooking: { url: "https://bikesbooking.tpm.li/N6lAuW1e", net: "tp" },
  "welcome-pickups": { url: "https://tpm.li/bFe65KrG", net: "tp" },
  kiwitaxi: { url: "https://kiwitaxi.tpm.li/IPwPgM2i", net: "tp" },
  klook: { url: "https://klook.tpm.li/fmtzsvTl", net: "tp" },
  tiqets: { url: "https://tiqets.tpm.li/rpRB7oEZ", net: "tp" },
  airalo: { url: "https://airalo.tpm.li/7Nn9Ad1q", net: "tp" },
  aviasales: { url: "https://aviasales.tpm.li/dAyfvzBW", net: "tp" },
  radicalstorage: { url: "https://radicalstorage.tpm.li/jDrZYmIj", net: "tp" },
  airhelp: { url: "https://airhelp.tpm.li/xOYCZ6oP", net: "tp" },

  // Admitad (deeplink domains — subid)
  "way-com": { url: "https://yyczo.com/g/vln7ctwgqja27dee2ccd12f7a14e01/", net: "admitad" },
  planetofhotels: { url: "https://uhtkc.com/g/zhz7s51tzia27dee2ccdd0cfe7b65a/", net: "admitad" },
  discovercars: { url: "https://naiawork.com/g/wqjhitsyjqa27dee2ccd5ea594bb46/", net: "admitad" },
  platinumlist: { url: "https://i07o.xyz/6ab102c3e77b1", net: "admitad" },
  cheapvuelos: { url: "https://yknhc.com/g/cmazc4pm8oa27dee2ccdce5f810ebf/", net: "admitad" },
  flightnetwork: { url: "https://xyowz.com/g/n2q2nolvw6a27dee2ccd6d2e807f50/", net: "admitad" },

  // Indoleads (subid param uncertain → none)
  mytrip: { url: "https://io10.info/6aa7d36473fb3", net: "indoleads" },

  // Direct (no network subid)
  safetywing: { url: "https://safetywing.com/nomad-insurance?referenceID=26588804&campaign=costtrek&utm_campaign=costtrek&utm_source=26588804&utm_medium=Ambassador", net: "direct" },
};

/** Reverse map: exact deeplink URL → id. Built once at module load. */
export const ID_BY_URL: Record<string, string> = Object.fromEntries(
  Object.entries(AFFILIATES).map(([id, a]) => [a.url, id]),
);

/** Append the network's sub-id (the page slug) where the network supports it. */
export function withSub(url: string, net: AffiliateNet, slug?: string): string {
  if (!slug) return url;
  const param = net === "admitad" ? "subid" : net === "tp" ? "sub_id" : null;
  if (!param) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${param}=${encodeURIComponent(slug)}`;
}

/**
 * Resolve a raw affiliate deeplink to its cloaked `/go/<id>?s=<slug>` path.
 * Unknown URLs are returned unchanged (safe fallback — the link still works).
 * `slug` becomes the network sub-id at redirect time, so keep it short/clean.
 */
export function goHref(url: string, slug?: string): string {
  const id = ID_BY_URL[url];
  if (!id) return url;
  const q = slug ? `?s=${encodeURIComponent(slug)}` : "";
  return `/go/${id}${q}`;
}
