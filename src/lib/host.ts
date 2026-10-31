export const PROD_HOST = "costtrek.com";

/**
 * True only on the production host (client-side check). Analytics (GA4) and the
 * Travelpayouts affiliate script gate on this so they never run on mirrors
 * (*.workers.dev), Cloudflare previews or localhost — which would otherwise
 * double-count traffic or load a script that 403s off the live domain. Returns
 * false during SSR (no window), so gated scripts inject on the client after mount.
 */
export function isProdHost(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === PROD_HOST || h === `www.${PROD_HOST}`;
}
