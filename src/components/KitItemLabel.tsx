'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { KitItemData } from '@/data/traliber-kit';

interface KitItemLabelProps {
  item: KitItemData;
  opacity: MotionValue<number>;
  scale?: MotionValue<number>;
  placement: 'top' | 'bottom' | 'left' | 'right';
  isMobile: boolean;
}

export const KitItemLabel: React.FC<KitItemLabelProps> = ({
  item,
  opacity,
  placement,
  isMobile,
}) => {
  // Compute positioning classes relative to the item container
  const getPlacementClass = () => {
    if (isMobile) {
      return 'top-full left-1/2 -translate-x-1/2 mt-1.5';
    }
    switch (placement) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-3';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-3';
      default:
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
    }
  };

  return (
    <motion.div
      style={{ opacity }}
      className={`absolute ${getPlacementClass()} pointer-events-none z-30 transition-transform duration-200`}
    >
      <div className="flex flex-col items-center whitespace-nowrap bg-[#22213A]/90 text-white backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#788CF5]/30 shadow-lg shadow-[#22213A]/20">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] md:text-xs font-bold tracking-tight text-white font-sans">
            {item.name}
          </span>
          {item.quantity && item.quantity > 1 && (
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#8657F6] to-[#55C7DE] text-white leading-none">
              ×{item.quantity}
            </span>
          )}
        </div>
        {!isMobile && item.quantityLabel && (
          <span className="text-[9px] text-[#55C7DE] font-medium tracking-wide">
            {item.quantityLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};
