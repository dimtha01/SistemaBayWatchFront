export interface RoomDetailsData {
  id: number
  roomNumber: string
  status: string
  floor: number
  view: string
  roomType: {
    id: number
    name: string
    description: string
    maxCapacity: number
    basePrice: number
    bedSummary: string
    totalBedCapacity: number
  }
  mainImage: string
  images: string[]
  amenities: Array<{
    id: number
    name: string
    description: string
    category: string
    icon: string
    iconText: string
  }>
  reservedDates: Array<{
    start: string
    end: string
  }>
  reviews: Array<{
    id: number
    name: string
    rating: number
    comment: string
    date: string
    avatar?: string
  }>
  reviewStats: {
    totalReviews: number
    averageRating: number
    lastReviewDate: string
    ratingDistribution: {
      [key: string]: number
    }
  }
}

export interface UseRoomDetailsReturn {
  roomData: RoomDetailsData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}
export  interface ApiRoomDetailsResponse {
  success: boolean
  message: string
  data: {
    habitacion_id: number
    numero_habitacion: string
    estado: string
    piso: number
    vista: string
    tipo_habitacion: {
      tipo_habitacion_id: number
      nombre_tipo: string
      descripcion: string
      capacidad_maxima: number
      precio_base_noche: string
      camas: Array<{
        tipo_cama_id: number
        nombre_tipo_cama: string
        descripcion: string
        capacidad_personas: number
        dimensiones: string
        estado: string
        cantidad: number
        es_principal: number
        capacidad_total: number
      }>
      cama_principal: {
        tipo_cama_id: number
        nombre_tipo_cama: string
        descripcion: string
        capacidad_personas: number
        dimensiones: string
        estado: string
        cantidad: number
        es_principal: number
        capacidad_total: number
      }
      capacidad_total_camas: number
      resumen_camas: string
    }
    imagen_principal: {
      imagen_id: number
      nombre_archivo: string
      ruta_archivo: string
      es_principal: number
      orden_visualizacion: number
    }
    imagenes: Array<{
      imagen_id: number
      nombre_archivo: string
      ruta_archivo: string
      es_principal: number
      orden_visualizacion: number
    }>
    comodidades: Array<{
      comodidad_id: number
      nombre_comodidad: string
      descripcion: string
      categoria_comodidad: string
      estado: string
      fecha_instalacion: string
      notas: string
      icono: {
        id_icon: number
        icon: string
        text: string
        descripcion: string
        estado: string
      }
    }>
    fechas_reserva: Array<{
      fecha_entrada: string
      fecha_salida: string
    }>
    resenas: Array<{
      resena_id: number
      usuario_id: number | null
      nombre_mostrar: string
      tipo_usuario: string
      calificacion: number
      comentario: string
      fecha_creacion: string
      fecha_relativa: string
    }>
    estadisticas_resenas: {
      total_resenas: number
      calificacion_promedio: number
      fecha_ultima_resena: string
      distribucion_calificaciones: {
        [key: string]: number
      }
    }
  }
}
