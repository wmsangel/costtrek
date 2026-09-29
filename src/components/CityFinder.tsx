"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { FinderCity } from "@/lib/finder";
import type { FinderAxis } from "@/lib/collections";
import { track } from "@/lib/track";

/** Axes shown as priority sliders, in display order. */
const AXES: FinderAxis[] = [
  "cost",
  "safety",
  "healthcare",
  "air",
  "climate",
  "walk",
  "transit",
  "internet",
  "english",
];

type Weights = Partial<Record<FinderAxis, number>>; // 0–3 per axis
type EnglishMin = "any" | "moderate" | "high";

const PRESETS: Record<string, Weights> = {
  balanced: { cost: 2, safety: 2, healthcare: 2, air: 1, climate: 1, walk: 1, transit: 1, internet: 1, english: 1 },
  nomad: { cost: 2, internet: 3, safety: 2, english: 2, walk: 1, air: 1, climate: 1, healthcare: 1, transit: 1 },
  family: { safety: 3, healthcare: 3, air: 2, cost: 1, walk: 1, climate: 1, transit: 1, internet: 1, english: 1 },
  retiree: { healthcare: 3, safety: 2, cost: 2, air: 2, climate: 2, walk: 1, transit: 1 },
  student: { cost: 3, walk: 2, internet: 2, english: 2, safety: 1, transit: 1 },
  budget: { cost: 3, safety: 1, healthcare: 1, transit: 1 },
};

const ENGLISH_RANK: Record<string, number> = { low: 0, moderate: 1, high: 2, native: 3 };

export type FinderStrings = {
  prioritiesTitle: string;
  filtersTitle: string;
  weight: { off: string; low: string; med: string; high: string };
  axis: Record<FinderAxis, string>;
  region: string;
  maxRent: string;
  maxRentAny: string;
  englishMin: string;
  englishAny: string;
  englishModerate: string;
  englishHigh: string;
  presets: string;
  presetLabels: Record<string, string>;
  resultsTitle: string;
  resultsSub: string; // {n}
  match: string;
  noResults: string;
  reset: string;
  copyLink: string;
  copied: string;
  viewCity: string; // {city}
  disclaimer: string;
};

const LEVEL_WORDS = (w: FinderStrings["weight"]) => [w.off, w.low, w.med, w.high];

