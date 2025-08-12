import {
  Wifi,
  Tv,
  Coffee,
  Snowflake,
  Bath,
  ConciergeBell,
  Utensils,
  Lock,
  Phone,
} from "lucide-react";

const amenitiesData = [
  { icon: Wifi, text: "Wi-Fi de alta velocidad" },
  { icon: Tv, text: "Smart TV con cable" },
  { icon: Coffee, text: "Cafetera y tetera" },
  { icon: Snowflake, text: "Aire acondicionado" },
  { icon: Bath, text: "Jacuzzi privado" },
  { icon: ConciergeBell, text: "Servicio 24h" },
  { icon: Utensils, text: "Minibar surtido" },
  { icon: Lock, text: "Caja fuerte" },
  { icon: Phone, text: "Teléfono" },
];

export const RoomAmenities = () => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Comodidades
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 text-gray-700">
        {amenitiesData.map((amenity, index) => {
          const Icon = amenity.icon;
          return (
            <div key={index} className="flex items-center text-sm md:text-base">
              <Icon className="mr-2 md:mr-3 text-orange-500 h-4 md:h-5 w-4 md:w-5 flex-shrink-0" />
              {amenity.text}
            </div>
          );
        })}
      </div>
    </>
  );
};
