import type { Dictionary } from "@/lib/i18n/dictionaries";

// MyTrip flights affiliate (Indoleads, CPS). Distinct from the Aviasales coral
// CTA / on-page search widget: a light click-out card with a dark pill, so the
// two flight offers read as different formats rather than competing bars.
// Flat tracker link (no per-country deeplink param exposed) — redirects to the
// MyTrip site. rel="sponsored nofollow" per affiliate + Google guidelines.
const MYTRIP_URL = "https://io10.info/6aa7d36473fb3";

export default function MyTripCard({ dict }: { dict: Dictionary }) {
  const m = dict.mytrip;
  return (
    <a
      href={MYTRIP_URL}
      rel="sponsored nofollow noopener"
      target="_blank"
      className="group mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 sm:px-6 py-4 sm:py-5 transition hover:border-[var(--accent)]"
    >
      <span className="flex flex-col gap-1 min-w-0">
        <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--muted)]">
          {dict.calculators.sponsoredBadge} · MyTrip
        </span>
        <span className="display font-black text-base sm:text-lg leading-tight text-[var(--foreground)]">
          {m.headline}
        </span>
        <span className="text-sm text-[var(--muted)] max-w-[48ch]">{m.sub}</span>
      </span>
      <span className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white transition group-hover:brightness-110">
        <span aria-hidden="true">✈</span>
        {m.cta}
      </span>
    </a>
  );
}
