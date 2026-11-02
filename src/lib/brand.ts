import { SITE_URL, absoluteUrl } from './site';

/**
 * Central Brand Entity & Source of Truth for Traliber.
 * All metadata, structured data, public copy, and llms.txt reference this module
 * to prevent inconsistencies across traditional search engines and AI systems.
 */

export const BRAND = {
  name: 'Traliber',
  legalName: 'Traliber',
  tagline: 'For a Cleaner Tomorrow.',
  website: SITE_URL,
  canonicalDomain: 'https://traliber.in',
  businessType: 'Online travel essentials and travel kit brand',
  industry: 'Travel Accessories & Personal Hygiene',
  locale: 'en_IN',
  foundingLocation: 'India',
  
  description:
    'Traliber is an Indian travel essentials brand offering convenient, pre-packed travel hygiene and personal care kits for trains, flights, road trips, and weekend journeys. Each kit combines ten everyday travel hygiene necessities into one compact, water-resistant pouch.',

  shortDescription:
    'Convenient travel essentials kits online in India with 10 pre-packed personal care and hygiene products in a water-resistant pouch.',

  founder: {
    name: 'Aldrino Francis',
    role: 'Founder & Product Architect',
    image: absoluteUrl('/images/aldrino.jpeg'),
    sameAs: 'https://traliber.in/about',
  },

  contact: {
    phone: '+91 89210 19251',
    phoneFormatted: '+91 89210 19251',
    whatsappNumber: '918921019251',
    whatsappLink: 'https://wa.me/918921019251?text=Hi%20Traliber%2C%20I%20would%20like%20to%20order%20the%20Travel%20Essentials%20Kit!',
    email: 'support@traliber.in',
    operatingCountry: 'IN',
    operatingRegion: 'India',
    customerServiceHours: 'Monday to Saturday, 9:00 AM – 8:00 PM IST',
  },

  product: {
    name: 'Traliber Travel Essentials Kit',
    sku: 'TRL-KIT-01',
    price: 199,
    currency: 'INR',
    priceFormatted: '₹199',
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    category: 'Travel Accessories > Personal Care Kits',
    primaryImage: absoluteUrl('/images/kit-display.webp'),
    pouchImage: absoluteUrl('/images/products/pouch.webp'),
    url: absoluteUrl('/travel-essentials-kit'),
    
    // Exact 10 items in kit — verified facts only, no fabricated claims
    items: [
      {
        order: 1,
        name: 'Travel Essentials Pouch',
        quantity: 1,
        quantityLabel: '1 unit',
        role: 'Central Organizer',
        description: 'Water-resistant travel organizer pouch with reinforced dual zippers and carrying handle.',
        image: absoluteUrl('/images/products/pouch.webp'),
      },
      {
        order: 2,
        name: 'Toothbrush Set',
        quantity: 1,
        quantityLabel: '1 unit with hygienic cap',
        role: 'Oral Hygiene',
        description: 'Ergonomic handle toothbrush with soft micro-bristles and a ventilated travel cap.',
        image: absoluteUrl('/images/products/toothbrush.webp'),
      },
      {
        order: 3,
        name: 'Travel Toothpaste',
        quantity: 1,
        quantityLabel: '1 tube (10g)',
        role: 'Oral Hygiene',
        description: 'Mountain mint travel toothpaste in a lightweight leak-proof squeeze tube.',
        image: absoluteUrl('/images/products/toothpaste.webp'),
      },
      {
        order: 4,
        name: 'Mini Sanitizer',
        quantity: 5,
        quantityLabel: '5 pocket bottles (15ml each)',
        role: 'Hand Sanitization',
        description: 'Five individual pocket spray sanitizer bottles for quick on-the-go sanitization.',
        image: absoluteUrl('/images/products/mini-sanitizer.webp'),
      },
      {
        order: 5,
        name: 'Wet Wipes',
        quantity: 2,
        quantityLabel: '2 packets',
        role: 'Surface & Skin Refreshment',
        description: 'Moisture-locked travel wet wipes for quick refreshment during long journeys.',
        image: absoluteUrl('/images/products/wet-wipes.webp'),
      },
      {
        order: 6,
        name: 'Wet Towel',
        quantity: 1,
        quantityLabel: '1 sealed sachet',
        role: 'Personal Cleansing',
        description: 'Individually sealed wet towel sachet for refreshing face and hands during transit.',
        image: absoluteUrl('/images/products/wet-towel.webp'),
      },
      {
        order: 7,
        name: 'Toilet Seat Covers',
        quantity: 2,
        quantityLabel: '2 disposable covers',
        role: 'Restroom Sanitation',
        description: 'Flushable paper toilet seat covers for hygienic public restroom visits on trains and highways.',
        image: absoluteUrl('/images/products/toilet-seat-cover.webp'),
      },
      {
        order: 8,
        name: 'Face Mask',
        quantity: 1,
        quantityLabel: '1 protective mask',
        role: 'Dust & Airway Protection',
        description: 'Breathable 3-layer protective face mask for crowded terminals and transit hubs.',
        image: absoluteUrl('/images/products/face-mask.webp'),
      },
      {
        order: 9,
        name: 'Paper Soap',
        quantity: 1,
        quantityLabel: '1 flip-box (50 sheets)',
        role: 'Hand Hygiene',
        description: 'Water-soluble paper soap leaves in a compact flip-box for handwashing when soap is unavailable.',
        image: absoluteUrl('/images/products/paper-soap.webp'),
      },
      {
        order: 10,
        name: 'Cutlery Kit',
        quantity: 1,
        quantityLabel: '1 reusable set with case',
        role: 'Meal Hygiene',
        description: 'Reusable dining kit containing fork, spoon, knife, and chopsticks in a travel case.',
        image: absoluteUrl('/images/products/cutlery-kit.webp'),
      },
    ],
  },
} as const;

