// src/modules/Reservations/components/ReservationStats.tsx
import React from 'react';
import { BarChart3, CheckCircle, Clock, Users } from 'lucide-react';

interface ReservationStatsProps {
  stats: {
    total: number;
    confirmed: number;
    pending: number;
    checkins: number;
    confirmedPercentage: string;
    pendingPercentage: string;
  };
}

export const ReservationStats: React.FC<ReservationStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {/* Total Reservas */}
      <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#F20C1F]/20 to-[#8C0303]/20 backdrop-blur-sm">
            <BarChart3 className="w-6 h-6 text-[#F20C1F]" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">Total Reservas</p>
            <p className="text-2xl font-bold text-white">{stats.total.toLocaleString()}</p>
            <p className="text-xs text-[#F20C1F] mt-1">+8% este mes</p>
          </div>
        </div>
      </div>

      {/* Confirmadas */}
      <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">Confirmadas</p>
            <p className="text-2xl font-bold text-white">{stats.confirmed}</p>
            <p className="text-xs text-green-400 mt-1">{stats.confirmedPercentage}% del total</p>
          </div>
        </div>
      </div>

      {/* Pendientes */}
      <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm">
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">Pendientes</p>
            <p className="text-2xl font-bold text-white">{stats.pending}</p>
            <p className="text-xs text-yellow-400 mt-1">{stats.pendingPercentage}% del total</p>
          </div>
        </div>
      </div>

      {/* Check-in hoy */}
      <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#F27E7E]/20 to-[#F20C0C]/20 backdrop-blur-sm">
            <Users className="w-6 h-6 text-[#F27E7E]" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">Check-in hoy</p>
            <p className="text-2xl font-bold text-white">{stats.checkins}</p>
            <p className="text-xs text-[#F27E7E] mt-1">Activos</p>
          </div>
        </div>
      </div>
    </div>
  );
};
