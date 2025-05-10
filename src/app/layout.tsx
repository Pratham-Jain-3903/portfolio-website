import type {Metadata} from 'next';
import { Dosis, Noto_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const dosis = Dosis({
  variable: '--font-dosis',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  weight: ['300', '400', '500', '600', '700'],
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
      <body className={`${dosis.variable} ${notoSans.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
