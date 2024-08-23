// Juego 3 - Comparacion de decimales - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game1Modal from '@/components/modals/games/mate/decimales/game3Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

// Importación de juego
const Game3 = dynamic(() => import('@/components/minigame/lvl1/mate/decimales/comparacion/game3'), { ssr: false });

const GamePage3 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('#000000');
  const [score, setScore] = useState(0);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback(''); 
    setFeedbackColor('#000000');
    setScore(0); 
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(newFeedback);
    setFeedbackColor(color);
  };

  const updateScore = (points) => {
    setScore(score + points); // Incrementar la puntuación en lugar de reiniciar
  };

  const onCompleteGame = () => {
    setGameStarted(false); // Terminar el juego al completar la única escena
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <SeparadorVerde />
      <div className="flex items-center justify-between flex-wrap mb-8">
        {/* Botón de Volver */}
        <div className="ml-8">
          <Link href="/niveles/nivel1/mate/decimales/comparacion/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto cursor-pointer" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/compafig.png" alt="Decimales" className="h-40 w-auto" />
          </div>
          {/* Typewriter y botón */}
          <div className="flex flex-col">
            {/* Texto */}
            <div className="story font-bold text-xl mb-4">
              <Typewriter
                text="   Lee las indicaciones antes de comenzar"
                speed={40}
              />
            </div>
            {/* Botón de Indicaciones */}
            <button 
              className="verde story text-xl text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={toggleInstructions}
            > 
              Indicaciones
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
        subtitle="Organiza los decimales de mayor a menor"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[1250px]"> {/* Ancho ajustado a 1000px */}
            <h1 className="text-3xl font-bold mb-4 text-center">Organiza los decimales de mayor a menor</h1>
            <Game3 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              onCompleteGame={onCompleteGame}
            />
            <div className="mt-8">
              <p className="text-xl font-semibold" style={{ color: feedbackColor }}>Feedback: {feedback}</p>
              <p className="text-xl font-semibold">Estrellas: {score}/200</p>
            </div>
          </div>
        </section>
      )}

      <SeparadorVerde />
    </main>
  );
};

export default GamePage3;

