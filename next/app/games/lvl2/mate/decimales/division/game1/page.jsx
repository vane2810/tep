"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game1Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

// Importación de juego
const Game1 = dynamic(() => import('@/components/minigame/lvl2/mate/decimales/division/game1'), { ssr: false });

const GamePage1 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [currentScene, setCurrentScene] = useState(1); 
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
    setCurrentScene(1);
  };

  const updateFeedback = (newFeedback, feedbackColor) => {
    setFeedback(newFeedback);
  };

  const updateScore = (newScore) => {
    setScore(prevScore => {
      const updatedScore = prevScore + newScore;
      return updatedScore;
    });
  };

  const proceedToNextScene = () => {
    if (currentScene < 5) {
      setCurrentScene(prevScene => prevScene + 1); 
      setGameKey(prevKey => prevKey + 1); 
    } else {
      if (score >= 60) {
        setFeedback('¡Felicidades! Has completado todas las escenas.');
        setShowRetry(true);
      } else {
        setFeedback('No alcanzaste el puntaje necesario. Debes volver a intentarlo.');
        setShowRetry(false);
      }
      setGameStarted(false); 
    }
  };

  const handleRetry = () => {
    setGameKey(prevKey => prevKey + 1);
    setFeedback(''); 
    setScore(0); 
    setShowRetry(false); 
    setCurrentScene(1); 
    setGameStarted(true); 
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex items-center justify-between flex-wrap">
        {/* Botón de Volver */}
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel2/mate/decimales/division/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center my-6 mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figsumres.jpg" alt="Decimales" className="h-40 w-auto" />
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
        imageUrl="/img/niveles/mate/figsumres.jpg"
        subtitle="División de Decimales"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">División de Decimales</h1>
            <Game1 
              key={gameKey} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              proceedToNextScene={proceedToNextScene} 
              isFinalScene={currentScene === 5}
              finalScore={score}
              restartGame={handleRetry}
            />
            <div className="mt-8">
              <p className="text-xl font-semibold">Ejercicio {currentScene} de 5</p>
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

export default GamePage1;
