// components/BreakSection.js
import React from 'react';
import Link from 'next/link';

const BreakSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200">
      
      {/* Fondo de decoración espacial */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/receso/fondor4.png"
          alt="Fondo Espacial"
          className="w-full h-full object-cover opacity-40"
        />
        
        {/* Imágenes decorativas posicionadas en las esquinas */}
        <img
          src="/img/receso/planet1.png"
          alt="Planeta 1"
          className="absolute top-4 left-4 w-16 md:w-24 lg:w-28"
        />
        <img
          src="/img/receso/planet2.png"
          alt="Planeta 2"
          className="absolute top-4 right-4 w-20 md:w-28 lg:w-32"
        />
        <img
          src="/img/receso/libro.png"
          alt="Libro"
          className="absolute bottom-4 left-4 w-20 md:w-28 lg:w-32"
        />
        <img
          src="/img/receso/planet3.png"
          alt="Planeta 3"
          className="absolute bottom-4 right-4 w-16 md:w-24 lg:w-28"
        />
      </div>

      {/* Contenedor de contenido principal */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-300 w-11/12 max-w-5xl relative z-10 backdrop-opacity-100">
        
        <header className="flex flex-col items-center mb-8">
          <img
            src="/img/receso/estrella.png"
            alt="Estrella"
            className="w-24 md:w-32 lg:w-40 mb-6"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2 text-center">
            ¡Tiempo de Receso!
          </h1>
          <p className="text-base md:text-lg text-gray-600 text-center">
            Elige una actividad para disfrutar tu tiempo de descanso.
          </p>
        </header>

        {/* Tarjetas de actividades en formato 2x2 con enlaces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <ActivityCard
            imgSrc="/img/receso/juegos.png"
            title="Juegos"
            description="Disfruta de juegos interactivos."
            buttonText="Jugar Ahora"
            linkUrl="/receso/juegos"
          />
          <ActivityCard
            imgSrc="/img/receso/videos.png"
            title="Videos"
            description="Mira videos divertidos."
            buttonText="Ver Videos"
            linkUrl="/videos"
          />
          <ActivityCard
            imgSrc="/img/receso/actividades.png"
            title="Actividades"
            description="Realiza actividades creativas."
            buttonText="Explorar"
            linkUrl="/actividades"
          />
          <ActivityCard
            imgSrc="/img/receso/relajacion.png"
            title="Relajación"
            description="Tómate un momento para relajarte."
            buttonText="Relajarse"
            linkUrl="/relajacion"
          />
        </div>
      </div>
    </div>
  );
};

// Componente de Tarjeta de Actividad con enlaces
function ActivityCard({ imgSrc, title, description, buttonText, linkUrl }) {
  return (
    <Link href={linkUrl} passHref>
      <div className="flex flex-col items-center bg-pink-100 p-4 md:p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 relative cursor-pointer">
        <img src={imgSrc} alt={title} className="w-12 md:w-16 mb-4" />
        <h2 className="text-lg md:text-2xl font-semibold text-blue-800 mb-2 text-center">
          {title}
        </h2>
        <p className="text-sm md:text-base text-gray-500 text-center mb-4">
          {description}
        </p>
        <button className="px-4 py-2 bg-yellow-500 text-black rounded-full border-2 border-black hover:bg-yellow-600 transition-colors duration-200">
          {buttonText}
        </button>
      </div>
    </Link>
  );
}

export default BreakSection;
