// Página principal del PANEL DE ADMINISTRACIÓN
import React from 'react';
import Link from 'next/link';
import { FaUsers, FaFileAlt, FaComments, FaBell, FaTools } from 'react-icons/fa';

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Título centrado con icono */}
      <div className="flex items-center mb-12">
        <FaTools className="text-5xl text-black mr-4" /> {/* Icono negro para el título */}
        <h1 className="text-5xl font-semibold text-gray-800">Panel de Administración</h1> 
      </div>
      
      {/* Contenedor de los enlaces con iconos */}
      <div className="grid grid-cols-2 gap-24"> 
        {/* Gestión de Usuarios */}
        <Link href="/admin/users" className="flex flex-col items-center group">
          <FaUsers className="text-9xl text-blue-500 group-hover:text-blue-700 transition duration-300 transform group-hover:scale-110 mb-6 shadow-lg" />
          <span className="text-xl font-semibold text-gray-700 group-hover:text-blue-700 transition duration-300">Gestión de Usuarios</span>
        </Link>
        
        {/* Administración de Contenido */}
        <Link href="/contents" className="flex flex-col items-center group">
          <FaFileAlt className="text-9xl text-green-500 group-hover:text-green-700 transition duration-300 transform group-hover:scale-110 mb-6 shadow-lg" />
          <span className="text-xl font-semibold text-gray-700 group-hover:text-green-700 transition duration-300">Administración de Contenido</span>
        </Link>
        
        {/* Administración de Feedback */}
        <Link href="/feedback" className="flex flex-col items-center group">
          <FaComments className="text-9xl text-yellow-500 group-hover:text-yellow-700 transition duration-300 transform group-hover:scale-110 mb-6 shadow-lg" />
          <span className="text-xl font-semibold text-gray-700 group-hover:text-yellow-700 transition duration-300">Administración de Feedback</span>
        </Link>
        
        {/* Monitoreo y Alertas */}
        <Link href="/alerts" className="flex flex-col items-center group">
          <FaBell className="text-9xl text-red-500 group-hover:text-red-700 transition duration-300 transform group-hover:scale-110 mb-6 shadow-lg" />
          <span className="text-xl font-semibold text-gray-700 group-hover:text-red-700 transition duration-300">Monitoreo y Alertas</span>
        </Link>
      </div>
    </div>
  );
}
