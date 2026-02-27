"use client";

import type { ReadyRecordData } from "@/lib/types";
import {
  formatCurrency,
  totalBankBalances,
  totalRealEstateValue,
  totalPhysicalAssetsValue,
  totalMortgageBalance,
  totalCreditCardDebt,
  totalLineOfCreditDebt,
  totalMonthlyIncome,
  totalMonthlyExpenses,
  totalAssets,
  totalDebts,
  netWorth,
  monthlyNet,
  totalAutoPaymentExpenses,
  totalDigitalSubscriptionsCost,
} from "@/lib/calculations";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveAllData } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface SummaryProps {
  data: ReadyRecordData;
}

function buildNarrative(data: ReadyRecordData): string {
  const parts: string[] = [];

  const bankCount = data.bankAccounts.accounts.length;
  if (bankCount > 0) parts.push(`${bankCount} bank account${bankCount > 1 ? "s" : ""}`);

  const propCount = data.realEstate.properties.length;
  if (propCount > 0) parts.push(`${propCount} propert${propCount > 1 ? "ies" : "y"}`);

  const policyCount = Object.values(data.insurance).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );
  if (policyCount > 0) parts.push(`${policyCount} insurance polic${policyCount > 1 ? "ies" : "y"}`);

  const incomeCount = data.income.sources.length;
  if (incomeCount > 0) parts.push(`${incomeCount} income source${incomeCount > 1 ? "s" : ""}`);

  const expenseFilled = data.expenses.expenses.filter(
    (e) => e.companyName.trim() !== "" || e.monthlyAmount.trim() !== ""
  ).length;
  if (expenseFilled > 0) parts.push(`${expenseFilled} monthly bill${expenseFilled > 1 ? "s" : ""}`);

  const assetCount = data.physicalAssets.assets.length;
  if (assetCount > 0) parts.push(`${assetCount} valuable item${assetCount > 1 ? "s" : ""}`);

  const digitalCount = data.digitalAccounts.accounts.length;
  if (digitalCount > 0) parts.push(`${digitalCount} online account${digitalCount > 1 ? "s" : ""}`);

  const contactCount = data.importantContacts.closeFriends.length;
  if (contactCount > 0) parts.push(`${contactCount} close contact${contactCount > 1 ? "s" : ""}`);

  if (parts.length === 0) {
    return "You've made a start. Come back anytime to add more details.";
  }

  if (parts.length === 1) {
    return `You've documented ${parts[0]}. Your family will be grateful.`;
  }

  const last = parts.pop();
  return `You've documented ${parts.join(", ")}, and ${last}. Your family will be so grateful you did this.`;
}

export default function Summary({ data }: SummaryProps) {
  const router = useRouter();

  const _totalAssets = totalAssets(data);
  const _totalDebts = totalDebts(data);
  const _netWorth = netWorth(data);
  const _monthlyIncome = totalMonthlyIncome(data);
  const _monthlyExpenses = totalMonthlyExpenses(data);
  const _monthlyNet = monthlyNet(data);
  const _autoPaymentCosts = totalAutoPaymentExpenses(data);

  const narrative = buildNarrative(data);

  return (
    <div className="space-y-8">
      {/* Warm congratulations */}
      <div className="text-center py-6">
        <Heart className="h-10 w-10 text-sage-500 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-sage-700 text-2xl mb-3">
          You did it!
        </h3>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
          {narrative}
        </p>
      </div>

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
                <span className="font-semibold">
                  {formatCurrency(_monthlyExpenses)}
                </span>
              </div>
              <div className="flex justify-between text-base text-muted-foreground">
                <span>Digital Subscriptions</span>
                <span>{formatCurrency(totalDigitalSubscriptionsCost(data))}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                <span>Monthly Net</span>
                <span className={_monthlyNet >= 0 ? "text-sage-700" : "text-muted-foreground"}>
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
                <span>Physical Assets</span>
                <span className="font-semibold">
                  {formatCurrency(totalPhysicalAssetsValue(data))}
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
                  <span className="font-semibold">
                    {formatCurrency(_totalDebts)}
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                <span>Net Worth</span>
                <span className={_netWorth >= 0 ? "text-sage-700" : "text-muted-foreground"}>
                  {formatCurrency(_netWorth)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Costs to Cancel */}
      {_autoPaymentCosts > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sage-700 mb-2">Monthly Costs That Will Need Cancelling</h3>
            <p className="text-muted-foreground text-base mb-4">
              Total of pre-authorized expenses and auto-payment digital subscriptions
              that your family will need to cancel or transfer.
            </p>
            <div className="text-2xl font-bold text-sage-700">
              {formatCurrency(_autoPaymentCosts)} / month
            </div>
          </CardContent>
        </Card>
      )}

      {/* Download CTA */}
      <div className="text-center py-6">
        <Button
          onClick={() => {
            saveAllData(data);
            router.push("/review");
          }}
          size="lg"
          className="text-xl px-10 py-7 rounded-xl shadow-lg gap-2"
        >
          <FileDown className="h-6 w-6" aria-hidden="true" />
          Download Your ReadyRecord
        </Button>
        <p className="text-muted-foreground mt-4 text-base">
          Want to add more? You can come back anytime.
        </p>
      </div>
    </div>
  );
}
