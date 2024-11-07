// Juego 4 - Suma y Resta de Decimales - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game4Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

// Importación de juego
const Game4 = dynamic(() => import('@/components/minigame/lvl1/mate/decimales/suma_resta/game4'), { ssr: false });

const GamePage4 = () => {
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

  const updateFeedback = (newFeedback) => {
    setFeedback(newFeedback);
  };

  const updateScore = (newScore) => {
    setScore(prevScore => prevScore + newScore);
  };

  const proceedToNextScene = () => {
    if (currentScene < 6) {
      setCurrentScene(prevScene => prevScene + 1); 
      setGameKey(prevKey => prevKey + 1); 
    } else {
      if (score >= 200) {
        setFeedback('¡Felicidades! Has completado todas las escenas.');
        setShowRetry(false);
      } else {
        setFeedback('No alcanzaste el puntaje necesario. Debes volver a intentarlo.');
        setShowRetry(true);
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
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel1/mate/decimales/suma_resta/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figsumres.jpg" alt="Decimales" className="w-auto h-40" />
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
        imageUrl="/img/niveles/mate/figsumres.jpg"
        subtitle="Escribiendo suma o resta"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">Escribiendo suma o resta</h1>
            <Game4 
              key={gameKey} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              proceedToNextScene={proceedToNextScene} 
              isFinalScene={currentScene === 6}
              finalScore={score}
              restartGame={handleRetry}
              currentScene={currentScene} // Pasar la escena actual al componente del juego
            />
            <div className="mt-8">
              <p className="font-semibold text-xl">Ejercicio {currentScene} de 6</p>
              <p className="font-semibold text-xl">Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score} / 300</p>
              {showRetry && (
                <button 
                  onClick={handleRetry} 
                  className="bg-red-500 hover:bg-red-700 mt-4 px-6 py-2 rounded text-white transition duration-300"
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
