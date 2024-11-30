// Vista principal de receso
import React from 'react';
import Link from 'next/link';
import Volver from '@/components/elements/botonVolver';
import PropTypes from 'prop-types';

const BreakSection = () => {

  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200 px-4 lg:px-8 min-h-screen overflow-hidden">
      
      {/* Fondo de decoración espacial responsivo */}
      <div className="z-0 absolute inset-0 pointer-events-none">
        <img
          src="/img/receso/fondor4.webp"
          alt="Fondo Espacial"
          className="opacity-50 w-full h-full object-cover"
        />
        
        {/* Imágenes decorativas en las esquinas */}
        <img
          src="/img/receso/planet1.webp"
          alt="Planeta 1"
          className="top-2 left-2 absolute w-10 sm:w-12 md:w-16 lg:w-20"
        />
        <img
          src="/img/receso/planet2.webp"
          alt="Planeta 2"
          className="top-2 right-2 absolute w-10 sm:w-12 md:w-16 lg:w-20"
        />
        <img
          src="/img/receso/libro.webp"
          alt="Libro"
          className="bottom-2 left-2 absolute w-10 sm:w-12 md:w-16 lg:w-20"
        />
        <img
          src="/img/receso/planet3.webp"
          alt="Planeta 3"
          className="right-2 bottom-2 absolute w-10 sm:w-12 md:w-16 lg:w-20"
        />
      </div>

      {/* Botón Volver condicionado */}
      <div className="top-4 left-4 absolute">
        <Volver href="/" />
      </div>

      {/* Contenedor de contenido principal */}
      <div className="relative z-10 border-gray-300 bg-white shadow-2xl my-6 p-4 sm:p-6 md:p-8 lg:p-10 border rounded-3xl w-full max-w-md sm:max-w-lg lg:max-w-3xl text-center">
        
        <header className="flex flex-col items-center mb-6 sm:mb-8">
          <img
            src="/img/receso/estrella.webp"
            alt="Estrella"
            className="mb-4 w-12 sm:w-16 md:w-20 lg:w-24"
          />
          <h1 className="mb-2 font-extrabold text-blue-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl super">
            ¡Tiempo de Receso!
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base wonder">
            Elige una actividad para disfrutar tu tiempo de descanso.
          </p>
        </header>

        {/* Tarjetas de actividades en formato de cuadrícula ajustado */}
        <div className="gap-4 sm:gap-6 md:gap-8 grid grid-cols-2 wonder">
          <ActivityCard
            imgSrc="/img/receso/juegos.webp"
            title="Juegos"
            description="Disfruta de juegos interactivos."
            buttonText="Jugar Ahora"
            linkUrl="/receso/juegos"
          />
          <ActivityCard
            imgSrc="/img/receso/videos.webp"
            title="Videos"
            description="Mira videos divertidos."
            buttonText="Ver Videos"
            linkUrl="/receso/videos"
          />
          <div className="flex justify-center col-span-2">
            <ActivityCard
              imgSrc="/img/receso/relajacion.webp"
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
      <div className="flex flex-col items-center bg-pink-100 shadow-md hover:shadow-lg p-4 rounded-2xl transform transition-transform hover:scale-105 cursor-pointer">
        <img src={imgSrc} alt={title} className="mb-2 w-8 sm:w-10 md:w-12" />
        <h2 className="mb-1 font-semibold text-blue-800 text-center text-sm sm:text-base md:text-lg">
          {title}
        </h2>
        <p className="mb-2 text-center text-gray-500 text-xs sm:text-sm md:text-base">
          {description}
        </p>
        <button className="border-2 bg-yellow-500 hover:bg-yellow-600 px-2 py-1 border-black rounded-full text-black text-xs sm:text-sm md:text-base transition-colors duration-200">
          {buttonText}
        </button>
      </div>
    </Link>
  );
}

// Definición de PropTypes para ActivityCard
ActivityCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default BreakSection;
