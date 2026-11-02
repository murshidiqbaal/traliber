import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BRAND, getBreadcrumbSchema } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';
import { Truck, Clock, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Traliber India',
  description:
    'Shipping policy and delivery timelines for Traliber travel essentials kits across India. Standard transit times, courier partners, and order tracking information.',
  alternates: {
    canonical: absoluteUrl('/shipping-policy'),
  },
  openGraph: {
    title: 'Shipping & Delivery Policy | Traliber',
    description:
      'Learn about Traliber shipping coverage across India, estimated delivery windows, dispatch timelines, and shipment tracking.',
    url: absoluteUrl('/shipping-policy'),
    type: 'website',
  },
};

export default function ShippingPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Shipping Policy', url: '/shipping-policy' },
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
              <li className="text-[#1E1B4B] font-bold">Shipping Policy</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F75FF] bg-[#4F75FF]/10 px-3 py-1 rounded-full inline-block mb-3">
              Pan-India Fulfillment
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B4B] tracking-tight leading-tight">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="mt-3 text-sm text-[#22213A]/70 font-mono">
              Last updated: October 2026 • Effective across India
            </p>
          </div>

          {/* Quick Summary Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#8657F6]/10 text-[#8657F6] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B4B]">Dispatch Time</h3>
              <p className="text-xs text-[#22213A]/70">Orders are packed and dispatched within 24 to 48 business hours.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B4B]">Transit Window</h3>
              <p className="text-xs text-[#22213A]/70">3 to 7 business days depending on pincode and regional transit corridors.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B4B]">India Coverage</h3>
              <p className="text-xs text-[#22213A]/70">Delivering to Tier 1, 2, and 3 serviceable postal codes across India.</p>
            </div>
          </div>

          {/* Policy Body Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#22213A]/[0.08] shadow-sm space-y-8 text-sm text-[#22213A]/85 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">1. Order Processing &amp; Dispatch</h2>
              <p>
                Every Traliber Travel Essentials Kit is carefully packed with its complete 10-item inventory inside our water-resistant organizer pouch. Once you confirm your order with our WhatsApp concierge, order processing begins immediately. Standard orders are dispatched within <strong>24 to 48 business hours</strong> (excluding national holidays and Sundays).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">2. Estimated Delivery Timelines Across India</h2>
              <p>
                Delivery timelines depend on your destination pincode:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> Estimated 2 to 4 business days.</li>
                <li><strong>Tier 2 Cities &amp; Regional Hubs:</strong> Estimated 3 to 5 business days.</li>
                <li><strong>Tier 3 Towns &amp; Remote Pincodes:</strong> Estimated 5 to 7 business days.</li>
              </ul>
              <p className="text-xs text-[#22213A]/60 italic">
                *Note: Delivery times may be influenced by regional weather events, public holidays, or local logistics disruptions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">3. Shipping Rates &amp; Transparency</h2>
              <p>
                We believe in transparent pricing. Shipping charges, if applicable to specific remote pincodes or express delivery requests, will be communicated clearly in chat by our concierge before you confirm your payment. Standard pricing for the complete kit is ₹199.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">4. Real-Time Order Tracking</h2>
              <p>
                Upon parcel handover to our verified courier partner (including India Post, Delhivery, Bluedart, or regional surface carriers), a tracking number and online tracking link are shared directly with you over WhatsApp and email.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">5. Non-Delivery or Incomplete Addresses</h2>
              <p>
                Please ensure complete address details (including house/flat number, landmark, city, and correct 6-digit postal pincode) are shared. If a parcel is returned to origin due to an incorrect phone number or inaccessible location, our concierge will coordinate a re-dispatch upon address verification.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-gray-100">
              <h2 className="text-base font-bold text-[#1E1B4B]">Questions About Your Delivery?</h2>
              <p>
                Need to confirm if your pincode is serviceable or check urgent transit options? Message our concierge on WhatsApp at{' '}
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

