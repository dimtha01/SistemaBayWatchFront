import type { BookingData } from "../types/booking.types";
import { generateBookingId } from "../utils/clipboardUtils";
import { format } from "date-fns";

export const createBooking = (
  checkIn: Date | undefined,
  checkOut: Date | undefined,
  guests: number,
  pricePerNight: number,
  bookingCalculations: any,
  selectedPaymentMethod: string,
  paymentDetails: any,
  guestInfo: any
): BookingData => {
  const newBookingId = generateBookingId();

  return {
    id: newBookingId,
    checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
    checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
    guests,
    nights: bookingCalculations.nights,
    pricePerNight,
    subtotal: bookingCalculations.subtotal,
    taxes: bookingCalculations.taxes,
    serviceFee: 0,
    cleaningFee: 0,
    total: bookingCalculations.total,
    bookingDate: new Date().toISOString(),
    status: "confirmed",
    paymentMethod: selectedPaymentMethod,
    paymentDetails,
    guestInfo,
  };
};

export const generateBookingReceipt = (
  bookingData: BookingData,
  paymentMethodName: string
): string => {
  return `
Reserva Confirmada - Hotel Paradise

ID de Reserva: ${bookingData.id}
Fecha de Reserva: ${format(new Date(), "dd/MM/yyyy HH:mm")}

DETALLES DE LA ESTADÍA:
Check-in: ${format(new Date(bookingData.checkIn), "dd/MM/yyyy")}
Check-out: ${format(new Date(bookingData.checkOut), "dd/MM/yyyy")}
Número de Huéspedes: ${bookingData.guests}
Número de Noches: ${bookingData.nights}

DESGLOSE DE PRECIOS:
Subtotal (${bookingData.nights} noches × $${bookingData.pricePerNight}): $${
    bookingData.subtotal
  }
Impuestos y Tasas: $${bookingData.taxes}
TOTAL: $${bookingData.total}

MÉTODO DE PAGO:
${paymentMethodName}

INFORMACIÓN DEL HUÉSPED:
Nombre: ${bookingData.guestInfo?.name}
Email: ${bookingData.guestInfo?.email}
Teléfono: ${bookingData.guestInfo?.phone}
Documento: ${bookingData.guestInfo?.document}

¡Gracias por elegir Hotel Paradise!
  `.trim();
};
