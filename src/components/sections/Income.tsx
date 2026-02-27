"use client";

import { useCallback } from "react";
import type { Income as IncomeType, IncomeSource } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/lib/calculations";

interface IncomeProps {
  data: IncomeType;
  onChange: (data: IncomeType) => void;
}

const INCOME_TYPES = [
  { value: "cpp", label: "CPP (Canada Pension Plan)" },
  { value: "cpp-disability", label: "CPP Disability Benefit" },
  { value: "oas", label: "OAS (Old Age Security)" },
  { value: "gis", label: "GIS (Guaranteed Income Supplement)" },
  { value: "allowance", label: "Allowance / Allowance for Survivor" },
  { value: "dbpp", label: "Employer Pension — DBPP (Defined Benefit)" },
  { value: "dcpp", label: "Employer Pension — DCPP (Defined Contribution)" },
  { value: "rrif", label: "RRIF Withdrawal" },
  { value: "lif", label: "LIF Withdrawal (Locked-In Fund)" },
  { value: "lrif", label: "LRIF Withdrawal" },
  { value: "annuity", label: "Annuity" },
  { value: "investment", label: "Investment Income (Dividends, Interest)" },
  { value: "rental", label: "Rental Income" },
  { value: "employment", label: "Employment Income" },
  { value: "self-employment", label: "Self-Employment Income" },
  { value: "workers-comp", label: "Workers' Compensation (WSIB / WCB)" },
  { value: "veterans", label: "Veterans Affairs Disability Pension" },
  { value: "private-disability", label: "Private Disability Insurance" },
  { value: "trust", label: "Trust Income" },
  { value: "support", label: "Spousal / Child Support" },
  { value: "other", label: "Other" },
];

function newSource(): IncomeSource {
  return {
    id: crypto.randomUUID(),
    companyOrSource: "",
    type: "",
    originalPaymentAmount: "",
    notes: "",
    paymentDayOfMonth: "",
    policyReferenceNumber: "",
    monthlyPaymentAmount: "",
    splitWithSpouse: "",
  };
}

export default function Income({ data, onChange }: IncomeProps) {
  const save = useCallback(() => {
    saveSection("income", data);
  }, [data]);

  const update = useCallback(
    (index: number, field: string, value: string) => {
      const sources = [...data.sources];
      sources[index] = { ...sources[index], [field]: value };
      onChange({ ...data, sources });
    },
    [data, onChange]
  );

  const add = useCallback(() => {
    onChange({ ...data, sources: [...data.sources, newSource()] });
  }, [data, onChange]);

  const remove = useCallback(
    (index: number) => {
      const sources = data.sources.filter((_, i) => i !== index);
      const updated = { ...data, sources };
      onChange(updated);
      saveSection("income", updated);
    },
    [data, onChange]
  );

  const total = data.sources.reduce(
    (sum, s) => sum + parseCurrency(s.monthlyPaymentAmount),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">Income Sources</h3>
        <Button onClick={add} variant="outline" size="lg" className="gap-2">
          <Plus className="h-5 w-5" aria-hidden="true" />
          Add Income Source
        </Button>
      </div>

      {data.sources.length === 0 && (
        <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg">
          No income sources added yet. Click &ldquo;Add Income Source&rdquo; to
          get started.
        </p>
      )}

      <div className="space-y-4">
        {data.sources.map((source, index) => (
          <Card key={source.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  Source {index + 1}
                  {source.companyOrSource && ` — ${source.companyOrSource}`}
                </span>
                <Button
                  onClick={() => remove(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove income source ${index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Company / Source"
                  name="companyOrSource"
                  value={source.companyOrSource}
                  onChange={(_, v) => update(index, "companyOrSource", v)}
                  onBlur={save}
                  placeholder="e.g., Service Canada, Sun Life"
                />
                <SelectField
                  label="Income Type"
                  name="type"
                  value={source.type}
                  onChange={(_, v) => update(index, "type", v)}
                  onBlur={save}
                  options={INCOME_TYPES}
                  placeholder="Select type"
                />
                <CurrencyField
                  label="Original Payment Amount"
                  name="originalPaymentAmount"
                  value={source.originalPaymentAmount}
                  onChange={(_, v) => update(index, "originalPaymentAmount", v)}
                  onBlur={save}
                />
                <TextField
                  label="Payment Day of Month"
                  name="paymentDayOfMonth"
                  value={source.paymentDayOfMonth}
                  onChange={(_, v) => update(index, "paymentDayOfMonth", v)}
                  onBlur={save}
                  placeholder="e.g., 1st, 15th"
                />
                <TextField
                  label="Policy / Reference Number"
                  name="policyReferenceNumber"
                  value={source.policyReferenceNumber}
                  onChange={(_, v) => update(index, "policyReferenceNumber", v)}
                  onBlur={save}
                />
                <CurrencyField
                  label="Monthly Payment Amount"
                  name="monthlyPaymentAmount"
                  value={source.monthlyPaymentAmount}
                  onChange={(_, v) => update(index, "monthlyPaymentAmount", v)}
                  onBlur={save}
                />
                <SelectField
                  label="Split with Spouse?"
                  name="splitWithSpouse"
                  value={source.splitWithSpouse}
                  onChange={(_, v) => update(index, "splitWithSpouse", v)}
                  onBlur={save}
                  options={[
                    { value: "no", label: "No" },
                    { value: "yes", label: "Yes — Income is split" },
                  ]}
                  placeholder="Select..."
                />
                <TextField
                  label="Notes"
                  name="notes"
                  value={source.notes}
                  onChange={(_, v) => update(index, "notes", v)}
                  onBlur={save}
                  className="md:col-span-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.sources.length > 0 && (
        <div className="border-t border-border pt-4 text-right text-xl font-bold text-foreground">
          Total Monthly Income: {formatCurrency(total)}
        </div>
      )}
    </div>
  );
}
