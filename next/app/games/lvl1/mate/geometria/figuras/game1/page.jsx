// Juego 1 - Figuras- Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/geometria/game1Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

// Importación del juego
const Game1 = dynamic(() => import('@/components/minigame/lvl1/mate/geometria/figuras/game1'), { ssr: false });

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
      <div className="flex items-center justify-between flex-wrap">
        {/* Botón de Volver */}
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel1/mate/geometria/figuras/juegos">
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
        subtitle="Identifica la figura"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">Identifica la figura</h1>
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
              <p className="text-xl font-semibold">Ejercicio {currentScene}</p>
              <p className="text-xl font-semibold">Feedback: {feedback}</p>
              <p className="text-xl font-semibold">Estrellas: {score}</p>
            </div>
          </div>
        </section>
      )}

      <SeparadorVerde />
    </main>
  );
};

export default GamePage1;
