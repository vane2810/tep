"use client";
import React from 'react';

export default function Logout() {
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
      });
      if (res.ok) {
        alert('Sesión cerrada exitosamente');
        // Aquí podrías realizar cualquier otra acción después de cerrar sesión, como redireccionar a la página de inicio
      } else {
        const data = await res.json();
        alert(data.error || 'Error al cerrar sesión');
      }
    } catch (error) {
      alert('Error al cerrar sesión');
    }
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
}
