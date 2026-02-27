"use client";

import { useCallback } from "react";
import type { ImportantContacts as ImportantContactsType } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, TextareaField, SelectField } from "@/components/FormField";

interface ImportantContactsProps {
  data: ImportantContactsType;
  onChange: (data: ImportantContactsType) => void;
}

export default function ImportantContacts({
  data,
  onChange,
}: ImportantContactsProps) {
  const handleChange = useCallback(
    (name: string, value: string) => {
      const updated = { ...data, [name]: value };
      onChange(updated);
    },
    [data, onChange]
  );

  const handleBlur = useCallback(() => {
    saveSection("importantContacts", data);
  }, [data]);

  return (
    <div className="space-y-8">
      {/* Legal & Financial */}
      <section>
        <h3 className="text-sage-700 mb-4">Legal & Financial Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Lawyer's Name"
            name="lawyerName"
            value={data.lawyerName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Lawyer's Contact"
            name="lawyerContact"
            value={data.lawyerContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone, email, or address"
          />
          <TextField
            label="Accountant's Name"
            name="accountantName"
            value={data.accountantName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Accountant's Contact"
            name="accountantContact"
            value={data.accountantContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone, email, or address"
          />
          <TextField
            label="Financial Advisor's Name"
            name="financialAdvisorName"
            value={data.financialAdvisorName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Financial Advisor's Contact"
            name="financialAdvisorContact"
            value={data.financialAdvisorContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone, email, or address"
          />
        </div>
      </section>

      {/* Funeral */}
      <section>
        <h3 className="text-sage-700 mb-4">Funeral Arrangements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Funeral Home"
            name="funeralHome"
            value={data.funeralHome}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <SelectField
            label="Pre-Paid?"
            name="funeralPrePaid"
            value={data.funeralPrePaid}
            onChange={handleChange}
            onBlur={handleBlur}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "partial", label: "Partially" },
              { value: "unknown", label: "Not Sure" },
            ]}
            placeholder="Select..."
          />
          <TextField
            label="Funeral Details / Wishes"
            name="funeralDetails"
            value={data.funeralDetails}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Any specific wishes or arrangements"
            className="md:col-span-2"
          />
        </div>
      </section>

      {/* Will & Estate */}
      <section>
        <h3 className="text-sage-700 mb-4">Will & Estate</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Executor of Will"
            name="executorOfWill"
            value={data.executorOfWill}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Location of Will"
            name="locationOfWill"
            value={data.locationOfWill}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., Lawyer's office, safe at home"
          />
          <TextField
            label="Safety Deposit Box Location"
            name="safetyDepositBoxLocation"
            value={data.safetyDepositBoxLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Bank name and branch"
          />
          <TextField
            label="Safety Deposit Box Key Location"
            name="safetyDepositBoxKeyLocation"
            value={data.safetyDepositBoxKeyLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Where the key is kept"
          />
        </div>
      </section>

      {/* Other notes */}
      <section>
        <h3 className="text-sage-700 mb-4">Other Notes</h3>
        <TextareaField
          label="Anything else your family should know"
          name="otherNotes"
          value={data.otherNotes}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={6}
          placeholder="Passwords, online accounts, special instructions, messages to family..."
        />
      </section>
    </div>
  );
}
