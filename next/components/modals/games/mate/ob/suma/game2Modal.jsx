// Intrucciones - Juego 2 - Suma - Nivel 1
import React from 'react';

const Game2Modal = ({ show, onClose, onStartGame }) => {
  if (!show) return null;

  const handleStartGame = () => {
    onStartGame();
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl flex flex-col items-center text-center">
        <button className="absolute top-0 right-0 m-4 text-gray-500" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-semibold mb-4">Instrucciones del juego</h2>
        <img src="/img/niveles/mate/signomas.png" alt="Suma" className="h-12 md:h-24 mt-4 mb-4" />
        <p className="mb-6 text-xl">
          Ayuda a mi trianguamigo a pasar este juego para obtener estrellas
        </p>
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

export default Game2Modal;
