import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReadyRecord — Help Your Family When It Matters Most",
  description:
    "Organize your important information in one place — so your family doesn't have to search for it during the hardest time of their lives. Free, private, no account required.",
  openGraph: {
    title: "ReadyRecord — Help Your Family When It Matters Most",
    description:
      "Organize your important information in one place. Free, private, no account required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
