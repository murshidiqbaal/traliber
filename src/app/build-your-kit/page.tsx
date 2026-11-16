import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelKitBuilder } from '@/components/travel-builder/TravelKitBuilder';
import { SITE_URL, absoluteUrl } from '@/lib/site';
import { BRAND, getBreadcrumbSchema } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Build Your Travel Kit | Smart Travel Duration Calculator | Traliber',
  description:
    'Calculate your trip duration and build a custom travel essentials kit tailored to your travel dates, transport mode, destination climate, and traveller count.',
  alternates: {
    canonical: absoluteUrl('/build-your-kit'),
  },
  openGraph: {
    title: 'Build Your Custom Travel Kit | Traliber',
    description:
      'Interactive travel duration calculator & custom travel kit builder. Personalized travel hygiene recommendations for trains, flights, road trips, and weekend journeys.',
    url: absoluteUrl('/build-your-kit'),
    siteName: BRAND.name,
    images: [
      {
        url: absoluteUrl('/images/kit-display.webp'),
        width: 1200,
        height: 630,
        alt: 'Traliber Custom Travel Kit Builder and Calculator',
      },
    ],
    locale: BRAND.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your Custom Travel Kit | Traliber',
    description:
      'Personalize your travel hygiene kit based on trip duration, transport mode, and destination climate.',
    images: [absoluteUrl('/images/kit-display.webp')],
  },
};

export default function BuildYourKitPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Build Your Travel Kit', url: '/build-your-kit' },
  ]);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Build Your Travel Kit',
    url: absoluteUrl('/build-your-kit'),
    description:
      'Interactive smart trip duration calculator and custom travel hygiene kit builder for Indian journeys.',
    isPartOf: {
      '@type': 'WebSite',
      name: BRAND.name,
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] flex flex-col justify-between">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <Navbar />

      <main className="pt-24 pb-16 flex-1">
        <Suspense fallback={<div className="max-w-5xl mx-auto py-20 text-center text-gray-400">Loading Travel Kit Builder...</div>}>
          <TravelKitBuilder />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

