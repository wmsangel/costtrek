"use client";

import { useMemo, useState } from "react";
import { computeSalary, toAnnual, type Filing } from "@/lib/calculators/salary";
import {
  CalcShell,
  Field,
  SelectField,
  ResultCard,
  Row,
  Stat,
  num,
  useMoney,
  CURRENCIES,
} from "./fields";

const PERIODS = [
  { value: "year", label: "Per year" },
  { value: "month", label: "Per month" },
  { value: "biweek", label: "Every 2 weeks" },
  { value: "week", label: "Per week" },
  { value: "hour", label: "Per hour" },
];

export default function SalaryCalculator({
  initialAnnual = 85_000,
}: {
  initialAnnual?: number;
}) {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(initialAnnual);
  const [period, setPeriod] = useState("year");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [filing, setFiling] = useState<Filing>("single");
  const [stateRate, setStateRate] = useState(5);
  const [preTax, setPreTax] = useState(0);

  const money = useMoney(CURRENCIES[currency].code);
  const symbol = CURRENCIES[currency].symbol;

  const grossAnnual = useMemo(
    () => toAnnual(num(amount), period, num(hoursPerWeek)),
    [amount, period, hoursPerWeek],
  );

  const r = useMemo(
    () =>
      computeSalary({
        grossAnnual,
        filing,
        preTaxAnnual: num(preTax),
        stateRatePct: num(stateRate),
      }),
    [grossAnnual, filing, preTax, stateRate],
  );

  return (
    <CalcShell currency={currency} onCurrency={setCurrency}>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Salary / wage" value={amount} onChange={setAmount} prefix={symbol} step={500} />
        <SelectField label="Pay period" value={period} onChange={setPeriod} options={PERIODS} />
        {period === "hour" && (
          <Field label="Hours per week" value={hoursPerWeek} onChange={setHoursPerWeek} suffix="h" step={1} />
        )}
        <SelectField
          label="Filing status"
          value={filing}
          onChange={(v) => setFiling(v as Filing)}
          options={[
            { value: "single", label: "Single" },
            { value: "married", label: "Married, filing jointly" },
          ]}
        />
        <Field label="State income tax" value={stateRate} onChange={setStateRate} suffix="%" step={0.1} />
        <Field label="Pre-tax deductions / yr (401k, HSA)" value={preTax} onChange={setPreTax} prefix={symbol} step={500} />
      </div>

      <ResultCard label="Estimated take-home pay" value={`${money.format(r.netMonthly)} / mo`}>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          <Row label="Per year" value={money.format(r.netAnnual)} />
          <Row label="Every 2 weeks" value={money.format(r.netBiweekly)} />
          <Row label="Per week" value={money.format(r.netWeekly)} />
          <Row label="Effective tax rate" value={`${r.effectiveRatePct.toFixed(1)}%`} />
        </div>
      </ResultCard>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Stat label="Gross (annual)" value={money.format(r.grossAnnual)} />
        <Stat label="Total tax (annual)" value={money.format(r.totalTax)} />
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--border)] p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
          Annual tax breakdown
        </p>
        <div className="grid gap-1.5 text-sm">
          <Row label="Federal income tax" value={money.format(r.federalTax)} />
          <Row label="Social Security & Medicare (FICA)" value={money.format(r.fica)} />
          <Row label="State income tax" value={money.format(r.stateTax)} />
        </div>
      </div>

      <p className="mt-3 text-xs text-[var(--muted)]">
        Estimate for US tax year 2024 (federal brackets + FICA). Excludes tax
        credits, local taxes and state-specific rules; state is applied as the
        flat rate you enter.
      </p>
    </CalcShell>
  );
}
