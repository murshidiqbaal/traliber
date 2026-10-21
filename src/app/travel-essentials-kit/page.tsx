import type { Metadata } from 'next';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { WHATSAPP_CONFIG, TRALIBER_KIT_ITEMS, TRALIBER_POUCH } from '@/data/traliber-kit';
import { Check, ShieldCheck, Sparkles, MessageCircle, ArrowLeft, ArrowRight, Package, MapPin } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.traliber.com';

export const metadata: Metadata = {
  title: 'Traliber Travel Essentials Kit | 10-Item Personal Care & Hygiene Kit',
  description:
    'Detailed overview of the Traliber Travel Essentials Kit: 10 travel hygiene and personal care items in one water-resistant pouch for ₹199. Enquire on WhatsApp.',
  keywords: [
    'Traliber Travel Essentials Kit',
    'travel hygiene kit India',
    'travel personal care kit',
    'compact travel essentials pouch',
    'train travel hygiene kit',
    'flight travel kit',
  ],
  alternates: {
    canonical: '/travel-essentials-kit',
  },
  openGraph: {
    title: 'Traliber Travel Essentials Kit | 10-Item Travel Hygiene Kit',
    description:
      'Explore the contents of the Traliber Travel Essentials Kit. Sized for long journeys and short breaks. Available for ₹199 via WhatsApp.',
    url: `${siteUrl}/travel-essentials-kit`,
    images: [
      {
        url: '/images/kit-display.webp',
        width: 1200,
        height: 630,
        alt: 'Traliber Travel Essentials Kit complete 10-item display and water-resistant pouch',
      },
    ],
  },
};

