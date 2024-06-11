// Juego 2 - Suma - Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Game2Modal from '@/components/modals/games/mate/ob/suma/game2Modal';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/suma/game2'), { ssr: false });

const SumGamePage2 = () => {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalMessage, setFinalMessage] = useState(''); // Estado para el mensaje final

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
    setFinalMessage(''); // Resetear el mensaje final
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
      <div className="flex items-center justify-between flex-wrap">
        {/* Botón de Volver */}
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel1/mate/operaciones_basicas/suma/juegos">
            <img src="/img/page/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center my-6 mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/signomas.png" alt="Suma" className="h-40 w-auto" />
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
      <Game2Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/signomas.png"
        subtitle="Suma"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">Juego Decenas y Unidades</h1>
            <div className="flex justify-between text-2xl mb-4">
              <p className="text-2xl">Pregunta: {questionCount}/10</p>
              <p className="text-2xl">Estrellas: {score}/100</p>
            </div>
            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h2 className="text-xl font-semibold">Resultado: {feedback}</h2>
            </div>
            <Game2 
              setFeedback={setFeedback} 
              setScore={setScore} 
              setQuestionCount={setQuestionCount} 
              questionCount={questionCount} 
              onGameEnd={handleGameEnd} // Pasar la función para manejar el fin del juego
            />
            {questionCount >= 10 && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <h2 className="text-xl font-semibold text-center">Fin del Juego</h2>
                <p className='text-lg text-center'>{finalMessage}</p>
                {score < 70 && ( // Mostrar el botón de reinicio solo si el puntaje es menor a 70
                  <button
                    onClick={retryGame}
                    className="mt-4 py-2 px-6 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
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

export default SumGamePage2;
