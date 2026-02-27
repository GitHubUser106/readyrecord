"use client";

import { useCallback } from "react";
import type { RealEstate as RealEstateType, RealEstateProperty } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/lib/calculations";

interface RealEstateProps {
  data: RealEstateType;
  onChange: (data: RealEstateType) => void;
}

function newProperty(): RealEstateProperty {
  return {
    id: crypto.randomUUID(),
    propertyName: "",
    address: "",
    purchaseDate: "",
    realEstateAgent: "",
    mortgageLender: "",
    propertyRollNumber: "",
    mortgageBalance: "",
    approximateValue: "",
  };
}

export default function RealEstate({ data, onChange }: RealEstateProps) {
  const save = useCallback(() => {
    saveSection("realEstate", data);
  }, [data]);

  const update = useCallback(
    (index: number, field: string, value: string) => {
      const properties = [...data.properties];
      properties[index] = { ...properties[index], [field]: value };
      onChange({ ...data, properties });
    },
    [data, onChange]
  );

  const add = useCallback(() => {
    onChange({ ...data, properties: [...data.properties, newProperty()] });
  }, [data, onChange]);

  const remove = useCallback(
    (index: number) => {
      const properties = data.properties.filter((_, i) => i !== index);
      const updated = { ...data, properties };
      onChange(updated);
      saveSection("realEstate", updated);
    },
    [data, onChange]
  );

  const totalValue = data.properties.reduce(
    (sum, p) => sum + parseCurrency(p.approximateValue),
    0
  );
  const totalMortgage = data.properties.reduce(
    (sum, p) => sum + parseCurrency(p.mortgageBalance),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sage-700">Properties</h3>
        <Button onClick={add} variant="outline" size="lg" className="gap-2">
          <Plus className="h-5 w-5" aria-hidden="true" />
          + Add another property
        </Button>
      </div>

      {data.properties.length === 0 && (
        <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg text-base">
          No properties to list? That&apos;s fine &mdash; just skip ahead.
        </p>
      )}

      <div className="space-y-4">
        {data.properties.map((prop, index) => (
          <Card key={prop.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">
                  Property {index + 1}
                  {prop.propertyName && ` — ${prop.propertyName}`}
                </span>
                <Button
                  onClick={() => remove(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  aria-label={`Remove property ${index + 1}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="What's this property?"
                  name="propertyName"
                  value={prop.propertyName}
                  onChange={(_, v) => update(index, "propertyName", v)}
                  onBlur={save}
                  placeholder="e.g., Family Home, Lake Cottage"
                />
                <TextField
                  label="Where is it?"
                  name="address"
                  value={prop.address}
                  onChange={(_, v) => update(index, "address", v)}
                  onBlur={save}
                />
                <TextField
                  label="When did you buy it?"
                  name="purchaseDate"
                  value={prop.purchaseDate}
                  onChange={(_, v) => update(index, "purchaseDate", v)}
                  onBlur={save}
                  type="date"
                />
                <TextField
                  label="Real Estate Agent"
                  name="realEstateAgent"
                  value={prop.realEstateAgent}
                  onChange={(_, v) => update(index, "realEstateAgent", v)}
                  onBlur={save}
                />
                <TextField
                  label="Who holds the mortgage?"
                  name="mortgageLender"
                  value={prop.mortgageLender}
                  onChange={(_, v) => update(index, "mortgageLender", v)}
                  onBlur={save}
                />
                <TextField
                  label="Property Roll Number"
                  name="propertyRollNumber"
                  value={prop.propertyRollNumber}
                  onChange={(_, v) => update(index, "propertyRollNumber", v)}
                  onBlur={save}
                />
                <CurrencyField
                  label="How much is left on the mortgage?"
                  name="mortgageBalance"
                  value={prop.mortgageBalance}
                  onChange={(_, v) => update(index, "mortgageBalance", v)}
                  onBlur={save}
                />
                <CurrencyField
                  label="Roughly what's it worth?"
                  name="approximateValue"
                  value={prop.approximateValue}
                  onChange={(_, v) => update(index, "approximateValue", v)}
                  onBlur={save}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.properties.length > 0 && (
        <div className="border-t border-border pt-4 space-y-1 text-right">
          <div className="text-lg font-semibold text-sage-700">
            Total Property Value: {formatCurrency(totalValue)}
          </div>
          <div className="text-lg font-semibold text-sage-700">
            Total Mortgages: {formatCurrency(totalMortgage)}
          </div>
          <div className="text-xl font-bold text-foreground">
            Net Real Estate Equity: {formatCurrency(totalValue - totalMortgage)}
          </div>
        </div>
      )}
    </div>
  );
}
