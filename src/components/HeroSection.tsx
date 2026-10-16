'use client';

import React from 'react';
import { WHATSAPP_CONFIG, TRALIBER_POUCH } from '@/data/traliber-kit';
import {
  MessageCircle,
  ArrowDown,
  ShieldCheck,
  Plane,
  Sparkles,
  Leaf,
  Star,
} from 'lucide-react';
import { useTraliberStore } from '@/context/TraliberStore';

export const HeroSection: React.FC = () => {
  const { trackWhatsAppClick, getProductImage } = useTraliberStore();
  const pouchImage = getProductImage('cotton-pouch-closed', TRALIBER_POUCH.closedImage);
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 bg-[#F8F7FC] overflow-hidden">
      {/* Background Studio Light Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[850px] h-[600px] md:h-[850px] rounded-full bg-gradient-to-tr from-[#8657F6]/10 via-[#788CF5]/10 to-[#55C7DE]/15 blur-3xl" />
        <div className="absolute top-12 left-10 w-64 h-64 rounded-full bg-[#8657F6]/5 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#55C7DE]/8 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#8657F6]/25 shadow-sm text-xs font-bold text-[#22213A]">
              <span className="w-2 h-2 rounded-full bg-[#8657F6] animate-pulse" />
              <span className="bg-gradient-to-r from-[#8657F6] to-[#788CF5] bg-clip-text text-transparent">
                All-in-One Personal Care
              </span>
              <span className="text-[#22213A]/30">|</span>
              <span className="text-[#22213A]/70 font-semibold">10 Essentials</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#22213A] tracking-tight leading-[1.1]">
              Travel Light.{' '}
              <span className="bg-gradient-to-r from-[#8657F6] via-[#788CF5] to-[#55C7DE] bg-clip-text text-transparent">
                Stay Clean.
              </span>
              <br />
              Every Journey.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#22213A]/75 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Thoughtfully curated personal-care travel essentials, precision-packed inside a compact cotton pouch. No bulky liquids, no airport stress, zero compromise on personal hygiene.
            </p>

            {/* Key Trust Signals */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-[#22213A]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-[#22213A]/5 shadow-2xs">
                <Plane className="w-3.5 h-3.5 text-[#8657F6]" />
                <span>100% TSA Carry-On Safe</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-[#22213A]/5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#55C7DE]" />
                <span>Zero Liquid Leaks</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-[#22213A]/5 shadow-2xs">
                <Leaf className="w-3.5 h-3.5 text-[#788CF5]" />
                <span>Eco-Conscious Materials</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#kit-reveal"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#22213A] text-white font-bold text-sm shadow-lg shadow-[#22213A]/20 hover:bg-[#8657F6] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Scroll to Unpack Kit</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>

              <a
                href={WHATSAPP_CONFIG.getLink()}
                onClick={() => trackWhatsAppClick('Hero Section CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm shadow-lg shadow-[#25D366]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#22213A]/70">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-[#22213A]">4.9/5 Rating</span>
              <span>•</span>
              <span>Loved by 14,000+ travelers worldwide</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Presentation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Glass Base */}
            <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-[#8657F6]/20 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-dashed border-[#55C7DE]/25 pointer-events-none" />

              {/* Main Closed Kit Pouch */}
              <div className="relative z-10 p-4 transition-transform duration-500 hover:scale-105">
                <img
                  src={pouchImage}
                  alt="Traliber Closed Cotton Travel Pouch"
                  className="w-full h-auto drop-shadow-2xl select-none"
                  loading="eager"
                />
              </div>

              {/* Floating Feature Tags */}
              <div className="absolute -top-2 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#8657F6]/20 shadow-md text-[11px] font-bold text-[#22213A] flex items-center gap-1.5 animate-bounce-slow">
                <Sparkles className="w-3.5 h-3.5 text-[#8657F6]" />
                100% Organic Canvas
              </div>

              <div className="absolute bottom-6 -left-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#55C7DE]/25 shadow-md text-[11px] font-bold text-[#22213A] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#55C7DE]" />
                TSA Chewable Tabs
              </div>

              <div className="absolute -bottom-2 right-8 bg-[#22213A] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-lg">
                Compact • 22cm
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Downward prompt directly guiding to Section 2 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] font-bold text-[#8657F6] tracking-wider uppercase opacity-80 hover:opacity-100 transition-opacity">
        <a href="#kit-reveal" className="flex flex-col items-center gap-1">
          <span>Scroll to unpack kit</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
