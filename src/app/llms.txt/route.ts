import { NextResponse } from 'next/server';
import { BRAND } from '@/lib/brand';
import { SITE_URL } from '@/lib/site';
import { TRAVEL_GUIDES } from '@/data/travel-guides';
import { TRALIBER_FAQS } from '@/data/faqs';

/**
 * GET /llms.txt
 * Specification-compliant llms.txt providing concise, factual brand identity,
 * product details, navigation links, and guides for LLMs & AI search systems.
 * Specification reference: https://llmstxt.org
 */
export async function GET() {
  const content = `# Traliber
> For a Cleaner Tomorrow.

Traliber is an Indian travel essentials brand offering convenient, pre-packed travel hygiene and personal care kits for trains, flights, road trips, and weekend getaways. Each kit combines ten everyday travel hygiene necessities into one compact, water-resistant pouch.

Traliber is an e-commerce brand selling travel essentials; it does not operate as a travel agency, tour booking company, or flight ticket broker.

- Official Website: ${SITE_URL}
- Operating Region: India (Pan-India delivery)
- Business Model: Direct-to-Consumer e-commerce via WhatsApp Concierge
- Primary Product: Traliber Travel Essentials Kit (INR 199 / ₹199)

## Primary Product: Traliber Travel Essentials Kit

The Traliber Travel Essentials Kit is priced at INR 199 (₹199) and contains ten pre-packed travel items:
1. Travel Essentials Pouch (1 unit): Water-resistant organizer pouch with reinforced dual zippers and carrying handle.
2. Toothbrush Set (1 set): Ergonomic handle with soft micro-bristles and ventilated hygienic travel cap.
3. Travel Toothpaste (1 tube, 10g): Mountain mint flavor in a leak-proof travel squeeze tube.
4. Mini Sanitizer (5 bottles, 15ml each): Pocket spray sanitizer bottles for instant on-the-go hygiene.
5. Wet Wipes (2 packets): Moisture-locked refreshing skin and surface wipes.
6. Wet Towel (1 sachet): Individually sealed refreshing wet towel sachet.
7. Toilet Seat Covers (2 covers): Flushable paper toilet seat covers for transit and public restrooms.
8. Face Mask (1 mask): Breathable 3-layer protective face mask for transit hubs and flights.
9. Paper Soap (1 pack, 50 sheets): Water-soluble paper soap leaves in a compact flip-box.
10. Cutlery Kit (1 reusable set): Fork, spoon, knife, and chopsticks in a travel case.

## Main Website Links
- [Homepage](${SITE_URL}): Overview of the kit, product reveal animation, and brand philosophy.
- [Travel Essentials Kit](${SITE_URL}/travel-essentials-kit): Detailed specifications, item breakdowns, dimensions, and ordering info.
- [About Traliber](${SITE_URL}/about): Brand origin story, mission, and founder information.
- [Frequently Asked Questions](${SITE_URL}/faq): Direct answers to pricing, kit items, carry-on compliance, and India-wide delivery.
- [Contact & Support](${SITE_URL}/contact): Direct WhatsApp Concierge and email customer care.
- [Shipping Policy](${SITE_URL}/shipping-policy): Pan-India dispatch timelines (24-48 hours) and transit times (3-7 days).
- [Refund Policy](${SITE_URL}/refund-policy): Transit damage replacement terms and cancellation guidelines.
- [Privacy Policy](${SITE_URL}/privacy-policy): Customer data handling and confidentiality commitments.
- [Terms & Conditions](${SITE_URL}/terms): General terms of service and store purchasing conditions.

## Travel Hygiene & Packing Guides
${TRAVEL_GUIDES.map((g) => `- [${g.title}](${SITE_URL}/travel-hygiene-guides/${g.slug}): ${g.metaDescription}`).join('\n')}

## Frequently Asked Questions
${TRALIBER_FAQS.slice(0, 6)
  .map((faq) => `### ${faq.question}\n${faq.answer}`)
  .join('\n\n')}

## Ordering & Customer Contact
- WhatsApp Ordering: ${BRAND.contact.phoneFormatted} (${BRAND.contact.whatsappLink})
- Customer Support Email: ${BRAND.contact.email}
- Support Hours: ${BRAND.contact.customerServiceHours}
- Full Documentation: ${SITE_URL}/llms-full.txt
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
