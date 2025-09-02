// src/modules/Rooms/hooks/useRooms.ts
import { useState, useMemo } from 'react';
import type { Room, RoomStatus } from '../types/room.types';

const initialRooms: Room[] = [
  { id: 1, name: 'Suite Presidencial 101', type: 'Suite', capacity: 4, price: '$350', status: 'Disponible', description: 'Suite de lujo con vista panorámica al mar, jacuzzi privado y servicio de mayordomo 24/7' },
  { id: 2, name: 'Habitación Deluxe 102', type: 'Doble', capacity: 2, price: '$180', status: 'Ocupada', description: 'Habitación elegante con balcón privado y vista al jardín' },
  { id: 3, name: 'Habitación Standard 103', type: 'Individual', capacity: 1, price: '$120', status: 'Disponible', description: 'Habitación cómoda y funcional para huéspedes individuales' },
  { id: 4, name: 'Suite Familiar 104', type: 'Familiar', capacity: 6, price: '$280', status: 'Disponible', description: 'Amplia suite con dos habitaciones conectadas, ideal para familias' },
  { id: 5, name: 'Habitación Superior 105', type: 'Doble', capacity: 2, price: '$200', status: 'Mantenimiento', description: 'Habitación renovada con amenidades premium' },
  { id: 6, name: 'Habitación Económica 106', type: 'Individual', capacity: 1, price: '$95', status: 'Disponible', description: 'Opción económica sin comprometer la comodidad' },
  { id: 7, name: 'Suite Ejecutiva 107', type: 'Suite', capacity: 3, price: '$320', status: 'Disponible', description: 'Suite con área de trabajo, sala de reuniones privada' },
  { id: 8, name: 'Habitación Premium 108', type: 'Doble', capacity: 2, price: '$220', status: 'Ocupada', description: 'Habitación con acabados de lujo y tecnología avanzada' },
  { id: 9, name: 'Habitación Estándar Plus 109', type: 'Individual', capacity: 1, price: '$140', status: 'Disponible', description: 'Habitación mejorada con escritorio y zona de estar' },
  { id: 10, name: 'Suite Nupcial 110', type: 'Suite', capacity: 2, price: '$450', status: 'Disponible', description: 'Suite romántica con decoración especial y servicios exclusivos' }
];

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState<RoomStatus>('all');

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = !searchTerm || 
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = currentFilter === 'all' || room.status === currentFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [rooms, searchTerm, currentFilter]);

  const addRoom = (roomData: Omit<Room, 'id'>) => {
    const newRoom: Room = {
      ...roomData,
      id: Math.max(...rooms.map(r => r.id)) + 1,
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (id: number, roomData: Partial<Room>) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { ...room, ...roomData } : room
    ));
  };

  const deleteRoom = (id: number) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const getRoomById = (id: number) => {
    return rooms.find(room => room.id === id);
  };

  return {
    rooms,
    filteredRooms,
    searchTerm,
    setSearchTerm,
    currentFilter,
    setCurrentFilter,
    addRoom,
    updateRoom,
    deleteRoom,
    getRoomById
  };
};
