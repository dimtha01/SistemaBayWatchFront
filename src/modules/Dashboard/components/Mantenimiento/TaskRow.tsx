import React from 'react';
import type { Task } from '../../types/task.types';
import { 
  getPriorityColor, 
  getPriorityBadgeColor, 
  getStatusBadgeColor, 
  getCategoryColor,
  getPriorityName,
  getStatusName,
  getCategoryName,
  highlightSearchTerm
} from '../../utils/taskUtils';
import { formatDate, formatTime } from '../../utils/dateUtils';

interface TaskRowProps {
  task: Task;
  searchTerm: string;
  onView: (id: number) => void;
  onStart: (id: number) => void;
  onComplete: (id: number) => void;
  onPause: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onGenerateReport: (id: number) => void;
  onArchive: (id: number) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  task,
  searchTerm,
  onView,
  onStart,
  onComplete,
  onPause,
  onEdit,
  onDelete,
  onGenerateReport,
  onArchive
}) => {
  const getActionButtons = () => {
    const baseButtons = (
      <button
        onClick={() => onView(task.id)}
        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200 hover:scale-110"
        title="Ver detalles"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
          <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
        </svg>
      </button>
    );

    switch (task.status) {
      case 'pendiente':
        return (
          <>
            {baseButtons}
            <button
              onClick={() => onStart(task.id)}
              className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Iniciar tarea"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="m232.4,114.49-88-48a15.91,15.91,0,0,0-16.8,0l-88,48A16,16,0,0,0,32,128a16,16,0,0,0,7.6,13.51l88,48a15.91,15.91,0,0,0,16.8,0l88-48A16,16,0,0,0,240,128,16,16,0,0,0,232.4,114.49ZM128,32l80.34,44L128,120,47.66,76Z" />
              </svg>
            </button>
            <button
              onClick={() => onEdit(task.id)}
              className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Editar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M227.31,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.31,64l24-24L216,84.69Z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Eliminar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" />
              </svg>
            </button>
          </>
        );
      case 'en_progreso':
        return (
          <>
            {baseButtons}
            <button
              onClick={() => onComplete(task.id)}
              className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Completar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="m229.66,77.66-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
              </svg>
            </button>
            <button
              onClick={() => onPause(task.id)}
              className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Pausar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z" />
              </svg>
            </button>
          </>
        );
      case 'completada':
        return (
          <>
            {baseButtons}
            <button
              onClick={() => onGenerateReport(task.id)}
              className="p-2 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Generar reporte"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,152a8,8,0,0,1-8,8H192v16a8,8,0,0,1-16,0V160H152a8,8,0,0,1,0-16h24V128a8,8,0,0,1,16,0v16h24A8,8,0,0,1,224,152ZM56,72H72a8,8,0,0,0,0-16H56A16,16,0,0,0,40,72V184a16,16,0,0,0,16,16H72a8,8,0,0,0,0-16H56V72Zm48,80a8,8,0,0,0,8,8h16a8,8,0,0,0,0-16H112A8,8,0,0,0,104,152Zm0-32a8,8,0,0,0,8,8h16a8,8,0,0,0,0-16H112A8,8,0,0,0,104,120Zm0-32a8,8,0,0,0,8,8h16a8,8,0,0,0,0-16H112A8,8,0,0,0,104,88Z" />
              </svg>
            </button>
            <button
              onClick={() => onArchive(task.id)}
              className="p-2 text-gray-400 hover:bg-gray-500/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Archivar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM208,192H48V104H208ZM224,88H32V64H224V88ZM96,136a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,136Z" />
              </svg>
            </button>
          </>
        );
      default:
        return baseButtons;
    }
  };

  return (
    <tr 
      className={`hover:bg-slate-700/30 transition-all duration-200 border-l-2 ${
        task.priority === 'urgente' ? 'border-red-500' :
        task.priority === 'alta' ? 'border-orange-500' :
        task.priority === 'media' ? 'border-yellow-500' :
        'border-green-500'
      } ${task.status === 'completada' ? 'bg-green-500/5' : ''}`}
      data-priority={task.priority}
      data-status={task.status}
    >
      <td className="px-3 py-2">
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 bg-gradient-to-br ${getPriorityColor(task.priority)} rounded-md flex items-center justify-center text-white font-bold text-xs`}>
            {task.status === 'completada' ? '✓' : String(task.id).padStart(2, '0')}
          </div>
          <div className="min-w-0 flex-1">
            <p 
              className="font-medium text-white text-sm truncate max-w-[120px]"
              dangerouslySetInnerHTML={{ __html: highlightSearchTerm(task.description, searchTerm) }}
            />
            <p className="text-xs text-slate-400 truncate max-w-[120px]">{task.location}</p>
            <span className={`text-xs ${getCategoryColor(task.category)} px-1.5 py-0.5 rounded`}>
              {getCategoryName(task.category)}
            </span>
          </div>
        </div>
      </td>
      <td className="px-2 py-2">
        <span className={`px-1.5 py-0.5 ${getPriorityBadgeColor(task.priority)} rounded-full text-xs font-semibold`}>
          {getPriorityName(task.priority)}
        </span>
      </td>
      <td className="px-2 py-2">
        <div className="flex items-center space-x-1">
          <span className={`px-1.5 py-0.5 ${getStatusBadgeColor(task.status)} rounded-full text-xs font-semibold`}>
            {getStatusName(task.status)}
          </span>
          {task.status === 'en_progreso' && (
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </div>
      </td>
      <td className="px-2 py-2">
        <div className="flex items-center space-x-1.5">
          <img 
            src={task.assigneeImage} 
            alt={task.assignee} 
            className="w-6 h-6 rounded-full ring-1 ring-blue-500/30 transition-transform hover:scale-110" 
          />
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate max-w-[80px]">{task.assignee.split(' ')[0]} {task.assignee.split(' ')[1]?.[0]}.</p>
            <p className="text-xs text-slate-400">{task.assigneeRole}</p>
          </div>
        </div>
      </td>
      <td className="px-2 py-2 text-xs text-slate-300">
        <div className="text-xs">
          <div className="font-medium">{formatDate(task.date).split(' ').slice(0, 2).join(' ')}</div>
          <div className={task.status === 'completada' ? 'text-green-400' : 'text-slate-500'}>
            {formatTime(task.date)}
          </div>
        </div>
      </td>
      <td className="px-2 py-2">
        <div className="flex items-center space-x-1">
          {getActionButtons()}
        </div>
      </td>
    </tr>
  );
};
