import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import { DotGothic16 } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const dotGothic16 = DotGothic16({
  variable: '--font-dot-gothic16',
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pratham Jain | DevSite',
  description: 'Personal portfolio of Pratham Jain, Data Engineer and Machine Learning Engineer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${dotGothic16.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
