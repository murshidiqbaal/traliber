'use client';

import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  Heart,
  PackageCheck,
} from 'lucide-react';

import { useTraliberStore } from '@/context/TraliberStore';

export const WhatsInsideSection: React.FC = () => {
  const { getProductImage, getCustomText } = useTraliberStore();

  const burstImg = getProductImage('whats_inside_burst', '/images/kit-burst-alpine.jpg');
  const eyebrow = getCustomText('whats_inside_eyebrow', "— WHAT'S INSIDE");
  const headlinePrefix = getCustomText('whats_inside_headline_prefix', 'Ten little things.');
  const headlineSuffix = getCustomText('whats_inside_headline_suffix', 'A big difference.');
  const subtitle = getCustomText(
    'whats_inside_subtitle',
    'Everything you need to feel fresh, prepared and comfortable — all in one compact companion.'
  );
  const leftNote = getCustomText('whats_inside_left_note', 'Essentials for everyday journeys');
  const rightNote = getCustomText('whats_inside_right_note', 'Packed for a cleaner tomorrow');

  const dock1Title = getCustomText('dock1_title', 'Oral & Personal');
  const dock1Sub = getCustomText('dock1_sub', 'Stay fresh, wherever you go.');
  const dock2Title = getCustomText('dock2_title', 'Sanitization & Hygiene');
  const dock2Sub = getCustomText('dock2_sub', 'Be prepared for every moment.');
  const dock3Title = getCustomText('dock3_title', 'Comfort & Utility');
  const dock3Sub = getCustomText('dock3_sub', 'Little comforts, bigger journeys.');
  const dock4Title = getCustomText('dock4_title', 'All 10 Essentials');
  const dock4Sub = getCustomText('dock4_sub', 'One compact travel companion.');

  return (
    <section
      id="whats-inside"
      className="relative w-full bg-[#F8F7FC] pt-12 sm:pt-16 pb-20 sm:pb-24 overflow-hidden border-b border-[#8657F6]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-mono font-bold tracking-widest text-[#22213A]/60 uppercase">
            {eyebrow}
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#22213A] tracking-tight leading-[1.08]">
            {headlinePrefix}<br />
            <span className="text-[#4F75FF]">{headlineSuffix}</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#22213A]/75 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Centerpiece: Open Pouch with 10 Floating Travel Essentials */}
        <div className="relative max-w-4xl mx-auto my-6 sm:my-10 flex items-center justify-center">
          {/* Main Visual Image */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white/40">
            <img
              src={burstImg}
              alt="Traliber Travel Kit with 10 essentials revealed"
              className="w-full h-auto object-contain select-none transition-transform duration-700 hover:scale-[1.02]"
              loading="eager"
            />

            {/* Hand-drawn annotation: Left */}
            <div className="absolute top-1/4 left-3 sm:left-8 z-20 flex flex-col items-start select-none pointer-events-none">
              <span className="font-handwriting text-xl sm:text-2xl md:text-3xl text-[#22213A] rotate-[-6deg] drop-shadow-xs max-w-[140px] sm:max-w-none text-left leading-tight">
                {leftNote}
              </span>
              <svg
                className="w-12 sm:w-16 h-10 sm:h-12 text-[#22213A] translate-x-4 sm:translate-x-8 -translate-y-1 rotate-[20deg]"
                viewBox="0 0 70 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 10 10 Q 40 10 55 35" />
                <path d="M 45 32 L 55 35 L 56 24" />
              </svg>
            </div>

            {/* Hand-drawn annotation: Right */}
            <div className="absolute top-1/3 right-3 sm:right-8 z-20 flex flex-col items-end select-none pointer-events-none">
              <span className="font-handwriting text-xl sm:text-2xl md:text-3xl text-[#22213A] rotate-[4deg] drop-shadow-xs max-w-[140px] sm:max-w-none text-right leading-tight">
                {rightNote}
              </span>
              <svg
                className="w-12 sm:w-16 h-10 sm:h-12 text-[#22213A] -translate-x-4 sm:-translate-x-8 translate-y-1 rotate-[-20deg]"
                viewBox="0 0 70 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 60 10 Q 30 15 15 38" />
                <path d="M 15 28 L 15 38 L 26 36" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Floating Pill Dock Bar */}
        <div className="mt-10 sm:mt-14 max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl sm:rounded-full shadow-[0_15px_50px_rgba(34,33,58,0.08)] border border-gray-100 p-4 sm:p-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-gray-200/80">
            {/* Category 1: Oral & Personal */}
            <div className="flex items-center gap-3.5 px-3 sm:px-4 py-1 text-left">
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-[#22213A] shadow-2xs shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#22213A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#22213A]">
                  {dock1Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/60 font-medium">
                  {dock1Sub}
                </p>
              </div>
            </div>

            {/* Category 2: Sanitization & Hygiene */}
            <div className="flex items-center gap-3.5 px-3 sm:px-4 py-1 text-left">
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-[#22213A] shadow-2xs shrink-0">
                <Sparkles className="w-4 h-4 text-[#22213A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#22213A]">
                  {dock2Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/60 font-medium">
                  {dock2Sub}
                </p>
              </div>
            </div>

            {/* Category 3: Comfort & Utility */}
            <div className="flex items-center gap-3.5 px-3 sm:px-4 py-1 text-left">
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-[#22213A] shadow-2xs shrink-0">
                <Heart className="w-4 h-4 text-[#22213A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#22213A]">
                  {dock3Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/60 font-medium">
                  {dock3Sub}
                </p>
              </div>
            </div>

            {/* Category 4: All 10 Essentials */}
            <div className="flex items-center gap-3.5 px-3 sm:px-4 py-1 text-left">
              <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-[#22213A] shadow-2xs shrink-0">
                <PackageCheck className="w-4 h-4 text-[#22213A]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#22213A]">
                  {dock4Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/60 font-medium">
                  {dock4Sub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
