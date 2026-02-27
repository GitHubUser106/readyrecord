"use client";

import { useCallback, useState } from "react";
import type { ReadyRecordData } from "@/lib/types";
import {
  TIMELINE_SECTIONS,
  TEMPLATE_LETTERS,
  IMPORTANT_PHONE_NUMBERS,
  fillTemplate,
} from "@/lib/action-guide-content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Phone, Clock, FileText } from "lucide-react";

interface ActionGuideProps {
  data: ReadyRecordData;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="sm"
      className="gap-2"
      aria-label={copied ? "Copied!" : "Copy letter to clipboard"}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy Letter
        </>
      )}
    </Button>
  );
}

export default function ActionGuide({ data }: ActionGuideProps) {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
        <p className="text-base text-sage-800 leading-relaxed">
          This guide is for the person who receives this document. It provides a
          step-by-step timeline of what to do, template letters you can copy and
          customize, and important phone numbers. Take it one step at a time —
          there is no rush to do everything at once.
        </p>
      </div>

      {/* Timeline Sections */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-6 w-6 text-sage-600" aria-hidden="true" />
          <h3 className="text-sage-700">Step-by-Step Timeline</h3>
        </div>
        <div className="space-y-6">
          {TIMELINE_SECTIONS.map((section) => (
            <Card key={section.title}>
              <CardContent className="pt-6">
                <div className="flex items-baseline justify-between mb-4">
                  <h4 className="font-semibold text-lg text-foreground">
                    {section.title}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {section.timeframe}
                  </span>
                </div>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-5 h-5 mt-0.5 rounded border-2 border-muted-foreground/30 shrink-0" />
                      <div>
                        <p className="font-medium text-base">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Template Letters */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6 text-sage-600" aria-hidden="true" />
          <h3 className="text-sage-700">Template Letters</h3>
        </div>
        <p className="text-muted-foreground text-base mb-4">
          Copy these letters and fill in the bracketed fields. Items in [brackets]
          need to be customized with your specific details.
        </p>
        <div className="space-y-4">
          {TEMPLATE_LETTERS.map((letter) => {
            const filled = fillTemplate(letter.body, data);
            return (
              <Card key={letter.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-base">{letter.title}</h4>
                    <CopyButton text={filled} />
                  </div>
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-muted/30 rounded-lg p-4 text-foreground leading-relaxed">
                    {filled}
                  </pre>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Important Phone Numbers */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Phone className="h-6 w-6 text-sage-600" aria-hidden="true" />
          <h3 className="text-sage-700">Important Canadian Phone Numbers</h3>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {IMPORTANT_PHONE_NUMBERS.map((ref) => (
                <div
                  key={ref.name}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border last:border-0"
                >
                  <span className="font-medium text-base min-w-[240px]">
                    {ref.name}
                  </span>
                  <span className="font-mono text-base text-primary">
                    {ref.number}
                  </span>
                  {ref.notes && (
                    <span className="text-sm text-muted-foreground">
                      {ref.notes}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
