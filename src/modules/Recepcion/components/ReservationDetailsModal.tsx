// src/modules/Reservations/components/ReservationDetailsModal.tsx
import React from 'react';
import { X, Calendar, Users, MapPin, DollarSign, Mail, Phone } from 'lucide-react';
import type { Reservation } from '../types/reservation.types';

interface ReservationDetailsModalProps {
  isOpen: boolean;
  reservation: Reservation | null;
  onClose: () => void;
  onConfirmReservation: (id: number) => void;
  onConfirmPayment: (id: number) => void;
}

export const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  isOpen,
  reservation,
  onClose,
  onConfirmReservation,
  onConfirmPayment
}) => {
  if (!isOpen || !reservation) return null;

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Confirmada': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pendiente': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Check-in': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Check-out': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Cancelada': return 'bg-[#F20C1F]/20 text-[#F27E7E] border-[#F20C1F]/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPaymentStatusClass = (status: string) => {
    switch(status) {
      case 'Pagado': return 'text-green-400';
      case 'Pendiente': return 'text-yellow-400';
      case 'Parcial': return 'text-orange-400';
      case 'Reembolsado': return 'text-[#F27E7E]';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D]/90 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#8C0303]/30">
          <h3 className="text-xl font-semibold text-white">Detalles de la Reserva</h3>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Información principal */}
          <div className="flex items-center space-x-6 mb-8">
            <img 
              className="h-20 w-20 rounded-full object-cover ring-4 ring-[#F20C1F]/30" 
              src={reservation.guestAvatar}
              alt={reservation.guestName}
            />
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-white">{reservation.guestName}</h4>
              <div className="flex items-center mt-1 text-gray-400">
                <Mail className="w-4 h-4 mr-1" />
                <span className="text-sm">{reservation.guestEmail}</span>
              </div>
              <div className="flex items-center mt-1 text-gray-400">
                <Phone className="w-4 h-4 mr-1" />
                <span className="text-sm">{reservation.guestPhone}</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusClass(reservation.status)}`}>
                <span className="w-1.5 h-1.5 bg-current rounded-full mr-1.5"></span>
                {reservation.status}
              </div>
              <p className="text-sm text-gray-400 mt-2">Reservado el</p>
              <p className="text-sm font-medium text-white">{reservation.bookingDate}</p>
            </div>
          </div>

          {/* Detalles de la reserva */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-[#8C0303]/10 border border-[#8C0303]/20 rounded-lg p-6">
              <h5 className="font-semibold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-[#F20C1F] mr-2" />
                Información de Estancia
              </h5>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Check-in:</span>
                  <span className="font-medium text-white">{reservation.checkIn} - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Check-out:</span>
                  <span className="font-medium text-white">{reservation.checkOut} - 11:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duración:</span>
                  <span className="font-medium text-white">{reservation.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Huéspedes:</span>
                  <span className="font-medium text-white">{reservation.guests}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#8C0303]/10 border border-[#8C0303]/20 rounded-lg p-6">
              <h5 className="font-semibold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-[#F20C1F] mr-2" />
                Detalles de Habitación
              </h5>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Habitación:</span>
                  <span className="font-medium text-white">{reservation.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Número:</span>
                  <span className="font-medium text-white">{reservation.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Precio/noche:</span>
                  <span className="font-medium text-white">${reservation.pricePerNight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vista:</span>
                  <span className="font-medium text-white">{reservation.view}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen financiero */}
          <div className="bg-[#8C0303]/10 border border-[#8C0303]/20 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-white mb-4 flex items-center">
              <DollarSign className="w-5 h-5 text-[#F20C1F] mr-2" />
              Resumen Financiero
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">${reservation.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Impuestos:</span>
                <span className="text-white">${reservation.taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Descuentos:</span>
                <span className="text-green-400">-${reservation.discounts.toLocaleString()}</span>
              </div>
              <hr className="my-2 border-[#8C0303]/30" />
              <div className="flex justify-between font-bold text-lg">
                <span className="text-white">Total:</span>
                <span className="text-white">${reservation.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estado de pago:</span>
                <span className={`font-medium ${getPaymentStatusClass(reservation.paymentStatus)}`}>
                  {reservation.paymentStatus === 'Pagado' ? '✓ Pagado' : 
                   reservation.paymentStatus === 'Pendiente' ? '⏳ Pendiente' : 
                   reservation.paymentStatus === 'Reembolsado' ? '↩ Reembolsado' : reservation.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Método de pago:</span>
                <span className="text-white">{reservation.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-[#8C0303]/30">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-[#0D0D0D]/80 border border-[#8C0303]/30 rounded-lg text-gray-400 hover:text-white hover:bg-[#8C0303]/20 transition-colors duration-200"
            >
              Cerrar
            </button>
            
            {reservation.status === 'Pendiente' && (
              <button 
                onClick={() => {
                  onConfirmReservation(reservation.id);
                  onClose();
                }}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Confirmar Reserva</span>
              </button>
            )}
            
            {reservation.paymentStatus === 'Pendiente' && (
              <button 
                onClick={() => {
                  onConfirmPayment(reservation.id);
                  onClose();
                }}
                className="px-6 py-2 bg-gradient-to-r from-[#F20C1F] to-[#8C0303] text-white rounded-lg hover:from-[#F20C1F]/90 hover:to-[#8C0303]/90 transition-all duration-200 flex items-center space-x-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>Confirmar Pago</span>
              </button>
            )}
            
            <button 
              onClick={() => window.open(`mailto:${reservation.guestEmail}`, '_blank')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contactar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
