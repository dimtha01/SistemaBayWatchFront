import { Header } from "../components/Header/Header";
import { TourPackagesSection } from "../components/TourPackagesSection/TourPackagesSection";
import { HotelActivitiesSection } from "../components/HotelActivitiesSection/HotelActivitiesSection";
import { SpecialEventsSection } from "../components/SpecialEventsSection/SpecialEventsSection";
import { ExperiencesHero } from "@/components/ExperiencesHero/ExperiencesHero";

export const ExperiencesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ExperiencesHero />
      <main className="relative z-10">
        <TourPackagesSection />
        <HotelActivitiesSection />
        <SpecialEventsSection />
      </main>
    </div>
  );
};
