import { useState, useEffect } from "react";
import { RoomCard } from "../RoomCard/RoomCard";
import { RoomFilters } from "../RoomFilters/RoomFilters";
import type { Room } from "../RoomCard/RoomCard.types";

// Componente Skeleton para RoomCard
const RoomCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="animate-pulse">
        {/* Imagen skeleton */}
        <div className="h-48 sm:h-56 bg-gray-300"></div>

        <div className="p-4 sm:p-6">
          {/* Título skeleton */}
          <div className="h-6 bg-gray-300 rounded mb-3"></div>

          {/* Precio skeleton */}
          <div className="h-8 bg-gray-300 rounded w-24 mb-4"></div>

          {/* Info skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* Amenities skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-12"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-14"></div>
          </div>

          {/* Botón skeleton */}
          <div className="h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

const allRoomsData: Room[] = [
  {
    id: "r1",
    name: "Suite Presidencial",
    price: 450,
    image: "/images/suite presidencial.webp",
    capacity: 4,
    bedType: "King",
    view: "Ocean",
    amenities: ["Wi-Fi", "TV", "Minibar", "Balcony"],
  },
  {
    id: "r2",
    name: "Habitación Deluxe con Vista a la Ciudad",
    price: 280,
    image: "/images/habitacion deluxe.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Minibar"],
  },
  {
    id: "r3",
    name: "Bungalow con Jardín",
    price: 350,
    image: "/images/bungalow.webp",
    capacity: 3,
    bedType: "King",
    view: "Garden",
    amenities: ["Wi-Fi", "TV", "Private Patio"],
  },
  {
    id: "r4",
    name: "Habitación Estándar",
    price: 180,
    image: "/images/habitacion estandart.webp",
    capacity: 2,
    bedType: "Twin",
    view: "City",
    amenities: ["Wi-Fi", "TV"],
  },
  {
    id: "r5",
    name: "Suite Familiar",
    price: 520,
    image: "/images/suite familiar.webp",
    capacity: 5,
    bedType: "King",
    view: "Mountain",
    amenities: ["Wi-Fi", "TV", "Kitchenette"],
  },
  {
    id: "r6",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
  {
    id: "r7",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
  {
    id: "r8",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
  {
    id: "r9",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
  {
    id: "r10",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
  {
    id: "r11",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
  {
    id: "r12",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
  {
    id: "r13",
    name: "Habitación Ejecutiva",
    price: 320,
    image: "/images/habitacion ejecutiva.webp",
    capacity: 2,
    bedType: "Queen",
    view: "City",
    amenities: ["Wi-Fi", "TV", "Desk"],
  },
];

const ITEMS_PER_PAGE = 6;

export const RoomsGridSection = () => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(allRoomsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 segundos de carga inicial

    return () => clearTimeout(timer);
  }, []);

  // useEffect para manejar el scroll cuando cambia la página
  // Scroll automático solo cuando cambia la página
useEffect(() => {
  if (!loading && !filterLoading) {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }
}, [currentPage, filterLoading]); // Se ejecuta cuando cambia currentPage o filterLoading


  const handleFilterChange = async (filters: {
    capacity?: number;
    bedType?: string;
    view?: string;
  }) => {
    // Mostrar loading al filtrar
    setFilterLoading(true);

    // Simular delay de filtrado (opcional, para mejor UX)
    await new Promise((resolve) => setTimeout(resolve, 800));

    let tempRooms = allRoomsData;

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
    setCurrentPage(1);
    setFilterLoading(false);
  };

  // Cálculos de paginación
  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRooms = filteredRooms.slice(startIndex, endIndex);

  // Función simplificada para cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Función responsiva para generar números de página
  const generatePageNumbers = () => {
    const pages = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        if (currentPage === 1) {
          pages.push(1, 2, "...", totalPages);
        } else if (currentPage === totalPages) {
          pages.push(1, "...", totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage, "...", totalPages);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }
    }

    return pages;
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

        {/* Mostrar filtros solo si no está en carga inicial */}
        {!loading && <RoomFilters onFilterChange={handleFilterChange} />}

        {/* Información de resultados responsiva */}
        {!loading && !filterLoading && filteredRooms.length > 0 && (
          <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 px-2">
            <span className="block sm:inline">
              Mostrando {startIndex + 1}-
              {Math.min(endIndex, filteredRooms.length)}
            </span>
            <span className="block sm:inline sm:ml-1">
              de {filteredRooms.length} habitaciones
            </span>
          </div>
        )}

        {/* Grid responsivo con Skeleton Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {loading || filterLoading ? (
            // Mostrar skeletons durante la carga
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <RoomCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : currentRooms.length > 0 ? (
            // Mostrar habitaciones reales
            currentRooms.map((room, index) => (
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
            <div className="col-span-full text-center text-gray-600 text-lg sm:text-xl py-8 sm:py-10 px-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-6xl">🏨</div>
                <div>
                  No se encontraron habitaciones con los filtros seleccionados.
                </div>
                <button
                  onClick={() => {
                    setFilteredRooms(allRoomsData);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Paginador responsivo - Solo mostrar si no está cargando */}
        {!loading &&
          !filterLoading &&
          filteredRooms.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2 px-2">
              {/* Información de página en móvil */}
              <div className="sm:hidden text-sm text-gray-600 mb-2">
                Página {currentPage} de {totalPages}
              </div>

              <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap justify-center">
                {/* Botón Anterior */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">‹</span>
                </button>

                {/* Números de página */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {generatePageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      disabled={page === "..."}
                      className={`px-2 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors min-w-[32px] sm:min-w-[40px] ${
                        page === currentPage
                          ? "bg-blue-600 text-white border-blue-600"
                          : page === "..."
                          ? "bg-white text-gray-400 cursor-default border-gray-200"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Botón Siguiente */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-2 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <span className="sm:hidden">›</span>
                </button>
              </div>

              {/* Ir a página específica en desktop */}
              <div className="hidden lg:flex items-center space-x-2 ml-4">
                <span className="text-sm text-gray-600">Ir a:</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      handlePageChange(page);
                    }
                  }}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
      </div>
    </section>
  );
};
