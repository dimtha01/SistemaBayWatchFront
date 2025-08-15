import React from "react";
import { Star, AlertCircle, Wrench } from "lucide-react";

interface RestaurantImageProps {
  outlet: any;
  isAvailable: boolean;
}

export const RestaurantImage: React.FC<RestaurantImageProps> = ({
  outlet,
  isAvailable
}) => {
  return (
    <div className="relative flex-shrink-0">
      <div className="h-40 sm:h-48 relative overflow-hidden">
        <img
          src={outlet.image}
          alt={outlet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Status Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          {!outlet.isOpen ? (
            <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Cerrado
            </span>
          ) : outlet.maintenanceMode ? (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Wrench className="w-3 h-3" />
              Mantenimiento
            </span>
          ) : isAvailable ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Disponible
            </span>
          ) : (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Completo
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 fill-current" />
          <span className="text-xs sm:text-sm font-bold text-[#0D0D0D]">{outlet.rating}</span>
        </div>
      </div>
    </div>
  );
};
