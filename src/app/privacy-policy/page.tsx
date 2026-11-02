import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BRAND, getBreadcrumbSchema } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Traliber',
  description:
    'Learn how Traliber collects, protects, and handles customer personal data and order communication across our website and WhatsApp concierge.',
  alternates: {
    canonical: absoluteUrl('/privacy-policy'),
  },
  openGraph: {
    title: 'Privacy Policy | Traliber',
    description:
      'Information on Traliber user data privacy, customer confidentiality, and communication practices.',
    url: absoluteUrl('/privacy-policy'),
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
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
              <li className="text-[#1E1B4B] font-bold">Privacy Policy</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
              Data Privacy &amp; Trust
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B4B] tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-[#22213A]/70 font-mono">
              Last updated: October 2026 • Traliber Customer Data Protection
            </p>
          </div>

          {/* Policy Body Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#22213A]/[0.08] shadow-sm space-y-8 text-sm text-[#22213A]/85 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">1. Introduction &amp; Commitment</h2>
              <p>
                Traliber (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to safeguarding the personal privacy of visitors and customers who browse https://traliber.in and communicate with our customer service team. This Privacy Policy details the types of information we collect, how it is used, and how your data is protected.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">2. Information We Collect</h2>
              <p>
                We only collect information necessary to fulfill customer inquiries and deliver your travel kit orders:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
                <li><strong>Contact Details:</strong> Your name, mobile/WhatsApp telephone number, and email address shared voluntarily during ordering.</li>
                <li><strong>Shipping Information:</strong> Physical delivery address, city, state, postal pincode, and relevant landmarks for courier delivery.</li>
                <li><strong>Technical Data:</strong> Standard anonymized website metrics (such as browser type, operating system, and referral source) used solely for performance optimization.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">3. How Your Information Is Used</h2>
              <p>
                The data you provide is used exclusively for legitimate business purposes:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
                <li>Confirming your order details and processing dispatch across India.</li>
                <li>Sending shipment tracking numbers and transit status updates via WhatsApp.</li>
                <li>Responding to product inquiries, bulk order questions, or customer service requests.</li>
                <li>Preventing fraudulent transactions and ensuring parcel delivery.</li>
              </ul>
              <p className="font-semibold text-xs text-[#1E1B4B]">
                We do not sell, rent, trade, or monetize your personal information to third-party advertisers or data brokers under any circumstances.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">4. Third-Party Service Providers</h2>
              <p>
                To deliver our products, we share necessary shipping information (recipient name, address, and telephone number) with verified logistics partners (such as Delhivery, Bluedart, or India Post) strictly for the purpose of completing parcel delivery.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#1E1B4B]">5. Data Security &amp; Retention</h2>
              <p>
                We implement industry-standard organizational and technical safeguards to keep customer records secure. Order records and communication logs are retained only as long as necessary for tax compliance, accounting, and customer support.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-gray-100">
              <h2 className="text-base font-bold text-[#1E1B4B]">Privacy Questions &amp; Data Requests</h2>
              <p>
                If you have questions regarding your data or wish to request data deletion, contact our privacy contact at{' '}
                <a href={`mailto:${BRAND.contact.email}`} className="text-[#4F75FF] font-bold hover:underline">
                  {BRAND.contact.email}
                </a>{' '}
                or message{' '}
                <a href={BRAND.contact.whatsappLink} className="text-[#4F75FF] font-bold hover:underline">
                  {BRAND.contact.phoneFormatted}
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

