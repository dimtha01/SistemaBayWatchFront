import React from 'react';
import { format } from 'date-fns';

interface BookingSummaryProps {
  bookingData: {
    checkIn?: Date;
    checkOut?: Date;
    guests: string;
    nights: number;
    subtotal: number;
    taxes: number;
    total: number;
  };
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ bookingData }) => {
  const formatDateShort = (date: Date | undefined) => {
    if (!date) return "No seleccionada";
    return format(date, "dd/MM/yyyy");
  };

  return (
    <div className="border-t border-gray-200 p-6 bg-gray-50">
      <h3 className="font-semibold text-gray-900 mb-4">Resumen de Reserva</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Habitación:</span>
          <span className="font-medium">Suite Premium</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Fechas:</span>
          <span className="font-medium">
            {bookingData.checkIn && bookingData.checkOut
              ? `${formatDateShort(bookingData.checkIn)} - ${formatDateShort(bookingData.checkOut)}`
              : "No seleccionadas"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Huéspedes:</span>
          <span className="font-medium">
            {bookingData.guests} {parseInt(bookingData.guests) === 1 ? "Huésped" : "Huéspedes"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Noches:</span>
          <span className="font-medium">{bookingData.nights}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span>${bookingData.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Impuestos:</span>
            <span>${bookingData.taxes}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
            <span>Total:</span>
            <span className="text-red-600">${bookingData.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
