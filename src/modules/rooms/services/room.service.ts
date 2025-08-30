import type { ApiResponse, ApiRoom, Room } from "../types/room.types";

const API_BASE_URL = "http://localhost:3000/api";

export async function fetchRooms(): Promise<Room[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/habitaciones`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const apiResponse: ApiResponse = await response.json();

    if (!apiResponse.success) {
      throw new Error(
        apiResponse.message || "Error al cargar las habitaciones"
      );
    }

    return apiResponse.data.map(transformApiDataToRoom);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error instanceof Error
      ? error
      : new Error("Error desconocido al cargar las habitaciones");
  }
}

export function transformApiDataToRoom(apiRoom: ApiRoom): Room {
  // Get main image or first available image
  const mainImage =
    apiRoom.imagenes?.find((img) => img.es_principal === 1)?.ruta_archivo ||
    apiRoom.ruta_archivo ||
    apiRoom.imagenes?.[0]?.ruta_archivo ||
    "/comfortable-hotel-room.png";

  // Transform amenities to simple string array
  const amenities = [
    ...(apiRoom.comodidades?.slice(0, 4).map((comodidad) => {
      return {
        icono: comodidad.icono?.icon || null, // Retorna el ícono si existe, o null si no
        nombre: comodidad.icono?.text ||null, // Retorna el nombre, o un valor por defecto
      };
    }) || []),
  ];

  const bedTypeMap: { [key: string]: Room["bedType"] } = {
    King: "King",
    Queen: "Queen",
    Twin: "Twin",
    Double: "Double",
    Single: "Single",
    Matrimonial: "King",
    Doble: "Double",
    Individual: "Single",
    Sencilla: "Single",
    "Cama King": "King",
    "Cama Queen": "Queen",
  };

  const viewMap: { [key: string]: Room["view"] } = {
    "Vista al Mar": "Ocean",
    "Vista a la Ciudad": "City",
    "Vista al Jardín": "Garden",
    "Vista a la Montaña": "Mountain",
  };

  const bedTypeName =
    apiRoom.tipo_habitacion.cama_principal?.nombre_tipo_cama || "King";
  const bedType = bedTypeMap[bedTypeName] || "King";

  const view = viewMap[apiRoom.vista] || "City";

  return {
    id: `r${apiRoom.habitacion_id}`,
    name: apiRoom.tipo_habitacion.nombre_tipo,
    price: Number.parseFloat(apiRoom.tipo_habitacion.precio_base_noche),
    image: mainImage,
    capacity: apiRoom.tipo_habitacion.capacidad_maxima,
    bedType,
    view,
    amenities: amenities
  };
}
