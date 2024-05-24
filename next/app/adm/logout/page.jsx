"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // Hacer una solicitud al backend para cerrar la sesión
        await fetch('/api/auth/logout', { method: 'POST' });

        // Limpiar el localStorage u otros datos de autenticación
        localStorage.removeItem('user');

        // Redirigir al usuario a la página de inicio de sesión
        router.push('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Podrías mostrar un mensaje de error al usuario aquí
      }
    };

    logout();
  }, []);

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
}
