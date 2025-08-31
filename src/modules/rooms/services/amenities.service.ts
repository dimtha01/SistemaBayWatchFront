import type {
  ApiAmenity,
  AmenitiesApiResponse,
  AmenityOption,
} from "../types/room.types";
const API_BASE_URL = "http://localhost:3000/api";

export const fetchAmenities = async (): Promise<AmenityOption[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/comodidades`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AmenitiesApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch amenities");
    }

    // Transform API data to AmenityOption format
    const uniqueAmenities = new Map<string, AmenityOption>();

    result.data.forEach((amenity: ApiAmenity) => {
      const key = amenity.text || amenity.nombre_comodidad;
      if (!uniqueAmenities.has(key)) {
        uniqueAmenities.set(key, {
          id: key,
          label: amenity.nombre_comodidad,
          icon: amenity.icon,
        });
      }
    });

    return Array.from(uniqueAmenities.values());
  } catch (error) {
    console.error("Error fetching amenities:", error);
    // Return fallback amenities if API fails
    return [];
  }
};