/**
 * Verified Organization Schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.website,
    logo: absoluteUrl('/images/logo.webp'),
    slogan: BRAND.tagline,
    description: BRAND.description,
    email: BRAND.contact.email,
    telephone: BRAND.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND.contact.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
      contactOption: 'WhatsApp Support',
      areaServed: 'IN',
    },
    founder: {
      '@type': 'Person',
      name: BRAND.founder.name,
      jobTitle: BRAND.founder.role,
    },
  };
}

/**
 * Verified WebSite Schema with potential search action
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.website,
    inLanguage: BRAND.locale,
    description: BRAND.description,
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.website,
      logo: absoluteUrl('/images/logo.webp'),
    },
  };
}

/**
 * Verified Product Schema for Traliber Travel Essentials Kit
 */
export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: BRAND.product.name,
    sku: BRAND.product.sku,
    image: BRAND.product.primaryImage,
    description: `${BRAND.product.name} contains 10 travel hygiene and personal care items in a water-resistant pouch: travel essentials pouch, toothbrush set, mountain mint toothpaste, 5 mini sanitizers, 2 wet wipes packets, 1 wet towel, 2 toilet seat covers, 1 face mask, 1 paper soap pack, and 1 cutlery kit.`,
    brand: {
      '@type': 'Brand',
      name: BRAND.name,
    },
    category: BRAND.product.category,
    offers: {
      '@type': 'Offer',
      price: String(BRAND.product.price),
      priceCurrency: BRAND.product.currency,
      priceValidUntil: '2027-12-31',
      itemCondition: BRAND.product.itemCondition,
      availability: BRAND.product.availability,
      url: BRAND.product.url,
      seller: {
        '@type': 'Organization',
        name: BRAND.name,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },
    },
  };
}

/**
 * BreadcrumbList Schema Generator
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : absoluteUrl(item.url),
    })),
  };
}

