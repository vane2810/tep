"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Volver from '@/components/elements/botonVolver';
import { SeparadorAnaranjado } from '@/components/separador';
import Loading from '@/components/loading';

export default function InglesLeccionComponent({ id }) {
  const [lecciones, setLecciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Para navegar entre las lecciones
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchLecciones = async () => {
      try {
        const res = await fetch(`/assets/materias/ingles/nivel1/contenidos/${id}.json`);
        if (!res.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await res.json();
        if (data.lecciones) {
          setLecciones(Object.values(data.lecciones)); // Aquí obtenemos todas las lecciones
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar las lecciones:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLecciones();
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!lecciones || lecciones.length === 0) {
    return <div>No se encontraron lecciones.</div>;
  }

  const currentLeccion = lecciones[currentPage]; // Lección actual basada en el índice

  const handleOpenDoor = () => {
    setIsOpen(true);
  };

  // Función para navegar a la siguiente lección
  const nextPage = () => {
    if (currentPage < lecciones.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para regresar a la lección anterior
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Función para redirigir a la página del juego
  const handlePlayGame = () => {
    router.push(`/niveles/nivel3/ingles/${id}/${id}/${id}`);

  };
  // Asignamos una imagen genérica si no hay imagenLeccion específica
  const imagenLeccion = currentLeccion.imagenLeccion || '/img/personajes/griffit/griffit.png';

  return (
    <main className="relative">
      <SeparadorAnaranjado />

      {/* Botón de Volver */}
      <div className="top-4 left-4 z-10 absolute">
        <Volver href="/niveles/nivel3/ingles" />
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
              src="/img/niveless/ingles/puerta.png"
              alt="Puerta de Aula"
              className="w-[480px] h-[500px]"
            />

            {/* Contenido centrado en la puerta */}
            <div className="top-2 left-0 absolute flex flex-col justify-center items-center p-8 w-full h-full">
              <h1 className="mb-2 font-bold text-4xl text-black text-center story">
                Lesson / Lección
              </h1>

              <img
                src={currentLeccion.imagenPortada || '/img/personajes/griffit/griffit.png'}
                alt={`${currentLeccion.tituloEspanol} / ${currentLeccion.tituloIngles}`}
                className="mb-4 w-28 h-auto"
              />

              <h1 className="mb-6 font-bold text-3xl text-black text-center story">
                {currentLeccion.tituloIngles} / {currentLeccion.tituloEspanol}
              </h1>
            </div>
          </div>
        )}

        {/* Contenido de la pizarra cuando se abre la puerta */}
        {isOpen && (
          <div
            className="relative bg-cover bg-center shadow-2xl w-[900px] h-[600px] transition-transform duration-700"
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
              <p className="font-bold text-2xl text-blue-800">Lesson / Lección</p>
              <div className="flex items-center">
                <h2 className="font-bold text-3xl">{currentLeccion.tituloIngles}</h2>
                <audio controls className="ml-10">
                  <source src={currentLeccion.audioTituloIngles} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <p className="text-lg italic">{currentLeccion.tituloEspanol}</p>

              {/* Ejemplos */}
              <p className="mt-6 font-bold text-2xl text-blue-800">Examples / Ejemplos</p>
              {currentLeccion.ejemplos.map((ejemplo, index) => (
                <div key={index} className="my-2">
                  <div className="flex items-center space-x-4">
                    <p className="font-serif text-lg leading-relaxed">
                      <strong>{ejemplo.oracionIngles}</strong>
                    </p>
                    <audio controls className="ml-10">
                      <source src={ejemplo.audio} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <p className="mt-1 text-gray-600 italic">{ejemplo.oracionEspanol}</p>
                </div>
              ))}

              {/* Flechas de navegación */}
              <div className="bottom-4 left-14 absolute">
                {currentPage > 0 && (
                  <img
                    onClick={prevPage}
                    src="/img/niveless/lenguaje/flecha_libro_izquierda.png"
                    alt="Anterior"
                    title="Anterior"
                    className="w-8 h-8 transition-transform cursor-pointer hover:scale-110"
                  />
                )}
              </div>

              {/* Flecha derecha en la página derecha */}
              <div className="right-14 bottom-4 absolute"> {/* Ajustar bottom a 12 para acercarla */}
                {currentPage < lecciones.length - 1 ? (
                  <img
                    onClick={nextPage}
                    src="/img/niveless/lenguaje/flecha_libro_derecha.png"
                    alt="Siguiente"
                    title="Siguiente"
                    className="w-8 h-8 transition-transform cursor-pointer hover:scale-110"
                  />
                ) : (
                  <button
                    onClick={handlePlayGame}
                    className="bg-orange-500 hover:bg-orange-700 px-6 py-2 rounded-lg text-white text-xl transition duration-300 story"
                  >
                    Jugar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <SeparadorAnaranjado />
    </main>
  );
}
