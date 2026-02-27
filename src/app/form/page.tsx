"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormProgress from "@/components/FormProgress";
import PersonalInfo from "@/components/sections/PersonalInfo";
import Debts from "@/components/sections/Debts";
import BankAccounts from "@/components/sections/BankAccounts";
import RealEstate from "@/components/sections/RealEstate";
import Insurance from "@/components/sections/Insurance";
import Income from "@/components/sections/Income";
import Expenses from "@/components/sections/Expenses";
import ImportantContacts from "@/components/sections/ImportantContacts";
import Summary from "@/components/sections/Summary";
import { loadAllData, saveAllData, getSectionCompletion, clearAllData } from "@/lib/storage";
import { SECTIONS, type ReadyRecordData, type SectionId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, FileDown, Trash2 } from "lucide-react";

export default function FormPage() {
  const router = useRouter();
  const [data, setData] = useState<ReadyRecordData | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    setData(loadAllData());
  }, []);

  const completions = data ? getSectionCompletion(data) : ({} as Record<SectionId, number>);

  const handleSectionChange = useCallback(
    (index: number) => {
      if (data) saveAllData(data);
      setCurrentSection(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [data]
  );

  const goNext = useCallback(() => {
    if (currentSection < SECTIONS.length - 1) {
      handleSectionChange(currentSection + 1);
    }
  }, [currentSection, handleSectionChange]);

  const goPrev = useCallback(() => {
    if (currentSection > 0) {
      handleSectionChange(currentSection - 1);
    }
  }, [currentSection, handleSectionChange]);

  const handleClearAll = useCallback(() => {
    clearAllData();
    setData(loadAllData());
    setCurrentSection(0);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl text-muted-foreground">
            Loading your information...
          </div>
        </div>
      </div>
    );
  }

  const section = SECTIONS[currentSection];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-6">
        {/* Mobile progress */}
        <div className="md:hidden mb-6">
          <FormProgress
            currentSection={currentSection}
            completions={completions}
            onSectionClick={handleSectionChange}
          />
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-72 shrink-0">
            <div className="sticky top-24">
              <FormProgress
                currentSection={currentSection}
                completions={completions}
                onSectionClick={handleSectionChange}
              />
              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => {
                    saveAllData(data);
                    router.push("/review");
                  }}
                  className="w-full gap-2"
                  size="lg"
                >
                  <FileDown className="h-5 w-5" aria-hidden="true" />
                  Review & Download
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                      size="lg"
                    >
                      <Trash2 className="h-5 w-5" aria-hidden="true" />
                      Clear All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl">
                        Are you sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-base">
                        This will permanently delete all the information
                        you&apos;ve entered. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-base">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearAll}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-base"
                      >
                        Yes, Delete Everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Section header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                Step {currentSection + 1} of {SECTIONS.length}
              </div>
              <h2 className="text-foreground">{section.title}</h2>
              <p className="text-muted-foreground text-lg mt-2">
                {section.description}
              </p>
            </div>

            {/* Section content */}
            <div className="mb-8">
              {section.id === "personal-info" && (
                <PersonalInfo
                  data={data.personalInfo}
                  onChange={(personalInfo) =>
                    setData({ ...data, personalInfo })
                  }
                />
              )}
              {section.id === "debts" && (
                <Debts
                  data={data.debts}
                  onChange={(debts) => setData({ ...data, debts })}
                />
              )}
              {section.id === "bank-accounts" && (
                <BankAccounts
                  data={data.bankAccounts}
                  onChange={(bankAccounts) =>
                    setData({ ...data, bankAccounts })
                  }
                />
              )}
              {section.id === "real-estate" && (
                <RealEstate
                  data={data.realEstate}
                  onChange={(realEstate) => setData({ ...data, realEstate })}
                />
              )}
              {section.id === "insurance" && (
                <Insurance
                  data={data.insurance}
                  onChange={(insurance) => setData({ ...data, insurance })}
                />
              )}
              {section.id === "income" && (
                <Income
                  data={data.income}
                  onChange={(income) => setData({ ...data, income })}
                />
              )}
              {section.id === "expenses" && (
                <Expenses
                  data={data.expenses}
                  onChange={(expenses) => setData({ ...data, expenses })}
                />
              )}
              {section.id === "important-contacts" && (
                <ImportantContacts
                  data={data.importantContacts}
                  onChange={(importantContacts) =>
                    setData({ ...data, importantContacts })
                  }
                />
              )}
              {section.id === "summary" && <Summary data={data} />}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                onClick={goPrev}
                variant="outline"
                size="lg"
                disabled={currentSection === 0}
                className="gap-2 text-lg"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                Back
              </Button>

              <div className="text-sm text-muted-foreground hidden sm:block">
                Auto-saved to your browser
              </div>

              {currentSection < SECTIONS.length - 1 ? (
                <Button onClick={goNext} size="lg" className="gap-2 text-lg">
                  Next
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    saveAllData(data);
                    router.push("/review");
                  }}
                  size="lg"
                  className="gap-2 text-lg"
                >
                  <FileDown className="h-5 w-5" aria-hidden="true" />
                  Review & Download
                </Button>
              )}
            </div>

            {/* Mobile clear data button */}
            <div className="md:hidden mt-8">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                    size="lg"
                  >
                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                    Clear All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      This will permanently delete all the information
                      you&apos;ve entered. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-base">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearAll}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-base"
                    >
                      Yes, Delete Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
