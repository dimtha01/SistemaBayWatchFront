import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ZoneCard } from "../ZoneCard/ZoneCard";

const zonesData = [
  {
    id: "z1",
    name: "Piscina Principal",
    price: 990,
    image: "/images/piscina principal.webp",
    rating: 4.93,
  },
  {
    id: "z2",
    name: "Spa y Bienestar",
    price: 990,
    image: "/images/spa y bienestar.webp",
    rating: 4.93,
  },
  {
    id: "z3",
    name: "Restaurante Gourmet",
    price: 920,
    image: "/images/restaurante gourmet.webp",
    rating: 4.93,
  },
  {
    id: "z4",
    name: "Gimnasio Moderno",
    price: 920,
    image: "/images/gimnasio moderno.webp",
    rating: 4.93,
  },
  {
    id: "z5",
    name: "Salón de Eventos",
    price: 990,
    image: "/images/salon de eventos.webp",
    rating: 4.93,
  },
];

export const HotelZonesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= zonesData.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, zonesData.length - itemsPerView) : prev - 1
    );
  };

  const visibleZones = zonesData.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-4">
            Nuestros Espacios Exclusivos
          </h2>
          <p className="text-lg text-[#0D0D0D] mb-8">
            Descubre las áreas que harán de tu estancia una experiencia inolvidable
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white shadow-lg hover:shadow-xl border-[#F20C1F] text-[#F20C1F] hover:bg-[#F20C1F] hover:text-white transition-all duration-300"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white shadow-lg hover:shadow-xl border-[#F20C1F] text-[#F20C1F] hover:bg-[#F20C1F] hover:text-white transition-all duration-300"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerView >= zonesData.length}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleZones.map((zone) => (
              <ZoneCard
                key={zone.id}
                id={zone.id}
                name={zone.name}
                price={zone.price}
                image={zone.image}
                rating={zone.rating}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {Array.from({ length: Math.ceil(zonesData.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? "bg-[#F20C1F] shadow-md scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};