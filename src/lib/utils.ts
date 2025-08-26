import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Swal from 'sweetalert2';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ToastIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

export const showToast = (icon: ToastIcon, title: string) => {
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
};