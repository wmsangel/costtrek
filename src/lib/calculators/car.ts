/** Car loan math. Exact amortization + sales tax on the taxable amount. */
import { monthlyPayment } from "./mortgage";

export type CarLoanInput = {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  salesTaxPct: number;
  annualRatePct: number;
  termMonths: number;
};

export type CarLoanResult = {
  salesTax: number;
  loanAmount: number;
  monthly: number;
  totalPaid: number; // over the loan (principal + interest)
  totalInterest: number;
  totalCost: number; // down + trade covered price + interest, i.e. out-the-door + interest
};

export function computeCarLoan(input: CarLoanInput): CarLoanResult {
  // Most US states tax (price − trade-in).
  const taxable = Math.max(0, input.vehiclePrice - input.tradeInValue);
  const salesTax = (taxable * input.salesTaxPct) / 100;
  const loanAmount = Math.max(
    0,
    input.vehiclePrice + salesTax - input.downPayment - input.tradeInValue,
  );
  const years = input.termMonths / 12;
  const monthly = monthlyPayment(loanAmount, input.annualRatePct, years);
  const totalPaid = monthly * Math.round(input.termMonths);
  const totalInterest = Math.max(0, totalPaid - loanAmount);
  return {
    salesTax,
    loanAmount,
    monthly,
    totalPaid,
    totalInterest,
    totalCost: input.downPayment + totalPaid,
  };
}
