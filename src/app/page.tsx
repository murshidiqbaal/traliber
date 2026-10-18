import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { WhatsInsideSection } from '@/components/WhatsInsideSection';
import { KitRevealSection } from '@/components/KitRevealSection';
import { EditorialStorytellingSection } from '@/components/EditorialStorytellingSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FounderSection } from '@/components/FounderSection';
import { OrderCtaSection } from '@/components/OrderCtaSection';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A] selection:bg-[#8657F6]/20 selection:text-[#22213A]">
      {/* Sticky Brand Navigation */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* SECTION 1: Landing Page / Alpine Mountain Hero */}
        <HeroSection />

        {/* SECTION 2: What's Inside — Ten little things. A big difference. */}
        <WhatsInsideSection />

        {/* SECTION 3: Full-width scroll-driven product unpacking animation */}
        <KitRevealSection />

        {/* SECTION 4: Single-Frame Editorial Product Storytelling pinned on scroll */}
        <EditorialStorytellingSection />

        {/* SECTION 4: Product benefits and travel lifestyle content */}
        <BenefitsSection />

        {/* SECTION 5: Traveler reviews & social proof */}
        <TestimonialsSection />

        {/* SECTION 6: Founder story and mission */}
        <FounderSection />

        {/* SECTION 7: Final "Order via WhatsApp" call to action */}
        <OrderCtaSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Sticky WhatsApp Concierge Button */}
      <WhatsAppFloat />
    </div>
  );
}
