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
  amenities: Amenity[];
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

export interface RoomFiltersType {
  capacity?: number;
  bedType?: string;
  view?: string;
  priceRange?: { min: number; max: number };
  amenities?: string[];
}

export interface RoomFiltersProps {
  onFilterChange: (filters: RoomFiltersType) => void;
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
  id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  serviceFee: number;
  cleaningFee: number;
  total: number;
  bookingDate: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentMethod: string;
  paymentDetails?: any;
  guestInfo?: {
    name: string;
    email: string;
    phone: string;
    document?: string;
    notes?: string;
  };
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
export interface View {
  value: string; // o el tipo adecuado
  label: string; // o el tipo adecuado
}

export interface Amenity {
  icono: string; // Aquí defines el tipo de icono
  nombre: string; // Aquí defines el nombre de la amenidad
}
// Definición de la interfaz para la reseña
export interface Review {
  id: number;          // Identificador único de la reseña
  name: string;       // Nombre del autor de la reseña
  avatar?: string;    // URL de la imagen del avatar del autor (opcional)
  rating: number;     // Calificación dada por el autor (1 a 5)
  comment: string;    // Comentario de la reseña
  date: string;       // Fecha en que se publicó la reseña (en formato ISO)
}


export interface EmptyStateProps {
  type: "error" | "no-results";
  onAction: () => void;
  actionLabel: string;
}

export interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}
export interface ResultsInfoProps {
  startIndex: number;
  endIndex: number;
  totalItems: number;
}
export interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (review: Review) => void;
}
