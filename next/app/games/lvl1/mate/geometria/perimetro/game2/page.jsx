// Juego 2 - Perímetro - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/geometria/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elements/typeWriter";

// Importación del juego
const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/geometria/perimetro/game2'), { ssr: false });

const GamePage2 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showRetryButton, setShowRetryButton] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback('');
    setScore(0);
    setShowRetryButton(false);
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(<span style={{ color }}>{newFeedback}</span>);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const finalizeGame = (finalScore) => {
    if (finalScore === 100) {
      setFeedback(<span style={{ color: 'green' }}>¡Felicidades! Has completado el juego.</span>);
    } else {
      setFeedback("No has alcanzado la puntuación necesaria.");
      setShowRetryButton(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    startGame();
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel1/mate/geometria/perimetro/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex items-center mx-auto my-6">
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figperi.png" alt="Perímetro" className="w-auto h-40" />
          </div>
          <div className="flex flex-col">
            <div className="mb-4 font-bold text-xl story">
              <Typewriter
                text="   Lee las indicaciones para comenzar"
                speed={40}
              />
            </div>
            <button className="hover:bg-blue-700 px-4 py-2 rounded text-white text-xl transition duration-300 story verde"
              onClick={toggleInstructions}> Indicaciones
            </button>
          </div>
        </div>
      </div>

      <Game1Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/figperi.png"
        subtitle="¿Sabes cual es el perimetro?"
      />

      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">¿Sabes cual es el perimetro?</h1>
            <Game2
              updateFeedback={updateFeedback}
              updateScore={updateScore}
              finalizeGame={finalizeGame}
            />
            <div className="mt-8">
              <p className="font-semibold text-xl">Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score} / 100</p>
            </div>

            {showRetryButton && (
              <button 
                className="hover:bg-red-700 mt-4 px-4 py-2 rounded text-white text-xl transition duration-300 story verde"
                onClick={resetGame}
              >
                Volver a Intentar
              </button>
            )}
          </div>
        </section>
      )}

      <SeparadorVerde />
    </main>
  );
};

export default GamePage2;
