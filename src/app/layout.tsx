import type { Metadata, Viewport } from 'next';
import { Dosis, Noto_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@/components/analytics';

// Optimize font loading
const dosis = Dosis({
  variable: '--font-dosis',
  weight: ['400', '500', '600', '700'], // Reduced subset for performance
  subsets: ['latin'],
  display: 'swap', // Ensure text remains visible during font load
});

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  weight: ['400', '500', '600'], // Reduced subset for performance
  subsets: ['latin'],
  display: 'swap',
});

// Extended metadata for better SEO
export const metadata: Metadata = {
  title: 'Pratham Jain | Data Engineer & ML Expert',
  description: 'Portfolio of Pratham Jain, specializing in Data Engineering, Machine Learning, and AI solutions.',
  keywords: ['data engineer', 'machine learning', 'portfolio', 'developer', 'Pratham Jain'],
  authors: [{ name: 'Pratham Jain' }],
  creator: 'Pratham Jain',
};

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
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
      className={`${dosis.variable} ${notoSans.variable} scroll-smooth`}
    >
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/hero-image.webp" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}