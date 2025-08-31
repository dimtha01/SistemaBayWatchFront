import type {
  ApiResponse,
  ApiRoom,
  Room,
  RoomFilters,
} from "../types/room.types";

const API_BASE_URL = "http://localhost:3000/api";

export async function fetchRooms(
  filters?: Partial<RoomFilters>
): Promise<Room[]> {
  try {
    const queryParams = new URLSearchParams();

    // Agregar logs para depuración
    console.log("Aplicando filtros:", filters);

    if (filters?.capacity) {
      queryParams.append("capacidad", filters.capacity.toString());
    }

    if (filters?.bedType) {
      queryParams.append("tipo_cama", filters.bedType);
    }

    if (filters?.view) {
      queryParams.append("vista", filters.view);
    }

    if (filters?.priceRange) {
      queryParams.append("precio_min", filters.priceRange.min.toString());
      queryParams.append("precio_max", filters.priceRange.max.toString());
    }

    if (filters?.amenities && filters.amenities.length > 0) {
      queryParams.append("comodidades", filters.amenities.join(","));
    }

    const url = queryParams.toString()
      ? `${API_BASE_URL}/habitaciones?${queryParams.toString()}`
      : `${API_BASE_URL}/habitaciones`;

    // Log para ver la URL completa
    console.log("URL de la petición:", url);

    const response = await fetch(url, {
      // Desactivar la caché para asegurar respuestas frescas
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const apiResponse: ApiResponse = await response.json();

    // Log para ver la respuesta de la API
    console.log("Respuesta de la API:", apiResponse);

    if (!apiResponse.success) {
      throw new Error(
        apiResponse.message || "Error al cargar las habitaciones"
      );
    }

    const transformedRooms = apiResponse.data.map(transformApiDataToRoom);

    // Log para ver los datos transformados
    console.log("Habitaciones transformadas:", transformedRooms);

    return transformedRooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error instanceof Error
      ? error
      : new Error("Error desconocido al cargar las habitaciones");
  }
}

export function transformApiDataToRoom(apiRoom: ApiRoom): Room {
  const mainImage =
    apiRoom.imagenes?.find((img) => img.es_principal === 1)?.ruta_archivo ||
    apiRoom.ruta_archivo ||
    apiRoom.imagenes?.[0]?.ruta_archivo ||
    "/comfortable-hotel-room.png";

  const amenities = [
    ...(apiRoom.comodidades?.slice(0, 4).map((comodidad) => {
      return {
        icono: comodidad.icono?.icon || "default-icon.png", // Valor por defecto si no hay icono
        nombre: comodidad.icono?.text || "Sin nombre", // Valor por defecto si no hay nombre
      };
    }) || []),
  ];

  const bedType =
    apiRoom.tipo_habitacion.cama_principal?.nombre_tipo_cama;
  const view = apiRoom.vista;

  return {
    id: `${apiRoom.habitacion_id}`,
    name: apiRoom.tipo_habitacion.nombre_tipo,
    price: Number.parseFloat(apiRoom.tipo_habitacion.precio_base_noche),
    image: mainImage,
    capacity: apiRoom.tipo_habitacion.capacidad_maxima,
    bedType,
    view,
    amenities,
  };
}

