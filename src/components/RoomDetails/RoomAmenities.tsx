import { DynamicIcon } from "../DynamicIcon";
import type { IconName } from "../../utils/iconMap";

interface Amenity {
  icon: IconName;
  text: string;
}

const amenitiesData: Amenity[] = [
  { icon: "Dumbbell", text: "Gimnasio" },
  { icon: "Bike", text: "Bicicletas disponibles" },
  { icon: "Waves", text: "Piscina" },
  { icon: "TreePine", text: "Jardín privado" },
  { icon: "Sunrise", text: "Terraza soleada" },
  { icon: "Moon", text: "Zona de relajación" },
  { icon: "Activity", text: "Monitor de actividad" },
  { icon: "Heart", text: "Zona wellness" },
  { icon: "Footprints", text: "Senderos para caminar" },
];

export const RoomAmenities = () => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Comodidades
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 text-gray-700">
        {amenitiesData.map((amenity, index) => {
          return (
            <div key={index} className="flex items-center text-sm md:text-base">
              <DynamicIcon
                name={amenity.icon}
                className="mr-2 md:mr-3 text-orange-500 h-4 md:h-5 w-4 md:w-5 flex-shrink-0"
              />
              {amenity.text}
            </div>
          );
        })}
      </div>
    </>
  );
};
