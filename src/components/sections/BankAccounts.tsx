"use client";

import { useCallback } from "react";
import type { BankAccounts as BankAccountsType, BankAccount } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/lib/calculations";

interface BankAccountsProps {
  data: BankAccountsType;
  onChange: (data: BankAccountsType) => void;
}

const ACCOUNT_TYPES = [
  { value: "chequing", label: "Chequing" },
  { value: "savings", label: "Savings" },
  { value: "rrsp", label: "RRSP" },
  { value: "tfsa", label: "TFSA" },
  { value: "gic", label: "GIC" },
  { value: "mutual-fund", label: "Mutual Fund" },
  { value: "stocks", label: "Stocks / Brokerage" },
  { value: "rrif", label: "RRIF" },
  { value: "lif", label: "LIF" },
  { value: "other", label: "Other" },
];

function newBankAccount(): BankAccount {
  return {
    id: crypto.randomUUID(),
    institutionName: "",
    accountType: "",
    phoneNumber: "",
    accountNumber: "",
    interestRate: "",
    avgMonthlyActivity: "",
    availableFunds: "",
    totalBalance: "",
  };
}

export default function BankAccounts({ data, onChange }: BankAccountsProps) {
  const save = useCallback(() => {
    saveSection("bankAccounts", data);
  }, [data]);

  const updateAccount = useCallback(
    (index: number, field: string, value: string) => {
      const accounts = [...data.accounts];
      accounts[index] = { ...accounts[index], [field]: value };
      onChange({ ...data, accounts });
    },
    [data, onChange]
  );

  const addAccount = useCallback(() => {
    onChange({ ...data, accounts: [...data.accounts, newBankAccount()] });
  }, [data, onChange]);

  const removeAccount = useCallback(
    (index: number) => {
      const accounts = data.accounts.filter((_, i) => i !== index);
      const updated = { ...data, accounts };
      onChange(updated);
      saveSection("bankAccounts", updated);
    },
    [data, onChange]
  );

  const total = data.accounts.reduce(
    (sum, a) => sum + parseCurrency(a.totalBalance),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">Accounts & Investments</h3>
        <Button
          onClick={addAccount}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          Add Account
        </Button>
      </div>

      {data.accounts.length === 0 && (
        <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg">
          No accounts added yet. Click &ldquo;Add Account&rdquo; to get started.
        </p>
      )}

      <div className="space-y-4">
        {data.accounts.map((account, index) => (
          <Card key={account.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  Account {index + 1}
                  {account.institutionName &&
                    ` — ${account.institutionName}`}
                </span>
                <Button
                  onClick={() => removeAccount(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove account ${index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Bank / Institution"
                  name="institutionName"
                  value={account.institutionName}
                  onChange={(_, v) =>
                    updateAccount(index, "institutionName", v)
                  }
                  onBlur={save}
                  placeholder="e.g., TD Bank, RBC, Wealthsimple"
                />
                <SelectField
                  label="Account Type"
                  name="accountType"
                  value={account.accountType}
                  onChange={(_, v) => updateAccount(index, "accountType", v)}
                  onBlur={save}
                  options={ACCOUNT_TYPES}
                  placeholder="Select account type"
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={account.phoneNumber}
                  onChange={(_, v) => updateAccount(index, "phoneNumber", v)}
                  onBlur={save}
                  type="tel"
                  placeholder="(XXX) XXX-XXXX"
                />
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={account.accountNumber}
                  onChange={(_, v) =>
                    updateAccount(index, "accountNumber", v)
                  }
                  onBlur={save}
                />
                <TextField
                  label="Interest Rate"
                  name="interestRate"
                  value={account.interestRate}
                  onChange={(_, v) =>
                    updateAccount(index, "interestRate", v)
                  }
                  onBlur={save}
                  placeholder="e.g., 2.5%"
                />
                <CurrencyField
                  label="Average Monthly Activity"
                  name="avgMonthlyActivity"
                  value={account.avgMonthlyActivity}
                  onChange={(_, v) =>
                    updateAccount(index, "avgMonthlyActivity", v)
                  }
                  onBlur={save}
                />
                <CurrencyField
                  label="Available Funds"
                  name="availableFunds"
                  value={account.availableFunds}
                  onChange={(_, v) =>
                    updateAccount(index, "availableFunds", v)
                  }
                  onBlur={save}
                />
                <CurrencyField
                  label="Total Balance"
                  name="totalBalance"
                  value={account.totalBalance}
                  onChange={(_, v) =>
                    updateAccount(index, "totalBalance", v)
                  }
                  onBlur={save}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.accounts.length > 0 && (
        <div className="border-t border-border pt-4 text-right text-xl font-bold text-foreground">
          Total Balance (All Accounts): {formatCurrency(total)}
        </div>
      )}
    </div>
  );
}
