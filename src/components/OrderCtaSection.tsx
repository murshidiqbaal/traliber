'use client';

import React, { useState } from 'react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import {
  MessageCircle,
  CheckCircle,
  Truck,
  Shield,
  HelpCircle,
  ChevronDown,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';

export const OrderCtaSection: React.FC = () => {
  const [selectedBundle, setSelectedBundle] = useState<string>('duo');
  const [customerCity, setCustomerCity] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const bundles = [
    {
      id: 'solo',
      title: 'Solo Explorer Kit',
      subtitle: '1x Complete 10-Item Travel Kit',
      price: '$39',
      badge: 'Starter',
      popular: false,
    },
    {
      id: 'duo',
      title: 'Duo Journey Pack',
      subtitle: '2x Complete 10-Item Kits + Free Refill Pack',
      price: '$69',
      badge: 'Most Popular',
      popular: true,
    },
    {
      id: 'family',
      title: 'Voyage Family Pack',
      subtitle: '4x Complete Kits + Complimentary Shipping',
      price: '$129',
      badge: 'Best Value',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Is every item in the Traliber kit TSA carry-on compliant?',
      answer:
        'Yes, 100%. By replacing liquid toothpaste with chewable tabs and liquid hand soap with dry paper leaves, you bypass strict liquid volume restrictions and avoid bag-check delays completely.',
    },
    {
      question: 'How do I place my order via WhatsApp?',
      answer:
        'Simply click "Order via WhatsApp". A direct chat opens with our team pre-populated with your chosen bundle. We confirm your delivery address and send instant order tracking.',
    },
    {
      question: 'Can I purchase refills for individual items?',
      answer:
        'Yes! We offer refill packs for Tablet Paste, Paper Soap leaves, Mini Sanitizer vials, and Wet Wipes so you can reuse your durable Cotton Pouch for years of journeys.',
    },
    {
      question: 'What are the delivery timelines?',
      answer:
        'Orders are packed and dispatched within 24 hours. Express shipping takes 2–4 business days with end-to-end tracking updates sent directly to your WhatsApp.',
    },
  ];

  // Dynamic WhatsApp pre-filled message generator
  const getDynamicOrderLink = () => {
    const bundleObj = bundles.find((b) => b.id === selectedBundle) || bundles[1];
    let note = `Selected Bundle: ${bundleObj.title} (${bundleObj.price})`;
    if (customerCity.trim()) {
      note += ` | Destination: ${customerCity.trim()}`;
    }
    return WHATSAPP_CONFIG.getLink(note);
  };

  return (
    <section id="order-section" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] text-xs font-bold uppercase tracking-wider mb-3">
            <MessageCircle className="w-4 h-4 fill-current" />
            SECTION 5: Quick WhatsApp Ordering
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#22213A] tracking-tight">
            Order Your Travel Kit in 30 Seconds
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#22213A]/70">
            No endless checkout forms or account creation required. Chat directly with our personal concierge team on WhatsApp to confirm your kit and delivery.
          </p>
        </div>

        {/* Bundle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 max-w-5xl mx-auto">
          {bundles.map((bundle) => {
            const isSelected = selectedBundle === bundle.id;
            return (
              <div
                key={bundle.id}
                onClick={() => setSelectedBundle(bundle.id)}
                className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#8657F6] bg-gradient-to-b from-white to-[#F8F7FC] shadow-2xl scale-103'
                    : 'border-[#22213A]/10 bg-white hover:border-[#8657F6]/40 shadow-sm'
                }`}
              >
                {bundle.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#8657F6] to-[#788CF5] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {bundle.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#788CF5]">
                      {bundle.badge}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-[#8657F6] bg-[#8657F6]'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#22213A]">
                    {bundle.title}
                  </h3>
                  <p className="text-xs text-[#22213A]/70 mt-1 mb-6">
                    {bundle.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-[#22213A]">
                      {bundle.price}
                    </span>
                    <span className="text-xs text-[#22213A]/50">/ complete pack</span>
                  </div>

                  <ul className="space-y-2 text-xs text-[#22213A]/80 pt-4 border-t border-[#22213A]/10">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>All 10 Certified Travel Essentials</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Organic Cotton Pouch Included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>TSA Airline Carry-On Compliant</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <div
                    className={`w-full py-2.5 rounded-xl text-center text-xs font-extrabold transition-colors ${
                      isSelected
                        ? 'bg-[#8657F6] text-white shadow-md'
                        : 'bg-[#F8F7FC] text-[#22213A] group-hover:bg-[#8657F6]/10'
                    }`}
                  >
                    {isSelected ? '✓ Selected Bundle' : 'Select Bundle'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Custom Order Box */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-[#22213A] via-[#2A2748] to-[#1C1B2E] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#55C7DE]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
            <h3 className="text-2xl font-extrabold tracking-tight">
              Ready to Order on WhatsApp?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Enter your destination city (optional) and click below to open your order in WhatsApp:
            </p>

            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter delivery city or country (optional)"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#55C7DE] transition-colors"
              />
            </div>

            <div className="pt-2">
              <a
                href={getDynamicOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold text-base shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span>Order via WhatsApp Now</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#55C7DE]" />
                <span>Fast Worldwide Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#8657F6]" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#25D366]" />
                <span>Dedicated Support Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#22213A]">
              Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#22213A]/10 overflow-hidden bg-[#F8F7FC] transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#22213A] hover:text-[#8657F6] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8657F6] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-[#22213A]/75 leading-relaxed border-t border-[#22213A]/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
