'use client';

import { EDITORIAL_PRODUCTS } from '@/components/EditorialStorytellingSection';
import { useTraliberStore, OrderItem } from '@/context/TraliberStore';
import {
  ArrowLeft,
  Check,
  Command,
  Eye,
  Image as ImageIcon,
  LayoutTemplate,
  LogOut,
  MessageCircle,
  Plus,
  RotateCcw,
  Save,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Type,
  Upload,
  Users,
  ExternalLink,
  MousePointerClick,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const {
    customImages,
    customTexts,
    updateProductImage,
    resetProductImage,
    getProductImage,
    updateCustomText,
    resetCustomText,
    getCustomText,
    resetAllContent,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    orders,
    analytics,
    addOrder,
    deleteOrder,
    clearOrders,
    clearAnalytics,
    trackWhatsAppClick,
  } = useTraliberStore();

  const [activeTab, setActiveTab] = useState<
    'media' | 'hero' | 'whats_inside' | 'products' | 'founder' | 'testimonials' | 'orders'
  >('media');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Client-side authentication check
  useEffect(() => {
    try {
      const auth = localStorage.getItem('traliber_admin_auth');
      if (auth !== 'true') {
        router.replace('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    } catch (_) {
      router.replace('/admin/login');
    }
  }, [router]);

  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUploadKey, setCurrentUploadKey] = useState<string | null>(null);

  // Testimonials Add Form State
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Orders Add Form State
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [newOrderCustomer, setNewOrderCustomer] = useState('');
  const [newOrderPhone, setNewOrderPhone] = useState('');
  const [newOrderBundle, setNewOrderBundle] = useState('Solo Explorer Kit (₹199)');
  const [newOrderDestination, setNewOrderDestination] = useState('');
  const [newOrderAmount, setNewOrderAmount] = useState('₹199');
  const [newOrderStatus, setNewOrderStatus] = useState<'Pending' | 'Confirmed' | 'Shipped' | 'Delivered'>('Confirmed');

  // Keyboard shortcut listener: Ctrl + Shift + A or Escape to return to homepage
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if ((isCtrlOrCmd && e.shiftKey && (e.key === 'A' || e.key === 'a')) || e.key === 'Escape') {
        e.preventDefault();
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const showNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateProductImage(itemId, dataUrl);
        showNotification(`Updated image for ${itemId}`);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const triggerUpload = (itemId: string) => {
    setCurrentUploadKey(itemId);
    fileInputRef.current?.click();
  };

  const mediaItems = [
    {
      id: 'hero_background',
      name: 'Hero Section Alpine Background (Desktop)',
      defaultImg: '/images/hero-alpine-mountain.webp',
      category: 'Page Backgrounds',
    },
    {
      id: 'hero_background_mobile',
      name: 'Hero Section Sunrise Background (Mobile)',
      defaultImg: '/images/hero-alpine-mobile.webp',
      category: 'Page Backgrounds',
    },
    {
      id: 'whats_inside_burst',
      name: "What's Inside Kit Burst Graphic",
      defaultImg: '/images/kit-burst-alpine.webp',
      category: 'Page Backgrounds',
    },
    {
      id: 'cotton-pouch-closed',
      name: 'Travel Essentials Pouch (Closed)',
      defaultImg: '/images/products/pouch.webp',
      category: 'Kit Products',
    },
    {
      id: 'cotton-pouch-open',
      name: 'Travel Essentials Pouch (Open Interior)',
      defaultImg: '/images/products/kit-display.webp',
      category: 'Kit Products',
    },
    {
      id: 'tooth-brush',
      name: 'Toothbrush Set',
      defaultImg: '/images/products/toothbrush.webp',
      category: 'Kit Products',
    },
    {
      id: 'tablet-paste',
      name: 'Mountain Mint Toothpaste',
      defaultImg: '/images/products/toothpaste.webp',
      category: 'Kit Products',
    },
    {
      id: 'mini-sanitizer',
      name: 'Mini Sanitizer (5 Bottles)',
      defaultImg: '/images/products/mini-sanitizer.webp',
      category: 'Kit Products',
    },
    {
      id: 'wet-wipes',
      name: 'Wet Wipes (2 Packs)',
      defaultImg: '/images/products/wet-wipes.webp',
      category: 'Kit Products',
    },
    {
      id: 'wet-towel',
      name: 'Wet Towel Sachet',
      defaultImg: '/images/products/wet-towel.webp',
      category: 'Kit Products',
    },
    {
      id: 'toilet-seat-cover',
      name: 'Toilet Seat Covers',
      defaultImg: '/images/products/toilet-seat-cover.webp',
      category: 'Kit Products',
    },
    {
      id: 'face-mask',
      name: 'Face Mask Kit',
      defaultImg: '/images/products/face-mask.webp',
      category: 'Kit Products',
    },
    {
      id: 'paper-soap',
      name: 'Paper Soap Pack',
      defaultImg: '/images/products/paper-soap.webp',
      category: 'Kit Products',
    },
    {
      id: 'cutlery-kit',
      name: 'Travel Cutlery Kit',
      defaultImg: '/images/products/cutlery-kit.webp',
      category: 'Kit Products',
    },
    {
      id: 'founder_photo',
      name: 'Founder Portrait (Aldrino Francis)',
      defaultImg: '/images/aldrino.jpeg',
      category: 'Brand Assets',
    },
  ];

  if (isAuthenticated !== true) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC] text-[#22213A]">
        <div className="text-center space-y-3">
          <div className="w-9 h-9 border-3 border-[#4F75FF] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#22213A]/60">
            Checking Admin Authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#22213A]">
      {/* Hidden File Input for Image Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => currentUploadKey && handleFileUpload(e, currentUploadKey)}
        accept="image/*"
        className="hidden"
      />

      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#22213A] text-white border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all mr-1"
              title="Return to Home (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8657F6] to-[#55C7DE] flex items-center justify-center font-bold text-sm shadow">
              T
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">Traliber Content Admin</h1>
              <p className="text-3xs text-gray-400">Live Website Content & Media Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shortcut Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-3xs font-bold text-gray-300 border border-white/10">
              <Command className="w-3 h-3 text-[#55C7DE]" />
              <span>Shortcut: Ctrl + Shift + A</span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            <button
              onClick={() => {
                if (confirm('Reset all custom images and text to default factory values?')) {
                  resetAllContent();
                  showNotification('Reset all custom content to factory defaults');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold transition-all border border-rose-500/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={() => {
                try {
                  localStorage.removeItem('traliber_admin_auth');
                  localStorage.removeItem('traliber_admin_email');
                } catch (_) {}
                router.replace('/admin/login');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-gray-300 text-xs font-bold transition-all border border-white/15"
              title="Sign Out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save / Action Notification */}
      {saveNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#22213A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#8657F6]/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-bold">{saveNotification}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-3xl p-4 border border-[#8657F6]/15 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${activeTab === 'media'
                    ? 'bg-[#8657F6] text-white shadow-md'
                    : 'text-[#22213A]/70 hover:bg-gray-100 hover:text-[#22213A]'
                  }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Replace Images</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${activeTab === 'hero'
                    ? 'bg-[#8657F6] text-white shadow-md'
                    : 'text-[#22213A]/70 hover:bg-gray-100 hover:text-[#22213A]'
                  }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Hero / Landing Page</span>
              </button>

              <button
                onClick={() => setActiveTab('whats_inside')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${activeTab === 'whats_inside'
                    ? 'bg-[#8657F6] text-white shadow-md'
                    : 'text-[#22213A]/70 hover:bg-gray-100 hover:text-[#22213A]'
                  }`}
              >
                <LayoutTemplate className="w-4 h-4" />
                <span>What&apos;s Inside Section</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${activeTab === 'products'
                    ? 'bg-[#8657F6] text-white shadow-md'
                    : 'text-[#22213A]/70 hover:bg-gray-100 hover:text-[#22213A]'
                  }`}
              >
                <Type className="w-4 h-4" />
                <span>10 Products Storytelling</span>
              </button>

              <button
                onClick={() => setActiveTab('founder')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${activeTab === 'founder'
                    ? 'bg-[#8657F6] text-white shadow-md'
                    : 'text-[#22213A]/70 hover:bg-gray-100 hover:text-[#22213A]'
                  }`}
              >
                <Users className="w-4 h-4" />
                <span>Founder &amp; Story</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${activeTab === 'testimonials'
                    ? 'bg-[#8657F6] text-white shadow-md'
                    : 'text-[#22213A]/70 hover:bg-gray-100 hover:text-[#22213A]'
                  }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Traveler Reviews</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${activeTab === 'orders'
                    ? 'bg-[#8657F6] text-white shadow-md'
                    : 'text-[#22213A]/70 hover:bg-gray-100 hover:text-[#22213A]'
                  }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Inquiries &amp; Orders</span>
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="bg-white rounded-3xl p-4 border border-[#8657F6]/15 shadow-sm space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-[#22213A]">
                <span>Active Overrides</span>
                <span className="text-[#8657F6]">
                  {Object.keys(customImages).length + Object.keys(customTexts).length}
                </span>
              </div>
              <p className="text-3xs text-[#22213A]/60 leading-normal">
                All changes save automatically to your browser storage and persist across refreshes.
              </p>
            </div>
          </aside>

          {/* Right Main Content Pane */}
          <main className="lg:col-span-9 space-y-6">
            {/* TAB 1: MEDIA & IMAGES */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                    <ImageIcon className="w-4 h-4" />
                    Asset Replacement Studio
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Replace Any Website Image</h2>
                  <p className="text-xs sm:text-sm text-[#22213A]/70">
                    Upload images directly from your computer or paste any image URL. Changes render instantly across the website.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediaItems.map((item) => {
                    const currentSrc = getProductImage(item.id, item.defaultImg);
                    const isCustom = !!customImages[item.id];

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl p-6 border border-[#8657F6]/15 shadow-sm space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-[#22213A]">{item.name}</h3>
                            {isCustom ? (
                              <span className="text-3xs font-extrabold px-2 py-0.5 rounded-full bg-[#8657F6]/15 text-[#8657F6]">
                                Customized
                              </span>
                            ) : (
                              <span className="text-3xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                                Default
                              </span>
                            )}
                          </div>

                          {/* Image Preview Box */}
                          <div className="h-44 w-full rounded-2xl bg-[#F8F7FC] border border-dashed border-[#8657F6]/20 flex items-center justify-center p-3 relative overflow-hidden group">
                            <img
                              src={currentSrc}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                            />
                          </div>

                          {/* Custom URL Input */}
                          <div className="space-y-1">
                            <label className="text-3xs font-bold uppercase tracking-wider text-[#22213A]/60">
                              Image URL (or upload file below)
                            </label>
                            <input
                              type="text"
                              value={customImages[item.id] || ''}
                              onChange={(e) => {
                                if (e.target.value) {
                                  updateProductImage(item.id, e.target.value);
                                } else {
                                  resetProductImage(item.id);
                                }
                              }}
                              placeholder={item.defaultImg}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => triggerUpload(item.id)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#22213A] text-white hover:bg-[#8657F6] text-xs font-bold transition-colors shadow-sm"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                          </button>

                          {isCustom && (
                            <button
                              onClick={() => {
                                resetProductImage(item.id);
                                showNotification(`Reset ${item.name} to default`);
                              }}
                              className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
                              title="Reset to default image"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: HERO / LANDING PAGE */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                    <Sparkles className="w-4 h-4" />
                    Landing Page Content
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Edit Hero &amp; Landing Elements</h2>
                  <p className="text-xs sm:text-sm text-[#22213A]/70">
                    Customize headlines, badges, subtitles, and call to action on the primary landing page.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#22213A]/80">Hero Eyebrow</label>
                    <input
                      type="text"
                      value={getCustomText('hero_eyebrow', 'TRAVEL ✦ ESSENTIALS')}
                      onChange={(e) => updateCustomText('hero_eyebrow', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6] font-semibold"
                    />
                  </div>

                  {/* 4-Line Headline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Headline Line 1</label>
                      <input
                        type="text"
                        value={getCustomText('hero_headline_1', 'Smaller')}
                        onChange={(e) => updateCustomText('hero_headline_1', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-serif font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Headline Line 2</label>
                      <input
                        type="text"
                        value={getCustomText('hero_headline_2', 'Bag.')}
                        onChange={(e) => updateCustomText('hero_headline_2', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-serif font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#4F75FF]">Headline Line 3 (Blue)</label>
                      <input
                        type="text"
                        value={getCustomText('hero_headline_3', 'Brighter')}
                        onChange={(e) => updateCustomText('hero_headline_3', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#4F75FF]/30 font-serif font-bold text-[#4F75FF]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Headline Line 4</label>
                      <input
                        type="text"
                        value={getCustomText('hero_headline_4', 'Journeys.')}
                        onChange={(e) => updateCustomText('hero_headline_4', e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-serif font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#22213A]/80">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={getCustomText(
                        'hero_subtitle',
                        'Ten thoughtfully chosen travel essentials for a cleaner, safer and more comfortable tomorrow.'
                      )}
                      onChange={(e) => updateCustomText('hero_subtitle', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">CTA Button Text</label>
                      <input
                        type="text"
                        value={getCustomText('hero_cta_text', 'Get Your Travel Kit')}
                        onChange={(e) => updateCustomText('hero_cta_text', e.target.value)}
                        className="w-full px-4 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Handwritten Script Annotation</label>
                      <input
                        type="text"
                        value={getCustomText('hero_annotation', "Ready for what's next")}
                        onChange={(e) => updateCustomText('hero_annotation', e.target.value)}
                        className="w-full px-4 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-handwriting text-lg"
                      />
                    </div>
                  </div>

                  {/* 3 Feature Badges */}
                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="text-xs font-extrabold uppercase text-[#22213A]/70 mb-3">Feature Badges</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-[#F8F7FC] rounded-2xl space-y-2">
                        <label className="text-3xs font-bold uppercase text-[#22213A]/60">Badge 1</label>
                        <input
                          type="text"
                          value={getCustomText('hero_badge1_title', 'CLEAN')}
                          onChange={(e) => updateCustomText('hero_badge1_title', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded-lg bg-white border border-gray-200 font-bold"
                          placeholder="CLEAN"
                        />
                        <input
                          type="text"
                          value={getCustomText('hero_badge1_sub', 'Essentials')}
                          onChange={(e) => updateCustomText('hero_badge1_sub', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded-lg bg-white border border-gray-200"
                          placeholder="Essentials"
                        />
                      </div>

                      <div className="p-3 bg-[#F8F7FC] rounded-2xl space-y-2">
                        <label className="text-3xs font-bold uppercase text-[#22213A]/60">Badge 2</label>
                        <input
                          type="text"
                          value={getCustomText('hero_badge2_title', 'SAFE')}
                          onChange={(e) => updateCustomText('hero_badge2_title', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded-lg bg-white border border-gray-200 font-bold"
                          placeholder="SAFE"
                        />
                        <input
                          type="text"
                          value={getCustomText('hero_badge2_sub', 'Travel')}
                          onChange={(e) => updateCustomText('hero_badge2_sub', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded-lg bg-white border border-gray-200"
                          placeholder="Travel"
                        />
                      </div>

                      <div className="p-3 bg-[#F8F7FC] rounded-2xl space-y-2">
                        <label className="text-3xs font-bold uppercase text-[#22213A]/60">Badge 3</label>
                        <input
                          type="text"
                          value={getCustomText('hero_badge3_title', 'TRAVEL')}
                          onChange={(e) => updateCustomText('hero_badge3_title', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded-lg bg-white border border-gray-200 font-bold"
                          placeholder="TRAVEL"
                        />
                        <input
                          type="text"
                          value={getCustomText('hero_badge3_sub', 'Friendly')}
                          onChange={(e) => updateCustomText('hero_badge3_sub', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded-lg bg-white border border-gray-200"
                          placeholder="Friendly"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => showNotification('Hero content saved!')}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1E1B4B] text-white text-xs font-bold hover:bg-[#8657F6] transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Landing Page Content
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: WHAT'S INSIDE SECTION */}
            {activeTab === 'whats_inside' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                    <LayoutTemplate className="w-4 h-4" />
                    Section 2 Content
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Edit What&apos;s Inside Section</h2>
                  <p className="text-xs sm:text-sm text-[#22213A]/70">
                    Customize headlines, handwritten callout notes, and bottom dock categories.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#22213A]/80">Eyebrow</label>
                    <input
                      type="text"
                      value={getCustomText('whats_inside_eyebrow', "— WHAT'S INSIDE")}
                      onChange={(e) => updateCustomText('whats_inside_eyebrow', e.target.value)}
                      className="w-full px-4 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Headline Prefix</label>
                      <input
                        type="text"
                        value={getCustomText('whats_inside_headline_prefix', 'Ten little things.')}
                        onChange={(e) => updateCustomText('whats_inside_headline_prefix', e.target.value)}
                        className="w-full px-4 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-serif font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#4F75FF]">Headline Suffix (Blue)</label>
                      <input
                        type="text"
                        value={getCustomText('whats_inside_headline_suffix', 'A big difference.')}
                        onChange={(e) => updateCustomText('whats_inside_headline_suffix', e.target.value)}
                        className="w-full px-4 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#4F75FF]/30 font-serif font-bold text-[#4F75FF]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#22213A]/80">Subtitle</label>
                    <textarea
                      rows={2}
                      value={getCustomText(
                        'whats_inside_subtitle',
                        'Everything you need to feel fresh, prepared and comfortable — all in one compact companion.'
                      )}
                      onChange={(e) => updateCustomText('whats_inside_subtitle', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Left Handwritten Note</label>
                      <input
                        type="text"
                        value={getCustomText('whats_inside_left_note', 'Essentials for everyday journeys')}
                        onChange={(e) => updateCustomText('whats_inside_left_note', e.target.value)}
                        className="w-full px-4 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-handwriting text-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Right Handwritten Note</label>
                      <input
                        type="text"
                        value={getCustomText('whats_inside_right_note', 'Packed for a cleaner tomorrow')}
                        onChange={(e) => updateCustomText('whats_inside_right_note', e.target.value)}
                        className="w-full px-4 py-2 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-handwriting text-lg"
                      />
                    </div>
                  </div>

                  {/* 4 Bottom Dock Cards */}
                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="text-xs font-extrabold uppercase text-[#22213A]/70 mb-3">Bottom Dock Cards</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-[#F8F7FC] rounded-2xl space-y-1.5">
                        <label className="text-3xs font-bold uppercase text-[#22213A]/60">Card 1</label>
                        <input
                          type="text"
                          value={getCustomText('dock1_title', 'Oral & Personal')}
                          onChange={(e) => updateCustomText('dock1_title', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200 font-bold"
                        />
                        <input
                          type="text"
                          value={getCustomText('dock1_sub', 'Stay fresh, wherever you go.')}
                          onChange={(e) => updateCustomText('dock1_sub', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200"
                        />
                      </div>

                      <div className="p-3 bg-[#F8F7FC] rounded-2xl space-y-1.5">
                        <label className="text-3xs font-bold uppercase text-[#22213A]/60">Card 2</label>
                        <input
                          type="text"
                          value={getCustomText('dock2_title', 'Sanitization & Hygiene')}
                          onChange={(e) => updateCustomText('dock2_title', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200 font-bold"
                        />
                        <input
                          type="text"
                          value={getCustomText('dock2_sub', 'Be prepared for every moment.')}
                          onChange={(e) => updateCustomText('dock2_sub', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200"
                        />
                      </div>

                      <div className="p-3 bg-[#F8F7FC] rounded-2xl space-y-1.5">
                        <label className="text-3xs font-bold uppercase text-[#22213A]/60">Card 3</label>
                        <input
                          type="text"
                          value={getCustomText('dock3_title', 'Comfort & Utility')}
                          onChange={(e) => updateCustomText('dock3_title', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200 font-bold"
                        />
                        <input
                          type="text"
                          value={getCustomText('dock3_sub', 'Little comforts, bigger journeys.')}
                          onChange={(e) => updateCustomText('dock3_sub', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200"
                        />
                      </div>

                      <div className="p-3 bg-[#F8F7FC] rounded-2xl space-y-1.5">
                        <label className="text-3xs font-bold uppercase text-[#22213A]/60">Card 4</label>
                        <input
                          type="text"
                          value={getCustomText('dock4_title', 'All 10 Essentials')}
                          onChange={(e) => updateCustomText('dock4_title', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200 font-bold"
                        />
                        <input
                          type="text"
                          value={getCustomText('dock4_sub', 'One compact travel companion.')}
                          onChange={(e) => updateCustomText('dock4_sub', e.target.value)}
                          className="w-full px-3 py-1 text-xs rounded-lg bg-white border border-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => showNotification("What's Inside content saved!")}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1E1B4B] text-white text-xs font-bold hover:bg-[#8657F6] transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Section Content
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: 10 PRODUCTS STORYTELLING */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                    <Type className="w-4 h-4" />
                    Storytelling Editor
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Edit 10 Essentials Storytelling</h2>
                  <p className="text-xs sm:text-sm text-[#22213A]/70">
                    Customize headlines, stories, micro-labels, and practical details for each product chapter in the editorial section.
                  </p>
                </div>

                <div className="space-y-6">
                  {EDITORIAL_PRODUCTS.map((prod) => {
                    const headlineKey = `item_${prod.id}_headline`;
                    const storyKey = `item_${prod.id}_story`;
                    const detailKey = `item_${prod.id}_detail`;

                    const currentHeadline = getCustomText(headlineKey, prod.headline);
                    const currentStory = getCustomText(storyKey, prod.story);
                    const currentDetail = getCustomText(detailKey, prod.practicalDetail);

                    return (
                      <div
                        key={prod.id}
                        className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#8657F6]">{prod.chapterNum}</span>
                            <h3 className="text-base font-extrabold text-[#22213A]">{prod.name}</h3>
                          </div>
                          <span className="text-3xs font-bold px-2.5 py-0.5 rounded-full bg-[#8657F6]/10 text-[#8657F6]">
                            {prod.categoryLabel}
                          </span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#22213A]/80">Headline</label>
                          <input
                            type="text"
                            value={currentHeadline}
                            onChange={(e) => updateCustomText(headlineKey, e.target.value)}
                            className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6] font-semibold"
                          />
                        </div>

                        {/* Story narrative */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#22213A]/80">Story Narrative (2-3 sentences)</label>
                          <textarea
                            rows={3}
                            value={currentStory}
                            onChange={(e) => updateCustomText(storyKey, e.target.value)}
                            className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                          />
                        </div>

                        {/* Practical detail */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#22213A]/80">Practical Detail</label>
                          <input
                            type="text"
                            value={currentDetail}
                            onChange={(e) => updateCustomText(detailKey, e.target.value)}
                            className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                          />
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <button
                            onClick={() => {
                              resetCustomText(headlineKey);
                              resetCustomText(storyKey);
                              resetCustomText(detailKey);
                              showNotification(`Reset ${prod.name} copy to default`);
                            }}
                            className="text-xs text-gray-500 hover:text-red-500 font-semibold"
                          >
                            Reset this product&apos;s text
                          </button>

                          <button
                            onClick={() => showNotification(`Saved copy for ${prod.name}`)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#22213A] text-white text-xs font-bold hover:bg-[#8657F6] transition-colors"
                          >
                            <Save className="w-3.5 h-3.5" />
                            Save Item Copy
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 5: FOUNDER & STORY */}
            {activeTab === 'founder' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                    <Users className="w-4 h-4" />
                    Founder Identity
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Edit Founder Profile &amp; Mission</h2>
                  <p className="text-xs sm:text-sm text-[#22213A]/70">
                    Update the founder name, title, quote, and background narrative.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Founder Name</label>
                      <input
                        type="text"
                        value={getCustomText('founder_name', 'Aldrino Francis')}
                        onChange={(e) => updateCustomText('founder_name', e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Founder Title</label>
                      <input
                        type="text"
                        value={getCustomText('founder_title', 'Founder & Product Architect')}
                        onChange={(e) => updateCustomText('founder_title', e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#22213A]/80">Founder Quote</label>
                    <textarea
                      rows={2}
                      value={getCustomText(
                        'founder_quote',
                        '“I was tired of leaking bottles in my carry-on. So I reimagined travel personal care.”'
                      )}
                      onChange={(e) => updateCustomText('founder_quote', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 font-serif italic text-base"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#22213A]/80">Founder Mission &amp; Bio</label>
                    <textarea
                      rows={4}
                      value={getCustomText(
                        'founder_bio',
                        'Obsessed with minimalist personal-care engineering. After hundreds of flights and messy luggage spills, Julian created Traliber to bring peace of mind to every traveler with zero liquid leaks, 100% TSA compliance, and sustainable materials.'
                      )}
                      onChange={(e) => updateCustomText('founder_bio', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => showNotification('Founder content updated!')}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1E1B4B] text-white text-xs font-bold hover:bg-[#8657F6] transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Founder Story
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                      <MessageCircle className="w-4 h-4" />
                      Testimonials Manager
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Customer Testimonials</h2>
                    <p className="text-xs sm:text-sm text-[#22213A]/70">
                      Add, view, and manage traveler reviews displayed on the website.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddReviewForm(!showAddReviewForm)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-[#8657F6] text-white text-xs font-bold transition-all shadow-md shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddReviewForm ? 'Close Form' : 'Add Testimonial'}</span>
                  </button>
                </div>

                {/* ADD TESTIMONIAL FORM */}
                {showAddReviewForm && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#8657F6]/30 shadow-lg space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h3 className="text-base font-bold text-[#22213A]">Add New Traveler Review</h3>
                      <span className="text-xs text-[#8657F6] font-mono font-semibold">Live on Landing Page</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#22213A]/80">Traveler Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Liam O'Connor"
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                        />
                      </div>

                      {/* Role */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#22213A]/80">Role / Profession</label>
                        <input
                          type="text"
                          placeholder="e.g. Frequent Flyer & Consultant"
                          value={newReviewRole}
                          onChange={(e) => setNewReviewRole(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#22213A]/80">Location</label>
                        <input
                          type="text"
                          placeholder="e.g. Dublin & London"
                          value={newReviewLocation}
                          onChange={(e) => setNewReviewLocation(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                        />
                      </div>

                      {/* Rating */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#22213A]/80">Star Rating</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
                        >
                          <option value={5}>★★★★★ (5 Stars)</option>
                          <option value={4}>★★★★☆ (4 Stars)</option>
                          <option value={3}>★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#22213A]/80">Review Comment *</label>
                      <textarea
                        rows={3}
                        placeholder="Write the traveler's feedback or testimonial..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6] leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddReviewForm(false)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (!newReviewName.trim() || !newReviewComment.trim()) {
                            alert('Please provide at least a name and a review comment.');
                            return;
                          }
                          addTestimonial({
                            name: newReviewName.trim(),
                            role: newReviewRole.trim() || 'Verified Traveler',
                            location: newReviewLocation.trim() || '',
                            rating: newReviewRating,
                            comment: newReviewComment.trim(),
                            avatar: '',
                            isActive: true,
                          });
                          setNewReviewName('');
                          setNewReviewRole('');
                          setNewReviewLocation('');
                          setNewReviewRating(5);
                          setNewReviewComment('');
                          setShowAddReviewForm(false);
                          showNotification('New testimonial published successfully!');
                        }}
                        className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-[#8657F6] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Publish Testimonial</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TESTIMONIALS LIST */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-gray-500">
                      Active Testimonials ({testimonials.length})
                    </span>
                    <span className="text-3xs text-gray-400">
                      Renders in sets of 3 in the landing page slideshow
                    </span>
                  </div>

                  {testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#22213A]">{test.name}</h4>
                          {test.location && (
                            <span className="text-3xs text-gray-500">• {test.location}</span>
                          )}
                          <div className="flex items-center gap-0.5 text-amber-400 ml-1">
                            {[...Array(test.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#22213A]/75 leading-relaxed font-normal">
                          &ldquo;{test.comment}&rdquo;
                        </p>
                        <p className="text-3xs text-gray-400 font-mono">
                          {test.role} {test.date ? `• ${test.date}` : ''}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          deleteTestimonial(test.id);
                          showNotification(`Deleted review by ${test.name}`);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: INQUIRIES & ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {/* Header with Quick Actions */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
                      <ShoppingBag className="w-4 h-4" />
                      Verified Analytics &amp; WhatsApp Redirection
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Customer Clicks &amp; Orders</h2>
                    <p className="text-xs sm:text-sm text-[#22213A]/70">
                      Real-time log of customer visits, live WhatsApp CTA clicks, button redirection telemetry, and customer orders.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset real-time click and visit analytics counters?')) {
                          clearAnalytics();
                          showNotification('Analytics counters reset to zero.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:text-[#22213A] hover:bg-gray-100 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Analytics</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAddOrderForm(!showAddOrderForm)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E1B4B] hover:bg-[#8657F6] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log Customer Order</span>
                    </button>
                  </div>
                </div>

                {/* 4 Metric KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm">
                    <span className="text-3xs font-bold uppercase text-gray-500">Live Website Visits</span>
                    <p className="text-2xl font-extrabold text-[#22213A] mt-1">{analytics.pageViews}</p>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">Unique page impressions</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm">
                    <span className="text-3xs font-bold uppercase text-gray-500">Unpack Scrolls</span>
                    <p className="text-2xl font-extrabold text-[#8657F6] mt-1">{analytics.unpackScrolls}</p>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">Scroll animation triggers</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm">
                    <span className="text-3xs font-bold uppercase text-gray-500">WhatsApp CTA Clicks</span>
                    <p className="text-2xl font-extrabold text-[#25D366] mt-1">{analytics.whatsappClicks}</p>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">Total button redirections</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-[#8657F6]/15 shadow-sm">
                    <span className="text-3xs font-bold uppercase text-gray-500">Product Inquiries</span>
                    <p className="text-2xl font-extrabold text-[#55C7DE] mt-1">{analytics.productInspects}</p>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">Item inspect actions</span>
                  </div>
                </div>

                {/* SECTION 1: LIVE CLICK & REDIRECTION TELEMETRY STREAM */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#8657F6]/15 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="w-4 h-4 text-[#4F75FF]" />
                        <h3 className="text-sm font-bold text-[#22213A]">
                          Live Click &amp; WhatsApp Redirection Stream
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-3xs font-bold">
                          Real-time
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Logs the exact button clicked by visitors, the page origin, and the WhatsApp chat destination.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        trackWhatsAppClick({
                          buttonLocation: 'Admin Test Click',
                          eventType: 'whatsapp_click',
                          productName: 'Travel Kit',
                        });
                        showNotification('Test click event recorded.');
                      }}
                      className="text-xs font-semibold text-[#4F75FF] hover:underline cursor-pointer"
                    >
                      + Simulate Test Click
                    </button>
                  </div>

                  {analytics.recentClicks && analytics.recentClicks.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 uppercase text-3xs font-bold">
                            <th className="pb-3">Button / CTA Source</th>
                            <th className="pb-3">Redirection Destination</th>
                            <th className="pb-3">Page Origin</th>
                            <th className="pb-3">Recorded Time</th>
                            <th className="pb-3 text-right">Event Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {analytics.recentClicks.map((clk) => (
                            <tr key={clk.id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3 font-semibold text-[#1E1B4B]">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                                  <span>{clk.label}</span>
                                </div>
                              </td>
                              <td className="py-3 font-mono text-gray-600">
                                <span className="inline-flex items-center gap-1 text-[#25D366]">
                                  <span>{clk.destination || 'WhatsApp (+91 89210 19251)'}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </span>
                              </td>
                              <td className="py-3 font-mono text-gray-500">{clk.pagePath || '/'}</td>
                              <td className="py-3 text-gray-500">{clk.timestamp}</td>
                              <td className="py-3 text-right">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-3xs border border-emerald-200">
                                  Redirected
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-2xl bg-[#F8F7FC] border border-dashed border-gray-200 space-y-2">
                      <MousePointerClick className="w-7 h-7 text-gray-400 mx-auto" />
                      <p className="text-xs font-bold text-[#22213A]/70">No Clicks Recorded Yet</p>
                      <p className="text-3xs text-gray-400 max-w-sm mx-auto">
                        When visitors click any WhatsApp order button, concierge float, or product inquiry on your site, each redirection will appear here in real time.
                      </p>
                    </div>
                  )}
                </div>

                {/* SECTION 2: MANUAL ORDER LOGGING FORM */}
                {showAddOrderForm && (
                  <div className="bg-white rounded-3xl p-6 border border-[#8657F6]/30 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#22213A]">Log Customer Order</h3>
                      <button
                        type="button"
                        onClick={() => setShowAddOrderForm(false)}
                        className="text-gray-400 hover:text-gray-600 text-xs"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-3xs font-bold uppercase text-gray-500">Customer Name *</label>
                        <input
                          type="text"
                          required
                          value={newOrderCustomer}
                          onChange={(e) => setNewOrderCustomer(e.target.value)}
                          placeholder="e.g. Rahul Verma"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-gray-200 focus:outline-none focus:border-[#4F75FF]"
                        />
                      </div>

                      <div>
                        <label className="text-3xs font-bold uppercase text-gray-500">Phone Number *</label>
                        <input
                          type="text"
                          required
                          value={newOrderPhone}
                          onChange={(e) => setNewOrderPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-gray-200 focus:outline-none focus:border-[#4F75FF]"
                        />
                      </div>

                      <div>
                        <label className="text-3xs font-bold uppercase text-gray-500">Kit Bundle</label>
                        <input
                          type="text"
                          value={newOrderBundle}
                          onChange={(e) => setNewOrderBundle(e.target.value)}
                          placeholder="Solo Explorer Kit (₹199)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-gray-200 focus:outline-none focus:border-[#4F75FF]"
                        />
                      </div>

                      <div>
                        <label className="text-3xs font-bold uppercase text-gray-500">Destination / City</label>
                        <input
                          type="text"
                          value={newOrderDestination}
                          onChange={(e) => setNewOrderDestination(e.target.value)}
                          placeholder="e.g. Mumbai, Maharashtra"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-gray-200 focus:outline-none focus:border-[#4F75FF]"
                        />
                      </div>

                      <div>
                        <label className="text-3xs font-bold uppercase text-gray-500">Amount</label>
                        <input
                          type="text"
                          value={newOrderAmount}
                          onChange={(e) => setNewOrderAmount(e.target.value)}
                          placeholder="₹199"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-gray-200 focus:outline-none focus:border-[#4F75FF]"
                        />
                      </div>

                      <div>
                        <label className="text-3xs font-bold uppercase text-gray-500">Order Status</label>
                        <select
                          value={newOrderStatus}
                          onChange={(e) => setNewOrderStatus(e.target.value as OrderItem['status'])}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-gray-200 focus:outline-none focus:border-[#4F75FF]"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddOrderForm(false)}
                        className="px-4 py-2 text-xs text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newOrderCustomer.trim()) {
                            alert('Please enter a customer name.');
                            return;
                          }
                          addOrder({
                            customerName: newOrderCustomer.trim(),
                            phone: newOrderPhone.trim() || 'WhatsApp Customer',
                            bundle: newOrderBundle.trim() || 'Travel Essentials Kit',
                            destination: newOrderDestination.trim() || 'India',
                            amount: newOrderAmount.trim() || '₹199',
                            status: newOrderStatus,
                            source: 'Direct Chat',
                          });
                          setNewOrderCustomer('');
                          setNewOrderPhone('');
                          setNewOrderDestination('');
                          setShowAddOrderForm(false);
                          showNotification('Customer order logged successfully.');
                        }}
                        className="px-5 py-2 text-xs font-bold bg-[#1E1B4B] hover:bg-[#8657F6] text-white rounded-lg transition-all cursor-pointer shadow-sm"
                      >
                        Save Order Record
                      </button>
                    </div>
                  </div>
                )}

                {/* SECTION 3: VERIFIED CUSTOMER ORDERS LIST */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#8657F6]/15 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#22213A]">Customer Orders ({orders.length})</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Log of confirmed orders and WhatsApp inquiries. All dummy mock records have been removed.
                      </p>
                    </div>

                    {orders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Clear all customer orders?')) {
                            clearOrders();
                            showNotification('All orders cleared.');
                          }
                        }}
                        className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
                      >
                        Clear All Orders
                      </button>
                    )}
                  </div>

                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-400 uppercase text-3xs font-bold">
                            <th className="pb-3">Order ID</th>
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Phone</th>
                            <th className="pb-3">Bundle</th>
                            <th className="pb-3">Destination</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {orders.map((ord) => (
                            <tr key={ord.id} className="hover:bg-gray-50">
                              <td className="py-3 font-mono font-bold text-[#8657F6]">{ord.id}</td>
                              <td className="py-3 font-semibold text-[#22213A]">{ord.customerName}</td>
                              <td className="py-3 font-mono text-gray-500">{ord.phone}</td>
                              <td className="py-3 text-gray-600">{ord.bundle}</td>
                              <td className="py-3 text-gray-500">{ord.destination}</td>
                              <td className="py-3 font-bold text-[#1E1B4B]">{ord.amount}</td>
                              <td className="py-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full font-bold text-3xs ${
                                    ord.status === 'Delivered'
                                      ? 'bg-blue-100 text-blue-800'
                                      : ord.status === 'Shipped'
                                      ? 'bg-amber-100 text-amber-800'
                                      : ord.status === 'Confirmed'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {ord.status}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteOrder(ord.id);
                                    showNotification(`Deleted order ${ord.id}`);
                                  }}
                                  className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                  title="Delete order record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-2xl bg-[#F8F7FC] border border-dashed border-gray-200 space-y-2">
                      <ShoppingBag className="w-7 h-7 text-gray-400 mx-auto" />
                      <p className="text-xs font-bold text-[#22213A]/70">No Customer Orders Yet</p>
                      <p className="text-3xs text-gray-400 max-w-sm mx-auto">
                        Dummy sample orders have been purged. When you confirm orders with customers on WhatsApp, click &quot;Log Customer Order&quot; above to record them.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
