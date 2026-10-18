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

export const metadata: Metadata = {
  title: 'Traliber — Travel Essentials & Personal-Care Kit',
  description:
    'Explore the Traliber travel kit reveal. 10 personal-care essentials precision-packed in a compact organic cotton pouch. 100% TSA carry-on compliant, zero liquid leaks.',
  keywords: [
    'Traliber',
    'travel kit',
    'travel essentials',
    'TSA approved toiletries',
    'toothpaste tablets',
    'portable paper soap',
    'personal care kit',
  ],
  authors: [{ name: 'Traliber' }],
  openGraph: {
    title: 'Traliber — All-in-One Travel Essentials Kit',
    description:
      'Everything you need. One little kit. Discover the 10-item travel personal care kit designed for smooth journeys.',
    siteName: 'Traliber',
    type: 'website',
  },
};

import { TraliberProvider } from '@/context/TraliberStore';
import { AdminShortcutListener } from '@/components/AdminShortcutListener';

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
        <TraliberProvider>
          {children}
          <AdminShortcutListener />
        </TraliberProvider>
      </body>
    </html>
  );
}
