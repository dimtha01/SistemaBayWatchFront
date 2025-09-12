import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  DollarSign,
  Waves,
  Umbrella,
  Star,
  Heart,
  Share2,
  Thermometer,
} from "lucide-react";
import { useState } from "react";

const beachesData = [
  {
    id: "b1",
    name: "Playa Paraíso Tropical",
    description:
      "Arena blanca y fina con aguas cristalinas color turquesa, perfecta para relajarse.",
    image: "selva tropical.webp",
    waterTemp: "26°C - 28°C",
    entryFee: 15,
    location: "Costa Caribe",
    season: "Todo el año",
    facilities: "Completas",
    rating: 4.9,
    activities: [
      "Snorkel en arrecife de coral",
      "Kayak y paddleboard",
      "Voleibol playero",
      "Masajes en la playa",
      "Bar flotante",
    ],
    amenities: [
      "Restaurante frente al mar",
      "Sombrillas y camastros",
      "Duchas y vestuarios",
      "Salvavidas certificados",
    ],
    waterType: "Cristalina",
    bestFor: "Familias y relajación",
  },
  {
    id: "b2",
    name: "Bahía Esmeralda Salvaje",
    description:
      "Playa virgen rodeada de acantilados y vegetación tropical, ideal para aventureros.",
    image: "ciudad antigua.webp",
    waterTemp: "24°C - 26°C",
    entryFee: 8,
    location: "Costa Pacífica",
    season: "Abril a Octubre",
    facilities: "Básicas",
    rating: 4.7,
    activities: [
      "Surf para principiantes",
      "Senderismo costero",
      "Pesca deportiva",
      "Observación de ballenas",
      "Fotografía de naturaleza",
    ],
    amenities: [
      "Área de camping",
      "Senderos ecológicos",
      "Mirador panorámico",
      "Guías locales disponibles",
    ],
    waterType: "Oleaje moderado",
    bestFor: "Aventureros y surfistas",
  },
  {
    id: "b3",
    name: "Cala Romántica Secreta",
    description:
      "Pequeña cala privada con atardeceres espectaculares y ambiente íntimo.",
    image: "costa.webp",
    waterTemp: "25°C - 27°C",
    entryFee: 25,
    location: "Bahía Privada",
    season: "Noviembre a Abril",
    facilities: "Premium",
    rating: 4.8,
    activities: [
      "Cena romántica en la playa",
      "Paseos en velero privado",
      "Spa con vista al mar",
      "Clase de mixología",
      "Sesión fotográfica profesional",
    ],
    amenities: [
      "Servicio de mayordomo",
      "Cabañas privadas",
      "Restaurante gourmet",
      "Transporte exclusivo",
    ],
    waterType: "Aguas tranquilas",
    bestFor: "Parejas y lunamieleros",
  },
];

export const BeachesSection = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 bg-[#020659]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0D0D0D] mb-4">
            Playas Paradisíacas
          </h2>
          <p className="text-[#0D0D0D]">
            Descubre las playas más hermosas con aguas cristalinas y arenas doradas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beachesData.map((beach) => (
            <Card
              key={beach.id}
              className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-0 shadow-md bg-white"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={"/images/" + beach.image}
                  alt={beach.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(beach.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        favorites[beach.id]
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
                    {beach.rating}
                  </span>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-[#0D0D0D] text-xl group-hover:text-[#F20C0C] transition-colors line-clamp-2">
                    {beach.name}
                  </h3>
                </div>

                <p className="text-sm text-[#0D0D0D] mb-4 line-clamp-2">
                  {beach.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <MapPin className="w-4 h-4 text-[#F20C0C]" />
                    <span>{beach.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <Thermometer className="w-4 h-4 text-[#F20C0C]" />
                    <span>{beach.waterTemp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <Umbrella className="w-4 h-4 text-[#F20C0C]" />
                    <span>{beach.facilities}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0D0D0D]">
                    <Waves className="w-4 h-4 text-[#F20C0C]" />
                    <span>{beach.waterType}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#0D0D0D] text-sm mb-2">
                    Actividades:
                  </h4>
                  <ul className="text-xs text-[#0D0D0D] space-y-1">
                    {beach.activities.slice(0, 3).map((activity, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#F20C1F] mr-1">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-[#F20C1F] flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />${beach.entryFee} USD
                    </span>
                    <span className="text-xs bg-[#020659]/10 text-[#0D0D0D] px-2 py-1 rounded-full">
                      {beach.bestFor}
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
