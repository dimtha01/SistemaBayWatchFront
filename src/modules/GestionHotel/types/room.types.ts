export interface Room {
  id: number;
  name: string;
  type: 'Individual' | 'Doble' | 'Suite' | 'Familiar' | 'Presidencial';
  capacity: number;
  price: string;
  status: 'Disponible' | 'Ocupada' | 'Mantenimiento' | 'Fuera de servicio';
  description: string;
  images?: string[];
}

export type RoomStatus = 'all' | 'Disponible' | 'Ocupada' | 'Mantenimiento' | 'Fuera de servicio';

export type NotificationType = 'success' | 'error' | 'info';
