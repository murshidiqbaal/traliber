'use client';

import React from 'react';
import { Package, ShieldCheck, Droplets, Compass, MessageCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore } from '@/context/TraliberStore';

export const BenefitsSection: React.FC = () => {
  const { trackWhatsAppClick } = useTraliberStore();

  const benefits = [
    {
      icon: Package,
      title: 'Compact & Ready to Pack',
      tagline: 'No More Scrambling for Toiletries',
      description:
        'Instead of hunting through multiple drawers or buying bulky full-sized bottles before a journey, Traliber brings 10 essential personal care items together in one durable, water-resistant pouch that slips easily into your backpack or cabin bag.',
      highlights: ['Pre-sorted items', 'Water-resistant travel pouch', 'Fits easily into cabin baggage'],
    },
    {
      icon: Droplets,
      title: 'Hygienic Transit Peace of Mind',
      tagline: 'Cleanliness Across Stations & Flights',
      description:
        'From railway washrooms to highway pit-stops and busy airport lounges, keep your personal hygiene in your own hands with disposable toilet seat covers, soluble paper soap sheets, individually wrapped wet towels, and pocket sanitizers.',
      highlights: ['Water-soluble paper soap', 'Flushable toilet seat covers', 'Sealed single-use wet towel'],
    },
    {
      icon: Compass,
      title: 'Carry-On Friendly Sizing',
      tagline: 'Sub-100ml personal care formats',
      description:
        'Standard toiletries often get flagged or spill inside luggage. Traliber kits feature compact formats—including a 10g sealed toothpaste tube and mini 15ml sanitizer bottles—designed to keep your journey smooth and organized.',
      highlights: ['Compact 10g travel toothpaste tube', '5x portable mist sanitizers', 'Reusable dining cutlery set'],
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Concierge',
      tagline: 'No Complex Checkout Friction',
      description:
        'Skip lengthy checkout forms and payment gateways. Chat directly with our team on WhatsApp to confirm delivery availability, ask questions about kit items, or place corporate and group travel enquiries.',
      highlights: ['Personal customer response', 'Quick dispatch tracking', 'Corporate & group enquiry support'],
    },
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28 bg-[#F4F3FA] relative overflow-hidden border-t border-[#22213A]/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block mb-3">
            WHY CHOOSE TRALIBER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.15]">
            Thoughtfully Designed For <br className="hidden sm:inline" />
            Every Kind of Journey.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#22213A]/70 leading-relaxed font-normal">
            Whether you are boarding an overnight train across India, embarking on a weekend road trip, or packing light for a flight, here is how Traliber simplifies your travel routine.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 sm:p-9 border border-[#22213A]/[0.08] shadow-[0_8px_30px_rgba(30,27,75,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F75FF] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#8657F6] uppercase tracking-wider block mb-1">
                    {benefit.tagline}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B] tracking-tight mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#22213A]/75 leading-relaxed mb-6 font-normal">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#22213A]/[0.06] space-y-2">
                  {benefit.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-[#22213A]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-12 sm:mt-16 bg-[#1E1B4B] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Ready to Upgrade Your Travel Hygiene Routine?
            </h3>
            <p className="text-sm text-gray-300 max-w-xl">
              Get the complete 10-item travel essentials kit in a water-resistant mountain blue pouch for ₹199.
            </p>
          </div>
          <a
            href={WHATSAPP_CONFIG.getLink()}
            onClick={() => trackWhatsAppClick('Benefits Section CTA')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Order via WhatsApp — ₹199</span>
          </a>
        </div>

      </div>
    </section>
  );
};
