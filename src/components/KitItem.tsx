'use client';

import React, { useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { KitItemData } from '@/data/traliber-kit';
import { KitItemLabel } from './KitItemLabel';
import { useTraliberStore } from '@/context/TraliberStore';

interface KitItemProps {
  item: KitItemData;
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
  isReducedMotion?: boolean;
  onInspect?: (item: KitItemData) => void;
}

export const KitItem: React.FC<KitItemProps> = ({
  item,
  scrollProgress,
  isMobile,
  isReducedMotion = false,
  onInspect,
}) => {
  const { getProductImage } = useTraliberStore();
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc = getProductImage(item.id, item.imagePath);
  const config = isMobile ? item.mobile : item.desktop;

  const [startProg, endProg] = item.scrollRange;

  // Staggered emergence calculations based on scroll progress
  // Item emerges gradually from pouch center to its final exploded spot
  const x = useTransform(scrollProgress, [startProg, endProg], [config.start.x, config.final.x]);
  const y = useTransform(scrollProgress, [startProg, endProg], [config.start.y, config.final.y]);
  const rotate = useTransform(
    scrollProgress,
    [startProg, endProg],
    [config.start.rotate, config.final.rotate]
  );
  const scale = useTransform(
    scrollProgress,
    [startProg, endProg],
    [config.start.scale, config.final.scale]
  );
  const opacity = useTransform(
    scrollProgress,
    [startProg, startProg + (endProg - startProg) * 0.3],
    [0, 1]
  );

  // Label reveals slightly after movement settles
  const labelOpacity = useTransform(
    scrollProgress,
    [endProg - 0.03, Math.min(1, endProg + 0.06)],
    [0, 1]
  );

  if (isReducedMotion) {
    return (
      <div
        style={{
          transform: `translate(${config.final.x}px, ${config.final.y}px) rotate(${config.final.rotate}deg) scale(${config.final.scale})`,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        onClick={() => onInspect?.(item)}
      >
        <div className="relative p-2 transition-transform duration-300 group-hover:scale-105">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-24 sm:w-28 md:w-36 h-auto drop-shadow-md select-none pointer-events-none"
            loading="eager"
          />
          <div className="mt-1 text-center bg-[#22213A]/90 text-white px-2 py-0.5 rounded text-[10px] font-bold">
            {item.name} {item.quantity && item.quantity > 1 ? `(${item.quantity})` : ''}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onInspect?.(item)}
    >
      <div
        className={`relative transition-all duration-300 ${
          isHovered ? 'scale-110 drop-shadow-2xl z-40' : 'drop-shadow-lg'
        }`}
      >
        {/* Glow halo on hover */}
        {isHovered && (
          <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-[#8657F6]/30 to-[#55C7DE]/30 blur-lg animate-pulse pointer-events-none" />
        )}

        <img
          src={imageSrc}
          alt={item.name}
          className="w-24 sm:w-28 md:w-36 lg:w-40 h-auto select-none pointer-events-none object-contain"
          loading="eager"
        />

        {/* Floating Product Label */}
        <KitItemLabel
          item={item}
          opacity={labelOpacity}
          placement={config.labelPlacement}
          isMobile={isMobile}
        />
      </div>
    </motion.div>
  );
};
