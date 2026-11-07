import type { Metadata, Viewport } from 'next';
import {Noto_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/common/theme-provider";
import AnalyticsProvider from '@/components/common/AnalyticsProvider';
import ThemeDebug from '@/components/common/theme-debug';

// // Load fonts with display strategy for better performance
// const dosis = Doto({
//   variable: '--font-dosis',
//   weight: ['800'],
//   subsets: ['latin'],
//   display: 'swap',
// });

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

// Enhanced metadata for better SEO and social sharing
export const metadata: Metadata = {
  metadataBase: new URL('https://prathamjain.in'),
  alternates: { canonical: '/' },
  title: {
    template: '%s | Pratham Jain',
    default: 'Pratham Jain | Market Data Engineer & Quant Developer',
  },
  description: 'Pratham Jain builds market-data pipelines, trading systems and tested quantitative experiments in Python and C++.',
  keywords: ['market data engineer', 'quant developer', 'data engineer', 'C++', 'trading systems', 'Pratham Jain'],
  creator: 'Pratham Jain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Pratham Jain | Market Data Engineer & Quant Developer',
    description: 'Market-data pipelines, trading systems and tested quantitative experiments.',
    siteName: 'Pratham Jain Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Jain | Market Data Engineer & Quant Developer',
    description: 'Market-data pipelines, trading systems and tested quantitative experiments.',
  },
};

// Viewport settings for improved responsiveness
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('scroll-smooth', notoSans.variable)}
    >
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground relative"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <ThemeDebug />
            {/* Skip to content link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              Skip to content
            </a>
            
            <main id="main-content" className="min-h-screen flex flex-col">
              {children}
            </main>
            
            <Toaster />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}