/** Electricity / appliance running-cost math. Exact. */

export type ElectricityInput = {
  powerWatts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  pricePerKwh: number;
  quantity: number;
};

export type ElectricityResult = {
  kwhPerDay: number;
  kwhPerMonth: number;
  kwhPerYear: number;
  costPerDay: number;
  costPerMonth: number;
  costPerYear: number;
};

export function computeElectricity(input: ElectricityInput): ElectricityResult {
  const kw = (input.powerWatts / 1000) * Math.max(0, input.quantity);
  const kwhPerDay = kw * input.hoursPerDay;
  const kwhPerMonth = kwhPerDay * input.daysPerMonth;
  const kwhPerYear = kwhPerDay * 365;
  return {
    kwhPerDay,
    kwhPerMonth,
    kwhPerYear,
    costPerDay: kwhPerDay * input.pricePerKwh,
    costPerMonth: kwhPerMonth * input.pricePerKwh,
    costPerYear: kwhPerYear * input.pricePerKwh,
  };
}
