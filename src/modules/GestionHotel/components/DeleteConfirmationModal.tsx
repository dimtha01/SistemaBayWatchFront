// src/modules/Rooms/components/DeleteConfirmationModal.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Room } from '../types/room.types';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  room: Room | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  room,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D]/90 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl w-full max-w-md animate-in zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F20C1F] to-[#8C0303] rounded-full flex items-center justify-center shadow-lg">
              <Trash2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Eliminar Habitación</h3>
              <p className="text-gray-400 text-sm mt-1">Esta acción es permanente</p>
            </div>
          </div>
          
          <div className="bg-[#F20C1F]/10 border border-[#F20C1F]/20 rounded-lg p-4 mb-6">
            <p className="text-gray-300 text-sm">
              ¿Estás seguro de que quieres eliminar la habitación{' '}
              <span className="text-white font-semibold">{room.name}</span>?
            </p>
            <p className="text-[#F27E7E] text-xs mt-2 font-medium">⚠️ Esta acción no se puede deshacer</p>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-[#8C0303]/20 hover:bg-[#8C0303]/30 text-white rounded-lg transition-all border border-[#8C0303]/30"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 bg-gradient-to-r from-[#F20C1F] to-[#8C0303] hover:from-[#F20C0C] hover:to-[#F20C1F] text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
