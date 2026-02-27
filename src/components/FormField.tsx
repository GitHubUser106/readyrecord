"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BaseFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

interface TextFieldProps extends BaseFieldProps {
  type?: "text" | "tel" | "email" | "date";
}

interface TextareaFieldProps extends BaseFieldProps {
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  options: { value: string; label: string }[];
}

export function TextField({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  className = "",
}: TextFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={name} className="text-base">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="text-lg h-12 px-4"
        aria-label={label}
      />
    </div>
  );
}

export function CurrencyField({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "$0.00",
  className = "",
}: BaseFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={name} className="text-base">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
          $
        </span>
        <Input
          id={name}
          name={name}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="text-lg h-12 pl-8 pr-4"
          aria-label={label}
        />
      </div>
    </div>
  );
}

export function TextareaField({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  className = "",
}: TextareaFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={name} className="text-base">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className="text-lg px-4 py-3"
        aria-label={label}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select...",
  className = "",
}: SelectFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={name} className="text-base">
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={(val) => {
          onChange(name, val);
          onBlur?.();
        }}
      >
        <SelectTrigger id={name} className="text-lg h-12 px-4" aria-label={label}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-lg">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
