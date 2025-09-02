import { useState, useMemo, useCallback } from 'react';
import type { Task, TaskStats, TaskFilters } from '../types/task.types';
import { type CreateTaskData, sampleTasks, createTask } from '../services/taskService';
import { filterTasks, sortTasks } from '../utils/taskUtils';

export const useTasks = () => {
  const [allTasks, setAllTasks] = useState<Task[]>(sampleTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    search: '',
    sortField: 'date',
    sortDirection: 'desc'
  });

  // Tareas filtradas y ordenadas
  const tasks = useMemo(() => {
    const filtered = filterTasks(allTasks, filters);
    return sortTasks(filtered, filters.sortField, filters.sortDirection);
  }, [allTasks, filters]);

  // Estadísticas
  const stats = useMemo((): TaskStats => {
    const pending = allTasks.filter(task => task.status === 'pendiente').length;
    const progress = allTasks.filter(task => task.status === 'en_progreso').length;
    const completed = allTasks.filter(task => task.status === 'completada').length;
    const staff = 4; // Número fijo de personal activo

    return { pending, progress, completed, staff };
  }, [allTasks]);

  // Agregar tarea
  const addTask = useCallback((data: CreateTaskData) => {
    const newTask = createTask(data);
    setAllTasks(prev => [newTask, ...prev]);
  }, []);

  // Actualizar tarea
  const updateTask = useCallback((id: number, updates: Partial<Task>) => {
    setAllTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  // Eliminar tarea
  const deleteTask = useCallback((id: number) => {
    setAllTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  // Iniciar tarea
  const startTask = useCallback((id: number) => {
    updateTask(id, { status: 'en_progreso' });
  }, [updateTask]);

  // Completar tarea
  const completeTask = useCallback((id: number) => {
    updateTask(id, { status: 'completada' });
  }, [updateTask]);

  // Pausar tarea
  const pauseTask = useCallback((id: number) => {
    updateTask(id, { status: 'pendiente' });
  }, [updateTask]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters: Partial<TaskFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Ordenar por campo
  const sortBy = useCallback((field: keyof Task) => {
    setFilters(prev => ({
      ...prev,
      sortField: field,
      sortDirection: prev.sortField === field && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  return {
    tasks,
    allTasks,
    stats,
    filters,
    addTask,
    updateTask,
    deleteTask,
    startTask,
    completeTask,
    pauseTask,
    updateFilters,
    sortBy
  };
};
