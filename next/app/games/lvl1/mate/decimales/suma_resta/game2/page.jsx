// Juego 2 - Suma y Resta de decimales - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elemets/typeWriter";

// Importación del juego
const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/decimales/suma_resta/game2'), { ssr: false });

const GamePage2 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showRetryButton, setShowRetryButton] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback('');
    setScore(0);
    setCorrectCount(0);
    setShowRetryButton(false);
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(<span style={{ color }}>{newFeedback}</span>);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const incrementCorrectCount = () => {
    setCorrectCount((prevCount) => prevCount + 1);
  };

  const finalizeGame = (finalScore) => {
    if (finalScore >= 80) {
      setFeedback(
        <span style={{ color: '#28a745' }}>
          ¡Felicidades! Has completado el juego.
        </span>
      );
    } else {
      setFeedback(
        <span style={{ color: '#dc3545' }}>
          No has alcanzado la puntuación necesaria.
        </span>
      );
      setShowRetryButton(true);
    }
  };

  const resetGame = () => {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
      }
    }
    setGameStarted(false);
    setTimeout(startGame, 100);
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel1/mate/decimales/suma_resta/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex items-center mx-auto my-6">
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figsumres.jpg" alt="Decimales" className="w-auto h-40" />
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
        imageUrl="/img/niveles/mate/figsumres.jpg"
        subtitle="Selecciona la suma o resta de decimales"
      />
  
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">Selecciona la suma o resta de decimales</h1>
            <Game2
              updateFeedback={updateFeedback}
              updateScore={updateScore}
              finalizeGame={finalizeGame}
              incrementCorrectCount={incrementCorrectCount}
            />
            <div className="mt-8">
              <p className="font-semibold text-xl">Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score} / 100</p>
              <p className="font-semibold text-xl">Respuestas correctas: {correctCount} de 5</p>
            </div>

            {showRetryButton && (
              <button
                className="bg-red-500 hover:bg-red-700 mt-4 px-4 py-2 rounded text-white text-xl transition duration-300 story"
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
