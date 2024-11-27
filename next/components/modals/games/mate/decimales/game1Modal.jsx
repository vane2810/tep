// Intrucciones Juego 1 - Mate
// Modal reutilizable para el juego 1 de los tres niveles
import React from 'react';

const Game1Modal = ({ show, onClose, onStartGame, imageUrl, subtitle }) => {
  if (!show) return null;

  const handleStartGame = () => {
    onStartGame();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 story">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold mb-4">Instrucciones del juego</h2>
        <p className='text-2xl'> Puntaje: 75 estrellas </p>
        <img src={imageUrl} alt="Imagen del juego" className="h-12 md:h-24 mt-4 mb-4" />
        <p className="text-2xl mb-4 font-bold">Juego: {subtitle.toLowerCase()}</p>

        <ol className="mb-6 text-xl">
          <li>1. Lee cuidadosamente la indicación del juego</li>
          <li>2. Selecciona la respuesta correcta</li>
          <li>3. Son 5 ejercicios, cada uno equivale a 15 estrellas</li>
          <li>4. Si no obtines el mínimo de estrellas, deberás volver a intentarlo</li>
        </ol>

        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white text-xl py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            className="bg-green-500 text-white text-xl py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            onClick={handleStartGame}
          >
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game1Modal;