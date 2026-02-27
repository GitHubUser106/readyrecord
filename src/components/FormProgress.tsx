"use client";

import { SECTIONS, type SectionId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FormProgressProps {
  currentSection: number;
  completions: Record<SectionId, number>;
  onSectionClick: (index: number) => void;
}

export default function FormProgress({
  currentSection,
  completions,
  onSectionClick,
}: FormProgressProps) {
  return (
    <nav aria-label="Form sections" className="w-full">
      {/* Mobile: horizontal scrollable pills */}
      <div className="md:hidden overflow-x-auto pb-2">
        <ol className="flex gap-2 min-w-max px-1">
          {SECTIONS.map((section, index) => {
            const isComplete = completions[section.id] === 100;
            const isCurrent = index === currentSection;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(index)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isComplete
                        ? "bg-sage-100 text-sage-700"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`${section.title}${isComplete ? " (complete)" : ""}`}
                >
                  {isComplete && <Check className="h-4 w-4" aria-hidden="true" />}
                  <span>{index + 1}. {section.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Desktop: vertical sidebar list */}
      <div className="hidden md:block">
        <ol className="space-y-1">
          {SECTIONS.map((section, index) => {
            const isComplete = completions[section.id] === 100;
            const isCurrent = index === currentSection;
            const completion = completions[section.id];
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(index)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    isCurrent
                      ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                      : isComplete
                        ? "text-sage-700 hover:bg-sage-50"
                        : "text-muted-foreground hover:bg-muted/50"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`${section.title}${isComplete ? " (complete)" : completion > 0 ? ` (${completion}% complete)` : ""}`}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0",
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isComplete
                          ? "bg-sage-500 text-white"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="text-base">{section.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
