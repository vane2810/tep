// Juego 2 - Teorema de pitágoras - Nivel 3
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/geometria/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

// Importación del juego
const Game2 = dynamic(() => import('@/components/minigame/lvl3/mate/geometria/pitagoras/game2'), { ssr: false });

const GamePage2 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0); // Estado para contar las respuestas correctas
  const [showRetryButton, setShowRetryButton] = useState(false); // Estado para mostrar botón de "Volver a Intentar"

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback('');
    setScore(0);
    setCorrectCount(0); // Reiniciar el conteo de respuestas correctas al comenzar el juego
    setShowRetryButton(false); // Ocultar botón de "Volver a Intentar"
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(<span style={{ color }}>{newFeedback}</span>);
  };

  const updateScore = (newScore) => {
    setScore(newScore); // Actualizar directamente al nuevo valor, ya que cada respuesta correcta es 20 puntos
  };

  const incrementCorrectCount = () => {
    setCorrectCount((prevCount) => prevCount + 1);
  };

  const finalizeGame = (finalScore) => {
    if (finalScore >= 80) {
      setFeedback("¡Felicidades! Has completado el juego.");
    } else {
      setFeedback("No has alcanzado la puntuación necesaria.");
      setShowRetryButton(true); // Mostrar botón de "Volver a Intentar" si no alcanzó 80 puntos
    }
  };

  const resetGame = () => {
    // Reiniciar la escena de Phaser
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
      }
    }
    setGameStarted(false);
    startGame(); // Reiniciar el juego
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex items-center justify-between flex-wrap">
        {/* Botón de Volver */}
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel3/mate/geometria/pitagoras/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center my-6 mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figfig.png" alt="Decimales" className="h-40 w-auto" />
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
        imageUrl="/img/niveles/mate/figfig.png"
        subtitle="¿Es o no es?"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">¿Es o no es?</h1>
            <Game2
              updateFeedback={updateFeedback} 
              updateScore={setScore}  // Actualizar la puntuación directamente
              finalizeGame={finalizeGame} 
              incrementCorrectCount={incrementCorrectCount} // Pasar la función para incrementar respuestas correctas
              resetGame={resetGame} // Pasar la función para reiniciar el juego
            />
            <div className="mt-8">
              <p className="text-xl font-semibold">Feedback: {feedback}</p>
              <p className="text-xl font-semibold">Estrellas: {score} / 100</p> {/* Actualización del total a 100 */}
            </div>

            {/* Botón "Volver a Intentar" */}
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
