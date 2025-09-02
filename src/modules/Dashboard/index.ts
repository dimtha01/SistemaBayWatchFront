// Exportar componentes principales
export { default as MaintenanceSystem } from './MaintenanceSystem';

// Exportar componentes individuales
export { StatsCard } from './components/StatsCard';
export { MaintenanceCard } from './components/MaintenanceCard';
export { FilterControls } from './components/FilterControls';
export { TaskRow } from './components/TaskRow';
export { TaskModal } from './components/TaskModal';
export { ConfirmModal } from './components/ConfirmModal';
export { Notification } from './components/Notification';

// Exportar hooks
export { useTasks } from './hooks/useTasks';
export { useNotifications } from './hooks/useNotifications';
export { useModals } from './hooks/useModals';

// Exportar tipos
export type {
  Task,
  TaskPriority,
  TaskStatus,
  TaskCategory,
  TaskStats,
  TaskFilters,
  NotificationType,
  Notification as NotificationType
} from './types/task.types';

// Exportar servicios
export { sampleTasks, createTask } from './services/taskService';
export { exportTasksToCSV } from './services/exportService';

// Exportar utilidades
export {
  getPriorityColor,
  getPriorityBadgeColor,
  getStatusBadgeColor,
  getCategoryColor,
  getPriorityName,
  getStatusName,
  getCategoryName,
  highlightSearchTerm,
  filterTasks,
  sortTasks
} from './utils/taskUtils';

export {
  formatDate,
  formatTime,
  getTimeAgo,
  isToday
} from './utils/dateUtils';

export {
  PRIORITY_COLORS,
  PRIORITY_BADGE_COLORS,
  STATUS_BADGE_COLORS,
  CATEGORY_COLORS,
  PRIORITY_NAMES,
  STATUS_NAMES,
  CATEGORY_NAMES,
  ASSIGNEES
} from './utils/constants';
