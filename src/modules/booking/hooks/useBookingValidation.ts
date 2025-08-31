"use client";

import { useCallback, useEffect } from "react";
import type { BookingCalculations } from "../types";
import { isDateDisabled } from "../utils";

interface UseBookingValidationProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  unavailableDates: string[];
  reservedPeriods: Array<{ start: string; end: string }>;
  bookingCalculations: BookingCalculations;
  setDateErrors: (errors: { [key: string]: string }) => void;
  setIsValidBooking: (valid: boolean) => void;
}

export const useBookingValidation = ({
  checkIn,
  checkOut,
  unavailableDates,
  reservedPeriods,
  bookingCalculations,
  setDateErrors,
  setIsValidBooking,
}: UseBookingValidationProps) => {
  const validateDates = useCallback(
    (checkInDate: Date | undefined, checkOutDate: Date | undefined) => {
      const newDateErrors: { [key: string]: string } = {};

      if (!checkInDate || !checkOutDate) return true;

      // Validar que check-in no esté deshabilitado
      if (isDateDisabled(checkInDate, unavailableDates, reservedPeriods)) {
        newDateErrors.checkIn = "Fecha de check-in no disponible";
      }

      // Validar que no haya fechas deshabilitadas en el rango
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);

      for (
        let date = new Date(start);
        date < end;
        date.setDate(date.getDate() + 1)
      ) {
        if (isDateDisabled(date, unavailableDates, reservedPeriods)) {
          newDateErrors.checkOut = "Tu estadía incluye fechas no disponibles";
          break;
        }
      }

      setDateErrors(newDateErrors);
      return Object.keys(newDateErrors).length === 0;
    },
    [unavailableDates, reservedPeriods, setDateErrors]
  );

  useEffect(() => {
    const isValid =
      bookingCalculations.isValidDates &&
      checkIn &&
      checkOut &&
      bookingCalculations.nights > 0;

    setIsValidBooking(isValid ?? false);
  }, [
    bookingCalculations.isValidDates,
    checkIn,
    checkOut,
    bookingCalculations.nights,
    setIsValidBooking,
  ]);

  return { validateDates };
};
