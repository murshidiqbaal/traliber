'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore } from '@/context/TraliberStore';

export interface FaqItem {
  question: string;
  answer: string;
}

export const TRALIBER_FAQS: FaqItem[] = [
  {
    question: 'What is included in the Traliber Travel Essentials Kit?',
    answer:
      'The Traliber Travel Essentials Kit brings together 10 personal care and hygiene essentials in one water-resistant organizer pouch. It includes: 1 Travel Essentials Pouch, 1 Toothbrush Set with ventilated cap, 1 tube of Mountain Mint Travel Toothpaste (10g), 5 individual Mini Sanitizer spray bottles (15ml each), 2 packets of moisture-locked Wet Wipes, 1 sealed Wet Towel sachet, 2 flushable Toilet Seat Covers, 1 breathable Face Mask, 1 flip-box pack of Paper Soap (50 sheets), and 1 reusable Cutlery Kit (fork, spoon, knife, chopsticks, and napkin in case).',
  },
  {
    question: 'How many total items are included in the kit?',
    answer:
      'The kit contains 10 distinct travel essentials plus the central organizer pouch, giving you a coordinated collection of items designed specifically for personal hygiene, oral care, and dining convenience while travelling.',
  },
  {
    question: 'What is the Traliber travel pouch used for?',
    answer:
      'The Traliber pouch is a water-resistant travel organizer featuring dual zippers, a carry handle, and signature mountain blue aesthetics. It is designed to house all 10 kit items securely so that your personal care essentials remain organized in one place rather than scattered throughout your backpack or luggage.',
  },
  {
    question: 'How can I order the Traliber Travel Essentials Kit?',
    answer:
      'Traliber uses a direct WhatsApp enquiry and ordering model. Click any "Order on WhatsApp" button on the website to open a direct conversation with our team. We will confirm your delivery address, provide order details, and share dispatch tracking directly in chat.',
  },
  {
    question: 'What is the price of the Traliber Travel Essentials Kit?',
    answer:
      'The Traliber Travel Essentials Kit is priced at ₹199 for the complete 10-item collection including the water-resistant travel pouch. You can confirm current pricing and available bundle offers by messaging us on WhatsApp.',
  },
  {
    question: 'Does Traliber offer delivery across India?',
    answer:
      'We serve travelers across India. When you message our WhatsApp concierge with your delivery pincode or city, our team will confirm local delivery timelines and shipping coverage before your order is dispatched.',
  },
  {
    question: 'Can I place a corporate or bulk travel kit order?',
    answer:
      'Yes, we welcome inquiries for corporate gifting, tour operators, student travel groups, and event welcome kits. Contact our team via WhatsApp to discuss quantities, lead times, and tailored requirements.',
  },
  {
    question: 'Are the kit items compliant with airline carry-on liquid regulations?',
    answer:
      'Yes. The personal care items in the kit are compact and sub-100ml (including the 10g toothpaste tube and 15ml pocket sanitizer bottles), fitting standard personal carry-on requirements without taking up excessive liquid allowance.',
  },
  {
    question: 'What is the difference between a general toiletry bag and a travel hygiene kit?',
    answer:
      'A traditional toiletry bag is usually an empty pouch that requires you to buy, decant, and pack your own full-size liquids. The Traliber travel hygiene kit comes pre-curated with 10 specific hygiene, oral care, and sanitization items tailored for transit days, train journeys, and short stays.',
  },
];

export const FaqSection: React.FC = () => {
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

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Schema.org FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#4F75FF] block mb-3">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#1E1B4B] tracking-tight leading-[1.14]">
            Frequently Asked Questions
          </h2>
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
                className="bg-[#F8F7FC] rounded-2xl border border-[#22213A]/[0.08] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-[#1E1B4B] text-base sm:text-lg cursor-pointer hover:text-[#4F75FF] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#4F75FF] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#22213A]/80 leading-relaxed font-normal border-t border-[#22213A]/[0.05]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have More Questions CTA */}
        <div className="mt-12 text-center p-8 bg-[#F4F3FA] rounded-3xl border border-[#22213A]/[0.08] space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F75FF] flex items-center justify-center mx-auto">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#1E1B4B]">
            Have a question about delivery, bulk orders, or kit details?
          </h3>
          <p className="text-xs sm:text-sm text-[#22213A]/70 max-w-md mx-auto">
            Our team is available on WhatsApp to answer questions, share delivery timelines, or process custom enquiries.
          </p>
          <div className="pt-2">
            <a
              href={WHATSAPP_CONFIG.getLink("I have a question about the Traliber Travel Essentials Kit.")}
              onClick={() => trackWhatsAppClick('FAQ Help CTA')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Ask Us on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
