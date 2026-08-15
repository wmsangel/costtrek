"use client";

import { useMemo, useState } from "react";

export type BreakdownRow = {
  label: string;
  pct: string; // "+47%" / "-31%"
  cheaper: boolean;
  width: number; // 0..100
};

export default function CostCompareCalculator({
  numberLocale,
  overallA,
  overallB,
  initialSalary = 75000,
  strings,
  rows,
}: {
  numberLocale: string;
  overallA: number;
  overallB: number;
  initialSalary?: number;
  strings: {
    salaryLabel: string;
    perYear: string;
    needLine: string;
    resultLine: string;
    breakdownTitle: string;
  };
  rows: BreakdownRow[];
}) {
  const [salary, setSalary] = useState(initialSalary);

  const usd = useMemo(
    () =>
      new Intl.NumberFormat(numberLocale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [numberLocale],
  );

  const equivalent = (salary * overallB) / overallA;
  const cheaper = overallB < overallA;

  return (
    <div className="card rounded-2xl p-5 sm:p-6">
      <label
        htmlFor="salary"
        className="block text-sm font-medium text-[var(--muted)] mb-1.5"
      >
        {strings.salaryLabel}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--card-2)] px-3 py-2 focus-within:border-[var(--accent)]">
        <span className="text-[var(--muted)]">$</span>
        <input
          id="salary"
          type="number"
          min={0}
          step={1000}
          value={salary}
          onChange={(e) => setSalary(Math.max(0, Number(e.target.value) || 0))}
          className="w-full bg-transparent outline-none text-lg font-mono"
        />
        <span className="text-[var(--muted)] text-sm">{strings.perYear}</span>
      </div>

      <div className="mt-5 rounded-xl bg-[var(--accent-soft)] p-4 text-center">
        <p className="text-sm text-[var(--muted)]">{strings.needLine}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">
          {usd.format(equivalent)}
          <span className="text-base font-normal text-[var(--muted)]">
            {" "}
            {strings.perYear}
          </span>
        </p>
        <p
          className="mt-1 text-sm font-medium"
          style={{ color: cheaper ? "var(--good)" : "var(--bad)" }}
        >
          {strings.resultLine}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-3">{strings.breakdownTitle}</h3>
        <ul className="space-y-2.5">
          {rows.map((row) => (
            <li
              key={row.label}
              className="grid grid-cols-[9rem_1fr_3.5rem] items-center gap-3 text-sm"
            >
              <span className="text-[var(--muted)]">{row.label}</span>
              <span className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${row.width}%`,
                    background: row.cheaper ? "var(--good)" : "var(--bad)",
                  }}
                />
              </span>
              <span
                className="text-right font-medium tabular-nums"
                style={{ color: row.cheaper ? "var(--good)" : "var(--bad)" }}
              >
                {row.pct}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
