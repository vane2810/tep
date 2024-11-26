// Página del Juego 3 - Suma - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Game3Modal from '@/components/modals/games/mate/ob/game3Modal';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

//Importación de juegos
const Game3 = dynamic(() => import('@/components/minigame/lvl1/mate/ob/suma/game3'), { ssr: false });

const SumGamePage3 = () => {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    // Resetear el estado cuando se empieza un nuevo juego
    setFeedback('');
    setScore(0);
    setQuestionCount(0);
    setFinalMessage('');
  };

  const retryGame = () => {
    // Resetear el juego para volver a intentarlo
    setGameStarted(false);
    setFeedback('');
    setScore(0);
    setQuestionCount(0);
    setFinalMessage('');
    // Vuelve a iniciar el juego
    setTimeout(() => startGame(), 100);
  };

  const handleGameEnd = () => {
    setFinalMessage(`¡Felicidades! Has finalizado el juego con 200 estrellas`);
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel1/mate/operaciones_basicas/suma/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/signomas.png" alt="Suma" className="w-auto h-40" />
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
      <Game3Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/signomas.png"
        subtitle="Sumas"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-6 font-bold text-3xl text-center">Juego de Caza de Números</h1>
            <div className="flex justify-between mt-8 text-2xl">
              <p className="text-2xl">Pregunta: {questionCount}/8</p> 
              <p className="text-2xl">Estrellas: {score}</p>
            </div>
            <div className="bg-blue-100 mx-auto my-8 p-4 rounded-lg w-full max-w-4xl">
              <h2 className="font-semibold text-xl">Resultado: {feedback}</h2>
            </div>
            <div className="flex justify-center mx-auto w-full max-w-4xl">
              <Game3
                updateFeedback={setFeedback}
                updateScore={setScore} 
                updateQuestionCount={setQuestionCount} 
                endGame={handleGameEnd} 
              />
            </div>

            {finalMessage && (
              <div className="bg-green-100 mt-6 p-4 rounded-lg">
                <h2 className="font-semibold text-center text-xl">Resultado Final:</h2>
                <p className='text-center text-xl'>{finalMessage}</p>
                <button
                  onClick={retryGame}
                  className="bg-red-500 hover:bg-red-700 mt-4 px-6 py-2 rounded text-white transition duration-300"
                >
                  Volver a Intentarlo
                </button>
              </div>
            )}
          </div>
        </section>
      )}
      <SeparadorVerde />
    </main>
  );
};

export default SumGamePage3;
