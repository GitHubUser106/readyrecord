"use client";

import type { ReadyRecordData, SectionId } from "@/lib/types";
import { SECTIONS } from "@/lib/types";
import { getSectionCompletion, getOverallCompletion } from "@/lib/storage";
import {
  formatCurrency,
  totalBankBalances,
  totalRealEstateValue,
  totalMortgageBalance,
  totalCreditCardDebt,
  totalLineOfCreditDebt,
  totalMonthlyIncome,
  totalMonthlyExpenses,
  totalAssets,
  totalDebts,
  netWorth,
  monthlyNet,
} from "@/lib/calculations";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertCircle } from "lucide-react";

interface SummaryProps {
  data: ReadyRecordData;
}

export default function Summary({ data }: SummaryProps) {
  const completions = getSectionCompletion(data);
  const overall = getOverallCompletion(data);

  const _totalAssets = totalAssets(data);
  const _totalDebts = totalDebts(data);
  const _netWorth = netWorth(data);
  const _monthlyIncome = totalMonthlyIncome(data);
  const _monthlyExpenses = totalMonthlyExpenses(data);
  const _monthlyNet = monthlyNet(data);

  const accountCount =
    data.bankAccounts.accounts.length +
    data.debts.creditCards.length +
    data.debts.linesOfCredit.length;

  const policyCount =
    data.insurance.automobile.length +
    data.insurance.homeowners.length +
    data.insurance.medical.length +
    data.insurance.life.length +
    data.insurance.longTermCare.length +
    data.insurance.other.length;

  return (
    <div className="space-y-8">
      {/* Overall progress */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sage-700 mb-4">Completion Progress</h3>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-lg">Overall: {overall}%</span>
            </div>
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${overall}%` }}
                role="progressbar"
                aria-valuenow={overall}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Overall completion: ${overall}%`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SECTIONS.filter((s) => s.id !== "summary").map((section) => {
              const pct = completions[section.id as SectionId];
              const isComplete = pct === 100;
              return (
                <div
                  key={section.id}
                  className="flex items-center gap-2 text-base"
                >
                  {isComplete ? (
                    <Check className="h-5 w-5 text-sage-500 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
                  )}
                  <span className={isComplete ? "text-sage-700" : "text-muted-foreground"}>
                    {section.title}
                  </span>
                  <span className="ml-auto font-mono text-sm">{pct}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sage-700 mb-4">Monthly Cash Flow</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Monthly Income</span>
                <span className="font-semibold text-sage-700">
                  {formatCurrency(_monthlyIncome)}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Monthly Expenses</span>
                <span className="font-semibold text-destructive">
                  {formatCurrency(_monthlyExpenses)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                <span>Monthly Net</span>
                <span className={_monthlyNet >= 0 ? "text-sage-700" : "text-destructive"}>
                  {formatCurrency(_monthlyNet)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sage-700 mb-4">Net Worth</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Bank Balances</span>
                <span className="font-semibold">
                  {formatCurrency(totalBankBalances(data))}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Real Estate Value</span>
                <span className="font-semibold">
                  {formatCurrency(totalRealEstateValue(data))}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Total Assets</span>
                <span className="font-semibold text-sage-700">
                  {formatCurrency(_totalAssets)}
                </span>
              </div>
              <div className="border-t border-border pt-2 space-y-2">
                <div className="flex justify-between text-base text-muted-foreground">
                  <span>Credit Card Debt</span>
                  <span>{formatCurrency(totalCreditCardDebt(data))}</span>
                </div>
                <div className="flex justify-between text-base text-muted-foreground">
                  <span>Lines of Credit</span>
                  <span>{formatCurrency(totalLineOfCreditDebt(data))}</span>
                </div>
                <div className="flex justify-between text-base text-muted-foreground">
                  <span>Mortgages</span>
                  <span>{formatCurrency(totalMortgageBalance(data))}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Total Debts</span>
                  <span className="font-semibold text-destructive">
                    {formatCurrency(_totalDebts)}
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                <span>Net Worth</span>
                <span className={_netWorth >= 0 ? "text-sage-700" : "text-destructive"}>
                  {formatCurrency(_netWorth)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick stats */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sage-700 mb-4">At a Glance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-bold text-primary">{accountCount}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Accounts Documented
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-bold text-primary">{policyCount}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Insurance Policies
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {data.income.sources.length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Income Sources
              </div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {data.realEstate.properties.length}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Properties</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
