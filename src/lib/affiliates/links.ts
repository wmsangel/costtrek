import "server-only";
import { AMAZON_TAG } from "@/lib/amazon";

/**
 * Affiliate link registry + the /go cloaking helper. SERVER-ONLY: the real
 * tracking URLs never reach client markup — anchors carry only `data-go="<id>"`,
 * the /go URL is built in the browser on a real click (`gotoken.ts`,
 * `ClickTracker`), and `src/app/go/[id]/route.ts` resolves the id here and 302s
 * a real human to the partner (bots get 204, no Location). This stops affiliate
 * networks from counting crawler hits as clicks (see research/ADS-AND-LINKS.md).
 *
 * `id → { url, net }`. `net` picks the sub-id param we append from the page slug
 * (`subid` for Admitad, `sub_id` for Travelpayouts, `p1` for Indoleads — "Sub 1"
 * in their cabinet; `subid` is silently ignored by Indoleads; `direct` gets none).
 *
 * These URLs mirror the deeplinks that still live in the data/components
 * (`toolkit.ts`, `cityProfiles.ts` referral slots, the /best & compare CTAs,
 * `MyTripCard`). `goAttrs(url, slug)` resolves a raw deeplink to its registry id
 * by exact match; an unknown URL falls through unchanged, so nothing ever breaks —
 * it just isn't cloaked. Keep this list in sync when a deeplink changes.
 */

export type AffiliateNet =
  | "admitad"
  | "tp"
  | "indoleads"
  | "partnerize"
  | "amazon"
  | "direct";

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
  platinumlist: { url: "https://i07o.xyz/6ab102c3e77b1", net: "indoleads" }, // i07o.xyz = Indoleads, not Admitad
  flightnetwork: { url: "https://xyowz.com/g/n2q2nolvw6a27dee2ccd6d2e807f50/", net: "admitad" },

  // Indoleads (sub-id param = p1 = "Sub 1" in cabinet; subid is ignored silently)
  mytrip: { url: "https://io10.info/6aa7d36473fb3", net: "indoleads" },
  cheapoair: { url: "https://z02o.xyz/6af529040c2e5?url=https://www.cheapoair.com/flights", net: "indoleads" }, // US-focused flights OTA; z02o.xyz = Indoleads, own costtrek-source deeplink (Get link), ?url= deeplinking click-verified → /flights with FpAffiliate tracking intact

  // Partnerize (Wise, Content partner — approved 2026-11-20). Params are PATH
  // segments, not query: sub-id is `/pubref:<ref>` and the deep link is the final
  // `/destination:<urlencoded wise.com page>` (geolocated by region). One camref per
  // payout currency — the toolkit picks it by the city's country (that's the
  // currency we're paid in). withSub() inserts /pubref:costtrek-<slug> before
  // /destination:. Keep these URLs in sync with toolkit.ts.
  "wise-usd": { url: "https://wise.prf.hn/click/camref:1101l6yR7X/destination:https%3A%2F%2Fwise.com%2Fus%2Fsend-money%2F", net: "partnerize" },
  "wise-eur": { url: "https://wise.prf.hn/click/camref:1101l6yR7U/destination:https%3A%2F%2Fwise.com%2Fsend-money%2F", net: "partnerize" },
  "wise-gbp": { url: "https://wise.prf.hn/click/camref:1101l6yR7V/destination:https%3A%2F%2Fwise.com%2Fgb%2Fsend-money%2F", net: "partnerize" },
  "wise-aud": { url: "https://wise.prf.hn/click/camref:1101l6yR7T/destination:https%3A%2F%2Fwise.com%2Fau%2Fsend-money%2F", net: "partnerize" },
  "wise-jpy": { url: "https://wise.prf.hn/click/camref:1101l6yR7W/destination:https%3A%2F%2Fwise.com%2Fjp%2Fsend-money%2F", net: "partnerize" },

  // Direct (no network subid)
  // Amazon Associates search link: the query (`q`) is supplied per link at click
  // time (see amazonAttrs), the tracking tag lives here, server-side.
  amazon: { url: `https://www.amazon.com/s?tag=${AMAZON_TAG}`, net: "amazon" },
  safetywing: { url: "https://safetywing.com/nomad-insurance?referenceID=26588804&campaign=costtrek&utm_campaign=costtrek&utm_source=26588804&utm_medium=Ambassador", net: "direct" },
};

/** Reverse map: exact deeplink URL → id. Built once at module load. */
export const ID_BY_URL: Record<string, string> = Object.fromEntries(
  Object.entries(AFFILIATES).map(([id, a]) => [a.url, id]),
);

/** Append the network's sub-id (the page slug) where the network supports it. */
export function withSub(
  url: string,
  net: AffiliateNet,
  slug?: string,
  q?: string,
): string {
  // Amazon: search text + a per-page ascsubtag (the tag itself is in the URL).
  if (net === "amazon") {
    const u = new URL(url);
    if (q) u.searchParams.set("k", q.slice(0, 120));
    if (slug) u.searchParams.set("ascsubtag", `costtrek-${slug}`.slice(0, 60));
    return u.toString();
  }
  if (!slug) return url;
  // Partnerize: sub-id is a path segment /pubref:<ref>, inserted BEFORE the
  // /destination: deep-link segment (or appended when there is none).
  if (net === "partnerize") {
    const ref = `pubref:costtrek-${encodeURIComponent(slug)}`;
    const d = url.indexOf("/destination:");
    return d >= 0
      ? `${url.slice(0, d)}/${ref}${url.slice(d)}`
      : `${url.replace(/\/$/, "")}/${ref}`;
  }
  const param =
    net === "admitad" ? "subid" : net === "tp" ? "sub_id" : net === "indoleads" ? "p1" : null;
  if (!param) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${param}=${encodeURIComponent(slug)}`;
}

/**
 * Anchor attributes for a raw affiliate deeplink: spread them onto the `<a>`.
 * A known deeplink renders `href="#"` plus `data-go` (the registry id) and
 * `data-go-s` (the page slug → network sub-id). No /go URL is ever written into
 * the HTML: `ClickTracker` builds it, with a short-lived token, at the moment of
 * a real click (see `gotoken.ts` for why). Unknown URLs fall through as a plain
 * `href` (the link still works — it just isn't cloaked).
 */
export function goAttrs(
  url: string,
  slug?: string,
): { href: string; "data-go"?: string; "data-go-s"?: string } {
  const id = ID_BY_URL[url];
  if (!id) return { href: url };
  return slug
    ? { href: "#", "data-go": id, "data-go-s": slug }
    : { href: "#", "data-go": id };
}

/** Anchor attributes for an Amazon search link (`q` = search text). */
export function amazonAttrs(
  q: string,
  slug?: string,
): { href: string; "data-go": string; "data-go-s"?: string; "data-go-q": string } {
  return {
    href: "#",
    "data-go": "amazon",
    ...(slug ? { "data-go-s": slug } : {}),
    "data-go-q": q,
  };
}
