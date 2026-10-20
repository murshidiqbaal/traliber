'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore } from '@/context/TraliberStore';
import { MessageCircle } from 'lucide-react';

export interface EditorialProduct {
  id: string;
  chapterNum: string;
  category: 'oral' | 'hygiene' | 'comfort' | 'pouch';
  categoryLabel: string;
  name: string;
  headline: string;
  story: string;
  microLabel: string;
  caption: string;
  quantity: string;
  practicalDetail: string;
  defaultImage: string;
  hoverImage?: string;
}

export const EDITORIAL_PRODUCTS: EditorialProduct[] = [
  {
    id: 'cotton-pouch',
    chapterNum: '01 / 10',
    category: 'pouch',
    categoryLabel: 'Travel Organization',
    name: 'Traliber Travel Essentials Pouch',
    headline: 'Your whole routine. One little place.',
    story:
      'Meet the home of your travel essentials. A compact organizer that keeps your daily necessities together, so packing feels simpler and finding what you need takes less effort.',
    microLabel: 'THE JOURNEY STARTS HERE',
    caption: 'ALL-IN-ONE ORGANIZER',
    quantity: '1 pouch',
    practicalDetail: 'Dual-zipper compartment with reinforced carry loop and mountain blue water-resistant canvas.',
    defaultImage: '/images/products/pouch.png',
    hoverImage: '/images/products/kit-display.png',
  },
  {
    id: 'tooth-brush',
    chapterNum: '02 / 10',
    category: 'oral',
    categoryLabel: 'Oral Care',
    name: 'Toothbrush Set',
    headline: 'Fresh starts, wherever you wake up.',
    story:
      'From early departures to unfamiliar hotel mornings, keep your oral-care routine close at hand with a toothbrush set designed for travel.',
    microLabel: 'READY FOR YOUR NEXT STOP',
    caption: 'TWO-PIECE TRAVEL FORMAT',
    quantity: '1 toothbrush set with hygienic cap',
    practicalDetail: 'Ventilated protective travel barrel that doubles as an ergonomic handle extension.',
    defaultImage: '/images/products/toothbrush.png',
  },
  {
    id: 'tablet-paste',
    chapterNum: '03 / 10',
    category: 'oral',
    categoryLabel: 'Oral Care',
    name: 'Travel Toothpaste',
    headline: 'A little tube. A fresher feeling.',
    story:
      'An easy-to-pack toothpaste companion for your everyday brushing routine, whether you’re heading out for a weekend or preparing for a longer journey.',
    microLabel: 'EVERYDAY BRUSHING COMPANION',
    caption: 'YOUR ROUTINE, PACKED',
    quantity: '1 travel-size tube (10g)',
    practicalDetail: 'Sealed screw-cap travel tube sized for compact dopp kits and airport carry-on regulations.',
    defaultImage: '/images/products/toothpaste.png',
  },
  {
    id: 'mini-sanitizer',
    chapterNum: '04 / 10',
    category: 'hygiene',
    categoryLabel: 'Sanitization & Hygiene',
    name: 'Mini Sanitizer Set',
    headline: 'Five little backups for life on the go.',
    story:
      'Keep a mini sanitizer within reach. The five-bottle set gives you flexibility to place one in different bags or share with travel companions.',
    microLabel: '5 MINI BOTTLES',
    caption: 'DISTRIBUTE ACROSS BAGS',
    quantity: '5 individual pocket bottles',
    practicalDetail: 'Fine-mist spray atomizers in shatterproof pocket bottles for transit and commuting.',
    defaultImage: '/images/products/mini-sanitizer.png',
  },
  {
    id: 'wet-wipes',
    chapterNum: '05 / 10',
    category: 'hygiene',
    categoryLabel: 'Sanitization & Hygiene',
    name: 'Wet Wipes',
    headline: 'For the little messes along the way.',
    story:
      'From a quick refresh to an unexpected spill, keep these compact wipes ready for those everyday moments when a little convenience goes a long way.',
    microLabel: 'A QUICK REFRESH',
    caption: 'INDIVIDUALLY MOISTURE-LOCKED',
    quantity: '2 individual packets',
    practicalDetail: 'Moisture-sealed foil packets designed to prevent drying out during extended transit.',
    defaultImage: '/images/products/wet-wipes.png',
  },
  {
    id: 'wet-towel',
    chapterNum: '06 / 10',
    category: 'comfort',
    categoryLabel: 'Comfort & Utility',
    name: 'Wet Towel',
    headline: 'A small comfort between destinations.',
    story:
      'Keep a towel ready for travel days, layovers, and moments when a little extra convenience makes your journey more comfortable.',
    microLabel: 'COMFORT, PACKED LIGHT',
    caption: 'SINGLE-USE SACHET',
    quantity: '1 sealed sachet',
    practicalDetail: 'Hygienically packaged soft-weave travel towel for instant refreshment after long hours in transit.',
    defaultImage: '/images/products/wet-towel.png',
  },
  {
    id: 'toilet-seat-cover',
    chapterNum: '07 / 10',
    category: 'comfort',
    categoryLabel: 'Comfort & Utility',
    name: 'Toilet Seat Covers',
    headline: 'A little more peace of mind.',
    story:
      'Compact toilet seat covers for your travel kit, giving you a convenient option when using public restrooms away from home.',
    microLabel: 'CONSIDERED COMFORT',
    caption: 'UNIVERSAL FIT',
    quantity: '2 folded covers',
    practicalDetail: 'Pocket-sized paper liners folded flat to slip unnoticeably into transit bags or daypacks.',
    defaultImage: '/images/products/toilet-seat-cover.png',
  },
  {
    id: 'face-mask',
    chapterNum: '08 / 10',
    category: 'comfort',
    categoryLabel: 'Comfort & Utility',
    name: 'Face Mask',
    headline: 'A familiar essential, wherever you go.',
    story:
      'An easy-to-carry face mask for situations where you prefer to wear one during your journey.',
    microLabel: 'READY WHEN YOU NEED IT',
    caption: 'SOFT EAR LOOPS',
    quantity: '1 sealed mask',
    practicalDetail: 'Individually wrapped contour mask with flexible nose bridge and cushioned ear loops.',
    defaultImage: '/images/products/face-mask.png',
  },
  {
    id: 'paper-soap',
    chapterNum: '09 / 10',
    category: 'hygiene',
    categoryLabel: 'Sanitization & Hygiene',
    name: 'Paper Soap',
    headline: 'Soap-sized convenience. Travel-sized thinking.',
    story:
      'Keep a compact soap option with you for journeys, day trips, and situations where carrying a small personal-care essential is useful.',
    microLabel: 'SMALL SHEETS. EASY PACKING.',
    caption: '50 WATER-SOLUBLE SHEETS',
    quantity: '1 flip-box (50 sheets)',
    practicalDetail: 'Slim plastic flip container that prevents moisture ingress while keeping individual dry sheets accessible.',
    defaultImage: '/images/products/paper-soap.png',
  },
  {
    id: 'cutlery-kit',
    chapterNum: '10 / 10',
    category: 'comfort',
    categoryLabel: 'Comfort & Utility',
    name: 'Cutlery Kit',
    headline: 'Your own little dining companion.',
    story:
      'From packed lunches to travel snacks, keep a dedicated cutlery kit ready for meals away from home.',
    microLabel: 'MADE FOR MEALS ON THE MOVE',
    caption: 'FULL UTENSIL SET WITH SLEEVE',
    quantity: '1 complete set & case',
    practicalDetail: 'Includes travel fork, spoon, serrated knife, chopsticks, and napkin housed in a slim snap case.',
    defaultImage: '/images/products/cutlery-kit.png',
  },
];

