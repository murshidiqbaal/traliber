'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  CheckCircle,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Upload,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore, Testimonial } from '@/context/TraliberStore';
import { supabase } from '@/lib/supabase';

const CARDS_PER_SLIDE = 3;

export const TestimonialsSection: React.FC = () => {
  const { testimonials, addTestimonial } = useTraliberStore();

  // Review modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('Verified Traveler');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeTestimonials = testimonials.filter((t) => t.isActive !== false);
  const totalCount = activeTestimonials.length;

  // Group testimonials into complete sets of 3 cards each.
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

  // Handle Photo selection
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size must be less than 5MB.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormError(null);
  };

  // Submit Testimonial directly to Supabase & Store
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 8) {
      setFormError('Please enter a review of at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    let avatarUrl = '';

    // Upload to Supabase Storage bucket 'testimonials' if provided
    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop() || 'jpg';
        const cleanExt = fileExt.toLowerCase().replace(/[^a-z0-9]/g, '');
        const fileName = `review-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${cleanExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('testimonials')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('testimonials')
            .getPublicUrl(uploadData.path);
          avatarUrl = publicUrlData.publicUrl;
        } else if (uploadError) {
          console.warn('Storage upload note:', uploadError.message);
          // If storage bucket isn't set up yet, fallback to preview url or skip
        }
      } catch (err) {
        console.warn('Error during image upload:', err);
      }
    }

    try {
      await addTestimonial({
        name: name.trim(),
        role: role.trim() || 'Verified Traveler',
        location: location.trim(),
        rating,
        comment: comment.trim(),
        avatar: avatarUrl,
        isActive: true,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        // Reset form
        setName('');
        setRole('Verified Traveler');
        setLocation('');
        setRating(5);
        setComment('');
        setImageFile(null);
        setImagePreview(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to submit review:', err);
      setFormError('Failed to publish review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingDescriptions: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Exceptional',
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-[#F8F7FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block mb-3">
            VERIFIED TRAVELER REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E1B4B] tracking-tight leading-[1.12]">
            Loved by Modern Explorers
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#22213A]/60 leading-relaxed font-normal">
            Real feedback from travelers, commuters, and adventurers who pack Traliber for smoother journeys.
          </p>

          {/* Add Review Action Button */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] active:scale-[0.98] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#55C7DE]" />
              <span>Write a Review</span>
            </button>
          </div>
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

                    {/* Author Info */}
                    <div className="pt-4 border-t border-[#22213A]/[0.06] flex items-center gap-3">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-9 h-9 rounded-full object-cover border border-[#22213A]/10 shrink-0"
                          onError={(e) => {
                            // If image fails to load, gracefully hide it
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#EEF2FF] text-[#4F75FF] font-bold text-xs flex items-center justify-center shrink-0">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-[#1E1B4B] tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#22213A]/50 font-normal mt-0.5">
                          {item.role} {item.location ? `· ${item.location}` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slideshow Controls */}
          {isSlideshow && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous reviews slide"
                className="w-8 h-8 rounded-full border border-[#22213A]/10 bg-white hover:bg-[#1E1B4B] hover:text-white hover:border-[#1E1B4B] text-[#22213A]/70 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

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

        {/* Feedback & WhatsApp Strip */}
        <div className="mt-14 max-w-2xl mx-auto p-6 rounded-2xl bg-white border border-[#22213A]/[0.06] shadow-[0_2px_12px_rgba(30,27,75,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-semibold text-[#1E1B4B]">Traveled with Traliber recently?</h4>
            <p className="text-xs text-[#22213A]/60 mt-0.5">Share your feedback to receive a complimentary refill set.</p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-semibold shadow-md transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#55C7DE]" />
              <span>Leave a Review</span>
            </button>
            <a
              href={WHATSAPP_CONFIG.getLink('Hi Traliber! I would love to share my travel experience with the kit.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* CUSTOMER REVIEW SUBMISSION MODAL                               */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="fixed inset-0 bg-[#1E1B4B]/60 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#22213A]/[0.08] z-10 my-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                disabled={isSubmitting}
                className="absolute top-5 right-5 p-2 rounded-full text-[#22213A]/40 hover:text-[#22213A] hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                /* Success Screen */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1E1B4B]">
                    Review Published!
                  </h3>
                  <p className="text-sm text-[#22213A]/70 max-w-sm mx-auto leading-relaxed">
                    Thank you for sharing your journey. Your review is now live on our website and synced to Supabase.
                  </p>
                </div>
              ) : (
                /* Review Submission Form */
                <div>
                  <div className="mb-6 text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4F75FF] block mb-1">
                      COMMUNITY FEEDBACK
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#1E1B4B] tracking-tight">
                      Share Your Travel Experience
                    </h3>
                    <p className="text-xs text-[#22213A]/60 mt-1 leading-relaxed">
                      Tell fellow travelers how the Traliber kit helped on your journey.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                    {/* Interactive Star Rating */}
                    <div>
                      <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                            aria-label={`${star} Stars`}
                          >
                            <Star
                              className={`w-6 h-6 ${(hoverRating || rating) >= star ? 'fill-current' : 'text-gray-200'}`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-mono font-bold text-[#4F75FF] ml-2">
                          {ratingDescriptions[hoverRating || rating]} ({hoverRating || rating}/5)
                        </span>
                      </div>
                    </div>

                    {/* Name & Role Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Elena Rostova"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#22213A]/15 focus:border-[#4F75FF] focus:ring-2 focus:ring-[#4F75FF]/20 text-xs sm:text-sm text-[#1E1B4B] placeholder:text-gray-400 outline-hidden transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1">
                          Traveler Type / Role
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. Solo Backpacker, Frequent Flyer"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#22213A]/15 focus:border-[#4F75FF] focus:ring-2 focus:ring-[#4F75FF]/20 text-xs sm:text-sm text-[#1E1B4B] placeholder:text-gray-400 outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1">
                        Location / Travel Route
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Bengaluru, India or Tokyo & Bali"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#22213A]/15 focus:border-[#4F75FF] focus:ring-2 focus:ring-[#4F75FF]/20 text-xs sm:text-sm text-[#1E1B4B] placeholder:text-gray-400 outline-hidden transition-all"
                      />
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1">
                        Your Review <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="How did the kit perform during your journey? What items were your favorites?"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#22213A]/15 focus:border-[#4F75FF] focus:ring-2 focus:ring-[#4F75FF]/20 text-xs sm:text-sm text-[#1E1B4B] placeholder:text-gray-400 outline-hidden transition-all resize-none"
                      />
                    </div>

                    {/* Optional Photo Upload */}
                    <div>
                      <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1">
                        Add Photo (Optional)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoSelect}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-dashed border-[#22213A]/25 hover:border-[#4F75FF] text-xs font-semibold text-[#22213A]/70 hover:text-[#4F75FF] transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{imageFile ? 'Change Photo' : 'Upload Journey Photo'}</span>
                        </button>
                        {imagePreview && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#4F75FF]/40">
                            <img
                              src={imagePreview}
                              alt="Upload preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="text-[11px] text-[#22213A]/45">
                          {imageFile ? imageFile.name : 'JPEG, PNG, WebP up to 5MB'}
                        </span>
                      </div>
                    </div>

                    {/* Error display */}
                    {formError && (
                      <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                        {formError}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="pt-3 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        disabled={isSubmitting}
                        className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#22213A]/60 hover:text-[#22213A] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] active:scale-[0.98] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#55C7DE]" />
                            <span>Publishing to Supabase...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-[#55C7DE]" />
                            <span>Publish Review</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
