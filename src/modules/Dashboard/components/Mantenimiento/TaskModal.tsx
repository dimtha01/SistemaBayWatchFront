import React, { useState, useEffect } from 'react';
import { type Task, type TaskCategory, type TaskPriority, CreateTaskData } from '../../types/task.types';
import { ASSIGNEES } from '../../utils/data';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => void;
  task?: Task | null;
  mode: 'create' | 'edit' | 'view';
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  mode
}) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    description: '',
    location: '',
    category: 'plomeria',
    priority: 'media',
    assignee: 'carlos',
    deadline: new Date(),
    estimatedTime: 1,
    notes: ''
  });

  useEffect(() => {
    if (task && (mode === 'edit' || mode === 'view')) {
      setFormData({
        description: task.description,
        location: task.location,
        category: task.category,
        priority: task.priority,
        assignee: 'carlos', // Simplificado para el ejemplo
        deadline: task.deadline,
        estimatedTime: task.estimatedTime,
        notes: task.notes
      });
    } else if (mode === 'create') {
      setFormData({
        description: '',
        location: '',
        category: 'plomeria',
        priority: 'media',
        assignee: 'carlos',
        deadline: new Date(),
        estimatedTime: 1,
        notes: ''
      });
    }
  }, [task, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode !== 'view') {
      onSubmit(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof CreateTaskData, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';
  const title = mode === 'create' ? 'Nueva Tarea de Mantenimiento' : 
                mode === 'edit' ? 'Editar Tarea' : 'Detalles de la Tarea';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-700/95 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-slate-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción de la Tarea
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                disabled={isReadOnly}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                placeholder="Ej: Reparar fuga de agua en habitación 205"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
                disabled={isReadOnly}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                placeholder="Ej: Piso 2 - Habitación 205"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value as TaskCategory)}
                required
                disabled={isReadOnly}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              >
                <option value="plomeria">Plomería</option>
                <option value="electricidad">Electricidad</option>
                <option value="climatizacion">Climatización</option>
                <option value="limpieza">Limpieza</option>
                <option value="jardineria">Jardinería</option>
                <option value="pintura">Pintura</option>
                <option value="carpinteria">Carpintería</option>
                <option value="seguridad">Seguridad</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Prioridad
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value as TaskPriority)}
                required
                disabled={isReadOnly}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              >
                <option value="urgente">Urgente</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Asignar a
              </label>
              <select
                value={formData.assignee}
                onChange={(e) => handleInputChange('assignee', e.target.value)}
                required
                disabled={isReadOnly}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              >
                {Object.entries(ASSIGNEES).map(([key, assignee]) => (
                  <option key={key} value={key}>
                    {assignee.name} - {assignee.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fecha Límite
              </label>
              <input
                type="datetime-local"
                value={formData.deadline.toISOString().slice(0, 16)}
                onChange={(e) => handleInputChange('deadline', new Date(e.target.value))}
                required
                disabled={isReadOnly}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tiempo Estimado (horas)
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={formData.estimatedTime}
                onChange={(e) => handleInputChange('estimatedTime', parseFloat(e.target.value))}
                required
                disabled={isReadOnly}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                placeholder="2.5"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notas Adicionales
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                disabled={isReadOnly}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50"
                placeholder="Información adicional, materiales necesarios, instrucciones especiales..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-600">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200 font-medium"
            >
              {mode === 'view' ? 'Cerrar' : 'Cancelar'}
            </button>
            {mode !== 'view' && (
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                </svg>
                <span>{mode === 'create' ? 'Crear Tarea' : 'Guardar Cambios'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
