import type { Task, TaskCategory, TaskPriority } from '../types/task.types';
import { ASSIGNEES } from '../utils/data';

export const sampleTasks: Task[] = [
  {
    id: 1,
    description: 'Fuga de agua en habitación 205',
    location: 'Piso 2 - Habitación 205',
    category: 'plomeria',
    priority: 'urgente',
    status: 'pendiente',
    assignee: 'Carlos Martínez',
    assigneeRole: 'Plomero',
    assigneeImage: ASSIGNEES.carlos.image,
    date: new Date('2024-01-15T09:30:00'),
    deadline: new Date('2024-01-15T12:00:00'),
    estimatedTime: 2,
    notes: 'El huésped ha sido reubicado temporalmente. Verificar daños en piso inferior.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'],
    createdBy: 'Admin Usuario',
    progress: 0
  },
  {
    id: 2,
    description: 'Aire acondicionado no funciona - Lobby',
    location: 'Planta Baja - Lobby Principal',
    category: 'climatizacion',
    priority: 'alta',
    status: 'en_progreso',
    assignee: 'Ana González',
    assigneeRole: 'Técnico HVAC',
    assigneeImage: ASSIGNEES.ana.image,
    date: new Date('2024-01-15T08:15:00'),
    deadline: new Date('2024-01-15T14:00:00'),
    estimatedTime: 3,
    notes: 'Revisar sistema completo. Posible problema con compresor.',
    images: [],
    createdBy: 'Admin Usuario',
    progress: 35
  },
  {
    id: 3,
    description: 'Cambio de bombillas en pasillo',
    location: 'Piso 3 - Pasillo Este',
    category: 'electricidad',
    priority: 'media',
    status: 'completada',
    assignee: 'Pedro Rodríguez',
    assigneeRole: 'Electricista',
    assigneeImage: ASSIGNEES.pedro.image,
    date: new Date('2024-01-14T14:00:00'),
    deadline: new Date('2024-01-14T16:00:00'),
    estimatedTime: 1.5,
    notes: 'Cambiar todas las bombillas LED del pasillo este.',
    images: [],
    createdBy: 'Admin Usuario',
    progress: 100
  },
  {
    id: 4,
    description: 'Limpieza profunda de alfombras',
    location: 'Piso 1 - Salón de eventos',
    category: 'limpieza',
    priority: 'baja',
    status: 'pendiente',
    assignee: 'Daniela Silva',
    assigneeRole: 'Limpieza',
    assigneeImage: ASSIGNEES.daniela.image,
    date: new Date('2024-01-13T14:00:00'),
    deadline: new Date('2024-01-16T10:00:00'),
    estimatedTime: 4,
    notes: 'Limpieza profunda antes del evento del fin de semana.',
    images: [],
    createdBy: 'Admin Usuario',
    progress: 0
  }
];

export interface CreateTaskData {
  description: string;
  location: string;
  category: TaskCategory;
  priority: TaskPriority;
  assignee: string;
  deadline: Date;
  estimatedTime: number;
  notes: string;
}

export const createTask = (data: CreateTaskData): Task => {
  const assigneeKey = data.assignee as keyof typeof ASSIGNEES;
  const assigneeInfo = ASSIGNEES[assigneeKey];

  return {
    id: Date.now(),
    description: data.description,
    location: data.location,
    category: data.category,
    priority: data.priority,
    status: 'pendiente',
    assignee: assigneeInfo?.name || 'Sin asignar',
    assigneeRole: assigneeInfo?.role || 'Personal',
    assigneeImage: assigneeInfo?.image || ASSIGNEES.carlos.image,
    date: new Date(),
    deadline: data.deadline,
    estimatedTime: data.estimatedTime,
    notes: data.notes,
    images: [],
    createdBy: 'Admin Usuario',
    progress: 0
  };
};
