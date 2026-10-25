import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "800"], variable: "--f-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--f-mono" });
const body = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600"], variable: "--f-body" });

export const metadata: Metadata = {
  title: "CheatCodes",
  description: "Simple, searchable notes for the tools you use every day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      <body>
        <header className="top">
          <Link href="/" className="brand">CheatCodes</Link>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/docs">Docs</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
