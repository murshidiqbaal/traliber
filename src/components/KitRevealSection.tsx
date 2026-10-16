'use client';

import React, { useRef } from 'react';
import { useScroll, useReducedMotion } from 'framer-motion';
import { KitRevealStage } from './KitRevealStage';

export const KitRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Single parent scroll-progress MotionValue coordinating the entire scene
  // Using native page scroll without hijacking wheel events or disabling page scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="kit-reveal"
      ref={containerRef}
      className={`relative w-full ${
        shouldReduceMotion ? 'h-auto py-16' : 'h-[360vh] md:h-[400vh]'
      } bg-[#F8F7FC] border-y border-[#8657F6]/10`}
    >
      {/* Sticky Stage Container: Pins during scroll and releases naturally when the section ends */}
      <div
        className={`${
          shouldReduceMotion
            ? 'relative w-full min-h-[640px]'
            : 'sticky top-0 h-screen w-full overflow-hidden'
        } flex items-center justify-center`}
      >
        <KitRevealStage
          scrollProgress={scrollYProgress}
          isReducedMotion={!!shouldReduceMotion}
        />
      </div>
    </section>
  );
};
