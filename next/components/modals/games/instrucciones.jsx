// Modal para las intrucciones para todos los juegos
import React from 'react';

const Modal = ({ show, onClose, onStartGame, modalData }) => {
  if (!show) return null;

  const handleStartGame = () => {
    onStartGame();
    onClose();
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 story">
      <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-3/4 max-w-xl text-center">
        <button className="top-0 right-0 absolute m-4 text-gray-500" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="mb-4 font-bold text-3xl">Instrucciones del juego</h2>
        <p className='text-2xl'> Puntaje: {modalData.puntaje} </p>
        <img src={modalData.imagenModal} alt="Imagen del juego" className="mt-4 mb-4 h-12 md:h-24" />
        <p className="mb-4 text-2xl">Juego: {modalData.subtitulo.toLowerCase()}</p>

        <ol className="mb-6 text-xl">
          {modalData.indicaciones.map((indicacion, index) => (
            <li key={index}>{index + 1}. {indicacion}</li>
          ))}
        </ol>

        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white text-xl transition duration-300"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white text-xl transition duration-300"
            onClick={handleStartGame}
          >
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
