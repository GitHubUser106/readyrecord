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
          label="What's your full legal name?"
          name="fullLegalName"
          value={data.fullLegalName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Margaret Anne Smith"
          className="md:col-span-2"
        />
        <TextField
          label="Where do you live?"
          name="address"
          value={data.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="123 Main Street, City, Province, Postal Code"
          className="md:col-span-2"
        />
        <TextField
          label="When were you born?"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
        />
        <TextField
          label="Where were you born?"
          name="placeOfBirth"
          value={data.placeOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., Vancouver, BC"
        />
        <TextField
          label="What's your SIN?"
          name="sin"
          value={data.sin}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="XXX-XXX-XXX"
        />
        <TextField
          label="Driver's license number"
          name="driversLicense"
          value={data.driversLicense}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          label="Mother's maiden name"
          name="mothersMaidenName"
          value={data.mothersMaidenName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="border-t border-border pt-6 mt-8">
        <h3 className="mb-4 text-sage-700">Your Spouse or Partner</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Their full name"
            name="spouseName"
            value={data.spouseName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
          />
          <TextField
            label="Their SIN"
            name="spouseSin"
            value={data.spouseSin}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="XXX-XXX-XXX"
          />
          <TextField
            label="When did you get married?"
            name="dateOfMarriage"
            value={data.dateOfMarriage}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
          />
          <TextField
            label="Their date of birth"
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
