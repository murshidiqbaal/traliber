'use client';

import React, { useState } from 'react';
import {
  TRALIBER_KIT_ITEMS,
  TRALIBER_POUCH,
  WHATSAPP_CONFIG,
  KitItemData,
} from '@/data/traliber-kit';
import {
  PackageCheck,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useTraliberStore } from '@/context/TraliberStore';

export const KitInventoryGrid: React.FC = () => {
  const { getProductImage, trackWhatsAppClick } = useTraliberStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Combined list of all 10 items with Cotton Pouch included
  const allTenItems: Array<KitItemData | {
    id: string;
    name: string;
    imagePath: string;
    quantity: number;
    quantityLabel: string;
    order: number;
    description: string;
    specDetails: { material: string; dimensions: string; benefit: string };
  }> = [
    {
      id: TRALIBER_POUCH.id,
      name: TRALIBER_POUCH.name,
      imagePath: TRALIBER_POUCH.openImage,
      quantity: 1,
      quantityLabel: '1 central travel organizer',
      order: 10,
      description: TRALIBER_POUCH.description,
      specDetails: {
        material: '100% heavy-duty organic cotton canvas & antique brass zipper',
        dimensions: '22 x 14 x 7 cm • 95g',
        benefit: 'Houses all 9 essentials snugly; water-repellent inner lining prevents spills',
      },
    },
    ...TRALIBER_KIT_ITEMS,
  ];

  const categories = [
    { id: 'all', label: 'All 10 Items' },
    { id: 'oral-personal', label: 'Oral & Personal' },
    { id: 'sanitization', label: 'Sanitization & Hygiene' },
    { id: 'comfort', label: 'Comfort & Utility' },
  ];

  const getFilteredItems = () => {
    if (activeCategory === 'oral-personal') {
      return allTenItems.filter((i) =>
        ['tooth-brush', 'tablet-paste', 'wet-towel'].includes(i.id)
      );
    }
    if (activeCategory === 'sanitization') {
      return allTenItems.filter((i) =>
        ['mini-sanitizer', 'paper-soap', 'wet-wipes', 'toilet-seat-cover'].includes(i.id)
      );
    }
    if (activeCategory === 'comfort') {
      return allTenItems.filter((i) =>
        ['face-mask', 'cutlery-kit', 'cotton-pouch'].includes(i.id)
      );
    }
    return allTenItems;
  };

  const filteredItems = getFilteredItems();

  return (
    <section id="kit-inventory" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold uppercase tracking-wider mb-3">
            <PackageCheck className="w-4 h-4" />
            SECTION 3: Kit Breakdown
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#22213A] tracking-tight">
            The 10 Travel Essentials
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#22213A]/70">
            Engineered for minimalists, frequent flyers, and adventurers. Every item in the Traliber kit is rigorously chosen for hygiene, portability, and zero-mess travel.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#22213A] text-white shadow-md'
                    : 'bg-[#F8F7FC] text-[#22213A]/70 hover:bg-[#8657F6]/10 hover:text-[#8657F6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="group relative bg-[#F8F7FC] rounded-2xl p-6 border border-[#22213A]/5 hover:border-[#8657F6]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="w-full h-44 rounded-xl bg-white flex items-center justify-center p-4 mb-5 border border-[#8657F6]/10 group-hover:scale-102 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#22213A]/5 text-[#22213A]/70 text-[10px] font-extrabold">
                    0{idx + 1}
                  </div>
                  {item.quantity && item.quantity > 1 && (
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#8657F6] to-[#55C7DE] text-white text-[10px] font-extrabold shadow-sm">
                      {item.quantity} Units
                    </div>
                  )}
                  <img
                    src={getProductImage(item.id, item.imagePath)}
                    alt={item.name}
                    className="max-h-32 max-w-full object-contain drop-shadow transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Name & Quantity */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-bold text-[#22213A] tracking-tight group-hover:text-[#8657F6] transition-colors">
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-[#55C7DE] font-bold mb-2">
                  {item.quantityLabel}
                </p>

                <p className="text-xs text-[#22213A]/70 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs */}
                <div className="pt-3 border-t border-[#22213A]/10 space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#22213A]/80">
                    <span className="font-semibold text-[#22213A]">Spec:</span>
                    <span className="truncate">{item.specDetails.dimensions}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[#22213A]/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8657F6] shrink-0 mt-0.5" />
                    <span className="text-[10px] text-[#8657F6] font-medium leading-tight">
                      {item.specDetails.benefit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-5 pt-3">
                <a
                  href={WHATSAPP_CONFIG.getLink(`Inquiry regarding kit item: ${item.name}`)}
                  onClick={() => trackWhatsAppClick(`Inventory Item: ${item.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-white border border-[#22213A]/10 hover:border-[#25D366] text-[#22213A] hover:text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Order / Ask on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Kit Guarantee Callout */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#22213A] via-[#2A2748] to-[#22213A] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#8657F6]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#55C7DE]/20 text-[#55C7DE] text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                All 10 Items Packed in 1 Compact Cotton Pouch
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Never Forget a Travel Essential Again
              </h3>
              <p className="mt-2 text-sm text-gray-300 max-w-2xl">
                Pre-portioned, lightweight, and compliant with all international carry-on airline standards. Ready to toss into your backpack, duffel, or carry-on trolley.
              </p>
            </div>
            <a
              href={WHATSAPP_CONFIG.getLink()}
              onClick={() => trackWhatsAppClick('Inventory Callout Full Kit')}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold text-sm shadow-xl shadow-[#25D366]/30 hover:scale-105 transition-transform flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Order Full Kit via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
