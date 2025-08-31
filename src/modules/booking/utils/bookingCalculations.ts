import type { BookingCalculations } from "../types/booking.types"

export const calculateBooking = (
  checkIn: Date | undefined,
  checkOut: Date | undefined,
  pricePerNight: number,
  minNights: number,
  maxNights: number,
  isValidDateRange: boolean,
): BookingCalculations => {
  if (!checkIn || !checkOut || checkOut <= checkIn) {
    return {
      nights: 0,
      subtotal: 0,
      taxes: 150,
      total: 0,
      isValidDates: false,
    }
  }

  const nights = Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

  if (nights < minNights || nights > maxNights || !isValidDateRange) {
    return {
      nights,
      subtotal: 0,
      taxes: 150,
      total: 0,
      isValidDates: false,
    }
  }

  const subtotal = nights * pricePerNight
  const taxes = 150
  const total = subtotal + taxes

  return {
    nights,
    subtotal,
    taxes,
    total,
    isValidDates: true,
  }
}
