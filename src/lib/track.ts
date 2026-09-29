/**
 * Tiny analytics helper. Routes custom events to GA4's gtag, which our
 * consent-gated `Analytics` component defines on `window` only after the visitor
 * accepts cookies — so this is a safe no-op before consent, during SSR, or if
 * analytics never loads. Fold `track()` calls into features as we build them
 * (finder, currency switch, affiliate clicks) rather than one big pass.
 */
type Params = Record<string, string | number | boolean | undefined>;

export function track(event: string, params?: Params): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag === "function") gtag("event", event, params ?? {});
}
