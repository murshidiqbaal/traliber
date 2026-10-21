import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.traliber.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Traliber Travel Essentials Kit | Compact Travel Hygiene Essentials',
    template: '%s | Traliber',
  },
  description:
    'Discover the Traliber Travel Essentials Kit: a compact water-resistant pouch featuring 10 essential personal care and hygiene items for smoother, cleaner journeys. Enquire directly on WhatsApp.',
  keywords: [
    'travel essentials kit',
    'travel hygiene kit India',
    'personal care travel kit',
    'compact travel essentials',
    'travel toiletries kit',
    'travel toothbrush set',
    'travel toothpaste',
    'pocket sanitizer bottles',
    'travel paper soap sheets',
    'disposable toilet seat covers',
    'travel wet wipes',
    'Traliber',
  ],
  authors: [{ name: 'Traliber', url: siteUrl }],
  creator: 'Traliber',
  publisher: 'Traliber',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Traliber Travel Essentials Kit | For a Cleaner Tomorrow',
    description:
      'Ten thoughtfully coordinated personal care and hygiene essentials precision-packed into one compact travel pouch. Enquire or order via WhatsApp.',
    url: siteUrl,
    siteName: 'Traliber',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/kit-display.webp',
        width: 1200,
        height: 630,
        alt: 'Traliber Travel Essentials Kit Display with all 10 items and travel pouch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traliber Travel Essentials Kit | Compact Travel Hygiene Essentials',
    description:
      'Ten travel personal care essentials in one compact pouch. Designed for trains, flights, and road trips. Enquire on WhatsApp.',
    images: ['/images/kit-display.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/logo-icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
};

import { TraliberProvider } from '@/context/TraliberStore';
import { AdminShortcutListener } from '@/components/AdminShortcutListener';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Traliber',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.webp`,
  slogan: 'For a Cleaner Tomorrow.',
  description:
    'Traliber provides thoughtfully curated travel essentials and personal care kits for modern wanderers.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-89210-19251',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
    contactOption: 'WhatsApp Support',
  },
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Traliber',
  url: siteUrl,
  inLanguage: 'en-IN',
  description:
    'Official website of Traliber Travel Essentials Kit. Explore kit contents and enquire on WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7FC] text-[#22213A] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <TraliberProvider>
          {children}
          <AdminShortcutListener />
        </TraliberProvider>
      </body>
    </html>
  );
}
