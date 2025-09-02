// src/modules/Rooms/components/RoomsManagement.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRooms } from '../hooks/useRooms';
import { useNotifications } from '../hooks/useNotifications';
import { SearchAndFilters } from './SearchAndFilters';
import { RoomsTable } from './RoomsTable';
import { RoomModal } from './RoomModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { Notification } from './Notification';
import type { Room } from '../types/room.types';

export const RoomsManagement: React.FC = () => {
  const {
    filteredRooms,
    searchTerm,
    setSearchTerm,
    currentFilter,
    setCurrentFilter,
    addRoom,
    updateRoom,
    deleteRoom,
    getRoomById
  } = useRooms();

  const { notifications, showNotification, removeNotification } = useNotifications();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setIsModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setRoomToDelete(room);
    setIsDeleteModalOpen(true);
  };

  const handleSaveRoom = (roomData: Omit<Room, 'id'>) => {
    addRoom(roomData);
    setIsModalOpen(false);
    showNotification('✨ Habitación agregada exitosamente', 'success');
  };

  const handleUpdateRoom = (id: number, roomData: Partial<Room>) => {
    updateRoom(id, roomData);
    setIsModalOpen(false);
    showNotification('✅ Habitación actualizada exitosamente', 'success');
  };

  const handleConfirmDelete = () => {
    if (roomToDelete) {
      deleteRoom(roomToDelete.id);
      setIsDeleteModalOpen(false);
      setRoomToDelete(null);
      showNotification('🗑️ Habitación eliminada exitosamente', 'success');
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRoomToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl p-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight">
              Gestión de Habitaciones
            </h1>
            <p className="text-gray-300 text-sm font-normal leading-normal">
              Administra las habitaciones de tus propiedades con facilidad
            </p>
          </div>
          <button
            onClick={handleAddRoom}
            className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-gradient-to-r from-[#F20C1F] to-[#8C0303] hover:from-[#F20C0C] hover:to-[#F20C1F] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="truncate">Agregar Habitación</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      {/* Rooms Table */}
      <RoomsTable
        rooms={filteredRooms}
        onEditRoom={handleEditRoom}
        onDeleteRoom={handleDeleteRoom}
      />

      {/* Modals */}
      <RoomModal
        isOpen={isModalOpen}
        room={selectedRoom}
        onSave={handleSaveRoom}
        onUpdate={handleUpdateRoom}
        onClose={handleCloseModal}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        room={roomToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Notifications */}
      <div className="fixed top-6 right-6 z-50 space-y-3">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};
