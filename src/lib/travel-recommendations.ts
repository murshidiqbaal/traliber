import { BRAND } from './brand';
import { DurationCategory } from './travel-calculator';

export type TravelPurpose =
  | 'leisure'
  | 'business'
  | 'adventure'
  | 'family'
  | 'backpacking'
  | 'other';

export type TransportMode =
  | 'train'
  | 'flight'
  | 'bus'
  | 'road_trip'
  | 'other';

export type DestinationType = 'domestic' | 'international';

export type ClimateType = 'hot' | 'cold' | 'rainy' | 'mixed' | 'not_sure';

export type PackingPreference =
  | 'minimal'
  | 'standard'
  | 'extra_prepared'
  | 'other';

export type RecommendationCategory =
  | 'Base Traliber Kit'
  | 'Additional Hygiene Essentials'
  | 'Personal Care'
  | 'Journey Comfort'
  | 'Organisation'
  | 'Destination-Specific Suggestions';

export type ProductAvailability =
  | 'available_from_traliber'
  | 'recommendation_only'
  | 'temporarily_unavailable';

export interface TripInputs {
  departureDate: string;
  returnDate: string;
  days: number;
  nights: number;
  durationCategory: DurationCategory;
  purpose: TravelPurpose;
  transport: TransportMode;
  destination: DestinationType;
  destinationCountry?: string;
  climate: ClimateType;
  travellerCount: number;
  adults: number;
  children: number;
  packingPreference: PackingPreference;
  notes?: string;
}

export interface BaseKitItem {
  id: string;
  name: string;
  includedQuantity: number;
  quantityLabel: string;
  role: string;
  description: string;
  image: string;
}

export interface RecommendedItem {
  id: string;
  name: string;
  category: RecommendationCategory;
  description: string;
  image?: string;
  recommendedQuantity: number;
  selectedQuantity: number;
  isSelected: boolean;
  reason: string;
  availability: ProductAvailability;
  price: number | null; // null if unpriced or recommendation only
  isShared: boolean; // whether 1 per group or 1 per traveller
}

export interface KitRecommendationResult {
  inputs: TripInputs;
  baseKit: {
    name: string;
    description: string;
    price: number; // ₹199
    quantity: number; // usually 1 per kit
    items: BaseKitItem[];
  };
  recommendedAdditions: RecommendedItem[];
  totalBasePrice: number;
  totalAdditionsPrice: number;
  estimatedTotalPrice: number | null;
  hasUnpricedPurchasables: boolean;
  totalSelectedItemsCount: number;
}

/**
 * The 10 verified items inside every Traliber Travel Essentials Kit.
 */
