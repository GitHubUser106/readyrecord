"use client";

import { useCallback } from "react";
import type { PhysicalAssets as PhysicalAssetsType, PhysicalAsset } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField, SelectField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/lib/calculations";

interface PhysicalAssetsProps {
  data: PhysicalAssetsType;
  onChange: (data: PhysicalAssetsType) => void;
}

const ASSET_CATEGORIES = [
  { value: "vehicle", label: "Vehicle (car, truck, motorcycle, RV, boat, snowmobile)" },
  { value: "precious-metals", label: "Precious Metals (gold, silver, platinum)" },
  { value: "art-collectibles", label: "Art & Collectibles" },
  { value: "jewelry-watches", label: "Jewelry & Watches" },
  { value: "firearms", label: "Firearms" },
  { value: "electronics", label: "Electronics & Equipment" },
  { value: "musical-instruments", label: "Musical Instruments" },
  { value: "furniture-heirlooms", label: "Furniture & Heirlooms" },
  { value: "tools", label: "Tools & Workshop Equipment" },
  { value: "wine-spirits", label: "Wine / Spirits Collection" },
  { value: "other", label: "Other Valuables" },
];

function newAsset(): PhysicalAsset {
  return {
    id: crypto.randomUUID(),
    description: "",
    category: "",
    location: "",
    approximateValue: "",
    intendedRecipient: "",
    notes: "",
    photoReference: "",
    vehicleYearMakeModel: "",
    vehicleVin: "",
    vehicleLicensePlate: "",
    vehicleRegistrationLocation: "",
    vehicleLienHolder: "",
    vehicleKeysLocation: "",
    vehicleRegistrationPinkSlipLocation: "",
    firearmsPalRpalNumber: "",
  };
}

