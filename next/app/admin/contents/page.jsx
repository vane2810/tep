import React from 'react';
import Link from 'next/link';
import { FaLayerGroup } from 'react-icons/fa';
import Volver from '@/components/botonVolver';

export default function ContenidosPage() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Botón de Volver alineado a la izquierda */}
      <div className="ml-4">
        <Volver href='/' />
      </div>

      {/* Contenido principal centrado */}
      <div className="flex flex-col flex-grow justify-center items-center">
        {/* Título centrado con icono */}
        <div className="flex items-center mt-0 mb-10">
          <FaLayerGroup className="mr-4 text-5xl text-black" />
          <h1 className="font-semibold text-4xl text-black story">Seleccione el Nivel</h1>
        </div>

        {/* Contenedor de los niveles */}
        <div className="gap-12 grid grid-cols-1 md:grid-cols-3 mb-8 story">
          <Link href="/admin/contents/1" className="bg-blue-500 px-8 py-4 rounded text-2xl text-center text-white">Nivel 1</Link>
          <Link href="/admin/contents/2" className="bg-green-500 px-8 py-4 rounded text-2xl text-center text-white">Nivel 2</Link>
          <Link href="/admin/contents/3" className="bg-yellow-500 px-8 py-4 rounded text-2xl text-center text-white">Nivel 3</Link>
        </div>
      </div>
    </div>
  );
}
