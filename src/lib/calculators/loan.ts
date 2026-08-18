/** Generic amortized loan math (personal / student / general). Exact formulas. */
import { monthlyPayment } from "./mortgage";

export type LoanInput = {
  amount: number;
  annualRatePct: number;
  termMonths: number;
};

export type LoanResult = {
  monthly: number;
  totalPaid: number;
  totalInterest: number;
};

export function computeLoan(input: LoanInput): LoanResult {
  const years = input.termMonths / 12;
  const monthly = monthlyPayment(input.amount, input.annualRatePct, years);
  const totalPaid = monthly * Math.round(input.termMonths);
  return {
    monthly,
    totalPaid,
    totalInterest: Math.max(0, totalPaid - input.amount),
  };
}
