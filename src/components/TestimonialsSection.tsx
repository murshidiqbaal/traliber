'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore, Testimonial } from '@/context/TraliberStore';

const CARDS_PER_SLIDE = 3;

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useTraliberStore();

  const activeTestimonials = testimonials.filter((t) => t.isActive !== false);
  const totalCount = activeTestimonials.length;

  // Group testimonials into complete sets of 3 cards each.
  // If the last slide does not have 3 cards, wrap-around / backfill with other cards
  // so that every slide is guaranteed to be a complete set of 3 cards.
  const slides: Testimonial[][] = [];

  if (totalCount <= CARDS_PER_SLIDE) {
    slides.push(activeTestimonials);
  } else {
    for (let i = 0; i < totalCount; i += CARDS_PER_SLIDE) {
      const chunk: Testimonial[] = [];
      for (let j = 0; j < CARDS_PER_SLIDE; j++) {
        const itemIndex = (i + j) % totalCount;
        chunk.push(activeTestimonials[itemIndex]);
      }
      slides.push(chunk);
    }
  }

  const totalSlides = slides.length;
  const isSlideshow = totalSlides > 1;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Keep index within bounds if testimonials count changes
  const safeSlideIndex = currentSlide >= totalSlides ? 0 : currentSlide;
  const currentCards = slides[safeSlideIndex] || [];

  // Gentle auto-slide when paused is false
  useEffect(() => {
    if (!isSlideshow || isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, [isSlideshow, isPaused, totalSlides]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > safeSlideIndex ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-[#F8F7FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block mb-3">
            VERIFIED TRAVELER REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E1B4B] tracking-tight leading-[1.12]">
            Loved by Modern Explorers
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#22213A]/60 leading-relaxed font-normal">
            Real feedback from travelers, commuters, and adventurers who pack Traliber for smoother journeys.
          </p>
        </div>

        {/* Slideshow Container (Pauses auto-play on hover) */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides Carousel */}
          <div className="min-h-[290px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={safeSlideIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? 32 : -32,
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                  },
                  exit: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? -32 : 32,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
              >
                {currentCards.map((item, idx) => (
                  <div
                    key={`${safeSlideIndex}-${item.id}-${idx}`}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-[#22213A]/[0.06] shadow-[0_2px_12px_rgba(30,27,75,0.02)] hover:shadow-[0_8px_24px_rgba(30,27,75,0.05)] transition-all duration-300 flex flex-col justify-between text-left cursor-default group"
                  >
                    <div>
                      {/* Header: Stars & Verified Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-full border border-emerald-200/50">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Verified Traveler
                        </div>
                      </div>

                      {/* Review Comment */}
                      <p className="text-xs sm:text-[13.5px] text-[#22213A]/75 leading-relaxed font-normal mb-6">
                        &ldquo;{item.comment}&rdquo;
                      </p>
                    </div>

                    {/* Author Info — Clean, Minimal, No Avatar */}
                    <div className="pt-4 border-t border-[#22213A]/[0.06]">
                      <h4 className="text-sm font-semibold text-[#1E1B4B] tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#22213A]/50 font-normal mt-0.5">
                        {item.role} {item.location ? `· ${item.location}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slideshow Controls (Rendered ONLY if more than 3 cards / totalSlides > 1) */}
          {isSlideshow && (
            <div className="mt-8 flex items-center justify-center gap-4">
              {/* Previous Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous reviews slide"
                className="w-8 h-8 rounded-full border border-[#22213A]/10 bg-white hover:bg-[#1E1B4B] hover:text-white hover:border-[#1E1B4B] text-[#22213A]/70 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Slide Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === safeSlideIndex
                        ? 'w-6 bg-[#4F75FF]'
                        : 'w-2 bg-[#22213A]/20 hover:bg-[#22213A]/40'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next reviews slide"
                className="w-8 h-8 rounded-full border border-[#22213A]/10 bg-white hover:bg-[#1E1B4B] hover:text-white hover:border-[#1E1B4B] text-[#22213A]/70 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Minimal WhatsApp Feedback Strip */}
        <div className="mt-14 max-w-2xl mx-auto text-center p-6 rounded-2xl bg-white border border-[#22213A]/[0.06] shadow-[0_2px_12px_rgba(30,27,75,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-semibold text-[#1E1B4B]">Traveled with Traliber recently?</h4>
            <p className="text-xs text-[#22213A]/60 mt-0.5">Share your feedback to receive a complimentary refill set.</p>
          </div>
          <a
            href={WHATSAPP_CONFIG.getLink('Hi Traliber! I would love to share my travel experience with the kit.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-semibold shadow-md transition-all duration-200"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            Share Your Story
          </a>
        </div>
      </div>
    </section>
  );
};
