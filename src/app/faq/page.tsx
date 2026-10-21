import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { FaqSection } from '@/components/FaqSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.traliber.com';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Traliber Travel Essentials Kit',
  description:
    'Find direct, verified answers about Traliber kit contents, ₹199 pricing, India delivery coverage, WhatsApp ordering, and transit hygiene use.',
  keywords: [
    'Traliber FAQ',
    'travel hygiene kit questions',
    'travel kit contents India',
    'Traliber kit pricing',
    'travel kit WhatsApp order',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Traliber Travel Essentials',
    description:
      'Answers to common traveler questions about the Traliber Travel Essentials Kit, items, and ordering.',
    url: `${siteUrl}/faq`,
  },
};

export default function FaqPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: `${siteUrl}/faq`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60">
              <li>
                <a href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold">Frequently Asked Questions</li>
            </ol>
          </nav>
        </div>

        {/* Dedicated FAQ Component with Schema */}
        <FaqSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
