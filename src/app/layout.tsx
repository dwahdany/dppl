import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "DPPL: Differentially Private Prototype Learning",
  description: "Research project on Differentially Private Prototypes for Imbalanced Transfer Learning",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${inter.className} bg-slate-50`}>
      <body className="min-h-screen text-slate-900">
        <Navigation />
        <main>
          {children}
        </main>
        <footer className="mt-auto border-t border-slate-200 bg-white py-6">
          <div className="container mx-auto px-4 text-center text-sm text-slate-600">
            <Link href="https://wahdany.eu" className="mx-2 hover:text-slate-900" target="_blank" rel="noopener noreferrer">wahdany.eu</Link>
            <Link href="https://jagielski.github.io/" className="mx-2 hover:text-slate-900" target="_blank" rel="noopener noreferrer">jagielski.github.io</Link>
            <Link href="https://adam-dziedzic.com" className="mx-2 hover:text-slate-900" target="_blank" rel="noopener noreferrer">adam-dziedzic.com</Link>
            <Link href="https://franziska-boenisch.de" className="mx-2 hover:text-slate-900" target="_blank" rel="noopener noreferrer">franziska-boenisch.de</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
