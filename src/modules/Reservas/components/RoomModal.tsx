// src/modules/Rooms/components/RoomModal.tsx
import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { Room } from '../types/room.types';
import { RoomFormStep1 } from './RoomFormStep1';

interface RoomModalProps {
  isOpen: boolean;
  room: Room | null;
  onSave: (roomData: Omit<Room, 'id'>) => void;
  onUpdate: (id: number, roomData: Partial<Room>) => void;
  onClose: () => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  isOpen,
  room,
  onSave,
  onUpdate,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Room>>({});

  useEffect(() => {
    if (room) {
      setFormData(room);
    } else {
      setFormData({
        name: '',
        type: 'Individual',
        capacity: 1,
        price: '',
        status: 'Disponible',
        description: ''
      });
    }
    setCurrentStep(1);
  }, [room, isOpen]);

  const handleFieldChange = (field: keyof Room, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    return formData.name && formData.capacity && formData.price;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    setCurrentStep(2);
  };

  const handleSave = () => {
    if (!validateStep1()) return;

    const roomData = {
      // Continuación de RoomModal.tsx
      name: formData.name!,
      type: formData.type!,
      capacity: formData.capacity!,
      price: formData.price!,
      status: formData.status!,
      description: formData.description || ''
    };

    if (room) {
      onUpdate(room.id, roomData);
    } else {
      onSave(roomData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D]/90 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#8C0303]/30">
          <div className="flex items-center gap-6">
            <h2 className="text-white text-xl font-bold">
              {room ? 'Editar Habitación' : 'Agregar Habitación'}
            </h2>
            {/* Step Indicators */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full text-white text-sm flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep === 1 
                  ? 'bg-gradient-to-r from-[#F20C1F] to-[#8C0303]' 
                  : 'bg-gradient-to-r from-green-600 to-green-500'
              }`}>
                {currentStep === 1 ? '1' : <Check className="w-5 h-5" />}
              </div>
              <div className="w-12 h-0.5 bg-[#8C0303]/50 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-[#F20C1F] to-[#F20C0C] rounded-full transition-all duration-300" 
                  style={{ width: currentStep === 2 ? '100%' : '0%' }}
                />
              </div>
              <div className={`w-10 h-10 rounded-full text-sm flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep === 2 
                  ? 'bg-gradient-to-r from-[#F20C1F] to-[#8C0303] text-white' 
                  : 'bg-[#8C0303]/20 text-gray-400 border border-[#8C0303]/30'
              }`}>
                2
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <RoomFormStep1 formData={formData} onChange={handleFieldChange} />
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-white text-lg font-semibold mb-2">Galería de Imágenes</h3>
                <p className="text-gray-400 text-sm">Las imágenes se pueden agregar después de crear la habitación</p>
              </div>
              
              <div className="bg-[#8C0303]/10 border border-[#8C0303]/20 rounded-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#8C0303]/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p className="text-lg font-medium text-white mb-2">Funcionalidad de imágenes</p>
                <p className="text-sm text-gray-400">Esta funcionalidad estará disponible en una futura actualización</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between p-6 border-t border-[#8C0303]/30">
          <div>
            {currentStep === 2 && (
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-6 py-3 bg-[#8C0303]/20 hover:bg-[#8C0303]/30 text-white rounded-lg transition-all border border-[#8C0303]/30"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#8C0303]/20 hover:bg-[#8C0303]/30 text-white rounded-lg transition-all border border-[#8C0303]/30"
            >
              Cancelar
            </button>
            {currentStep === 1 ? (
              <button
                onClick={handleNext}
                disabled={!validateStep1()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F20C1F] to-[#8C0303] hover:from-[#F20C0C] hover:to-[#F20C1F] text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition-all"
              >
                <Check className="w-4 h-4" />
                Guardar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
