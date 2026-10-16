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
  name: 'Cotton Pouch',
  closedImage: '/images/products/cotton-pouch-closed.svg',
  openImage: '/images/products/cotton-pouch-open.svg',
  description: 'Durable organic canvas pouch with reinforced brass zipper and water-resistant lining.',
};

export const TRALIBER_KIT_ITEMS: KitItemData[] = [
  {
    id: 'tooth-brush',
    name: 'Tooth Brush',
    imagePath: '/images/products/toothbrush.svg',
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
      final: { x: -270, y: -180, rotate: -16, scale: 1.05, opacity: 1 },
      labelPlacement: 'left',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -110, y: -230, rotate: -12, scale: 0.85, opacity: 1 },
      labelPlacement: 'bottom',
    },
    scrollRange: [0.28, 0.52],
  },
  {
    id: 'tablet-paste',
    name: 'Tablet Paste',
    imagePath: '/images/products/tablet-paste.svg',
    quantity: 1,
    quantityLabel: '1 tin (30 chewable tablets)',
    order: 2,
    description: 'Zero-mess, TSA-friendly chewable toothpaste tablets with refreshing arctic mint.',
    specDetails: {
      material: 'Aluminum travel tin & fluoride mint tablets',
      dimensions: '5.2 cm dia • 30 tabs',
      benefit: 'Solid formula — no liquid restrictions or messy leaks',
    },
    desktop: {
      start: { x: -10, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -120, y: -230, rotate: -6, scale: 1.0, opacity: 1 },
      labelPlacement: 'top',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -95, y: -130, rotate: -6, scale: 0.82, opacity: 1 },
      labelPlacement: 'left',
    },
    scrollRange: [0.32, 0.56],
  },
  {
    id: 'mini-sanitizer',
    name: 'Mini Sanitizer (5)',
    imagePath: '/images/products/mini-sanitizer.svg',
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
      final: { x: 40, y: -260, rotate: 2, scale: 1.0, opacity: 1 },
      labelPlacement: 'top',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 0, y: -260, rotate: 0, scale: 0.8, opacity: 1 },
      labelPlacement: 'bottom',
    },
    scrollRange: [0.35, 0.60],
  },
  {
    id: 'paper-soap',
    name: 'Paper Soap',
    imagePath: '/images/products/paper-soap.svg',
    quantity: 1,
    quantityLabel: '1 flip-box (50 soluble sheets)',
    order: 4,
    description: '50 ultra-thin water-soluble soap sheets in an airtight pastel pocket container.',
    specDetails: {
      material: 'Vegetable oil extract & compact PP case',
      dimensions: '6.5 x 4.5 cm • 50 sheets',
      benefit: 'Instant handwash lather anywhere without public soap dispensers',
    },
    desktop: {
      start: { x: 10, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 210, y: -210, rotate: 6, scale: 0.98, opacity: 1 },
      labelPlacement: 'right',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 95, y: -130, rotate: 6, scale: 0.82, opacity: 1 },
      labelPlacement: 'right',
    },
    scrollRange: [0.38, 0.63],
  },
  {
    id: 'wet-wipes',
    name: 'Wet Wipes (2)',
    imagePath: '/images/products/wet-wipes.svg',
    quantity: 2,
    quantityLabel: '2 individual moisture-locked packs',
    order: 5,
    description: 'Two separate packets of biodegradable refreshing wet wipes with aloe and chamomile.',
    specDetails: {
      material: '100% plant fiber & soothing aloe essence',
      dimensions: '2 packs (10 wipes each)',
      benefit: 'Keeps skin refreshed on long-haul transits and flights',
    },
    desktop: {
      start: { x: 20, y: 30, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 330, y: -130, rotate: 10, scale: 1.05, opacity: 1 },
      labelPlacement: 'right',
    },
    mobile: {
      start: { x: 0, y: 20, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 105, y: -230, rotate: 10, scale: 0.82, opacity: 1 },
      labelPlacement: 'bottom',
    },
    scrollRange: [0.42, 0.66],
  },
  {
    id: 'wet-towel',
    name: 'Wet Towel',
    imagePath: '/images/products/wet-towel.svg',
    quantity: 1,
    quantityLabel: '1 compressed microfiber waffle towel',
    order: 6,
    description: 'Ultra-absorbent, quick-drying waffle-weave towel, compressed for maximum packability.',
    specDetails: {
      material: 'High-density micro-waffle antibacterial fiber',
      dimensions: '30 x 30 cm expanded',
      benefit: 'Compact footprint, dries 4x faster than conventional cotton',
    },
    desktop: {
      start: { x: -20, y: 40, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -330, y: -10, rotate: -8, scale: 1.0, opacity: 1 },
      labelPlacement: 'left',
    },
    mobile: {
      start: { x: 0, y: 30, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -110, y: -30, rotate: -6, scale: 0.8, opacity: 1 },
      labelPlacement: 'left',
    },
    scrollRange: [0.46, 0.70],
  },
  {
    id: 'toilet-seat-cover',
    name: 'Toilet Seat Cover (2)',
    imagePath: '/images/products/toilet-seat-cover.svg',
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
      final: { x: 330, y: 20, rotate: 8, scale: 1.0, opacity: 1 },
      labelPlacement: 'right',
    },
    mobile: {
      start: { x: 0, y: 30, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 110, y: -30, rotate: 6, scale: 0.8, opacity: 1 },
      labelPlacement: 'right',
    },
    scrollRange: [0.50, 0.74],
  },
  {
    id: 'face-mask',
    name: 'Face Mask',
    imagePath: '/images/products/face-mask.svg',
    quantity: 1,
    quantityLabel: '1 3D ergonomic travel mask',
    order: 8,
    description: 'Breathable 3D contour protective mask with cushioned adjustable ear loops.',
    specDetails: {
      material: '3-layer filtration non-woven fabric',
      dimensions: 'Ergonomic 3D contour',
      benefit: 'High-filtration defense against dry airplane cabin air and dust',
    },
    desktop: {
      start: { x: -20, y: 50, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -260, y: 170, rotate: 6, scale: 1.02, opacity: 1 },
      labelPlacement: 'bottom',
    },
    mobile: {
      start: { x: 0, y: 40, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: -105, y: 70, rotate: 4, scale: 0.8, opacity: 1 },
      labelPlacement: 'bottom',
    },
    scrollRange: [0.54, 0.78],
  },
  {
    id: 'cutlery-kit',
    name: 'Cutlery Kit',
    imagePath: '/images/products/cutlery-kit.svg',
    quantity: 1,
    quantityLabel: '1 kit (Fork, Spoon & Chopsticks in case)',
    order: 9,
    description: 'Food-grade stainless steel travel cutlery set housed in a slim rattle-free sleeve.',
    specDetails: {
      material: 'Surgical stainless steel & wheat-straw protective sleeve',
      dimensions: '16.5 cm utensil length',
      benefit: 'Avoid flimsy plastic utensils; eco-friendly and hygienic dining',
    },
    desktop: {
      start: { x: 20, y: 50, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 260, y: 170, rotate: 8, scale: 1.02, opacity: 1 },
      labelPlacement: 'bottom',
    },
    mobile: {
      start: { x: 0, y: 40, rotate: 0, scale: 0.4, opacity: 0 },
      final: { x: 105, y: 70, rotate: 6, scale: 0.8, opacity: 1 },
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
