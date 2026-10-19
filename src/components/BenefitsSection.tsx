'use client';

import React from 'react';
import {
  PlaneTakeoff,
  Droplets,
  Feather,
  Recycle,
  Compass,
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const pillars = [
    {
      icon: PlaneTakeoff,
      title: 'Breeze Past Airport Security',
      description:
        'Say goodbye to ziplock liquid bags and confiscated toiletries. With chewable toothpaste tablets and dry paper soap, Traliber is 100% TSA carry-on compliant worldwide.',
      badge: 'Zero Liquid Restrictions',
    },
    {
      icon: Droplets,
      title: 'Guaranteed Leak-Free Packing',
      description:
        'Ever opened your suitcase to find exploded shampoo across your clothes? Traliber eliminates pressurized liquid tubes entirely for mess-free luggage peace of mind.',
      badge: 'Zero Spills',
    },
    {
      icon: Feather,
      title: 'Ultra-Lightweight 340g Footprint',
      description:
        'Engineered for minimalists and carry-on-only packers. Takes less space than an iPad Mini, fitting seamlessly into your laptop briefcase or backpack sleeve.',
      badge: 'Pocket Packable',
    },
    {
      icon: Recycle,
      title: 'Conscious & Sustainable Care',
      description:
        'Crafted with organic canvas, food-grade reusable cutlery, water-soluble seat covers, and biodegradable plant-fiber wet wipes. Zero single-use plastic waste guilt.',
      badge: 'Eco-Responsible',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-[#F8F7FC] relative overflow-hidden">
      {/* Decorative Brand Gradient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#8657F6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#55C7DE]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#788CF5]/10 text-[#788CF5] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            Why Traliber
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#22213A] tracking-tight">
            Designed for How Modern Travelers Move
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#22213A]/70">
            We re-engineered the travel toiletry kit from the ground up to eliminate airport hassles, spilled gels, and wasteful plastic minis.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#22213A]/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8657F6]/10 to-[#55C7DE]/20 flex items-center justify-center text-[#8657F6] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#55C7DE] mb-2">
                    {pillar.badge}
                  </div>
                  <h3 className="text-lg font-bold text-[#22213A] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
