// src/modules/Reservations/pages/ReservationsDashboard.tsx
import React, { useState } from 'react';
import { useReservations } from '../hooks/useReservations';
import { useNotifications } from '../hooks/useNotifications';
import { ReservationStats } from '../components/ReservationStats';
import { ReservationFiltersComponent } from '../components/ReservationFilters';
import { ReservationsTable } from '../components/ReservationsTable';
import { ReservationDetailsModal } from '../components/ReservationDetailsModal';
import { PaymentProofsModal } from '../components/PaymentProofsModal';
import { NotificationToast } from '../components/NotificationToast';
import type { Reservation } from '../types/reservation.types';

export const ReservationsDashboard: React.FC = () => {
  const {
    reservations,
    stats,
    filters,
    updateFilters,
    confirmReservation,
    confirmPayment,
  } = useReservations();

  const { notifications, showNotification, hideNotification } = useNotifications();

  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPaymentProofsModalOpen, setIsPaymentProofsModalOpen] = useState(false);

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsModalOpen(true);
  };

  const handleViewPaymentProofs = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsPaymentProofsModalOpen(true);
  };

  const handleConfirmReservation = (id: number) => {
    confirmReservation(id);
    showNotification('Reserva confirmada exitosamente', 'success');
  };

  const handleConfirmPayment = (id: number) => {
    confirmPayment(id);
    showNotification('Pago confirmado exitosamente', 'success');
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsPaymentProofsModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Filtros y búsqueda */}
        <ReservationFiltersComponent 
          filters={filters}
          onFiltersChange={updateFilters}
        />

        {/* Estadísticas */}
        <ReservationStats stats={stats} />

        {/* Tabla de reservas */}
        <ReservationsTable 
          reservations={reservations}
          onViewDetails={handleViewDetails}
          onConfirmReservation={handleConfirmReservation}
          onConfirmPayment={handleConfirmPayment}
          onViewPaymentProofs={handleViewPaymentProofs}
        />

        {/* Modal de detalles */}
        <ReservationDetailsModal 
          isOpen={isDetailsModalOpen}
          reservation={selectedReservation}
          onClose={closeModals}
          onConfirmReservation={handleConfirmReservation}
          onConfirmPayment={handleConfirmPayment}
        />

        {/* Modal de comprobantes */}
        <PaymentProofsModal 
          isOpen={isPaymentProofsModalOpen}
          reservation={selectedReservation}
          onClose={closeModals}
        />

        {/* Notificaciones */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={() => hideNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};
