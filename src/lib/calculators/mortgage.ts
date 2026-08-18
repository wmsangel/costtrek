/**
 * Exact mortgage / amortization math. Deterministic formulas — no estimates,
 * no external data — so these calculators carry no data-accuracy (YMYL) risk.
 */

export type MortgageInput = {
  /** Home price / total property value. */
  price: number;
  /** Down payment in the same currency. */
  downPayment: number;
  /** Annual nominal interest rate as a percentage, e.g. 6.5. */
  annualRatePct: number;
  /** Loan length in years, e.g. 30. */
  termYears: number;
  /** Optional yearly extras, absolute amounts in currency. */
  annualPropertyTax?: number;
  annualHomeInsurance?: number;
  /** Optional monthly HOA / maintenance. */
  monthlyHoa?: number;
};

export type MortgageResult = {
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  monthlyTotal: number;
  totalOfPayments: number; // principal + interest over full term
  totalInterest: number;
  payoffMonths: number;
};

/**
 * Standard fixed-rate amortized monthly payment:
 *   M = P * r / (1 - (1 + r)^-n)
 * where r = monthly rate, n = number of payments. Handles the 0% edge case.
 */
export function monthlyPayment(
  principal: number,
  annualRatePct: number,
  termYears: number,
): number {
  const n = Math.round(termYears * 12);
  if (n <= 0 || principal <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function computeMortgage(input: MortgageInput): MortgageResult {
  const loanAmount = Math.max(0, input.price - input.downPayment);
  const n = Math.round(input.termYears * 12);
  const pi = monthlyPayment(loanAmount, input.annualRatePct, input.termYears);
  const totalOfPayments = pi * n;
  const totalInterest = Math.max(0, totalOfPayments - loanAmount);
  const monthlyTax = (input.annualPropertyTax ?? 0) / 12;
  const monthlyInsurance = (input.annualHomeInsurance ?? 0) / 12;
  const monthlyHoa = input.monthlyHoa ?? 0;
  return {
    loanAmount,
    monthlyPrincipalInterest: pi,
    monthlyTax,
    monthlyInsurance,
    monthlyHoa,
    monthlyTotal: pi + monthlyTax + monthlyInsurance + monthlyHoa,
    totalOfPayments,
    totalInterest,
    payoffMonths: n,
  };
}

/** A single amortization-schedule row (yearly aggregate). */
export type AmortYear = {
  year: number;
  interestPaid: number;
  principalPaid: number;
  balance: number;
};

/** Yearly amortization schedule for the principal+interest portion. */
export function amortizationByYear(
  loanAmount: number,
  annualRatePct: number,
  termYears: number,
): AmortYear[] {
  const n = Math.round(termYears * 12);
  if (n <= 0 || loanAmount <= 0) return [];
  const r = annualRatePct / 100 / 12;
  const pi = monthlyPayment(loanAmount, annualRatePct, termYears);
  let balance = loanAmount;
  const rows: AmortYear[] = [];
  let yearInterest = 0;
  let yearPrincipal = 0;
  for (let m = 1; m <= n; m++) {
    const interest = r === 0 ? 0 : balance * r;
    const principal = Math.min(pi - interest, balance);
    balance = Math.max(0, balance - principal);
    yearInterest += interest;
    yearPrincipal += principal;
    if (m % 12 === 0 || m === n) {
      rows.push({
        year: Math.ceil(m / 12),
        interestPaid: yearInterest,
        principalPaid: yearPrincipal,
        balance,
      });
      yearInterest = 0;
      yearPrincipal = 0;
    }
  }
  return rows;
}