export const VERIFIED_BASE_KIT_ITEMS: BaseKitItem[] = [
  {
    id: 'base-pouch',
    name: 'Travel Essentials Pouch',
    includedQuantity: 1,
    quantityLabel: '1 unit',
    role: 'Central Organizer',
    description: 'Water-resistant travel organizer pouch with reinforced dual zippers and carrying handle.',
    image: '/images/products/pouch.webp',
  },
  {
    id: 'base-toothbrush',
    name: 'Toothbrush Set',
    includedQuantity: 1,
    quantityLabel: '1 unit with hygienic cap',
    role: 'Oral Hygiene',
    description: 'Ergonomic handle toothbrush with soft micro-bristles and ventilated travel cap.',
    image: '/images/products/toothbrush.webp',
  },
  {
    id: 'base-toothpaste',
    name: 'Travel Toothpaste',
    includedQuantity: 1,
    quantityLabel: '1 tube (10g)',
    role: 'Oral Hygiene',
    description: 'Mountain mint travel toothpaste in a lightweight leak-proof squeeze tube.',
    image: '/images/products/toothpaste.webp',
  },
  {
    id: 'base-sanitizer',
    name: 'Mini Sanitizer',
    includedQuantity: 5,
    quantityLabel: '5 pocket bottles (15ml each)',
    role: 'Hand Sanitization',
    description: 'Five individual pocket spray sanitizer bottles for quick on-the-go sanitization.',
    image: '/images/products/mini-sanitizer.webp',
  },
  {
    id: 'base-wipes',
    name: 'Wet Wipes',
    includedQuantity: 2,
    quantityLabel: '2 packets',
    role: 'Surface & Skin Refreshment',
    description: 'Moisture-locked travel wet wipes for quick refreshment during long journeys.',
    image: '/images/products/wet-wipes.webp',
  },
  {
    id: 'base-towel',
    name: 'Wet Towel',
    includedQuantity: 1,
    quantityLabel: '1 sealed sachet',
    role: 'Personal Cleansing',
    description: 'Individually sealed wet towel sachet for refreshing face and hands during transit.',
    image: '/images/products/wet-towel.webp',
  },
  {
    id: 'base-seat-covers',
    name: 'Toilet Seat Covers',
    includedQuantity: 2,
    quantityLabel: '2 disposable covers',
    role: 'Restroom Sanitation',
    description: 'Flushable paper toilet seat covers for hygienic public restroom visits on trains and highways.',
    image: '/images/products/toilet-seat-cover.webp',
  },
  {
    id: 'base-mask',
    name: 'Face Mask',
    includedQuantity: 1,
    quantityLabel: '1 protective mask',
    role: 'Dust & Airway Protection',
    description: 'Breathable 3-layer protective face mask for crowded terminals and transit hubs.',
    image: '/images/products/face-mask.webp',
  },
  {
    id: 'base-paper-soap',
    name: 'Paper Soap',
    includedQuantity: 1,
    quantityLabel: '1 flip-box (50 sheets)',
    role: 'Hand Hygiene',
    description: 'Water-soluble paper soap leaves in a compact flip-box for handwashing when soap is unavailable.',
    image: '/images/products/paper-soap.webp',
  },
  {
    id: 'base-cutlery',
    name: 'Cutlery Kit',
    includedQuantity: 1,
    quantityLabel: '1 reusable set with case',
    role: 'Meal Hygiene',
    description: 'Reusable dining kit containing fork, spoon, knife, and chopsticks in a travel case.',
    image: '/images/products/cutlery-kit.webp',
  },
];

/**
 * Pre-defined catalog of additional items used by the deterministic recommendation engine.
 */
