import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const fontDisplay = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { CompareProvider } from '@/context/CompareContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobileNav } from '@/components/MobileNav';
import { NotificationDrawer } from '@/components/NotificationDrawer';
import { AiAssistantModal } from '@/components/AiAssistantModal';
import { ToastProvider } from '@/context/ToastContext';
import { ToastContainer } from '@/components/ToastContainer';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#070d17' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Brickly AlexEstate | Intelligent Full-Stack Real Estate Ecosystem',
  description:
    'Discover, compare, tour, negotiate, and buy luxury homes, apartments, villas, and commercial real estate. AI-powered search, RERA verification, 360 virtual tours, and mortgage intelligence.',
  keywords: [
    'Real Estate',
    'Buy Apartments',
    'Rent House',
    'Villas in Bangalore',
    'Mumbai Luxury Flats',
    'RERA Verified',
    '360 Virtual Tour',
    'Property Valuation',
    'EMI Calculator',
  ],
  authors: [{ name: 'AlexEstate & Brickly Team' }],
  creator: 'Brickly AlexEstate',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brickly-estate.example.com',
    title: 'Brickly AlexEstate | Intelligent Full-Stack Real Estate Ecosystem',
    description:
      'Discover, tour, negotiate, and buy verified luxury homes with AI conversational search and 360 virtual tours.',
    siteName: 'Brickly AlexEstate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brickly AlexEstate | Real Estate Ecosystem',
    description: 'Intelligent real estate discovery, 360 tours, and RERA verified homes.',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white"
      >
        <ThemeProvider>
          <AuthProvider>
            <CurrencyProvider>
              <CompareProvider>
                <NotificationProvider>
                  <ToastProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <MobileNav />
                    <NotificationDrawer />
                    <AiAssistantModal />
                    <ToastContainer />
                  </ToastProvider>
                </NotificationProvider>
              </CompareProvider>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
