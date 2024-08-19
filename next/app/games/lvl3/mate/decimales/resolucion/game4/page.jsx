// Juego 4 - Resolucion - Nivel 3
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game4Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

//Importación de juego
const Game4 = dynamic(() => import('@/components/minigame/lvl3/mate/decimales/resolucion/game4'), { ssr: false });

const GamePage4 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [gameKey, setGameKey] = useState(0); 

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback(''); 
    setScore(0); 
    setShowRetry(false); 
  };

  const updateFeedback = (newFeedback) => {
    setFeedback(newFeedback);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
    // Mostrar el botón de reiniciar si la puntuación es 50 o menos
    if (newScore <= 50) {
      setShowRetry(true);
    } else {
      setShowRetry(false);
    }
  };

  const handleRetry = () => {
    // Incrementar gameKey para forzar la recreación del componente 
    setGameKey(prevKey => prevKey + 1);
    setFeedback(''); 
    setScore(0); 
    setShowRetry(false); 
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex items-center justify-between flex-wrap">
        {/* Botón de Volver */}
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel3/mate/decimales/resolucion/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center my-6 mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figfrasim.png" alt="Decimales" className="h-40 w-auto" />
          </div>
          {/* Typewriter y botón */}
          <div className="flex flex-col">
            {/* Texto */}
            <div className="story font-bold text-xl mb-4">
              <Typewriter
                text="   Lee las indicaciones para comenzar"
                speed={40}
              />
            </div>
            {/* Botón de Indicaciones */}
            <button className="verde story text-xl text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={toggleInstructions}> Indicaciones
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Indicaciones */}
      <Game1Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/figfrasim.png"
        subtitle="Decimales"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">Términos de la Suma</h1>
            <Game4 
              key={gameKey} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              showRetryButton={setShowRetry} 
            />
            <div className="mt-8">
              <p className="text-xl font-semibold">Feedback: {feedback}</p>
              <p className="text-xl font-semibold">Estrellas: {score}</p>
              {showRetry && (
                <button 
                  onClick={handleRetry} 
                  className="mt-4 py-2 px-6 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Volver a Intentarlo
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      <SeparadorVerde />
    </main>
  );
};

export default GamePage4;