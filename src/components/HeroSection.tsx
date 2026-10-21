'use client';

import React from 'react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { MessageCircle } from 'lucide-react';
import { useTraliberStore } from '@/context/TraliberStore';

export const HeroSection: React.FC = () => {
  const { trackWhatsAppClick, getProductImage, getCustomText } = useTraliberStore();

  const heroBg = getProductImage('hero_background', '/images/hero-alpine-mountain.webp');
  const heroEyebrow = getCustomText('hero_eyebrow', 'TRAVEL ✦ ESSENTIALS');
  const heroHeadline1 = getCustomText('hero_headline_1', 'Smaller');
  const heroHeadline2 = getCustomText('hero_headline_2', 'Bag.');
  const heroHeadline3 = getCustomText('hero_headline_3', 'Brighter');
  const heroHeadline4 = getCustomText('hero_headline_4', 'Journeys.');
  const heroSubtitle = getCustomText(
    'hero_subtitle',
    'Ten thoughtfully chosen travel essentials for a cleaner, safer and more comfortable tomorrow.'
  );
  const heroCtaText = getCustomText('hero_cta_text', 'Get Your Travel Kit');

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-no-repeat"
      style={{
        backgroundImage: `url('${heroBg}')`,
        backgroundSize: 'cover',
        backgroundPosition: '95% center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[65vh]">
          {/* Left Column: Value Proposition & Typography */}
          <div className="lg:col-span-6 text-left space-y-6 sm:space-y-7 pt-4 relative">
            {/* Layered White Smoke Background — strictly localized behind the text */}
            <div className="absolute -inset-6 sm:-inset-10 -z-10 pointer-events-none select-none overflow-visible">
              {/* Layer 1: Core dense white mist directly behind headline & subtitle */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-90"
                style={{
                  background:
                    'radial-gradient(ellipse at 35% 50%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.7) 45%, rgba(255, 255, 255, 0) 75%)',
                }}
              />
              {/* Layer 2: Soft diffused ambient smoke feathering into natural valley mist */}
              <div
                className="absolute -inset-4 sm:-inset-8 rounded-3xl blur-3xl opacity-80"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 55%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0) 80%)',
                }}
              />
              {/* Layer 3: Upper soft atmospheric plume near eyebrow & top headline */}
              <div
                className="absolute -top-6 -left-6 w-full h-3/4 blur-2xl opacity-75"
                style={{
                  background:
                    'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 55%, rgba(255, 255, 255, 0) 75%)',
                }}
              />
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#22213A]/70 uppercase">
              <span>{heroEyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-extrabold text-[#22213A] tracking-tight leading-[1.04]">
              {heroHeadline1}<br />
              {heroHeadline2}<br />
              <span className="text-[#4F75FF]">{heroHeadline3}</span><br />
              {heroHeadline4}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#22213A]/80 font-normal max-w-md leading-relaxed">
              {heroSubtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-1">
              <a
                href={WHATSAPP_CONFIG.getLink()}
                onClick={() => trackWhatsAppClick('Hero Section CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>{heroCtaText}</span>
                <span className="text-base font-light transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Scroll indicator */}
          <div className="lg:col-span-6 relative flex flex-col items-end justify-end min-h-[100px] lg:min-h-[500px]">
            {/* Bottom Right Scroll Indicator */}
            <div className="mt-auto pt-12 self-end">
              <a
                href="#whats-inside"
                className="flex flex-col items-center gap-1.5 text-[#22213A]/80 hover:text-[#1E1B4B] transition-colors group cursor-pointer"
              >
                <div className="w-5 h-8 rounded-full border-2 border-[#22213A]/60 flex justify-center pt-1.5 group-hover:border-[#1E1B4B]">
                  <div className="w-1 h-2 rounded-full bg-[#22213A] animate-bounce" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  SCROLL TO EXPLORE
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
