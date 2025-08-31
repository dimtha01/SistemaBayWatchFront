import type { BedTypesApiResponse, ApiBedType } from "../types/room.types"

const API_BASE_URL = "http://localhost:3000"

export const fetchBedTypes = async (): Promise<{ id: string; label: string }[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tiposCamas`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: BedTypesApiResponse = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.message || "Failed to fetch bed types")
    }

    // Transform API data and remove duplicates
    const bedTypesMap = new Map<string, { id: string; label: string }>()

    result.data.forEach((bedType: ApiBedType) => {
      const key = bedType.nombre_tipo_cama
      if (!bedTypesMap.has(key)) {
        bedTypesMap.set(key, {
          id: bedType.nombre_tipo_cama,
          label: bedType.nombre_tipo_cama,
        })
      }
    })

    return Array.from(bedTypesMap.values())
  } catch (error) {
    console.error("Error fetching bed types:", error)
    return []
  }
}
