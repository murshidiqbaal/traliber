'use client';

import React from 'react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import {
  MessageCircle,
  ShieldCheck,
  Leaf,
  Briefcase,
} from 'lucide-react';
import { useTraliberStore } from '@/context/TraliberStore';

export const HeroSection: React.FC = () => {
  const { trackWhatsAppClick, getProductImage, getCustomText } = useTraliberStore();

  const heroBg = getProductImage('hero_background', '/images/hero-alpine-pouch.jpg');
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
  const heroAnnotation = getCustomText('hero_annotation', "Ready for what's next");

  const badge1Title = getCustomText('hero_badge1_title', 'CLEAN');
  const badge1Sub = getCustomText('hero_badge1_sub', 'Essentials');
  const badge2Title = getCustomText('hero_badge2_title', 'SAFE');
  const badge2Sub = getCustomText('hero_badge2_sub', 'Travel');
  const badge3Title = getCustomText('hero_badge3_title', 'TRAVEL');
  const badge3Sub = getCustomText('hero_badge3_sub', 'Friendly');

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-no-repeat bg-cover md:bg-[length:100%_auto] lg:bg-cover"
      style={{
        backgroundImage: `url('${heroBg}')`,
        backgroundPosition: '85% center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[75vh]">
          {/* Left Column: Value Proposition & Typography */}
          <div className="lg:col-span-6 text-left space-y-6 sm:space-y-7 pt-4 relative">
            {/* Layered Smoky Gradient Background - strictly behind text */}
            <div className="absolute -inset-6 sm:-inset-10 -z-10 pointer-events-none select-none overflow-visible">
              {/* Layer 1: Core mist plume */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-90"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 45%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.6) 45%, rgba(255, 255, 255, 0) 75%)',
                }}
              />
              {/* Layer 2: Diffused ambient smoke spread */}
              <div
                className="absolute -inset-6 sm:-inset-10 rounded-3xl blur-3xl opacity-80"
                style={{
                  background:
                    'radial-gradient(ellipse at 25% 55%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 244, 255, 0.45) 45%, rgba(255, 255, 255, 0) 75%)',
                }}
              />
              {/* Layer 3: Upper atmospheric smoke feather */}
              <div
                className="absolute -top-10 -left-10 w-full h-3/4 blur-2xl opacity-70"
                style={{
                  background:
                    'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 65%)',
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
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>{heroCtaText}</span>
                <span className="text-base font-light transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* 3 Circular Feature Badges */}
            <div className="pt-4 flex items-center gap-6 sm:gap-8">
              {/* Badge 1: Clean */}
              <div className="flex flex-col items-center text-center gap-1.5 group cursor-default">
                <div className="w-12 h-12 rounded-full border border-[#22213A]/20 bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                  <Leaf className="w-5 h-5 text-[#22213A]" />
                </div>
                <div>
                  <span className="block text-[11px] font-extrabold text-[#22213A] uppercase tracking-wider">
                    {badge1Title}
                  </span>
                  <span className="block text-[10px] text-[#22213A]/70 font-medium">
                    {badge1Sub}
                  </span>
                </div>
              </div>

              {/* Badge 2: Safe */}
              <div className="flex flex-col items-center text-center gap-1.5 group cursor-default">
                <div className="w-12 h-12 rounded-full border border-[#22213A]/20 bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                  <ShieldCheck className="w-5 h-5 text-[#22213A]" />
                </div>
                <div>
                  <span className="block text-[11px] font-extrabold text-[#22213A] uppercase tracking-wider">
                    {badge2Title}
                  </span>
                  <span className="block text-[10px] text-[#22213A]/70 font-medium">
                    {badge2Sub}
                  </span>
                </div>
              </div>

              {/* Badge 3: Travel Friendly */}
              <div className="flex flex-col items-center text-center gap-1.5 group cursor-default">
                <div className="w-12 h-12 rounded-full border border-[#22213A]/20 bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                  <Briefcase className="w-5 h-5 text-[#22213A]" />
                </div>
                <div>
                  <span className="block text-[11px] font-extrabold text-[#22213A] uppercase tracking-wider">
                    {badge3Title}
                  </span>
                  <span className="block text-[10px] text-[#22213A]/70 font-medium">
                    {badge3Sub}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hand-drawn script annotation pointing to the pouch */}
          <div className="lg:col-span-6 relative flex flex-col items-end justify-between min-h-[300px] lg:min-h-[500px]">
            {/* Hand-drawn annotation */}
            <div className="hidden sm:flex items-center gap-2 self-end lg:mr-8 mt-4 select-none">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#22213A] rotate-[-4deg]">
                {heroAnnotation}
              </span>
              <svg
                className="w-10 h-8 text-[#22213A] -rotate-12 translate-y-1"
                viewBox="0 0 50 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 5 20 Q 25 5 42 16" />
                <path d="M 36 10 L 44 16 L 38 22" />
              </svg>
            </div>

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
