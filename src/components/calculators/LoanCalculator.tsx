"use client";

import { useMemo, useState } from "react";
import { computeLoan } from "@/lib/calculators/loan";
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

export default function LoanCalculator({
  initialAmount = 20_000,
}: {
  initialAmount?: number;
}) {
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(9.5);
  const [months, setMonths] = useState(60);

  const money = useMoney(CURRENCIES[currency].code);
  const symbol = CURRENCIES[currency].symbol;

  const r = useMemo(
    () =>
      computeLoan({
        amount: num(amount),
        annualRatePct: num(rate),
        termMonths: num(months),
      }),
    [amount, rate, months],
  );

  return (
    <CalcShell currency={currency} onCurrency={setCurrency}>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Field label="Loan amount" value={amount} onChange={setAmount} prefix={symbol} step={500} />
        <Field label="Interest rate (APR)" value={rate} onChange={setRate} suffix="%" step={0.1} />
        <Field label="Term" value={months} onChange={setMonths} suffix="months" step={6} />
      </div>

      <ResultCard label="Monthly payment" value={money.format(r.monthly)}>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          <Row label="Total interest" value={money.format(r.totalInterest)} />
          <Row label="Total paid" value={money.format(r.totalPaid)} />
        </div>
      </ResultCard>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Stat label="Borrowed" value={money.format(num(amount))} />
        <Stat label="Total interest" value={money.format(r.totalInterest)} />
        <Stat label="Total of payments" value={money.format(r.totalPaid)} />
      </div>
    </CalcShell>
  );
}