export default function TravelEssentialsKitPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Traliber Travel Essentials Kit',
    image: `${siteUrl}/images/kit-display.webp`,
    description:
      'A compact travel kit containing 10 essential personal care and hygiene items organized in a water-resistant travel pouch.',
    brand: {
      '@type': 'Brand',
      name: 'Traliber',
    },
    sku: 'TRL-KIT-01',
    category: 'Travel Accessories > Personal Care Kits',
    offers: {
      '@type': 'Offer',
      price: '199',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/travel-essentials-kit`,
      seller: {
        '@type': 'Organization',
        name: 'Traliber',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Travel Essentials Kit',
        item: `${siteUrl}/travel-essentials-kit`,
      },
    ],
  };

  const allItems = [
    {
      name: 'Travel Essentials Pouch',
      qty: '1 Pouch',
      category: 'Organizer',
      format: 'Water-resistant synthetic canvas with dual zippers & carry handle',
      use: 'Keeps all 10 personal care items centralized and accessible during transit.',
      image: '/images/products/pouch.webp',
    },
    {
      name: 'Toothbrush Set',
      qty: '1 Set',
      category: 'Oral Care',
      format: 'Two-piece travel format with ventilated protective cap',
      use: 'Protects bristles and provides ergonomic reach for morning routines on the go.',
      image: '/images/products/toothbrush.webp',
    },
    {
      name: 'Mountain Mint Travel Toothpaste',
      qty: '1 Tube (10g)',
      category: 'Oral Care',
      format: 'Sealed compact squeeze tube with screw cap',
      use: 'Compact toothpaste sized for carry-on compliance and short travel journeys.',
      image: '/images/products/toothpaste.webp',
    },
    {
      name: 'Pocket Mist Sanitizers',
      qty: '5 Individual Bottles (15ml)',
      category: 'Hygiene',
      format: 'Fine-mist pocket spray atomizers',
      use: 'Distribute across bags or share with travel companions for fast hand sanitization.',
      image: '/images/products/mini-sanitizer.webp',
    },
    {
      name: 'Travel Wet Wipes',
      qty: '2 Packets',
      category: 'Hygiene',
      format: 'Moisture-locked sealed foil packets',
      use: 'Quick skin and surface cleanups during train journeys and transit stops.',
      image: '/images/products/wet-wipes.webp',
    },
    {
      name: 'Refreshing Wet Towel',
      qty: '1 Sachet',
      category: 'Comfort & Utility',
      format: 'Individually wrapped single-use towel sachet',
      use: 'Instant face and neck refreshment after long hours in transit.',
      image: '/images/products/wet-towel.webp',
    },
    {
      name: 'Toilet Seat Covers',
      qty: '2 Covers',
      category: 'Hygiene',
      format: 'Folded paper liners, flushable and biodegradable',
      use: 'Sanitary barrier protection for public restrooms, stations, and trains.',
      image: '/images/products/toilet-seat-cover.webp',
    },
    {
      name: 'Protective Face Mask',
      qty: '1 Mask',
      category: 'Comfort & Utility',
      format: 'Breathable 3-layer mask with soft ear loops',
      use: 'Protection against station dust, crowded environments, and dry transit cabin air.',
      image: '/images/products/face-mask.webp',
    },
    {
      name: 'Water-Soluble Paper Soap',
      qty: '1 Pack (50 Sheets)',
      category: 'Hygiene',
      format: 'Pocket flip-box containing 50 dry dissolvable soap leaves',
      use: 'Lather with water anywhere without relying on empty public soap dispensers.',
      image: '/images/products/paper-soap.webp',
    },
    {
      name: 'Travel Cutlery Kit',
      qty: '1 Set & Case',
      category: 'Comfort & Utility',
      format: 'Fork, spoon, knife, chopsticks & napkin in slim protective sleeve',
      use: 'Hygienic personal dining on trains, flights, and road trips.',
      image: '/images/products/cutlery-kit.webp',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#22213A]/60">
              <li>
                <a href="/" className="hover:text-[#4F75FF] transition-colors">
                  Home
                </a>
              </li>
              <li>/</li>
              <li className="text-[#1E1B4B] font-bold">Travel Essentials Kit</li>
            </ol>
          </nav>

          {/* Product Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 bg-white rounded-3xl p-6 sm:p-10 border border-[#22213A]/[0.08] shadow-[0_8px_30px_rgba(30,27,75,0.03)]">
            {/* Visual Showcase */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden bg-[#F8F7FC] flex items-center justify-center p-6 border border-[#22213A]/[0.06]">
                <img
                  src="/images/kit-display.webp"
                  alt="Traliber Travel Essentials Kit with 10 travel hygiene items displayed around water-resistant pouch"
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
            </div>

            {/* Product Overview & Action */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#4F75FF] bg-[#4F75FF]/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMPLETE 10-ITEM TRAVEL HYGIENE COLLECTION</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.12]">
                Traliber Travel Essentials Kit
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-serif font-extrabold text-[#1E1B4B]">
                  ₹199
                </span>
                <span className="text-sm text-[#22213A]/60 font-medium">
                  Inclusive of all 10 essentials + pouch
                </span>
              </div>

              <p className="text-base sm:text-lg text-[#22213A]/75 leading-relaxed font-normal">
                A thoughtfully coordinated travel companion designed for trains, flights, and road trips. Brings together oral care, sanitization, dining utensils, and public restroom barriers into one compact water-resistant pouch.
              </p>

              <div className="pt-2 pb-4 space-y-2.5 text-xs sm:text-sm text-[#22213A]/80 border-t border-b border-[#22213A]/[0.08]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>10 Verified Items:</strong> Everything you need for everyday travel routines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Sub-100ml Friendly:</strong> Sized for domestic &amp; international cabin luggage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Direct Concierge Ordering:</strong> No complicated forms—order directly on WhatsApp</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={WHATSAPP_CONFIG.getLink("Hi Traliber, I would like to order the Travel Essentials Kit for ₹199.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white font-bold text-sm sm:text-base shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span>Order via WhatsApp — ₹199</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section: Complete Item Breakdown */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block mb-2">
                FULL INVENTORY BREAKDOWN
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1E1B4B] tracking-tight">
                What&apos;s Inside Every Kit
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#22213A]/70">
                Verified contents, formats, and intended travel uses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#22213A]/[0.08] shadow-[0_4px_20px_rgba(30,27,75,0.02)] flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#F8F7FC] flex items-center justify-center p-2 border border-[#22213A]/[0.05] shrink-0 mx-auto sm:mx-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1.5 text-left flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-bold text-lg text-[#1E1B4B]">{item.name}</h3>
                      <span className="text-xs font-mono font-bold text-[#8657F6] bg-[#8657F6]/10 px-2.5 py-0.5 rounded-full">
                        {item.qty}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#22213A]/60">{item.format}</p>
                    <p className="text-xs sm:text-sm text-[#22213A]/75 leading-relaxed pt-1">
                      {item.use}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Practical Travel Scenarios */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#22213A]/[0.08] shadow-[0_8px_30px_rgba(30,27,75,0.03)] text-left mb-20">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E1B4B] mb-8">
              Where Traliber Proves Most Useful
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F8F7FC] border border-[#22213A]/[0.05] space-y-3">
                <h3 className="font-bold text-base text-[#1E1B4B]">Overnight Train Journeys</h3>
                <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed">
                  Keep your toilet seat covers, paper soap, and toothbrush set right in your berth pocket. No more balancing big toiletry bags in moving train aisles.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F8F7FC] border border-[#22213A]/[0.05] space-y-3">
                <h3 className="font-bold text-base text-[#1E1B4B]">Airport Layovers &amp; Flights</h3>
                <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed">
                  Refresh with wet towels and sanitize before meals without searching your overhead luggage. Compact sub-100ml sizing keeps checkpoint screening smooth.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F8F7FC] border border-[#22213A]/[0.05] space-y-3">
                <h3 className="font-bold text-base text-[#1E1B4B]">Highway Pit-Stops &amp; Day Trips</h3>
                <p className="text-xs sm:text-sm text-[#22213A]/70 leading-relaxed">
                  Public restrooms at roadside dhabas and fuel stations often run out of hand soap. Your 50-sheet paper soap box and pocket sanitizer keep your hands clean anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="bg-[#1E1B4B] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Get Your Traliber Travel Kit
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
              Order your kit for ₹199 with direct WhatsApp concierge support. Ask questions about delivery coverage, bulk orders, or dispatch timelines.
            </p>
            <div>
              <a
                href={WHATSAPP_CONFIG.getLink("Hi Traliber, I'd like to order the Travel Essentials Kit for ₹199.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat &amp; Order on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
