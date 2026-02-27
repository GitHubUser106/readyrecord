"use client";

import { useCallback } from "react";
import type { ImportantContacts as ImportantContactsType, CloseFriend } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, TextareaField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface ImportantContactsProps {
  data: ImportantContactsType;
  onChange: (data: ImportantContactsType) => void;
}

function newFriend(): CloseFriend {
  return {
    id: crypto.randomUUID(),
    name: "",
    phone: "",
    email: "",
  };
}

export default function ImportantContacts({
  data,
  onChange,
}: ImportantContactsProps) {
  // Flat field handlers
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

  // Close friends handlers
  const addFriend = useCallback(() => {
    onChange({ ...data, closeFriends: [...data.closeFriends, newFriend()] });
  }, [data, onChange]);

  const updateFriend = useCallback(
    (index: number, field: string, value: string) => {
      const friends = [...data.closeFriends];
      friends[index] = { ...friends[index], [field]: value };
      onChange({ ...data, closeFriends: friends });
    },
    [data, onChange]
  );

  const removeFriend = useCallback(
    (index: number) => {
      const friends = data.closeFriends.filter((_, i) => i !== index);
      const updated = { ...data, closeFriends: friends };
      onChange(updated);
      saveSection("importantContacts", updated);
    },
    [data, onChange]
  );

  return (
    <div className="space-y-8">
      {/* Legal & Financial */}
      <section>
        <h3 className="text-sage-700 mb-4">Your Legal & Financial People</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Your lawyer's name"
            name="lawyerName"
            value={data.lawyerName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Their contact info"
            name="lawyerContact"
            value={data.lawyerContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone, email, or address"
          />
          <TextField
            label="Your accountant's name"
            name="accountantName"
            value={data.accountantName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Their contact info"
            name="accountantContact"
            value={data.accountantContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone, email, or address"
          />
          <TextField
            label="Your financial advisor's name"
            name="financialAdvisorName"
            value={data.financialAdvisorName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Their contact info"
            name="financialAdvisorContact"
            value={data.financialAdvisorContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone, email, or address"
          />
        </div>
      </section>

      {/* Clergy / Spiritual Advisor */}
      <section>
        <h3 className="text-sage-700 mb-4">Clergy / Spiritual Advisor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Name"
            name="clergyName"
            value={data.clergyName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Contact"
            name="clergyContact"
            value={data.clergyContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone, email, or church/parish"
          />
        </div>
      </section>

      {/* Employer & Work */}
      <section>
        <h3 className="text-sage-700 mb-4">Employer & Work Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Employer Contact"
            name="employerContact"
            value={data.employerContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="HR department or manager, if still working"
          />
          <TextField
            label="Pension Plan Administrator"
            name="pensionPlanAdministrator"
            value={data.pensionPlanAdministrator}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Name and contact for employer pension"
          />
          <TextField
            label="Union Representative"
            name="unionRepresentative"
            value={data.unionRepresentative}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Union name, local number, contact"
          />
          <TextField
            label="Veterans Affairs Contact"
            name="veteransAffairsContact"
            value={data.veteransAffairsContact}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="If applicable"
          />
        </div>
      </section>

      {/* Government & Pension */}
      <section>
        <h3 className="text-sage-700 mb-4">Government & Pension</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Service Canada Reference #"
            name="serviceCanadaNumber"
            value={data.serviceCanadaNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="For CPP, OAS, GIS inquiries"
          />
          <TextField
            label="Veterans Affairs #"
            name="veteransAffairsNumber"
            value={data.veteransAffairsNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="If applicable"
          />
          <TextField
            label="Union Local / Contact"
            name="unionLocal"
            value={data.unionLocal}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Union name, local number, contact"
          />
          <TextField
            label="Pension Administrator"
            name="pensionAdministrator"
            value={data.pensionAdministrator}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Name and contact for employer pension"
          />
          <SelectField
            label="CRA My Account — Set Up?"
            name="craMyAccountSetUp"
            value={data.craMyAccountSetUp}
            onChange={handleChange}
            onBlur={handleBlur}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "unknown", label: "Not Sure" },
            ]}
            placeholder="Select..."
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

      {/* Will & Estate + Legal Documents */}
      <section>
        <h3 className="text-sage-700 mb-4">Will, Estate & Legal Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Who's your executor?"
            name="executorOfWill"
            value={data.executorOfWill}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            label="Where's your will kept?"
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
          <TextField
            label="Power of Attorney — Who Holds It?"
            name="poaName"
            value={data.poaName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Name of person with POA"
          />
          <TextField
            label="Power of Attorney — Document Location"
            name="poaDocumentLocation"
            value={data.poaDocumentLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Where is the POA document kept?"
          />
          <TextField
            label="Representation Agreement (BC)"
            name="representationAgreement"
            value={data.representationAgreement}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="For health care decisions — where is it kept?"
          />
          <TextField
            label="Advanced Directive / Living Will"
            name="advancedDirectiveLocation"
            value={data.advancedDirectiveLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Where is the document kept?"
          />
        </div>
      </section>

      {/* Close Friends to Notify */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sage-700">Close Friends & Family to Notify</h3>
          <Button onClick={addFriend} variant="outline" size="lg" className="gap-2">
            <Plus className="h-5 w-5" aria-hidden="true" />
            + Add another friend
          </Button>
        </div>

        {data.closeFriends.length === 0 && (
          <p className="text-muted-foreground text-center py-6 bg-muted/30 rounded-lg text-base">
            Who should your family call? Add close friends and family members here.
          </p>
        )}

        <div className="space-y-4">
          {data.closeFriends.map((friend, index) => (
            <Card key={friend.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-lg">
                    {friend.name || `Friend ${index + 1}`}
                  </span>
                  <Button
                    onClick={() => removeFriend(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label={`Remove friend ${friend.name || index + 1}`}
                  >
                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TextField
                    label="Name"
                    name="name"
                    value={friend.name}
                    onChange={(_, v) => updateFriend(index, "name", v)}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={friend.phone}
                    onChange={(_, v) => updateFriend(index, "phone", v)}
                    onBlur={handleBlur}
                    type="tel"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={friend.email}
                    onChange={(_, v) => updateFriend(index, "email", v)}
                    onBlur={handleBlur}
                    type="email"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
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
