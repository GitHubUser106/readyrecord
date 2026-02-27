"use client";

import { useCallback } from "react";
import type { DigitalAccounts as DigitalAccountsType, DigitalAccount } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, AlertTriangle } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/lib/calculations";

interface DigitalAccountsProps {
  data: DigitalAccountsType;
  onChange: (data: DigitalAccountsType) => void;
}

const ACCOUNT_CATEGORIES = [
  { value: "email", label: "Email (Gmail, Outlook, Yahoo)" },
  { value: "social-media", label: "Social Media (Facebook, Instagram, LinkedIn)" },
  { value: "banking-financial", label: "Banking / Financial" },
  { value: "streaming", label: "Streaming (Netflix, Disney+, Spotify)" },
  { value: "shopping", label: "Shopping (Amazon, etc.)" },
  { value: "cloud-storage", label: "Cloud Storage (Google Drive, Dropbox, iCloud)" },
  { value: "utility-account", label: "Utility Account (BC Hydro, Telus MyAccount)" },
  { value: "government", label: "Government (CRA My Account, My Service Canada)" },
  { value: "other", label: "Other" },
];

const AUTO_PAYMENT_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const ACTION_OPTIONS = [
  { value: "cancel", label: "Cancel" },
  { value: "transfer", label: "Transfer to Family" },
  { value: "keep", label: "Keep Active" },
  { value: "memorialize", label: "Memorialize" },
];

function newAccount(): DigitalAccount {
  return {
    id: crypto.randomUUID(),
    serviceName: "",
    category: "",
    usernameEmail: "",
    passwordHint: "",
    autoPayment: "",
    monthlyCost: "",
    actionNeeded: "",
    notes: "",
  };
}

export default function DigitalAccounts({ data, onChange }: DigitalAccountsProps) {
  const save = useCallback(() => {
    saveSection("digitalAccounts", data);
  }, [data]);

  const update = useCallback(
    (index: number, field: string, value: string) => {
      const accounts = [...data.accounts];
      accounts[index] = { ...accounts[index], [field]: value };
      onChange({ ...data, accounts });
    },
    [data, onChange]
  );

  const add = useCallback(() => {
    onChange({ ...data, accounts: [...data.accounts, newAccount()] });
  }, [data, onChange]);

  const remove = useCallback(
    (index: number) => {
      const accounts = data.accounts.filter((_, i) => i !== index);
      const updated = { ...data, accounts };
      onChange(updated);
      saveSection("digitalAccounts", updated);
    },
    [data, onChange]
  );

  const total = data.accounts.reduce(
    (sum, a) => sum + parseCurrency(a.monthlyCost),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">Your Online Accounts</h3>
        <Button onClick={add} variant="outline" size="lg" className="gap-2">
          <Plus className="h-5 w-5" aria-hidden="true" />
          + Add another account
        </Button>
      </div>

      {/* Security warning */}
      <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-amber-800">
          <strong>Never store actual passwords here.</strong> Use only hints that would help
          your family access accounts with the help of your password manager
          (e.g., &ldquo;usual password + year of marriage&rdquo; or &ldquo;in the blue notebook&rdquo;).
        </p>
      </div>

      {data.accounts.length === 0 && (
        <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg text-base">
          No accounts here yet &mdash; add email, social media, streaming, or other online accounts when you&apos;re ready.
        </p>
      )}

      <div className="space-y-4">
        {data.accounts.map((acct, index) => (
          <Card key={acct.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  {acct.serviceName || `Account ${index + 1}`}
                </span>
                <Button
                  onClick={() => remove(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove account ${acct.serviceName || index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="What's the service?"
                  name="serviceName"
                  value={acct.serviceName}
                  onChange={(_, v) => update(index, "serviceName", v)}
                  onBlur={save}
                  placeholder="e.g., Gmail, Netflix, Amazon"
                />
                <SelectField
                  label="Category"
                  name="category"
                  value={acct.category}
                  onChange={(_, v) => update(index, "category", v)}
                  onBlur={save}
                  options={ACCOUNT_CATEGORIES}
                  placeholder="Select category..."
                />
                <TextField
                  label="Your login email or username"
                  name="usernameEmail"
                  value={acct.usernameEmail}
                  onChange={(_, v) => update(index, "usernameEmail", v)}
                  onBlur={save}
                  placeholder="The login email or username"
                />
                <TextField
                  label="Password hint (NOT the password!)"
                  name="passwordHint"
                  value={acct.passwordHint}
                  onChange={(_, v) => update(index, "passwordHint", v)}
                  onBlur={save}
                  placeholder="NOT the password — just a hint"
                />
                <SelectField
                  label="Auto-Payment Set Up?"
                  name="autoPayment"
                  value={acct.autoPayment}
                  onChange={(_, v) => update(index, "autoPayment", v)}
                  onBlur={save}
                  options={AUTO_PAYMENT_OPTIONS}
                  placeholder="Select..."
                />
                <CurrencyField
                  label="How much per month?"
                  name="monthlyCost"
                  value={acct.monthlyCost}
                  onChange={(_, v) => update(index, "monthlyCost", v)}
                  onBlur={save}
                />
                <SelectField
                  label="What should your family do with this?"
                  name="actionNeeded"
                  value={acct.actionNeeded}
                  onChange={(_, v) => update(index, "actionNeeded", v)}
                  onBlur={save}
                  options={ACTION_OPTIONS}
                  placeholder="What should family do?"
                />
                <TextField
                  label="Notes"
                  name="notes"
                  value={acct.notes}
                  onChange={(_, v) => update(index, "notes", v)}
                  onBlur={save}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.accounts.length > 0 && (
        <div className="border-t border-border pt-4 text-right text-xl font-bold text-foreground">
          Total Monthly Subscriptions: {formatCurrency(total)}
        </div>
      )}
    </div>
  );
}
