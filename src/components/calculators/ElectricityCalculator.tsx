"use client";

import { useMemo, useState } from "react";
import { computeElectricity } from "@/lib/calculators/electricity";
import {
  CalcShell,
  Field,
  ResultCard,
  Row,
  Stat,
  num,
  useMoney,
  CURRENCIES,
} from "./fields";

export default function ElectricityCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [watts, setWatts] = useState(1500);
  const [hours, setHours] = useState(4);
  const [days, setDays] = useState(30);
  const [price, setPrice] = useState(0.17);
  const [qty, setQty] = useState(1);

  const money = useMoney(CURRENCIES[currency].code);
  const symbol = CURRENCIES[currency].symbol;
  const kwh = (n: number) => `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })} kWh`;

  const r = useMemo(
    () =>
      computeElectricity({
        powerWatts: num(watts),
        hoursPerDay: num(hours),
        daysPerMonth: num(days),
        pricePerKwh: num(price),
        quantity: num(qty),
      }),
    [watts, hours, days, price, qty],
  );

  return (
    <CalcShell currency={currency} onCurrency={setCurrency}>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Power" value={watts} onChange={setWatts} suffix="W" step={50} />
        <Field label="Quantity" value={qty} onChange={setQty} step={1} />
        <Field label="Hours per day" value={hours} onChange={setHours} suffix="h" step={0.5} />
        <Field label="Days per month" value={days} onChange={setDays} step={1} />
        <Field label="Price per kWh" value={price} onChange={setPrice} prefix={symbol} step={0.01} />
      </div>

      <ResultCard label="Cost per month" value={money.format(r.costPerMonth)}>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          <Row label="Per day" value={money.format(r.costPerDay)} />
          <Row label="Per year" value={money.format(r.costPerYear)} />
          <Row label="Energy / month" value={kwh(r.kwhPerMonth)} />
          <Row label="Energy / year" value={kwh(r.kwhPerYear)} />
        </div>
      </ResultCard>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Stat label="kWh per month" value={kwh(r.kwhPerMonth)} />
        <Stat label="Cost per day" value={money.format(r.costPerDay)} />
        <Stat label="Cost per year" value={money.format(r.costPerYear)} />
      </div>
    </CalcShell>
  );
}
