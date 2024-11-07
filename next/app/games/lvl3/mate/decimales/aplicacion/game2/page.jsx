"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elemets/typeWriter";

// Importación del juego
const Game2 = dynamic(() => import('@/components/minigame/lvl3/mate/decimales/aplicacion/game2'), { ssr: false });

const GamePage2 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('#000000'); // Estado para manejar el color del feedback
  const [score, setScore] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const targetAmount = 1.25; // Monto objetivo para sumar

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback('');
    setFeedbackColor('#000000'); // Restablecer el color del feedback al iniciar el juego
    setScore(0);
    setShowRetry(false);
  };

  const updateFeedback = (newFeedback, isCorrect) => {
    setFeedback(newFeedback);
    setFeedbackColor(isCorrect ? '#6aa84f' : '#ff0000'); // Verde para correcto, rojo para incorrecto
  };

  const updateScore = (newScore) => {
    setScore(newScore);
    if (newScore <= 50) {
      setShowRetry(true);
    } else {
      setShowRetry(false);
    }
  };

  const handleRetry = () => {
    setGameKey(prevKey => prevKey + 1);
    setFeedback('');
    setFeedbackColor('#000000'); // Restablecer el color del feedback al reiniciar
    setScore(0);
    setShowRetry(false);
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel3/mate/decimales/aplicacion/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/compafig.png" alt="Supermercado" className="w-auto h-40" />
          </div>
          {/* Typewriter y botón */}
          <div className="flex flex-col">
            {/* Texto */}
            <div className="mb-4 font-bold text-xl story">
              <Typewriter
                text="Selecciona productos para sumar la cantidad exacta"
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
        imageUrl="/img/niveles/mate/compafig.png"
        subtitle="Sumemos las compras"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">Sumemos las compras</h1>
            <Game2 
              key={gameKey} 
              targetAmount={targetAmount} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
            />
            <div className="mt-8">
              <p className="font-semibold text-xl" style={{ color: feedbackColor }}>Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score}</p>
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

export default GamePage2;
