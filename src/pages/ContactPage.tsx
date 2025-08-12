import { Header } from "../components/Header/Header";
import { ContactHero } from "../components/ContactHero/ContactHero";
import { ContactMainSection } from "../components/ContactMainSection/ContactMainSection"; // Usar el nuevo componente
import { FAQSection } from "../components/FAQSection/FAQSection";

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ContactHero />
      <main className="relative z-10">
        <ContactMainSection /> {/* Aquí se combinan el formulario y el mapa */}
        <FAQSection />
      </main>
    </div>
  );
};
