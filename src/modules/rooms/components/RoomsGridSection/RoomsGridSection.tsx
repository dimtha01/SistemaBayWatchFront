"use client";

import { RoomFilters } from "../RoomFilters/RoomFilters";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { ResultsInfo } from "../ResultsInfo/ResultsInfo";
import { RoomsGrid } from "../RoomsGrid/RoomsGrid";
import type { Room } from "../../types/room.types";
import { useState, useEffect } from "react";
import { useRooms } from "../../hook";

export const RoomsGridSection = () => {
  const { allRoomsData, loading, error, retry } = useRooms();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [filterLoading, setFilterLoading] = useState(false);
  console.log(allRoomsData);

  useEffect(() => {
    setFilteredRooms(allRoomsData);
  }, [allRoomsData]);

  const handleFiltersApplied = (filtered: Room[], loading: boolean) => {
    setFilteredRooms(filtered);
    setFilterLoading(loading);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header responsivo */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Habitaciones & Suites
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Encuentra la estancia perfecta para tu viaje.
          </p>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage error={error} onRetry={retry} />}

        {/* Filtros */}
        {!loading && !error && (
          <RoomFilters
            rooms={allRoomsData}
            onFiltersApplied={handleFiltersApplied}
          />
        )}

        {/* Información de resultados */}
        {!loading && !filterLoading && !error && filteredRooms.length > 0 && (
          <ResultsInfo
            startIndex={1}
            endIndex={filteredRooms.length}
            totalItems={filteredRooms.length}
          />
        )}

        {/* Grid de habitaciones */}
        <RoomsGrid
          rooms={filteredRooms}
          loading={loading || filterLoading}
          error={error}
          itemsPerPage={filteredRooms.length}
          onRetry={retry}
          onClearFilters={() => setFilteredRooms(allRoomsData)}
        />
      </div>
    </section>
  );
};