export const DEFAULT_ADDITIONAL_ITEMS: Record<string, Omit<RecommendedItem, 'recommendedQuantity' | 'selectedQuantity' | 'isSelected' | 'reason'>> = {
  'extra-sanitizer-pack': {
    id: 'extra-sanitizer-pack',
    name: 'Extra Mini Sanitizer (Pack of 2)',
    category: 'Additional Hygiene Essentials',
    description: 'Two additional 15ml pocket sanitizer spray bottles for high-frequency sanitization.',
    image: '/images/products/mini-sanitizer.webp',
    availability: 'available_from_traliber',
    price: 49,
    isShared: true,
  },
  'extra-wipes-pack': {
    id: 'extra-wipes-pack',
    name: 'Extra Moisture-Lock Wet Wipes (2 Packs)',
    category: 'Additional Hygiene Essentials',
    description: 'Two extra packets of gentle wet wipes for meal cleanups and transit dust.',
    image: '/images/products/wet-wipes.webp',
    availability: 'available_from_traliber',
    price: 39,
    isShared: true,
  },
  'extra-seat-covers': {
    id: 'extra-seat-covers',
    name: 'Flushable Toilet Seat Covers (Pack of 4)',
    category: 'Additional Hygiene Essentials',
    description: 'Four extra flushable biodegradable paper seat covers for train & highway restrooms.',
    image: '/images/products/toilet-seat-cover.webp',
    availability: 'available_from_traliber',
    price: 49,
    isShared: false,
  },
  'extra-paper-soap': {
    id: 'extra-paper-soap',
    name: 'Paper Soap Flip-Box (50 Sheets)',
    category: 'Additional Hygiene Essentials',
    description: 'Compact pocket flip-box of water-soluble soap leaves for soap-less station taps.',
    image: '/images/products/paper-soap.webp',
    availability: 'available_from_traliber',
    price: 29,
    isShared: true,
  },
  'wet-dry-organizer-pouch': {
    id: 'wet-dry-organizer-pouch',
    name: 'Wet / Dry Waterproof Zip Pouch',
    category: 'Organisation',
    description: 'Semi-transparent water-resistant zip bag to isolate damp towels, swimwear, or toiletries.',
    image: '/images/products/pouch.webp',
    availability: 'available_from_traliber',
    price: 79,
    isShared: true,
  },
  'extra-travel-toothbrush': {
    id: 'extra-travel-toothbrush',
    name: 'Travel Toothbrush with Hygienic Cap',
    category: 'Personal Care',
    description: 'Additional soft micro-bristle travel toothbrush with ventilated protective cap.',
    image: '/images/products/toothbrush.webp',
    availability: 'available_from_traliber',
    price: 39,
    isShared: false,
  },
  'sleep-eye-mask-earplugs': {
    id: 'sleep-eye-mask-earplugs',
    name: 'Contoured Sleep Mask & Noise-Dampening Earplugs',
    category: 'Journey Comfort',
    description: 'Light-blocking 3D eye mask paired with soft memory foam earplugs for trains & flights.',
    availability: 'recommendation_only',
    price: null,
    isShared: false,
  },
  'travel-neck-pillow': {
    id: 'travel-neck-pillow',
    name: 'Ergonomic Memory Foam Travel Neck Pillow',
    category: 'Journey Comfort',
    description: 'Supports cervical alignment during overnight train, bus, or long flight transits.',
    availability: 'recommendation_only',
    price: null,
    isShared: false,
  },
  'reusable-water-bottle': {
    id: 'reusable-water-bottle',
    name: 'BPA-Free Compact Reusable Water Bottle',
    category: 'Journey Comfort',
    description: 'Lightweight refillable bottle to stay hydrated during transit without buying single-use plastic.',
    availability: 'recommendation_only',
    price: null,
    isShared: false,
  },
  'document-passport-organizer': {
    id: 'document-passport-organizer',
    name: 'Travel Document & Passport Organizer Wallet',
    category: 'Organisation',
    description: 'Keeps passport, boarding passes, visas, and transit tickets flat and quickly accessible.',
    availability: 'recommendation_only',
    price: null,
    isShared: true,
  },
  'airline-liquid-bottles': {
    id: 'airline-liquid-bottles',
    name: '100ml Airline-Compliant Squeeze Bottles (3-pack)',
    category: 'Organisation',
    description: 'Check individual airline and airport cabin liquid allowances before packing liquids.',
    availability: 'recommendation_only',
    price: null,
    isShared: true,
  },
  'sun-protection-pack': {
    id: 'sun-protection-pack',
    name: 'Broad-Spectrum SPF Sun Protection & Lip Shield',
    category: 'Destination-Specific Suggestions',
    description: 'Essential skin protection against harsh daytime ultraviolet rays in sunny destinations.',
    availability: 'recommendation_only',
    price: null,
    isShared: true,
  },
  'cold-weather-balm': {
    id: 'cold-weather-balm',
    name: 'Deep Hydration Moisturizer & Barrier Cream',
    category: 'Destination-Specific Suggestions',
    description: 'Prevents skin chapping, dry hands, and windburn during cold climate itineraries.',
    availability: 'recommendation_only',
    price: null,
    isShared: true,
  },
  'rain-gear-dry-pack': {
    id: 'rain-gear-dry-pack',
    name: 'Compact Umbrella & Waterproof Pack Cover',
    category: 'Destination-Specific Suggestions',
    description: 'Guards luggage and electronics against unexpected monsoon showers and damp weather.',
    availability: 'recommendation_only',
    price: null,
    isShared: true,
  },
  'outdoor-first-aid-kit': {
    id: 'outdoor-first-aid-kit',
    name: 'Compact Blister Bandages & Antiseptic Swabs',
    category: 'Personal Care',
    description: 'Basic first-line minor scrape, blister, and outdoor hygiene essentials.',
    availability: 'recommendation_only',
    price: null,
    isShared: true,
  },
};

