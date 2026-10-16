'use client';

import React from 'react';
import { useTraliberStore } from '@/context/TraliberStore';
import { Star, MessageSquareQuote, ShieldCheck, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useTraliberStore();

  const activeTestimonials = testimonials.filter((t) => t.isActive);

  if (activeTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden border-t border-[#8657F6]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-4 h-4" />
            Verified Traveler Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#22213A] tracking-tight">
            Loved Across 40+ Countries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#22213A]/70">
            From commercial airline crews to digital nomads and weekend wanderers, here is what travelers have to say about the Traliber 10-in-1 Kit.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTestimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-[#F8F7FC] p-6 border border-[#22213A]/5 hover:border-[#8657F6]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating ? 'fill-current text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-[11px] font-bold text-[#22213A]">
                    {t.rating}.0
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#22213A]/80 leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#22213A]/10 flex items-center gap-3">
                <img
                  src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#8657F6]/20"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-[#22213A] truncate">
                      {t.name}
                    </h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  </div>
                  <p className="text-[10px] text-[#8657F6] font-semibold truncate">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-[#22213A]/50 flex items-center gap-0.5 truncate">
                    <MapPin className="w-2.5 h-2.5" />
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
