import { GastronomyHero } from "../components/GastronomyHero/GastronomyHero";
import { RestaurantSchedulesSection } from "../components/RestaurantSchedulesSection/RestaurantSchedulesSection";
import { CulinaryExperiencesSection } from "../components/CulinaryExperiencesSection/CulinaryExperiencesSection";
import { RestaurantMenusSection } from "@/components/RestaurantMenusSection/RestaurantMenusSection";

export const GastronomyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GastronomyHero />
      <main className="relative z-10">
        <RestaurantMenusSection />
        <RestaurantSchedulesSection />
        <CulinaryExperiencesSection />
      </main>
    </div>
  );
};