/**
 * Deterministic Rule-Based Recommendation Engine
 * Calculates personalized additions based on duration, transport, purpose, destination, climate, and travellers.
 */
export function generateKitRecommendation(inputs: TripInputs): KitRecommendationResult {
  const recommendations: Map<string, RecommendedItem> = new Map();

  const addOrUpdateItem = (
    key: string,
    quantity: number,
    reason: string,
    overrideCategory?: RecommendationCategory
  ) => {
    const catalogItem = DEFAULT_ADDITIONAL_ITEMS[key];
    if (!catalogItem) return;

    const existing = recommendations.get(key);
    if (existing) {
      existing.recommendedQuantity = Math.max(existing.recommendedQuantity, quantity);
      existing.selectedQuantity = existing.recommendedQuantity;
      if (!existing.reason.includes(reason)) {
        existing.reason += ` • ${reason}`;
      }
    } else {
      recommendations.set(key, {
        ...catalogItem,
        category: overrideCategory || catalogItem.category,
        recommendedQuantity: quantity,
        selectedQuantity: quantity,
        isSelected: true,
        reason,
      });
    }
  };

  const {
    days,
    nights,
    durationCategory,
    purpose,
    transport,
    destination,
    climate,
    travellerCount,
    adults,
    children,
    packingPreference,
  } = inputs;

  const totalPeople = Math.max(1, travellerCount || (adults + children) || 1);

  // ----------------------------------------------------
  // 1. DURATION RULES
  // ----------------------------------------------------
  if (durationCategory === 'Same-day trip') {
    // 1-day: Base kit is more than sufficient. No mandatory consumables added.
  } else if (durationCategory === 'Weekend') {
    // 2-3 days: Standard kit covers everything. If > 2 travellers, suggest 1 extra wipes pack.
    if (totalPeople > 2) {
      addOrUpdateItem('extra-wipes-pack', 1, 'Quick hand & face refreshes for multiple weekend travellers');
    }
  } else if (durationCategory === 'Short trip') {
    // 4-7 days: Suggest additional wipes and sanitizer
    addOrUpdateItem('extra-wipes-pack', 1, `4–7 day journey: Extra wet wipes recommended for mid-trip refreshments`);
    if (totalPeople > 1) {
      addOrUpdateItem('extra-sanitizer-pack', 1, `Multiple travellers across ${days} days: Backup sanitizer bottles`);
    }
  } else if (durationCategory === 'Extended trip') {
    // 8-14 days: Extended hygiene consumables
    addOrUpdateItem('extra-wipes-pack', Math.min(3, Math.ceil(totalPeople * 0.8)), `${days} days itinerary: Regular hygiene replenishment`);
    addOrUpdateItem('extra-paper-soap', 1, 'Extended journey: Water-soluble soap leaves for long-haul handwashing');
    addOrUpdateItem('extra-seat-covers', 1, 'Extended travel: Additional restroom seat covers for multiple stops');
    addOrUpdateItem('wet-dry-organizer-pouch', 1, 'Isolate damp laundry, wet towels, and toiletries across a 1–2 week trip');
  } else if (durationCategory === 'Long trip') {
    // 15+ days: Multi-week setup
    addOrUpdateItem('extra-wipes-pack', Math.min(4, Math.ceil(totalPeople * 1.2)), `15+ days journey: Multi-week personal care replenishment`);
    addOrUpdateItem('extra-sanitizer-pack', 1, 'Long-duration journey: Pocket sanitizer backup refills');
    addOrUpdateItem('extra-paper-soap', 2, 'Multi-week travel: Two flip-boxes of paper soap leaves (100 washes total)');
    addOrUpdateItem('extra-seat-covers', 2, 'Multi-week journey: Extended supply of hygienic seat covers');
    addOrUpdateItem('wet-dry-organizer-pouch', 1, 'Essential wet/dry bag for extended travel laundry and toiletries separation');
  }

  // ----------------------------------------------------
  // 2. TRANSPORT RULES
  // ----------------------------------------------------
  switch (transport) {
    case 'train':
      addOrUpdateItem('extra-seat-covers', 1, 'Indian Railway & public station restrooms benefit from fresh disposable seat covers');
      addOrUpdateItem('extra-paper-soap', 1, 'Train washroom soap dispensers are frequently empty; pocket paper soap ensures clean hands');
      if (nights > 0) {
        addOrUpdateItem('sleep-eye-mask-earplugs', Math.min(2, totalPeople), 'Overnight train travel: Blocks berth cabin lights and rail noise');
      }
      addOrUpdateItem('reusable-water-bottle', 1, 'Stay hydrated between train stations with your own sanitized bottle');
      break;

    case 'flight':
      addOrUpdateItem('airline-liquid-bottles', 1, 'Airport security checkpoint: Cabin-compliant containers (check current airline/airport liquid rules)');
      addOrUpdateItem('document-passport-organizer', 1, 'Airport boarding gates: Keeps boarding passes, IDs, and baggage tags organized');
      if (nights > 0 || days > 1) {
        addOrUpdateItem('sleep-eye-mask-earplugs', Math.min(2, totalPeople), 'In-flight cabin rest: Relieves cabin engine hum and bright cabin lights');
      }
      break;

    case 'road_trip':
      addOrUpdateItem('extra-wipes-pack', 1, 'Highway driving & roadside stops: Ideal for rapid snack cleanups and dusty pit stops');
      addOrUpdateItem('extra-seat-covers', 1, 'Highway dhabas & petrol pump restrooms: Sanitary seat barriers');
      addOrUpdateItem('wet-dry-organizer-pouch', 1, 'Road trips: Keeps damp towels and car emergency toiletries neatly contained');
      addOrUpdateItem('reusable-water-bottle', 1, 'Long driving stretches: Keep clean drinking water handy in vehicle');
      break;

    case 'bus':
      addOrUpdateItem('extra-wipes-pack', 1, 'Overnight bus journeys: Instant face & hand refreshment before arrival');
      addOrUpdateItem('sleep-eye-mask-earplugs', 1, 'Intercity buses: Minimizes nighttime headlight glare and engine vibration noise');
      addOrUpdateItem('travel-neck-pillow', 1, 'Upright bus seats: Provides ergonomic neck support during sleep');
      break;

    case 'other':
      addOrUpdateItem('extra-wipes-pack', 1, 'Multi-modal transit: Compact wipe packets for spontaneous refreshments');
      break;
  }

  // ----------------------------------------------------
  // 3. PURPOSE RULES
  // ----------------------------------------------------
  switch (purpose) {
    case 'business':
      addOrUpdateItem('document-passport-organizer', 1, 'Business travel: Quick access to travel vouchers, corporate IDs, and meeting notes');
      break;

    case 'adventure':
      addOrUpdateItem('wet-dry-organizer-pouch', 1, 'Adventure & trekking: Protects hygiene essentials from damp terrain and sweat');
      addOrUpdateItem('outdoor-first-aid-kit', 1, 'Trekking / Outdoors: First-line blister and scrape hygiene assistance');
      break;

    case 'family':
      addOrUpdateItem('extra-wipes-pack', Math.max(1, children > 0 ? 2 : 1), 'Family journeys: High-frequency hand cleaning for kids and shared snacks');
      addOrUpdateItem('extra-seat-covers', 1, 'Family travel: Sanitary protection for children using public washrooms');
      addOrUpdateItem('extra-sanitizer-pack', 1, 'Family safety: Sufficient pocket spray bottles for all family members');
      break;

    case 'backpacking':
      addOrUpdateItem('extra-paper-soap', 1, 'Backpacking: Ultra-lightweight dry soap leaves that cannot leak inside a pack');
      addOrUpdateItem('wet-dry-organizer-pouch', 1, 'Hostels & shared dorm showers: Keeps dry clothes separated from damp towels');
      break;

    case 'leisure':
      // Balanced standard setup
      break;
  }

  // ----------------------------------------------------
  // 4. DESTINATION & CLIMATE RULES
  // ----------------------------------------------------
  if (destination === 'international') {
    addOrUpdateItem('document-passport-organizer', 1, 'International travel: Safely holds passports, visas, immigration cards, and currency');
    addOrUpdateItem('airline-liquid-bottles', 1, 'International security screening: Cabin toiletry compliance (verify destination allowances)');
  }

  switch (climate) {
    case 'hot':
      addOrUpdateItem('sun-protection-pack', 1, 'Sunny / Hot destination: Skin protection and UV barrier recommended');
      addOrUpdateItem('extra-wipes-pack', 1, 'Warm climate: Refreshing sweat and dust removal throughout the day');
      break;

    case 'cold':
      addOrUpdateItem('cold-weather-balm', 1, 'Cold / Mountain destination: Prevents windburn, dry skin, and cracked lips');
      break;

    case 'rainy':
      addOrUpdateItem('rain-gear-dry-pack', 1, 'Monsoon / Rainy climate: Moisture protection for essentials and luggage');
      addOrUpdateItem('wet-dry-organizer-pouch', 1, 'Wet climate: Waterproof containment for damp personal items');
      break;

    case 'mixed':
      addOrUpdateItem('sun-protection-pack', 1, 'Variable weather: Sun protection for outdoor transit stretches');
      break;
  }

  // ----------------------------------------------------
  // 5. PACKING PREFERENCE RULES
  // ----------------------------------------------------
  if (packingPreference === 'minimal') {
    // Filter down to high-priority additions only
    for (const [key, item] of recommendations.entries()) {
      if (item.availability === 'recommendation_only' && item.category === 'Journey Comfort') {
        recommendations.delete(key);
      }
    }
  } else if (packingPreference === 'extra_prepared') {
    // Add extra backup hygiene items
    addOrUpdateItem('extra-sanitizer-pack', 1, 'Extra Prepared packing preference: Additional sanitizer backup');
    addOrUpdateItem('extra-paper-soap', 1, 'Extra Prepared packing preference: Spare pocket paper soap');
  }

  // ----------------------------------------------------
  // 6. MULTI-TRAVELLER INDIVIDUAL ITEM SCALING
  // ----------------------------------------------------
  if (totalPeople > 1) {
    // If multiple travellers, suggest extra individual toothbrushes if not already covered
    if (totalPeople > 1 && durationCategory !== 'Same-day trip') {
      addOrUpdateItem(
        'extra-travel-toothbrush',
        totalPeople - 1,
        `Travelling with ${totalPeople} people: Individual toothbrushes for companion travellers`
      );
    }
  }

  const additionsList = Array.from(recommendations.values());

  // Base Traliber Kit calculation (1 kit @ ₹199 per kit)
  // For multiple travellers, base kit count can be 1 per booking or scaled by user
  const baseKitPrice = BRAND.product.price || 199;
  const baseKitQuantity = 1;
  const totalBasePrice = baseKitPrice * baseKitQuantity;

  let totalAdditionsPrice = 0;
  let hasUnpricedPurchasables = false;
  let totalSelectedItemsCount = VERIFIED_BASE_KIT_ITEMS.reduce((sum, i) => sum + i.includedQuantity, 0);

  for (const item of additionsList) {
    if (item.isSelected) {
      totalSelectedItemsCount += item.selectedQuantity;
      if (item.availability === 'available_from_traliber') {
        if (item.price !== null) {
          totalAdditionsPrice += item.price * item.selectedQuantity;
        } else {
          hasUnpricedPurchasables = true;
        }
      }
    }
  }

  const estimatedTotalPrice = hasUnpricedPurchasables
    ? null
    : totalBasePrice + totalAdditionsPrice;

  return {
    inputs,
    baseKit: {
      name: 'Traliber Travel Essentials Kit',
      description: 'The complete 10-item pre-packed travel hygiene and personal care kit in a water-resistant mountain blue pouch.',
      price: baseKitPrice,
      quantity: baseKitQuantity,
      items: VERIFIED_BASE_KIT_ITEMS,
    },
    recommendedAdditions: additionsList,
    totalBasePrice,
    totalAdditionsPrice,
    estimatedTotalPrice,
    hasUnpricedPurchasables,
    totalSelectedItemsCount,
  };
}

