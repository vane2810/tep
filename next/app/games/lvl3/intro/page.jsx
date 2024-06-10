// Juego Introductorio -  Nivel 1

"use client";
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";
import '@/styles/animacion.css';

// Importamos dinámicamente el juego CoinCollectingGame desde el directorio lvl3
const CoinCollectingGame = dynamic(() => import('@/components/minigame/lvl3/intro/game'), { ssr: false });

const InstructionsModal = ({ onClose, onPlay }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Instrucciones del Juego</h2>
        <img src="/img/games/mate/ob/intrucciones2.png" alt="Instrucciones" className="w-1/2 mx-auto mb-4" />
        <p className="mb-4 text-center">
          Mueve el personaje con las teclas de flecha para recoger las monedas y evitar los obstáculos.
          Cada moneda te da puntos. ¡Intenta obtener la mayor cantidad posible sin chocar con los obstáculos!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onPlay}
          >
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};

const IntroGame3 = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePlayGame = () => {
    setShowModal(false);
    setShowGame(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <SeparadorRosa />
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 mb-10">
        <h1 className="ml-10 story text-2xl font-bold text-center">Bienvenido a Juegos Introductorios</h1>
        <img
          src="/img/page/starly.png"
          alt="Starly"
          className="h-32 w-auto mb-6 md:mb-0 md:h-40 md:mr-10 md:ml-10 animate-tumble"
        />
      </div>
      <SeparadorRosa />

      {/* Solo mostramos la imagen y el botón de leer indicaciones si el juego no ha comenzado */}
      {!showGame && (
        <div className="flex flex-col items-center my-20">
          <img src="/img/games/mate/ob/pre-game-image2.png" alt="Pre-Game" className="w-64 mb-4" />
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-full"
            onClick={handleOpenModal}
          >
            Leer Indicaciones
          </button>
        </div>
      )}

      {/* Modal de instrucciones */}
      {showModal && (
        <InstructionsModal onClose={handleCloseModal} onPlay={handlePlayGame} />
      )}

      {/* Juego */}
      {showGame && (
        <div className="flex-grow flex justify-center items-center w-full">
          <div className="w-full max-w-[800px] h-[600px] flex justify-center items-center">
            <CoinCollectingGame />
          </div>
        </div>
      )}

      <SeparadorRosa />
    </main>
  );
};

export default IntroGame3;

