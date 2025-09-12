import { BeachesSection } from "../components/TourPackagesSection/TourPackagesSection";
import { HotelActivitiesSection } from "../components/HotelActivitiesSection/HotelActivitiesSection";
import { SpecialEventsSection } from "../components/SpecialEventsSection/SpecialEventsSection";
import { ExperiencesHero } from "@/components/ExperiencesHero/ExperiencesHero";

export const ExperiencesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ExperiencesHero />
      <main className="relative z-10">
        <BeachesSection />
        <HotelActivitiesSection />
        <SpecialEventsSection />
      </main>
    </div>
  );
};
