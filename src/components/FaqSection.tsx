'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore } from '@/context/TraliberStore';
import { TRALIBER_FAQS, type FaqItem } from '@/data/faqs';

export { TRALIBER_FAQS, type FaqItem };

interface FaqSectionProps {
  titleAs?: 'h1' | 'h2';
  includeSchema?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  titleAs = 'h2',
  includeSchema = false,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { trackWhatsAppClick } = useTraliberStore();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TRALIBER_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const HeadingTag = titleAs;

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Schema.org FAQPage structured data (injected on dedicated FAQ page) */}
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block mb-3">
            QUESTIONS &amp; ANSWERS
          </span>
          <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.14]">
            Frequently Asked Questions
          </HeadingTag>
          <p className="mt-3.5 text-sm sm:text-base text-[#22213A]/70 leading-relaxed font-normal">
            Everything you need to know about the Traliber Travel Essentials Kit, contents, ordering process, and transit use.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {TRALIBER_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-[#F8F7FC] border-[#4F75FF]/40 shadow-xs'
                    : 'bg-white border-[#22213A]/[0.08] hover:border-[#22213A]/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#1E1B4B]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#4F75FF] text-white rotate-180'
                        : 'bg-[#22213A]/[0.04] text-[#22213A]/60'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#22213A]/75 leading-relaxed font-normal border-t border-[#22213A]/[0.04]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help CTA */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-[#F8F7FC] border border-[#22213A]/[0.08]">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1E1B4B] mb-2">
            Have a question not answered here?
          </h3>
          <p className="text-sm text-[#22213A]/65 max-w-md mx-auto mb-6">
            Our team is available on WhatsApp to assist with product inquiries, bulk orders, and delivery questions.
          </p>
          <a
            href={WHATSAPP_CONFIG.getLink('I have a question about the Travel Essentials Kit')}
            onClick={() => trackWhatsAppClick('FAQ WhatsApp Support CTA')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs shadow hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
