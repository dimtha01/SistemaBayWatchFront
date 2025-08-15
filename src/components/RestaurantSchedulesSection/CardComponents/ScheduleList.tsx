import React from "react";
import { CalendarDays, Clock } from "lucide-react";

interface ScheduleListProps {
  outlet: any;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ outlet }) => {
  const getAvailabilityStatus = (item: any, outlet: any) => {
    if (!outlet.isOpen) return { status: 'closed', color: 'bg-gray-500', text: 'Cerrado', textColor: 'text-gray-500' };
    if (outlet.maintenanceMode) return { status: 'maintenance', color: 'bg-yellow-500', text: 'Mantenimiento', textColor: 'text-yellow-600' };
    if (!item.available) return { status: 'unavailable', color: 'bg-red-500', text: 'No disponible', textColor: 'text-red-600' };
    if (item.capacity && item.capacity < 20) return { status: 'limited', color: 'bg-orange-500', text: 'Pocas mesas', textColor: 'text-orange-600' };
    return { status: 'available', color: 'bg-green-500', text: 'Disponible', textColor: 'text-green-600' };
  };

  return (
    <div className="mb-6">
      <div className="space-y-2 sm:space-y-3">
        {outlet.schedule.map((item: any, index: number) => {
          const availability = getAvailabilityStatus(item, outlet);

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-2 sm:p-3 rounded-lg transition-colors duration-200 ${
                availability.status === 'available'
                  ? 'bg-gray-50 hover:bg-gray-100'
                  : 'bg-gray-100 opacity-75'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <CalendarDays className={`w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0 ${
                  availability.status === 'available' ? 'text-[#020659]' : 'text-gray-400'
                }`} />
                <span className={`font-medium text-xs sm:text-sm truncate ${
                  availability.status === 'available' ? 'text-[#0D0D0D]' : 'text-gray-500'
                }`}>
                  {item.day}
                </span>

                {/* Availability Indicator - SIN PUNTOS */}
                <span className={`text-xs font-medium ${availability.textColor} ml-2`}>
                  {availability.text}
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Clock className={`w-3 sm:w-4 h-3 sm:h-4 ${
                  availability.status === 'available' ? 'text-[#F20C1F]' : 'text-gray-400'
                }`} />
                <span className={`font-semibold text-xs sm:text-sm ${
                  availability.status === 'available' ? 'text-[#F20C1F]' : 'text-gray-500'
                }`}>
                  {item.time}
                </span>
              </div>

              {/* Reason for unavailability */}
              {!item.available && item.reason && (
                <div className="ml-2 text-xs text-red-600 font-medium hidden lg:block">
                  {item.reason}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
