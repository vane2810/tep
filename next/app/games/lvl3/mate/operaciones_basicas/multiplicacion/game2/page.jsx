// Juego 2 - Multi - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Game2Modal from '@/components/modals/games/mate/ob/suma/game2Modal';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elemets/typeWriter";

const Game2 = dynamic(() => import('@/components/minigame/lvl3/mate/multiplicacion/game2'), { ssr: false });

const MultiGamePage2 = () => {
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
    setQuestionCount(0);
    setFinalMessage(''); // Resetear el mensaje final
  };

  const retryGame = () => {
    // Resetear el estado del juego
    setGameStarted(false);
    setFeedback('');
    setScore(0);
    setQuestionCount(1);
    setFinalMessage(''); 
    // Volver a iniciar el juego
    setTimeout(() => startGame(), 50);
  };

  const handleGameEnd = () => {
    // Manejar el fin del juego y establecer el mensaje final basado en la puntuación
    handleFinalMessage(score);
  };

  const handleFinalMessage = (score) => {
    if (score < 70) {
      setFinalMessage(`No has alcanzado el puntaje mínimo de 70 estrellas. Obtuviste ${score} estrellas. Inténtalo de nuevo.`);
    } else {
      setFinalMessage(`¡Buen trabajo! Has completado el juego con ${score} estrellas.`);
    }
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel3/mate/operaciones_basicas/multiplicacion/juegos">
            <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/signomultiplicacion.png" alt="multi" className="w-auto h-40" />
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
      <Game2Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/signomultiplicacion.png"
        subtitle="Multiplicaciones"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">Multiplicaciones de Decenas y Unidades</h1>
            <div className="flex justify-between mb-4 text-2xl">
              <p className="text-2xl">Pregunta: {questionCount}/10</p>
              <p className="text-2xl">Estrellas: {score}/100</p>
            </div>
            <div className="bg-blue-100 mb-6 p-4 rounded-lg">
              <h2 className="font-semibold text-xl">Resultado: {feedback}</h2>
            </div>
            <Game2 
              setFeedback={setFeedback} 
              setScore={setScore} 
              setQuestionCount={setQuestionCount} 
              questionCount={questionCount} 
              onGameEnd={handleGameEnd} 
            />
            {questionCount >= 10 && (
              <div className="bg-green-100 mt-6 p-4 rounded-lg">
                <h2 className="font-semibold text-center text-xl">Fin del Juego</h2>
                <p className='text-center text-lg'>{finalMessage}</p>
                {score < 70 && ( 
                  <button
                    onClick={retryGame}
                    className="bg-red-500 hover:bg-red-700 mt-4 px-6 py-2 rounded text-white transition duration-300"
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

export default MultiGamePage2;
