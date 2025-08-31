import type React from "react";

export interface Room {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  capacity: number;
  bedType: string; // Now accepts any string from API
  view: string; // Now accepts any string from API
  amenities: object[];
  rating?: number;
  reviewCount?: number;
  isPopular?: boolean;
  discount?: number;
  isAvailable?: boolean;
}

export interface RoomCardProps extends Room {
  onClick?: () => void;
}

export interface ApiRoom {
  habitacion_id: number;
  numero_habitacion: string;
  estado: string;
  piso: number;
  vista: string;
  tipo_habitacion: {
    tipo_habitacion_id: number;
    nombre_tipo: string;
    descripcion: string;
    capacidad_maxima: number;
    precio_base_noche: string;
    cama_principal: {
      nombre_tipo_cama: string;
      dimensiones: string;
    };
  };
  ruta_archivo: string;
  imagenes: Array<{
    ruta_archivo: string;
    es_principal: number;
  }>;
  comodidades: Array<{
    nombre_comodidad: string;
    icono: {
      icon: string;
      text: string;
    };
  }>;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiRoom[];
}

export interface RoomFilters {
  capacity?: number;
  bedType?: string;
  view?: string;
  priceRange?: { min: number; max: number };
  amenities?: string[];
}

export interface RoomFiltersProps {
  onFilterChange: (filters: RoomFilters) => void;
}

export interface ViewOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface AmenityOption {
  id: string;
  label: string;
  icon: string;
}

export interface BookingConfig {
  maxGuests: number;
  minNights: number;
  maxNights: number;
}

export interface ReservedPeriod {
  start: string;
  end: string;
  reason: string;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  nights: number;
}

export interface ViewIconsMap {
  [key: string]: React.ReactNode;
}

export interface ViewLabelsMap {
  [key: string]: string;
}

export interface ApiAmenity {
  comodidad_id: number;
  nombre_comodidad: string;
  descripcion: string;
  categoria_comodidad: string;
  icon: string;
  text: string;
  habitacion_id: number;
  numero_habitacion: string;
}

export interface AmenitiesApiResponse {
  success: boolean;
  message: string;
  data: ApiAmenity[];
}

export interface ApiBedType {
  tipo_cama_id: number;
  nombre_tipo_cama: string;
  descripcion: string;
  capacidad_personas: number;
  dimensiones: string;
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface BedTypesApiResponse {
  success: boolean;
  message: string;
  data: ApiBedType[];
}

export interface ApiRoomView {
  vista_id: number;
  nombre_vista: string;
  descripcion: string;
  precio_adicional: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface RoomViewsApiResponse {
  success: boolean;
  message: string;
  data: ApiRoomView[];
}
