import React, { useState, useEffect } from 'react';
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
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Search, Plus, Edit, Trash2, Users, Eye, X, ArrowLeft, ArrowRight, Upload, Image as ImageIcon,
  ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, GripVertical, Columns, Wrench
} from 'lucide-react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"

// Interfaces TypeScript siguiendo mejores prácticas
interface Room {
  id: number;
  name: string;
  type: 'Individual' | 'Doble' | 'Suite' | 'Familiar' | 'Presidencial';
  capacity: number;
  price: string;
  status: 'Disponible' | 'Ocupada' | 'Mantenimiento' | 'Fuera de servicio';
  description: string;
  floor: string;
  amenities: string;
  images?: string[];
}

interface FilterState {
  search: string;
  status: string;
}

interface ModalState {
  isOpen: boolean;
  isEditing: boolean;
  currentStep: number;
  room: Partial<Room>;
}

// ✅ Componente para el handle de arrastre
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <button
      {...attributes}
      {...listeners}
      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-grab active:cursor-grabbing"
    >
      <GripVertical className="w-4 h-4" />
      <span className="sr-only">Arrastrar para reordenar</span>
    </button>
  )
}

// ✅ Componente de fila arrastrable
function DraggableRow({ row, children }: { row: Row<Room>, children: React.ReactNode }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <tr
      ref={setNodeRef}
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        isDragging ? 'opacity-80 z-10 shadow-lg' : ''
      } ${row.getIsSelected() ? 'bg-red-50' : ''}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {children}
    </tr>
  )
}

