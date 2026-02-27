"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Summary from "@/components/sections/Summary";
import { loadAllData } from "@/lib/storage";
import type { ReadyRecordData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FileDown, Lock, ArrowLeft } from "lucide-react";

export default function ReviewPage() {
  const [data, setData] = useState<ReadyRecordData | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setData(loadAllData());
  }, []);

  const handleDownloadPDF = async () => {
    if (!data) return;
    setGenerating(true);
    try {
      const { generatePDF } = await import("@/lib/pdf");
      generatePDF(data);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("There was a problem generating your PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8">
        <div className="mb-8">
          <Link
            href="/form"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to Form
          </Link>
          <h1>Review & Download</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Here&apos;s a summary of everything you&apos;ve entered. When
            you&apos;re ready, download your PDF.
          </p>
        </div>

        <Summary data={data} />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadPDF}
            size="lg"
            className="text-xl px-8 py-6 gap-3"
            disabled={generating}
          >
            <FileDown className="h-6 w-6" aria-hidden="true" />
            {generating ? "Generating..." : "Download PDF"}
          </Button>
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            size="lg"
            className="text-xl px-8 py-6 gap-3"
            disabled={generating}
          >
            <Lock className="h-6 w-6" aria-hidden="true" />
            {generating ? "Generating..." : "Download Encrypted PDF"}
          </Button>
        </div>

        <p className="text-center text-muted-foreground mt-4 text-base">
          Your PDF is generated entirely in your browser. No data is sent
          anywhere.
        </p>
      </main>

      <Footer />
    </div>
  );
}
