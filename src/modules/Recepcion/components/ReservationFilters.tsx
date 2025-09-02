// src/modules/Reservations/components/ReservationFilters.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { ReservationFilters } from '../types/reservation.types';

interface ReservationFiltersProps {
  filters: ReservationFilters;
  onFiltersChange: (filters: Partial<ReservationFilters>) => void;
}

export const ReservationFiltersComponent: React.FC<ReservationFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  return (
    <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white tracking-light text-[28px] font-bold leading-tight">
            Gestión de Reservas
          </h1>
          <p className="text-gray-400 mt-1">Visualiza y gestiona todas las reservas del hotel</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={filters.status}
            onChange={(e) => onFiltersChange({ status: e.target.value })}
            className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F20C1F]/50 focus:border-transparent text-white"
          >
            <option>Todas las reservas</option>
            <option>Confirmadas</option>
            <option>Pendientes</option>
            <option>Check-in</option>
            <option>Check-out</option>
            <option>Canceladas</option>
          </select>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            value={filters.searchTerm}
            onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
            className="bg-[#0D0D0D]/80 backdrop-blur-sm w-full border border-[#8C0303]/30 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F20C1F]/50 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Buscar por cliente, habitación o número de reserva..."
            type="text"
          />
          <div className="absolute top-0 left-0 inline-flex items-center justify-center h-full w-12 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
        <button className="bg-[#0D0D0D]/80 backdrop-blur-sm px-6 py-3 border border-[#8C0303]/30 rounded-lg text-gray-400 hover:text-white hover:bg-[#8C0303]/20 transition-all duration-200 flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filtros avanzados</span>
        </button>
      </div>
    </div>
  );
};
