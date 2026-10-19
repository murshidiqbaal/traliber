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
import { MessageCircle, X } from 'lucide-react';
import { useTraliberStore } from '@/context/TraliberStore';

interface KitRevealStageProps {
  scrollProgress: MotionValue<number>;
  isReducedMotion?: boolean;
}

export const KitRevealStage: React.FC<KitRevealStageProps> = ({
  scrollProgress,
  isReducedMotion = false,
}) => {
  const { getProductImage, trackUnpackScroll, trackProductInspect } = useTraliberStore();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KitItemData | null>(null);
  const trackedUnpackRef = React.useRef(false);

  const pouchSrc = getProductImage('cotton-pouch-closed', TRALIBER_POUCH.closedImage);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latest) => {
      if (latest > 0.15 && !trackedUnpackRef.current) {
        trackedUnpackRef.current = true;
        trackUnpackScroll();
      }
    });
    return () => unsubscribe();
  }, [scrollProgress, trackUnpackScroll]);

  // Gentle subtle breathing scale for the center pouch
  const pouchScale = useTransform(
    scrollProgress,
    [0, 0.35, 0.7, 1],
    [isMobile ? 0.95 : 1.05, isMobile ? 1.0 : 1.1, isMobile ? 0.98 : 1.05, isMobile ? 0.95 : 1.0]
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#F8F7FC] select-none pt-4 sm:pt-6 md:pt-8 pb-8">
      {/* Studio Lighting Background: Restrained purple-to-cyan ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[950px] h-[700px] md:h-[950px] rounded-full bg-gradient-to-tr from-[#8657F6]/10 via-[#788CF5]/10 to-[#55C7DE]/15 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#8657F6]/5 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#55C7DE]/8 blur-2xl" />
      </div>

      {/* CENTRAL STAGE CONTAINER */}
      <div className="relative w-full max-w-5xl h-[520px] sm:h-[580px] md:h-[640px] flex items-center justify-center">
        {/* COTTON POUCH (Central Visual Anchor) */}
        <motion.div
          style={
            isReducedMotion
              ? { transform: `scale(1)` }
              : { scale: pouchScale }
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-auto"
        >
          <div className="relative w-64 sm:w-80 md:w-96 lg:w-[410px] flex items-center justify-center">
            <img
              src={pouchSrc}
              alt="Traliber Travel Essentials Pouch"
              className="w-full h-auto drop-shadow-2xl select-none"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* 9 TRAVEL ESSENTIAL ITEMS (Emerging from pouch) */}
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
