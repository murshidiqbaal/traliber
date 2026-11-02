'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { getPublishedGallery, extractCategories, type ShowcaseGalleryItem } from '@/lib/showcase';

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  items: ShowcaseGalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index];

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[75vh] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image_url}
            alt={item.alt_text || item.title}
            className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Caption */}
        {(item.title || item.description) && (
          <div className="text-center text-white space-y-1 max-w-xl px-4">
            {item.title && (
              <p className="text-sm font-bold">{item.title}</p>
            )}
            {item.description && (
              <p className="text-xs text-white/70">{item.description}</p>
            )}
          </div>
        )}

        {/* Counter */}
        <p className="text-xs text-white/40">
          {index + 1} / {items.length}
        </p>
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────

interface GalleryCardProps {
  item: ShowcaseGalleryItem;
  onClick: () => void;
}

function GalleryCard({ item, onClick }: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-[#22213A]/5 aspect-[4/3] w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8657F6]"
      aria-label={`View: ${item.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image_url}
        alt={item.alt_text || item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Caption bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-bold truncate">{item.title}</p>
        {item.category && (
          <p className="text-white/60 text-3xs mt-0.5">{item.category}</p>
        )}
      </div>
    </button>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-[#22213A]/8 aspect-[4/3] animate-pulse" />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShowcaseGallery() {
  const [items, setItems] = useState<ShowcaseGalleryItem[]>([]);
  const [filtered, setFiltered] = useState<ShowcaseGalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    getPublishedGallery().then((data) => {
      setItems(data);
      setFiltered(data);
      setCategories(extractCategories(data));
      setLoading(false);
    });
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setFiltered(cat === 'All' ? items : items.filter((i) => i.category === cat));
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const goNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  // Don't render section at all if no published items (after loading)
  if (!loading && items.length === 0) return null;

  const imageGallerySchema = items.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Explore the World with Traliber | Travel Showcase',
    description: 'A glimpse of travel, experiences, and the essentials that make every journey better.',
    image: items.map((item) => ({
      '@type': 'ImageObject',
      contentUrl: item.image_url,
      name: item.title,
      description: item.description || item.title,
      caption: item.alt_text || item.title,
    })),
  } : null;

  return (
    <>
      {imageGallerySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
        />
      )}
      <section ref={sectionRef} className="py-20 sm:py-28 bg-white" aria-label="Showcase Gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold uppercase tracking-wider">
              Gallery
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#22213A] leading-tight">
              Explore the World with Traliber
            </h2>
            <p className="text-[#22213A]/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              A glimpse of travel, experiences, and the essentials that make every journey better.
            </p>
          </div>

          {/* Category Filters */}
          {!loading && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    activeCategory === cat
                      ? 'bg-[#8657F6] text-white border-[#8657F6] shadow-md'
                      : 'bg-white text-[#22213A]/70 border-[#22213A]/15 hover:border-[#8657F6]/40 hover:text-[#8657F6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((item, idx) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onClick={() => openLightbox(idx)}
                  />
                ))}
          </div>

          {/* Empty state (after filtering) */}
          {!loading && filtered.length === 0 && items.length > 0 && (
            <div className="text-center py-16 text-[#22213A]/40 text-sm">
              No images in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}

