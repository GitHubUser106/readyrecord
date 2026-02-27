"use client";

import { useCallback } from "react";
import type { PersonalInformation } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField } from "@/components/FormField";

interface PersonalInfoProps {
  data: PersonalInformation;
  onChange: (data: PersonalInformation) => void;
}

export default function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const handleChange = useCallback(
    (name: string, value: string) => {
      const updated = { ...data, [name]: value };
      onChange(updated);
    },
    [data, onChange]
  );

  const handleBlur = useCallback(() => {
    saveSection("personalInfo", data);
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Full Legal Name"
          name="fullLegalName"
          value={data.fullLegalName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Margaret Anne Smith"
          className="md:col-span-2"
        />
        <TextField
          label="Address"
          name="address"
          value={data.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="123 Main Street, City, Province, Postal Code"
          className="md:col-span-2"
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
        />
        <TextField
          label="Place of Birth"
          name="placeOfBirth"
          value={data.placeOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Vancouver, BC"
        />
        <TextField
          label="Social Insurance Number (SIN)"
          name="sin"
          value={data.sin}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="XXX-XXX-XXX"
        />
        <TextField
          label="Driver's License Number"
          name="driversLicense"
          value={data.driversLicense}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          label="Mother's Maiden Name"
          name="mothersMaidenName"
          value={data.mothersMaidenName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="border-t border-border pt-6 mt-8">
        <h3 className="mb-4 text-sage-700">Spouse / Partner</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Spouse's Name"
            name="spouseName"
            value={data.spouseName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
          />
          <TextField
            label="Spouse's SIN"
            name="spouseSin"
            value={data.spouseSin}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="XXX-XXX-XXX"
          />
          <TextField
            label="Date of Marriage"
            name="dateOfMarriage"
            value={data.dateOfMarriage}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
          />
          <TextField
            label="Spouse's Date of Birth"
            name="spouseDateOfBirth"
            value={data.spouseDateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
          />
        </div>
      </div>
    </div>
  );
}
