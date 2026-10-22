'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';

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

export interface WhatsAppEventMeta {
  eventType?: 'whatsapp_click' | 'product_whatsapp_click' | 'kit_enquiry_click' | 'contact_click';
  buttonLocation?: string;
  productName?: string;
  pagePath?: string;
  campaignSource?: string;
}

export interface ClickEventItem {
  id: string;
  label: string;
  destination: string;
  timestamp: string;
  eventType?: string;
  pagePath?: string;
}

export interface AnalyticsData {
  pageViews: number;
  unpackScrolls: number;
  whatsappClicks: number;
  productInspects: number;
  recentClicks: ClickEventItem[];
}

interface TraliberContextType {
  analytics: AnalyticsData;
  testimonials: Testimonial[];
  orders: OrderItem[];
  customImages: Record<string, string>; // itemId -> custom image URL/data URL
  customTexts: Record<string, string>; // contentKey -> text value
  trackPageView: () => void;
  trackUnpackScroll: () => void;
  trackWhatsAppClick: (sourceOrMeta?: string | WhatsAppEventMeta) => void;
  trackProductInspect: (productName: string) => void;
  addTestimonial: (t: Omit<Testimonial, 'id' | 'date'>) => Promise<{ success: boolean; id: string; error?: unknown }>;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addOrder: (o: Omit<OrderItem, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: OrderItem['status']) => void;
  deleteOrder: (id: string) => void;
  clearOrders: () => void;
  clearAnalytics: () => void;
  updateProductImage: (itemId: string, imageUrl: string) => void;
  resetProductImage: (itemId: string) => void;
  getProductImage: (itemId: string, fallback: string) => string;
  updateCustomText: (key: string, value: string) => void;
  resetCustomText: (key: string) => void;
  getCustomText: (key: string, fallback: string) => string;
  resetAllContent: () => void;
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

const INITIAL_ORDERS: OrderItem[] = [];

const INITIAL_ANALYTICS: AnalyticsData = {
  pageViews: 0,
  unpackScrolls: 0,
  whatsappClicks: 0,
  productInspects: 0,
  recentClicks: [],
};

const TraliberContext = createContext<TraliberContextType | undefined>(undefined);

export const TraliberProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(INITIAL_ANALYTICS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedAnalytics = localStorage.getItem('traliber_analytics');
      if (storedAnalytics) {
        try {
          const parsed = JSON.parse(storedAnalytics);
          // If legacy dummy mock data exists, reset it cleanly
          if (
            parsed &&
            (parsed.pageViews === 1428 ||
              (Array.isArray(parsed.recentClicks) &&
                parsed.recentClicks.some((c: { id?: string }) => c.id === 'clk-1')))
          ) {
            setAnalytics(INITIAL_ANALYTICS);
          } else {
            setAnalytics(parsed);
          }
        } catch (_) {}
      }

      const storedTestimonials = localStorage.getItem('traliber_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedOrders = localStorage.getItem('traliber_orders');
      if (storedOrders) {
        try {
          const parsed = JSON.parse(storedOrders);
          // Filter out legacy dummy orders starting with TRL-98
          const realOrders = Array.isArray(parsed)
            ? parsed.filter((o: OrderItem) => !o.id.startsWith('TRL-98'))
            : [];
          setOrders(realOrders);
        } catch (_) {}
      }

      const storedImages = localStorage.getItem('traliber_custom_images');
      if (storedImages) setCustomImages(JSON.parse(storedImages));

      const storedTexts = localStorage.getItem('traliber_custom_texts');
      if (storedTexts) setCustomTexts(JSON.parse(storedTexts));
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
    // Real page view tracker (client-side only, non-admin)
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
      setAnalytics((prev) => ({
        ...prev,
        pageViews: (prev.pageViews || 0) + 1,
      }));
    }

    setIsLoaded(true);

    // Sync latest testimonials from Supabase
    const syncFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: Testimonial[] = data.map((row) => ({
            id: String(row.id),
            name: row.name,
            role: row.role || 'Verified Traveler',
            location: row.location || '',
            rating: typeof row.rating === 'number' ? row.rating : 5,
            comment: row.comment,
            avatar: row.avatar || '',
            date: row.date || (row.created_at ? String(row.created_at).split('T')[0] : ''),
            isActive: row.is_active !== false,
          }));
          setTestimonials(mapped);
          try {
            localStorage.setItem('traliber_testimonials', JSON.stringify(mapped));
          } catch (_) {}
        }
      } catch (err) {
        console.warn('Supabase testimonials sync note:', err);
      }
    };

    syncFromSupabase();
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('traliber_analytics', JSON.stringify(analytics));
      localStorage.setItem('traliber_testimonials', JSON.stringify(testimonials));
      localStorage.setItem('traliber_orders', JSON.stringify(orders));
      localStorage.setItem('traliber_custom_images', JSON.stringify(customImages));
      localStorage.setItem('traliber_custom_texts', JSON.stringify(customTexts));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [analytics, testimonials, orders, customImages, customTexts, isLoaded]);

  // Trackers
  const trackPageView = () => {
    setAnalytics((prev) => ({ ...prev, pageViews: prev.pageViews + 1 }));
  };

  const trackUnpackScroll = () => {
    setAnalytics((prev) => ({ ...prev, unpackScrolls: prev.unpackScrolls + 1 }));
  };

  const trackWhatsAppClick = (sourceOrMeta?: string | WhatsAppEventMeta) => {
    const meta: WhatsAppEventMeta =
      typeof sourceOrMeta === 'string'
        ? { buttonLocation: sourceOrMeta, eventType: 'whatsapp_click' }
        : sourceOrMeta || { eventType: 'whatsapp_click', buttonLocation: 'WhatsApp Button' };

    const label = meta.buttonLocation || meta.productName || 'WhatsApp Enquiry';
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateFormatted = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

    const newClick: ClickEventItem = {
      id: `clk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      label,
      destination: `WhatsApp Concierge (+91 ${WHATSAPP_CONFIG.phoneNumber})`,
      timestamp: `${dateFormatted}, ${timeFormatted}`,
      eventType: meta.eventType || 'whatsapp_click',
      pagePath: meta.pagePath || currentPath,
    };

    setAnalytics((prev) => ({
      ...prev,
      whatsappClicks: (prev.whatsappClicks || 0) + 1,
      recentClicks: [newClick, ...(prev.recentClicks || []).slice(0, 49)],
    }));

    // Trigger non-personal analytics event for Google Analytics or client telemetry if present
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(
          new CustomEvent('traliber_whatsapp_enquiry', {
            detail: {
              event: meta.eventType || 'whatsapp_click',
              button_location: meta.buttonLocation || 'Button',
              product_name: meta.productName || 'Travel Essentials Kit',
              page_path: window.location.pathname,
            },
          })
        );
      } catch (_) {}
    }
  };

  const trackProductInspect = (_productName: string) => {
    setAnalytics((prev) => ({
      ...prev,
      productInspects: prev.productInspects + 1,
    }));
  };

  // Testimonials (Optimistic Local State + Supabase Cloud Sync)
  const addTestimonial = async (t: Omit<Testimonial, 'id' | 'date'>) => {
    const tempId = `test-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newT: Testimonial = {
      ...t,
      id: tempId,
      date: today,
    };
    setTestimonials((prev) => [newT, ...prev]);

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([
          {
            name: t.name,
            role: t.role,
            location: t.location,
            rating: t.rating,
            comment: t.comment,
            avatar: t.avatar || '',
            is_active: t.isActive !== false,
          },
        ])
        .select();

      if (!error && data && data.length > 0) {
        const savedId = String(data[0].id);
        setTestimonials((prev) =>
          prev.map((item) => (item.id === tempId ? { ...item, id: savedId } : item))
        );
        return { success: true, id: savedId };
      }
      if (error) {
        console.warn('Supabase addTestimonial returned error:', error);
        return { success: true, id: tempId, error }; // local state still updated
      }
      return { success: true, id: tempId };
    } catch (e) {
      console.warn('Supabase addTestimonial error:', e);
      return { success: false, id: tempId, error: e };
    }
  };

  const updateTestimonial = async (id: string, updated: Partial<Testimonial>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );

    try {
      const payload: Record<string, unknown> = {};
      if (updated.name !== undefined) payload.name = updated.name;
      if (updated.role !== undefined) payload.role = updated.role;
      if (updated.location !== undefined) payload.location = updated.location;
      if (updated.rating !== undefined) payload.rating = updated.rating;
      if (updated.comment !== undefined) payload.comment = updated.comment;
      if (updated.avatar !== undefined) payload.avatar = updated.avatar;
      if (updated.isActive !== undefined) payload.is_active = updated.isActive;

      await supabase.from('testimonials').update(payload).eq('id', id);
    } catch (e) {
      console.warn('Supabase updateTestimonial error:', e);
    }
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    try {
      await supabase.from('testimonials').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteTestimonial error:', e);
    }
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

  const clearOrders = () => {
    setOrders([]);
    try {
      localStorage.setItem('traliber_orders', JSON.stringify([]));
    } catch (_) {}
  };

  const clearAnalytics = () => {
    const resetData: AnalyticsData = {
      pageViews: 0,
      unpackScrolls: 0,
      whatsappClicks: 0,
      productInspects: 0,
      recentClicks: [],
    };
    setAnalytics(resetData);
    try {
      localStorage.setItem('traliber_analytics', JSON.stringify(resetData));
    } catch (_) {}
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

  // Text Content Replacement
  const updateCustomText = (key: string, value: string) => {
    setCustomTexts((prev) => ({ ...prev, [key]: value }));
  };

  const resetCustomText = (key: string) => {
    setCustomTexts((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const getCustomText = (key: string, fallback: string) => {
    return customTexts[key] !== undefined ? customTexts[key] : fallback;
  };

  const resetAllContent = () => {
    setCustomImages({});
    setCustomTexts({});
    localStorage.removeItem('traliber_custom_images');
    localStorage.removeItem('traliber_custom_texts');
  };

  return (
    <TraliberContext.Provider
      value={{
        analytics,
        testimonials,
        orders,
        customImages,
        customTexts,
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
        clearOrders,
        clearAnalytics,
        updateProductImage,
        resetProductImage,
        getProductImage,
        updateCustomText,
        resetCustomText,
        getCustomText,
        resetAllContent,
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
