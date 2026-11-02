'use client';

import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
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
                alt="Traliber Travel Essentials Kit Logo"
                className="h-10 w-10 rounded-xl object-cover shadow-md"
                width={40}
                height={40}
              />
              <span className="font-bold text-xl tracking-wider text-white">
                TRALIBER
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Traliber provides thoughtfully curated travel essentials and personal care kits for modern wanderers. For a cleaner, safer, and more comfortable tomorrow.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={WHATSAPP_CONFIG.getLink()}
                onClick={() => trackWhatsAppClick('Footer Concierge CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white font-bold text-xs shadow hover:opacity-90 transition-opacity"
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
                <Link href="/travel-essentials-kit" className="hover:text-white transition-colors">
                  Travel Essentials Kit
                </Link>
              </li>
              <li>
                <Link href="/#whats-inside" className="hover:text-white transition-colors">
                  What&apos;s Inside
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Kit Pricing (₹199)
                </Link>
              </li>
              <li>
                <Link href="/travel-hygiene-guides" className="hover:text-white transition-colors">
                  Travel Hygiene Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Traliber
                </Link>
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
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Fast India-Wide Dispatch</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 Traliber. For a Cleaner Tomorrow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              Brand Story
            </Link>
            <span>•</span>
            <Link href="/travel-hygiene-guides" className="hover:text-gray-300 transition-colors">
              Hygiene Guides
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
