import type { ReadyRecordData } from "./types";

/** Parse a currency string to a number, handling commas and $ signs */
export function parseCurrency(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[$,\s]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/** Format a number as CAD currency */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Format a phone number as (XXX) XXX-XXXX */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === "1") {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return value;
}

/** Format SIN as XXX-XXX-XXX */
export function formatSIN(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 9) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value;
}

/** Mask a SIN for display: ***-***-XXX */
export function maskSIN(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 9) {
    return `***-***-${digits.slice(6)}`;
  }
  return value ? "***" : "";
}

/** Mask a card number: **** **** **** XXXX */
export function maskCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 4) {
    return `**** **** **** ${digits.slice(-4)}`;
  }
  return value ? "****" : "";
}

// --- Totals ---

export function totalCreditCardDebt(data: ReadyRecordData): number {
  return data.debts.creditCards.reduce(
    (sum, card) => sum + parseCurrency(card.balanceOwing),
    0
  );
}

export function totalLineOfCreditDebt(data: ReadyRecordData): number {
  return data.debts.linesOfCredit.reduce(
    (sum, loc) => sum + parseCurrency(loc.balance),
    0
  );
}

export function totalDebt(data: ReadyRecordData): number {
  return totalCreditCardDebt(data) + totalLineOfCreditDebt(data);
}

export function totalBankBalances(data: ReadyRecordData): number {
  return data.bankAccounts.accounts.reduce(
    (sum, acct) => sum + parseCurrency(acct.totalBalance),
    0
  );
}

export function totalRealEstateValue(data: ReadyRecordData): number {
  return data.realEstate.properties.reduce(
    (sum, prop) => sum + parseCurrency(prop.approximateValue),
    0
  );
}

export function totalMortgageBalance(data: ReadyRecordData): number {
  return data.realEstate.properties.reduce(
    (sum, prop) => sum + parseCurrency(prop.mortgageBalance),
    0
  );
}

export function totalMonthlyIncome(data: ReadyRecordData): number {
  return data.income.sources.reduce(
    (sum, src) => sum + parseCurrency(src.monthlyPaymentAmount),
    0
  );
}

export function totalMonthlyExpenses(data: ReadyRecordData): number {
  return data.expenses.expenses.reduce(
    (sum, exp) => sum + parseCurrency(exp.monthlyAmount),
    0
  );
}

export function totalAssets(data: ReadyRecordData): number {
  return totalBankBalances(data) + totalRealEstateValue(data);
}

export function totalDebts(data: ReadyRecordData): number {
  return totalDebt(data) + totalMortgageBalance(data);
}

export function netWorth(data: ReadyRecordData): number {
  return totalAssets(data) - totalDebts(data);
}

export function monthlyNet(data: ReadyRecordData): number {
  return totalMonthlyIncome(data) - totalMonthlyExpenses(data);
}
