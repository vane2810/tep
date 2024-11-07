// components/Video.js
"use client";
import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Video() {
  const router = useRouter();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* Imagen Superior Centrada */}
      <div className="absolute top-0 transform -translate-y-28">
        <Image
          src="/img/inicio/starlycohete.png" // Ruta a la imagen de Starly en el cohete
          alt="Nivel Superior"
          width={220} // Tamaño original de Starly
          height={220}
          className="shadow-lg"
        />
      </div>

      {/* Línea de tres imágenes con etiquetas más arriba */}
      <div className="flex gap-16 mt-60">
        
        {/* Imagen Izquierda (cohete1) */}
        <button onClick={() => router.push('/niveles/nivel1')} className="focus:outline-none flex flex-col items-center">
          <p className="mb-10 px-2 py-1 bg-white border border-black rounded-lg text-lg font-bold text-center text-blue-500">
            Nivel 1, Cuarto Grado
          </p>
          <div className="w-[240px] h-[240px] flex items-center justify-center">
            <Image
              src="/img/inicio/cohete1.png" // Ruta a la imagen del cohete1
              alt="Nivel 1"
              width={215} // Tamaño interno del cohete1
              height={215}
              className="shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </button>

        {/* Imagen Central (cohete2) */}
        <button onClick={() => router.push('/niveles/nivel2')} className="focus:outline-none flex flex-col items-center">
          <p className="mb-10 px-2 py-1 bg-white border border-black rounded-lg text-lg font-bold text-center text-red-500">
            Nivel 2, Quinto Grado
          </p>
          <div className="w-[240px] h-[240px] flex items-center justify-center">
            <Image
              src="/img/inicio/cohete2.png" // Ruta a la imagen del cohete2
              alt="Nivel 2"
              width={215} // Tamaño interno del cohete2
              height={215}
              className="shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </button>

        {/* Imagen Derecha (cohete3) */}
        <button onClick={() => router.push('/niveles/nivel3')} className="focus:outline-none flex flex-col items-center">
          <p className="mb-10 px-2 py-1 bg-white border border-black rounded-lg text-lg font-bold text-center text-yellow-600">
            Nivel 3, Sexto Grado
          </p>
          <div className="w-[240px] h-[240px] flex items-center justify-center">
            <Image
              src="/img/inicio/cohete3.png" // Ruta a la imagen del cohete3
              alt="Nivel 3"
              width={215} // Tamaño interno del cohete3
              height={215}
              className="shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </button>
      </div>
      
    </div>
  );
}
