// Juego 3 - Figuras - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/geometria/game3Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elemets/typeWriter";

// Importación de juego
const Game3 = dynamic(() => import('@/components/minigame/lvl1/mate/geometria/figuras/game3'), { ssr: false });

const GamePage3 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('#000000'); // Color del feedback
  const [score, setScore] = useState(0);
  const [showRetry, setShowRetry] = useState(false);

  const maxScore = 200; // Puntuación máxima al completar todos los pares

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback(''); 
    setFeedbackColor('#000000');
    setScore(0); 
    setShowRetry(false); 
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(newFeedback);
    setFeedbackColor(color); // Establecer el color del feedback
  };

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const handleRetry = () => {
    setShowRetry(false);
    setFeedback(''); 
    setFeedbackColor('#000000');
    setScore(0); 
    setGameStarted(false);
  };

  const onCompleteGame = () => {
    if (score >= maxScore) {
      setShowRetry(false); // Evitar mostrar el botón de reinicio si el juego se completa
    }
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel1/mate/geometria/figuras/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figfig.png" alt="Decimales" className="w-auto h-40" />
          </div>
          {/* Typewriter y botón */}
          <div className="flex flex-col">
            {/* Texto */}
            <div className="mb-4 font-bold text-xl story">
              <Typewriter
                text="   Lee las indicaciones antes de comenzar"
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
        imageUrl="/img/niveles/mate/figfig.png"
        subtitle="¿Cual es cual?"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">¿Cual es cual?</h1>
            <Game3 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              onCompleteGame={onCompleteGame}
            />
            <div className="mt-8">
              <p className="font-semibold text-xl" style={{ color: feedbackColor }}>Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score}/{maxScore}</p>
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

export default GamePage3;


