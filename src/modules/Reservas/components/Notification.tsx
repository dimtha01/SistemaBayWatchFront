// src/modules/Rooms/components/Notification.tsx
import React, { useEffect } from 'react';
import { X, Check, AlertCircle, Info } from 'lucide-react';
import type { NotificationType } from '../types/room.types';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600/90 border-green-500/30';
      case 'error':
        return 'bg-[#F20C1F]/90 border-[#F20C1F]/30';
      case 'info':
        return 'bg-blue-600/90 border-blue-500/30';
      default:
        return 'bg-gray-600/90 border-gray-500/30';
    }
  };

  return (
    <div className={`fixed top-6 right-6 ${getTypeClasses()} text-white px-6 py-4 rounded-xl shadow-2xl z-50 backdrop-blur-sm border max-w-sm animate-in slide-in-from-right duration-300`}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