export default function CityFinder({
  cities,
  regions,
  regionLabels,
  t,
}: {
  cities: FinderCity[];
  regions: string[]; // continent values present
  regionLabels: Record<string, string>; // continent value -> localized label
  t: FinderStrings;
}) {
  const [weights, setWeights] = useState<Weights>(PRESETS.balanced);
  const [region, setRegion] = useState<string>("any");
  const [maxRent, setMaxRent] = useState<number>(0); // 0 = no limit
  const [englishMin, setEnglishMin] = useState<EnglishMin>("any");
  const [copied, setCopied] = useState(false);
  const hydrated = useRef(false);

  // Hydrate from URL (shareable) then localStorage, once after mount.
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      let used = false;
      const p = q.get("p");
      if (p) {
        const w: Weights = {};
        for (const part of p.split(",")) {
          const [k, v] = part.split(":");
          if (AXES.includes(k as FinderAxis)) {
            const n = Math.max(0, Math.min(3, Number(v) || 0));
            w[k as FinderAxis] = n;
          }
        }
        if (Object.keys(w).length) { setWeights(w); used = true; }
      }
      const r = q.get("region"); if (r) { setRegion(r); used = true; }
      const rent = q.get("rent"); if (rent) { setMaxRent(Math.max(0, Number(rent) || 0)); used = true; }
      const eng = q.get("eng"); if (eng === "moderate" || eng === "high") { setEnglishMin(eng); used = true; }
      if (!used) {
        const saved = localStorage.getItem("finder");
        if (saved) {
          const s = JSON.parse(saved);
          if (s.weights) setWeights(s.weights);
          if (s.region) setRegion(s.region);
          if (typeof s.maxRent === "number") setMaxRent(s.maxRent);
          if (s.englishMin) setEnglishMin(s.englishMin);
        }
      }
    } catch { /* ignore bad params / blocked storage */ }
    hydrated.current = true;
  }, []);

  // Persist to localStorage + reflect state in the URL (shareable, no reload).
  useEffect(() => {
    if (!hydrated.current) return;
    const state = { weights, region, maxRent, englishMin };
    try { localStorage.setItem("finder", JSON.stringify(state)); } catch { /* ignore */ }
    try {
      const q = new URLSearchParams();
      q.set("p", AXES.filter((a) => (weights[a] ?? 0) > 0).map((a) => `${a}:${weights[a]}`).join(","));
      if (region !== "any") q.set("region", region);
      if (maxRent > 0) q.set("rent", String(maxRent));
      if (englishMin !== "any") q.set("eng", englishMin);
      const url = `${window.location.pathname}?${q.toString()}`;
      window.history.replaceState(null, "", url);
    } catch { /* ignore */ }
    setCopied(false);
  }, [weights, region, maxRent, englishMin]);

  const results = useMemo(() => {
    const scored = cities
      .filter((c) => region === "any" || c.continent === region)
      .filter((c) => maxRent === 0 || c.rent <= maxRent)
      .filter((c) => englishMin === "any" || (c.english != null && ENGLISH_RANK[c.english] >= ENGLISH_RANK[englishMin]))
      .map((c) => {
        let wsum = 0, acc = 0;
        for (const a of AXES) {
          const w = weights[a] ?? 0;
          const v = c.comp[a];
          if (w > 0 && typeof v === "number") { wsum += w; acc += w * v; }
        }
        return { city: c, score: wsum > 0 ? acc / wsum : null };
      })
      .filter((r): r is { city: FinderCity; score: number } => r.score !== null)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 12);
  }, [cities, weights, region, maxRent, englishMin]);

  // Fire one analytics event when the ranking settles (debounced).
  useEffect(() => {
    if (!hydrated.current) return;
    const id = setTimeout(() => {
      track("finder_result", { top: results[0]?.city.slug ?? "none", count: results.length, region });
    }, 900);
    return () => clearTimeout(id);
  }, [results, region]);

  function applyPreset(key: string) {
    setWeights({ ...PRESETS[key] });
    track("finder_preset", { preset: key });
  }
  function reset() {
    setWeights({ ...PRESETS.balanced });
    setRegion("any"); setMaxRent(0); setEnglishMin("any");
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      track("finder_share", { top: results[0]?.city.slug ?? "none" });
    } catch { /* clipboard blocked */ }
  }

  const levelWords = LEVEL_WORDS(t.weight);
  const topAxesFor = (c: FinderCity) =>
    AXES.filter((a) => (weights[a] ?? 0) > 0 && typeof c.comp[a] === "number")
      .sort((x, y) => (c.comp[y] as number) - (c.comp[x] as number))
      .slice(0, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] items-start">
      {/* Controls */}
      <div className="card rounded-2xl p-5 sm:p-6 lg:sticky lg:top-4">
        {/* Presets */}
        <p className="kicker mb-2">{t.presets}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.keys(PRESETS).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => applyPreset(k)}
              className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 min-h-[36px] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t.presetLabels[k]}
            </button>
          ))}
        </div>

        <h2 className="mag-h2 mb-3 !text-base">{t.prioritiesTitle}</h2>
        <div className="flex flex-col gap-3">
          {AXES.map((a) => {
            const w = weights[a] ?? 0;
            return (
              <div key={a}>
                <div className="flex items-baseline justify-between gap-2">
                  <label htmlFor={`w-${a}`} className="text-sm font-medium">{t.axis[a]}</label>
                  <span className={`text-xs font-semibold ${w > 0 ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}>
                    {levelWords[w]}
                  </span>
                </div>
                <input
                  id={`w-${a}`}
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={w}
                  onChange={(e) => setWeights((prev) => ({ ...prev, [a]: Number(e.target.value) }))}
                  className="w-full accent-[var(--accent)] mt-1"
                  aria-label={t.axis[a]}
                />
              </div>
            );
          })}
        </div>

        <h2 className="mag-h2 mb-3 mt-6 !text-base">{t.filtersTitle}</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-[var(--muted)]">{t.region}</span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 min-h-[44px] font-semibold hover:border-[var(--accent)]"
            >
              <option value="any">{regionLabels.any}</option>
              {regions.map((r) => (
                <option key={r} value={r}>{regionLabels[r] ?? r}</option>
              ))}
            </select>
          </label>

          <div className="text-sm">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[var(--muted)]">{t.maxRent}</span>
              <span className="font-semibold tabular-nums">
                {maxRent === 0 ? t.maxRentAny : `$${maxRent.toLocaleString()}`}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={4000}
              step={100}
              value={maxRent}
              onChange={(e) => setMaxRent(Number(e.target.value))}
              className="w-full accent-[var(--accent)] mt-1"
              aria-label={t.maxRent}
            />
          </div>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-[var(--muted)]">{t.englishMin}</span>
            <select
              value={englishMin}
              onChange={(e) => setEnglishMin(e.target.value as EnglishMin)}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 min-h-[44px] font-semibold hover:border-[var(--accent)]"
            >
              <option value="any">{t.englishAny}</option>
              <option value="moderate">{t.englishModerate}</option>
              <option value="high">{t.englishHigh}</option>
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-5 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] underline underline-offset-2"
        >
          {t.reset}
        </button>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div>
            <h2 className="display text-2xl font-black leading-tight">{t.resultsTitle}</h2>
            <p className="text-sm text-[var(--muted)]">{t.resultsSub.replace("{n}", String(results.length))}</p>
          </div>
          <button
            type="button"
            onClick={copyLink}
            className="text-sm rounded-full border border-[var(--border)] px-4 py-2 min-h-[40px] font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {copied ? `✓ ${t.copied}` : t.copyLink}
          </button>
        </div>

        {results.length === 0 ? (
          <div className="card rounded-2xl p-8 text-center text-[var(--muted)]">{t.noResults}</div>
        ) : (
          <ol className="flex flex-col gap-3">
            {results.map((r, i) => (
              <li key={r.city.slug}>
                <Link
                  href={r.city.path}
                  className="card rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-[var(--accent)] transition-colors"
                >
                  <span className="display font-black text-xl text-[var(--muted)] tabular-nums w-7 shrink-0">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-semibold flex items-center gap-2">
                      <span aria-hidden="true">{r.city.flag}</span>
                      <span className="truncate">{r.city.name}</span>
                    </span>
                    <span className="text-xs text-[var(--muted)]">{r.city.country}</span>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {topAxesFor(r.city).map((a) => (
                        <span key={a} className="text-[11px] rounded-full bg-[var(--accent-soft)] text-[var(--foreground)] px-2 py-0.5">
                          {t.axis[a]} {r.city.comp[a]}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="display font-black text-2xl text-[var(--accent)] tabular-nums leading-none">
                      {Math.round(r.score)}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wide text-[var(--muted)] font-bold mt-0.5">
                      {t.match}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-5 text-xs text-[var(--muted)] leading-relaxed max-w-[70ch]">{t.disclaimer}</p>
      </div>
    </div>
  );
}
