'use client';

import React, { useState, useEffect } from 'react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { MessageCircle, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#8657F6]/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/images/traliber-logo.svg"
            alt="Traliber Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#22213A]">
          <a
            href="#kit-reveal"
            className="hover:text-[#8657F6] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8657F6]" />
            Unpacking Reveal
          </a>
          <a
            href="#kit-inventory"
            className="hover:text-[#8657F6] transition-colors"
          >
            10 Essentials
          </a>
          <a
            href="#benefits"
            className="hover:text-[#8657F6] transition-colors"
          >
            Why Traliber
          </a>
          <a
            href="#order-section"
            className="hover:text-[#8657F6] transition-colors"
          >
            Order
          </a>
        </nav>

        {/* Header CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={WHATSAPP_CONFIG.getLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-bold shadow-md shadow-[#25D366]/20 hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Order on WhatsApp
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#22213A] hover:bg-gray-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#8657F6]/15 px-6 py-6 space-y-4 shadow-xl">
          <a
            href="#kit-reveal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#8657F6]"
          >
            Unpacking Reveal (Interactive)
          </a>
          <a
            href="#kit-inventory"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#8657F6]"
          >
            10 Product Essentials
          </a>
          <a
            href="#benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#8657F6]"
          >
            Travel Lifestyle Benefits
          </a>
          <a
            href="#order-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#8657F6]"
          >
            Order Pricing
          </a>
          <div className="pt-2">
            <a
              href={WHATSAPP_CONFIG.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
