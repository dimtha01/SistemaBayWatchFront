"use client"

import { useState, useEffect } from "react"
import { fetchRoomDetails } from "../services/roomDetails.service.ts"
import type { ApiRoomDetailsResponse, RoomDetailsData, UseRoomDetailsReturn } from "../types/roomDetails.types"

const transformApiResponse = (apiData: ApiRoomDetailsResponse["data"]): RoomDetailsData => {
  return {
    id: apiData.habitacion_id,
    roomNumber: apiData.numero_habitacion,
    status: apiData.estado,
    floor: apiData.piso,
    view: apiData.vista,
    roomType: {
      id: apiData.tipo_habitacion.tipo_habitacion_id,
      name: apiData.tipo_habitacion.nombre_tipo,
      description: apiData.tipo_habitacion.descripcion,
      maxCapacity: apiData.tipo_habitacion.capacidad_maxima,
      basePrice: Number.parseFloat(apiData.tipo_habitacion.precio_base_noche),
      bedSummary: apiData.tipo_habitacion.resumen_camas,
      totalBedCapacity: apiData.tipo_habitacion.capacidad_total_camas,
    },
    mainImage: apiData.imagen_principal?.ruta_archivo || "/images/habitacion ejecutiva.webp",
    images: apiData.imagenes?.map((img) => img.ruta_archivo) || ["/images/habitacion ejecutiva.webp"],
    amenities:
      apiData.comodidades?.map((amenity) => ({
        id: amenity.comodidad_id,
        name: amenity.nombre_comodidad,
        description: amenity.descripcion,
        category: amenity.categoria_comodidad,
        icon: amenity.icono.icon,
        iconText: amenity.icono.text,
      })) || [],
    reservedDates:
      apiData.fechas_reserva?.map((fecha) => ({
        start: fecha.fecha_entrada.split("T")[0],
        end: fecha.fecha_salida.split("T")[0],
      })) || [],
    reviews:
      apiData.resenas?.map((review) => ({
        id: review.resena_id,
        name: review.nombre_mostrar,
        rating: review.calificacion,
        comment: review.comentario,
        date: new Date(review.fecha_creacion).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        avatar: `/avatars/${review.nombre_mostrar.toLowerCase().replace(" ", "")}.jpg`,
      })) || [],
    reviewStats: {
      totalReviews: apiData.estadisticas_resenas?.total_resenas || 0,
      averageRating: apiData.estadisticas_resenas?.calificacion_promedio || 0,
      lastReviewDate: apiData.estadisticas_resenas?.fecha_ultima_resena || "",
      ratingDistribution: apiData.estadisticas_resenas?.distribucion_calificaciones || {},
    },
  }
}

export const useRoomDetails = (roomId: string): UseRoomDetailsReturn => {
  const [roomData, setRoomData] = useState<RoomDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Fetching room details for ID:", roomId)

      const response = await fetchRoomDetails(roomId)
      console.log("[v0] API response received:", response)

      if (response.success && response.data) {
        const transformedData = transformApiResponse(response.data)
        console.log("[v0] Transformed room data:", transformedData)
        setRoomData(transformedData)
      } else {
        throw new Error(response.message || "Failed to fetch room details")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("[v0] Error fetching room details:", errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (roomId) {
      fetchData()
    }
  }, [roomId])

  return {
    roomData,
    loading,
    error,
    refetch: fetchData,
  }
}
