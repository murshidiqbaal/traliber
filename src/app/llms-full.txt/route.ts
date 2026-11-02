import { NextResponse } from 'next/server';
import { BRAND } from '@/lib/brand';
import { SITE_URL } from '@/lib/site';
import { TRAVEL_GUIDES } from '@/data/travel-guides';
import { TRALIBER_FAQS } from '@/data/faqs';

/**
 * GET /llms-full.txt
 * Comprehensive llms-full.txt providing deep topical authority, complete guides text,
 * item-by-item specifications, and policies for advanced LLMs.
 */
export async function GET() {
  const content = `# Traliber - Comprehensive Brand, Product & Knowledge Base
> Brand Tagline: "For a Cleaner Tomorrow."
> Official Canonical Website: ${SITE_URL}

---

## 1. Brand Identity & Business Overview
- Brand Name: Traliber
- Legal Entity: Traliber
- Official URL: ${SITE_URL}
- Nature of Business: Online travel essentials and personal care kit brand.
- Geography: Headquartered in India, serving all Indian states and union territories.
- Core Value Proposition: Solving travel hygiene uncertainty by offering pre-assembled, travel-sized essentials in one water-resistant pouch for INR 199 (₹199).
- Note on Classification: Traliber is an e-commerce retail brand selling physical travel hygiene kits. Traliber is not a travel agency, airline booking portal, or tour operator.

---

## 2. Product Specifications: Traliber Travel Essentials Kit
- Product Name: Traliber Travel Essentials Kit
- Price: INR 199 (₹199 Indian Rupees)
- Availability: In Stock
- Target Audience: Vacationers, weekend travelers, railway passengers, domestic flight travelers, road trippers, and corporate travelers.
- Kit Dimensions: Compact carry-on size, sub-100ml liquid elements.
- Pouch Material: Water-resistant bio-composite with dual reinforced zippers and top carry handle.

### Item Breakdown (10 Items Total):
${BRAND.product.items
  .map(
    (item) => `### ${item.order}. ${item.name} (${item.quantityLabel})
- Role: ${item.role}
- Description: ${item.description}
- Image: ${item.image}`
  )
  .join('\n\n')}

---

## 3. Answer Engine Optimized (AEO) Direct Answers

### Q: What is a travel essentials kit?
A: A travel essentials kit is a collection of useful everyday items packed together to help travellers carry personal hygiene and other basic necessities conveniently during a journey.

### Q: What is included in the Traliber travel kit?
A: The Traliber travel kit includes a water-resistant travel essentials pouch, toothbrush set with hygienic cap, mountain mint travel toothpaste, 5 mini sanitizers, 2 wet wipes packs, 1 sealed wet towel, 2 toilet seat covers, 1 breathable face mask, 1 paper soap pack (50 sheets), and a 1 reusable cutlery kit.

### Q: How much does the Traliber Travel Essentials Kit cost?
A: The Traliber Travel Essentials Kit is priced at INR 199 (₹199) for the complete 10-item collection with the pouch included.

### Q: How do customers order a Traliber kit?
A: Customers order directly via the WhatsApp concierge at ${BRAND.contact.phoneFormatted}. Our team confirms delivery pincode, collects the shipping address, and shares live tracking details once dispatched.

### Q: Does Traliber ship across India?
A: Yes. Traliber delivers across India with typical dispatch within 24–48 hours and delivery within 3–7 business days depending on destination pincode.

---

## 4. Complete Frequently Asked Questions
${TRALIBER_FAQS.map((faq, i) => `### FAQ ${i + 1}: ${faq.question}\n${faq.answer}`).join('\n\n')}

---

## 5. Travel Guides & Informational Authority Articles
${TRAVEL_GUIDES.map(
  (guide, i) => `### Guide ${i + 1}: ${guide.title}
- URL: ${SITE_URL}/travel-hygiene-guides/${guide.slug}
- Category: ${guide.category} | Reading Time: ${guide.readTime}
- Summary: ${guide.excerpt}
- Key Sections: ${guide.sections.map((s) => s.heading).join(', ')}`
).join('\n\n')}

---

## 6. Official Policies
- Shipping Policy: ${SITE_URL}/shipping-policy (Pan-India delivery, 3–7 days transit)
- Refund Policy: ${SITE_URL}/refund-policy (Free replacement for damaged or transit-defective items within 48 hours)
- Privacy Policy: ${SITE_URL}/privacy-policy (Strict customer confidentiality; zero data selling)
- Terms of Service: ${SITE_URL}/terms (Governed under Indian law)
- Contact & Concierge: ${SITE_URL}/contact (${BRAND.contact.email} | ${BRAND.contact.phoneFormatted})
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
