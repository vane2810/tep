//Juego introducctorio 2
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";
import '@/styles/animacion.css';
import Volver from '@/components/botonVolver';

// Carga dinámica del componente del juego sin renderizado en el servidor (SSR)
const Game = dynamic(() => import('@/components/minigame/lvl2/intro/game'), { ssr: false });

// Componente modal para mostrar las instrucciones del juego
const InstructionsModal = ({ onClose, onPlay }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg mx-auto">

        <h2 className="text-2xl font-bold mb-4 text-center">Instrucciones del Juego</h2>
        <img src="/img/games/mate/ob/intrucciones.png" alt="Instrucciones" className="w-1/2 mx-auto mb-4" />
        <p className="mb-4 text-center">
          Bienvenido al juego. Debes mover la nave espacial para evitar los asteroides y obtener la máxima puntuación posible. Usa las teclas de flecha hacia arriba y hacia abajo para moverte.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}>
            Cerrar
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onPlay}>
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal del juego introductorio
const IntroGame2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGame, setShowGame] = useState(false);

  // Maneja la apertura del modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Maneja el inicio del juego
  const handlePlayGame = () => {
    setShowModal(false);
    setShowGame(true);
  };

  return (
    <main>
      {/* Volver */}
      <Volver href="/niveles/nivel2"/>
      {/* Sección de bienvenida */}
      <div className="flex flex-col justify-center items-center mt-2">
        <h1 className="ml-10 story text-2xl font-bold text-center">Bienvenidos/as a Juegos Introductorios</h1>
        <img
          src="/img/personajes/starly/starly.png"
          alt="Starly"
          className="h-32 w-auto mb-6 md:mb-0 md:h-40 md:mr-10 md:ml-10 animate-tumble"
        />
      </div>

      <SeparadorRosa />

      {/* Zona del juego */}
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        {!showGame && (
          <div className="flex flex-col items-center my-20">
            <img src="/img/games/mate/ob/pre-game-image.png" alt="Pre-Game" className="w-64 mb-4" />
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
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-full max-w-[800px] h-[600px] flex justify-center items-center">
              <Game />
            </div>
          </div>
        )}
      </div>

      <SeparadorRosa />
    </main>
  );
};

export default IntroGame2;
