import React from "react";
import { User, Phone } from "lucide-react";

interface PersonalInfoFieldsProps {
  formData: any;
  formErrors: any;
  onFormChange: (field: string, value: any) => void;
}

export const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  formData,
  formErrors,
  onFormChange
}) => {
  return (
    <>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
          <User className="w-4 h-4 inline mr-2" />
          Nombre Completo *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onFormChange('name', e.target.value)}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:outline-none focus:border-[#F20C1F] transition-colors duration-300 text-sm sm:text-base ${
            formErrors.name ? 'border-red-500' : 'border-gray-200'
          }`}
          placeholder="Ingresa tu nombre completo"
        />
        {formErrors.name && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-[#0D0D0D] mb-2">
          <Phone className="w-4 h-4 inline mr-2" />
          Número de Teléfono *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onFormChange('phone', e.target.value)}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:outline-none focus:border-[#F20C1F] transition-colors duration-300 text-sm sm:text-base ${
            formErrors.phone ? 'border-red-500' : 'border-gray-200'
          }`}
          placeholder="+1 (555) 123-4567"
        />
        {formErrors.phone && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.phone}</p>
        )}
      </div>
    </>
  );
};
