"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50 no-print">
      <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <Shield className="h-7 w-7" aria-hidden="true" />
          ReadyRecord
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
