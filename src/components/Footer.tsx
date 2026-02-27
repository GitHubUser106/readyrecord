import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-12 no-print">
      <div className="mx-auto max-w-4xl px-4 text-center text-muted-foreground text-base">
        <p className="mb-2">
          Your data never leaves your device.{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Learn more
          </Link>
        </p>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ReadyRecord. Made with care in
          Canada.
        </p>
      </div>
    </footer>
  );
}
