import { useEffect } from 'react';
import Swal from 'sweetalert2';

type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

interface AlertProps {
  icon: AlertIcon;
  title: string;
  text?: string;
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  timer?: number;
  showConfirmButton?: boolean;
}

const Alert = ({ 
  icon, 
  title, 
  text,
  position = "top-end",
  timer = 3000,
  showConfirmButton = false
}: AlertProps) => {
  useEffect(() => {
    // Colores personalizados basados en tu paleta
    const getCustomColors = (alertIcon: AlertIcon) => {
      switch (alertIcon) {
        case 'success':
          return {
            background: '#262626',
            color: '#ffffff',
            iconColor: '#10b981', // Verde para success
            progressBarColor: '#10b981',
            borderColor: '#731A1A'
          };
        case 'error':
          return {
            background: '#262626',
            color: '#ffffff',
            iconColor: '#F20C1F',
            progressBarColor: '#F20C1F',
            borderColor: '#F20C1F'
          };
        case 'warning':
          return {
            background: '#262626',
            color: '#ffffff',
            iconColor: '#f59e0b', // Amarillo para warning
            progressBarColor: '#f59e0b',
            borderColor: '#731A1A'
          };
        case 'info':
          return {
            background: '#262626',
            color: '#ffffff',
            iconColor: '#3b82f6', // Azul para info
            progressBarColor: '#3b82f6',
            borderColor: '#731A1A'
          };
        case 'question':
          return {
            background: '#262626',
            color: '#ffffff',
            iconColor: '#8b5cf6', // Púrpura para question
            progressBarColor: '#8b5cf6',
            borderColor: '#731A1A'
          };
        default:
          return {
            background: '#262626',
            color: '#ffffff',
            iconColor: '#F20C1F',
            progressBarColor: '#F20C1F',
            borderColor: '#731A1A'
          };
      }
    };

    const colors = getCustomColors(icon);

    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: showConfirmButton,
      timer: timer,
      timerProgressBar: true,
      background: colors.background,
      color: colors.color,
      customClass: {
        popup: 'custom-toast-popup',
        title: 'custom-toast-title',
        timerProgressBar: 'custom-progress-bar',
        icon: 'custom-toast-icon'
      },
      didOpen: (toast) => {
        // Aplicar estilos personalizados
        const style = document.createElement('style');
        style.textContent = `
          .custom-toast-popup {
            background: ${colors.background} !important;
            border: 2px solid ${colors.borderColor} !important;
            border-radius: 12px !important;
            box-shadow: 
              0 10px 25px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(242, 12, 31, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          }
          
          .custom-toast-title {
            color: ${colors.color} !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
          }
          
          .custom-progress-bar {
            background: linear-gradient(90deg, ${colors.progressBarColor} 0%, ${colors.iconColor} 100%) !important;
            height: 4px !important;
            border-radius: 2px !important;
          }
          
          .custom-toast-icon {
            color: ${colors.iconColor} !important;
            border-color: ${colors.iconColor} !important;
            font-size: 20px !important;
          }
          
          .swal2-icon.swal2-success .swal2-success-ring {
            border-color: ${colors.iconColor} !important;
          }
          
          .swal2-icon.swal2-success .swal2-success-fix {
            background-color: ${colors.background} !important;
          }
          
          .swal2-icon.swal2-error .swal2-error-x-mark .swal2-error-line {
            background-color: ${colors.iconColor} !important;
          }
          
          .swal2-icon.swal2-warning {
            border-color: ${colors.iconColor} !important;
            color: ${colors.iconColor} !important;
          }
          
          .swal2-icon.swal2-info {
            border-color: ${colors.iconColor} !important;
            color: ${colors.iconColor} !important;
          }
          
          .swal2-icon.swal2-question {
            border-color: ${colors.iconColor} !important;
            color: ${colors.iconColor} !important;
          }
          
          /* Animación de entrada personalizada */
          .custom-toast-popup {
            animation: slideInRight 0.3s ease-out !important;
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          /* Hover effects */
          .custom-toast-popup:hover {
            transform: scale(1.02) !important;
            transition: transform 0.2s ease !important;
            box-shadow: 
              0 15px 35px rgba(0, 0, 0, 0.4),
              0 0 25px rgba(242, 12, 31, 0.2) !important;
          }
        `;
        
        document.head.appendChild(style);
        
        // Event listeners para hover
        toast.onmouseenter = () => {
          Swal.stopTimer();
          toast.style.transform = 'scale(1.02)';
        };
        
        toast.onmouseleave = () => {
          Swal.resumeTimer();
          toast.style.transform = 'scale(1)';
        };
        
        // Cleanup del style cuando se cierre
        toast.addEventListener('beforeunload', () => {
          document.head.removeChild(style);
        });
      }
    });

    Toast.fire({
      icon: icon,
      title: title,
      text: text
    });
  }, [icon, title, text, position, timer, showConfirmButton]);

  return null;
};

export default Alert;
