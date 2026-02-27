import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-12">
        <h1 className="mb-6">Why ReadyRecord Exists</h1>

        <div className="space-y-6 text-lg leading-relaxed text-foreground">
          <p>
            When a parent passes away, the surviving family has to — while
            grieving — track down SIN numbers, bank accounts, insurance
            policies, credit cards, mortgage information, pre-authorized
            payments, utility providers, and dozens of other details scattered
            across wallets, filing cabinets, and memory.
          </p>

          <p>
            Most families are completely unprepared for this. Important
            documents are missing. Account numbers are unknown. Nobody knows
            which bills are on auto-pay or where the will is kept.
          </p>

          <p>
            <strong>ReadyRecord</strong> turns that overwhelming task into a
            calm, guided experience. It&apos;s designed to be completed in one
            sitting — with a cup of tea, your wallet, and a few bank
            statements nearby.
          </p>

          <h2 className="mt-10 mb-4">How It&apos;s Different</h2>

          <p>
            Other tools in this space require account creation, push you toward
            paid subscriptions, and store your most sensitive information on
            their servers. Most are US-focused.
          </p>

          <p>ReadyRecord is different:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>No account required</strong> — start immediately, no
              email, no password
            </li>
            <li>
              <strong>No cloud storage</strong> — your data stays in your
              browser and never leaves your device
            </li>
            <li>
              <strong>Canadian-first</strong> — SIN, CPP, OAS, provincial
              terms, not American jargon
            </li>
            <li>
              <strong>PDF-first</strong> — the deliverable is a printable
              document, not a software subscription
            </li>
            <li>
              <strong>Senior-friendly</strong> — large text, simple navigation,
              encouraging guidance every step of the way
            </li>
          </ul>

          <h2 className="mt-10 mb-4">Who It&apos;s For</h2>

          <p>
            ReadyRecord is for anyone who wants to make things easier for
            their family. It&apos;s especially designed for aging parents
            (70s–80s+) who may not be tech-savvy, and for the adult children
            who care about them.
          </p>

          <div className="mt-10 text-center">
            <Link href="/form">
              <Button size="lg" className="text-xl px-10 py-7 rounded-xl">
                Start Now — It&apos;s Free
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
