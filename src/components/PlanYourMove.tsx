import type { City } from "@/lib/cities";
import { getCityProfile } from "@/lib/data";
import {
  cityToolkit,
  TOOLKIT_ICON,
  type ToolkitCategory,
} from "@/lib/affiliates/toolkit";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { localizedCityName } from "@/lib/i18n/places";

// Sensible display order so tiles group by theme.
const ORDER: ToolkitCategory[] = [
  "flights",
  "housing",
  "hotel",
  "cars",
  "scooter",
  "transfer",
  "tours",
  "insurance",
  "esim",
  "luggage",
  "compensation",
  "parking",
  "other",
];

/**
 * "Plan your move" — the affiliate toolkit for a city as a compact, icon-led
 * grid of Sponsored tiles. Data comes from the shared toolkit builder, so it
 * stays in sync with the city page and covers new cities automatically.
 */
export default function PlanYourMove({
  city,
  dict,
  locale,
  heading = true,
  className = "",
}: {
  city: City;
  dict: Dictionary;
  locale: Locale;
  heading?: boolean;
  className?: string;
}) {
  const profile = getCityProfile(city.slug);
  const items = cityToolkit(city, profile?.referralLinks).sort(
    (a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category),
  );
  if (items.length === 0) return null;

  const tk = dict.toolkit;
  const name = localizedCityName(locale, city);

  return (
    <div className={`card rounded-2xl p-5 sm:p-6 ${className}`}>
      {heading ? (
        <>
          <h3 className="display font-bold text-lg leading-tight">
            {fill(tk.title, { city: name })}
          </h3>
          <p className="text-sm text-[var(--muted)] mt-1 mb-4">{tk.intro}</p>
        </>
      ) : null}
      <ul className="grid grid-cols-2 gap-2.5">
        {items.map((it, i) => (
          <li key={`${it.category}-${it.provider}-${i}`}>
            <a
              href={it.url}
              rel="sponsored nofollow noopener"
              target="_blank"
              className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 transition hover:border-[var(--accent)] hover:shadow-md hover:-translate-y-0.5"
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--accent-soft)] text-lg transition-colors group-hover:bg-[var(--accent)]"
              >
                {TOOLKIT_ICON[it.category]}
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block font-bold text-sm leading-tight group-hover:text-[var(--accent)]">
                  {tk.cat[it.category]}
                </span>
                <span className="block text-[11px] text-[var(--muted)] truncate">
                  {it.provider}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-[var(--accent)] opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-[10px] uppercase tracking-wider font-bold text-[var(--muted)]">
        <span aria-hidden="true" className="text-[var(--accent)]">✦</span>
        {dict.calculators.sponsoredBadge}
      </p>
    </div>
  );
}
