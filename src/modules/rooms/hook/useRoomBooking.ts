import { useCallback } from "react";
import type { BookingData } from "../types/room.types";

export const useRoomBooking = () => {
  const handleBooking = useCallback(
    (
      data: BookingData,
      roomName: string,
      setIsModalOpen: (open: boolean) => void
    ) => {
      console.log("Reserva realizada:", data);

      try {
        console.log("Procesando reserva...", {
          roomType: roomName,
          bookingData: data,
          timestamp: new Date().toISOString(),
        });

        // Cerrar modal después de la reserva exitosa
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error al procesar la reserva:", error);
      }
    },
    []
  );

  return {
    handleBooking,
  };
};
