import React from 'react';
import Link from 'next/link';
import { FaLayerGroup } from 'react-icons/fa';
import Volver from '@/components/elements/botonVolver';

export default function ContenidosPage() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="mt-4 ml-4">
        <Volver href='/admin' />
      </div>

      <div className="flex flex-col flex-grow justify-center items-center yagora">
        <div className="flex items-center mt-8 mb-12">
          <FaLayerGroup className="mr-4 text-6xl text-blue-600" />
          <h1 className="font-semibold text-5xl text-gray-800 story">Seleccione el Nivel</h1>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 px-4 w-full max-w-5xl">
          <Link href="/niveles/nivel1" passHref>
            <div className="bg-blue-500 hover:bg-blue-600 shadow-lg px-8 py-8 rounded-full font-bold text-2xl text-center text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
              Nivel 1
            </div>
          </Link>
          <Link href="/niveles/nivel2" passHref>
            <div className="bg-green-500 hover:bg-green-600 shadow-lg px-8 py-8 rounded-full font-bold text-2xl text-center text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
              Nivel 2
            </div>
          </Link>
          <Link href="/niveles/nivel3" passHref>
            <div className="bg-yellow-500 hover:bg-yellow-600 shadow-lg px-8 py-8 rounded-full font-bold text-2xl text-center text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
              Nivel 3
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
