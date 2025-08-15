import React from "react";
import { Calendar, Users, Clock } from "lucide-react";

interface DateTimeFieldsProps {
  formData: any;
  formErrors: any;
  selectedSchedule: any;
  onFormChange: (field: string, value: any) => void;
}

export const DateTimeFields: React.FC<DateTimeFieldsProps> = ({
  formData,
  formErrors,
  selectedSchedule,
  onFormChange
}) => {
  const generateTimeSlots = (timeRange: string) => {
    const slots = [];
    const [startTime, endTime] = timeRange.split(' - ');
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
      slots.push(timeString);

      currentMin += 30; // Intervalos de 30 minutos
      if (currentMin >= 60) {
        currentMin = 0;
        currentHour++;
      }
    }

    return slots;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
          <Calendar className="w-4 h-4 inline mr-2" />
          Fecha *
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => onFormChange('date', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:outline-none focus:border-[#F20C1F] transition-colors duration-300 text-sm sm:text-base ${
            formErrors.date ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {formErrors.date && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.date}</p>
        )}
      </div>

      {/* Guests */}
      <div>
        <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
          <Users className="w-4 h-4 inline mr-2" />
          Huéspedes *
        </label>
        <select
          value={formData.guests}
          onChange={(e) => onFormChange('guests', parseInt(e.target.value))}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:outline-none focus:border-[#F20C1F] transition-colors duration-300 text-sm sm:text-base ${
            formErrors.guests ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'persona' : 'personas'}
            </option>
          ))}
        </select>
        {formErrors.guests && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.guests}</p>
        )}
      </div>

      {/* Time Selection - Full Width */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
          <Clock className="w-4 h-4 inline mr-2" />
          Hora Preferida *
        </label>
        <select
          value={formData.time}
          onChange={(e) => onFormChange('time', e.target.value)}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:outline-none focus:border-[#F20C1F] transition-colors duration-300 text-sm sm:text-base ${
            formErrors.time ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <option value="">Selecciona una hora</option>
          {generateTimeSlots(selectedSchedule?.time || "").map(time => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {formErrors.time && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.time}</p>
        )}
      </div>
    </div>
  );
};
