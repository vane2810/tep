// Juego 2 - Simetria - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/geometria/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elemets/typeWriter";

// Importación del juego
const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/geometria/simetria/game2'), { ssr: false });

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
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel1/mate/geometria/simetria/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figsime.png" alt="Decimales" className="w-auto h-40" />
          </div>
          {/* Typewriter y botón */}
          <div className="flex flex-col">
            {/* Texto */}
            <div className="mb-4 font-bold text-xl story">
              <Typewriter
                text="   Lee las indicaciones para comenzar"
                speed={40}
              />
            </div>
            {/* Botón de Indicaciones */}
            <button className="hover:bg-blue-700 px-4 py-2 rounded text-white text-xl transition duration-300 story verde"
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
        imageUrl="/img/niveles/mate/figsime.png"
        subtitle="¿Que tipo de simetria es?"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">¿Que tipo de simetria es?</h1>
            <Game2
              updateFeedback={updateFeedback} 
              updateScore={setScore}  // Actualizar la puntuación directamente
              finalizeGame={finalizeGame} 
              incrementCorrectCount={incrementCorrectCount} // Pasar la función para incrementar respuestas correctas
              resetGame={resetGame} // Pasar la función para reiniciar el juego
            />
            <div className="mt-8">
              <p className="font-semibold text-xl">Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score} / 100</p> {/* Actualización del total a 100 */}
            </div>

            {/* Botón "Volver a Intentar" */}
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
