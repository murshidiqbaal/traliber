'use client';

import {
  Heart,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import React from 'react';

import { useTraliberStore } from '@/context/TraliberStore';

export const WhatsInsideSection: React.FC = () => {
  const { getProductImage, getCustomText } = useTraliberStore();

  const burstImg = getProductImage('whats_inside_burst', '/images/kit-burst-alpine.webp');
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
      className="relative w-full bg-[#F8F7FC] pt-14 sm:pt-18 pb-6 sm:pb-8 overflow-hidden"
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
            {/* <div className="absolute top-1/4 left-3 sm:left-8 z-20 flex flex-col items-start select-none pointer-events-none">
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
            </div> */}

            {/* Hand-drawn annotation: Right */}
            {/* <div className="absolute top-1/3 right-3 sm:right-8 z-20 flex flex-col items-end select-none pointer-events-none">
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
            </div> */}
          </div>
        </div>

        {/* Bottom Floating Minimalist Feature Bar */}
        <div className="mt-8 sm:mt-10 max-w-5xl mx-auto px-2 relative z-20">
          <div className="bg-white rounded-2xl border border-[#22213A]/[0.08] shadow-[0_4px_25px_rgba(34,33,58,0.04)] p-2 sm:p-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-0 lg:divide-x lg:divide-[#22213A]/[0.06]">
            {/* Category 1: Oral & Personal */}
            <div className="group flex items-center gap-3.5 p-3 sm:px-4 rounded-xl transition-all duration-300 hover:bg-gray-50/80 text-left cursor-default">
              <div className="w-9 h-9 rounded-lg bg-[#22213A]/[0.03] border border-[#22213A]/[0.06] flex items-center justify-center text-[#22213A]/70 group-hover:bg-[#1E1B4B] group-hover:text-white group-hover:border-transparent transition-all duration-300 shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E1B4B] tracking-tight group-hover:text-[#4F75FF] transition-colors duration-200 truncate sm:whitespace-normal">
                  {dock1Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/65 font-medium leading-snug mt-0.5">
                  {dock1Sub}
                </p>
              </div>
            </div>

            {/* Category 2: Sanitization & Hygiene */}
            <div className="group flex items-center gap-3.5 p-3 sm:px-4 rounded-xl transition-all duration-300 hover:bg-gray-50/80 text-left cursor-default">
              <div className="w-9 h-9 rounded-lg bg-[#22213A]/[0.03] border border-[#22213A]/[0.06] flex items-center justify-center text-[#22213A]/70 group-hover:bg-[#1E1B4B] group-hover:text-white group-hover:border-transparent transition-all duration-300 shrink-0">
                <Sparkles className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E1B4B] tracking-tight group-hover:text-[#4F75FF] transition-colors duration-200 truncate sm:whitespace-normal">
                  {dock2Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/65 font-medium leading-snug mt-0.5">
                  {dock2Sub}
                </p>
              </div>
            </div>

            {/* Category 3: Comfort & Utility */}
            <div className="group flex items-center gap-3.5 p-3 sm:px-4 rounded-xl transition-all duration-300 hover:bg-gray-50/80 text-left cursor-default">
              <div className="w-9 h-9 rounded-lg bg-[#22213A]/[0.03] border border-[#22213A]/[0.06] flex items-center justify-center text-[#22213A]/70 group-hover:bg-[#1E1B4B] group-hover:text-white group-hover:border-transparent transition-all duration-300 shrink-0">
                <Heart className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E1B4B] tracking-tight group-hover:text-[#4F75FF] transition-colors duration-200 truncate sm:whitespace-normal">
                  {dock3Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/65 font-medium leading-snug mt-0.5">
                  {dock3Sub}
                </p>
              </div>
            </div>

            {/* Category 4: All 10 Essentials */}
            <div className="group flex items-center gap-3.5 p-3 sm:px-4 rounded-xl transition-all duration-300 hover:bg-gray-50/80 text-left cursor-default">
              <div className="w-9 h-9 rounded-lg bg-[#22213A]/[0.03] border border-[#22213A]/[0.06] flex items-center justify-center text-[#22213A]/70 group-hover:bg-[#1E1B4B] group-hover:text-white group-hover:border-transparent transition-all duration-300 shrink-0">
                <PackageCheck className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#1E1B4B] tracking-tight group-hover:text-[#4F75FF] transition-colors duration-200 truncate sm:whitespace-normal">
                  {dock4Title}
                </h4>
                <p className="text-[11px] text-[#22213A]/65 font-medium leading-snug mt-0.5">
                  {dock4Sub}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless bottom blend gradient flowing into Section 3 */}
        <div className="h-10 sm:h-14 w-full pointer-events-none" />
      </div>
    </section>
  );
};
