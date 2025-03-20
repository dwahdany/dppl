import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { cn } from "@/lib/utils";

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
    <html lang="en" className={cn(
      "bg-background font-sans antialiased",
      GeistSans.variable,
      inter.className
    )}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <div className="flex-1">
            <main>{children}</main>
          </div>
          <footer className="border-t py-6">
            <div className="container mx-auto text-center">
              <p className="text-sm leading-loose text-muted-foreground">
                <Link href="https://wahdany.eu" className="mx-2 hover:text-foreground" target="_blank" rel="noopener noreferrer">wahdany.eu</Link>
                <Link href="https://jagielski.github.io/" className="mx-2 hover:text-foreground" target="_blank" rel="noopener noreferrer">jagielski.github.io</Link>
                <Link href="https://adam-dziedzic.com" className="mx-2 hover:text-foreground" target="_blank" rel="noopener noreferrer">adam-dziedzic.com</Link>
                <Link href="https://franziska-boenisch.de" className="mx-2 hover:text-foreground" target="_blank" rel="noopener noreferrer">franziska-boenisch.de</Link>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
