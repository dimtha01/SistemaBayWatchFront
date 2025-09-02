import { ExclusiveExperiencesSection } from "@/components/ExclusiveExperiencesSection/ExclusiveExperiencesSection";
import { FlashDealsSection } from "@/components/FlashDealsSection/FlashDealsSection";
import { Hero } from "@/components/Hero/Hero";
import { HotelZonesSection } from "@/components/HotelZonesSection/HotelZonesSection";

export const InicioPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HotelZonesSection />
      <FlashDealsSection />
      <ExclusiveExperiencesSection />
    </div>
  );
};
