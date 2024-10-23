// Juego 2 - Intro de decimales - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/decimales/intro/game2'), { ssr: false });

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
        <span style={{ color: '#28a745' }}> {/* Verde para éxito */}
          ¡Felicidades! Has completado el juego.
        </span>
      );
    } else {
      setFeedback(
        <span style={{ color: '#dc3545' }}> {/* Rojo para fallo */}
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
      <div className="flex items-center justify-between flex-wrap">
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel1/mate/decimales/intro/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex items-center my-6 mx-auto">
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/introfig.png" alt="Decimales" className="h-40 w-auto" />
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
        imageUrl="/img/niveles/mate/introfig.png"
        subtitle="¿Cuál es mayor?"
      />

      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">¿Cuál es mayor?</h1>
            <Game2
              updateFeedback={updateFeedback} 
              updateScore={setScore}  
              finalizeGame={finalizeGame} 
              incrementCorrectCount={incrementCorrectCount} 
            />
            <div className="mt-8">
              <p className="text-xl font-semibold">Feedback: {feedback}</p>
              <p className="text-xl font-semibold">Estrellas: {score} / 100</p>
              <p className="text-xl font-semibold">Respuestas correctas: {correctCount} de 5</p>
            </div>

            {showRetryButton && (
              <button 
                className="mt-4 bg-red-500  story text-xl text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
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