export default function PhysicalAssets({ data, onChange }: PhysicalAssetsProps) {
  const save = useCallback(() => {
    saveSection("physicalAssets", data);
  }, [data]);

  const update = useCallback(
    (index: number, field: string, value: string) => {
      const assets = [...data.assets];
      assets[index] = { ...assets[index], [field]: value };
      onChange({ ...data, assets });
    },
    [data, onChange]
  );

  const add = useCallback(() => {
    onChange({ ...data, assets: [...data.assets, newAsset()] });
  }, [data, onChange]);

  const remove = useCallback(
    (index: number) => {
      const assets = data.assets.filter((_, i) => i !== index);
      const updated = { ...data, assets };
      onChange(updated);
      saveSection("physicalAssets", updated);
    },
    [data, onChange]
  );

  const total = data.assets.reduce(
    (sum, a) => sum + parseCurrency(a.approximateValue),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">Your Valuables</h3>
        <Button onClick={add} variant="outline" size="lg" className="gap-2">
          <Plus className="h-5 w-5" aria-hidden="true" />
          + Add another item
        </Button>
      </div>

      {data.assets.length === 0 && (
        <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg text-base">
          Nothing to list here? That&apos;s okay &mdash; add vehicles, jewelry, or other valuables when you&apos;re ready.
        </p>
      )}

      <div className="space-y-4">
        {data.assets.map((asset, index) => (
          <Card key={asset.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  {asset.description || `Item ${index + 1}`}
                </span>
                <Button
                  onClick={() => remove(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove item ${asset.description || index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="What is it?"
                  name="description"
                  value={asset.description}
                  onChange={(_, v) => update(index, "description", v)}
                  onBlur={save}
                  placeholder="e.g., 2019 Toyota Camry, Grandmother's ring"
                />
                <SelectField
                  label="Category"
                  name="category"
                  value={asset.category}
                  onChange={(_, v) => update(index, "category", v)}
                  onBlur={save}
                  options={ASSET_CATEGORIES}
                  placeholder="Select category..."
                />
                <TextField
                  label="Where is it kept?"
                  name="location"
                  value={asset.location}
                  onChange={(_, v) => update(index, "location", v)}
                  onBlur={save}
                  placeholder="e.g., Home garage, safety deposit box"
                />
                <CurrencyField
                  label="Roughly what's it worth?"
                  name="approximateValue"
                  value={asset.approximateValue}
                  onChange={(_, v) => update(index, "approximateValue", v)}
                  onBlur={save}
                />
                <TextField
                  label="Who should get this?"
                  name="intendedRecipient"
                  value={asset.intendedRecipient}
                  onChange={(_, v) => update(index, "intendedRecipient", v)}
                  onBlur={save}
                  placeholder="Who should receive this?"
                />
                <TextField
                  label="Where's a photo of it?"
                  name="photoReference"
                  value={asset.photoReference}
                  onChange={(_, v) => update(index, "photoReference", v)}
                  onBlur={save}
                  placeholder="e.g., Photo in blue album, filing cabinet drawer 3"
                />
                <TextField
                  label="Notes"
                  name="notes"
                  value={asset.notes}
                  onChange={(_, v) => update(index, "notes", v)}
                  onBlur={save}
                  placeholder="Provenance, appraisal date, serial numbers..."
                  className="md:col-span-2"
                />
              </div>

              {/* Vehicle-specific fields */}
              {asset.category === "vehicle" && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-base text-sage-700 mb-4">
                    Vehicle Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      label="Year / Make / Model"
                      name="vehicleYearMakeModel"
                      value={asset.vehicleYearMakeModel}
                      onChange={(_, v) => update(index, "vehicleYearMakeModel", v)}
                      onBlur={save}
                      placeholder="e.g., 2019 Toyota Camry LE"
                    />
                    <TextField
                      label="VIN"
                      name="vehicleVin"
                      value={asset.vehicleVin}
                      onChange={(_, v) => update(index, "vehicleVin", v)}
                      onBlur={save}
                      placeholder="Vehicle Identification Number"
                    />
                    <TextField
                      label="License Plate"
                      name="vehicleLicensePlate"
                      value={asset.vehicleLicensePlate}
                      onChange={(_, v) => update(index, "vehicleLicensePlate", v)}
                      onBlur={save}
                    />
                    <TextField
                      label="Registration Location"
                      name="vehicleRegistrationLocation"
                      value={asset.vehicleRegistrationLocation}
                      onChange={(_, v) => update(index, "vehicleRegistrationLocation", v)}
                      onBlur={save}
                      placeholder="Province / territory of registration"
                    />
                    <TextField
                      label="Lien Holder"
                      name="vehicleLienHolder"
                      value={asset.vehicleLienHolder}
                      onChange={(_, v) => update(index, "vehicleLienHolder", v)}
                      onBlur={save}
                      placeholder="If financed or leased"
                    />
                    <TextField
                      label="Where Are the Keys?"
                      name="vehicleKeysLocation"
                      value={asset.vehicleKeysLocation}
                      onChange={(_, v) => update(index, "vehicleKeysLocation", v)}
                      onBlur={save}
                      placeholder="Location of all sets of keys"
                    />
                    <TextField
                      label="Registration / Pink Slip Location"
                      name="vehicleRegistrationPinkSlipLocation"
                      value={asset.vehicleRegistrationPinkSlipLocation}
                      onChange={(_, v) => update(index, "vehicleRegistrationPinkSlipLocation", v)}
                      onBlur={save}
                      placeholder="Where is the ownership document?"
                      className="md:col-span-2"
                    />
                  </div>
                </div>
              )}

              {/* Firearms-specific field */}
              {asset.category === "firearms" && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-base text-sage-700 mb-4">
                    Firearms Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      label="PAL / RPAL License Number"
                      name="firearmsPalRpalNumber"
                      value={asset.firearmsPalRpalNumber}
                      onChange={(_, v) => update(index, "firearmsPalRpalNumber", v)}
                      onBlur={save}
                      placeholder="Possession and Acquisition Licence #"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {data.assets.length > 0 && (
        <div className="border-t border-border pt-4 text-right text-xl font-bold text-foreground">
          Total Estimated Value: {formatCurrency(total)}
        </div>
      )}
    </div>
  );
}
