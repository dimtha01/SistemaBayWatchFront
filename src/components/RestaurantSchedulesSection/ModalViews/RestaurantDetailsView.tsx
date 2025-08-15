import React from "react";
import { Star, Users, MapPin, CalendarDays, Clock, AlertCircle, Wrench } from "lucide-react";

interface RestaurantDetailsViewProps {
  selectedOutlet: any;
  onReservation: (outlet: any, schedule: any) => void;
}

export const RestaurantDetailsView: React.FC<RestaurantDetailsViewProps> = ({
  selectedOutlet,
  onReservation
}) => {
  // Definir la función aquí también
  const getAvailableSchedules = (outlet: any) => {
    return outlet.schedule.filter((item: any) => item.available && outlet.isOpen && !outlet.maintenanceMode);
  };

  return (
    <div>
      {/* Modal Header */}
      <div className="relative p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row items-start gap-4 pr-12">
          <div className="bg-[#F20C1F]/10 p-3 rounded-full flex-shrink-0">
            {selectedOutlet.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] mb-2">
              {selectedOutlet.name}
            </h3>
            <p className="text-gray-600 mb-3 text-sm sm:text-base">
              {selectedOutlet.fullDescription}
            </p>

            {/* Rating and Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-bold">{selectedOutlet.rating}</span>
                <span className="text-gray-500">Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{selectedOutlet.capacity}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="truncate">{selectedOutlet.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Content */}
      <div className="p-4 sm:p-6">
        {/* Specialties */}
        <div className="mb-6">
          <h4 className="font-bold text-[#0D0D0D] mb-3 text-base sm:text-lg">Especialidades</h4>
          <div className="flex flex-wrap gap-2">
            {selectedOutlet.specialties.map((specialty: string, index: number) => (
              <span
                key={index}
                className="bg-[#F20C1F]/10 text-[#F20C1F] px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Schedule Selection - Only Available */}
        <div className="mb-6">
          <h4 className="font-bold text-[#0D0D0D] mb-4 text-base sm:text-lg">Selecciona tu horario preferido</h4>

          {getAvailableSchedules(selectedOutlet).length > 0 ? (
            <div className="space-y-3">
              {getAvailableSchedules(selectedOutlet).map((item: any, index: number) => (
                <button
                  key={index}
                  onClick={() => onReservation(selectedOutlet, item)}
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 hover:border-[#F20C1F] rounded-lg transition-all duration-300 hover:bg-[#F20C1F]/5 group text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <CalendarDays className="w-4 sm:w-5 h-4 sm:h-5 text-[#020659] group-hover:text-[#F20C1F] transition-colors duration-300 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-[#0D0D0D] group-hover:text-[#F20C1F] transition-colors duration-300 text-sm sm:text-base">
                          {item.day}
                        </div>
                        <div className="text-xs sm:text-sm text-green-600 font-medium">
                          ✅ Disponible para reserva
                          {item.capacity && item.capacity < 20 && (
                            <span className="text-orange-600 ml-2">• Pocas mesas disponibles</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[#F20C1F]" />
                      <span className="font-bold text-[#F20C1F] text-sm sm:text-base">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h4 className="font-bold text-red-800 mb-2">Sin Disponibilidad</h4>
                <p className="text-red-600 text-sm mb-3">
                  {!selectedOutlet.isOpen
                    ? 'Este restaurante está temporalmente cerrado'
                    : selectedOutlet.maintenanceMode
                      ? 'En mantenimiento programado'
                      : 'No hay horarios disponibles en este momento'
                  }
                </p>
                {selectedOutlet.maintenanceMode && (
                  <div className="flex items-center justify-center gap-2 text-yellow-600 text-sm">
                    <Wrench className="w-4 h-4" />
                    <span>Volveremos pronto con mejoras</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
