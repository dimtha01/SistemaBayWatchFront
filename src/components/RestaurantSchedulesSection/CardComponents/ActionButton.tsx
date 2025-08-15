import React from "react";
import { ChefHat, Wine, Coffee, Utensils } from "lucide-react";

interface ActionButtonProps {
  outlet: any;
  isAvailable: boolean;
  onSelect: (outlet: any) => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  outlet,
  isAvailable,
  onSelect
}) => {
  const getIconByType = (type: string) => {
    switch (type) {
      case 'restaurant': return <ChefHat className="w-6 h-6" />;
      case 'bar': return <Wine className="w-6 h-6" />;
      case 'cafe': return <Coffee className="w-6 h-6" />;
      default: return <Utensils className="w-6 h-6" />;
    }
  };

  return (
    <div className="mt-auto">
      <button
        onClick={() => {
          if (isAvailable) {
            onSelect(outlet);
          }
        }}
        disabled={!isAvailable}
        className={`w-full font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
          isAvailable
            ? 'bg-gradient-to-r from-[#F20C1F] to-[#D10000] hover:from-[#D10000] hover:to-[#B20000] text-white transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {getIconByType(outlet.type)}
        <span>
          {isAvailable ? 'Planificar Visita' : 'No Disponible'}
        </span>
      </button>
    </div>
  );
};
