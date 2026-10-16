'use client';

import React, { useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import {
  TRALIBER_KIT_ITEMS,
  TRALIBER_POUCH,
  WHATSAPP_CONFIG,
  KitItemData,
} from '@/data/traliber-kit';
import { KitItem } from './KitItem';
import {
  MessageCircle,
  Sparkles,
  Info,
  CheckCircle2,
  X,
  Compass,
} from 'lucide-react';
import { useTraliberStore } from '@/context/TraliberStore';

interface KitRevealStageProps {
  scrollProgress: MotionValue<number>;
  isReducedMotion?: boolean;
}

export const KitRevealStage: React.FC<KitRevealStageProps> = ({
  scrollProgress,
  isReducedMotion = false,
}) => {
  const { getProductImage, trackUnpackScroll, trackWhatsAppClick, trackProductInspect } = useTraliberStore();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KitItemData | null>(null);
  const [currentStageNum, setCurrentStageNum] = useState(1);
  const trackedUnpackRef = React.useRef(false);

  const pouchClosedSrc = getProductImage('cotton-pouch-closed', TRALIBER_POUCH.closedImage);
  const pouchOpenSrc = getProductImage('cotton-pouch-open', TRALIBER_POUCH.openImage);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track stage number and trigger unpack analytics
  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latest) => {
      if (latest < 0.15) setCurrentStageNum(1);
      else if (latest < 0.3) {
        setCurrentStageNum(2);
        if (!trackedUnpackRef.current) {
          trackedUnpackRef.current = true;
          trackUnpackScroll();
        }
      } else if (latest < 0.65) setCurrentStageNum(3);
      else if (latest < 0.85) setCurrentStageNum(4);
      else setCurrentStageNum(5);
    });
    return () => unsubscribe();
  }, [scrollProgress, trackUnpackScroll]);

  // Stage 1 Intro Text Transforms
  const introOpacity = useTransform(scrollProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const introY = useTransform(scrollProgress, [0, 0.18], [0, -25]);

  // Pouch Opening Layered Transforms
  const closedPouchOpacity = useTransform(scrollProgress, [0, 0.15, 0.28], [1, 1, 0]);
  const openPouchOpacity = useTransform(scrollProgress, [0.18, 0.28, 1], [0, 1, 1]);
  const pouchY = useTransform(
    scrollProgress,
    [0, 0.25, 0.65, 1],
    [0, isMobile ? 25 : 30, isMobile ? 50 : 60, isMobile ? 55 : 65]
  );
  const pouchScale = useTransform(
    scrollProgress,
    [0, 0.2, 0.6, 1],
    [isMobile ? 1.05 : 1.15, isMobile ? 1.1 : 1.2, 1.05, 1.0]
  );

  // Stage 5 Final Reveal Transforms
  const finalCtaOpacity = useTransform(scrollProgress, [0.82, 0.9, 1], [0, 1, 1]);
  const finalCtaY = useTransform(scrollProgress, [0.82, 0.9], [30, 0]);

  const stages = [
    { num: 1, name: 'Closed Kit', range: '0–15%' },
    { num: 2, name: 'Pouch Opens', range: '15–30%' },
    { num: 3, name: 'Items Emerge', range: '30–65%' },
    { num: 4, name: 'Exploded View', range: '65–85%' },
    { num: 5, name: 'Complete Kit', range: '85–100%' },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#F8F7FC] select-none">
      {/* Studio Lighting Background: Restrained purple-to-cyan ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[950px] h-[700px] md:h-[950px] rounded-full bg-gradient-to-tr from-[#8657F6]/10 via-[#788CF5]/10 to-[#55C7DE]/15 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#8657F6]/5 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#55C7DE]/8 blur-2xl" />
      </div>

      {/* Floating Interactive Stage Navigation Pill */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#8657F6]/20 shadow-md shadow-[#22213A]/5 flex items-center gap-1.5 sm:gap-3 text-[11px] font-semibold text-[#22213A]">
        <div className="flex items-center gap-1.5 pr-2 border-r border-[#22213A]/10">
          <Compass className="w-3.5 h-3.5 text-[#8657F6] animate-spin-slow" />
          <span className="hidden sm:inline font-bold tracking-wider text-[10px] uppercase text-[#788CF5]">
            Scroll Explorer
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {stages.map((st) => (
            <div
              key={st.num}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all duration-300 ${
                currentStageNum === st.num
                  ? 'bg-gradient-to-r from-[#8657F6] to-[#788CF5] text-white shadow-sm'
                  : 'text-[#22213A]/50 hover:text-[#22213A]'
              }`}
            >
              <span className="text-[10px] font-bold">{st.num}</span>
              <span className="hidden md:inline text-[10px]">{st.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STAGE 1 — INTRO HEADLINE (0–15%) */}
      {!isReducedMotion && (
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute top-16 sm:top-20 z-30 text-center px-4 max-w-lg pointer-events-none"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            Stage 1: The Closed Kit
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#22213A] tracking-tight leading-tight">
            Everything You Need.{' '}
            <span className="bg-gradient-to-r from-[#8657F6] via-[#788CF5] to-[#55C7DE] bg-clip-text text-transparent">
              One Little Kit.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#22213A]/70 font-medium">
            Thoughtfully packed for wherever life takes you.
          </p>
          <p className="mt-1 text-xs text-[#788CF5] font-semibold flex items-center justify-center gap-1">
            <span>↓</span> Scroll to unpack
          </p>
        </motion.div>
      )}

      {/* CENTRAL STAGE CONTAINER */}
      <div className="relative w-full max-w-5xl h-[520px] sm:h-[580px] md:h-[640px] flex items-center justify-center">
        {/* COTTON POUCH (Central Visual Anchor) */}
        <motion.div
          style={
            isReducedMotion
              ? { transform: `translateY(${isMobile ? 55 : 65}px) scale(1)` }
              : { y: pouchY, scale: pouchScale }
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-auto"
        >
          <div className="relative w-72 sm:w-80 md:w-96 lg:w-[420px] flex items-center justify-center">
            {/* Reduced motion static open pouch */}
            {isReducedMotion ? (
              <img
                src={pouchOpenSrc}
                alt="Open Cotton Pouch"
                className="w-full h-auto drop-shadow-xl select-none"
              />
            ) : (
              <>
                {/* Layer 1: Closed Pouch */}
                <motion.div
                  style={{ opacity: closedPouchOpacity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={pouchClosedSrc}
                    alt="Closed Cotton Pouch"
                    className="w-full h-auto drop-shadow-xl select-none"
                    loading="eager"
                  />
                </motion.div>

                {/* Layer 2: Open Pouch */}
                <motion.div
                  style={{ opacity: openPouchOpacity }}
                  className="relative flex items-center justify-center w-full"
                >
                  <img
                    src={pouchOpenSrc}
                    alt="Open Cotton Pouch"
                    className="w-full h-auto drop-shadow-2xl select-none"
                    loading="eager"
                  />
                </motion.div>
              </>
            )}

            {/* Pouch Label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1 rounded-full border border-[#8657F6]/30 shadow-md text-center pointer-events-none whitespace-nowrap">
              <span className="text-xs font-extrabold text-[#22213A] tracking-wider uppercase">
                {TRALIBER_POUCH.name}
              </span>
              <span className="ml-1.5 text-[10px] text-[#8657F6] font-semibold">
                (Anchor Pouch)
              </span>
            </div>
          </div>
        </motion.div>

        {/* 9 TRAVEL ESSENTIAL ITEMS (Emerging from pouch in Stage 3-5) */}
        {TRALIBER_KIT_ITEMS.map((item) => (
          <KitItem
            key={item.id}
            item={item}
            scrollProgress={scrollProgress}
            isMobile={isMobile}
            isReducedMotion={isReducedMotion}
            onInspect={(selected) => {
              trackProductInspect(selected.name);
              setSelectedItem(selected);
            }}
          />
        ))}
      </div>

      {/* STAGE 5 — COMPLETE KIT REVEAL (85–100%) */}
      {isReducedMotion ? (
        <div className="absolute bottom-6 sm:bottom-8 z-30 text-center px-4 max-w-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-[#22213A]">
            Ready for Every Journey.
          </h2>
          <p className="text-xs sm:text-sm text-[#22213A]/70 mb-3">
            Your travel essentials, together in one convenient kit.
          </p>
          <a
            href={WHATSAPP_CONFIG.getLink()}
            onClick={() => trackWhatsAppClick('Reduced Motion Reveal CTA')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold shadow-lg shadow-[#25D366]/25 hover:opacity-95 transition-transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Order via WhatsApp
          </a>
        </div>
      ) : (
        <motion.div
          style={{ opacity: finalCtaOpacity, y: finalCtaY }}
          className="absolute bottom-4 sm:bottom-8 z-30 text-center px-4 max-w-lg pointer-events-auto"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#55C7DE]/15 text-[#22213A] text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#55C7DE]" />
            Complete Kit (10 Essentials)
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#22213A] tracking-tight">
            Ready for Every Journey.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#22213A]/70 font-medium">
            Your travel essentials, together in one convenient kit.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={WHATSAPP_CONFIG.getLink()}
              onClick={() => trackWhatsAppClick('Stage 5 Complete Kit Reveal')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm shadow-xl shadow-[#25D366]/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Order via WhatsApp
            </a>
            <a
              href="#kit-inventory"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 text-[#22213A] border border-[#22213A]/15 text-xs font-bold hover:bg-[#F8F7FC] transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-[#8657F6]" />
              View Full Specs
            </a>
          </div>
        </motion.div>
      )}

      {/* QUICK INSPECTION MODAL (When clicking any item in the animation) */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22213A]/60 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#8657F6]/20 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#22213A]/50 hover:text-[#22213A] hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 flex items-center justify-center bg-[#F8F7FC] rounded-xl p-2 mb-4 border border-[#8657F6]/10">
                <img
                  src={selectedItem.imagePath}
                  alt={selectedItem.name}
                  className="max-h-full max-w-full object-contain drop-shadow"
                />
              </div>

              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold mb-1">
                Item #{selectedItem.order} in Sequence
              </div>

              <h3 className="text-lg font-bold text-[#22213A]">
                {selectedItem.name}
              </h3>
              {selectedItem.quantityLabel && (
                <p className="text-xs text-[#55C7DE] font-bold mb-2">
                  {selectedItem.quantityLabel}
                </p>
              )}

              <p className="text-xs text-[#22213A]/70 mb-4">
                {selectedItem.description}
              </p>

              <div className="w-full bg-[#F8F7FC] rounded-lg p-3 text-left space-y-1.5 text-[11px] mb-4">
                <div>
                  <span className="font-bold text-[#22213A]">Material: </span>
                  <span className="text-[#22213A]/80">
                    {selectedItem.specDetails.material}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#22213A]">Dimensions: </span>
                  <span className="text-[#22213A]/80">
                    {selectedItem.specDetails.dimensions}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#8657F6]">Travel Benefit: </span>
                  <span className="text-[#22213A]/80">
                    {selectedItem.specDetails.benefit}
                  </span>
                </div>
              </div>

              <a
                href={WHATSAPP_CONFIG.getLink(`Inquiry regarding ${selectedItem.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8657F6] to-[#788CF5] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95"
              >
                <MessageCircle className="w-4 h-4" />
                Ask About This Item on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
