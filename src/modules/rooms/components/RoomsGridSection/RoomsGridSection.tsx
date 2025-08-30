import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { ResultsInfo } from "../ResultsInfo/ResultsInfo"
import { Pagination } from "../Pagination/Pagination"
import { usePagination, useRoomFilters, useRooms } from "../../hook"
import { RoomsGrid } from "../RoomsGrid/RoomsGrid"
import { RoomFilters } from "../RoomFilters/RoomFilters"

const ITEMS_PER_PAGE = 6

export const RoomsGridSection = () => {
  const { allRoomsData, loading, error, retry } = useRooms()
  const { filteredRooms, filterLoading, applyFilters, clearFilters } = useRoomFilters(allRoomsData)
  const { config, startIndex, endIndex, goToPage, resetPage } = usePagination({
    totalItems: filteredRooms.length,
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const currentRooms = filteredRooms.slice(startIndex, endIndex)

  const handleFilterChange = async (filters: { capacity?: number; bedType?: string; view?: string }) => {
    await applyFilters(filters)
    resetPage()
  }

  const handleClearFilters = () => {
    clearFilters()
    resetPage()
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header responsivo */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Habitaciones & Suites
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">Encuentra la estancia perfecta para tu viaje.</p>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage error={error} onRetry={retry} />}

        {/* Filtros */}
        {!loading && !error && <RoomFilters onFilterChange={handleFilterChange} />}

        {/* Información de resultados */}
        {!loading && !filterLoading && !error && filteredRooms.length > 0 && (
          <ResultsInfo startIndex={startIndex} endIndex={endIndex} totalItems={filteredRooms.length} />
        )}

        {/* Grid de habitaciones */}
        <RoomsGrid
          rooms={currentRooms}
          loading={loading || filterLoading}
          error={error}
          itemsPerPage={ITEMS_PER_PAGE}
          onRetry={retry}
          onClearFilters={handleClearFilters}
        />

        {/* Paginación */}
        {!loading && !filterLoading && !error && filteredRooms.length > ITEMS_PER_PAGE && (
          <Pagination config={config} onPageChange={goToPage} />
        )}
      </div>
    </section>
  )
}
