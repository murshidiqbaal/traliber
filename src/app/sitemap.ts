import type { MetadataRoute } from 'next';
import { SITE_URL, absoluteUrl } from '@/lib/site';
import { TRAVEL_GUIDES } from '@/data/travel-guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastUpdated = '2026-10-31T00:00:00.000Z';

  // Core canonical indexable pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        absoluteUrl('/images/kit-display.webp'),
        absoluteUrl('/images/hero-alpine-mountain.webp'),
      ],
    },
    {
      url: absoluteUrl('/travel-essentials-kit'),
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        absoluteUrl('/images/kit-display.webp'),
        absoluteUrl('/images/products/pouch.webp'),
        absoluteUrl('/images/products/toothbrush.webp'),
        absoluteUrl('/images/products/toothpaste.webp'),
        absoluteUrl('/images/products/mini-sanitizer.webp'),
        absoluteUrl('/images/products/paper-soap.webp'),
        absoluteUrl('/images/products/wet-wipes.webp'),
        absoluteUrl('/images/products/wet-towel.webp'),
        absoluteUrl('/images/products/toilet-seat-cover.webp'),
        absoluteUrl('/images/products/face-mask.webp'),
        absoluteUrl('/images/products/cutlery-kit.webp'),
      ],
    },
    {
      url: absoluteUrl('/about'),
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        absoluteUrl('/images/founder.webp'),
        absoluteUrl('/images/logo.webp'),
      ],
    },
    {
      url: absoluteUrl('/faq'),
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [
        absoluteUrl('/images/kit-display.webp'),
      ],
    },
    {
      url: absoluteUrl('/travel-hygiene-guides'),
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [
        absoluteUrl('/images/kit-display.webp'),
      ],
    },
  ];

  // All 10 high-value travel hygiene & packing guide articles
  const guidePages: MetadataRoute.Sitemap = TRAVEL_GUIDES.map((guide) => ({
    url: absoluteUrl(`/travel-hygiene-guides/${guide.slug}`),
    lastModified: guide.dateModified,
    changeFrequency: 'monthly',
    priority: guide.featured ? 0.8 : 0.75,
    images: [
      absoluteUrl('/images/kit-display.webp'),
    ],
  }));

  return [...staticPages, ...guidePages];
}
