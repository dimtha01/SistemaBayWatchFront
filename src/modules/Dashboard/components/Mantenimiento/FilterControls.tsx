import React from 'react';
import type { TaskStatus } from '../../types/task.types';
import { exportTasksToCSV } from '../../services/exportService';
import type { Task } from '../../types/task.types';

interface FilterControlsProps {
  currentFilter: TaskStatus | 'all';
  searchTerm: string;
  onFilterChange: (filter: TaskStatus | 'all') => void;
  onSearchChange: (search: string) => void;
  onAddTask: () => void;
  tasks: Task[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  currentFilter,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onAddTask,
  tasks
}) => {
  const handleExport = () => {
    exportTasksToCSV(tasks);
  };

  const filterButtons = [
    { key: 'all' as const, label: 'Todas' },
    { key: 'pendiente' as const, label: 'Pendientes' },
    { key: 'en_progreso' as const, label: 'En Progreso' },
    { key: 'completada' as const, label: 'Completadas' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-lg p-6 mb-8 animate-slide-in-left">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar tareas..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="#9ca3af"
              viewBox="0 0 256 256" 
              className="absolute left-3 top-2.5"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {filterButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                  currentFilter === key
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z" />
            </svg>
            <span>Exportar</span>
          </button>
          <button
            onClick={onAddTask}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
            </svg>
            <span>Nueva Tarea</span>
          </button>
        </div>
      </div>
    </div>
  );
};
