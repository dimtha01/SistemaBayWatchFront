import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
// import { showToast } from '@/lib/utils'; // Removed

type AlertInfo = { icon: 'success' | 'error' | 'warning' | 'info' | 'question'; title: string } | null;

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>(null); // New state for alert
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setAlertInfo(null); // Clear previous alert

    try {
      await login({ email, password });
      setAlertInfo({ icon: 'success', title: '¡Inicio de sesión exitoso!' });
      // Navigate after a short delay to allow toast to show
      setTimeout(() => {
        navigate('/');
      }, 1000); // Adjust delay as needed
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
      setError(errorMessage);
      setAlertInfo({ icon: 'error', title: errorMessage });
      onLoginResult('error', errorMessage, '');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    isLoading,
    handleSubmit,
    alertInfo, // Return alertInfo
  };
};
