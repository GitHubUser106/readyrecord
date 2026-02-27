"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActionGuide from "@/components/sections/ActionGuide";
import { loadAllData } from "@/lib/storage";
import type { ReadyRecordData } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

export default function ActionGuidePage() {
  const [data, setData] = useState<ReadyRecordData | null>(null);

  useEffect(() => {
    setData(loadAllData());
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl text-muted-foreground">
            Loading...
          </div>
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
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Form
          </Link>
          <h1 className="text-foreground">What To Do — Action Guide</h1>
          <p className="text-muted-foreground text-lg mt-2">
            A step-by-step guide for your family, with timelines, template letters,
            and important Canadian phone numbers.
          </p>
        </div>

        <ActionGuide data={data} />
      </main>

      <Footer />
    </div>
  );
}
