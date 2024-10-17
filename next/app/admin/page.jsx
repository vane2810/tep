// Página principal del PANEL DE ADMINISTRACIÓN
import React from 'react';
import Link from 'next/link';
import { FaUsers, FaFileAlt, FaComments, FaTools } from 'react-icons/fa';
import Volver from '@/components/botonVolver';

export default function AdminPage() {
  return (

    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Botón de Volver alineado a la izquierda */}
      <div className="ml-4">
        <Volver href='/' />
      </div>

      {/* Contenido principal centrado */}
      <div className="flex flex-col flex-grow justify-center items-center">
        {/* Título centrado con icono */}
        <div className="flex items-center mt-0 mb-28">
          <FaTools className="mr-4 text-5xl text-black" /> {/* Icono negro para el título */}
          <h1 className="font-semibold text-4xl text-black story">Panel de Administración</h1>
        </div>

        {/* Contenedor de los enlaces con iconos */}
        <div className="gap-24 grid grid-cols-3 mb-8 story">
          {/* Gestión de Usuarios */}
          <Link href="/admin/users" className="flex flex-col items-center group">
            <FaUsers className="group-hover:text-blue-700 group-hover:scale-110 shadow-lg mb-6 text-9xl text-blue-500 transform transition duration-300" />
            <span className="group-hover:text-blue-700 font-semibold text-2xl text-black transition duration-300">Gestión de Usuarios</span>
          </Link>

          {/* Administración de Contenido */}
          <Link href="/admin/contents" className="flex flex-col items-center group">
            <FaFileAlt className="group-hover:text-green-700 group-hover:scale-110 shadow-lg mb-6 text-9xl text-green-500 transform transition duration-300" />
            <span className="group-hover:text-green-700 font-semibold text-2xl text-black transition duration-300">Administración de Contenido</span>
          </Link>

          {/* Administración de Feedback */}
          <Link href="/admin/feedback" className="flex flex-col items-center group">
            <FaComments className="group-hover:text-yellow-700 group-hover:scale-110 shadow-lg mb-6 text-9xl text-yellow-500 transform transition duration-300" />
            <span className="group-hover:text-yellow-700 font-semibold text-2xl text-black transition duration-300">Administración de Feedback</span>
          </Link>
        </div>
      </div>
    </div>

  );
}
