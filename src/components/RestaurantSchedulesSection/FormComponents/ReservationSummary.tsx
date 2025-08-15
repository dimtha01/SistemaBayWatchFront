import React from "react";

interface ReservationSummaryProps {
  selectedOutlet: any;
  selectedSchedule: any;
}

export const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  selectedOutlet,
  selectedSchedule
}) => {
  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-6">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-gray-600 text-sm">Restaurante:</span>
          <span className="font-semibold text-sm text-right flex-1 ml-2">{selectedOutlet.name}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 text-sm">Servicio:</span>
          <span className="font-semibold text-[#F20C1F] text-sm text-right flex-1 ml-2">
            {selectedSchedule?.day} ({selectedSchedule?.time})
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 text-sm">Ubicación:</span>
          <span className="font-semibold text-sm text-right flex-1 ml-2">{selectedOutlet.location}</span>
        </div>
        {selectedSchedule?.capacity && selectedSchedule.capacity < 20 && (
          <div className="flex justify-between items-start">
            <span className="text-gray-600 text-sm">Estado:</span>
            <span className="font-semibold text-orange-600 text-sm text-right flex-1 ml-2">
              ⚠️ Pocas mesas disponibles
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
