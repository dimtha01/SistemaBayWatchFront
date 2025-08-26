import { useEffect } from 'react';
import Swal from 'sweetalert2';

type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

interface AlertProps {
  icon: AlertIcon;
  title: string;
}

const Alert = ({ icon, title }: AlertProps) => {
  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: icon,
      title: title
    });
  }, [icon, title]);

  return null;
};

export default Alert;
