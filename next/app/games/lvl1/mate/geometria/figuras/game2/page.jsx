// Juego 2 - Figuras - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/geometria/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/geometria/figuras/game2'), { ssr: false });

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
      <div className="flex items-center justify-between flex-wrap">
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel1/mate/geometria/figuras/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex items-center my-6 mx-auto">
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figfig.png" alt="Decimales" className="h-40 w-auto" />
          </div>
          <div className="flex flex-col">
            <div className="story font-bold text-xl mb-4">
              <Typewriter
                text="   Lee las indicaciones para comenzar"
                speed={40}
              />
            </div>
            <button className="verde story text-xl text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={toggleInstructions}> Indicaciones
            </button>
          </div>
        </div>
      </div>

      <Game1Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/figfig.png"
        subtitle="¿Que figura es?"
      />

      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">¿Que figura es?</h1>
            <Game2
              updateFeedback={updateFeedback}
              updateScore={updateScore}
              finalizeGame={finalizeGame}
            />
            <div className="mt-8">
              <p className="text-xl font-semibold">Feedback: {feedback}</p>
              <p className="text-xl font-semibold">Estrellas: {score} / 100</p>
            </div>

            {showRetryButton && (
              <button 
                className="mt-4 verde story text-xl text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
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
