import type React from "react";

export interface Room {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  capacity: number;
  bedType: "King" | "Queen" | "Twin" | "Double" | "Single";
  view: "Ocean" | "City" | "Garden" | "Mountain" | "Pool";
  amenities: string[];
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
