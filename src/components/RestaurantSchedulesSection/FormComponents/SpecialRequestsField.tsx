import React from "react";

interface SpecialRequestsFieldProps {
  formData: any;
  onFormChange: (field: string, value: any) => void;
}

export const SpecialRequestsField: React.FC<SpecialRequestsFieldProps> = ({
  formData,
  onFormChange
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
        Solicitudes Especiales (Opcional)
      </label>
      <textarea
        value={formData.specialRequests}
        onChange={(e) => onFormChange('specialRequests', e.target.value)}
        rows={3}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#F20C1F] transition-colors duration-300 resize-none text-sm sm:text-base"
        placeholder="Alergias, celebraciones especiales, preferencias de mesa, etc."
      />
    </div>
  );
};
