'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  isActive: boolean;
}

export interface OrderItem {
  id: string;
  customerName: string;
  phone: string;
  bundle: string;
  destination: string;
  amount: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  createdAt: string;
  source: 'WhatsApp Button' | 'Bundle Selector' | 'Direct Chat' | 'Manual Entry';
}

export interface AnalyticsData {
  pageViews: number;
  unpackScrolls: number;
  whatsappClicks: number;
  productInspects: number;
  recentClicks: Array<{
    id: string;
    label: string;
    timestamp: string;
  }>;
}

interface TraliberContextType {
  analytics: AnalyticsData;
  testimonials: Testimonial[];
  orders: OrderItem[];
  customImages: Record<string, string>; // itemId -> custom image URL/data URL
  trackPageView: () => void;
  trackUnpackScroll: () => void;
  trackWhatsAppClick: (sourceLabel?: string) => void;
  trackProductInspect: (productName: string) => void;
  addTestimonial: (t: Omit<Testimonial, 'id' | 'date'>) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addOrder: (o: Omit<OrderItem, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: OrderItem['status']) => void;
  deleteOrder: (id: string) => void;
  updateProductImage: (itemId: string, imageUrl: string) => void;
  resetProductImage: (itemId: string) => void;
  getProductImage: (itemId: string, fallback: string) => string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    role: 'Senior Flight Attendant, Emirates',
    location: 'Dubai & London',
    rating: 5,
    comment:
      'I live out of a suitcase 20 days a month. Traliber replaced my bulky, leaky liquid bag. The toothpaste tabs and compressed towel are total lifesavers during 14-hour transits!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '2026-10-10',
    isActive: true,
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'Tech Consultant & Frequent Flyer',
    location: 'San Francisco, CA',
    rating: 5,
    comment:
      'Passing TSA security without pulling out plastic bags of liquids is liberating. The organic canvas pouch looks exceptionally premium on business hotel counters.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: '2026-10-08',
    isActive: true,
  },
  {
    id: 'test-3',
    name: 'Aria Chen',
    role: 'Digital Nomad & Travel Photographer',
    location: 'Tokyo & Bali',
    rating: 5,
    comment:
      'Every single item has a purpose. The reusable cutlery kit saved me on overnight sleeper trains in Vietnam, and the paper soap sheets lather up instantly in rural stations.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    date: '2026-10-04',
    isActive: true,
  },
  {
    id: 'test-4',
    name: 'Julian Moretti',
    role: 'Adventure Backpacker',
    location: 'Milan, Italy',
    rating: 5,
    comment:
      'Solid quality. The five mini sanitizers are great to distribute across daypacks. Ordered 2 kits on WhatsApp and received tracking within 2 hours.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    date: '2026-09-28',
    isActive: true,
  },
];

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'TRL-9841',
    customerName: 'Sophie Bennett',
    phone: '+91 89210 19251',
    bundle: 'Duo Journey Pack (2x Kits)',
    destination: 'Seattle, USA',
    amount: '$69',
    status: 'Shipped',
    createdAt: '2026-10-14 14:22',
    source: 'WhatsApp Button',
  },
  {
    id: 'TRL-9840',
    customerName: 'Devon Patel',
    phone: '+44 7700 900451',
    bundle: 'Voyage Family Pack (4x Kits)',
    destination: 'London, UK',
    amount: '$129',
    status: 'Confirmed',
    createdAt: '2026-10-14 11:05',
    source: 'Bundle Selector',
  },
  {
    id: 'TRL-9839',
    customerName: 'Liam O’Connor',
    phone: '+353 87 123 4567',
    bundle: 'Solo Explorer Kit',
    destination: 'Dublin, Ireland',
    amount: '$39',
    status: 'Delivered',
    createdAt: '2026-10-13 18:40',
    source: 'Direct Chat',
  },
  {
    id: 'TRL-9838',
    customerName: 'Camille Laurent',
    phone: '+33 6 12 34 56 78',
    bundle: 'Duo Journey Pack (2x Kits)',
    destination: 'Paris, France',
    amount: '$69',
    status: 'Pending',
    createdAt: '2026-10-13 09:15',
    source: 'WhatsApp Button',
  },
];

