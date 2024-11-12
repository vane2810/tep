// Vista principal de receso
import React from 'react';
import Link from 'next/link';

const BreakSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200 px-4 lg:px-8">
      
      {/* Fondo de decoración espacial responsivo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/img/receso/fondor4.png"
          alt="Fondo Espacial"
          className="w-full h-full object-cover opacity-50"
        />
        
        {/* Imágenes decorativas en las esquinas */}
        <img
          src="/img/receso/planet1.png"
          alt="Planeta 1"
          className="absolute top-2 left-2 w-10 sm:w-12 md:w-16 lg:w-20"
        />
        <img
          src="/img/receso/planet2.png"
          alt="Planeta 2"
          className="absolute top-2 right-2 w-10 sm:w-12 md:w-16 lg:w-20"
        />
        <img
          src="/img/receso/libro.png"
          alt="Libro"
          className="absolute bottom-2 left-2 w-10 sm:w-12 md:w-16 lg:w-20"
        />
        <img
          src="/img/receso/planet3.png"
          alt="Planeta 3"
          className="absolute bottom-2 right-2 w-10 sm:w-12 md:w-16 lg:w-20"
        />
      </div>

      {/* Contenedor de contenido principal */}
      <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl border border-gray-300 w-full max-w-md sm:max-w-lg lg:max-w-3xl relative z-10 text-center">
        
        <header className="flex flex-col items-center mb-6 sm:mb-8">
          <img
            src="/img/receso/estrella.png"
            alt="Estrella"
            className="w-12 sm:w-16 md:w-20 lg:w-24 mb-4"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-700 mb-2 super">
            ¡Tiempo de Receso!
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 wonder">
            Elige una actividad para disfrutar tu tiempo de descanso.
          </p>
        </header>

        {/* Tarjetas de actividades en formato de cuadrícula ajustado */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 wonder">
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
            linkUrl="/receso/videos"
          />
          <div className="col-span-2 flex justify-center">
            <ActivityCard
              imgSrc="/img/receso/relajacion.png"
              title="Relajación"
              description="Tómate un momento para relajarte."
              buttonText="Relajarse"
              linkUrl="/receso/relajacion"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Tarjeta de Actividad con enlaces
function ActivityCard({ imgSrc, title, description, buttonText, linkUrl }) {
  return (
    <Link href={linkUrl} passHref>
      <div className="flex flex-col items-center bg-pink-100 p-4 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
        <img src={imgSrc} alt={title} className="w-8 sm:w-10 md:w-12 mb-2" />
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-blue-800 mb-1 text-center">
          {title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-2 text-center">
          {description}
        </p>
        <button className="px-2 py-1 bg-yellow-500 text-black rounded-full border-2 border-black hover:bg-yellow-600 transition-colors duration-200 text-xs sm:text-sm md:text-base">
          {buttonText}
        </button>
      </div>
    </Link>
  );
}

export default BreakSection;

