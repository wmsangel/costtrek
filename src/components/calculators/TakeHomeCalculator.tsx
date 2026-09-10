"use client";

import { useMemo, useState } from "react";
import {
  COUNTRY_TAX,
  computeTakeHome,
  getCountryTax,
} from "@/lib/calculators/takehome";
import {
  CalcShell,
  Field,
  SelectField,
  ResultCard,
  Row,
  Stat,
  num,
} from "./fields";

const PERIODS = [
  { value: "year", label: "Per year" },
  { value: "month", label: "Per month" },
];

const COUNTRY_OPTIONS = COUNTRY_TAX.map((c) => ({ value: c.code, label: c.name }));

export default function TakeHomeCalculator({
  initialCountry = "US",
  initialGross = 60000,
}: {
  initialCountry?: string;
  initialGross?: number;
}) {
  const [code, setCode] = useState(initialCountry);
  const [amount, setAmount] = useState(initialGross);
  const [period, setPeriod] = useState("year");

  const country = getCountryTax(code) ?? COUNTRY_TAX[0];
  const money = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: country.currency,
        maximumFractionDigits: 0,
      }),
    [country.currency],
  );

  const grossAnnual = period === "month" ? num(amount) * 12 : num(amount);
  const r = useMemo(
    () => computeTakeHome(grossAnnual, country),
    [grossAnnual, country],
  );

  return (
    <CalcShell>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Country"
          value={code}
          onChange={setCode}
          options={COUNTRY_OPTIONS}
        />
        <SelectField
          label="Pay period"
          value={period}
          onChange={setPeriod}
          options={PERIODS}
        />
        <div className="sm:col-span-2">
          <Field
            label={`Gross salary (${country.currency})`}
            value={amount}
            onChange={setAmount}
          />
        </div>
      </div>

      <ResultCard label={`Take-home pay in ${country.name}`} value={money.format(r.net)}>
        <div className="mt-2 text-sm opacity-90">
          ≈ {money.format(r.net / 12)} per month
        </div>
      </ResultCard>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat label="Income tax" value={money.format(r.incomeTax)} />
        <Stat label="Social / other" value={money.format(r.social)} />
        <Stat label="Effective rate" value={`${r.effectiveRate.toFixed(1)}%`} />
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <Row label="Gross (annual)" value={money.format(r.gross)} />
        <Row label="− Income tax" value={money.format(r.incomeTax)} />
        <Row label="− Social contributions" value={money.format(r.social)} />
        <Row label="= Net (annual)" value={money.format(r.net)} />
      </div>

      <p className="mt-5 text-xs text-[var(--muted)] leading-relaxed">
        Estimate on {country.name}&apos;s 2025 national rules for a single
        earner. {country.excludes} Excludes personal circumstances and is not tax
        advice — verify with a professional before relying on it.
      </p>
    </CalcShell>
  );
}