const INITIAL_ANALYTICS: AnalyticsData = {
  pageViews: 1428,
  unpackScrolls: 986,
  whatsappClicks: 247,
  productInspects: 634,
  recentClicks: [
    { id: 'clk-1', label: 'Order via WhatsApp (Hero)', timestamp: 'Just now' },
    { id: 'clk-2', label: 'Order via WhatsApp (Stage 5)', timestamp: '4 mins ago' },
    { id: 'clk-3', label: 'WhatsApp Concierge Float', timestamp: '12 mins ago' },
    { id: 'clk-4', label: 'Bundle Selector (Duo Pack)', timestamp: '28 mins ago' },
  ],
};

const TraliberContext = createContext<TraliberContextType | undefined>(undefined);

export const TraliberProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(INITIAL_ANALYTICS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedAnalytics = localStorage.getItem('traliber_analytics');
      if (storedAnalytics) setAnalytics(JSON.parse(storedAnalytics));

      const storedTestimonials = localStorage.getItem('traliber_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedOrders = localStorage.getItem('traliber_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedImages = localStorage.getItem('traliber_custom_images');
      if (storedImages) setCustomImages(JSON.parse(storedImages));
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('traliber_analytics', JSON.stringify(analytics));
      localStorage.setItem('traliber_testimonials', JSON.stringify(testimonials));
      localStorage.setItem('traliber_orders', JSON.stringify(orders));
      localStorage.setItem('traliber_custom_images', JSON.stringify(customImages));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [analytics, testimonials, orders, customImages, isLoaded]);

  // Trackers
  const trackPageView = () => {
    setAnalytics((prev) => ({ ...prev, pageViews: prev.pageViews + 1 }));
  };

  const trackUnpackScroll = () => {
    setAnalytics((prev) => ({ ...prev, unpackScrolls: prev.unpackScrolls + 1 }));
  };

  const trackWhatsAppClick = (sourceLabel = 'WhatsApp Button') => {
    const newClick = {
      id: `clk-${Date.now()}`,
      label: sourceLabel,
      timestamp: 'Just now',
    };
    setAnalytics((prev) => ({
      ...prev,
      whatsappClicks: prev.whatsappClicks + 1,
      recentClicks: [newClick, ...prev.recentClicks.slice(0, 9)],
    }));
  };

  const trackProductInspect = (_productName: string) => {
    setAnalytics((prev) => ({
      ...prev,
      productInspects: prev.productInspects + 1,
    }));
  };

  // Testimonials
  const addTestimonial = (t: Omit<Testimonial, 'id' | 'date'>) => {
    const newT: Testimonial = {
      ...t,
      id: `test-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTestimonials((prev) => [newT, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Orders
  const addOrder = (o: Omit<OrderItem, 'id' | 'createdAt'>) => {
    const newOrder: OrderItem = {
      ...o,
      id: `TRL-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // Product Image Replacement
  const updateProductImage = (itemId: string, imageUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [itemId]: imageUrl }));
  };

  const resetProductImage = (itemId: string) => {
    setCustomImages((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const getProductImage = (itemId: string, fallback: string) => {
    return customImages[itemId] || fallback;
  };

  return (
    <TraliberContext.Provider
      value={{
        analytics,
        testimonials,
        orders,
        customImages,
        trackPageView,
        trackUnpackScroll,
        trackWhatsAppClick,
        trackProductInspect,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        updateProductImage,
        resetProductImage,
        getProductImage,
      }}
    >
      {children}
    </TraliberContext.Provider>
  );
};

export const useTraliberStore = () => {
  const context = useContext(TraliberContext);
  if (!context) {
    throw new Error('useTraliberStore must be used within a TraliberProvider');
  }
  return context;
};
