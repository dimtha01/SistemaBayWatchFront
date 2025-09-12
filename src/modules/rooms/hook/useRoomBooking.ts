import { useCallback } from "react";
import type { BookingData } from "@/modules/booking";

export const useRoomBooking = () => {
  const handleBooking = useCallback((data: BookingData, roomName: string) => {
    console.log("Reserva realizada:", data);
    try {
      console.log("Procesando reserva...", {
        roomType: roomName,
        bookingData: data,
        timestamp: new Date().toISOString(),
      });
      // Aquí se podría implementar la lógica para enviar la reserva al backend
      // Por ahora solo se registra en consola
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    }
  }, []);

  return {
    handleBooking,
  };
};
