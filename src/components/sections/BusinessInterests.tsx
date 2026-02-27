"use client";

import { useCallback } from "react";
import type { BusinessInterests as BusinessInterestsType, BusinessInterest } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, TextareaField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface BusinessInterestsProps {
  data: BusinessInterestsType;
  onChange: (data: BusinessInterestsType) => void;
}

const BUSINESS_TYPES = [
  { value: "sole-proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "corporation-federal", label: "Corporation (Federal)" },
  { value: "corporation-provincial", label: "Corporation (Provincial)" },
  { value: "numbered-company", label: "Numbered Company" },
  { value: "non-profit", label: "Non-Profit / Society" },
  { value: "rental-property-business", label: "Rental Property Business" },
  { value: "farm-operation", label: "Farm Operation" },
  { value: "other", label: "Other" },
];

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "partner", label: "Partner" },
  { value: "director", label: "Director" },
  { value: "shareholder", label: "Shareholder" },
  { value: "silent-partner", label: "Silent Partner" },
  { value: "other", label: "Other" },
];

function newBusiness(): BusinessInterest {
  return {
    id: crypto.randomUUID(),
    businessName: "",
    businessType: "",
    yourRole: "",
    ownershipPercentage: "",
    bnGstNumber: "",
    corporationNumber: "",
    partners: "",
    accountant: "",
    lawyer: "",
    bankAccount: "",
    corporateRecordsLocation: "",
    buySellAgreement: "",
    shareholderAgreement: "",
    keyEmployees: "",
    notes: "",
  };
}

export default function BusinessInterests({ data, onChange }: BusinessInterestsProps) {
  const save = useCallback(() => {
    saveSection("businessInterests", data);
  }, [data]);

  const update = useCallback(
    (index: number, field: string, value: string) => {
      const businesses = [...data.businesses];
      businesses[index] = { ...businesses[index], [field]: value };
      onChange({ ...data, businesses });
    },
    [data, onChange]
  );

  const add = useCallback(() => {
    onChange({ ...data, businesses: [...data.businesses, newBusiness()] });
  }, [data, onChange]);

  const remove = useCallback(
    (index: number) => {
      const businesses = data.businesses.filter((_, i) => i !== index);
      const updated = { ...data, businesses };
      onChange(updated);
      saveSection("businessInterests", updated);
    },
    [data, onChange]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">Your Businesses</h3>
        <Button onClick={add} variant="outline" size="lg" className="gap-2">
          <Plus className="h-5 w-5" aria-hidden="true" />
          + Add another business
        </Button>
      </div>

      {data.businesses.length === 0 && (
        <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg text-base">
          No businesses? No problem &mdash; most people skip this one.
        </p>
      )}

      <div className="space-y-4">
        {data.businesses.map((biz, index) => (
          <Card key={biz.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  {biz.businessName || `Business ${index + 1}`}
                </span>
                <Button
                  onClick={() => remove(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove business ${biz.businessName || index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="What's the business called?"
                  name="businessName"
                  value={biz.businessName}
                  onChange={(_, v) => update(index, "businessName", v)}
                  onBlur={save}
                />
                <SelectField
                  label="Business Type"
                  name="businessType"
                  value={biz.businessType}
                  onChange={(_, v) => update(index, "businessType", v)}
                  onBlur={save}
                  options={BUSINESS_TYPES}
                  placeholder="Select type..."
                />
                <SelectField
                  label="Your Role"
                  name="yourRole"
                  value={biz.yourRole}
                  onChange={(_, v) => update(index, "yourRole", v)}
                  onBlur={save}
                  options={ROLE_OPTIONS}
                  placeholder="Select role..."
                />
                <TextField
                  label="Ownership Percentage"
                  name="ownershipPercentage"
                  value={biz.ownershipPercentage}
                  onChange={(_, v) => update(index, "ownershipPercentage", v)}
                  onBlur={save}
                  placeholder="e.g., 50%, 33.3%"
                />
                <TextField
                  label="Business Number (BN) / GST Number"
                  name="bnGstNumber"
                  value={biz.bnGstNumber}
                  onChange={(_, v) => update(index, "bnGstNumber", v)}
                  onBlur={save}
                />
                <TextField
                  label="Corporation Number"
                  name="corporationNumber"
                  value={biz.corporationNumber}
                  onChange={(_, v) => update(index, "corporationNumber", v)}
                  onBlur={save}
                  placeholder="If applicable"
                />
                <TextField
                  label="Who else is involved?"
                  name="partners"
                  value={biz.partners}
                  onChange={(_, v) => update(index, "partners", v)}
                  onBlur={save}
                  placeholder="Names and contact info"
                  className="md:col-span-2"
                />
                <TextField
                  label="Accountant Name & Contact"
                  name="accountant"
                  value={biz.accountant}
                  onChange={(_, v) => update(index, "accountant", v)}
                  onBlur={save}
                />
                <TextField
                  label="Lawyer Name & Contact"
                  name="lawyer"
                  value={biz.lawyer}
                  onChange={(_, v) => update(index, "lawyer", v)}
                  onBlur={save}
                />
                <TextField
                  label="Business Bank Account"
                  name="bankAccount"
                  value={biz.bankAccount}
                  onChange={(_, v) => update(index, "bankAccount", v)}
                  onBlur={save}
                  placeholder="Institution + account number"
                />
                <TextField
                  label="Corporate Records / Minute Book Location"
                  name="corporateRecordsLocation"
                  value={biz.corporateRecordsLocation}
                  onChange={(_, v) => update(index, "corporateRecordsLocation", v)}
                  onBlur={save}
                />
                <TextField
                  label="Buy-Sell Agreement"
                  name="buySellAgreement"
                  value={biz.buySellAgreement}
                  onChange={(_, v) => update(index, "buySellAgreement", v)}
                  onBlur={save}
                  placeholder="Yes/No — where is it kept?"
                />
                <TextField
                  label="Shareholder Agreement"
                  name="shareholderAgreement"
                  value={biz.shareholderAgreement}
                  onChange={(_, v) => update(index, "shareholderAgreement", v)}
                  onBlur={save}
                  placeholder="Yes/No — where is it kept?"
                />
                <TextareaField
                  label="Key Employees or People to Notify"
                  name="keyEmployees"
                  value={biz.keyEmployees}
                  onChange={(_, v) => update(index, "keyEmployees", v)}
                  onBlur={save}
                  rows={3}
                  placeholder="Names and contact info of key people"
                />
                <TextareaField
                  label="Notes"
                  name="notes"
                  value={biz.notes}
                  onChange={(_, v) => update(index, "notes", v)}
                  onBlur={save}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
