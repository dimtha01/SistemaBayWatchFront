// src/modules/Rooms/components/SearchAndFilters.tsx
import React from 'react';
import { Search } from 'lucide-react';
import type { RoomStatus } from '../types/room.types';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentFilter: RoomStatus;
  onFilterChange: (filter: RoomStatus) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  currentFilter,
  onFilterChange
}) => {
  const filters: { label: string; value: RoomStatus }[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Disponibles', value: 'Disponible' },
    { label: 'Ocupadas', value: 'Ocupada' },
    { label: 'Mantenimiento', value: 'Mantenimiento' }
  ];

  return (
    <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar habitaciones por nombre, tipo o estado..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#8C0303]/20 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-[#F20C1F]/50 focus:ring-2 focus:ring-[#F20C1F]/20 transition-all"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentFilter === filter.value
                  ? 'bg-[#F20C1F]/50 text-white border border-[#F20C1F]/50'
                  : 'bg-[#8C0303]/20 text-gray-300 hover:bg-[#8C0303]/30 border border-[#8C0303]/30'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
