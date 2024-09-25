"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Volver from '@/components/botonVolver';
import { SeparadorAnaranjado } from '@/components/separador';
import Loading from '@/components/loading';

export default function InglesLeccionComponent({ id }) {
  const [leccion, setLeccion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchLeccion = async () => {
      try {
        const res = await fetch(`/assets/materias/ingles/nivel1/contenidos/${id}.json`);
        if (!res.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await res.json();
        setLeccion(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar la lección:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLeccion();
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!leccion) {
    return <div>No se encontró la lección.</div>;
  }

  const handleOpenDoor = () => {
    setIsOpen(true);
  };

  // Asignamos la imagen genérica si no existe una específica
  const imagenLeccion = leccion.imagenLeccion ? leccion.imagenLeccion : '/img/personajes/griffit/griffit.png';

  return (
    <main className="relative">
      <SeparadorAnaranjado />

      {/* Botón de Volver */}
      <div className="top-4 left-4 z-10 absolute">
        <Volver href="/niveles/nivel1/ingles" />
      </div>

      <div className="flex justify-center items-center bg-gradient-to-r from-yellow-100 via-pink-100 to-yellow-100 min-h-screen">
        {/* Portada de la puerta de aula */}
        {!isOpen && (
          <div
            onClick={handleOpenDoor}
            className="relative transition-transform duration-500 cursor-pointer hover:scale-105"
          >
            {/* Imagen de la puerta de aula */}
            <img
              src="/img/niveless/ingles/puerta.png" // Ruta de la imagen de la puerta
              alt="Puerta de Aula"
              className="w-[480px] h-[500px]"  // Ajuste de tamaño de la imagen
            />

            {/* Contenido centrado en la puerta */}
            <div className="top-2 left-0 absolute flex flex-col justify-center items-center p-8 w-full h-full">
              {/* Título en la puerta */}
              <h1 className="mb-2 font-bold text-4xl text-black text-center story">
                Lesson / Lección
              </h1>

              {/* Imagen adicional */}
              <img
                src={leccion.imagenPortada || '/img/personajes/griffit/griffit.png'}
                alt={`${leccion.tituloEspanol} / ${leccion.tituloIngles}`}
                className="mb-4 w-28 h-auto"
              />

              {/* Título de la lección */}
              <h1 className="mb-6 font-bold text-3xl text-black text-center story">
                {leccion.tituloIngles} / {leccion.tituloEspanol}
              </h1>
            </div>
          </div>
        )}

        {/* Contenido de la pizarra cuando se abre la puerta */}
        {isOpen && (
          <div
            className="relative bg-cover bg-center shadow-2xl w-[900px] h-[550px] transition-transform duration-700"
            style={{
              backgroundImage: "url('/img/niveless/ingles/pizarra.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Imagen en la esquina superior derecha */}
            <div className="top-28 right-14 absolute">
              <img
                src={imagenLeccion}
                alt="Imagen de la lección"
                className="w-[100px] h-[100px] object-contain"
              />
            </div>

            {/* Contenido de la lección en la pizarra */}
            <div className="top-[12%] left-[15%] absolute p-6 w-[70%] h-[75%] overflow-auto story">
              {/* Título de la lección */}
              <p className="font-bold text-2xl text-blue-800">Lesson / Lección</p>
              <div className="flex items-center">
                <h2 className="font-bold text-3xl">{leccion.leccion.tituloIngles}</h2>
                <audio controls className="ml-10">
                  <source src={leccion.leccion.audioTituloIngles} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <p className="text-lg italic">{leccion.leccion.tituloEspanol}</p>

              {/* Ejemplos */}
              <p className="mt-6 font-bold text-2xl text-blue-800">Examples / Ejemplos</p>
              {leccion.leccion.ejemplos.map((ejemplo, index) => (
                <div key={index} className="my-2">
                  {/* Contenedor de oración en inglés y audio */}
                  <div className="flex items-center space-x-4">
                    {/* Oración en inglés */}
                    <p className="font-serif text-lg leading-relaxed">
                      <strong>{ejemplo.oracionIngles}</strong>
                    </p>

                    {/* Audio en inglés */}
                    <audio controls className="ml-10">
                      <source src={ejemplo.audio} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Oración en español */}
                  <p className="mt-1 text-gray-600 italic">{ejemplo.oracionEspanol}</p>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>

      <SeparadorAnaranjado />
    </main>
  );
}
