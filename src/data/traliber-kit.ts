export interface KitItemData {
  id: string;
  name: string; // Exact required name
  imagePath: string;
  quantity?: number;
  quantityLabel?: string;
  order: number; // Animation trigger sequence (1-9)
  description: string;
  specDetails: {
    material: string;
    dimensions: string;
    benefit: string;
  };
  // Relative desktop offsets from scene center
  desktop: {
    start: { x: number; y: number; rotate: number; scale: number; opacity: number };
    final: { x: number; y: number; rotate: number; scale: number; opacity: number };
    labelPlacement: 'top' | 'bottom' | 'left' | 'right';
  };
  // Responsive mobile offsets from scene center
  mobile: {
    start: { x: number; y: number; rotate: number; scale: number; opacity: number };
    final: { x: number; y: number; rotate: number; scale: number; opacity: number };
    labelPlacement: 'top' | 'bottom' | 'left' | 'right';
  };
  scrollRange: [number, number]; // [startProgress, endProgress]
}

export interface PouchData {
  id: string;
  name: string;
  closedImage: string;
  openImage: string;
  description: string;
}

export const TRALIBER_POUCH: PouchData = {
  id: 'cotton-pouch',
  name: 'Travel Essentials Pouch',
  closedImage: '/images/products/pouch.png',
  openImage: '/images/products/pouch.png',
  description: 'Water-resistant travel organizer pouch with reinforced dual zippers, carrying handle, and signature mountain blue aesthetics.',
};

