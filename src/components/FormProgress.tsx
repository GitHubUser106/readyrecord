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
                  {isComplete && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span>{section.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Desktop: vertical sidebar list with dots */}
      <div className="hidden md:block max-h-[calc(100vh-12rem)] overflow-y-auto">
        <ol className="space-y-0.5">
          {SECTIONS.map((section, index) => {
            const isComplete = completions[section.id] === 100;
            const isCurrent = index === currentSection;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(index)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-colors",
                    isCurrent
                      ? "bg-sage-50 text-sage-800 font-semibold"
                      : isComplete
                        ? "text-sage-700 hover:bg-sage-50/60"
                        : "text-muted-foreground hover:bg-muted/40"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`${section.title}${isComplete ? " (complete)" : ""}`}
                >
                  {/* Dot indicator */}
                  <span
                    className={cn(
                      "flex items-center justify-center w-3 h-3 rounded-full shrink-0 transition-all",
                      isCurrent
                        ? "bg-sage-500 ring-2 ring-sage-300 ring-offset-2"
                        : isComplete
                          ? "bg-sage-500"
                          : "border-2 border-muted-foreground/40 bg-transparent"
                    )}
                  >
                    {isComplete && !isCurrent && (
                      <Check className="h-2 w-2 text-white" strokeWidth={4} aria-hidden="true" />
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
