'use client';

import React from 'react';
import { MessageCircle, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore } from '@/context/TraliberStore';

export const PricingSection: React.FC = () => {
  const { trackWhatsAppClick } = useTraliberStore();

  const whatsappHref = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
    'Hi Traliber! I would like to order the Complete Travel Essentials Kit for ₹199.'
  )}`;

  const inclusions = [
    'Reusable Water-Resistant Cotton Pouch',
    'Chewable Mint Toothpaste Tablets',
    'Botanical Paper Soap Sheets (Zero Liquid)',
    'Ultra-Soft Ergonomic Toothbrush & Cap',
    'Compressed Microfiber Pocket Towel',
    'Food-Grade Reusable Travel Cutlery Set',
    'Flushable Biodegradable Toilet Seat Covers',
    '3D Ergonomic Blackout Eye Mask',
    '5x Expanding Coin Towels',
    '5x Pocket Mist Hand Sanitizers',
    '5x Refreshing Antiseptic Wet Wipes',
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block mb-3">
            HONEST &amp; TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E1B4B] tracking-tight leading-[1.14]">
            Complete Travel Freedom. <br className="hidden sm:inline" />
            One Honest Price.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#22213A]/65 leading-relaxed font-normal">
            Everything you need for clean, leak-free, and frictionless journeys — all precision-packed into one compact kit.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto bg-[#F8F7FC] rounded-3xl p-7 sm:p-10 border border-[#22213A]/[0.08] shadow-[0_8px_32px_rgba(30,27,75,0.03)] text-left relative">
          
          {/* Top Pill / Plan Name */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#22213A]/[0.08] pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8657F6] bg-[#8657F6]/10 px-3 py-1 rounded-full mb-1.5">
                <Sparkles className="w-3 h-3 text-[#8657F6]" />
                THE COMPLETE 10-ITEM TRAVEL KIT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B] tracking-tight">
                Traliber Personal Care Essentials
              </h3>
            </div>

            {/* Price Highlight */}
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="text-4xl sm:text-5xl font-serif font-extrabold text-[#1E1B4B]">
                  ₹199
                </span>
                <span className="text-xs font-mono text-[#22213A]/50">/ kit</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                All 10 Essentials Included
              </span>
            </div>
          </div>

          {/* Included Features Grid */}
          <div className="py-7">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E1B4B]/80 mb-4">
              What&apos;s Included In Your Kit:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-[#22213A]/80">
              {inclusions.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 border-t border-b border-[#22213A]/[0.08] text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-[#22213A]/[0.05] flex items-center justify-center gap-2 text-[#1E1B4B]">
              <ShieldCheck className="w-4 h-4 text-[#4F75FF]" />
              <span className="font-semibold">100% TSA Carry-on Legal</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#22213A]/[0.05] flex items-center justify-center gap-2 text-[#1E1B4B]">
              <Zap className="w-4 h-4 text-[#8657F6]" />
              <span className="font-semibold">Zero Liquid Leaks</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#22213A]/[0.05] flex items-center justify-center gap-2 text-[#1E1B4B]">
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Dispatched in 24 Hours</span>
            </div>
          </div>

          {/* Order Action Button */}
          <div className="pt-6 space-y-3">
            <a
              href={whatsappHref}
              onClick={() => trackWhatsAppClick('Pricing Section CTA')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] active:scale-[0.99] text-white text-sm font-bold shadow-lg shadow-[#1E1B4B]/15 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Order via WhatsApp — ₹199</span>
            </a>
            <p className="text-center text-[11px] text-[#22213A]/50">
              No complicated checkout forms. Simply message our team to confirm your address and dispatch.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
