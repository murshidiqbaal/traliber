import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { ShieldCheck, Compass, Sparkles, MessageCircle, HeartHandshake, Eye } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.traliber.com';

export const metadata: Metadata = {
  title: 'About Traliber | For a Cleaner Tomorrow',
  description:
    'Learn about Traliber, our brand story, and our mission to simplify personal hygiene for modern travelers on trains, flights, and road trips.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Traliber | Our Story and Mission',
    description:
      'Discover how Traliber is rethinking travel hygiene and personal care essentials for smoother journeys.',
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
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
        name: 'About Traliber',
        item: `${siteUrl}/about`,
      },
    ],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aldrino Francis',
    jobTitle: 'Founder & Product Architect',
    worksFor: {
      '@type': 'Organization',
      name: 'Traliber',
      url: siteUrl,
    },
    image: `${siteUrl}/images/aldrino.jpeg`,
    description:
      'Founder and product architect at Traliber, focused on creating thoughtful travel essentials and hygiene kits.',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
              <li className="text-[#1E1B4B] font-bold">About Traliber</li>
            </ol>
          </nav>

          {/* Page Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block">
              OUR MISSION &amp; STORY
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.12]">
              For a Cleaner Tomorrow.
            </h1>
            <p className="text-base sm:text-lg text-[#22213A]/75 leading-relaxed">
              Traliber was founded on a simple observation: travel is one of life’s greatest adventures, but managing personal care and hygiene on the road is often needlessly frustrating.
            </p>
          </div>

          {/* Founder Story Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#22213A]/[0.08] shadow-[0_8px_30px_rgba(30,27,75,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden bg-[#F8F7FC] border border-[#22213A]/[0.06] shadow-md">
                <img
                  src="/images/aldrino.jpeg"
                  alt="Aldrino Francis, Founder & Product Architect of Traliber"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#8657F6] bg-[#8657F6]/10 px-3 py-1 rounded-full">
                <span>FOUNDER’S PERSPECTIVE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B]">
                &ldquo;Cleanliness away from home shouldn&apos;t be an afterthought.&rdquo;
              </h2>
              <p className="text-sm sm:text-base text-[#22213A]/75 leading-relaxed font-normal">
                During extended transit days across trains and flights, founder <strong>Aldrino Francis</strong> found himself repeatedly scrambling for basic necessities: finding a clean bar of soap at a railway washroom, keeping toothbrush bristles hygienic inside luggage, or wishing for a sanitary barrier on public seats.
              </p>
              <p className="text-sm sm:text-base text-[#22213A]/75 leading-relaxed font-normal">
                Traditional travel retail forced people to buy dozens of separate full-sized bottles or settle for empty organizer pouches. Traliber was designed to solve this directly: a single, coordinated kit containing 10 essential items, pre-packed in a durable mountain-themed pouch.
              </p>
              <div className="pt-2 text-xs font-mono text-[#22213A]/60">
                — Aldrino Francis, Founder &amp; Product Architect
              </div>
            </div>
          </div>

          {/* Brand Pillars */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B] text-center mb-10">
              What Guides Our Design
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-3xl p-7 border border-[#22213A]/[0.08] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F75FF] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#1E1B4B]">Intentional Essentials</h3>
                <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed">
                  We don&apos;t fill kits with useless gimmicks. Every single item in the Traliber kit serves a genuine need during transit, dining, or public washroom use.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#22213A]/[0.08] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#8657F6] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#1E1B4B]">Realistic Transparency</h3>
                <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed">
                  We state real item quantities, real specifications, and honest utility. No exaggerated medical promises, just dependable travel companions.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#22213A]/[0.08] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-emerald-600 flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#1E1B4B]">Personal Concierge</h3>
                <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed">
                  Ordering through WhatsApp lets travelers talk to real people, check shipping coverage in their area, and get answers before ordering.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-[#1E1B4B] rounded-3xl p-8 sm:p-10 text-white text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Connect With Us
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto">
              Have questions about our brand story, bulk travel kits, or partnerships? Message us directly on WhatsApp.
            </p>
            <div className="pt-2">
              <a
                href={WHATSAPP_CONFIG.getLink("Hi Traliber, I would like to get in touch regarding your brand story.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with Traliber Concierge</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
