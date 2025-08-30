import { useState, useEffect } from "react"
import { fetchRooms } from "../services"
import type { Room } from "../types"

export const useRooms = () => {
  const [allRoomsData, setAllRoomsData] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRoomsData = async () => {
    try {
      setLoading(true)
      setError(null)
      const rooms = await fetchRooms()
      setAllRoomsData(rooms)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al cargar las habitaciones")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoomsData()
  }, [])

  const retry = () => {
    fetchRoomsData()
  }

  return {
    allRoomsData,
    loading,
    error,
    retry,
  }
}