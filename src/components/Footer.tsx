'use client';

import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useTraliberStore } from '@/context/TraliberStore';

export const Footer: React.FC = () => {
  const { trackWhatsAppClick } = useTraliberStore();

  return (
    <footer className="bg-[#22213A] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.webp"
                alt="Traliber Logo"
                className="h-10 w-10 rounded-xl object-cover shadow-md"
              />
              <span className="font-bold text-xl tracking-wider text-white">
                TRALIBER
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Traliber redefines personal travel care. Thoughtfully packed essentials designed to eliminate airport friction, liquid leaks, and packing stress for modern wanderers.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={WHATSAPP_CONFIG.getLink()}
                onClick={() => trackWhatsAppClick('Footer Concierge CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white font-bold text-xs shadow hover:opacity-90"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                Chat with Concierge
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#788CF5] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="/travel-essentials-kit" className="hover:text-white transition-colors">
                  Travel Essentials Kit
                </a>
              </li>
              <li>
                <a href="/#whats-inside" className="hover:text-white transition-colors">
                  What&apos;s Inside
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-white transition-colors">
                  Kit Pricing (₹199)
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Traliber
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="/travel-hygiene-guides" className="hover:text-white transition-colors">
                  Travel Hygiene Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Guarantee & Specs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#55C7DE] mb-4">
              Commitment
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#55C7DE]" />
                <span>Compact Carry-On Friendly</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8657F6]" />
                <span>Coordinated Travel Essentials</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                <span>Direct WhatsApp Concierge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Traliber Travel Essentials. All rights reserved.</p>
          {/* <div className="flex items-center gap-4">
            {/* <span className="flex items-center gap-1">
              Engineered with precision for seamless travel
            </span> */}
          <span>•</span>
          {/* <a
              href="/admin"
              className="text-gray-400 hover:text-white transition-colors underline underline-offset-2"
            >
              Content Admin Panel
            </a> */}
          {/* </div> */}
        </div>
      </div>
    </footer>
  );
};
