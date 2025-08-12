import { Header } from "../components/Header/Header";
import { AboutUsHero } from "../components/AboutUsHero/AboutUsHero";
import { HotelHistorySection } from "../components/HotelHistorySection/HotelHistorySection";
import { ServicePhilosophySection } from "../components/ServicePhilosophySection/ServicePhilosophySection";
import { CertificationsSection } from "../components/CertificationsSection/CertificationsSection";

export const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AboutUsHero />
      <main className="relative z-10">
        <HotelHistorySection />
        <ServicePhilosophySection />
        <CertificationsSection />
      </main>
    </div>
  );
};
