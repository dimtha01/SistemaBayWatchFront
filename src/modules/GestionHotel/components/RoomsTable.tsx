// src/modules/Rooms/components/RoomsTable.tsx
import React, { useState, useMemo } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type ColumnDef,
//   flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { 
  Users, 
  Edit, 
  Trash2, 
  GripVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import type { Room } from '../types/room.types';

interface RoomsTableProps {
  rooms: Room[];
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (room: Room) => void;
  onReorderRooms?: (rooms: Room[]) => void;
}

// Componente para el handle de drag
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <button
      {...attributes}
      {...listeners}
      className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors cursor-grab active:cursor-grabbing"
    >
      <GripVertical className="w-4 h-4" />
      <span className="sr-only">Arrastrar para reordenar</span>
    </button>
  );
}

// Fila draggable
function DraggableRow({ 
  row, 
  onEditRoom, 
  onDeleteRoom 
}: { 
  row: any;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (room: Room) => void;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  const getRoomTypeGradient = (type: string) => {
    switch(type) {
      case 'Suite': return 'from-purple-500 to-purple-600';
      case 'Presidencial': return 'from-yellow-500 to-yellow-600';
      case 'Familiar': return 'from-green-500 to-green-600';
      case 'Doble': return 'from-blue-500 to-blue-600';
      case 'Individual': return 'from-gray-500 to-gray-600';
      default: return 'from-[#8C0303] to-[#F20C1F]';
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Disponible': return 'bg-gradient-to-r from-green-600 to-green-500';
      case 'Ocupada': return 'bg-gradient-to-r from-[#F20C1F] to-[#8C0303]';
      case 'Mantenimiento': return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
      case 'Fuera de servicio': return 'bg-gradient-to-r from-gray-600 to-gray-500';
      default: return 'bg-[#8C0303]/50';
    }
  };

  const room = row.original;

  return (
    <tr
      ref={setNodeRef}
      className={`border-t border-[#8C0303]/30 hover:bg-[#8C0303]/10 transition-all duration-200 ${
        isDragging ? 'opacity-50 z-50' : ''
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {/* Drag Handle */}
      <td className="px-4 py-4 w-12">
        <DragHandle id={room.id} />
      </td>

      {/* Habitación */}
      <td className="px-6 py-4 text-white text-sm font-medium">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${getRoomTypeGradient(room.type)} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
            {room.name.charAt(0)}{room.name.split(' ')[1]?.charAt(0) || ''}
          </div>
          <div>
            <div className="font-semibold">{room.name}</div>
            <div className="text-gray-400 text-xs">{room.description.substring(0, 50)}...</div>
          </div>
        </div>
      </td>

      {/* Tipo */}
      <td className="px-6 py-4 text-gray-300 text-sm">
        <span className="px-3 py-1 bg-[#8C0303]/20 rounded-full text-xs font-medium border border-[#8C0303]/30">
          {room.type}
        </span>
      </td>

      {/* Capacidad */}
      <td className="px-6 py-4 text-gray-300 text-sm">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{room.capacity}</span>
        </div>
      </td>

      {/* Precio */}
      <td className="px-6 py-4 text-gray-300 text-sm">
        <div className="font-semibold text-green-400">{room.price}</div>
        <div className="text-xs text-gray-500">por noche</div>
      </td>

      {/* Estado */}
      <td className="px-6 py-4 text-sm">
        <span className={`flex items-center justify-center px-3 py-2 ${getStatusClass(room.status)} text-white text-xs font-semibold rounded-lg min-w-[100px]`}>
          <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></div>
          {room.status}
        </span>
      </td>

      {/* Acciones */}
      <td className="px-6 py-4 text-gray-300 text-sm">
        <div className="flex gap-3">
          <button
            onClick={() => onEditRoom(room)}
            className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200 text-xs font-medium flex items-center gap-1"
          >
            <Edit className="w-3 h-3" />
            Editar
          </button>
          <button
            onClick={() => onDeleteRoom(room)}
            className="px-3 py-2 bg-[#F20C1F]/20 hover:bg-[#F20C1F]/30 text-[#F27E7E] hover:text-[#F20C1F] rounded-lg transition-all duration-200 text-xs font-medium flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

export const RoomsTable: React.FC<RoomsTableProps> = ({
  rooms,
  onEditRoom,
  onDeleteRoom,
  onReorderRooms
}) => {
  const [data, setData] = useState(() => rooms);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Actualizar data cuando cambien las rooms
  React.useEffect(() => {
    setData(rooms);
  }, [rooms]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  // Definición de columnas (simplificada para el drag & drop)
  const columns: ColumnDef<Room>[] = useMemo(() => [], []);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        const newData = arrayMove(data, oldIndex, newIndex);
        
        // Notificar el cambio de orden si se proporciona la función
        if (onReorderRooms) {
          onReorderRooms(newData);
        }
        
        return newData;
      });
    }
  }

  const currentPageData = table.getRowModel().rows.map(row => row.original);

  if (data.length === 0) {
    return (
      <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl overflow-hidden">
        <div className="px-6 py-12 text-center text-gray-400">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-[#8C0303]/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 opacity-50" />
            </div>
            <p className="text-lg font-medium">No se encontraron habitaciones</p>
            <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#8C0303]/30 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-[#8C0303]/20 backdrop-blur-sm">
                <th className="px-4 py-4 w-12"></th>
                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Habitación</th>
                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Tipo</th>
                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Capacidad</th>
                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Precio/Noche</th>
                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Estado</th>
                <th className="px-6 py-4 text-left text-white text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {currentPageData.map((room, index) => (
                  <DraggableRow
                    key={room.id}
                    row={{ original: room }}
                    onEditRoom={onEditRoom}
                    onDeleteRoom={onDeleteRoom}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#8C0303]/30 bg-[#8C0303]/10">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Filas por página:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-[#0D0D0D] border border-[#8C0303]/30 rounded px-2 py-1 text-white text-sm"
          >
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()} ({data.length} habitaciones)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#8C0303]/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
