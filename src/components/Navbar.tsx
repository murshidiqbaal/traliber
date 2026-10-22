'use client';

import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { Menu, MessageCircle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTraliberStore } from '@/context/TraliberStore';

export const Navbar: React.FC = () => {
  const { trackWhatsAppClick } = useTraliberStore();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${isScrolled
        ? 'backdrop-blur-md py-3'
        : 'py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo-mark.webp"
            alt="Traliber Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-bold text-lg sm:text-xl tracking-wider text-[#22213A] group-hover:text-[#4F75FF] transition-colors">
            TRALIBER
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#22213A]">
          <a
            href="/"
            className="hover:text-[#4F75FF] transition-colors"
          >
            Home
          </a>
          <a
            href="/travel-essentials-kit"
            className="hover:text-[#4F75FF] transition-colors"
          >
            The Kit
          </a>
          <a
            href="/#whats-inside"
            className="hover:text-[#4F75FF] transition-colors"
          >
            What&apos;s Inside
          </a>
          <a
            href="/#benefits"
            className="hover:text-[#4F75FF] transition-colors"
          >
            Why Traliber
          </a>
          <a
            href="/#pricing"
            className="hover:text-[#4F75FF] transition-colors"
          >
            Pricing (₹199)
          </a>
          <a
            href="/faq"
            className="hover:text-[#4F75FF] transition-colors"
          >
            FAQ
          </a>
          <a
            href="/about"
            className="hover:text-[#4F75FF] transition-colors"
          >
            About
          </a>
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={WHATSAPP_CONFIG.getLink()}
            onClick={() => trackWhatsAppClick('Navbar WhatsApp CTA (Desktop)')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
            <span>Order on WhatsApp</span>
            <span className="text-sm font-light">→</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#22213A] hover:bg-gray-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#8657F6]/15 px-6 py-6 space-y-4 shadow-xl">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#4F75FF]"
          >
            Home
          </a>
          <a
            href="/travel-essentials-kit"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#4F75FF]"
          >
            The 10-Item Kit
          </a>
          <a
            href="/#whats-inside"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#4F75FF]"
          >
            What&apos;s Inside
          </a>
          <a
            href="/#benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#4F75FF]"
          >
            Why Traliber
          </a>
          <a
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#4F75FF]"
          >
            Pricing (₹199)
          </a>
          <a
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#4F75FF]"
          >
            FAQ
          </a>
          <a
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-bold text-[#22213A] hover:text-[#4F75FF]"
          >
            About
          </a>
          <div className="pt-2">
            <a
              href={WHATSAPP_CONFIG.getLink()}
              onClick={() => {
                trackWhatsAppClick('Navbar WhatsApp CTA (Mobile)');
                setMobileMenuOpen(false);
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#1E1B4B] text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Order on WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
