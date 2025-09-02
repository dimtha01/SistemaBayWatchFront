import type { Task } from '../types/task.types';
import { formatDate } from '../utils/dateUtils';
import { getCategoryName, getPriorityName, getStatusName } from '../utils/taskUtils';

export const exportTasksToCSV = (tasks: Task[]): void => {
  const csvContent = "data:text/csv;charset=utf-8,"
    + "ID,Descripción,Ubicación,Categoría,Prioridad,Estado,Asignado,Fecha,Fecha Límite,Tiempo Estimado\n"
    + tasks.map(task =>
      `${task.id},"${task.description}","${task.location}","${getCategoryName(task.category)}","${getPriorityName(task.priority)}","${getStatusName(task.status)}","${task.assignee}","${formatDate(task.date)}","${formatDate(task.deadline)}","${task.estimatedTime}h"`
    ).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `tareas_mantenimiento_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
