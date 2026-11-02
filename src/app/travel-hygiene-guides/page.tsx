import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { TRAVEL_GUIDES } from '@/data/travel-guides';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Travel Hygiene Guides & Packing Advice | Traliber',
  description:
    'Practical, expert-curated travel hygiene guides, packing checklists, and tips for trains, flights, road trips, and weekend getaways across India.',
  keywords: [
    'travel hygiene guides',
    'packing personal care for travel',
    'train journey hygiene checklist',
    'travel essentials tips India',
    'travel packing checklist',
    'road trip travel essentials',
    'what to pack for weekend trip',
  ],
  alternates: {
    canonical: `${SITE_URL}/travel-hygiene-guides`,
  },
  openGraph: {
    title: 'Travel Hygiene Guides & Packing Advice | Traliber',
    description:
      'Practical advice for staying clean, comfortable, and prepared on journeys across India. Packing checklists for trains, flights, and road trips.',
    url: `${SITE_URL}/travel-hygiene-guides`,
    type: 'website',
    images: [
      {
        url: '/images/kit-display.webp',
        width: 1200,
        height: 630,
        alt: 'Traliber Travel Hygiene Guides and Personal Care Kit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Hygiene Guides & Packing Advice | Traliber',
    description:
      'Actionable packing checklists and transit hygiene guides for Indian travelers.',
    images: ['/images/kit-display.webp'],
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
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Travel Hygiene Guides',
        item: `${SITE_URL}/travel-hygiene-guides`,
      },
    ],
  };

  const featuredGuide = TRAVEL_GUIDES.find((g) => g.featured) || TRAVEL_GUIDES[0];
  const regularGuides = TRAVEL_GUIDES.filter((g) => g.slug !== featuredGuide.slug);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60">
              <li>
                <Link href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold">Travel Hygiene Guides</li>
            </ol>
          </nav>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block">
              PRACTICAL TRAVEL ADVICE &amp; CHECKLISTS
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.12]">
              Travel Hygiene &amp; Packing Guides
            </h1>
            <p className="text-base sm:text-lg text-[#22213A]/75 leading-relaxed font-normal">
              Actionable guides, packing checklists, and practical hygiene habits to help modern travelers stay clean, comfortable, and prepared across trains, flights, and road trips.
            </p>
          </div>

          {/* Featured Article Card */}
          {featuredGuide && (
            <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-white border border-[#22213A]/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8657F6] bg-[#8657F6]/10 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-[#8657F6]" />
                    Featured Comprehensive Guide
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B] group-hover:text-[#4F75FF] transition-colors">
                    <Link href={`/travel-hygiene-guides/${featuredGuide.slug}`}>
                      {featuredGuide.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-[#22213A]/70 leading-relaxed font-normal">
                    {featuredGuide.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#22213A]/60 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#4F75FF]" />
                      {featuredGuide.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#4F75FF]" />
                      {featuredGuide.datePublished.substring(0, 10)}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/travel-hygiene-guides/${featuredGuide.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1E1B4B] text-white font-bold text-xs uppercase tracking-wider group-hover:bg-[#4F75FF] transition-colors shadow-sm"
                  >
                    Read Guide
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Grid of All Articles */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B4B]">
              All Travel &amp; Hygiene Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularGuides.map((guide) => (
                <article
                  key={guide.slug}
                  className="p-6 rounded-2xl bg-white border border-[#22213A]/10 hover:border-[#4F75FF]/40 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#4F75FF] font-bold uppercase tracking-wider bg-[#4F75FF]/10 px-2.5 py-0.5 rounded-full">
                        {guide.category}
                      </span>
                      <span className="text-[#22213A]/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {guide.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#1E1B4B] group-hover:text-[#4F75FF] transition-colors leading-snug">
                      <Link href={`/travel-hygiene-guides/${guide.slug}`}>
                        {guide.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed line-clamp-3">
                      {guide.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#22213A]/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#22213A]/50">
                      {guide.datePublished.substring(0, 10)}
                    </span>
                    <Link
                      href={`/travel-hygiene-guides/${guide.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#4F75FF] group-hover:underline"
                    >
                      Read Guide
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom CTA to Kit */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#1E1B4B] to-[#2B2766] text-white text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Looking for a Pre-Packed Travel Hygiene Solution?
            </h3>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
              Skip sourcing 10 separate items. The Traliber Travel Essentials Kit gives you toothbrush, toothpaste, 5 sanitizers, wet wipes, towel, seat covers, face mask, paper soap, and cutlery in one water-resistant pouch.
            </p>
            <div className="pt-2">
              <Link
                href="/travel-essentials-kit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4F75FF] text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#1E1B4B] transition-colors shadow-lg"
              >
                Explore The Kit for ₹199 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
