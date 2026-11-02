import type { Metadata } from 'next';
import { BenefitsSection } from '@/components/BenefitsSection';
import { PricingSection } from '@/components/PricingSection';
import { EditorialStorytellingSection } from '@/components/EditorialStorytellingSection';
import { FounderSection } from '@/components/FounderSection';
import { HeroSection } from '@/components/HeroSection';
import { KitRevealSection } from '@/components/KitRevealSection';
import { Navbar } from '@/components/Navbar';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { WhatsInsideSection } from '@/components/WhatsInsideSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import ShowcaseGallery from '@/components/ShowcaseGallery';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Travel Essentials Kit Online in India | Traliber',
  description:
    'Shop convenient travel essentials kits online with Traliber. Carry everyday travel hygiene necessities including sanitiser, wipes, toothbrushes and more in one convenient travel kit.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Travel Essentials Kit Online in India | Traliber',
    description:
      'Shop convenient travel essentials kits online with Traliber. Carry everyday travel hygiene necessities including sanitiser, wipes, toothbrushes and more in one convenient travel kit.',
    url: SITE_URL,
    siteName: 'Traliber',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/kit-display.webp',
        width: 1200,
        height: 630,
        alt: 'Traliber Travel Essentials Kit with 10 travel hygiene and personal care items',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Essentials Kit Online in India | Traliber',
    description:
      'Shop convenient travel essentials kits online with Traliber. Carry everyday travel hygiene necessities including sanitiser, wipes, toothbrushes and more in one convenient travel kit.',
    images: ['/images/kit-display.webp'],
  },
};

export default function Home() {
  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Traliber Travel Essentials Kit | Online in India',
    url: SITE_URL,
    description:
      'Shop convenient travel essentials kits online with Traliber. Carry everyday travel hygiene necessities including sanitiser, wipes, toothbrushes and more in one convenient travel kit.',
    inLanguage: 'en-IN',
    mainEntity: {
      '@type': 'Product',
      name: 'Traliber Travel Essentials Kit',
      image: `${SITE_URL}/images/kit-display.webp`,
      description:
        'A compact travel kit containing 10 essential personal care and hygiene items organized in a water-resistant travel pouch.',
      brand: {
        '@type': 'Brand',
        name: 'Traliber',
      },
      offers: {
        '@type': 'Offer',
        price: '199',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/travel-essentials-kit`,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A] selection:bg-[#8657F6]/20 selection:text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />

      {/* Sticky Brand Navigation */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* SECTION 1: Landing Page / Alpine Mountain Hero */}
        <HeroSection />

        {/* SECTION 2: What's Inside — Ten little things. A big difference. */}
        <WhatsInsideSection />

        {/* SECTION 3: Full-width scroll-driven product unpacking animation */}
        <KitRevealSection />

        {/* SECTION 4: Single-Frame Editorial Product Storytelling pinned on scroll */}
        <EditorialStorytellingSection />

        {/* SECTION 5: Product benefits and travel lifestyle content */}
        <BenefitsSection />

        {/* SECTION 6: Dedicated Product Pricing Section (₹199) */}
        <PricingSection />

        {/* SECTION 7: Traveler reviews & social proof */}
        <TestimonialsSection />

        {/* SECTION 8: Founder story and mission */}
        <FounderSection />

        {/* SECTION 9: Showcase Gallery – dynamic, from Supabase */}
        <ShowcaseGallery />

        {/* SECTION 10: Answer Engine Optimized FAQ Section */}
        <FaqSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Sticky WhatsApp Concierge Button */}
      <WhatsAppFloat />
    </div>
  );
}
