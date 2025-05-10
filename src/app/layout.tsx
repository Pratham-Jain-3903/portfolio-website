import type { Metadata, Viewport } from 'next';
import { Dosis, Noto_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/common/theme-provider';

// Load fonts with display strategy for better performance
const dosis = Dosis({
  variable: '--font-dosis',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

// Enhanced metadata for better SEO and social sharing
export const metadata: Metadata = {
  title: {
    template: '%s | Pratham Jain',
    default: 'Pratham Jain | Data Engineer & ML Engineer',
  },
  description: 'Pratham Jain is a Data Engineer and Machine Learning Engineer specializing in building data pipelines and AI solutions.',
  keywords: ['data engineer', 'machine learning', 'portfolio', 'Pratham Jain', 'developer'],
  creator: 'Pratham Jain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prathamjain.com',
    title: 'Pratham Jain | Data Engineer & ML Engineer',
    description: 'Personal portfolio showcasing my projects, skills, and experience in data engineering and machine learning.',
    siteName: 'Pratham Jain Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Jain | Data Engineer & ML Engineer',
    description: 'Personal portfolio showcasing my projects, skills, and experience in data engineering and machine learning.',
    creator: '@prathamjain',
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
      className={cn(
        'scroll-smooth',
        dosis.variable, 
        notoSans.variable
      )}
    >
      <body 
        className="font-sans antialiased min-h-screen bg-background text-foreground relative"
        suppressHydrationWarning >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
      </body>
    </html>
  );
}