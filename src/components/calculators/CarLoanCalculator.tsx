"use client";

import { useMemo, useState } from "react";
import { computeCarLoan } from "@/lib/calculators/car";
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

export default function CarLoanCalculator({
  initialMonths = 60,
}: {
  initialMonths?: number;
}) {
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState(35_000);
  const [down, setDown] = useState(5_000);
  const [tradeIn, setTradeIn] = useState(0);
  const [salesTax, setSalesTax] = useState(7);
  const [rate, setRate] = useState(7.5);
  const [months, setMonths] = useState(initialMonths);

  const money = useMoney(CURRENCIES[currency].code);
  const symbol = CURRENCIES[currency].symbol;

  const r = useMemo(
    () =>
      computeCarLoan({
        vehiclePrice: num(price),
        downPayment: num(down),
        tradeInValue: num(tradeIn),
        salesTaxPct: num(salesTax),
        annualRatePct: num(rate),
        termMonths: num(months),
      }),
    [price, down, tradeIn, salesTax, rate, months],
  );

  return (
    <CalcShell currency={currency} onCurrency={setCurrency}>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Vehicle price" value={price} onChange={setPrice} prefix={symbol} step={500} />
        <Field label="Down payment" value={down} onChange={setDown} prefix={symbol} step={500} />
        <Field label="Trade-in value" value={tradeIn} onChange={setTradeIn} prefix={symbol} step={500} />
        <Field label="Sales tax" value={salesTax} onChange={setSalesTax} suffix="%" step={0.1} />
        <Field label="Interest rate (APR)" value={rate} onChange={setRate} suffix="%" step={0.1} />
        <Field label="Term" value={months} onChange={setMonths} suffix="months" step={6} />
      </div>

      <ResultCard label="Monthly payment" value={money.format(r.monthly)}>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          <Row label="Amount financed" value={money.format(r.loanAmount)} />
          <Row label="Sales tax" value={money.format(r.salesTax)} />
          <Row label="Total interest" value={money.format(r.totalInterest)} />
          <Row label="Total of payments" value={money.format(r.totalPaid)} />
        </div>
      </ResultCard>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Amount financed" value={money.format(r.loanAmount)} />
        <Stat label="Total interest" value={money.format(r.totalInterest)} />
        <Stat label="Total cost (with down)" value={money.format(r.totalCost)} />
      </div>
    </CalcShell>
  );
}
