"use client";

import { useMemo } from "react";

export const CURRENCIES: Record<string, { symbol: string; code: string }> = {
  USD: { symbol: "$", code: "USD" },
  EUR: { symbol: "€", code: "EUR" },
  GBP: { symbol: "£", code: "GBP" },
};

export function useMoney(code: string) {
  return useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code,
        maximumFractionDigits: 0,
      }),
    [code],
  );
}

export const num = (n: number) => (Number.isFinite(n) ? n : 0);

export function CurrencySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (c: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-[var(--muted)]">Currency</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 outline-none focus:border-[var(--accent)]"
      >
        {Object.keys(CURRENCIES).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Field({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      <div className="mt-1 flex items-center rounded-xl border border-[var(--border)] bg-[var(--background)] focus-within:border-[var(--accent)]">
        {prefix && (
          <span className="pl-3 text-[var(--muted)] select-none">{prefix}</span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent px-3 py-2.5 outline-none tabular-nums"
        />
        {suffix && (
          <span className="pr-3 text-[var(--muted)] select-none">{suffix}</span>
        )}
      </div>
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 outline-none focus:border-[var(--accent)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Big highlighted primary result. */
export function ResultCard({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl bg-[var(--accent)] text-[var(--accent-fg)] p-5 sm:p-6">
      <p className="text-sm font-semibold opacity-90">{label}</p>
      <p className="display text-4xl sm:text-5xl font-black tabular-nums mt-1">
        {value}
      </p>
      {children}
    </div>
  );
}

export function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="opacity-85">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="display text-xl font-black tabular-nums mt-1">{value}</p>
    </div>
  );
}

export function CalcShell({
  currency,
  onCurrency,
  children,
}: {
  currency?: string;
  onCurrency?: (c: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="display text-lg font-bold tracking-tight">Your numbers</h2>
        {currency && onCurrency && (
          <CurrencySelect value={currency} onChange={onCurrency} />
        )}
      </div>
      {children}
    </div>
  );
}
