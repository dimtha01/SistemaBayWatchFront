import type React from "react"

// Interfaz para las propiedades del widget de reservas
export interface BookingWidgetProps {
  pricePerNight: number
  onBooking: (bookingData: BookingData) => void
  maxGuests?: number
  minNights?: number
  maxNights?: number
  unavailableDates?: string[]
  reservedPeriods?: ReservedPeriod[]
}

// Interfaz para los datos de la reserva
export interface BookingData {
  id: string
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  pricePerNight: number
  subtotal: number
  taxes: number
  serviceFee: number
  cleaningFee: number
  total: number
  bookingDate: string
  status: "pending" | "confirmed" | "cancelled"
  paymentMethod: string
  paymentDetails?: PaymentDetails
  guestInfo?: GuestInfo
}

// Interfaz para los períodos reservados
export interface ReservedPeriod {
  start: string
  end: string
  reason?: string
  guestName?: string
  status?: "confirmed" | "pending" | "checkout"
}

// Interfaz para los métodos de pago
export interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
  available: boolean
}

// Interfaz para los detalles del pago
export interface PaymentDetails {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  transferenceReference: string
  pagoMovilPhone: string
  pagoMovilReference: string
  cryptoWallet: string
  cryptoTxHash: string
  zelleEmail: string
  zelleReference: string
}

// Interfaz para la información del huésped
export interface GuestInfo {
  name: string
  email: string
  phone: string
  document: string
  notes: string
}

// Interfaz para los cálculos de la reserva
export interface BookingCalculations {
  nights: number
  subtotal: number
  taxes: number
  total: number
  isValidDates: boolean
}

// Tipo para los pasos del proceso de pago
export type PaymentStep = "method" | "details" | "guest" | "success"
