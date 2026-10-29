import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

import { SITE_URL } from '@/lib/site';

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Travel Hygiene Guides | Practical Personal Care for Journeys',
  description:
    'Expert, practical guides on personal hygiene, packing compact essentials, and staying fresh on long train, flight, and road journeys across India.',
  keywords: [
    'travel hygiene guides',
    'packing personal care for travel',
    'train journey hygiene checklist',
    'travel essentials tips India',
  ],
  alternates: {
    canonical: '/travel-hygiene-guides',
  },
  openGraph: {
    title: 'Travel Hygiene Guides | Traliber',
    description:
      'Practical advice for staying clean, comfortable, and prepared on journeys across India.',
    url: `${siteUrl}/travel-hygiene-guides`,
  },
};

export default function TravelHygieneGuidesPage() {
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
        name: 'Travel Hygiene Guides',
        item: `${siteUrl}/travel-hygiene-guides`,
      },
    ],
  };

  const guides = [
    {
      slug: 'checklist-for-long-journeys',
      title: 'The Travel Hygiene Essentials Checklist for Long Journeys in India',
      subtitle:
        'A practical, step-by-step packing guide for overnight trains, cross-country flights, and road trips.',
      date: 'October 2026',
      readTime: '6 min read',
      category: 'Transit Hygiene',
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60">
              <li>
                <a href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold">Travel Hygiene Guides</li>
            </ol>
          </nav>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block">
              PRACTICAL TRAVEL ADVICE
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.12]">
              Travel Hygiene &amp; Packing Guides
            </h1>
            <p className="text-base sm:text-lg text-[#22213A]/75 leading-relaxed font-normal">
              Actionable guides to help modern travelers stay clean, comfortable, and prepared across trains, flights, and road trips.
            </p>
          </div>

          {/* Guides List */}
          <div className="space-y-8">
            {guides.map((guide, idx) => (
              <article
                key={idx}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#22213A]/[0.08] shadow-[0_8px_30px_rgba(30,27,75,0.03)] hover:shadow-lg transition-all text-left flex flex-col sm:flex-row justify-between items-start gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-[#4F75FF]/10 text-[#4F75FF] font-bold uppercase tracking-wider">
                      {guide.category}
                    </span>
                    <span className="text-[#22213A]/50 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B] hover:text-[#4F75FF] transition-colors">
                    <a href={`/travel-hygiene-guides/${guide.slug}`}>
                      {guide.title}
                    </a>
                  </h2>

                  <p className="text-sm sm:text-base text-[#22213A]/75 leading-relaxed font-normal">
                    {guide.subtitle}
                  </p>
                </div>

                <a
                  href={`/travel-hygiene-guides/${guide.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-bold shrink-0 transition-all shadow-md self-start sm:self-center"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
