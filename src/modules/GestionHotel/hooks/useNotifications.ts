// src/modules/Rooms/hooks/useNotifications.ts
import { useState, useCallback } from 'react';
import type { NotificationType } from '../types/room.types';

interface NotificationState {
  id: string;
  message: string;
  type: NotificationType;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: NotificationState = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification
  };
};
