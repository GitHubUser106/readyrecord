"use client";

import { useCallback } from "react";
import type { Debts as DebtsType, CreditCard, LineOfCredit } from "@/lib/types";
import { saveSection } from "@/lib/storage";
import { TextField, CurrencyField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency, parseCurrency } from "@/lib/calculations";

interface DebtsProps {
  data: DebtsType;
  onChange: (data: DebtsType) => void;
}

function newCreditCard(): CreditCard {
  return {
    id: crypto.randomUUID(),
    issuer: "",
    phoneNumber: "",
    cardNumber: "",
    interestRate: "",
    cvv: "",
    minimumPayment: "",
    balanceOwing: "",
  };
}

function newLineOfCredit(): LineOfCredit {
  return {
    id: crypto.randomUUID(),
    lender: "",
    accountNumber: "",
    balance: "",
  };
}

export default function Debts({ data, onChange }: DebtsProps) {
  const save = useCallback(() => {
    saveSection("debts", data);
  }, [data]);

  const updateCard = useCallback(
    (index: number, field: string, value: string) => {
      const cards = [...data.creditCards];
      cards[index] = { ...cards[index], [field]: value };
      onChange({ ...data, creditCards: cards });
    },
    [data, onChange]
  );

  const addCard = useCallback(() => {
    onChange({ ...data, creditCards: [...data.creditCards, newCreditCard()] });
  }, [data, onChange]);

  const removeCard = useCallback(
    (index: number) => {
      const cards = data.creditCards.filter((_, i) => i !== index);
      const updated = { ...data, creditCards: cards };
      onChange(updated);
      saveSection("debts", updated);
    },
    [data, onChange]
  );

  const updateLoc = useCallback(
    (index: number, field: string, value: string) => {
      const locs = [...data.linesOfCredit];
      locs[index] = { ...locs[index], [field]: value };
      onChange({ ...data, linesOfCredit: locs });
    },
    [data, onChange]
  );

  const addLoc = useCallback(() => {
    onChange({
      ...data,
      linesOfCredit: [...data.linesOfCredit, newLineOfCredit()],
    });
  }, [data, onChange]);

  const removeLoc = useCallback(
    (index: number) => {
      const locs = data.linesOfCredit.filter((_, i) => i !== index);
      const updated = { ...data, linesOfCredit: locs };
      onChange(updated);
      saveSection("debts", updated);
    },
    [data, onChange]
  );

  const totalCC = data.creditCards.reduce(
    (sum, c) => sum + parseCurrency(c.balanceOwing),
    0
  );
  const totalLoC = data.linesOfCredit.reduce(
    (sum, l) => sum + parseCurrency(l.balance),
    0
  );

  return (
    <div className="space-y-8">
      {/* Credit Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sage-700">Credit Cards</h3>
          <Button
            onClick={addCard}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            Add Credit Card
          </Button>
        </div>

        {data.creditCards.length === 0 && (
          <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg">
            No credit cards added yet. Click &ldquo;Add Credit Card&rdquo; to
            get started.
          </p>
        )}

        <div className="space-y-4">
          {data.creditCards.map((card, index) => (
            <Card key={card.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-lg">
                    Card {index + 1}
                    {card.issuer && ` — ${card.issuer}`}
                  </span>
                  <Button
                    onClick={() => removeCard(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label={`Remove credit card ${index + 1}`}
                  >
                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Issuer"
                    name="issuer"
                    value={card.issuer}
                    onChange={(_, v) => updateCard(index, "issuer", v)}
                    onBlur={save}
                    placeholder="e.g., Visa, Mastercard, CIBC"
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={card.phoneNumber}
                    onChange={(_, v) => updateCard(index, "phoneNumber", v)}
                    onBlur={save}
                    type="tel"
                    placeholder="(XXX) XXX-XXXX"
                  />
                  <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={card.cardNumber}
                    onChange={(_, v) => updateCard(index, "cardNumber", v)}
                    onBlur={save}
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  <TextField
                    label="Interest Rate"
                    name="interestRate"
                    value={card.interestRate}
                    onChange={(_, v) => updateCard(index, "interestRate", v)}
                    onBlur={save}
                    placeholder="e.g., 19.99%"
                  />
                  <TextField
                    label="CVV (3 digits on back)"
                    name="cvv"
                    value={card.cvv}
                    onChange={(_, v) => updateCard(index, "cvv", v)}
                    onBlur={save}
                    placeholder="XXX"
                  />
                  <CurrencyField
                    label="Minimum Payment"
                    name="minimumPayment"
                    value={card.minimumPayment}
                    onChange={(_, v) => updateCard(index, "minimumPayment", v)}
                    onBlur={save}
                  />
                  <CurrencyField
                    label="Balance Owing"
                    name="balanceOwing"
                    value={card.balanceOwing}
                    onChange={(_, v) => updateCard(index, "balanceOwing", v)}
                    onBlur={save}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data.creditCards.length > 0 && (
          <div className="mt-4 text-right text-lg font-semibold text-sage-700">
            Total Credit Card Debt: {formatCurrency(totalCC)}
          </div>
        )}
      </section>

      {/* Lines of Credit */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sage-700">Lines of Credit</h3>
          <Button
            onClick={addLoc}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            Add Line of Credit
          </Button>
        </div>

        {data.linesOfCredit.length === 0 && (
          <p className="text-muted-foreground text-center py-8 bg-muted/30 rounded-lg">
            No lines of credit added yet. Click &ldquo;Add Line of Credit&rdquo;
            to get started.
          </p>
        )}

        <div className="space-y-4">
          {data.linesOfCredit.map((loc, index) => (
            <Card key={loc.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-lg">
                    Line of Credit {index + 1}
                    {loc.lender && ` — ${loc.lender}`}
                  </span>
                  <Button
                    onClick={() => removeLoc(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label={`Remove line of credit ${index + 1}`}
                  >
                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Lender"
                    name="lender"
                    value={loc.lender}
                    onChange={(_, v) => updateLoc(index, "lender", v)}
                    onBlur={save}
                    placeholder="e.g., TD Bank, RBC"
                  />
                  <TextField
                    label="Account Number"
                    name="accountNumber"
                    value={loc.accountNumber}
                    onChange={(_, v) => updateLoc(index, "accountNumber", v)}
                    onBlur={save}
                  />
                  <CurrencyField
                    label="Balance"
                    name="balance"
                    value={loc.balance}
                    onChange={(_, v) => updateLoc(index, "balance", v)}
                    onBlur={save}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data.linesOfCredit.length > 0 && (
          <div className="mt-4 text-right text-lg font-semibold text-sage-700">
            Total Lines of Credit: {formatCurrency(totalLoC)}
          </div>
        )}
      </section>

      {/* Combined Total */}
      {(data.creditCards.length > 0 || data.linesOfCredit.length > 0) && (
        <div className="border-t border-border pt-4 text-right text-xl font-bold text-foreground">
          Combined Total Debt: {formatCurrency(totalCC + totalLoC)}
        </div>
      )}
    </div>
  );
}