// Componente principal
export const RoomsPage: React.FC = () => {
  // Estado principal
  const [rooms, setRooms] = useState<Room[]>([
    { 
      id: 1, 
      name: 'Suite Presidencial 101', 
      type: 'Suite', 
      capacity: 4, 
      price: '$350', 
      status: 'Disponible', 
      description: 'Suite de lujo con vista panorámica al mar, jacuzzi privado y servicio de mayordomo 24/7',
      floor: '1',
      amenities: 'Jacuzzi, Vista al mar, Mayordomo',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center'] 
    },
    { 
      id: 2, 
      name: 'Habitación Deluxe 102', 
      type: 'Doble', 
      capacity: 2, 
      price: '$180', 
      status: 'Ocupada', 
      description: 'Habitación elegante con balcón privado y vista al jardín',
      floor: '1',
      amenities: 'Balcón, Vista al jardín',
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center'] 
    },
    { 
      id: 3, 
      name: 'Habitación Standard 103', 
      type: 'Individual', 
      capacity: 1, 
      price: '$120', 
      status: 'Disponible', 
      description: 'Habitación cómoda y funcional para huéspedes individuales',
      floor: '1',
      amenities: 'WiFi, TV, Aire acondicionado',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center'] 
    },
    { 
      id: 4, 
      name: 'Suite Familiar 104', 
      type: 'Familiar', 
      capacity: 6, 
      price: '$280', 
      status: 'Disponible', 
      description: 'Amplia suite con dos habitaciones conectadas, ideal para familias',
      floor: '1',
      amenities: 'Dos habitaciones, Cocina',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center'] 
    },
    { 
      id: 5, 
      name: 'Habitación Superior 105', 
      type: 'Doble', 
      capacity: 2, 
      price: '$200', 
      status: 'Mantenimiento', 
      description: 'Habitación renovada con amenidades premium',
      floor: '1',
      amenities: 'Amenidades premium',
      images: ['https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop&crop=center'] 
    }
  ]);

  // Estados para la tabla avanzada
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [filters, setFilters] = useState<FilterState>({ search: '', status: 'all' });
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    isEditing: false,
    currentStep: 1,
    room: {}
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; room: Room | null }>({
    isOpen: false,
    room: null
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // ✅ Estados para la tabla avanzada
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // ✅ Configuración de drag and drop
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => rooms?.map(({ id }) => id) || [],
    [rooms]
  )

  // Efectos para filtrado automático
  useEffect(() => {
    let filtered = rooms;

    if (filters.search) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        room.type.toLowerCase().includes(filters.search.toLowerCase()) ||
        room.status.toLowerCase().includes(filters.search.toLowerCase()) ||
        room.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(room => room.status === filters.status);
    }

    setFilteredRooms(filtered);
  }, [rooms, filters]);

  // ✅ Definición de columnas para la tabla avanzada
  const columns: ColumnDef<Room>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
      size: 50,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected())
            }
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Habitación",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <div className={getRoomTypeIcon(row.original.type)}>
              {row.original.name.charAt(0)}{row.original.name.split(' ')[1]?.charAt(0) || ''}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{row.original.name}</div>
              <div className="text-gray-500 text-xs">Piso {row.original.floor}</div>
            </div>
          </div>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold border ${getStatusStyles(row.original.status)}`}>
          <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "capacity",
      header: "Capacidad",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-gray-700">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{row.original.capacity}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Precio/Noche",
      cell: ({ row }) => (
        <div className="font-semibold text-green-600">{row.original.price}</div>
      ),
    },
    {
      accessorKey: "amenities",
      header: "Amenidades",
      cell: ({ row }) => (
        <div className="max-w-32 truncate text-sm text-gray-600">
          {row.original.amenities}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => openModal(row.original)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleMaintenance(row.original)}
            className={`p-2 rounded-lg transition-colors ${
              row.original.status === 'Mantenimiento' 
                ? 'text-green-600 hover:bg-green-50' 
                : 'text-yellow-600 hover:bg-yellow-50'
            }`}
            title={row.original.status === 'Mantenimiento' ? 'Quitar de mantenimiento' : 'Poner en mantenimiento'}
          >
            <Wrench className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteModal({ isOpen: true, room: row.original })}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  // ✅ Configuración de la tabla
  const table = useReactTable({
    data: filteredRooms,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  // ✅ Función para manejar el drag and drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setRooms((rooms) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(rooms, oldIndex, newIndex)
      })
    }
  }

  // Funciones utilitarias para estilos
  const getStatusStyles = (status: Room['status']) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Ocupada':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Mantenimiento':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Fuera de servicio':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoomTypeIcon = (type: Room['type']) => {
    const baseClasses = "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs";
    switch (type) {
      case 'Suite':
        return `${baseClasses} bg-gradient-to-br from-purple-500 to-purple-600`;
      case 'Presidencial':
        return `${baseClasses} bg-gradient-to-br from-yellow-500 to-yellow-600`;
      case 'Familiar':
        return `${baseClasses} bg-gradient-to-br from-green-500 to-green-600`;
      case 'Doble':
        return `${baseClasses} bg-gradient-to-br from-blue-500 to-blue-600`;
      case 'Individual':
        return `${baseClasses} bg-gradient-to-br from-gray-500 to-gray-600`;
      default:
        return `${baseClasses} bg-gradient-to-br from-gray-500 to-gray-600`;
    }
  };

  // Funciones de manejo de eventos
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const openModal = (room?: Room) => {
    setModal({
      isOpen: true,
      isEditing: !!room,
      currentStep: 1,
      room: room || { type: 'Individual', status: 'Disponible', capacity: 1, images: [], floor: '1', amenities: '' }
    });
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setModal({ isOpen: false, isEditing: false, currentStep: 1, room: {} });
    setCurrentImageIndex(0);
  };

  const goToStep = (step: number) => {
    if (step === 2) {
      const { name, capacity, price } = modal.room;
      if (!name || !capacity || !price) {
        showNotification('Por favor, completa todos los campos obligatorios', 'error');
        return;
      }
    }
    setModal(prev => ({ ...prev, currentStep: step }));
  };

  const handleRoomChange = (field: keyof Room, value: any) => {
    setModal(prev => ({
      ...prev,
      room: { ...prev.room, [field]: value }
    }));
  };

  // ✅ Nueva función para toggle de mantenimiento
  const toggleMaintenance = (room: Room) => {
    const newStatus = room.status === 'Mantenimiento' ? 'Disponible' : 'Mantenimiento';
    setRooms(prev => prev.map(r => 
      r.id === room.id 
        ? { ...r, status: newStatus }
        : r
    ));
    
    const message = newStatus === 'Mantenimiento' 
      ? `🔧 ${room.name} puesta en mantenimiento`
      : `✅ ${room.name} disponible nuevamente`;
    
    showNotification(message);
  };

  // ✅ Nueva función para poner en mantenimiento desde el modal
  const setRoomMaintenance = () => {
    if (modal.room.id) {
      setRooms(prev => prev.map(room => 
        room.id === modal.room.id 
          ? { ...room, status: 'Mantenimiento' }
          : room
      ));
      showNotification(`🔧 ${modal.room.name} puesta en mantenimiento`);
      closeModal();
    }
  };

  const saveRoom = () => {
    const { name, type, capacity, price, status, description, floor, amenities } = modal.room;
    
    if (!name || !capacity || !price) {
      showNotification('Por favor, completa todos los campos obligatorios', 'error');
      return;
    }

    if (modal.isEditing) {
      setRooms(prev => prev.map(room => 
        room.id === modal.room.id 
          ? { ...room, ...modal.room } as Room
          : room
      ));
      showNotification('✅ Habitación actualizada exitosamente');
    } else {
      const newRoom: Room = {
        id: Math.max(...rooms.map(r => r.id)) + 1,
        name: name!,
        type: type!,
        capacity: capacity!,
        price: price!,
        status: status!,
        description: description || '',
        floor: floor || '1',
        amenities: amenities || '',
        images: modal.room.images || []
      };
      setRooms(prev => [...prev, newRoom]);
      showNotification('✨ Habitación agregada exitosamente');
    }

    closeModal();
  };

  const deleteRoom = (room: Room) => {
    setRooms(prev => prev.filter(r => r.id !== room.id));
    setDeleteModal({ isOpen: false, room: null });
    showNotification('🗑️ Habitación eliminada exitosamente');
  };

  const addSampleImage = () => {
    const sampleImages = [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center'
    ];
    
    const currentImages = modal.room.images || [];
    if (currentImages.length < 10) {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      handleRoomChange('images', [...currentImages, randomImage]);
      showNotification('📸 Imagen agregada');
    }
  };

  const removeImage = (index: number) => {
    const currentImages = modal.room.images || [];
    if (currentImages.length <= 1) {
      showNotification('⚠️ Debe mantener al menos una imagen', 'error');
      return;
    }
    
    const newImages = currentImages.filter((_, i) => i !== index);
    handleRoomChange('images', newImages);
    
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(Math.max(0, newImages.length - 1));
    }
    
    showNotification('🗑️ Imagen eliminada');
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Notificación */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 max-w-sm ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium">{notification.message}</p>
            <button 
              onClick={() => setNotification(null)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-gray-900 text-3xl font-bold">Gestión de Habitaciones</h1>
            <p className="text-gray-600 text-sm">Administra las habitaciones de tus propiedades con facilidad</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Agregar Habitación
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar habitaciones por nombre, tipo o estado..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'Todas' },
              { value: 'Disponible', label: 'Disponibles' },
              { value: 'Ocupada', label: 'Ocupadas' },
              { value: 'Mantenimiento', label: 'Mantenimiento' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterChange('status', filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.status === filter.value
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Tabla Única - Vista Avanzada */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} habitación(es) seleccionada(s)
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Selector de columnas */}
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                <Columns className="w-4 h-4" />
                Columnas
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-gray-900 text-sm font-semibold"
                                                style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-6 py-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </DraggableRow>
                    ))}
                  </SortableContext>
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="h-24 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Eye className="w-12 h-12 opacity-50" />
                        <p className="text-lg font-medium">No se encontraron habitaciones</p>
                        <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </DndContext>
        </div>

        {/* ✅ Paginación */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filas por página:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Principal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-6">
                <h2 className="text-gray-900 text-xl font-bold">
                  {modal.isEditing ? 'Editar Habitación' : 'Agregar Habitación'}
                </h2>
                {/* Indicador de pasos */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full text-white text-sm flex items-center justify-center font-semibold transition-all duration-300 ${
                    modal.currentStep === 1 ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    1
                  </div>
                  <div className="w-12 h-0.5 bg-gray-300 rounded-full">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-300"
                      style={{ width: modal.currentStep === 2 ? '100%' : '0%' }}
                    ></div>
                  </div>
                  <div className={`w-10 h-10 rounded-full text-sm flex items-center justify-center font-semibold transition-all duration-300 ${
                    modal.currentStep === 2 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500'
                  }`}>
                    2
                  </div>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              {/* Paso 1: Información básica */}
              {modal.currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-gray-900 text-lg font-semibold mb-2">Información Básica</h3>
                    <p className="text-gray-600 text-sm">Completa los datos principales de la habitación</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-3">
                      Nombre de la habitación *
                    </label>
                    <input
                      type="text"
                      placeholder="ej. Suite Presidencial 101"
                      value={modal.room.name || ''}
                      onChange={(e) => handleRoomChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-3">
                      Tipo de habitación *
                    </label>
                    <select
                      value={modal.room.type || 'Individual'}
                      onChange={(e) => handleRoomChange('type', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Doble">Doble</option>
                      <option value="Suite">Suite</option>
                      <option value="Familiar">Familiar</option>
                      <option value="Presidencial">Presidencial</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-3">
                        Capacidad *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="2"
                        value={modal.room.capacity || ''}
                        onChange={(e) => handleRoomChange('capacity', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-3">
                        Precio por noche *
                      </label>
                      <input
                        type="text"
                        placeholder="$150"
                        value={modal.room.price || ''}
                        onChange={(e) => handleRoomChange('price', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-3">
                        Piso
                      </label>
                      <input
                        type="text"
                        placeholder="1"
                        value={modal.room.floor || ''}
                        onChange={(e) => handleRoomChange('floor', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-3">
                        Estado
                      </label>
                      <select
                        value={modal.room.status || 'Disponible'}
                        onChange={(e) => handleRoomChange('status', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      >
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupada">Ocupada</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                        <option value="Fuera de servicio">Fuera de servicio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-3">
                      Amenidades
                    </label>
                    <input
                      type="text"
                      placeholder="WiFi, TV, Aire acondicionado, Minibar..."
                      value={modal.room.amenities || ''}
                      onChange={(e) => handleRoomChange('amenities', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-3">
                      Descripción
                    </label>
                    <textarea
                      placeholder="Describe las características especiales, amenidades y servicios incluidos..."
                      value={modal.room.description || ''}
                      onChange={(e) => handleRoomChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    />
                  </div>

                  {/* ✅ Botón de mantenimiento en el modal */}
                  {modal.isEditing && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-yellow-800 font-medium">Mantenimiento</h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            Pon la habitación en mantenimiento temporalmente
                          </p>
                        </div>
                        <button
                          onClick={setRoomMaintenance}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                        >
                          <Wrench className="w-4 h-4" />
                          Poner en Mantenimiento
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Paso 2: Galería de imágenes */}
              {modal.currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-gray-900 text-lg font-semibold mb-2">Galería de Imágenes</h3>
                    <p className="text-gray-600 text-sm">Agrega hasta 10 imágenes para mostrar la habitación</p>
                  </div>
                  
                  {/* Botones de carga */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      onClick={addSampleImage}
                      className="flex items-center justify-center gap-3 h-14 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border-2 border-dashed border-gray-300 hover:border-red-300 transition-all"
                    >
                      <ImageIcon className="w-6 h-6" />
                      <div className="text-left">
                        <div className="text-sm font-semibold">Imagen Principal</div>
                        <div className="text-xs text-gray-500">Foto destacada</div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={addSampleImage}
                      className="flex items-center justify-center gap-3 h-14 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border-2 border-dashed border-gray-300 hover:border-red-300 transition-all"
                    >
                      <Plus className="w-6 h-6" />
                      <div className="text-left">
                        <div className="text-sm font-semibold">Más Imágenes</div>
                        <div className="text-xs text-gray-500">Galería adicional</div>
                      </div>
                    </button>
                  </div>

                  {/* Carrusel de imágenes */}
                  <div className="relative">
                    <div className="bg-gray-100 rounded-xl p-6 h-[300px] flex items-center justify-center relative overflow-hidden">
                      {(!modal.room.images || modal.room.images.length === 0) ? (
                        <div className="text-center text-gray-500">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 opacity-50" />
                          </div>
                          <p className="text-lg font-medium mb-2">Sin imágenes</p>
                          <p className="text-sm">Las imágenes aparecerán aquí</p>
                          <p className="text-xs mt-2 text-gray-400">Sube hasta 10 imágenes de alta calidad</p>
                        </div>
                      ) : (
                        <>
                          <img 
                            src={modal.room.images[currentImageIndex]} 
                            alt="Room image"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                          
                          {/* Navegación del carrusel */}
                          {modal.room.images.length > 1 && (
                            <>
                              <button 
                                onClick={() => setCurrentImageIndex(prev => 
                                  prev === 0 ? modal.room.images!.length - 1 : prev - 1
                                )}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                              >
                                <ArrowLeft className="w-5 h-5" />
                              </button>
                              
                              <button 
                                onClick={() => setCurrentImageIndex(prev => 
                                  prev === modal.room.images!.length - 1 ? 0 : prev + 1
                                )}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                              >
                                <ArrowRight className="w-5 h-5" />
                              </button>
                              
                              {/* Contador de imágenes */}
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                                {currentImageIndex + 1} / {modal.room.images.length}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Miniaturas */}
                  {modal.room.images && modal.room.images.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-gray-900 text-sm font-medium mb-3">Miniaturas</h4>
                      <div className="flex gap-3 overflow-x-auto pb-3">
                        {modal.room.images.map((image, index) => (
                          <div key={index} className="relative flex-shrink-0">
                            <div
                              className={`w-16 h-16 rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden ${
                                index === currentImageIndex ? 'ring-2 ring-red-500 ring-offset-2' : 'hover:scale-105'
                              }`}
                              style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                              onClick={() => setCurrentImageIndex(index)}
                            >
                              {index === 0 && (
                                <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                  Principal
                                </div>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer transition-all duration-200 transform hover:scale-110"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {/* Botón para agregar más imágenes */}
                        {(!modal.room.images || modal.room.images.length < 10) && (
                          <div
                            onClick={addSampleImage}
                            className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:border-red-300 transition-all duration-200 hover:scale-105"
                          >
                            <Plus className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                <div>
                  {modal.currentStep === 2 && (
                    <button 
                      onClick={() => goToStep(1)}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Atrás
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-200"
                  >
                    Cancelar
                  </button>
                  {modal.currentStep === 1 ? (
                    <button 
                      onClick={() => goToStep(2)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-200"
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={saveRoom}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg font-semibold transition-all duration-200"
                    >
                      <Upload className="w-4 h-4" />
                      Guardar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      {deleteModal.isOpen && deleteModal.room && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-xl font-bold">Eliminar Habitación</h3>
                  <p className="text-gray-600 text-sm mt-1">Esta acción es permanente</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-gray-700 text-sm">
                  ¿Estás seguro de que quieres eliminar la habitación{' '}
                  <span className="font-semibold text-gray-900">{deleteModal.room.name}</span>?
                </p>
                <p className="text-red-600 text-xs mt-2 font-medium">⚠️ Esta acción no se puede deshacer</p>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setDeleteModal({ isOpen: false, room: null })}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-200"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => deleteRoom(deleteModal.room!)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
