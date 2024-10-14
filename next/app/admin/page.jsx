// Página principal del PANEL DE ADMINISTRACIÓN
import React from 'react';
import Link from 'next/link';


export default function AdminPage() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <Link
        href="/admin/users"
        className='mr-6'>
        Gestión de Usuarios
      </Link>
      <Link
        href="/contents"
        className='mr-6'>
        Administración de Contenido
      </Link>

      <Link
        href="/feedback"
        className='mr-6'>
        Administración de Feedback
      </Link>
      <Link
        href="/alerts"
        className='mr-6'>
        Monitoreo y Alertas
      </Link>
    </div>
  );
}



