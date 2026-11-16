import type { MetadataRoute } from 'next';
import { SITE_URL, absoluteUrl } from '@/lib/site';
import { TRAVEL_GUIDES } from '@/data/travel-guides';

/**
 * Production XML Sitemap for Traliber (https://traliber.in/sitemap.xml)
 * 
 * Strict Canonical Policy:
 * 1. Only 200 OK indexable canonical URLs are included.
 * 2. Static, stable lastModified ISO timestamps (prevents Search Console crawl churn).
 * 3. All image URLs are fully qualified absolute HTTPS URLs on traliber.in.
 * 4. Excludes private /admin, /api, and preview deployment URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const coreLastModified = '2026-10-31T00:00:00.000Z';
  const policyLastModified = '2026-10-31T00:00:00.000Z';

  // Core canonical indexable pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: coreLastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        absoluteUrl('/images/kit-display.webp'),
        absoluteUrl('/images/hero-alpine-mountain.webp'),
      ],
    },
    {
      url: absoluteUrl('/travel-essentials-kit'),
      lastModified: coreLastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
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
      url: absoluteUrl('/build-your-kit'),
      lastModified: coreLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        absoluteUrl('/images/kit-display.webp'),
        absoluteUrl('/images/hero-alpine-mountain.webp'),
      ],
    },
    {
      url: absoluteUrl('/about'),
      lastModified: coreLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [
        absoluteUrl('/images/aldrino.jpeg'),
        absoluteUrl('/images/logo.webp'),
      ],
    },
    {
      url: absoluteUrl('/faq'),
      lastModified: coreLastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [
        absoluteUrl('/images/kit-display.webp'),
      ],
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: coreLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/shipping-policy'),
      lastModified: policyLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/refund-policy'),
      lastModified: policyLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: policyLastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/terms'),
      lastModified: policyLastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/travel-hygiene-guides'),
      lastModified: coreLastModified,
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
