import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  RotateCcw,
  Users,
  Bed,
  Eye,
  DollarSign,
  Filter,
  X,
  Waves,
  Building,
  Leaf,
  Mountain,
} from "lucide-react"
import { useState, useEffect } from "react"
import type { RoomFiltersProps, ViewOption, AmenityOption } from "../../types/room.types"

export const RoomFilters = ({ onFilterChange }: RoomFiltersProps) => {
  const [capacity, setCapacity] = useState<number | undefined>(undefined)
  const [bedType, setBedType] = useState<string | undefined>(undefined)
  const [view, setView] = useState<string | undefined>(undefined)
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const amenitiesList: AmenityOption[] = [
    { id: "Wi-Fi", label: "Wi-Fi", icon: "📶" },
    { id: "TV", label: "TV", icon: "📺" },
    { id: "AC", label: "Aire Acondicionado", icon: "❄️" },
    { id: "Minibar", label: "Minibar", icon: "🍾" },
    { id: "Balcony", label: "Balcón", icon: "🏞️" },
    { id: "Jacuzzi", label: "Jacuzzi", icon: "🛁" },
  ]

  const viewOptions: ViewOption[] = [
    {
      value: "Ocean",
      label: "Océano",
      icon: <Waves className="w-4 h-4 text-[#020659]" />,
    },
    {
      value: "City",
      label: "Ciudad",
      icon: <Building className="w-4 h-4 text-[#020659]" />,
    },
    {
      value: "Garden",
      label: "Jardín",
      icon: <Leaf className="w-4 h-4 text-[#020659]" />,
    },
    {
      value: "Mountain",
      label: "Montaña",
      icon: <Mountain className="w-4 h-4 text-[#020659]" />,
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

  const handleApplyFilters = () => {
    const priceRange =
      minPrice || maxPrice
        ? {
            min: minPrice || 0,
            max: maxPrice || 9999,
          }
        : undefined

    onFilterChange({
      capacity,
      bedType,
      view,
      priceRange,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
    })
  }

  const handleResetFilters = () => {
    setCapacity(undefined)
    setBedType(undefined)
    setView(undefined)
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setSelectedAmenities([])
    onFilterChange({})
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

  useEffect(() => {
    const timer = setTimeout(() => {
      handleApplyFilters()
    }, 300)
    return () => clearTimeout(timer)
  }, [capacity, bedType, view, minPrice, maxPrice, selectedAmenities])

  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#020659]/10 mb-8 overflow-hidden">
      {/* Header with Filter Toggle */}
      <div className="bg-gradient-to-r from-[#F20C0C]/10 to-[#F20C1F]/10 px-6 py-4 border-b border-[#F20C0C]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Filter className="w-5 h-5 text-[#F20C1F]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0D0D0D]">Filtros de Búsqueda</h3>
              <p className="text-sm text-[#020659]">Encuentra tu habitación perfecta</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="bg-[#F20C1F]/10 text-[#F20C1F]">
                {getActiveFiltersCount()} filtro
                {getActiveFiltersCount() > 1 ? "s" : ""} activo
                {getActiveFiltersCount() > 1 ? "s" : ""}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#F20C1F] hover:bg-[#F20C1F]/10"
            >
              {isExpanded ? "Menos filtros" : "Más filtros"}
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters Tags */}
      {getActiveFiltersCount() > 0 && (
        <div className="px-6 py-3 bg-[#020659]/5 border-b border-[#020659]/10">
          <div className="flex flex-wrap gap-2">
            {capacity && (
              <Badge variant="outline" className="flex items-center gap-1 bg-white">
                <Users className="w-3 h-3 text-[#F20C0C]" />
                {capacity} personas
                <button onClick={() => removeFilter("capacity")} className="ml-1 hover:bg-gray-100 rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {bedType && (
              <Badge variant="outline" className="flex items-center gap-1 bg-white">
                <Bed className="w-3 h-3 text-[#F20C0C]" />
                Cama {bedType}
                <button onClick={() => removeFilter("bedType")} className="ml-1 hover:bg-gray-100 rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {view && (
              <Badge variant="outline" className="flex items-center gap-1 bg-white">
                <Eye className="w-3 h-3 text-[#F20C0C]" />
                Vista {viewOptions.find((v) => v.value === view)?.label}
                <button onClick={() => removeFilter("view")} className="ml-1 hover:bg-gray-100 rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {(minPrice || maxPrice) && (
              <Badge variant="outline" className="flex items-center gap-1 bg-white">
                <DollarSign className="w-3 h-3 text-[#F20C0C]" />${minPrice || 0} - ${maxPrice || "∞"}
                <button onClick={() => removeFilter("price")} className="ml-1 hover:bg-gray-100 rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedAmenities.map((amenity) => (
              <Badge key={amenity} variant="outline" className="flex items-center gap-1 bg-white">
                <span>{amenitiesList.find((a) => a.id === amenity)?.icon}</span>
                {amenitiesList.find((a) => a.id === amenity)?.label}
                <button
                  onClick={() => removeFilter("amenity", amenity)}
                  className="ml-1 hover:bg-gray-100 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Main Filters */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Capacity */}
          <div className="space-y-2">
            <label htmlFor="capacity" className="flex items-center gap-2 text-sm font-medium text-[#0D0D0D]">
              <Users className="w-4 h-4 text-[#F20C0C]" />
              Capacidad
            </label>
            <Input
              id="capacity"
              type="number"
              min="1"
              max="10"
              placeholder="Ej. 2"
              value={capacity || ""}
              onChange={(e) => setCapacity(e.target.value ? Number.parseInt(e.target.value) : undefined)}
              className="w-full focus:ring-[#F20C0C] focus:border-[#F20C0C]"
            />
          </div>

          {/* Bed Type */}
          <div className="space-y-2">
            <label htmlFor="bedType" className="flex items-center gap-2 text-sm font-medium text-[#0D0D0D]">
              <Bed className="w-4 h-4 text-[#F20C0C]" />
              Tipo de Cama
            </label>
            <Select onValueChange={setBedType} value={bedType}>
              <SelectTrigger id="bedType" className="w-full focus:ring-[#F20C0C] focus:border-[#F20C0C]">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="King">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#020659]" />
                    King
                  </div>
                </SelectItem>
                <SelectItem value="Queen">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#020659]" />
                    Queen
                  </div>
                </SelectItem>
                <SelectItem value="Twin">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#020659]" />
                    Twin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View */}
          <div className="space-y-2">
            <label htmlFor="view" className="flex items-center gap-2 text-sm font-medium text-[#0D0D0D]">
              <Eye className="w-4 h-4 text-[#F20C0C]" />
              Vista
            </label>
            <Select onValueChange={setView} value={view}>
              <SelectTrigger id="view" className="w-full focus:ring-[#F20C0C] focus:border-[#F20C0C]">
                <SelectValue placeholder="Seleccionar vista" />
              </SelectTrigger>
              <SelectContent>
                {viewOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#0D0D0D]">
              <DollarSign className="w-4 h-4 text-[#F20C0C]" />
              Rango de Precio
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice || ""}
                onChange={(e) => setMinPrice(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                className="w-full focus:ring-[#F20C0C] focus:border-[#F20C0C]"
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice || ""}
                onChange={(e) => setMaxPrice(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                className="w-full focus:ring-[#F20C0C] focus:border-[#F20C0C]"
              />
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="border-t border-[#020659]/10 pt-4 mt-4">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-[#0D0D0D]">
                <span>🏨</span>
                Amenidades
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 text-sm ${
                      selectedAmenities.includes(amenity.id)
                        ? "bg-[#F20C1F]/10 border-[#F20C1F]/20 text-[#F20C1F]"
                        : "bg-white border-[#020659]/20 text-[#020659] hover:bg-[#020659]/5"
                    }`}
                  >
                    <span className="text-lg">{amenity.icon}</span>
                    <span className="font-medium">{amenity.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-[#020659]/10">
          <Button
            onClick={handleApplyFilters}
            className="flex-1 bg-gradient-to-r from-[#F20C0C] to-[#F20C1F] hover:from-[#D10000] hover:to-[#B20000] text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar Habitaciones
          </Button>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="flex-1 border-[#020659]/30 text-[#020659] hover:bg-[#020659]/5 transition-colors bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