/**
 * Generates an encoded WhatsApp enquiry message with all trip details, base kit, and selected additions.
 */
export function generateWhatsAppKitEnquiryMessage(result: KitRecommendationResult): string {
  const { inputs, baseKit, recommendedAdditions, estimatedTotalPrice } = result;

  const lines: string[] = [];

  lines.push(`*CUSTOM TRAVEL KIT ENQUIRY — TRALIBER* ✦`);
  lines.push(`Hello Traliber, I built a personalized travel kit on your website and would like to place an enquiry.`);
  lines.push(``);

  lines.push(`*1. MY JOURNEY DETAILS:*`);
  lines.push(`• Travel Dates: ${inputs.departureDate} to ${inputs.returnDate}`);
  lines.push(`• Duration: ${inputs.days} Days / ${inputs.nights} Nights (${inputs.durationCategory})`);
  lines.push(`• Travellers: ${inputs.travellerCount} (${inputs.adults} Adults${inputs.children > 0 ? `, ${inputs.children} Children` : ''})`);
  lines.push(`• Purpose: ${inputs.purpose.toUpperCase()}`);
  lines.push(`• Transport: ${inputs.transport.toUpperCase()}`);
  lines.push(`• Destination: ${inputs.destination.toUpperCase()}${inputs.destinationCountry ? ` (${inputs.destinationCountry})` : ''}`);
  lines.push(`• Climate: ${inputs.climate.toUpperCase()}`);
  lines.push(`• Packing Style: ${inputs.packingPreference.toUpperCase()}`);
  lines.push(``);

  lines.push(`*2. BASE TRALIBER KIT (Included):*`);
  lines.push(`• 1x Traliber 10-Item Travel Essentials Kit (₹${baseKit.price})`);
  lines.push(`  (Pouch, Toothbrush Set, Toothpaste, 5 Sanitizers, 2 Wet Wipes, Wet Towel, 2 Toilet Seat Covers, Face Mask, Paper Soap, Cutlery Kit)`);
  lines.push(``);

  const selectedPurchasables = recommendedAdditions.filter(
    (a) => a.isSelected && a.availability === 'available_from_traliber'
  );

  const selectedAdvisories = recommendedAdditions.filter(
    (a) => a.isSelected && a.availability === 'recommendation_only'
  );

  if (selectedPurchasables.length > 0) {
    lines.push(`*3. SELECTED TRALIBER ADDITIONS:*`);
    for (const item of selectedPurchasables) {
      const priceText = item.price ? `₹${item.price * item.selectedQuantity}` : 'Price on enquiry';
      lines.push(`• ${item.name} x${item.selectedQuantity} (${priceText})`);
    }
    lines.push(``);
  }

  if (selectedAdvisories.length > 0) {
    lines.push(`*4. PACKING ADVISORY CHECKLIST (My Notes):*`);
    for (const item of selectedAdvisories) {
      lines.push(`• ${item.name} (${item.category})`);
    }
    lines.push(``);
  }

  if (estimatedTotalPrice !== null) {
    lines.push(`*ESTIMATED KIT TOTAL: ₹${estimatedTotalPrice}* (subject to delivery confirmation)`);
  } else {
    lines.push(`*TOTAL: Price available on enquiry*`);
  }

  lines.push(``);
  lines.push(`Please confirm kit availability and shipping time for my trip. Thank you!`);

  return encodeURIComponent(lines.join('\n'));
}

