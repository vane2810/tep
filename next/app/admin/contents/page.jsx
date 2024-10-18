import React from 'react';
import Link from 'next/link';
import { FaLayerGroup } from 'react-icons/fa';
import Volver from '@/components/botonVolver';

export default function ContenidosPage() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="mt-4 ml-4">
        <Volver href='/admin' />
      </div>

      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="flex items-center mt-2 mb-12">
          <FaLayerGroup className="mr-4 text-6xl text-blue-600" />
          <h1 className="font-semibold text-5xl text-gray-800 story">Seleccione el Nivel</h1>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 px-4 w-full max-w-5xl">
          <Link href="/admin/contents/1" className="bg-blue-500 hover:bg-blue-600 shadow-lg px-8 py-6 rounded-lg font-bold text-2xl text-center text-white transform hover:scale-105 transition-all duration-300">
            Nivel 1
          </Link>
          <Link href="/admin/contents/2" className="bg-green-500 hover:bg-green-600 shadow-lg px-8 py-6 rounded-lg font-bold text-2xl text-center text-white transform hover:scale-105 transition-all duration-300">
            Nivel 2
          </Link>
          <Link href="/admin/contents/3" className="bg-yellow-500 hover:bg-yellow-600 shadow-lg px-8 py-6 rounded-lg font-bold text-2xl text-center text-white transform hover:scale-105 transition-all duration-300">
            Nivel 3
          </Link>
        </div>
      </div>
    </div>
  );
}
