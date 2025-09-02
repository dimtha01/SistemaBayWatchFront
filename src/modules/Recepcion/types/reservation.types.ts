// src/modules/Reservations/types/reservation.types.ts
export interface Reservation {
  id: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAvatar: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  guests: string;
  roomType: string;
  roomNumber: string;
  status: ReservationStatus;
  total: number;
  subtotal: number;
  taxes: number;
  discounts: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  bookingDate: string;
  pricePerNight: number;
  view: string;
  paymentProofs: PaymentProof[];
}

export type ReservationStatus = 
  | 'Confirmada' 
  | 'Pendiente' 
  | 'Check-in' 
  | 'Check-out' 
  | 'Cancelada';

export type PaymentStatus = 
  | 'Pagado' 
  | 'Pendiente' 
  | 'Parcial' 
  | 'Reembolsado';

export interface PaymentProof {
  id: string;
  type: 'receipt' | 'invoice' | 'refund';
  amount: number;
  date: string;
  method: string;
  reference: string;
  url?: string;
}

export interface ReservationFilters {
  status: string;
  searchTerm: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
