"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormProgress from "@/components/FormProgress";
import PersonalInfo from "@/components/sections/PersonalInfo";
import ImportantContacts from "@/components/sections/ImportantContacts";
import BankAccounts from "@/components/sections/BankAccounts";
import Income from "@/components/sections/Income";
import Debts from "@/components/sections/Debts";
import RealEstate from "@/components/sections/RealEstate";
import PhysicalAssets from "@/components/sections/PhysicalAssets";
import BusinessInterests from "@/components/sections/BusinessInterests";
import Insurance from "@/components/sections/Insurance";
import Expenses from "@/components/sections/Expenses";
import DigitalAccounts from "@/components/sections/DigitalAccounts";
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
import { ChevronLeft, ChevronRight, FileDown, Trash2, Heart } from "lucide-react";

export default function FormPage() {
  const router = useRouter();
  const [data, setData] = useState<ReadyRecordData | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [encouragement, setEncouragement] = useState<string | null>(null);

  // Load data and welcome state on mount
  useEffect(() => {
    setData(loadAllData());
    const welcomed = sessionStorage.getItem("readyrecord-welcomed");
    if (welcomed === "true") {
      setShowWelcome(false);
    }
  }, []);

  // Auto-dismiss encouragement after 4 seconds
  useEffect(() => {
    if (!encouragement) return;
    const timer = setTimeout(() => setEncouragement(null), 4000);
    return () => clearTimeout(timer);
  }, [encouragement]);

  const completions = data ? getSectionCompletion(data) : ({} as Record<SectionId, number>);

  const handleSectionChange = useCallback(
    (index: number, fromIndex?: number) => {
      if (data) saveAllData(data);
      // Show encouragement only when navigating forward
      if (fromIndex !== undefined && index > fromIndex) {
        const targetSection = SECTIONS[index];
        if (targetSection?.encouragement) {
          setEncouragement(targetSection.encouragement);
        }
      }
      setCurrentSection(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [data]
  );

  const goNext = useCallback(() => {
    if (currentSection < SECTIONS.length - 1) {
      handleSectionChange(currentSection + 1, currentSection);
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
    setShowWelcome(true);
    sessionStorage.removeItem("readyrecord-welcomed");
  }, []);

  const handleStartForm = useCallback(() => {
    setShowWelcome(false);
    sessionStorage.setItem("readyrecord-welcomed", "true");
  }, []);

  const handleSkip = useCallback(() => {
    if (data) saveAllData(data);
    goNext();
  }, [data, goNext]);

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

  // Welcome screen
  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-xl text-center">
            <Heart className="h-12 w-12 text-sage-500 mx-auto mb-6" aria-hidden="true" />
            <h1 className="text-3xl md:text-4xl mb-4">
              You&apos;re about to do something really kind for your family.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              This will help you put all your important information in one place.
              There&apos;s no rush — you can stop anytime and come back later.
              Everything saves automatically on your device.
            </p>
            <div className="bg-sage-50 rounded-2xl p-6 mb-8 text-left">
              <p className="font-semibold text-sage-700 mb-3">
                You might want to have nearby:
              </p>
              <ul className="space-y-2 text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-sage-500 mt-1">&bull;</span>
                  Your wallet (credit cards, ID)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-500 mt-1">&bull;</span>
                  A recent bank statement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-500 mt-1">&bull;</span>
                  Your insurance papers
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground mb-8">
              Most people finish in 30&ndash;45 minutes, but you can do it in
              pieces over several days if you prefer.
            </p>
            <Button
              onClick={handleStartForm}
              size="lg"
              className="text-xl px-10 py-7 rounded-xl shadow-lg"
            >
              I&apos;m Ready &mdash; Let&apos;s Begin
            </Button>
          </div>
        </main>
        <Footer />
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
            onSectionClick={(i) => handleSectionChange(i)}
          />
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-72 shrink-0">
            <div className="sticky top-24">
              <FormProgress
                currentSection={currentSection}
                completions={completions}
                onSectionClick={(i) => handleSectionChange(i)}
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
                  Download Your ReadyRecord
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
            {/* Encouragement banner */}
            {encouragement && (
              <div className="bg-sage-50 text-sage-700 px-4 py-3 rounded-xl mb-6 text-lg font-medium animate-fade-in">
                {encouragement}
              </div>
            )}

            {/* Section header */}
            <div className="mb-8">
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
              {section.id === "important-contacts" && (
                <ImportantContacts
                  data={data.importantContacts}
                  onChange={(importantContacts) =>
                    setData({ ...data, importantContacts })
                  }
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
              {section.id === "income" && (
                <Income
                  data={data.income}
                  onChange={(income) => setData({ ...data, income })}
                />
              )}
              {section.id === "debts" && (
                <Debts
                  data={data.debts}
                  onChange={(debts) => setData({ ...data, debts })}
                />
              )}
              {section.id === "real-estate" && (
                <RealEstate
                  data={data.realEstate}
                  onChange={(realEstate) => setData({ ...data, realEstate })}
                />
              )}
              {section.id === "physical-assets" && (
                <PhysicalAssets
                  data={data.physicalAssets}
                  onChange={(physicalAssets) =>
                    setData({ ...data, physicalAssets })
                  }
                />
              )}
              {section.id === "business-interests" && (
                <BusinessInterests
                  data={data.businessInterests}
                  onChange={(businessInterests) =>
                    setData({ ...data, businessInterests })
                  }
                />
              )}
              {section.id === "insurance" && (
                <Insurance
                  data={data.insurance}
                  onChange={(insurance) => setData({ ...data, insurance })}
                />
              )}
              {section.id === "expenses" && (
                <Expenses
                  data={data.expenses}
                  onChange={(expenses) => setData({ ...data, expenses })}
                />
              )}
              {section.id === "digital-accounts" && (
                <DigitalAccounts
                  data={data.digitalAccounts}
                  onChange={(digitalAccounts) =>
                    setData({ ...data, digitalAccounts })
                  }
                />
              )}
              {section.id === "summary" && <Summary data={data} />}
            </div>

            {/* Skip link */}
            {section.id !== "personal-info" && section.id !== "summary" && currentSection < SECTIONS.length - 1 && (
              <div className="mb-6 text-center">
                <button
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground text-base underline underline-offset-4 transition-colors"
                >
                  Skip &mdash; doesn&apos;t apply to me
                </button>
              </div>
            )}

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
                  Continue
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
                  Download Your ReadyRecord
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
