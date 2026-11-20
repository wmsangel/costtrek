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

/**
 * Does the User-Agent claim a browser version that ships `Sec-Fetch-User`?
 * Chromium (Chrome/Edge/Opera/Brave) 76+, Firefox 90+, Safari 16.4+ and the iOS
 * WebKit browsers on iOS 16.4+ (CriOS = iOS Chrome, FxiOS = iOS Firefox). Such a
 * browser sends `Sec-Fetch-User: ?1` on a genuine click, so /go demands it from
 * them regardless of whether the other Sec-Fetch headers are present — a real one
 * always sends them; a scraper that claims the version but omits them, or a
 * datacenter Safari bot, is lying. Only genuinely older UAs (which never send it)
 * fall back to the Referer gate. (A soft "Safari → Referer" path was abused by
 * datacenter bots; requiring ?1 only when a Sec-Fetch header was present let
 * Chrome-UA scrapers through by sending none.)
 */
function sendsSecFetchUser(ua: string): boolean {
  const num = (re: RegExp): number => {
    const m = ua.match(re);
    return m ? parseFloat(m[1]) : NaN;
  };
  const chromium = num(/\bChrom(?:e|ium)\/(\d+)/);
  if (!Number.isNaN(chromium)) return chromium >= 76;
  const firefox = num(/\bFirefox\/(\d+)/);
  if (!Number.isNaN(firefox)) return firefox >= 90;
  const isWebKit =
    /\b(CriOS|FxiOS)\b/.test(ua) ||
    (/\bSafari\//.test(ua) && !/\bChrom/.test(ua));
  if (isWebKit) {
    const ver = num(/\bVersion\/(\d+\.\d+)/); // Safari "Version/16.4"
    if (!Number.isNaN(ver)) return ver >= 16.4;
    const ios = ua.match(/\bOS (\d+)[._](\d+)/); // "CPU iPhone OS 16_4"
    if (ios) {
      const maj = Number(ios[1]);
      const min = Number(ios[2]);
      return maj > 16 || (maj === 16 && min >= 4);
    }
    return false; // unknown Safari/iOS version → treat as old (soft path)
  }
  return false; // unrecognised engine → old/soft path
}

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

  // 3) Human gesture, version-aware. The /go links are plain <a>, but speculative
  //    prefetch/prerender and scraper navigations hit them with a same-origin
  //    Referer + a real-looking UA — identical to a click at gates 1–2 (this is how
  //    bots inflated Admitad to ~500 "clicks"/day with 0 conversions, incl. a
  //    datacenter fleet wearing a Safari UA). A prefetch carries Sec-Purpose:
  //    prefetch; a genuine user-activated navigation carries Sec-Fetch-User: ?1
  //    (never a prefetch or a scripted fetch()/goto()). Any UA that CLAIMS a browser
  //    version new enough to send Sec-Fetch-User (see sendsSecFetchUser) must
  //    present it — absence then means a bot. Only genuinely old UAs fall back to
  //    the Referer gate above.
  const purpose =
    req.headers.get("sec-purpose") ?? req.headers.get("purpose") ?? "";
  const isPrefetch = /prefetch|prerender/i.test(purpose);
  const userActivated = req.headers.get("sec-fetch-user") === "?1";
  const gestureCapable = sendsSecFetchUser(ua);

  if (looksLikeBot || !cameFromUs || isPrefetch) {
    return new Response(null, { status: 204, headers: NOINDEX });
  }
  if (gestureCapable && !userActivated) {
    return new Response(null, { status: 204, headers: NOINDEX });
  }

  const slug = new URL(req.url).searchParams.get("s") || undefined;
  const dest = withSub(aff.url, aff.net, slug);
  return new Response(null, {
    status: 302,
    headers: { Location: dest, ...NOINDEX },
  });
}
