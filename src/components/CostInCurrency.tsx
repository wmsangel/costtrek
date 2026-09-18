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

export type MoneyItem = { label: string; usd: number };

/**
 * "Cost of living in {city} — in your currency": a self-contained widget that
 * converts a handful of representative USD figures to the viewer's chosen
 * currency (static rates, see fx.ts). Self-contained on purpose — it holds its
 * own numbers, so the rest of the page's USD figures/prose stay consistent.
 * Answers real long-tail intent ("cost to live in X in <currency>").
 */
export default function CostInCurrency({
  title,
  items,
  locale,
  note,
  selLabel,
}: {
  title: string;
  items: MoneyItem[];
  locale: string;
  note: string; // template containing {date}
  selLabel: string;
}) {
  // Initialise from the locale default so SSR and first client render match;
  // sync from localStorage after mount to honour a saved choice.
  const [cur, setCur] = useState<CurrencyCode>(() => defaultCurrency(locale));

  useEffect(() => {
    try {
      const saved = localStorage.getItem("currency");
      if (saved && isCurrency(saved)) setCur(saved);
    } catch {
      /* private mode / blocked storage — keep the default */
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

      <ul className="mt-4 divide-y divide-[var(--border)]">
        {items.map((it, i) => (
          <li key={i} className="flex items-center justify-between gap-4 py-2.5">
            <span className="text-[var(--muted)]">{it.label}</span>
            <span className="font-bold tabular-nums">
              {formatInCurrency(it.usd, cur, locale)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-[var(--muted)]">
        {note.replace("{date}", FX_AS_OF)}
      </p>
    </div>
  );
}
