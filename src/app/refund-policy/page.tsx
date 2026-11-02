import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BRAND, getBreadcrumbSchema } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';
import { RotateCcw, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Replacement Policy | Traliber',
  description:
    'Return, replacement, and refund policies for the Traliber Travel Essentials Kit. Clear guidelines for damaged items, transit defects, and customer resolutions.',
  alternates: {
    canonical: absoluteUrl('/refund-policy'),
  },
  openGraph: {
    title: 'Refund & Replacement Policy | Traliber',
    description:
      'Learn about Traliber return guidelines, replacement policies for damaged or defective items, and customer resolution terms.',
    url: absoluteUrl('/refund-policy'),
    type: 'website',
  },
};

export default function RefundPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Refund Policy', url: '/refund-policy' },
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
              <li className="text-[#1E1B4B] font-bold">Refund &amp; Replacement Policy</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8657F6] bg-[#8657F6]/10 px-3 py-1 rounded-full inline-block mb-3">
              Customer Protection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B4B] tracking-tight leading-tight">
              Return, Replacement &amp; Refund Policy
            </h1>
            <p className="mt-3 text-sm text-[#22213A]/70 font-mono">
              Last updated: October 2026 • Verified Customer Resolution Terms
            </p>
          </div>

          {/* Policy Body Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#22213A]/[0.08] shadow-sm space-y-8 text-sm text-[#22213A]/85 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">1. Overview &amp; Hygiene Product Classification</h2>
              <p>
                The Traliber Travel Essentials Kit contains personal hygiene, oral care, and sanitization items (such as toothbrush sets, toothpaste, sanitizers, wet wipes, and toilet seat covers). Due to sanitary and personal hygiene regulations, once the sealed protective packaging or items have been opened, general returns cannot be accepted to ensure absolute health safety for all customers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">2. Transit Damage &amp; Defective Items Replacement</h2>
              <p>
                We stand behind the quality of every product we assemble. If your package arrives with physical transit damage, defective zippers, missing contents, or damaged bottles:
              </p>
              <div className="bg-[#F8F7FC] rounded-2xl p-5 border border-dashed border-[#8657F6]/20 space-y-2">
                <p className="font-bold text-[#1E1B4B]">Hassle-Free Replacement Steps:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#22213A]/80">
                  <li>Take a short photo or video showing the damaged parcel and affected item.</li>
                  <li>Send it to our WhatsApp concierge at <strong>{BRAND.contact.phoneFormatted}</strong> within <strong>48 hours of delivery</strong>.</li>
                  <li>Our team will immediately verify and dispatch a free replacement of the damaged item or kit without delay.</li>
                </ol>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">3. Order Cancellation Before Dispatch</h2>
              <p>
                You may cancel your order free of charge at any time <strong>before the package is dispatched</strong> by our fulfillment center. Simply message our WhatsApp concierge with your name or order reference. If payment was made in advance, a 100% refund will be initiated to your original payment method.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">4. Refund Timelines &amp; Methods</h2>
              <p>
                When a refund is approved by our support team:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
                <li>Refunds are initiated within <strong>24 to 48 business hours</strong> of approval.</li>
                <li>UPI payments are credited back immediately or within 24 hours.</li>
                <li>Bank transfers and card refunds appear in your account within <strong>5 to 7 working days</strong>, subject to bank processing cycles.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-gray-100">
              <h2 className="text-base font-bold text-[#1E1B4B]">Need Immediate Assistance?</h2>
              <p>
                Our customer support team is available Monday through Saturday. Message us directly on WhatsApp at{' '}
                <a href={BRAND.contact.whatsappLink} className="text-[#4F75FF] font-bold hover:underline">
                  {BRAND.contact.phoneFormatted}
                </a>{' '}
                or email{' '}
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

