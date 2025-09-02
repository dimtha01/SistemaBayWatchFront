export type TaskPriority = 'urgente' | 'alta' | 'media' | 'baja';
export type TaskStatus = 'pendiente' | 'en_progreso' | 'completada';
export type TaskCategory = 'plomeria' | 'electricidad' | 'climatizacion' | 'limpieza' | 'jardineria' | 'pintura' | 'carpinteria' | 'seguridad';

export interface Task {
  id: number;
  description: string;
  location: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  assigneeImage: string;
  assigneeRole: string;
  date: Date;
  deadline: Date;
  estimatedTime: number;
  notes: string;
}

export interface TaskStats {
  pending: number;
  progress: number;
  completed: number;
  staff: number;
}

export interface TaskFilters {
  status: TaskStatus | 'all';
  search: string;
  sortField: keyof Task;
  sortDirection: 'asc' | 'desc';
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}
