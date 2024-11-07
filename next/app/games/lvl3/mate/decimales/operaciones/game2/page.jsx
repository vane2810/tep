"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elements/typeWriter";

// Importación de juego
const Game2 = dynamic(() => import('@/components/minigame/lvl3/mate/decimales/operaciones/game2'), { ssr: false });

const GamePage2 = () => {
  const totalPhases = 5; // Total de fases
  const [currentPhase, setCurrentPhase] = useState(1); // Fase actual
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showRetry, setShowRetry] = useState(false); // Estado para controlar la visibilidad del botón de "Volver a Intentarlo"
  const [gameKey, setGameKey] = useState(0); 

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    resetGameState(); 
  };

  const resetGameState = () => {
    setFeedback(''); 
    setScore(0); 
    setCurrentPhase(1); // Reiniciar a la fase 1
    setShowRetry(false); 
  };

  const updateFeedback = (newFeedback, isCorrect) => {
    const feedbackColor = isCorrect ? 'text-green-500' : 'text-red-500'; // Verde para correcto, rojo para incorrecto
    setFeedback(<span className={feedbackColor}>{newFeedback}</span>);
  };

  const updateScore = (pointsEarned) => {
    setScore(prevScore => prevScore + pointsEarned);
  };

  const proceedToNextScene = () => {
    if (currentPhase < totalPhases) {
      setCurrentPhase(prevPhase => prevPhase + 1);
      setGameKey(prevKey => prevKey + 1); // Forzar la recreación del juego para la nueva fase
    } else {
      // Aquí podrías manejar la lógica de finalización del juego si se completa la última fase
    }
  };

  const handleRetry = () => {
    setGameKey(prevKey => prevKey + 1);
    resetGameState(); 
  };

  return (
    <main className="flex flex-col bg-gray-100 min-h-screen">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center mt-8 px-8">
        {/* Botón de Volver */}
        <div className="inline-block mb-20">
          <Link href="/niveles/nivel3/mate/decimales/operaciones/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/introfig.png" alt="Decimales" className="w-auto h-40" />
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
        subtitle="Sumemos las fracciones"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className="flex flex-col flex-grow items-center">
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">Sumemos las fracciones</h1>
            <Game2 
              key={gameKey} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              proceedToNextScene={proceedToNextScene} 
              currentPhase={currentPhase}
              totalPhases={totalPhases}
              finalScore={score}
              restartGame={handleRetry}
            />
            <div className="mt-8">
              <p className="font-semibold text-xl">Feedback: {feedback}</p>
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
