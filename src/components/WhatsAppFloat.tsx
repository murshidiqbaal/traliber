'use client';

import React from 'react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { MessageCircle } from 'lucide-react';
import { useTraliberStore } from '@/context/TraliberStore';

export const WhatsAppFloat: React.FC = () => {
  const { trackWhatsAppClick } = useTraliberStore();

  return (
    <aside aria-label="WhatsApp Order Concierge" className="fixed bottom-6 right-6 z-50">
      <a
        href={WHATSAPP_CONFIG.getLink()}
        onClick={() => trackWhatsAppClick('Floating Concierge Button')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order Traliber Kit on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs shadow-2xl shadow-[#25D366]/40 hover:scale-108 active:scale-95 transition-all duration-300 group"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline tracking-wide font-extrabold">
          Order on WhatsApp
        </span>
      </a>
    </aside>
  );
};
