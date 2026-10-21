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
  // Completely hide text title labels on mobile screen ratio
  if (isMobile) {
    return null;
  }

  // Compute positioning classes relative to the item container
  const getPlacementClass = () => {
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
      className={`hidden md:block absolute ${getPlacementClass()} pointer-events-none z-30 transition-transform duration-200 will-change-transform [transform:translateZ(0)]`}
    >
      <div className="flex flex-col items-center whitespace-nowrap bg-[#1E1B4B] text-white px-3 py-1.5 rounded-lg border border-white/20 shadow-xl antialiased">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] md:text-xs font-bold tracking-tight text-white antialiased font-sans">
            {item.name}
          </span>
          {item.quantity && item.quantity > 1 && (
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#8657F6] text-white leading-none">
              ×{item.quantity}
            </span>
          )}
        </div>
        {item.quantityLabel && (
          <span className="text-[10px] text-[#A5B4FC] font-medium tracking-wide antialiased">
            {item.quantityLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};
