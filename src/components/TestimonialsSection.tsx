'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, Quote, MessageCircle, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  trip: string;
  category: 'flyer' | 'nomad' | 'weekend';
  avatar: string;
  rating: number;
  date: string;
  highlight: string;
  quote: string;
  favoriteItem: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    role: 'Digital Nomad & UI Designer',
    location: 'Lisbon & Bali',
    trip: '3-Month Southeast Asia Tour',
    category: 'nomad',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    date: 'March 2026',
    highlight: 'No more spilled shampoo or liquid ziploc nightmares.',
    quote:
      'The chewable toothpaste tablets and paper soap leaves are absolute game changers. I zipped through 6 regional airports without taking a single thing out of my backpack. The cotton pouch keeps everything impeccably clean and organized.',
    favoriteItem: 'Chewable Toothpaste Tabs & Paper Soap',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Management Consultant',
    location: 'Tokyo & Singapore',
    trip: 'Weekly Transpacific Business Commutes',
    category: 'flyer',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    date: 'February 2026',
    highlight: 'Breezed through airport security in record time.',
    quote:
      'I fly twice a week for work and used to hate hotel miniature soaps that ruin your skin. Traliber fits inside my brief carry-on, satisfies every TSA liquid rule effortlessly, and the flushable seat covers provide genuine peace of mind in transit.',
    favoriteItem: 'Flushable Seat Liners & 3D Travel Mask',
  },
  {
    id: '3',
    name: 'Sophia Lindqvist',
    role: 'Travel Journalist & Photographer',
    location: 'Stockholm & Kyoto',
    trip: 'Scandinavian Train & Overnight Expedition',
    category: 'weekend',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    date: 'January 2026',
    highlight: 'The compressed coin towels expanded like magic.',
    quote:
      'When our sleeper train ran out of washroom water, the compressed coin towels and mini sanitizers saved the entire morning. Beautiful aesthetics, sustainable materials, and thoughtfully chosen essentials that you actually use.',
    favoriteItem: 'Compressed Towels & Steel Cutlery Kit',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'flyer' | 'nomad' | 'weekend'>('all');

  const filteredTestimonials =
    activeTab === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((item) => item.category === activeTab);

  return (
    <section id="testimonials" className="py-24 bg-[#F8F7FC] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[#788CF5]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 rounded-full bg-[#8657F6]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#8657F6]/25 shadow-2xs text-xs font-bold text-[#8657F6]">
            <Sparkles className="w-3.5 h-3.5 text-[#8657F6]" />
            Verified Traveler Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#22213A] tracking-tight">
            Loved by{' '}
            <span className="bg-gradient-to-r from-[#8657F6] via-[#788CF5] to-[#55C7DE] bg-clip-text text-transparent">
              2,400+ Globetrotters
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#22213A]/70 leading-relaxed font-normal">
            From red-eye international flights to remote weekend treks, discover how Traliber has eliminated personal-care hassle for travelers across 48+ countries.
          </p>

          {/* Social Proof Stats Banner */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#8657F6]/10 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#8657F6]">4.95 / 5</div>
              <div className="flex items-center justify-center gap-0.5 my-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#22213A]/60 font-semibold">Average Star Rating</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#8657F6]/10 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#22213A]">99.8%</div>
              <p className="text-xs text-[#22213A]/80 font-bold mt-2">TSA & Cabin Ready</p>
              <p className="text-2xs text-[#22213A]/60">Zero airport confiscations</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#8657F6]/10 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#788CF5]">48+</div>
              <p className="text-xs text-[#22213A]/80 font-bold mt-2">Countries Reached</p>
              <p className="text-2xs text-[#22213A]/60">Tested on every continent</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#8657F6]/10 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#55C7DE]">100%</div>
              <p className="text-xs text-[#22213A]/80 font-bold mt-2">Leak-Free Design</p>
              <p className="text-2xs text-[#22213A]/60">Zero messy liquid spills</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#22213A] text-white shadow-md'
                : 'bg-white text-[#22213A]/70 hover:bg-white/80 hover:text-[#22213A] border border-[#22213A]/10'
            }`}
          >
            All Reviews ({TESTIMONIALS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('flyer')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'flyer'
                ? 'bg-[#8657F6] text-white shadow-md'
                : 'bg-white text-[#22213A]/70 hover:bg-white/80 hover:text-[#22213A] border border-[#22213A]/10'
            }`}
          >
            Frequent Flyers
          </button>
          <button
            onClick={() => setActiveTab('nomad')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'nomad'
                ? 'bg-[#8657F6] text-white shadow-md'
                : 'bg-white text-[#22213A]/70 hover:bg-white/80 hover:text-[#22213A] border border-[#22213A]/10'
            }`}
          >
            Digital Nomads
          </button>
          <button
            onClick={() => setActiveTab('weekend')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'weekend'
                ? 'bg-[#8657F6] text-white shadow-md'
                : 'bg-white text-[#22213A]/70 hover:bg-white/80 hover:text-[#22213A] border border-[#22213A]/10'
            }`}
          >
            Weekend Explorers
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 border border-[#8657F6]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header: Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 text-3xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Buyer
                  </div>
                </div>

                {/* Highlight Quote */}
                <h3 className="text-base font-bold text-[#22213A] mb-3 leading-snug group-hover:text-[#8657F6] transition-colors">
                  &ldquo;{item.highlight}&rdquo;
                </h3>

                {/* Main Review Text */}
                <p className="text-sm text-[#22213A]/75 leading-relaxed font-normal mb-6">
                  {item.quote}
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="space-y-4 pt-4 border-t border-[#8657F6]/10">
                {/* Favorite Item Tag */}
                <div className="text-xs bg-[#F8F7FC] rounded-xl px-3 py-2 border border-[#8657F6]/10 flex items-center justify-between">
                  <span className="text-[#22213A]/60 font-medium">Top Pick:</span>
                  <span className="font-bold text-[#8657F6] truncate max-w-[190px]">
                    {item.favoriteItem}
                  </span>
                </div>

                {/* Reviewer Profile */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#8657F6]/20 shadow-xs"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#22213A] leading-tight">{item.name}</h4>
                    <p className="text-xs text-[#22213A]/60 font-medium">{item.role}</p>
                    <p className="text-3xs text-[#8657F6] font-semibold mt-0.5">{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Testimonial / Story Invite Banner */}
        <div className="mt-14 max-w-4xl mx-auto bg-gradient-to-r from-[#22213A] via-[#2A2948] to-[#1E1D33] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#8657F6]/20">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#55C7DE]">
              <MessageCircle className="w-4 h-4" />
              Traveled with Traliber recently?
            </div>
            <h4 className="text-lg sm:text-xl font-bold">Share Your Travel Story on WhatsApp</h4>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg">
              Send us a photo of your Traliber kit from your travels to receive a complimentary refill set on your next order.
            </p>
          </div>

          <a
            href={WHATSAPP_CONFIG.getLink('I would love to share my Traliber travel feedback!')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/25 hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Send Review on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
