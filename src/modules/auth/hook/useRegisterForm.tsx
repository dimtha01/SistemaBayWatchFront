import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { register as registerService } from '../services/auth.service';
import { showToast } from '@/lib/utils';

export const useRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    // Add more validations here if needed (e.g., regex for complexity)
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      showToast('error', passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      showToast('error', "Las contraseñas no coinciden");
      return;
    }
    
    setIsLoading(true);

    try {
      await registerService({ email, password });
      await login({ email, password });
      showToast('success', '¡Registro exitoso!');
      navigate('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
      setError(errorMessage);
      showToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    isLoading,
    handleSubmit,
  };
};