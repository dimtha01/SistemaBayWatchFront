import React, { useEffect } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useNotifications } from '../../hooks/useNotifications';
import { useModals } from '../../hooks/useModals';
import { StatsCard } from './StatsCard';
import { MaintenanceCard } from './MaintenanceCard';
import { FilterControls } from './FilterControls';
import { TaskRow } from './TaskRow';
import { TaskModal } from './TaskModal';
import { ConfirmModal } from './ConfirmModal';
import { Notification } from './Notification';
import type { CreateTaskData } from '../../services/taskService';

export const MaintenanceSystem: React.FC = () => {
  const {
    tasks,
    allTasks,
    stats,
    filters,
    addTask,
    deleteTask,
    startTask,
    completeTask,
    pauseTask,
    updateFilters,
    sortBy
  } = useTasks();

  const { notifications, addNotification, removeNotification } = useNotifications();
  const { modals, selectedTaskId, confirmData, openModal, closeModal, closeAllModals, showConfirm, executeConfirm } = useModals();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeAllModals]);

  // Stats card data
  const statsCards = [
    {
      title: 'Tareas Pendientes',
      value: stats.pending,
      change: '+2 desde ayer',
      changeType: 'positive' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#eab308" viewBox="0 0 256 256">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
        </svg>
      ),
      iconColor: 'bg-yellow-500/20'
    },
    {
      title: 'En Progreso',
      value: stats.progress,
      change: 'Activas ahora',
      changeType: 'neutral' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3b82f6" viewBox="0 0 256 256">
          <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z" />
        </svg>
      ),
      iconColor: 'bg-blue-500/20'
    },
    {
      title: 'Completadas Hoy',
      value: stats.completed,
      change: '+5 desde ayer',
      changeType: 'positive' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#22c55e" viewBox="0 0 256 256">
          <path d="m229.66,77.66-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
        </svg>
      ),
      iconColor: 'bg-green-500/20'
    },
    {
      title: 'Personal Activo',
      value: stats.staff,
      change: '4 disponibles',
      changeType: 'neutral' as const,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#a855f7" viewBox="0 0 256 256">
          <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Z" />
        </svg>
      ),
      iconColor: 'bg-purple-500/20'
    }
  ];

  // Task action handlers
  const handleAddTask = (data: CreateTaskData) => {
    addTask(data);
    addNotification('Tarea creada exitosamente', 'success');
  };

  const handleStartTask = (id: number) => {
    showConfirm({
      title: 'Iniciar Tarea',
      message: '¿Estás seguro de que deseas iniciar esta tarea?',
      confirmText: 'Iniciar',
      confirmClass: 'bg-green-600 hover:bg-green-700',
      onConfirm: () => {
        startTask(id);
        addNotification('Tarea iniciada', 'success');
      }
    });
  };

  const handleCompleteTask = (id: number) => {
    showConfirm({
      title: 'Completar Tarea',
      message: '¿Estás seguro de que deseas marcar esta tarea como completada?',
      confirmText: 'Completar',
      confirmClass: 'bg-green-600 hover:bg-green-700',
      onConfirm: () => {
        completeTask(id);
        addNotification('Tarea completada', 'success');
      }
    });
  };

  const handlePauseTask = (id: number) => {
    showConfirm({
      title: 'Pausar Tarea',
      message: '¿Deseas pausar esta tarea y cambiarla a pendiente?',
      confirmText: 'Pausar',
      confirmClass: 'bg-yellow-600 hover:bg-yellow-700',
      onConfirm: () => {
        pauseTask(id);
        addNotification('Tarea pausada', 'warning');
      }
    });
  };

  const handleDeleteTask = (id: number) => {
    showConfirm({
      title: 'Eliminar Tarea',
      message: '¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.',
      onConfirm: () => {
        deleteTask(id);
        addNotification('Tarea eliminada', 'error');
      }
    });
  };

  const handleGenerateReport = (id: number) => {
    addNotification('Generando reporte...', 'info');
    setTimeout(() => {
      addNotification('Reporte generado exitosamente', 'success');
    }, 2000);
  };

  const handleArchiveTask = (id: number) => {
    showConfirm({
      title: 'Archivar Tarea',
      message: '¿Deseas archivar esta tarea completada?',
      confirmText: 'Archivar',
      confirmClass: 'bg-gray-600 hover:bg-gray-700',
      onConfirm: () => {
        deleteTask(id);
        addNotification('Tarea archivada', 'info');
      }
    });
  };

  const selectedTask = selectedTaskId ? allTasks.find(t => t.id === selectedTaskId) : null;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <StatsCard
              key={card.title}
              title={card.title}
              value={card.value}
              change={card.change}
              changeType={card.changeType}
              icon={card.icon}
              iconColor={card.iconColor}
              delay={index}
            />
          ))}
        </div>

        {/* Controls and Filters */}
        <FilterControls
          currentFilter={filters.status}
          searchTerm={filters.search}
          onFilterChange={(filter) => updateFilters({ status: filter })}
          onSearchChange={(search) => updateFilters({ search })}
          onAddTask={() => openModal('addTask')}
          tasks={allTasks}
        />

        {/* Tasks Table */}
        <MaintenanceCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/60 backdrop-blur-sm border-b border-slate-600/30">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <button 
                      onClick={() => sortBy('description')}
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                    >
                      <span>Tarea</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                      </svg>
                    </button>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <button 
                      onClick={() => sortBy('priority')}
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                    >
                      <span>Prioridad</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                      </svg>
                    </button>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <button 
                      onClick={() => sortBy('status')}
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                    >
                      <span>Estado</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                      </svg>
                    </button>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Asignado
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <button 
                      onClick={() => sortBy('date')}
                      className="flex items-center space-x-1 hover:text-white transition-colors"
                    >
                      <span>Fecha</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                      </svg>
                    </button>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/30">
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#64748b" viewBox="0 0 256 256">
                          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                        </svg>
                        <p className="text-slate-400 text-lg">No se encontraron tareas</p>
                        <p className="text-slate-500 text-sm">Intenta ajustar los filtros de búsqueda</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      searchTerm={filters.search}
                      onView={(id) => openModal('viewTask', id)}
                      onStart={handleStartTask}
                      onComplete={handleCompleteTask}
                      onPause={handlePauseTask}
                      onEdit={(id) => openModal('addTask', id)}
                      onDelete={handleDeleteTask}
                      onGenerateReport={handleGenerateReport}
                      onArchive={handleArchiveTask}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </MaintenanceCard>

        {/* Task Summary */}
        {tasks.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Mostrando {tasks.length} de {allTasks.length} tareas
              {filters.search && (
                <span className="ml-2">
                  para "<span className="text-blue-400 font-medium">{filters.search}</span>"
                </span>
              )}
            </p>
          </div>
        )}
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={modals.addTask}
        onClose={() => closeModal('addTask')}
        onSubmit={handleAddTask}
        mode="create"
      />

      <TaskModal
        isOpen={modals.viewTask}
        onClose={() => closeModal('viewTask')}
        onSubmit={() => {}}
        task={selectedTask}
        mode="view"
      />

      <ConfirmModal
        isOpen={modals.confirm}
        title={confirmData?.title || ''}
        message={confirmData?.message || ''}
        confirmText={confirmData?.confirmText}
        confirmClass={confirmData?.confirmClass}
        onConfirm={executeConfirm}
        onCancel={() => closeModal('confirm')}
      />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </div>
  );
};

// ✅ SIN export default - solo export nombrado
