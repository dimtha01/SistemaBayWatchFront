import React from "react";
import { Users, MapPin } from "lucide-react";

interface RestaurantInfoProps {
  outlet: any;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ outlet }) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-[#0D0D0D] text-lg sm:text-xl mb-2 group-hover:text-[#F20C1F] transition-colors duration-300 line-clamp-2 min-h-[3.5rem] sm:min-h-[3.5rem]">
        {outlet.name}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
        {outlet.description}
      </p>

      {/* Quick Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 flex-shrink-0" />
          <span>{outlet.capacity}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{outlet.location}</span>
        </div>
      </div>
    </div>
  );
};
