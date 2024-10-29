// pages/GamesPage.js
import React from 'react';

const GamesPage = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 flex flex-col items-center py-10 relative">
      {/* Título de Bienvenida */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 text-center">
        ¡Bienvenido a la Zona de Juegos!
      </h1>
      <p className="text-lg md:text-xl text-gray-600 text-center mb-6">
        Explora y disfruta de juegos interactivos para aprender y divertirte.
      </p>

      {/* Imagen Central */}
      <div className="mb-10">
        <img
          src="/img/receso/juegosp.png"
          alt="Zona de Juegos"
          className="w-40 md:w-60 lg:w-72 mx-auto"
        />
      </div>

      {/* Contenedor principal de tarjetas de juegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl px-4">
        <GameCard
          imgSrc="/img/juegos/rocket.png"
          title="Educational Rocket"
          buttonText="Play Now"
        />
        <GameCard
          imgSrc="/img/juegos/astronaut1.png"
          title="Space Adventure"
          buttonText="Play Now"
        />
        <GameCard
          imgSrc="/img/juegos/astronaut2.png"
          title="Math Skills"
          buttonText="Play Now"
        />
        <GameCard
          imgSrc="/img/juegos/rocket2.png"
          title="Space Race"
          buttonText="Play Now"
        />
        <GameCard
          imgSrc="/img/juegos/puzzle.png"
          title="Puzzle Challenge"
          buttonText="Play Now"
        />
        <GameCard
          imgSrc="/img/juegos/memory.png"
          title="Memory Match"
          buttonText="Play Now"
        />
        <GameCard
          imgSrc="/img/juegos/logic.png"
          title="Logic Quest"
          buttonText="Play Now"
        />
        <GameCard
          imgSrc="/img/juegos/quiz.png"
          title="Quiz Time"
          buttonText="Play Now"
        />
      </div>
    </div>
  );
};

// Componente de Tarjeta de Juego
function GameCard({ imgSrc, title, buttonText }) {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-pink-100 to-pink-200 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 relative border border-gray-200">
      <img src={imgSrc} alt={title} className="w-24 h-24 mb-4 rounded-full" />
      <h2 className="text-2xl font-semibold text-blue-800 mb-2 text-center">{title}</h2>
      <button className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-full border-2 border-blue-700 hover:bg-blue-700 transition-colors duration-200">
        {buttonText}
      </button>
    </div>
  );
}

export default GamesPage;

