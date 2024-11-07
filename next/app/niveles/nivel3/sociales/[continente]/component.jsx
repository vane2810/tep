// Página principal para cada continente
"use client";
import React, { useState, useEffect } from 'react';
import Volver from '@/components/elements/botonVolver';
import { SeparadorAzul } from '@/components/separador';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading';

export default function SocialesComponent({ id }) { // Usar id recibido desde las props
  const [continente, setContinente] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchContinente = async () => {
      try {
        const res = await fetch(`/assets/materias/sociales/nivel3/continentes/continente${id}.json`);
        if (!res.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await res.json();
        setContinente(data);
      } catch (error) {
        console.error('Error al cargar los datos del continente:', error);
      }
    };

    if (id) {
      fetchContinente();
    }
  }, [id]);

  if (!continente) {
    return (
      <Loading/>
    );
  }

  return (
    <main className="relative bg-gray-50">
      <SeparadorAzul />
      <Volver href="/niveles/nivel3/sociales" />

      {/* Título de bienvenida */}
      <div className="flex justify-center items-center">
        <img
          src="/img/niveless/sociales/explorador.png"
          alt="Explorador"
          className="mr-8 w-32 h-30"
        />
        <h1 className="font-bold text-5xl text-blue-800 story">Bienvenidos a {continente.name}</h1>
      </div>


      {/* Sección con la imagen del continente y tarjeta para explorar */}
      <div className="flex justify-center items-center mx-auto mt-4 px-4 container">
        <div className="flex items-center bg-white shadow-lg p-4 rounded-lg max-w-4xl">

          <div className="flex-1 p-6 story">
            <h2 className="mb-8 font-bold text-3xl">Sabías que...</h2>
            <p className="mb-6 text-xl">{continente.descripcion}</p>
            <button
              className="bg-blue-700 hover:bg-blue-500 mt-4 px-4 py-2 rounded w-full font-bold text-white text-xl"
              onClick={() => router.push(`/niveles/nivel3/sociales/${id}/${continente.id}`)}
            >
              Explorar {continente.name}
            </button>
          </div>

          <div className="flex-1 p-2">
            <img src={continente.imagenPortada} alt={`Imagen de ${continente.name}`} className="rounded-lg max-w-xs md:max-w-md lg:max-w-lg" />
          </div>

        </div>
      </div>



      {/* Sección de tarjetas de países */}
      <div className="mx-auto px-6 container">
        <div className="flex justify-center items-center my-8">
          <h3 className="my-10 font-bold text-4xl text-blue-800 text-center story">Explora los países de {continente.name}</h3>
          <img
            src="/img/niveless/sociales/exploradora.png"
            alt="Exploradora"
            className="ml-8 w-32 h-30"
          />
        </div>

        <div className="gap-8 grid grid-cols-3 my-10">
          {continente.paises.map(pais => (
            <div key={pais.id} className="flex flex-col items-center bg-white shadow-md hover:shadow-lg p-4 rounded-lg transform transition hover:-translate-y-1 duration-300 ease-in-out">
              <h5 className="mb-6 font-bold text-3xl story">{pais.nombre}</h5>
              <img src={pais.imagen} alt={pais.nombre} title={`Bandera de ${pais.nombre}`} className="shadow-lg mb-6 rounded-lg w-full h-40 object-cover" />
              <button
                className="bg-blue-700 hover:bg-blue-500 px-4 py-2 rounded font-bold text-lg text-white story"
                onClick={() => router.push(`/niveles/nivel3/sociales/${id}/${pais.id}`)}
                title={`Explorar ${pais.nombre}`}
              >
                Explorar {pais.nombre}
              </button>
            </div>
          ))}
        </div>
      </div>


      <SeparadorAzul />
    </main>
  );
}