import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, FileDown, Clock, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              The Most Loving Thing You Can Do for Your Family
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Organize your important information in one place — so they
              don&apos;t have to search for it during the hardest time of their
              lives.
            </p>
            <Link href="/form">
              <Button size="lg" className="text-xl px-10 py-7 rounded-xl shadow-lg">
                Let&apos;s Get Started
              </Button>
            </Link>
            <p className="mt-4 text-base text-muted-foreground">
              Free. Private. Takes about 45 minutes.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-warm-50 px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center mb-12 text-foreground">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-sage-700">1</span>
                </div>
                <h3 className="mb-2 text-foreground">Gather Your Documents</h3>
                <p className="text-muted-foreground text-base">
                  Pull out your wallet, a recent bank statement, and any
                  insurance papers you have handy.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-sage-700">2</span>
                </div>
                <h3 className="mb-2 text-foreground">Fill in the Sections</h3>
                <p className="text-muted-foreground text-base">
                  Work through 12 guided sections at your own pace. Everything
                  saves automatically as you go.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-sage-700">3</span>
                </div>
                <h3 className="mb-2 text-foreground">Download Your PDF</h3>
                <p className="text-muted-foreground text-base">
                  Get a clean, printable document to keep in a safe place or
                  share with your family.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center mb-12 text-foreground">
              Built with Trust & Privacy First
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-6 rounded-xl bg-white border border-border">
                <Lock className="h-8 w-8 text-sage-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Your Data Never Leaves Your Device
                  </h3>
                  <p className="text-muted-foreground text-base">
                    Everything is stored in your browser. We never see, collect,
                    or transmit your information. No accounts, no cloud, no
                    risk.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-xl bg-white border border-border">
                <Eye className="h-8 w-8 text-sage-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    No Tracking, No Analytics
                  </h3>
                  <p className="text-muted-foreground text-base">
                    Zero cookies, zero tracking pixels, zero analytics. We
                    don&apos;t even know you&apos;re here.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-xl bg-white border border-border">
                <FileDown className="h-8 w-8 text-sage-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    PDF-First Design
                  </h3>
                  <p className="text-muted-foreground text-base">
                    The deliverable is a clean, printable PDF — not a
                    subscription. Download it, print it, put it in a safe
                    place.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-xl bg-white border border-border">
                <Shield className="h-8 w-8 text-sage-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Canadian-First
                  </h3>
                  <p className="text-muted-foreground text-base">
                    Built for Canadians — SIN, CPP, OAS, provincial terms. No
                    American jargon getting in the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What you'll document */}
        <section className="py-16 bg-warm-50 px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center mb-8 text-foreground">
              What You&apos;ll Document
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-10">
              Everything your family would need to know, organized clearly in
              one document.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "About you — your name, SIN, and ID",
                "Your people — lawyers, accountants, close friends",
                "Your accounts — banks and investments",
                "Your income — pensions, CPP, OAS, and more",
                "What you owe — credit cards and loans",
                "Your properties — homes and real estate",
                "Your valuables — vehicles, jewelry, heirlooms",
                "Your businesses — if you own one",
                "Your insurance — auto, home, life, health",
                "Your monthly bills — utilities, subscriptions",
                "Your online accounts — email, social media, streaming",
                "A step-by-step action guide for your family",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-3 text-base"
                >
                  <Heart
                    className="h-5 w-5 text-sage-500 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Time estimate */}
        <section className="py-16 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Clock className="h-12 w-12 text-sage-500 mx-auto mb-4" aria-hidden="true" />
            <h2 className="mb-4 text-foreground">About 45 Minutes</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Grab a cup of tea, your wallet, and a recent bank statement.
              That&apos;s all you need. You can save your progress and come
              back any time — everything stays right in your browser.
            </p>
            <Link href="/form">
              <Button size="lg" className="text-xl px-10 py-7 rounded-xl shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
