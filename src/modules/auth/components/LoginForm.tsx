'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useLoginForm } from '../hook/useLoginForm';

export const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-4'>
      {/* Elementos decorativos de fondo */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse'></div>
      </div>

      <Card className='w-full max-w-md relative z-10 bg-white/80 backdrop-blur-sm border-0 shadow-2xl'>
        <CardHeader className='text-center pb-2'>
          {/* Logo/Ícono */}
          <div className='mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg'>
            <Lock className='w-8 h-8 text-white' />
          </div>
          <CardTitle className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent'>
            Bienvenido de Nuevo
          </CardTitle>
          <p className='text-gray-600 text-sm mt-2'>
            Ingresa tus credenciales para continuar
          </p>
        </CardHeader>

        <CardContent className='pt-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Campo Email */}
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-sm font-medium text-gray-700'
              >
                Correo Electrónico
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                <Input
                  id='email'
                  type='email'
                  placeholder='tu@ejemplo.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-10 h-12 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400 transition-colors'
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-sm font-medium text-gray-700'
              >
                Contraseña
              </Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10 pr-12 h-12 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400 transition-colors'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-3 h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Recordar contraseña */}
            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center space-x-2 cursor-pointer'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-red-600 focus:ring-red-500'
                />
                <span className='text-gray-600'>Recordarme</span>
              </label>
              <a
                href='#'
                className='text-red-600 hover:text-yellow-500 hover:underline font-medium transition-colors'
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {error && <p className='text-sm text-red-600 text-center'>{error}</p>}

            {/* Botón de submit */}
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-70'
            >
              {isLoading ? (
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <div className='flex items-center space-x-2'>
                  <span>Iniciar Sesión</span>
                  <ArrowRight className='w-4 h-4' />
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-gray-200' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white px-2 text-gray-500'>
                  O continúa con
                </span>
              </div>
            </div>

            {/* Botones de redes sociales */}
            <div className='grid grid-cols-2 gap-3'>
              <Button
                type='button'
                variant='outline'
                className='h-11 border-gray-200 hover:bg-yellow-50 hover:border-yellow-300 transition-colors'
              >
                <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Google
              </Button>
              <Button
                type='button'
                variant='outline'
                className='h-11 border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors'
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='#1877F2'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
                Facebook
              </Button>
            </div>

            {/* Enlace de registro */}
            <p className='text-center text-sm text-gray-600 pt-4'>
              ¿No tienes una cuenta?{' '}
              <a
                href='/register'
                className='text-red-600 hover:text-yellow-500 font-semibold hover:underline transition-colors'
              >
                Regístrate aquí
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};