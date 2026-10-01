"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { BudgetCity } from "@/lib/budgetData";
import { householdBudget, type Lifestyle } from "@/lib/budget";
import { track } from "@/lib/track";

/**
 * Interactive cost-of-living budget calculator — the parametric form of the
 * Day-4 affordability personas. Pick a city and a household (adults, children,
 * lifestyle); the monthly budget re-ranks live. English UI (calculator chrome is
 * English-first); city names arrive already localized. State is encoded in the
 * URL so a result is shareable. Figures are USD estimates — see /methodology.
 */
const LIFESTYLES: Lifestyle[] = ["lean", "moderate", "comfortable"];
const LIFESTYLE_LABEL: Record<Lifestyle, string> = {
  lean: "Lean",
  moderate: "Moderate",
  comfortable: "Comfortable",
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function BudgetCalculator({
  cities,
  methodologyHref,
}: {
  cities: BudgetCity[];
  methodologyHref: string;
}) {
  const defaultSlug =
    cities.find((c) => c.slug === "lisbon-pt")?.slug ?? cities[0]?.slug ?? "";
  const [slug, setSlug] = useState(defaultSlug);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [lifestyle, setLifestyle] = useState<Lifestyle>("moderate");
  const [copied, setCopied] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      let used = false;
      const c = q.get("city");
      if (c && cities.some((x) => x.slug === c)) { setSlug(c); used = true; }
      const a = q.get("adults"); if (a) { setAdults(clamp(+a, 1, 6)); used = true; }
      const k = q.get("kids"); if (k) { setChildren(clamp(+k, 0, 8)); used = true; }
      const lf = q.get("life"); if (lf && (LIFESTYLES as string[]).includes(lf)) { setLifestyle(lf as Lifestyle); used = true; }
      if (!used) {
        const saved = localStorage.getItem("budgetCalc");
        if (saved) {
          const s = JSON.parse(saved);
          if (s.slug && cities.some((x) => x.slug === s.slug)) setSlug(s.slug);
          if (typeof s.adults === "number") setAdults(clamp(s.adults, 1, 6));
          if (typeof s.children === "number") setChildren(clamp(s.children, 0, 8));
          if (s.lifestyle && (LIFESTYLES as string[]).includes(s.lifestyle)) setLifestyle(s.lifestyle);
        }
      }
    } catch { /* ignore */ }
    hydrated.current = true;
  }, [cities]);

  useEffect(() => {
    if (!hydrated.current) return;
    try { localStorage.setItem("budgetCalc", JSON.stringify({ slug, adults, children, lifestyle })); } catch { /* ignore */ }
    try {
      const q = new URLSearchParams();
      q.set("city", slug);
      q.set("adults", String(adults));
      q.set("kids", String(children));
      q.set("life", lifestyle);
      window.history.replaceState(null, "", `${window.location.pathname}?${q.toString()}`);
    } catch { /* ignore */ }
    setCopied(false);
  }, [slug, adults, children, lifestyle]);

  const city = useMemo(
    () => cities.find((c) => c.slug === slug) ?? cities[0],
    [cities, slug],
  );
  const result = useMemo(
    () => (city ? householdBudget(city, { adults, children, lifestyle }) : null),
    [city, adults, children, lifestyle],
  );

  useEffect(() => {
    if (!hydrated.current || !city || !result) return;
    const id = setTimeout(() => {
      track("budget_calc", { city: city.slug, adults, children, lifestyle, total: result.total });
    }, 900);
    return () => clearTimeout(id);
  }, [city, result, adults, children, lifestyle]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      track("budget_share", { city: slug });
    } catch { /* ignore */ }
  }

  if (!city || !result) return null;

  const rows: { label: string; value: number }[] = [
    { label: `Rent (${result.bedrooms}-bed)`, value: result.rent },
    { label: "Food & groceries", value: result.food },
    { label: "Transport", value: result.transport },
    { label: "Utilities", value: result.utilities },
    { label: "Healthcare", value: result.healthcare },
    { label: "Goods & services", value: result.goods },
  ];
  const maxRow = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="card rounded-2xl p-5 sm:p-6">
      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          <span className="text-[var(--muted)]">City</span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            aria-label="City"
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 min-h-[44px] font-semibold hover:border-[var(--accent)]"
          >
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} · {c.country}
              </option>
            ))}
          </select>
        </label>

        <Stepper label="Adults" value={adults} min={1} max={6} onChange={setAdults} />
        <Stepper label="Children" value={children} min={0} max={8} onChange={setChildren} />

        <div className="flex flex-col gap-1 text-sm sm:col-span-2">
          <span className="text-[var(--muted)]">Lifestyle</span>
          <div className="flex gap-2">
            {LIFESTYLES.map((lf) => (
              <button
                key={lf}
                type="button"
                onClick={() => setLifestyle(lf)}
                aria-pressed={lifestyle === lf}
                className={`flex-1 rounded-lg border px-3 min-h-[44px] font-semibold text-sm transition-colors ${
                  lifestyle === lf
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                {LIFESTYLE_LABEL[lf]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="mt-6 ink-band rounded-2xl px-5 py-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider font-bold opacity-70">
            Estimated monthly budget
          </p>
          <p className="display text-4xl sm:text-5xl font-black tabular-nums leading-none mt-1">
            {usd(result.total)}
          </p>
          <p className="text-sm opacity-80 mt-1">
            {city.flag} {city.name} · {adults} adult{adults > 1 ? "s" : ""}
            {children > 0 ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={copyLink}
          className="shrink-0 text-xs sm:text-sm rounded-full border border-white/30 px-3 py-2 font-semibold hover:bg-white/10"
        >
          {copied ? "✓ Copied" : "Copy link"}
        </button>
      </div>

      {/* Breakdown */}
      <ul className="mt-5 flex flex-col gap-2.5">
        {rows.map((r) => (
          <li key={r.label} className="grid grid-cols-[8.5rem_1fr_4.5rem] items-center gap-3 text-sm">
            <span className="text-[var(--muted)] truncate">{r.label}</span>
            <span className="barz-track relative">
              <span
                className="barz-fill"
                style={{ width: `${Math.max((r.value / maxRow) * 100, 3)}%`, background: "var(--accent)" }}
              />
            </span>
            <span className="text-right font-bold tabular-nums">{usd(r.value)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed">
        Figures are monthly estimates in USD — a US-average basket scaled by {city.name}&apos;s
        own price indices, with local rent for the housing line. They are a guide, not a
        quote.{" "}
        <Link href={methodologyHref} className="text-[var(--accent)] hover:underline">
          How we calculate this
        </Link>
        . <Link href={city.path} className="text-[var(--accent)] hover:underline">
          See the full {city.name} profile →
        </Link>
      </p>
    </div>
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <span className="text-[var(--muted)]">{label}</span>
      <div className="flex items-stretch">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-11 min-h-[44px] rounded-l-lg border border-[var(--border)] font-bold text-lg hover:border-[var(--accent)] disabled:opacity-40"
          disabled={value <= min}
        >
          −
        </button>
        <span className="flex-1 min-h-[44px] grid place-items-center border-y border-[var(--border)] font-bold tabular-nums">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-11 min-h-[44px] rounded-r-lg border border-[var(--border)] font-bold text-lg hover:border-[var(--accent)] disabled:opacity-40"
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}
