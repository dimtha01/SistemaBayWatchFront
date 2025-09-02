// src/modules/Reservations/components/ReservationsTable.tsx
import React from 'react';
import { Eye, CheckCircle, CreditCard, FileText } from 'lucide-react';
import type { Reservation } from '../types/reservation.types';

interface ReservationsTableProps {
  reservations: Reservation[];
  onViewDetails: (reservation: Reservation) => void;
  onConfirmReservation: (id: number) => void;
  onConfirmPayment: (id: number) => void;
  onViewPaymentProofs: (reservation: Reservation) => void;
}

export const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
  onViewDetails,
  onConfirmReservation,
  onConfirmPayment,
  onViewPaymentProofs
}) => {
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

  if (reservations.length === 0) {
    return (
      <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl overflow-hidden">
        <div className="px-6 py-12 text-center text-gray-400">
          <p className="text-lg font-medium">No se encontraron reservas</p>
          <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl overflow-hidden">
      <div className="bg-[#8C0303]/20 backdrop-blur-sm px-6 py-4 border-b border-[#8C0303]/30">
        <h3 className="text-lg font-semibold text-white">Lista de Reservas</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#8C0303]/20 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Fechas
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Habitación
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8C0303]/30">
            {reservations.map((reservation) => (
              <tr 
                key={reservation.id}
                className="hover:bg-[#8C0303]/10 transition-all duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-[#F20C1F]/30"
                      src={reservation.guestAvatar}
                      alt={reservation.guestName}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-white">
                        {reservation.guestName}
                      </div>
                      <div className="text-sm text-gray-400">
                        ID: #RSV{reservation.id.toString().padStart(3, '0')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {reservation.checkIn} - {reservation.checkOut}
                  </div>
                  <div className="text-sm text-gray-400">{reservation.duration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{reservation.roomType}</div>
                  <div className="text-sm text-gray-400">Habitación {reservation.roomNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(reservation.status)}`}>
                    <span className="w-1.5 h-1.5 bg-current rounded-full mr-1.5"></span>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-white">
                    ${reservation.total.toLocaleString()}
                  </div>
                  <div className={`text-sm ${getPaymentStatusClass(reservation.paymentStatus)}`}>
                    {reservation.paymentStatus}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewDetails(reservation)}
                      className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {reservation.status === 'Pendiente' && (
                      <button
                        onClick={() => onConfirmReservation(reservation.id)}
                        className="p-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300 rounded-lg transition-all duration-200"
                        title="Confirmar reserva"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    
                    {reservation.paymentStatus === 'Pendiente' && (
                      <button
                        onClick={() => onConfirmPayment(reservation.id)}
                        className="p-2 bg-[#F20C1F]/20 hover:bg-[#F20C1F]/30 text-[#F27E7E] hover:text-[#F20C1F] rounded-lg transition-all duration-200"
                        title="Confirmar pago"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => onViewPaymentProofs(reservation)}
                      className="p-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 rounded-lg transition-all duration-200"
                      title="Ver comprobantes"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
