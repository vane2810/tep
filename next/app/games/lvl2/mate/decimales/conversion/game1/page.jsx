// Juego 1 - Conversión entre Fracciones y Decimales - Nivel 2
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game1Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elements/typeWriter";

// Importación del juego
const Game1 = dynamic(() => import('@/components/minigame/lvl2/mate/decimales/conversion/game1'), { ssr: false });

const GamePage1 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [currentScene, setCurrentScene] = useState(1);
  const [gameKey, setGameKey] = useState(0);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback('');
    setScore(0);
    setCurrentScene(1);
    setGameKey(prevKey => prevKey + 1);
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(<span style={{ color }}>{newFeedback}</span>);
  };

  const updateScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const proceedToNextScene = () => {
    if (currentScene < 5) {
      setCurrentScene(currentScene + 1);
      setGameKey(prevKey => prevKey + 1); // Reiniciar el componente para la nueva escena
    } else {
      if (score < 60) {
        setFeedback('No alcanzaste el puntaje necesario. Debes volver a intentarlo.');
      } else {
        setFeedback('¡Felicidades! Has completado todas las escenas.');
      }
      setGameStarted(false); // Detener el juego
    }
  };

  const restartGame = () => {
    setGameStarted(true);
    setFeedback('');
    setScore(0);
    setCurrentScene(1);
    setGameKey(prevKey => prevKey + 1); // Reiniciar el componente para la nueva escena
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel2/mate/decimales/conversion/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/introfig.png" alt="Fracciones y Decimales" className="w-auto h-40" />
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
        imageUrl="/img/niveles/mate/introfig.png"
        subtitle="Fracciones a Decimales"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">Fracciones a Decimales</h1>
            <Game1 
              key={gameKey} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              proceedToNextScene={proceedToNextScene} 
              isFinalScene={currentScene === 5} // Indica si es la última escena
              finalScore={score} // Pasar el puntaje final
              restartGame={restartGame} // Función para reiniciar el juego
            />
            <div className="mt-8">
              <p className="font-semibold text-xl">Ejercicio {currentScene}</p>
              <p className="font-semibold text-xl">Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score}</p>
            </div>
          </div>
        </section>
      )}

      <SeparadorVerde />
    </main>
  );
};

export default GamePage1;
