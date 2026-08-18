"use client";

import { useMemo, useState } from "react";
import {
  computeMortgage,
  amortizationByYear,
} from "@/lib/calculators/mortgage";

const CURRENCIES: Record<string, { symbol: string; code: string }> = {
  USD: { symbol: "$", code: "USD" },
  EUR: { symbol: "€", code: "EUR" },
  GBP: { symbol: "£", code: "GBP" },
};

function useMoney(code: string) {
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

function Field({
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

export default function MortgageCalculator({
  initialPrice = 400_000,
}: {
  initialPrice?: number;
}) {
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(Math.round(initialPrice * 0.2));
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [tax, setTax] = useState(4_800);
  const [insurance, setInsurance] = useState(1_800);
  const [hoa, setHoa] = useState(0);

  const money = useMoney(CURRENCIES[currency].code);
  const symbol = CURRENCIES[currency].symbol;
  const num = (n: number) => (Number.isFinite(n) ? n : 0);

  const result = useMemo(
    () =>
      computeMortgage({
        price: num(price),
        downPayment: num(down),
        annualRatePct: num(rate),
        termYears: num(term),
        annualPropertyTax: num(tax),
        annualHomeInsurance: num(insurance),
        monthlyHoa: num(hoa),
      }),
    [price, down, rate, term, tax, insurance, hoa],
  );

  const schedule = useMemo(
    () => amortizationByYear(result.loanAmount, num(rate), num(term)),
    [result.loanAmount, rate, term],
  );

  const downPct = price > 0 ? Math.round((num(down) / num(price)) * 100) : 0;
  const piShare =
    result.monthlyTotal > 0
      ? (result.monthlyPrincipalInterest / result.monthlyTotal) * 100
      : 0;

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="display text-lg font-bold tracking-tight">Your numbers</h2>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-[var(--muted)]">Currency</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 outline-none focus:border-[var(--accent)]"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Home price" value={price} onChange={setPrice} prefix={symbol} step={1000} />
        <Field
          label={`Down payment (${downPct}%)`}
          value={down}
          onChange={setDown}
          prefix={symbol}
          step={1000}
        />
        <Field label="Interest rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
        <Field label="Loan term" value={term} onChange={setTerm} suffix="yrs" step={1} />
        <Field label="Property tax / yr" value={tax} onChange={setTax} prefix={symbol} step={100} />
        <Field label="Home insurance / yr" value={insurance} onChange={setInsurance} prefix={symbol} step={100} />
        <Field label="HOA / month" value={hoa} onChange={setHoa} prefix={symbol} step={10} />
      </div>

      {/* Result */}
      <div className="mt-6 rounded-2xl bg-[var(--accent)] text-[var(--accent-fg)] p-5 sm:p-6">
        <p className="text-sm font-semibold opacity-90">Estimated monthly payment</p>
        <p className="display text-4xl sm:text-5xl font-black tabular-nums mt-1">
          {money.format(result.monthlyTotal)}
        </p>
        <div className="mt-4 h-2.5 w-full rounded-full bg-black/20 overflow-hidden">
          <div className="h-full bg-black/45" style={{ width: `${piShare}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          <Row label="Principal & interest" value={money.format(result.monthlyPrincipalInterest)} />
          <Row label="Property tax" value={money.format(result.monthlyTax)} />
          <Row label="Home insurance" value={money.format(result.monthlyInsurance)} />
          <Row label="HOA" value={money.format(result.monthlyHoa)} />
        </div>
      </div>

      {/* Totals */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Loan amount" value={money.format(result.loanAmount)} />
        <Stat label="Total interest" value={money.format(result.totalInterest)} />
        <Stat
          label="Total of payments"
          value={money.format(result.totalOfPayments)}
        />
      </div>

      {/* Amortization summary */}
      {schedule.length > 0 && (
        <details className="mt-6 group">
          <summary className="cursor-pointer text-sm font-semibold text-[var(--accent)]">
            Show yearly amortization
          </summary>
          <div className="mt-3 max-h-[320px] overflow-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm tabular-nums">
              <thead className="sticky top-0 bg-[var(--card)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                <tr>
                  <th className="px-3 py-2 font-bold">Year</th>
                  <th className="px-3 py-2 font-bold">Principal</th>
                  <th className="px-3 py-2 font-bold">Interest</th>
                  <th className="px-3 py-2 font-bold">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r) => (
                  <tr key={r.year} className="border-t border-[var(--border)]">
                    <td className="px-3 py-1.5">{r.year}</td>
                    <td className="px-3 py-1.5">{money.format(r.principalPaid)}</td>
                    <td className="px-3 py-1.5">{money.format(r.interestPaid)}</td>
                    <td className="px-3 py-1.5">{money.format(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="opacity-85">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p className="display text-xl font-black tabular-nums mt-1">{value}</p>
    </div>
  );
}
