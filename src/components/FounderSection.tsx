'use client';

import React from 'react';
import {
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Plane,
  Heart,
  Quote,
  Compass,
} from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';

export const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative ambient orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#8657F6]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#55C7DE]/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Photo & Visual Identity */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing decorative colored backdrop */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#8657F6] via-[#788CF5] to-[#55C7DE] opacity-20 blur-lg transform -rotate-1 group-hover:rotate-0 transition-transform" />

              {/* Founder Image Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-[#22213A]">
                <img
                  src="/images/founder.jpg"
                  alt="Julian Vance - Founder of Traliber"
                  className="w-full h-auto max-h-[520px] object-cover object-top hover:scale-102 transition-transform duration-500"
                />

                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#22213A]/90 via-[#22213A]/20 to-transparent pointer-events-none" />

                {/* Overlaid Founder Nameplate */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8657F6]/80 backdrop-blur-md text-3xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-white" />
                    Founder & Product Architect
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Julian Vance</h3>
                  <p className="text-xs text-white/80 font-medium">
                    Obsessed with minimalist personal-care engineering
                  </p>
                </div>
              </div>

              {/* Floating Quality / Origin Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-[#8657F6]/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8657F6] to-[#788CF5] flex items-center justify-center text-white shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#22213A]">Tested Worldwide</div>
                  <div className="text-3xs text-[#22213A]/60 font-medium">Over 30+ Transit Hubs</div>
                </div>
              </div>

              {/* Floating Guarantee Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-[#8657F6]/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#22213A]">100% Carry-On Legal</div>
                  <div className="text-3xs text-emerald-700 font-semibold">Zero Liquid Bottlenecks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Story & Founder Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F7FC] border border-[#8657F6]/25 shadow-2xs text-xs font-bold text-[#8657F6]">
              <Heart className="w-3.5 h-3.5 fill-[#8657F6]" />
              The Story Behind Traliber
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#22213A] tracking-tight leading-[1.15]">
              &ldquo;I was tired of leaking bottles in my carry-on.{' '}
              <span className="bg-gradient-to-r from-[#8657F6] via-[#788CF5] to-[#55C7DE] bg-clip-text text-transparent">
                So I reimagined travel personal care.&rdquo;
              </span>
            </h2>

            {/* Story Paragraphs - Reduced to essential narrative */}
            <div className="space-y-3.5 text-sm sm:text-base text-[#22213A]/75 leading-relaxed font-normal">
              <p>
                In 2023, a ruptured toothpaste tube under cabin pressure ruined my carry-on and sparked an obvious question:{' '}
                <strong className="text-[#22213A] font-semibold">
                  Why are travelers still wrestling with messy plastic bottles, liquid quotas, and leaky toiletries?
                </strong>
              </p>
              <p>
                That frustration created <strong className="text-[#8657F6]">Traliber</strong>. We engineered a solid-state personal care kit—replacing messy liquids with chewable mint tablets, dissolvable botanical paper soap, and compressed towels in one water-resistant pouch. Zero spills. Zero checkpoint delays.
              </p>
            </div>

            {/* Founder Sign-off & Direct WhatsApp Action */}
            <div className="pt-6 border-t border-[#8657F6]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif italic text-lg sm:text-xl text-[#22213A] font-semibold">
                  Julian Vance
                </p>
                <p className="text-xs text-[#22213A]/60">
                  Founder & Traveler, Traliber Personal Care
                </p>
              </div>

              <a
                href={WHATSAPP_CONFIG.getLink("Hi Julian, I'd like to ask a question about Traliber!")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#25D366] text-[#128C7E] hover:bg-[#25D366] hover:text-white font-bold text-xs shadow-sm transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Chat with Julian on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
