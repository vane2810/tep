// Componente reutilizable para lenguaje de todos los niveles
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Volver from '@/components/botonVolver';
import { SeparadorMorado } from '@/components/separador';

export default function Component({ id }) {
  const [lecciones, setLecciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [tituloGeneral, setTituloGeneral] = useState('');
  const [imagenPortada, setImagenPortada] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();  // Inicializar useRouter correctamente

  useEffect(() => {
    const fetchLecciones = async () => {
      try {
        const res = await fetch(`/assets/materias/lenguaje/nivel1/contenido${id}.json`);
        if (!res.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await res.json();

        if (data.lecciones) {
          setLecciones(Object.values(data.lecciones));
          setTituloGeneral(data.tituloGeneral || '');
          setImagenPortada(data.imagenPortada || '');
        } else {
          throw new Error('El archivo JSON no contiene lecciones');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar las lecciones:', error);
        setLecciones([]);
        setIsLoading(false);
      }
    };
    fetchLecciones();
  }, [id]);

  const handleOpenBook = () => {
    setIsOpen(true);
  };

  const nextPage = () => {
    if (currentPage < lecciones.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para redirigir a la página del juego
  const handlePlayGame = () => {
    router.push(`/niveles/nivel1/lenguaje/${id}/${id}`);

  };


  if (!lecciones || lecciones.length === 0) {
    return null;
  }

  const currentLeccion = lecciones[currentPage];

  return (
    <main className="relative">
      <SeparadorMorado />

      {/* Botón de Volver */}
      <div className="top-4 left-4 z-10 absolute">
        <Volver href="/niveles/nivel1/lenguaje" />
      </div>

      <div className="flex justify-center items-center bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-100 min-h-screen">
        {/* Portada del libro */}
        {!isOpen && (
          <div
            onClick={handleOpenBook}
            className="relative flex flex-col justify-center items-center bg-gradient-to-b from-[#7B3F00] to-[#3E1F00] shadow-2xl hover:shadow-xl rounded-lg w-[400px] h-[500px] text-white transition-transform duration-500 cursor-pointer hover:scale-105"
          >
            {/* Simulación de una portada con color marrón */}
            <div className="flex flex-col justify-center items-center p-8 w-full h-full">
              {/* Título del libro en la portada */}
              <h1 className="mb-6 font-bold text-5xl text-center text-white story">
                Lección {id}:
              </h1>

              {/* Imagen del principito */}
              <img src={imagenPortada || '/img/personajes/principe/principe.png'}
                alt={tituloGeneral}
                className="mb-6 w-24 h-auto"
              />


              <h1 className="mb-6 font-bold text-4xl text-center text-white story">
                {tituloGeneral}
              </h1>

              {/* Simulación de decoración con líneas para darle apariencia de libro */}
              <div className="mt-8 border-t-4 border-t-yellow-300 w-3/4"></div>
              <div className="mt-4 border-t-2 border-t-yellow-200 w-1/2"></div>
            </div>
          </div>
        )}

        {/* Contenido del libro cuando está abierto */}
        {isOpen && (
          <div
            className="relative bg-cover bg-center shadow-2xl w-[850px] h-[550px] transition-transform duration-700"
            style={{ backgroundImage: "url('/img/niveless/lenguaje/libro_abierto.png')" }}
          >
            {/* Página izquierda del libro */}
            <div className="top-[10%] left-[10%] absolute p-8 w-[38%] h-[65%] story">
              <h2 className="mb-4 font-bold text-2xl">{currentLeccion.titulo}</h2>
              <p className="font-serif text-lg leading-relaxed">{currentLeccion.descripcion}</p>

              {/* Imagen de la lección dentro del libro, ajustada */}<img
                src={currentLeccion.imagenLeccion || '/img/personajes/principe/principe.png'}
                alt={currentLeccion.titulo}
                className="mt-4 rounded-lg w-[100%] h-[100px] object-contain"
              />

              {/* Flecha izquierda en la página izquierda */}
              {currentPage > 0 && (
                <div className="bottom-4 left-4 absolute">
                  <img
                    onClick={prevPage}
                    src="/img/niveless/lenguaje/flecha_libro_izquierda.png"
                    alt="Anterior"
                    title="Anterior"
                    className="w-8 h-8 transition-transform cursor-pointer hover:scale-110"
                  />
                </div>
              )}
            </div>

            {/* Página derecha del libro */}
            <div className="top-[10%] right-[10%] absolute p-8 w-[38%] h-[65%]">
              <h3 className="mb-4 font-bold text-2xl story">Ejemplos:</h3>
              <ul className="font-serif text-lg leading-relaxed list-disc list-inside">
                {currentLeccion.ejemplos.map((ejemplo, index) => (
                  <li key={index}>{ejemplo}</li>
                ))}
              </ul>

              {/* Flecha derecha en la página derecha */}
              <div className="right-4 bottom-4 absolute">
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
                    onClick={handlePlayGame}  // Redirigir al juego cuando se hace clic en "Jugar"
                    className="bg-purple-700 hover:bg-purple-500 px-6 py-2 rounded-lg text-white text-xl transition duration-300 story"
                  >
                    Jugar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <SeparadorMorado />
    </main>
  );
}
