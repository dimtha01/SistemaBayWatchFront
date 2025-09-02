import type { Task, TaskPriority, TaskStatus, TaskCategory } from '../types/task.types';
import { 
  PRIORITY_COLORS, 
  PRIORITY_BADGE_COLORS, 
  STATUS_BADGE_COLORS, 
  CATEGORY_COLORS,
  PRIORITY_NAMES,
  STATUS_NAMES,
  CATEGORY_NAMES
} from '../utils/data'; // ✅ Corregir importación

export const getPriorityColor = (priority: TaskPriority): string => {
  return PRIORITY_COLORS[priority] || 'from-gray-500 to-gray-600';
};

export const getPriorityBadgeColor = (priority: TaskPriority): string => {
  return PRIORITY_BADGE_COLORS[priority] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
};

export const getStatusBadgeColor = (status: TaskStatus): string => {
  return STATUS_BADGE_COLORS[status] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
};

export const getCategoryColor = (category: TaskCategory): string => {
  return CATEGORY_COLORS[category] || 'bg-gray-500/20 text-gray-400';
};

export const getPriorityName = (priority: TaskPriority): string => {
  return PRIORITY_NAMES[priority] || priority;
};

export const getStatusName = (status: TaskStatus): string => {
  return STATUS_NAMES[status] || status;
};

export const getCategoryName = (category: TaskCategory): string => {
  return CATEGORY_NAMES[category] || category;
};

export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="bg-blue-500/30 px-1 py-0.5 rounded">$1</span>');
};

export const filterTasks = (
  tasks: Task[], 
  filters: { status: TaskStatus | 'all'; search: string }
): Task[] => {
  let filtered = [...tasks];

  // Filtrar por estado
  if (filters.status !== 'all') {
    filtered = filtered.filter(task => task.status === filters.status);
  }

  // Filtrar por búsqueda
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(task =>
      task.description.toLowerCase().includes(searchTerm) ||
      task.location.toLowerCase().includes(searchTerm) ||
      task.assignee.toLowerCase().includes(searchTerm) ||
      getCategoryName(task.category).toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
};

export const sortTasks = (
  tasks: Task[], 
  field: keyof Task, 
  direction: 'asc' | 'desc'
): Task[] => {
  return [...tasks].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];

    if (field === 'date' || field === 'deadline') {
      aValue = (aValue as Date).getTime();
      bValue = (bValue as Date).getTime();
    } else if (typeof aValue === 'string') {
      aValue = (aValue as string).toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
