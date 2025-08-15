import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface SuccessViewProps {
  selectedOutlet: any;
  selectedSchedule: any;
  formData: any;
  onClose: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  selectedOutlet,
  selectedSchedule,
  formData,
  onClose
}) => {
  return (
    <div className="p-6 sm:p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center"
      >
        <Check className="w-8 h-8 text-green-600" />
      </motion.div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] mb-4">
        ¡Reserva Confirmada!
      </h3>

      <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">
        Hola <span className="font-semibold text-[#F20C1F]">{formData.name}</span>,
        tu mesa en {selectedOutlet.name} ha sido reservada exitosamente.
      </p>

      {/* Reservation Details */}
      <div className="bg-green-50 p-4 sm:p-6 rounded-lg mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
          <span className="text-green-700 font-medium text-sm sm:text-base">Fecha:</span>
          <span className="text-green-800 font-bold text-sm sm:text-base">
            {new Date(formData.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
          <span className="text-green-700 font-medium text-sm sm:text-base">Hora:</span>
          <span className="text-green-800 font-bold text-sm sm:text-base">{formData.time}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
          <span className="text-green-700 font-medium text-sm sm:text-base">Huéspedes:</span>
          <span className="text-green-800 font-bold text-sm sm:text-base">
            {formData.guests} {formData.guests === 1 ? 'persona' : 'personas'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
          <span className="text-green-700 font-medium text-sm sm:text-base">Servicio:</span>
          <span className="text-green-800 font-bold text-sm sm:text-base">{selectedSchedule?.day}</span>
        </div>
      </div>

      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mb-6">
        <p className="text-blue-800 font-medium text-xs sm:text-sm">
          📱 Te contactaremos al <span className="font-bold">{formData.phone}</span> para confirmar los detalles
        </p>
        <p className="text-blue-700 text-xs sm:text-sm mt-2">
          Gracias por elegir nuestros servicios gastronómicos
        </p>
      </div>

      {/* Close Button for Success State */}
      <button
        onClick={onClose}
        className="w-full py-3 px-4 bg-gradient-to-r from-[#F20C1F] to-[#D10000] text-white font-semibold rounded-lg hover:from-[#D10000] hover:to-[#B20000] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <Check className="w-5 h-5" />
        Entendido
      </button>
    </div>
  );
};
