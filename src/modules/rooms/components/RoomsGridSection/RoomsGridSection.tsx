import { RoomFilters } from "../RoomFilters/RoomFilters"

export const RoomsGridSection = () => {

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

        {/* Filtros */}
       <RoomFilters />

      
      </div>
    </section>
  )
}
