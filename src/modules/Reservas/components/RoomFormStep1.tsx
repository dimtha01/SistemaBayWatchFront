// src/modules/Rooms/components/RoomFormStep1.tsx
import React from 'react';
import type { Room } from '../types/room.types';

interface RoomFormStep1Props {
  formData: Partial<Room>;
  onChange: (field: keyof Room, value: any) => void;
}

export const RoomFormStep1: React.FC<RoomFormStep1Props> = ({ formData, onChange }) => {
  const roomTypes = ['Individual', 'Doble', 'Suite', 'Familiar', 'Presidencial'] as const;
  const statusOptions = ['Disponible', 'Ocupada', 'Mantenimiento', 'Fuera de servicio'] as const;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-2">Información Básica</h3>
        <p className="text-gray-400 text-sm">Completa los datos principales de la habitación</p>
      </div>
      
      {/* Room Name */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Nombre de la habitación *
        </label>
        <input
          type="text"
          placeholder="ej. Suite Presidencial 101"
          value={formData.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full h-12 px-4 bg-[#8C0303]/20 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-[#F20C1F]/50 focus:ring-2 focus:ring-[#F20C1F]/20 transition-all"
        />
      </div>

      {/* Room Type */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Tipo de habitación *
        </label>
        <select
          value={formData.type || 'Individual'}
          onChange={(e) => onChange('type', e.target.value)}
          className="w-full h-12 px-4 bg-[#8C0303]/20 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg text-white focus:outline-none focus:border-[#F20C1F]/50 focus:ring-2 focus:ring-[#F20C1F]/20 transition-all"
        >
          {roomTypes.map(type => (
            <option key={type} value={type} className="bg-[#0D0D0D]">{type}</option>
          ))}
        </select>
      </div>

      {/* Capacity and Price */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Capacidad *
          </label>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="2"
            value={formData.capacity || ''}
            onChange={(e) => onChange('capacity', parseInt(e.target.value) || 0)}
            className="w-full h-12 px-4 bg-[#8C0303]/20 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-[#F20C1F]/50 focus:ring-2 focus:ring-[#F20C1F]/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-3">
            Precio por noche *
          </label>
          <input
            type="text"
            placeholder="$150"
            value={formData.price || ''}
            onChange={(e) => onChange('price', e.target.value)}
            className="w-full h-12 px-4 bg-[#8C0303]/20 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-[#F20C1F]/50 focus:ring-2 focus:ring-[#F20C1F]/20 transition-all"
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Estado
        </label>
        <select
          value={formData.status || 'Disponible'}
          onChange={(e) => onChange('status', e.target.value)}
          className="w-full h-12 px-4 bg-[#8C0303]/20 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg text-white focus:outline-none focus:border-[#F20C1F]/50 focus:ring-2 focus:ring-[#F20C1F]/20 transition-all"
        >
          {statusOptions.map(status => (
            <option key={status} value={status} className="bg-[#0D0D0D]">{status}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-white text-sm font-medium mb-3">
          Descripción
        </label>
        <textarea
          placeholder="Describe las características especiales, amenidades y servicios incluidos..."
          value={formData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-[#8C0303]/20 backdrop-blur-sm border border-[#8C0303]/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-[#F20C1F]/50 focus:ring-2 focus:ring-[#F20C1F]/20 transition-all resize-none"
        />
      </div>
    </div>
  );
};
