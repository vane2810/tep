// Página principal para las lecciones de inglés
"use client";
import React, { useState, useEffect } from 'react';
import Volver from '@/components/botonVolver';
import { SeparadorAnaranjado } from '@/components/separador';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading';

export default function InglesComponent({ id }) {
  const [leccion, setLeccion] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLeccion = async () => {
      try {
        const res = await fetch(`/assets/materias/ingles/nivel1/lecciones/leccion${id}.json`);
        if (!res.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await res.json();
        setLeccion(data);
      } catch (error) {
        console.error('Error al cargar los datos de la lección:', error);
      }
    };

    if (id) {
      fetchLeccion();
    }
  }, [id]);

  if (!leccion) {
    return (
      <Loading />
    );
  }

  return (
    <main className="relative bg-gray-50">
      <SeparadorAnaranjado />
      <Volver href="/niveles/nivel1/ingles" />

      {/* Título de bienvenida en inglés y español */}
      <div className="flex justify-center items-center">
        <img
          src="/img/niveless/ingles/profesor.png"
          alt="Profesor de inglés"
          className="mr-8 w-48 h-42"
        />
        <div className="text-center">
          <h1 className="font-bold text-5xl text-blue-800 story">Welcome to the {leccion.nombreIngles} lessons</h1>
          <p className="mb-6 text-gray-600 text-xl italic">Bienvenidos a las lecciones de {leccion.nombreEspañol}</p>
        </div>
      </div>



      {/* Sección de tarjetas de lecciones */}
      <div className="mx-auto px-6 container">
        <div className="flex justify-center items-center my-8">
          <div className="text-center">
            <h3 className="font-bold text-3xl text-blue-800 story">Select a lesson</h3>
            <p className="text-gray-600 text-xl italic">Selecciona una lección</p>
          </div>
          <img
            src="/img/niveless/ingles/profesora.png"
            alt="Estudiante de inglés"
            className="ml-8 w-48 h-42"
          />
        </div>


        <div className="gap-8 grid grid-cols-3 my-10">
          {leccion.lecciones.map((leccion) => (
            <div key={leccion.id} className="flex flex-col items-center bg-white shadow-md hover:shadow-lg p-4 rounded-lg transform transition hover:-translate-y-1 duration-300 ease-in-out">
            {/* Título en inglés grande y traducción en español más pequeña */}
            <h5 className="mb-2 font-bold text-3xl story">{leccion.nombreIngles}</h5>
            <p className="mb-6 text-gray-600 text-lg italic">{leccion.nombreEspañol}</p>
          
            {/* Ajustar la imagen */}
            <div className="relative w-full h-40">
              <img
                src={leccion.imagen}
                alt={leccion.nombreIngles}
                title={`Lección ${leccion.nombreIngles}`}
                className="shadow-lg rounded-lg w-full h-full object-cover"
              />
            </div>
          
            <button
              className="bg-orange-500 hover:bg-orange-700 mt-4 px-4 py-2 rounded font-bold text-lg text-white story"
              onClick={() => router.push(`/niveles/nivel1/ingles/${id}/${leccion.id}`)}
              title={`Explorar ${leccion.nombreIngles}`}
            >
              Explore {leccion.nombreIngles}
            </button>
          </div>
          
          ))}
        </div>
      </div>

      <SeparadorAnaranjado />
    </main>
  );
}
