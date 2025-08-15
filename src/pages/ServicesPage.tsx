import { Header } from "../components/Header/Header";
import { ServicesHero } from "../components/ServicesHero/ServicesHero";
import { CategorizedServicesSection } from "../components/CategorizedServicesSection/CategorizedServicesSection";
import { PremiumServicesSection } from "../components/PremiumServicesSection/PremiumServicesSection";

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ServicesHero />
      <main className="relative z-10">
        <CategorizedServicesSection />
        <PremiumServicesSection />
      </main>
    </div>
  );
};
