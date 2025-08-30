import { EmptyState } from "../EmptyState/EmptyState";
import type { Room } from "../../types/room.types";
import { RoomCardSkeleton } from "../RoomCardSkeleton/RoomCardSkeleton.tsx.tsx";
import { RoomCard } from "../RoomCard/RoomCard.tsx";

interface RoomsGridProps {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  itemsPerPage: number;
  onRetry: () => void;
  onClearFilters: () => void;
}

export const RoomsGrid = ({
  rooms,
  loading,
  error,
  itemsPerPage,
  onRetry,
  onClearFilters,
}: RoomsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
      {loading ? (
        // Mostrar skeletons durante la carga
        Array.from({ length: itemsPerPage }).map((_, index) => (
          <RoomCardSkeleton key={`skeleton-${index}`} />
        ))
      ) : error ? (
        <EmptyState
          type="error"
          onAction={onRetry}
          actionLabel="Intentar de nuevo"
        />
      ) : rooms.length > 0 ? (
        // Mostrar habitaciones reales
        rooms.map((room, index) => (
          <RoomCard
            key={`${room.id}-${index}`}
            id={room.id}
            name={room.name}
            price={room.price}
            image={room.image}
            capacity={room.capacity}
            bedType={room.bedType}
            view={room.view}
            amenities={room.amenities}
          />
        ))
      ) : (
        // Mensaje cuando no hay resultados
        <EmptyState
          type="no-results"
          onAction={onClearFilters}
          actionLabel="Limpiar filtros"
        />
      )}
    </div>
  );
};
