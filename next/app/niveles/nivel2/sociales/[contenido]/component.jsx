// Componente reutilizable para sociales de todos los niveles
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Asegúrate de usar la importación correcta
import Volver from '@/components/botonVolver';
import { SeparadorAzul } from '@/components/separador';



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
        const res = await fetch(`/assets/materias/sociales/nivel2/contenido${id}.json`);
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

  const handlePlayGame = () => {
    router.push(`/niveles/nivel1/sociales/${id}/${id}`);
  };

  if (!lecciones || lecciones.length === 0) {
    return null;
  }

  const currentLeccion = lecciones[currentPage];

  return (
    <main className="relative">
      <SeparadorAzul />

      {/* Botón de Volver */}
      <div className="top-4 left-4 z-10 absolute">
        <Volver href="/niveles/nivel2/sociales" />
      </div>

      <div className="flex justify-center items-center bg-gradient-to-r from-yellow-100 via-pink-100 to-yellow-100 min-h-screen">
        {/* Portada del libro */}
        {!isOpen && (
          <div
            onClick={handleOpenBook}
            className="relative transition-transform duration-500 cursor-pointer hover:scale-105"
          >
            {/* Imagen de fondo del cofre */}
            <img
              src="/img/niveless/sociales/cofre.png" // Ruta de tu imagen del cofre
              alt="Cofre"
              className="w-[650px] h-[495px]"  // Ajusta el tamaño de la imagen según sea necesario
            />

            {/* Contenido centrado en el área blanca del cofre */}
            <div className="top-16 left-0 absolute flex flex-col justify-center items-center p-8 w-full h-full">
              {/* Título del libro */}
              <h1 className="mb-2 font-bold text-3xl text-black text-center story">
                Lección {id}:
              </h1>

              {/* Imagen adicional, como el principito */}
              <img
                src={imagenPortada ? imagenPortada : "/img/personajes/burbuja/burbuja.png"}  // Fallback a la genérica
                alt={tituloGeneral}
                className="mb-2 w-28 h-auto"
              />


              <h1 className="mb-4 font-bold text-3xl text-black text-center story">
                {tituloGeneral}
              </h1>
            </div>
          </div>
        )}



        {/* Contenido del libro cuando está abierto */}
        {isOpen && (
          <div
            className="relative bg-cover bg-center shadow-2xl w-[850px] h-[550px] transition-transform duration-700"
            style={{
              backgroundImage: "url('/img/niveless/sociales/mapa_abierto.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Página izquierda del libro */}
            <div className="top-[12%] left-[15%] absolute p-6 w-[40%] h-[65%] overflow-auto story">
              <h2 className="mb-4 font-bold text-2xl">{currentLeccion.titulo}</h2>
              <p className="font-serif text-lg leading-relaxed">{currentLeccion.descripcion}</p>

              {/* Imagen de la lección dentro del libro, ajustada */}
              <img
                src={currentLeccion.imagenLeccion || "/img/personajes/burbuja/burbuja.png"}
                alt={currentLeccion.titulo}
                className="mt-8 rounded-lg w-[100%] h-[100px] object-contain"
              />


              {/* Flecha izquierda en la página izquierda */}
              {currentPage > 0 && (
                <div className="bottom-10 left-4 absolute">
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
            <div className="top-[35%] right-[10%] absolute p-6 w-[40%] h-[65%] overflow-auto story">
              <h3 className="mb-4 font-bold text-2xl story">Datos importantes:</h3>
              <ul className="font-serif text-lg leading-relaxed list-disc list-inside">
                {currentLeccion.ejemplos.map((ejemplo, index) => (
                  <li key={index}>{ejemplo}</li>
                ))}
              </ul>

              {/* Flecha derecha en la página derecha */}
              <div className="right-10 bottom-[-1s0%] absolute"> {/* Ajustar bottom a 12 para acercarla */}
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
                    className="bg-blue-700 hover:bg-blue-500 px-6 py-2 rounded-lg text-white text-xl transition duration-300 story"
                  >
                    Jugar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <SeparadorAzul />
    </main>
  );
}
