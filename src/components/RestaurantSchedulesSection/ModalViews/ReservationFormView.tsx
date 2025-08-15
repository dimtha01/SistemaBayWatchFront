import React from "react";
import { CalendarDays, Check } from "lucide-react";
import { ReservationSummary } from "../FormComponents/ReservationSummary";
import { PersonalInfoFields } from "../FormComponents/PersonalInfoFields";
import { DateTimeFields } from "../FormComponents/DateTimeFields";
import { SpecialRequestsField } from "../FormComponents/SpecialRequestsField";

interface ReservationFormViewProps {
  selectedOutlet: any;
  selectedSchedule: any;
  formData: any;
  formErrors: any;
  onFormChange: (field: string, value: any) => void;
  onBack: () => void;
  onConfirm: () => void;
}

export const ReservationFormView: React.FC<ReservationFormViewProps> = ({
  selectedOutlet,
  selectedSchedule,
  formData,
  formErrors,
  onFormChange,
  onBack,
  onConfirm
}) => {
  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-[#F20C1F]/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CalendarDays className="w-8 h-8 text-[#F20C1F]" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] mb-2">
          Reservar Mesa
        </h3>
        <p className="text-gray-600 text-sm sm:text-base px-2">
          Completa los datos para confirmar tu reserva en {selectedOutlet.name}
        </p>
      </div>

      <ReservationSummary 
        selectedOutlet={selectedOutlet}
        selectedSchedule={selectedSchedule}
      />

      <div className="space-y-4 mb-6">
        <PersonalInfoFields
          formData={formData}
          formErrors={formErrors}
          onFormChange={onFormChange}
        />
        
        <DateTimeFields
          formData={formData}
          formErrors={formErrors}
          selectedSchedule={selectedSchedule}
          onFormChange={onFormChange}
        />
        
        <SpecialRequestsField
          formData={formData}
          onFormChange={onFormChange}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-2.5 sm:py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 text-sm sm:text-base"
        >
          Volver
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 sm:py-3 px-4 bg-gradient-to-r from-[#F20C1F] to-[#D10000] text-white font-semibold rounded-lg hover:from-[#D10000] hover:to-[#B20000] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Check className="w-4 sm:w-5 h-4 sm:h-5" />
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};
