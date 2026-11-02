import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { BRAND, getBreadcrumbSchema } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';
import { MessageCircle, Phone, Mail, Clock, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Traliber | WhatsApp Concierge & Support',
  description:
    'Get in touch with the Traliber team. Order via WhatsApp concierge, request shipping updates, or inquire about corporate and bulk travel kits.',
  alternates: {
    canonical: absoluteUrl('/contact'),
  },
  openGraph: {
    title: 'Contact Traliber | Travel Essentials Customer Care',
    description:
      'Direct contact information and WhatsApp concierge for Traliber. Order travel essentials kits, check delivery timelines across India, or ask questions.',
    url: absoluteUrl('/contact'),
    type: 'website',
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact & Support', url: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60">
              <li>
                <Link href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold">Contact &amp; Support</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F75FF] bg-[#4F75FF]/10 px-3 py-1 rounded-full inline-block mb-3">
              Direct Customer Support
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B4B] tracking-tight leading-tight">
              Get in Touch with Traliber
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#22213A]/70 leading-relaxed font-normal">
              Whether you are placing an order for our 10-item Travel Essentials Kit, tracking an existing shipment across India, or requesting corporate travel kits, our team is directly accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Channel: WhatsApp Concierge */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#8657F6]/15 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1E1B4B]">WhatsApp Concierge</h2>
                  <p className="text-xs text-[#22213A]/60 font-mono">Fastest response channel</p>
                </div>
              </div>

              <p className="text-sm text-[#22213A]/80 leading-relaxed">
                Traliber operates a direct concierge model. You can message us directly on WhatsApp to place orders, confirm delivery pincodes, request tracking links, or ask product questions.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#22213A]/75">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct conversation with our verified team</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time pincode serviceability checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dispatch tracking details sent straight to your chat</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={BRAND.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open WhatsApp Concierge ({BRAND.contact.phoneFormatted})</span>
                </a>
              </div>
            </div>

            {/* Support Details Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {/* Communication Details Card */}
              <div className="bg-white rounded-3xl p-7 border border-[#22213A]/[0.08] shadow-sm space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E1B4B]/80 font-mono">
                  Official Contact Channels
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#4F75FF] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#1E1B4B]">Phone / WhatsApp</p>
                      <p className="text-[#22213A]/70 font-mono mt-0.5">{BRAND.contact.phoneFormatted}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#8657F6] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#1E1B4B]">Email Support</p>
                      <p className="text-[#22213A]/70 font-mono mt-0.5">{BRAND.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#1E1B4B]">Operating Hours</p>
                      <p className="text-[#22213A]/70 mt-0.5">{BRAND.contact.customerServiceHours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#1E1B4B]">Delivery Scope</p>
                      <p className="text-[#22213A]/70 mt-0.5">Pan-India Courier Shipping across all serviceable pin codes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Workflow Card */}
              <div className="bg-[#F1EFFF] rounded-3xl p-7 border border-[#8657F6]/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>How Ordering Works</span>
                </div>
                <ol className="text-xs text-[#22213A]/80 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Click WhatsApp Concierge and send the pre-filled inquiry.</li>
                  <li>Share your delivery address and recipient contact details.</li>
                  <li>Confirm order and receive shipment tracking once dispatched.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

