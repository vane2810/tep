// Juego Introductorio Nivel 3
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";
import Volver from '@/components/elements/botonVolver'


const CoinCollectingGame = dynamic(() => import('@/components/minigame/introductorios/lvl3'), { ssr: false });

// Componente modal para mostrar las instrucciones del juego
const InstructionsModal = ({ onClose, onPlay }) => {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 wonder">
      <div className="bg-white mx-auto p-8 rounded-lg max-w-lg">
        <h2 className="mb-4 font-bold text-3xl text-center">Instrucciones del Juego</h2>
        <img src="/img/personajes/starly/starly_corona.webp" alt="Instrucciones" className="mx-auto mb-4 w-1/2" />
        <ul className="mb-4 text-center yagora">
          <li>1. Mueve el personaje con las teclas de flecha para recoger las monedas y evitar los obstáculos</li>
          <li>2. Cada moneda te da puntos. ¡Intenta obtener la mayor cantidad posible sin chocar con los obstáculos!</li>
        </ul>

        <div className="flex justify-center space-x-4 text-lg">
          <button
            className="bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded-full"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white"
            onClick={onPlay}
          >
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal del juego introductorio
const IntroGame3 = () => {
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
    <main className='bg-gray-50'>
      <SeparadorRosa />
      {/* Volver */}
      <Volver href="/niveles/nivel3" img='/img/home/regresar/rosa.webp' />
      {/* Sección de bienvenida */}
      <div className="flex md:flex-row flex-col justify-center items-center mb-10">
        <h1 className="ml-10 font-bold text-4xl text-center text-pink-700 super">JUEGO INTRODUCTORIO NIVEL III</h1>
        <img
          src="/img/receso/planet3.webp"
          alt="Planeta Cosmmo"
          className="md:mr-10 mb-6 md:mb-0 md:ml-10 w-auto h-32 md:h-40 animate-float"
        />
      </div>

      {/* Zona del juego */}
      {!showGame && (
        <div className="flex flex-col items-center my-20">
          <button
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full text-white text-xl wonder"
            onClick={handleOpenModal}
          >
            Indicaciones
          </button>
          <p>Lee las indicaciones para comenzar</p>
          <img src="/img/games/intro/n1.png" alt="Pre-Game" className="mb-4 w-32" />
        </div>
      )}

      {/* Modal de instrucciones */}
      {showModal && (
        <InstructionsModal onClose={handleCloseModal} onPlay={handlePlayGame} />
      )}

      {/* Juego */}
      {showGame && (
        <div className="flex flex-grow justify-center items-center w-full">
          <div className="flex justify-center items-center w-full max-w-[800px] h-[600px]">
            <CoinCollectingGame />
          </div>
        </div>
      )}

      <SeparadorRosa />
    </main>
  );
};

export default IntroGame3;


