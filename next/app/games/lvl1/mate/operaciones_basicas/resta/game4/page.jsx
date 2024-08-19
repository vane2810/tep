// Juego 4 - Resta- Nivel 1

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Game4Modal from '@/components/modals/games/mate/ob/game4Modal';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

//Importación  de juego
const Game4 = dynamic(() => import('@/components/minigame/lvl1/mate/ob/resta/game4'), { ssr: false });

const ResGamePage4 = () => {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
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
    setQuestionCount(1);
    setFinalMessage('');
  };

  const updateFeedback = (newFeedback) => {
    setFeedback(newFeedback);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const updateQuestionCount = (newQuestionCount) => {
    setQuestionCount(newQuestionCount);

    // Mensaje final
    if (newQuestionCount === 10) {
      const passingScore = 180; // Límite de estrellas
      let message = `Has obtenido ${score} estrellas. `;
      if (score >= passingScore) {
        message += "¡Has pasado la actividad!";
      } else {
        message += "No has pasado la actividad. Inténtalo de nuevo.";
      }
      setFinalMessage(message);
    }
  };

  const retryGame = () => {
    // Resetear el juego para volver a intentarlo
    setGameStarted(false);
    setFeedback('');
    setScore(0);
    setQuestionCount(1);
    setFinalMessage('');
    // Vuelve a iniciar el juego 
    setTimeout(() => startGame(), 100);
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex items-center justify-between flex-wrap">
        {/* Botón de Volver */}
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel1/mate/operaciones_basicas/resta/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center my-6 mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/signomenos.png" alt="Resta" className="h-40 w-auto" />
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
      <Game4Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/signomenos.png"
        subtitle="Restas"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-6 text-center">Restas Avanzadas</h1>
            <div className="flex justify-between text-2xl mt-8">
              <p className="text-2xl">Pregunta: {questionCount}/10</p>
              <p className="text-2xl">Estrellas: {score}/300</p>
            </div>
            <div className="my-8 p-4 bg-blue-100 rounded-lg w-full max-w-4xl mx-auto ">
              <h2 className="text-xl font-semibold">Resultado: {feedback}</h2>
            </div>
            <div className="flex justify-center w-full max-w-4xl mx-auto ">
              <Game4
                updateFeedback={updateFeedback}
                updateScore={updateScore}
                updateQuestionCount={updateQuestionCount}
              />
            </div>

            {finalMessage && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <h2 className="text-xl font-semibold text-center">Resultado Final:</h2>
                <p className='text-xl text-center'>{finalMessage}</p>
                {/* Si el jugador no pasó la actividad */}
                {score < 180 && (
                  <button
                    onClick={retryGame}
                    className="mt-4 py-2 px-6  bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                  >
                    Volver a Intentarlo
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      )}
      <SeparadorVerde />
    </main>
  );
};

export default ResGamePage4;
