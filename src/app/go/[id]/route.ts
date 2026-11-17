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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const aff = AFFILIATES[id];
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
  const mode = req.headers.get("sec-fetch-mode");
  const ref = req.headers.get("referer") ?? "";
  let sameHost = false;
  try {
    sameHost = new URL(ref).host === new URL(req.url).host;
  } catch {
    /* no/garbage referer */
  }
  const cameFromUs = site === "same-origin" || site === "same-site" || sameHost;

  // 3) Human gesture. The /go redirects are plain <a> links, but browsers'
  //    speculative prefetch/prerender and JS-rendering crawlers that follow <a>
  //    hrefs hit them with a same-origin Referer + a real Chrome UA — identical to
  //    a click to gates 1–2, which is how bots inflated Admitad to ~5k "clicks"/wk
  //    at ~25 real visitors (spike dated to the /go cloaking launch 2026-10-30).
  //    Fetch Metadata separates them: a prefetch/prerender carries Sec-Purpose:
  //    prefetch, and only a user-activated navigation (real click/keypress) carries
  //    Sec-Fetch-User: ?1 — never a prefetch or a scripted fetch()/goto(). Any
  //    client new enough to speak Fetch Metadata (Sec-Fetch-* present — Chrome 76+,
  //    FF 90+, Safari 16.4+, i.e. ~all live traffic) must prove the gesture; older
  //    clients that send no Sec-Fetch-* fall back to gates 1–2.
  const purpose =
    req.headers.get("sec-purpose") ?? req.headers.get("purpose") ?? "";
  const isPrefetch = /prefetch|prerender/i.test(purpose);
  const supportsSecFetch = site !== null || mode !== null;
  const userActivated = req.headers.get("sec-fetch-user") === "?1";

  if (
    looksLikeBot ||
    !cameFromUs ||
    isPrefetch ||
    (supportsSecFetch && !userActivated)
  ) {
    return new Response(null, { status: 204, headers: NOINDEX });
  }

  const slug = new URL(req.url).searchParams.get("s") || undefined;
  const dest = withSub(aff.url, aff.net, slug);
  return new Response(null, {
    status: 302,
    headers: { Location: dest, ...NOINDEX },
  });
}
