"use client";

import { useCallback } from "react";
import type { Insurance as InsuranceType, InsurancePolicy } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface InsuranceProps {
  data: InsuranceType;
  onChange: (data: InsuranceType) => void;
}

type InsuranceCategory = keyof InsuranceType;

const CATEGORIES: { key: InsuranceCategory; label: string; showBeneficiary: boolean }[] = [
  { key: "automobile", label: "Automobile Insurance", showBeneficiary: false },
  { key: "homeowners", label: "Homeowner's / Renter's Insurance", showBeneficiary: false },
  { key: "life", label: "Life Insurance (General)", showBeneficiary: true },
  { key: "termLife", label: "Term Life Insurance", showBeneficiary: true },
  { key: "wholeLife", label: "Whole Life Insurance", showBeneficiary: true },
  { key: "criticalIllness", label: "Critical Illness Insurance", showBeneficiary: true },
  { key: "disability", label: "Disability Insurance", showBeneficiary: false },
  { key: "extendedHealth", label: "Extended Health / Dental", showBeneficiary: false },
  { key: "travel", label: "Travel Insurance", showBeneficiary: false },
  { key: "longTermCare", label: "Long-Term Care Insurance", showBeneficiary: false },
  { key: "mortgage", label: "Mortgage Insurance (CMHC)", showBeneficiary: false },
  { key: "pet", label: "Pet Insurance", showBeneficiary: false },
  { key: "other", label: "Other Insurance", showBeneficiary: false },
];

function newPolicy(): InsurancePolicy {
  return {
    id: crypto.randomUUID(),
    provider: "",
    policyNumber: "",
    contactInfo: "",
    coverageDetails: "",
    premium: "",
    beneficiary: "",
  };
}

function InsuranceCategorySection({
  category,
  label,
  showBeneficiary,
  policies,
  onUpdate,
  onAdd,
  onRemove,
  onSave,
}: {
  category: InsuranceCategory;
  label: string;
  showBeneficiary: boolean;
  policies: InsurancePolicy[];
  onUpdate: (cat: InsuranceCategory, index: number, field: string, value: string) => void;
  onAdd: (cat: InsuranceCategory) => void;
  onRemove: (cat: InsuranceCategory, index: number) => void;
  onSave: () => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">{label}</h3>
        <Button
          onClick={() => onAdd(category)}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          + Add another policy
        </Button>
      </div>

      {policies.length === 0 && (
        <p className="text-muted-foreground text-center py-6 bg-muted/30 rounded-lg text-base">
          No policies here yet &mdash; add one if you have {label.toLowerCase()}.
        </p>
      )}

      <div className="space-y-4">
        {policies.map((policy, index) => (
          <Card key={policy.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  Policy {index + 1}
                  {policy.provider && ` — ${policy.provider}`}
                </span>
                <Button
                  onClick={() => onRemove(category, index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove ${label} policy ${index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Who's the insurance with?"
                  name="provider"
                  value={policy.provider}
                  onChange={(_, v) => onUpdate(category, index, "provider", v)}
                  onBlur={onSave}
                  placeholder="e.g., Sun Life, Manulife"
                />
                <TextField
                  label="Policy Number"
                  name="policyNumber"
                  value={policy.policyNumber}
                  onChange={(_, v) => onUpdate(category, index, "policyNumber", v)}
                  onBlur={onSave}
                />
                <TextField
                  label="Contact Info"
                  name="contactInfo"
                  value={policy.contactInfo}
                  onChange={(_, v) => onUpdate(category, index, "contactInfo", v)}
                  onBlur={onSave}
                  placeholder="Phone or email"
                />
                <CurrencyField
                  label="How much is the premium?"
                  name="premium"
                  value={policy.premium}
                  onChange={(_, v) => onUpdate(category, index, "premium", v)}
                  onBlur={onSave}
                />
                <TextField
                  label="Coverage Details"
                  name="coverageDetails"
                  value={policy.coverageDetails}
                  onChange={(_, v) => onUpdate(category, index, "coverageDetails", v)}
                  onBlur={onSave}
                  className="md:col-span-2"
                />
                {showBeneficiary && (
                  <TextField
                    label="Beneficiary"
                    name="beneficiary"
                    value={policy.beneficiary || ""}
                    onChange={(_, v) => onUpdate(category, index, "beneficiary", v)}
                    onBlur={onSave}
                    className="md:col-span-2"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function Insurance({ data, onChange }: InsuranceProps) {
  const save = useCallback(() => {
    saveSection("insurance", data);
  }, [data]);

  const update = useCallback(
    (cat: InsuranceCategory, index: number, field: string, value: string) => {
      const policies = [...data[cat]];
      policies[index] = { ...policies[index], [field]: value };
      onChange({ ...data, [cat]: policies });
    },
    [data, onChange]
  );

  const add = useCallback(
    (cat: InsuranceCategory) => {
      onChange({ ...data, [cat]: [...data[cat], newPolicy()] });
    },
    [data, onChange]
  );

  const remove = useCallback(
    (cat: InsuranceCategory, index: number) => {
      const policies = data[cat].filter((_, i) => i !== index);
      const updated = { ...data, [cat]: policies };
      onChange(updated);
      saveSection("insurance", updated);
    },
    [data, onChange]
  );

  return (
    <div className="space-y-8">
      {CATEGORIES.map(({ key, label, showBeneficiary }) => (
        <InsuranceCategorySection
          key={key}
          category={key}
          label={label}
          showBeneficiary={showBeneficiary}
          policies={data[key]}
          onUpdate={update}
          onAdd={add}
          onRemove={remove}
          onSave={save}
        />
      ))}
    </div>
  );
}
