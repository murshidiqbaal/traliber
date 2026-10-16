import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { KitRevealSection } from '@/components/KitRevealSection';
import { KitInventoryGrid } from '@/components/KitInventoryGrid';
import { BenefitsSection } from '@/components/BenefitsSection';
import { OrderCtaSection } from '@/components/OrderCtaSection';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#22213A] selection:bg-[#8657F6]/20 selection:text-[#22213A]">
      {/* Sticky Brand Navigation */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* SECTION 1: Existing landing page and hero */}
        <HeroSection />

        {/* SECTION 2: Full-width scroll-driven product unpacking experience */}
        <KitRevealSection />

        {/* SECTION 3: Product contents and item descriptions */}
        <KitInventoryGrid />

        {/* SECTION 4: Product benefits and travel lifestyle content */}
        <BenefitsSection />

        {/* SECTION 5: Final "Order via WhatsApp" call to action */}
        <OrderCtaSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Sticky WhatsApp Concierge Button */}
      <WhatsAppFloat />
    </div>
  );
}