export const EditorialStorytellingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { getProductImage, getCustomText } = useTraliberStore();

  const count = EDITORIAL_PRODUCTS.length;

  // Track scroll progress through this pinned storytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate current item based on scroll progress through the section
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Map scroll progress across all 10 products
      const clamped = Math.max(0, Math.min(0.9999, progress));
      const newIndex = Math.min(count - 1, Math.floor(clamped * count));
      setCurrentIndex((prev) => (prev !== newIndex ? newIndex : prev));
    });
    return () => unsubscribe();
  }, [scrollYProgress, count]);

  const currentItem = EDITORIAL_PRODUCTS[currentIndex] || EDITORIAL_PRODUCTS[0];

  const imgSrc = getProductImage(currentItem.id, currentItem.defaultImage);
  const headline = getCustomText(`item_${currentItem.id}_headline`, currentItem.headline);
  const story = getCustomText(`item_${currentItem.id}_story`, currentItem.story);
  const detail = getCustomText(`item_${currentItem.id}_detail`, currentItem.practicalDetail);

  const getWhatsAppItemLink = (productName: string) => {
    const message = `Hi Traliber! I'm interested in the ${productName} from the Travel Essentials Kit. Could you share the price and availability?`;
    return WHATSAPP_CONFIG.getLink(message);
  };

  // Jump to specific product index
  const handleSelectIndex = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = scrollTop + (idx / (count - 1)) * totalScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      id="kit-inventory"
      ref={containerRef}
      className={`relative w-full ${
        shouldReduceMotion ? 'h-auto py-16' : 'h-[500vh]'
      } bg-[#F8F7FC] border-y border-[#8657F6]/10`}
    >
      {/* Sticky Frame: Pins in the center of the viewport while scrolling */}
      <div
        className={`${
          shouldReduceMotion
            ? 'relative w-full'
            : 'sticky top-0 h-screen w-full overflow-hidden'
        } flex items-center justify-center px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-6xl w-full mx-auto">
          {/* THE EXACT EDITORIAL FRAME: Left Image Card + Right Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* LEFT SIDE: Clean White Image Card */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="bg-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 border border-[#8657F6]/10 shadow-[0_12px_45px_rgba(34,33,58,0.06)] relative w-full max-w-[420px] aspect-square flex items-center justify-center overflow-hidden">
                {/* Top-Left Caption Tag */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-20 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md bg-white border border-[#22213A]/15 text-[#22213A]/60 shadow-2xs">
                  {currentItem.caption}
                </div>

                {/* Subtle Ambient Radial Glow */}
                <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-[#8657F6]/10 to-[#55C7DE]/15 blur-2xl pointer-events-none" />

                {/* Animated Image with Fast Crossfade on Scroll */}
                <motion.img
                  key={currentItem.id}
                  src={imgSrc}
                  alt={currentItem.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative z-10 max-h-[260px] sm:max-h-[300px] w-auto max-w-[85%] object-contain drop-shadow-xl select-none"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Narrative & Action Details */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-5"
              >

                {/* Big Bold Headline */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#22213A] tracking-tight leading-[1.18]">
                  {headline}
                </h3>

                {/* Story Narrative */}
                <p className="text-sm sm:text-base text-[#22213A]/75 leading-relaxed font-normal max-w-xl">
                  {story}
                </p>

                {/* WhatsApp Action Button */}
                <div className="pt-1">
                  <a
                    href={getWhatsAppItemLink(currentItem.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22213A] hover:bg-[#1a192e] text-white transition-all text-xs font-bold shadow-sm hover:shadow-md active:scale-98"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Minimal Bottom Chapter Dots Indicator */}
          <div className="mt-8 flex items-center justify-between border-t border-[#8657F6]/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#8657F6]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <span className="text-xs text-[#22213A]/50">· Scroll to explore all essentials</span>
            </div>

            {/* Interactive Dots for direct jumping */}
            <div className="flex items-center gap-1.5">
              {EDITORIAL_PRODUCTS.map((prod, idx) => (
                <button
                  key={prod.id}
                  onClick={() => handleSelectIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-[#8657F6]'
                      : 'w-2 bg-[#22213A]/15 hover:bg-[#8657F6]/50'
                  }`}
                  aria-label={`Go to ${prod.name}`}
                  title={prod.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
