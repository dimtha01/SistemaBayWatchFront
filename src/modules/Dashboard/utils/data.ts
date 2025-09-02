import type { TaskPriority, TaskStatus, TaskCategory } from '../types/task.types';

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  urgente: 'from-red-500 to-red-600',
  alta: 'from-orange-500 to-orange-600',
  media: 'from-yellow-500 to-yellow-600',
  baja: 'from-green-500 to-green-600'
};

export const PRIORITY_BADGE_COLORS: Record<TaskPriority, string> = {
  urgente: 'bg-red-500/20 text-red-400 border border-red-500/30',
  alta: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  media: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  baja: 'bg-green-500/20 text-green-400 border border-green-500/30'
};

export const STATUS_BADGE_COLORS: Record<TaskStatus, string> = {
  pendiente: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  en_progreso: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  completada: 'bg-green-500/20 text-green-400 border border-green-500/30'
};

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  plomeria: 'bg-blue-500/20 text-blue-400',
  electricidad: 'bg-yellow-500/20 text-yellow-400',
  climatizacion: 'bg-purple-500/20 text-purple-400',
  limpieza: 'bg-green-500/20 text-green-400',
  jardineria: 'bg-emerald-500/20 text-emerald-400',
  pintura: 'bg-pink-500/20 text-pink-400',
  carpinteria: 'bg-amber-500/20 text-amber-400',
  seguridad: 'bg-red-500/20 text-red-400'
};

export const PRIORITY_NAMES: Record<TaskPriority, string> = {
  urgente: 'Urgente',
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja'
};

export const STATUS_NAMES: Record<TaskStatus, string> = {
  pendiente: 'Pendiente',
  en_progreso: 'En Progreso',
  completada: 'Completada'
};

export const CATEGORY_NAMES: Record<TaskCategory, string> = {
  plomeria: 'Plomería',
  electricidad: 'Electricidad',
  climatizacion: 'Climatización',
  limpieza: 'Limpieza',
  jardineria: 'Jardinería',
  pintura: 'Pintura',
  carpinteria: 'Carpintería',
  seguridad: 'Seguridad'
};

export const ASSIGNEES = {
  carlos: {
    name: 'Carlos Martínez',
    role: 'Plomero',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  ana: {
    name: 'Ana González',
    role: 'Técnico HVAC',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1d2?w=32&h=32&fit=crop&crop=face'
  },
  pedro: {
    name: 'Pedro Rodríguez',
    role: 'Electricista',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  daniela: {
    name: 'Daniela Silva',
    role: 'Limpieza',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  },
  miguel: {
    name: 'Miguel Torres',
    role: 'Jardinero',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  },
  sofia: {
    name: 'Sofía Herrera',
    role: 'Pintora',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face'
  }
};
