import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Star,
  Sun,
  Heart,
  Share2,
} from "lucide-react";
import { useState } from "react";

const tourPackagesData = [
  {
    id: "tp1",
    name: "Aventura en la Selva Tropical",
    description:
      "Explora la exuberante selva con guías expertos, avistamiento de fauna y flora.",
    image: "selva tropical.webp",
    duration: "3 días / 2 noches",
    price: 450,
    location: "Reserva Natural Amazonas",
    season: "Todo el año",
    groupSize: "Máx. 12 personas",
    rating: 4.8,
    inclusions: [
      "Alojamiento en eco-lodge",
      "Todas las comidas incluidas",
      "Guías bilingües certificados",
      "Transporte desde el aeropuerto",
      "Equipo de seguridad",
    ],
    highlights: [
      "Caminata por dosel arbóreo",
      "Avistamiento de monos y aves exóticas",
      "Noche de leyendas locales",
      "Baño en cascadas naturales",
    ],
    difficulty: "Moderada",
    bestFor: "Aventureros y amantes de la naturaleza",
  },
  {
    id: "tp2",
    name: "Ruta Cultural por la Ciudad Antigua",
    description:
      "Descubre la historia y los secretos de la ciudad con visitas a museos y sitios históricos.",
    image: "ciudad antigua.webp",
    duration: "1 día completo",
    price: 90,
    location: "Centro Histórico",
    season: "Todo el año",
    groupSize: "Máx. 15 personas",
    rating: 4.9,
    inclusions: [
      "Guía historiador profesional",
      "Entradas a museos",
      "Almuerzo gourmet",
      "Transporte entre sitios",
      "Mapa y material informativo",
    ],
    highlights: [
      "Visita al museo de arte colonial",
      "Recorrido por catedrales centenarias",
      "Degustación de comida tradicional",
      "Sesión fotográfica en lugares icónicos",
    ],
    difficulty: "Fácil",
    bestFor: "Familias y amantes de la historia",
  },
  {
    id: "tp3",
    name: "Escapada Romántica en la Costa",
    description:
      "Disfruta de atardeceres inolvidables, cenas privadas y paseos por la playa.",
    image: "costa.webp",
    duration: "2 días / 1 noche",
    price: 320,
    location: "Playa Esmeralda",
    season: "Noviembre a Abril",
    groupSize: "Parejas",
    rating: 4.7,
    inclusions: [
      "Suite con vista al mar",
      "Cena romántica en la playa",
      "Masaje de bienvenida",
      "Tour en velero al atardecer",
      "Desayuno en la habitación",
    ],
    highlights: [
      "Sesión fotográfica profesional",
      "Clase de mixología para parejas",
      "Cama con decoración especial",
      "Acceso exclusivo a piscina privada",
    ],
    difficulty: "Relajado",
    bestFor: "Parejas y lunamieleros",
  },
];

export const TourPackagesSection = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 bg-[#020659]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-4">
            Paquetes Turísticos
          </h2>
          <p className="text-[#0D0D0D]">
            Explora los destinos más fascinantes con nuestros paquetes todo
            incluido
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackagesData.map((pkg) => (
            <Card
              key={pkg.id}
              className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-0 shadow-md bg-white"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={"/images/" + pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pkg.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        favorites[pkg.id]
                          ? "fill-[#F20C1F] text-[#F20C1F]"
                          : "text-[#0D0D0D]"
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
                  >
                    <Share2 className="w-4 h-4 text-[#0D0D0D]" />
                  </button>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#F2E205] text-[#F2E205]" />
                  <span className="text-sm font-medium text-[#0D0D0D]">
                    {pkg.rating}
                  </span>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-[#0D0D0D] text-xl group-hover:text-[#F20C0C] transition-colors line-clamp-2">
                    {pkg.name}
                  </h3>
                </div>

                <p className="text-sm text-[#0D0D0D] mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <MapPin className="w-4 h-4 text-[#F20C0C]" />
                    <span>{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <Calendar className="w-4 h-4 text-[#F20C0C]" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <Users className="w-4 h-4 text-[#F20C0C]" />
                    <span>{pkg.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <Sun className="w-4 h-4 text-[#F20C0C]" />
                    <span>{pkg.difficulty}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#0D0D0D] text-sm mb-2">
                    Incluye:
                  </h4>
                  <ul className="text-xs text-[#0D0D0D] space-y-1">
                    {pkg.inclusions.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#F20C1F] mr-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-[#F20C1F] flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />${pkg.price} USD
                    </span>
                    <span className="text-xs bg-[#020659]/10 text-[#0D0D0D] px-2 py-1 rounded-full">
                      {pkg.bestFor}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