export const TRALIBER_KIT_ITEMS: KitItemData[] = [
  {
    id: 'tooth-brush',
    name: 'Tooth Brush Set',
    imagePath: '/images/products/toothbrush.png',
    quantity: 1,
    quantityLabel: '1 unit with hygienic cap',
    order: 1,
    description: 'Ergonomic eco-handle with ultra-soft micro-bristles and ventilated travel cap.',
    specDetails: {
      material: 'BPA-free bio-composite & nano-soft bristles',
      dimensions: '18.5 cm • 14g',
      benefit: 'Gentle on gums, fits airline liquid/personal care rules',
    },
    desktop: {
      start: { x: -20, y: 30, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -260, y: -95, rotate: -12, scale: 0.95, opacity: 1 },
      labelPlacement: 'left',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -105, y: -115, rotate: -10, scale: 0.75, opacity: 1 },
      labelPlacement: 'left',
    },
    scrollRange: [0.28, 0.52],
  },
  {
    id: 'tablet-paste',
    name: 'Mountain Mint Toothpaste',
    imagePath: '/images/products/toothpaste.png',
    quantity: 1,
    quantityLabel: '1 10g travel tube',
    order: 2,
    description: 'Mountain mint fresh breath travel toothpaste in a lightweight leak-proof squeeze tube.',
    specDetails: {
      material: 'Arctic mint formula & sealed travel tube',
      dimensions: '10g travel size',
      benefit: 'TSA carry-on compliant, prevents leaks and spills',
    },
    desktop: {
      start: { x: -10, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -110, y: -140, rotate: -6, scale: 0.9, opacity: 1 },
      labelPlacement: 'top',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -45, y: -140, rotate: -4, scale: 0.72, opacity: 1 },
      labelPlacement: 'top',
    },
    scrollRange: [0.32, 0.56],
  },
  {
    id: 'mini-sanitizer',
    name: 'Mini Sanitizer (5)',
    imagePath: '/images/products/mini-sanitizer.png',
    quantity: 5,
    quantityLabel: '5 individual pocket spray bottles',
    order: 3,
    description: 'Set of 5 individual pocket-size 75% ethanol sanitizing mists with fine atomizers.',
    specDetails: {
      material: 'Shatterproof PET bottle with fine mist sprayer',
      dimensions: '5x 15ml vials',
      benefit: 'Distribute across bags or share with travel companions',
    },
    desktop: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 35, y: -150, rotate: 0, scale: 0.88, opacity: 1 },
      labelPlacement: 'top',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 35, y: -140, rotate: 2, scale: 0.72, opacity: 1 },
      labelPlacement: 'top',
    },
    scrollRange: [0.35, 0.60],
  },
  {
    id: 'paper-soap',
    name: 'Paper Soap (50 Sheets)',
    imagePath: '/images/products/paper-soap.png',
    quantity: 1,
    quantityLabel: '1 flip-box (50 soluble sheets)',
    order: 4,
    description: '50 ultra-thin water-soluble soap sheets in an airtight pocket flip-box container.',
    specDetails: {
      material: 'Vegetable oil extract & compact PP case',
      dimensions: '6.5 x 4.5 cm • 50 sheets',
      benefit: 'Instant handwash lather anywhere without public soap dispensers',
    },
    desktop: {
      start: { x: 10, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 185, y: -140, rotate: 6, scale: 0.9, opacity: 1 },
      labelPlacement: 'top',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 105, y: -115, rotate: 6, scale: 0.72, opacity: 1 },
      labelPlacement: 'right',
    },
    scrollRange: [0.38, 0.63],
  },
  {
    id: 'wet-wipes',
    name: 'Wet Wipes (2)',
    imagePath: '/images/products/wet-wipes.png',
    quantity: 2,
    quantityLabel: '2 individual moisture-locked packs',
    order: 5,
    description: 'Two separate packets of refreshing, alcohol-free hygienic wipes with mountain fresh scent.',
    specDetails: {
      material: '100% plant fiber & soothing aloe essence',
      dimensions: '2 packs (10 wipes each)',
      benefit: 'Keeps skin refreshed on long-haul transits and flights',
    },
    desktop: {
      start: { x: 20, y: 30, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 290, y: -90, rotate: 10, scale: 0.92, opacity: 1 },
      labelPlacement: 'right',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 105, y: -45, rotate: 8, scale: 0.72, opacity: 1 },
      labelPlacement: 'right',
    },
    scrollRange: [0.42, 0.66],
  },
  {
    id: 'wet-towel',
    name: 'Wet Towel Sachet',
    imagePath: '/images/products/wet-towel.png',
    quantity: 1,
    quantityLabel: '1 refreshing hygienic wet towel',
    order: 6,
    description: 'Ultra-soft, refreshing hygienic travel wet towel individually sealed for maximum moisture.',
    specDetails: {
      material: 'High-density micro-fiber hygienic weave',
      dimensions: 'Individually sealed travel pouch',
      benefit: 'Instant rejuvenation during long journeys and flight transits',
    },
    desktop: {
      start: { x: -20, y: 40, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -300, y: 30, rotate: -8, scale: 0.92, opacity: 1 },
      labelPlacement: 'left',
    },
    mobile: {
      start: { x: 0, y: 30, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -105, y: -45, rotate: -6, scale: 0.72, opacity: 1 },
      labelPlacement: 'left',
    },
    scrollRange: [0.46, 0.70],
  },
  {
    id: 'toilet-seat-cover',
    name: 'Toilet Seat Cover (2)',
    imagePath: '/images/products/toilet-seat-cover.png',
    quantity: 2,
    quantityLabel: '2 sanitary flushable covers',
    order: 7,
    description: 'Two individually folded flushable toilet seat liners for sanitary peace of mind.',
    specDetails: {
      material: '100% biodegradable virgin wood pulp',
      dimensions: 'Universal fit • 2 folded units',
      benefit: 'Water-soluble, septic safe, instant barrier protection',
    },
    desktop: {
      start: { x: 20, y: 40, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 300, y: 30, rotate: 8, scale: 0.92, opacity: 1 },
      labelPlacement: 'right',
    },
    mobile: {
      start: { x: 0, y: 30, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 105, y: 35, rotate: 6, scale: 0.72, opacity: 1 },
      labelPlacement: 'right',
    },
    scrollRange: [0.50, 0.74],
  },
  {
    id: 'face-mask',
    name: 'Face Mask Kit',
    imagePath: '/images/products/face-mask.png',
    quantity: 1,
    quantityLabel: '1 3-layer protective mask kit',
    order: 8,
    description: 'Breathable 3-layer filtration protective travel mask with soft comfortable ear loops.',
    specDetails: {
      material: '3-layer filtration non-woven fabric',
      dimensions: 'Ergonomic contour • Sealed pack',
      benefit: 'High-filtration defense against dry airplane cabin air and dust',
    },
    desktop: {
      start: { x: -20, y: 50, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -220, y: 150, rotate: 4, scale: 0.92, opacity: 1 },
      labelPlacement: 'bottom',
    },
    mobile: {
      start: { x: 0, y: 40, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -85, y: 110, rotate: 4, scale: 0.72, opacity: 1 },
      labelPlacement: 'bottom',
    },
    scrollRange: [0.54, 0.78],
  },
  {
    id: 'cutlery-kit',
    name: 'Travel Cutlery Kit',
    imagePath: '/images/products/cutlery-kit.png',
    quantity: 1,
    quantityLabel: '1 kit (Fork, Spoon, Knife, Chopsticks & Napkin)',
    order: 9,
    description: 'Reusable hygienic travel cutlery set including spoon, fork, knife, chopsticks, and napkin in case.',
    specDetails: {
      material: 'Food-grade reusable composite & snap-lock case',
      dimensions: '16.5 cm utensil length',
      benefit: 'Avoid flimsy plastic utensils; eco-friendly and hygienic dining',
    },
    desktop: {
      start: { x: 20, y: 50, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 220, y: 150, rotate: -4, scale: 0.92, opacity: 1 },
      labelPlacement: 'bottom',
    },
    mobile: {
      start: { x: 0, y: 40, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 85, y: 110, rotate: -4, scale: 0.72, opacity: 1 },
      labelPlacement: 'bottom',
    },
    scrollRange: [0.58, 0.82],
  },
];

export const WHATSAPP_CONFIG = {
  phoneNumber: '918921019251',
  formattedNumber: '+91 89210 19251',
  defaultMessage: "Hi Traliber, I'd like to order the Travel Essentials Kit!",
  getLink: (customNote?: string) => {
    const text = customNote
      ? `Hi Traliber! I want to order the Travel Essentials Kit. Note: ${customNote}`
      : "Hi Traliber, I'd like to order the Travel Essentials Kit!";
    return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(text)}`;
  },
};
