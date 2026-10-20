'use client';

import React from 'react';
import { MessageCircle, ShieldCheck, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore } from '@/context/TraliberStore';

export const FounderSection: React.FC = () => {
  const { getCustomText } = useTraliberStore();

  const founderName = getCustomText('founder_name', 'Aldrino Francis');
  const founderTitle = getCustomText('founder_title', 'Founder & Product Architect');
  const founderQuote = getCustomText(
    'founder_quote',
    '“I was tired of leaking bottles in my carry-on. So I reimagined travel personal care.”'
  );
  const founderBio = getCustomText(
    'founder_bio',
    'In 2023, a ruptured toothpaste tube under cabin pressure ruined my carry-on and sparked a simple question: Why are travelers still wrestling with messy plastic bottles, liquid quotas, and leaky toiletries?\n\nThat frustration led to Traliber. We engineered a solid-state travel personal care kit — replacing messy liquids with chewable mint tablets, dissolvable botanical paper soap sheets, and compressed towels in one water-resistant pouch. Zero spills. Zero checkpoint delays.'
  );

  const paragraphs = founderBio.split('\n\n').filter(Boolean);

  const whatsappHref = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(
    "Hi Traliber, I'd like to know more about your story and travel essentials kit."
  )}`;

  // Formatter for highlighting a phrase in the founder quote with restrained violet-to-cyan gradient
  const renderFormattedQuote = (quote: string) => {
    const targetPhrase = 'So I reimagined travel personal care';
    if (quote.includes(targetPhrase)) {
      const parts = quote.split(targetPhrase);
      return (
        <>
          {parts[0]}
          <span className="bg-gradient-to-r from-[#8657F6] to-[#55C7DE] bg-clip-text text-transparent">
            {targetPhrase}
          </span>
          {parts[1]}
        </>
      );
    }
    return quote;
  };

  return (
    <section id="founder" className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* MOBILE LAYOUT (Dedicated mobile-first editorial composition)   */}
        {/* ============================================================== */}
        <div className="block lg:hidden space-y-7 text-left">
          {/* A. Compact story label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-[0.18em] text-[#4F75FF] bg-[#4F75FF]/[0.07] px-3 py-1 rounded-full border border-[#4F75FF]/15">
              <Compass className="w-3 h-3 text-[#4F75FF]" />
              THE STORY BEHIND TRALIBER
            </span>
          </motion.div>

          {/* B. Founder portrait */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <div className="w-full rounded-[22px] overflow-hidden border border-[#22213A]/[0.08] shadow-[0_8px_24px_rgba(30,27,75,0.04)] bg-[#F8F7FC] aspect-[4/5] relative">
              <img
                src="/images/founder.jpg"
                alt={`${founderName} - ${founderTitle}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* C. Founder identity caption */}
            <div className="mt-3 px-1 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8657F6] block">
                  {founderTitle}
                </span>
                <h3 className="text-base font-bold text-[#1E1B4B] tracking-tight mt-0.5">
                  {founderName}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#22213A]/45">Traliber</span>
            </div>
          </motion.div>

          {/* D. Main founder quote */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <h2 className="text-[26px] sm:text-3xl font-serif font-bold text-[#1E1B4B] tracking-tight leading-[1.18]">
              {renderFormattedQuote(founderQuote)}
            </h2>
          </motion.div>

          {/* E. Short origin story */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="space-y-3.5 text-[15px] sm:text-base text-[#22213A]/75 leading-[1.62] font-normal"
          >
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>

          {/* F. One credibility highlight */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F8F7FC] border border-[#22213A]/[0.06]"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-[#22213A]/[0.08] flex items-center justify-center text-[#4F75FF] shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#4F75FF]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1E1B4B] tracking-tight">
                Designed for Travel Convenience
              </h4>
              <p className="text-[11px] text-[#22213A]/60 leading-tight mt-0.5">
                Solid-state personal care · 100% TSA compliant · Leak-free peace of mind
              </p>
            </div>
          </motion.div>

          {/* G. Founder signature */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pt-2 border-t border-[#22213A]/[0.06]"
          >
            <p className="font-serif italic text-lg text-[#1E1B4B] font-semibold">
              {founderName}
            </p>
            <p className="text-xs text-[#22213A]/50 mt-0.5">
              {founderTitle}, Traliber
            </p>
          </motion.div>

          {/* H. WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="pt-1 space-y-2"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] px-6 py-3.5 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] active:scale-[0.99] text-white text-xs font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat with the Founder</span>
            </a>
            <p className="text-center text-[11px] text-[#22213A]/50">
              Questions about Traliber? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>


        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (Clean, balanced 2-column editorial arrangement)*/}
        {/* ============================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait & Credibility Highlight */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="rounded-3xl overflow-hidden border border-[#22213A]/[0.08] shadow-[0_8px_30px_rgba(30,27,75,0.04)] bg-[#F8F7FC] aspect-[4/5] relative">
              <img
                src="/images/founder.jpg"
                alt={`${founderName} - ${founderTitle}`}
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            <div className="px-1 flex items-baseline justify-between text-left">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8657F6] block">
                  {founderTitle}
                </span>
                <span className="text-sm font-semibold text-[#1E1B4B]">{founderName}</span>
              </div>
              <span className="text-[11px] font-mono text-[#22213A]/45">Traliber</span>
            </div>

            {/* Desktop Credibility Highlight */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F8F7FC] border border-[#22213A]/[0.06] text-left">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#22213A]/[0.08] flex items-center justify-center text-[#4F75FF] shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#4F75FF]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E1B4B] tracking-tight">
                  Designed for Travel Convenience
                </h4>
                <p className="text-[11px] text-[#22213A]/60 leading-tight mt-0.5">
                  Solid-state personal care · 100% TSA compliant
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Quote & Sign-off */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] bg-[#4F75FF]/[0.07] px-3.5 py-1 rounded-full border border-[#4F75FF]/15 block w-fit mb-3.5">
                <Compass className="w-3 h-3 text-[#4F75FF]" />
                THE STORY BEHIND TRALIBER
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1B4B] tracking-tight leading-[1.2]">
                {renderFormattedQuote(founderQuote)}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-[15px] text-[#22213A]/70 leading-relaxed font-normal">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Signature & WhatsApp CTA */}
            <div className="pt-6 border-t border-[#22213A]/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif italic text-base sm:text-lg text-[#1E1B4B] font-semibold">
                  {founderName}
                </p>
                <p className="text-xs text-[#22213A]/50">
                  {founderTitle}, Traliber Personal Care
                </p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Chat with the Founder</span>
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
