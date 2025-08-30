import { useState } from "react";
import type { Room, RoomFilters } from "../types";

export const useRoomFilters = (allRooms: Room[]) => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(allRooms);
  const [filterLoading, setFilterLoading] = useState(false);

  const applyFilters = async (filters: RoomFilters) => {
    setFilterLoading(true);

    // Simular delay de filtrado para mejor UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    let tempRooms = allRooms;

    if (filters.capacity) {
      tempRooms = tempRooms.filter(
        (room) => room.capacity >= filters.capacity!
      );
    }
    if (filters.bedType) {
      tempRooms = tempRooms.filter((room) => room.bedType === filters.bedType);
    }
    if (filters.view) {
      tempRooms = tempRooms.filter((room) => room.view === filters.view);
    }

    setFilteredRooms(tempRooms);
    setFilterLoading(false);
  };

  const clearFilters = () => {
    setFilteredRooms(allRooms);
  };

  // Update filtered rooms when allRooms changes
  useState(() => {
    setFilteredRooms(allRooms);
  });

  return {
    filteredRooms,
    filterLoading,
    applyFilters,
    clearFilters,
  };
};
