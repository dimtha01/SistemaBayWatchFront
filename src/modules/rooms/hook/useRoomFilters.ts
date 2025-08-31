"use client"

import { useState, useEffect, useCallback } from "react"
import type { Room, RoomFilters, ViewOption, AmenityOption } from "../types/room.types"
import { fetchAmenities } from "../services/amenities.service"
import { fetchBedTypes } from "../services/bedTypes.service"
import { fetchRoomViews } from "../services/roomViews.service"
import { fetchRooms } from "../services/room.service"

export const useRoomFilters = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [filterLoading, setFilterLoading] = useState(false)
  const [capacity, setCapacity] = useState<number | undefined>(undefined)
  const [bedType, setBedType] = useState<string | undefined>(undefined)
  const [view, setView] = useState<string | undefined>(undefined)
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [amenitiesList, setAmenitiesList] = useState<AmenityOption[]>([])
  const [amenitiesLoading, setAmenitiesLoading] = useState(true)
  const [bedTypesList, setBedTypesList] = useState<{ id: string; label: string }[]>([])
  const [bedTypesLoading, setBedTypesLoading] = useState(true)
  const [viewOptions, setViewOptions] = useState<ViewOption[]>([])
  const [viewsLoading, setViewsLoading] = useState(true)

  const loadRoomsWithFilters = useCallback(async (filters?: Partial<RoomFilters>) => {
    console.log("[v0] loadRoomsWithFilters called with filters:", filters)
    setFilterLoading(true)
    try {
      const roomsData = await fetchRooms(filters)
      console.log("[v0] fetchRooms returned:", roomsData.length, "rooms")
      setRooms(roomsData)
      setFilteredRooms(roomsData)
      console.log("[v0] filteredRooms updated with:", roomsData.length, "rooms")
    } catch (error) {
      console.error("Failed to load rooms:", error)
      setRooms([])
      setFilteredRooms([])
    } finally {
      setFilterLoading(false)
    }
  }, [])

  // Load initial data only once on mount
  useEffect(() => {
    console.log("[v0] Initial load of rooms")
    loadRoomsWithFilters()
  }, []) // Empty dependency array to run only once

  useEffect(() => {
    const loadAmenities = async () => {
      setAmenitiesLoading(true)
      try {
        const amenities = await fetchAmenities()
        setAmenitiesList(amenities)
      } catch (error) {
        console.error("Failed to load amenities:", error)
      } finally {
        setAmenitiesLoading(false)
      }
    }

    loadAmenities()
  }, [])

  useEffect(() => {
    const loadBedTypes = async () => {
      setBedTypesLoading(true)
      try {
        const bedTypes = await fetchBedTypes()
        setBedTypesList(bedTypes)
      } catch (error) {
        console.error("Failed to load bed types:", error)
      } finally {
        setBedTypesLoading(false)
      }
    }

    loadBedTypes()
  }, [])

  useEffect(() => {
    const loadRoomViews = async () => {
      setViewsLoading(true)
      try {
        const views = await fetchRoomViews()
        const viewsWithIcons = views.map((view: any) => ({
          value: view.value,
          label: view.label,
          icon: getViewIcon(view.label),
        }))
        setViewOptions(viewsWithIcons)
      } catch (error) {
        console.error("Failed to load room views:", error)
        setViewOptions([
          { value: "Ocean", label: "Océano", icon: "🌊" },
          { value: "City", label: "Ciudad", icon: "🏢" },
          { value: "Garden", label: "Jardín", icon: "🌿" },
          { value: "Mountain", label: "Montaña", icon: "⛰️" },
        ])
      } finally {
        setViewsLoading(false)
      }
    }

    loadRoomViews()
  }, [])

  const getViewIcon = (viewName: string) => {
    const lowerName = viewName.toLowerCase()
    if (lowerName.includes("mar") || lowerName.includes("océano") || lowerName.includes("ocean")) return "🌊"
    if (lowerName.includes("ciudad") || lowerName.includes("city")) return "🏢"
    if (lowerName.includes("jardín") || lowerName.includes("garden")) return "🌿"
    if (lowerName.includes("montaña") || lowerName.includes("mountain")) return "⛰️"
    if (lowerName.includes("piscina") || lowerName.includes("pool")) return "🏊"
    return "🏨"
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (capacity) count++
    if (bedType) count++
    if (view) count++
    if (minPrice || maxPrice) count++
    if (selectedAmenities.length > 0) count++
    return count
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const removeFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case "capacity":
        setCapacity(undefined)
        break
      case "bedType":
        setBedType(undefined)
        break
      case "view":
        setView(undefined)
        break
      case "price":
        setMinPrice(undefined)
        setMaxPrice(undefined)
        break
      case "amenity":
        if (value) {
          setSelectedAmenities((prev) => prev.filter((id) => id !== value))
        }
        break
    }
  }

  const applyFilters = async (filters?: RoomFilters) => {
    const currentCapacity = filters?.capacity ?? capacity
    const currentBedType = filters?.bedType ?? bedType
    const currentView = filters?.view ?? view
    const currentPriceRange =
      filters?.priceRange ?? (minPrice || maxPrice ? { min: minPrice || 0, max: maxPrice || 9999 } : undefined)
    const currentAmenities = filters?.amenities ?? (selectedAmenities.length > 0 ? selectedAmenities : undefined)

    const apiFilters: Partial<RoomFilters> = {}

    if (currentCapacity) apiFilters.capacity = currentCapacity
    if (currentBedType) apiFilters.bedType = currentBedType
    if (currentView) apiFilters.view = currentView
    if (currentPriceRange) apiFilters.priceRange = currentPriceRange
    if (currentAmenities && currentAmenities.length > 0) apiFilters.amenities = currentAmenities

    await loadRoomsWithFilters(apiFilters)
  }

  const clearFilters = () => {
    setCapacity(undefined)
    setBedType(undefined)
    setView(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setSelectedAmenities([])
    loadRoomsWithFilters()
  }

  // Now filters only apply when applyFilters() is called manually from the button

  return {
    rooms,
    filteredRooms,
    filterLoading,
    capacity,
    bedType,
    view,
    minPrice,
    maxPrice,
    selectedAmenities,
    isExpanded,
    amenitiesList,
    viewOptions,
    amenitiesLoading,
    bedTypesList,
    bedTypesLoading,
    viewsLoading,
    setCapacity,
    setBedType,
    setView,
    setMinPrice,
    setMaxPrice,
    setSelectedAmenities,
    setIsExpanded,
    toggleAmenity,
    removeFilter,
    applyFilters,
    clearFilters,
    getActiveFiltersCount,
  }
}
