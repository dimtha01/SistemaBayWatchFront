// src/modules/Reservations/hooks/useReservations.ts
import { useState, useMemo } from 'react';
import type { Reservation, ReservationFilters, PaymentStatus, ReservationStatus } from '../types/reservation.types';

// Datos de ejemplo
const mockReservations: Reservation[] = [
  {
    id: 1,
    guestName: "Elena Sanchez",
    guestEmail: "elena.sanchez@example.com",
    guestPhone: "(555) 123-4567",
    guestAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    checkIn: "25/07/2024",
    checkOut: "30/07/2024",
    duration: "5 noches",
    guests: "2 adultos",
    roomType: "Suite Deluxe",
    roomNumber: "101",
    status: "Confirmada",
    total: 1250,
    subtotal: 1250,
    taxes: 125,
    discounts: 125,
    paymentStatus: "Pagado",
    paymentMethod: "Tarjeta de crédito ****1234",
    bookingDate: "20/07/2024",
    pricePerNight: 250,
    view: "Vista al mar",
    paymentProofs: [
      {
        id: "proof-1",
        type: "receipt",
        amount: 1250,
        date: "20/07/2024",
        method: "Tarjeta de crédito",
        reference: "TXN-001234",
        url: "/receipts/receipt-1.pdf"
      }
    ]
  },
  {
    id: 2,
    guestName: "Miguel Torres",
    guestEmail: "miguel.torres@example.com",
    guestPhone: "(555) 987-6543",
    guestAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    checkIn: "26/07/2024",
    checkOut: "28/07/2024",
    duration: "2 noches",
    guests: "1 adulto",
    roomType: "Habitación Doble",
    roomNumber: "102",
    status: "Pendiente",
    total: 528,
    subtotal: 480,
    taxes: 48,
    discounts: 0,
    paymentStatus: "Pendiente",
    paymentMethod: "Transferencia bancaria",
    bookingDate: "22/07/2024",
    pricePerNight: 240,
    view: "Vista a la ciudad",
    paymentProofs: []
  },
  // ... más reservas de ejemplo
];

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [filters, setFilters] = useState<ReservationFilters>({
    status: 'Todas las reservas',
    searchTerm: '',
  });

  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      const matchesStatus = filters.status === 'Todas las reservas' || 
                           reservation.status.toLowerCase().includes(filters.status.toLowerCase());
      
      const matchesSearch = filters.searchTerm === '' ||
                           reservation.guestName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           reservation.guestEmail.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           reservation.roomNumber.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [reservations, filters]);

  const stats = useMemo(() => {
    const total = reservations.length;
    const confirmed = reservations.filter(r => r.status === 'Confirmada').length;
    const pending = reservations.filter(r => r.status === 'Pendiente').length;
    const checkins = reservations.filter(r => r.status === 'Check-in').length;

    return {
      total,
      confirmed,
      pending,
      checkins,
      confirmedPercentage: total > 0 ? ((confirmed / total) * 100).toFixed(1) : '0',
      pendingPercentage: total > 0 ? ((pending / total) * 100).toFixed(1) : '0'
    };
  }, [reservations]);

  const confirmReservation = (id: number) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'Confirmada' as ReservationStatus }
          : reservation
      )
    );
  };

  const confirmPayment = (id: number) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, paymentStatus: 'Pagado' as PaymentStatus }
          : reservation
      )
    );
  };

  const updateReservationStatus = (id: number, status: ReservationStatus) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status }
          : reservation
      )
    );
  };

  const updateFilters = (newFilters: Partial<ReservationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    reservations: filteredReservations,
    stats,
    filters,
    updateFilters,
    confirmReservation,
    confirmPayment,
    updateReservationStatus,
  };
};
