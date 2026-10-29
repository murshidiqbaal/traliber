import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { Clock, Calendar, CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

import { SITE_URL } from '@/lib/site';

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: 'Travel Hygiene Essentials Checklist for Long Journeys in India',
  description:
    'A practical personal care packing checklist for Indian trains, flights, and road trips. Discover essential hygiene items for clean, comfortable travel.',
  keywords: [
    'travel hygiene checklist India',
    'train journey personal care kit',
    'packing hygiene essentials travel',
    'toilet seat covers train travel India',
    'travel paper soap sheets',
  ],
  alternates: {
    canonical: '/travel-hygiene-guides/checklist-for-long-journeys',
  },
  openGraph: {
    title: 'Travel Hygiene Essentials Checklist for Long Journeys in India',
    description:
      'Practical hygiene checklist and packing tips for overnight trains, long flights, and road trips across India.',
    url: `${siteUrl}/travel-hygiene-guides/checklist-for-long-journeys`,
    type: 'article',
    publishedTime: '2026-10-21T00:00:00Z',
    authors: [`${siteUrl}/about`],
  },
};

export default function ChecklistForLongJourneysPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Travel Hygiene Essentials Checklist for Long Journeys in India',
    description:
      'A practical personal care packing checklist for Indian trains, flights, and road trips. Discover essential hygiene items for clean, comfortable travel.',
    image: `${siteUrl}/images/kit-display.webp`,
    datePublished: '2026-10-21T00:00:00Z',
    dateModified: '2026-10-21T00:00:00Z',
    author: {
      '@type': 'Organization',
      name: 'Traliber Editorial Team',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Traliber',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/travel-hygiene-guides/checklist-for-long-journeys`,
    },
  };

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
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Checklist for Long Journeys',
        item: `${siteUrl}/travel-hygiene-guides/checklist-for-long-journeys`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60 flex-wrap">
              <li>
                <a href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/travel-hygiene-guides" className="hover:text-[#4F75FF] transition-colors">
                  Guides
                </a>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold">Long Journey Checklist</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="space-y-4 mb-12 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#4F75FF] bg-[#4F75FF]/10 px-3 py-1 rounded-full">
              <span>PRACTICAL TRANSIT HYGIENE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.15]">
              The Travel Hygiene Essentials Checklist for Long Journeys in India
            </h1>

            <p className="text-base sm:text-lg text-[#22213A]/75 leading-relaxed font-normal">
              From overnight train rides across state lines to cross-country flights and highway road trips, here is the essential personal care checklist every traveler needs to stay clean and comfortable.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#22213A]/60 pt-2 border-b border-[#22213A]/[0.08] pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Updated October 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                6 min read
              </span>
              <span>•</span>
              <span>By Traliber Editorial Team</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-[#22213A]/80 text-left space-y-8 font-normal leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B]">
                The Reality of Transit Hygiene in India
              </h2>
              <p>
                Anyone who has traveled by Indian Railways, taken a late-night intercity bus, or spent four hours in a crowded airport transit lounge knows that sanitation conditions can vary wildly. Soap dispensers in public restrooms are often empty, wet washroom floors make balancing luggage precarious, and shared dining utensils at wayside stops can feel uncertain.
              </p>
              <p>
                Relying on public facilities to provide personal care products is a recipe for frustration. Carrying your own self-contained travel hygiene kit puts cleanliness squarely under your own control.
              </p>
            </section>

            {/* Pillar 1 */}
            <section className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#22213A]/[0.08]">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B4B]">
                1. Water-Independent Hand Cleanliness
              </h2>
              <p>
                Hand cleanliness is the first line of defense on journeys. The challenge during transit is that water isn&apos;t always readily accessible when you need to clean your hands before eating or after handling luggage.
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Pocket Mist Sanitizers (15ml):</strong> Fast-drying spray atomizers are lighter and cleaner to apply than gooey gel bottles that can leak over luggage.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Water-Soluble Paper Soap Sheets:</strong> When a tap is available but soap is missing, single-use dry paper sheets lather instantly with a splash of water, leaving no messy bar soap behind.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Moisture-Locked Wet Wipes:</strong> Ideal for wiping down dusty berth armrests, tray tables, or sticky hands when a basin is unavailable.</span>
                </li>
              </ul>
            </section>

            {/* Pillar 2 */}
            <section className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#22213A]/[0.08]">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B4B]">
                2. Public Washroom Barrier Protection
              </h2>
              <p>
                Using public restrooms on express trains, bus terminals, or highway fuel stations is often the most dreaded part of long-distance travel.
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Disposable Flushable Toilet Seat Covers:</strong> Compact, flat-folded paper liners create an immediate hygienic barrier between you and the seat surface. They flush away naturally without clogging standard plumbing.</span>
                </li>
              </ul>
            </section>

            {/* Pillar 3 */}
            <section className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#22213A]/[0.08]">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B4B]">
                3. Compact Oral Care Sized for Transit
              </h2>
              <p>
                Waking up after an overnight sleeper coach or 6-hour red-eye flight calls for a quick oral-care routine to feel refreshed for the day ahead.
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Travel Toothbrush with Ventilated Cap:</strong> A cap keeps toothbrush bristles protected from dirt inside your bag while ventilation slots allow bristles to dry naturally.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Compact Travel Toothpaste (10g Tube):</strong> Sized for convenience, carrying just enough paste for a multi-day trip without taking up space or weighing down your kit.</span>
                </li>
              </ul>
            </section>

            {/* Pillar 4 */}
            <section className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#22213A]/[0.08]">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E1B4B]">
                4. Personal Dining Utensils &amp; Instant Refreshment
              </h2>
              <p>
                Dining safely on the move is much easier when you don&apos;t have to rely on flimsy single-use plastic cutlery or questionable utensils.
              </p>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Dedicated Reusable Cutlery Set:</strong> A fork, spoon, knife, and chopsticks kept in a slim protective case means you can enjoy meals anywhere with confidence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Individually Sealed Wet Towel:</strong> Wipe away travel grime and transit fatigue before arriving at your meeting or hotel.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Breathable Protective Mask:</strong> Useful in crowded terminals, dusty railway platforms, or dry air-conditioned coach environments.</span>
                </li>
              </ul>
            </section>

            {/* Product Callout Card */}
            <div className="my-10 bg-[#EEF2FF] rounded-3xl p-8 border border-[#4F75FF]/20 text-left space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4F75FF] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>ALL 10 ITEMS READY-PACKED</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1E1B4B]">
                Looking for a Complete, Pre-Packed Solution?
              </h3>
              <p className="text-sm sm:text-base text-[#22213A]/80 leading-relaxed">
                The <strong>Traliber Travel Essentials Kit</strong> brings all 10 of these verified items together in one water-resistant mountain blue organizer pouch for <strong>₹199</strong>. No running to three different stores before your trip.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="/travel-essentials-kit"
                  className="px-6 py-3 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white font-bold text-xs shadow transition-all"
                >
                  Explore the 10-Item Kit Details →
                </a>
                <a
                  href={WHATSAPP_CONFIG.getLink("Hi Traliber, I read your travel hygiene guide and would like to order the kit.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Packing Advice */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B]">
                Packing Strategy: Keep Your Hygiene Kit Accessible
              </h2>
              <p>
                The most common packing mistake is burying your toiletries at the bottom of a locked duffel or suitcase. During a train halt or while waiting at a boarding gate, accessing a buried bag is difficult.
              </p>
              <p>
                Keep your compact travel hygiene pouch in your backpack&apos;s exterior pocket or in your personal under-seat bag. That way, whenever you need a wet wipe, sanitizer spray, or paper soap, it is right at your fingertips within three seconds.
              </p>
            </section>

          </div>

          {/* Back to Guides link */}
          <div className="mt-12 pt-8 border-t border-[#22213A]/[0.08] text-left">
            <a
              href="/travel-hygiene-guides"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4F75FF] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all Travel Hygiene Guides</span>
            </a>
          </div>

        </article>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
