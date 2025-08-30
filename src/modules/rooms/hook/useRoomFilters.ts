"use client"

import { useState, useEffect } from "react"
import type { Room, RoomFilters, ViewOption, AmenityOption } from "../types/room.types"

export const useRoomFilters = (allRooms: Room[]) => {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(allRooms)
  const [filterLoading, setFilterLoading] = useState(false)
  const [capacity, setCapacity] = useState<number | undefined>(undefined)
  const [bedType, setBedType] = useState<string | undefined>(undefined)
  const [view, setView] = useState<string | undefined>(undefined)
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const amenitiesList: AmenityOption[] = [
    { id: "Wi-Fi", label: "Wi-Fi", icon: "Wifi" },
    { id: "TV", label: "TV", icon: "Tv" },
    { id: "AC", label: "Aire Acondicionado", icon: "Snowflake" },
    { id: "Minibar", label: "Minibar", icon: "Wine" },
    { id: "Balcony", label: "Balcón", icon: "Mountain" },
    { id: "Jacuzzi", label: "Jacuzzi", icon: "Bath" },
  ]

  const viewOptions: ViewOption[] = [
    {
      value: "Ocean",
      label: "Océano",
      icon: "🌊",
    },
    {
      value: "City",
      label: "Ciudad",
      icon: "🏢",
    },
    {
      value: "Garden",
      label: "Jardín",
      icon: "🌿",
    },
    {
      value: "Mountain",
      label: "Montaña",
      icon: "⛰️",
    },
  ]

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
    setFilterLoading(true)

    // Simular delay de filtrado para mejor UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    let tempRooms = allRooms

    // Use current state if no filters passed
    const currentCapacity = filters?.capacity ?? capacity
    const currentBedType = filters?.bedType ?? bedType
    const currentView = filters?.view ?? view
    const currentPriceRange =
      filters?.priceRange ?? (minPrice || maxPrice ? { min: minPrice || 0, max: maxPrice || 9999 } : undefined)
    const currentAmenities = filters?.amenities ?? (selectedAmenities.length > 0 ? selectedAmenities : undefined)

    if (currentCapacity) {
      tempRooms = tempRooms.filter((room) => room.capacity >= currentCapacity)
    }
    if (currentBedType) {
      tempRooms = tempRooms.filter((room) => room.bedType === currentBedType)
    }
    if (currentView) {
      tempRooms = tempRooms.filter((room) => room.view === currentView)
    }
    if (currentPriceRange) {
      tempRooms = tempRooms.filter((room) => room.price >= currentPriceRange.min && room.price <= currentPriceRange.max)
    }
    if (currentAmenities && currentAmenities.length > 0) {
      tempRooms = tempRooms.filter((room) => currentAmenities.some((amenity) => room.amenities.includes(amenity)))
    }

    setFilteredRooms(tempRooms)
    setFilterLoading(false)
  }

  const clearFilters = () => {
    setCapacity(undefined)
    setBedType(undefined)
    setView(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setSelectedAmenities([])
    setFilteredRooms(allRooms)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters()
    }, 300)
    return () => clearTimeout(timer)
  }, [capacity, bedType, view, minPrice, maxPrice, selectedAmenities])

  // Update filtered rooms when allRooms changes
  useEffect(() => {
    setFilteredRooms(allRooms)
  }, [allRooms])

  return {
    // State
    filteredRooms,
    filterLoading,
    capacity,
    bedType,
    view,
    minPrice,
    maxPrice,
    selectedAmenities,
    isExpanded,

    // Static data
    amenitiesList,
    viewOptions,

    // Actions
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
