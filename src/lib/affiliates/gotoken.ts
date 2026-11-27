/**
 * Click-time token for /go links (client + server, no server-only imports).
 *
 * Why: edge logs of 2026-11-26 showed 745 redirects from 742 different IPs in 88
 * countries, and none of the sampled IPs had loaded a single page that day — a
 * bot replaying a STORED list of `/go/<id>?s=<slug>` URLs (it still asked for a
 * slug retired a month earlier) through residential proxies, with Referer,
 * Sec-Fetch-Site and Sec-Fetch-User all forged. Header checks cannot tell that
 * from a person, and hiding the URL in markup would not help: the bot already
 * has the URLs.
 *
 * So a bare /go URL is no longer enough. Pages render `href="#"` + `data-go`;
 * on a real (trusted) click our script builds `/go/<id>?s=…&t=<time>&k=<sig>`,
 * and the route refuses anything without a fresh, matching signature. A stored
 * URL — old format or a captured tokenized one — goes stale within minutes.
 *
 * This is an obstacle, not cryptography: the salt ships in the client bundle,
 * so a bot written specifically against this site could mint tokens by running
 * or reverse-engineering our script. It stops replay of harvested links.
 */
const SALT = "costtrek/go/v1/5b1e9c7a40d2";

/** How far the click timestamp may be from the server clock, in seconds. */
export const GO_TOKEN_TTL_S = 900;

function fnv1a(str: string, seed: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** Signature over (id, slug, time). `t` is the base-36 unix-seconds string. */
export function goSig(id: string, slug: string, t: string): string {
  const s = `${SALT}|${id}|${slug}|${t}`;
  const r = s.split("").reverse().join("");
  return fnv1a(s, 0x811c9dc5).toString(36) + fnv1a(r, 0x9747b28c).toString(36);
}

/** The /go URL for a click happening now. Built in the browser, at click time. */
export function goUrl(id: string, slug?: string, nowMs: number = Date.now()): string {
  const t = Math.floor(nowMs / 1000).toString(36);
  const q = new URLSearchParams();
  if (slug) q.set("s", slug);
  q.set("t", t);
  q.set("k", goSig(id, slug ?? "", t));
  return `/go/${encodeURIComponent(id)}?${q.toString()}`;
}

/** Server side: is this (t, k) pair a fresh signature for this id + slug? */
export function goTokenValid(
  id: string,
  slug: string,
  t: string | null,
  k: string | null,
  nowMs: number = Date.now(),
): boolean {
  if (!t || !k || !/^[0-9a-z]{1,12}$/.test(t)) return false;
  const secs = parseInt(t, 36);
  if (!Number.isFinite(secs)) return false;
  if (Math.abs(nowMs / 1000 - secs) > GO_TOKEN_TTL_S) return false;
  return k === goSig(id, slug, t);
}
