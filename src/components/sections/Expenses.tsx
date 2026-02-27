"use client";

import { useCallback } from "react";
import type { Expenses as ExpensesType, MonthlyExpense } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/lib/calculations";

interface ExpensesProps {
  data: ExpensesType;
  onChange: (data: ExpensesType) => void;
}

const PAYMENT_TYPES = [
  { value: "pre-authorized", label: "Pre-Authorized" },
  { value: "post-dated-cheque", label: "Post-Dated Cheque" },
  { value: "cash", label: "Cash" },
  { value: "credit-card", label: "Credit Card" },
  { value: "online-banking", label: "Online Banking" },
  { value: "e-transfer", label: "E-Transfer" },
  { value: "other", label: "Other" },
];

function newExpense(): MonthlyExpense {
  return {
    id: crypto.randomUUID(),
    companyName: "",
    paymentType: "",
    contactInfo: "",
    description: "",
    paymentDayOfMonth: "",
    accountNumber: "",
    notes: "",
    monthlyAmount: "",
  };
}

export default function Expenses({ data, onChange }: ExpensesProps) {
  const save = useCallback(() => {
    saveSection("expenses", data);
  }, [data]);

  const update = useCallback(
    (index: number, field: string, value: string) => {
      const expenses = [...data.expenses];
      expenses[index] = { ...expenses[index], [field]: value };
      onChange({ ...data, expenses });
    },
    [data, onChange]
  );

  const add = useCallback(() => {
    onChange({ ...data, expenses: [...data.expenses, newExpense()] });
  }, [data, onChange]);

  const remove = useCallback(
    (index: number) => {
      const expenses = data.expenses.filter((_, i) => i !== index);
      const updated = { ...data, expenses };
      onChange(updated);
      saveSection("expenses", updated);
    },
    [data, onChange]
  );

  const total = data.expenses.reduce(
    (sum, e) => sum + parseCurrency(e.monthlyAmount),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">Monthly Expenses & Bills</h3>
        <Button onClick={add} variant="outline" size="lg" className="gap-2">
          <Plus className="h-5 w-5" aria-hidden="true" />
          Add Expense
        </Button>
      </div>

      <p className="text-muted-foreground text-base">
        We&rsquo;ve pre-filled some common expenses to get you started. Feel
        free to edit, remove, or add your own.
      </p>

      {data.expenses.length === 0 && (
        <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg">
          No expenses listed. Click &ldquo;Add Expense&rdquo; to get started.
        </p>
      )}

      <div className="space-y-4">
        {data.expenses.map((expense, index) => (
          <Card key={expense.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  {expense.description || `Expense ${index + 1}`}
                  {expense.companyName && ` — ${expense.companyName}`}
                </span>
                <Button
                  onClick={() => remove(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove expense ${expense.description || index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="What It's For"
                  name="description"
                  value={expense.description}
                  onChange={(_, v) => update(index, "description", v)}
                  onBlur={save}
                  placeholder="e.g., Telephone, Internet, Hydro"
                />
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={expense.companyName}
                  onChange={(_, v) => update(index, "companyName", v)}
                  onBlur={save}
                  placeholder="e.g., Telus, BC Hydro"
                />
                <SelectField
                  label="Payment Type"
                  name="paymentType"
                  value={expense.paymentType}
                  onChange={(_, v) => update(index, "paymentType", v)}
                  onBlur={save}
                  options={PAYMENT_TYPES}
                  placeholder="How do you pay?"
                />
                <TextField
                  label="Contact Info"
                  name="contactInfo"
                  value={expense.contactInfo}
                  onChange={(_, v) => update(index, "contactInfo", v)}
                  onBlur={save}
                  placeholder="Phone or website"
                />
                <TextField
                  label="Payment Day of Month"
                  name="paymentDayOfMonth"
                  value={expense.paymentDayOfMonth}
                  onChange={(_, v) => update(index, "paymentDayOfMonth", v)}
                  onBlur={save}
                  placeholder="e.g., 1st, 15th"
                />
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={expense.accountNumber}
                  onChange={(_, v) => update(index, "accountNumber", v)}
                  onBlur={save}
                />
                <CurrencyField
                  label="Monthly Amount"
                  name="monthlyAmount"
                  value={expense.monthlyAmount}
                  onChange={(_, v) => update(index, "monthlyAmount", v)}
                  onBlur={save}
                />
                <TextField
                  label="Notes"
                  name="notes"
                  value={expense.notes}
                  onChange={(_, v) => update(index, "notes", v)}
                  onBlur={save}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.expenses.length > 0 && (
        <div className="border-t border-border pt-4 text-right text-xl font-bold text-foreground">
          Total Monthly Expenses: {formatCurrency(total)}
        </div>
      )}
    </div>
  );
}
