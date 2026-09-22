"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import {
  CURRENCIES,
  FX_AS_OF,
  defaultCurrency,
  formatInCurrency,
  isCurrency,
  type CurrencyCode,
} from "@/lib/fx";

export type CompareRow = { label: string; a: number | null; b: number | null };

/**
 * Two-city "in your currency" table for compare pages — the same static-rate
 * conversion as CostInCurrency, but A vs B side by side. Shares the "currency"
 * localStorage key so the viewer's choice carries across city and compare pages.
 */
export default function CompareInCurrency({
  title,
  rows,
  aName,
  bName,
  locale,
  note,
  selLabel,
}: {
  title: string;
  rows: CompareRow[];
  aName: string;
  bName: string;
  locale: string;
  note: string; // template containing {date}
  selLabel: string;
}) {
  const [cur, setCur] = useState<CurrencyCode>(() => defaultCurrency(locale));

  useEffect(() => {
    try {
      const saved = localStorage.getItem("currency");
      if (saved && isCurrency(saved)) setCur(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    if (!isCurrency(v)) return;
    setCur(v);
    try {
      localStorage.setItem("currency", v);
    } catch {
      /* ignore */
    }
  }

  const fmt = (usd: number | null) =>
    usd == null ? "—" : formatInCurrency(usd, cur, locale);

  return (
    <div className="card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="display font-bold text-lg leading-tight">{title}</h3>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-[var(--muted)]">{selLabel}</span>
          <select
            value={cur}
            onChange={onChange}
            aria-label={selLabel}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 min-h-[44px] text-sm font-semibold hover:border-[var(--accent)]"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-x-4 sm:gap-x-6">
        <span></span>
        <span className="text-right text-xs font-bold uppercase tracking-wide text-[var(--muted)] truncate max-w-[9rem]">
          {aName}
        </span>
        <span className="text-right text-xs font-bold uppercase tracking-wide text-[var(--muted)] truncate max-w-[9rem]">
          {bName}
        </span>
        {rows.map((r, i) => (
          <div key={i} className="contents">
            <span className="text-[var(--muted)] border-t border-[var(--border)] py-2.5">
              {r.label}
            </span>
            <span className="text-right font-bold tabular-nums border-t border-[var(--border)] py-2.5">
              {fmt(r.a)}
            </span>
            <span className="text-right font-bold tabular-nums border-t border-[var(--border)] py-2.5">
              {fmt(r.b)}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">
        {note.replace("{date}", FX_AS_OF)}
      </p>
    </div>
  );
}
