import type { IconName } from "../../utils/iconMap";
import { DynamicIcon } from "../DynamicIcon/DynamicIcon";

interface Amenity {
  icon: IconName;
  name: string;
}

interface RoomAmenitiesProps {
  amenitiesData: Amenity[];
}

export const RoomAmenities = ({ amenitiesData }: RoomAmenitiesProps) => {
  if (!amenitiesData || amenitiesData.length === 0) {
    return (
      <>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Comodidades
        </h2>
        <div className="text-gray-500 text-sm md:text-base">
          Cargando comodidades...
        </div>
      </>
    );
  }

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
              {amenity.name}
            </div>
          );
        })}
      </div>
    </>
  );
};
