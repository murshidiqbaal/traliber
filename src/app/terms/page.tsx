import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BRAND, getBreadcrumbSchema } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';
import { FileText, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Traliber',
  description:
    'Terms of service, purchasing conditions, intellectual property, and user terms for Traliber online travel essentials store.',
  alternates: {
    canonical: absoluteUrl('/terms'),
  },
  openGraph: {
    title: 'Terms & Conditions | Traliber',
    description:
      'Review the terms and conditions governing the purchase of Traliber travel essentials kits and website usage.',
    url: absoluteUrl('/terms'),
    type: 'website',
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms & Conditions', url: '/terms' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60">
              <li>
                <Link href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold">Terms &amp; Conditions</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F75FF] bg-[#4F75FF]/10 px-3 py-1 rounded-full inline-block mb-3">
              Legal Agreement
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B4B] tracking-tight leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm text-[#22213A]/70 font-mono">
              Last updated: October 2026 • Traliber General Store Terms
            </p>
          </div>

          {/* Policy Body Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#22213A]/[0.08] shadow-sm space-y-8 text-sm text-[#22213A]/85 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website https://traliber.in or communicating with Traliber through our WhatsApp concierge, you agree to be bound by these Terms &amp; Conditions and our related policies. If you do not agree with any portion of these terms, please refrain from using our service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">2. Business Description &amp; Products</h2>
              <p>
                Traliber is an Indian e-commerce brand selling convenient travel essentials and personal care kits. We provide curated kits containing 10 travel hygiene necessities (travel pouch, toothbrush set, travel toothpaste, 5 mini sanitizers, wet wipes, wet towel, toilet seat covers, face mask, paper soap, and cutlery kit). Traliber is an e-commerce retail service and does not act as a travel agency, tour booking operator, or airline ticket provider.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">3. Product Pricing &amp; Order Acceptance</h2>
              <p>
                All prices displayed on the website (standard price ₹199 per complete kit) are in Indian Rupees (INR). We reserve the right to revise product specifications, bundle combinations, or pricing at any time. An order placed via WhatsApp is considered accepted once delivery pincode serviceability and payment details are confirmed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">4. Proper Product Usage &amp; Disclaimers</h2>
              <p>
                The items contained within the Traliber Travel Essentials Kit are designed for everyday personal cleanliness, oral care, and travel convenience. They are not intended as medical prescriptions, pharmaceutical cures, or replacements for professional clinical hygiene advice. Please inspect product labels for personal allergen suitability before use.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">5. Intellectual Property</h2>
              <p>
                All brand logos, visual styling, kit design arrangements, website copy, imagery, and software code on https://traliber.in are the intellectual property of Traliber and are protected by applicable intellectual property and copyright laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">6. Governing Law</h2>
              <p>
                These Terms shall be governed and interpreted in accordance with the laws of India. Any legal disputes arising out of the use of this website or orders shall be subject to the exclusive jurisdiction of the competent courts in India.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-gray-100">
              <h2 className="text-base font-bold text-[#1E1B4B]">Contact Regarding Terms</h2>
              <p>
                Questions regarding our terms may be sent to{' '}
                <a href={`mailto:${BRAND.contact.email}`} className="text-[#4F75FF] font-bold hover:underline">
                  {BRAND.contact.email}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

