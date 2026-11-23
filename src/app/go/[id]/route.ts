import { AFFILIATES, withSub } from "@/lib/affiliates/links";

/**
 * /go/<id>?s=<slug> — our own affiliate redirect. A real human who clicked a link
 * on one of our pages gets a 302 to the partner (with the page slug as the network
 * sub-id); anything that looks like a bot, or a request that did NOT come from our
 * own page, gets 204 with no Location. This keeps affiliate networks from counting
 * crawler hits as clicks (audit 2026-10-29). Not cloaking: the destination for a
 * person who clicks is exactly what it always was — we just decline to bill a
 * machine as a visitor. Proven on pawdget (izn.pets) and prodom-expert.
 *
 * Dynamic (reads request headers); excluded from the locale redirect in proxy.ts,
 * Disallow:/go/ in robots.ts, X-Robots-Tag: noindex on every response.
 */
export const dynamic = "force-dynamic";

const NOINDEX = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

// Retired slugs that old pages / Google's cache / scrapers still link to. We
// alias them to the live replacement so the clicks are kept — and crucially they
// run through the SAME gate below (302 to a human, 204 to a bot/prefetch), not a
// blanket 301 that would hand every bot a counted click. cheapvuelos → Aviasales
// (program dropped 2026-10-23); was 404, ~445 hits/wk.
const ALIAS: Record<string, string> = { cheapvuelos: "aviasales" };

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const aff = AFFILIATES[ALIAS[id] ?? id];
  if (!aff) return new Response("Not found", { status: 404, headers: NOINDEX });

  // 1) User agent: every real browser sends "Mozilla"; prefetchers/crawlers that
  //    ignore nofollow+Disallow do not, or they name themselves.
  const ua = req.headers.get("user-agent") ?? "";
  const looksLikeBot =
    !/Mozilla/i.test(ua) ||
    /\b(bot|crawler|spider|scrape|preview|headless|monitor)\b/i.test(ua);

  // 2) Came from us: a click on a real page sends Sec-Fetch-Site: same-origin and a
  //    Referer on our host (links are noopener, NOT noreferrer). A /go URL typed from
  //    a stored list has neither.
  const site = req.headers.get("sec-fetch-site");
  const ref = req.headers.get("referer") ?? "";
  let sameHost = false;
  try {
    sameHost = new URL(ref).host === new URL(req.url).host;
  } catch {
    /* no/garbage referer */
  }
  const cameFromUs = site === "same-origin" || site === "same-site" || sameHost;

  // 3) Human gesture, required of EVERY browser. The /go links are plain <a>, but
  //    speculative prefetch/prerender and scraper navigations hit them with a
  //    same-origin Referer + a real-looking UA — identical to a click at gates 1–2.
  //    This is how a crawler inflated Admitad to ~420 "clicks"/day with 0
  //    conversions: it loaded each page, read its `/go?s=<slug>` link and
  //    re-requested it with a forged Referer + an old/unknown UA, which slipped
  //    through the former "old UA → Referer" soft path (subid proved it — every
  //    counted click carried a page slug, so it had passed /go). A prefetch carries
  //    Sec-Purpose: prefetch; a genuine user-activated navigation carries
  //    Sec-Fetch-User: ?1 (never a prefetch, a scripted fetch()/goto(), or a UA too
  //    old to emit it). We now demand ?1 from EVERYONE — a browser older than 2019
  //    that cannot send it is not worth a mis-billed affiliate click (real traffic
  //    here is a handful of sessions a week). Verified 2026-11-23.
  const purpose =
    req.headers.get("sec-purpose") ?? req.headers.get("purpose") ?? "";
  const isPrefetch = /prefetch|prerender/i.test(purpose);
  const userActivated = req.headers.get("sec-fetch-user") === "?1";

  if (looksLikeBot || !cameFromUs || isPrefetch) {
    return new Response(null, { status: 204, headers: NOINDEX });
  }
  if (!userActivated) {
    return new Response(null, { status: 204, headers: NOINDEX });
  }

  const slug = new URL(req.url).searchParams.get("s") || undefined;
  const dest = withSub(aff.url, aff.net, slug);
  return new Response(null, {
    status: 302,
    headers: { Location: dest, ...NOINDEX },
  });
}
