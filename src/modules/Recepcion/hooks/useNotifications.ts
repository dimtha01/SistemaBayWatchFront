// src/modules/Reservations/hooks/useNotifications.ts
import { useState, useCallback } from 'react';
import type { NotificationType } from '../types/reservation.types';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  isVisible: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      id,
      message,
      type,
      isVisible: true
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isVisible: false } : notif
        )
      );
      
      // Remove from array after animation
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
      }, 300);
    }, 4000);
  }, []);

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isVisible: false } : notif
      )
    );
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 300);
  }, []);

  return {
    notifications,
    showNotification,
    hideNotification
  };
};
