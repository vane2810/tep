// Juego 2 - Suma - Nivel 1

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game2Modal from '@/components/modals/games/mate/ob/suma/game2Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/typeWriter";

const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/suma/game2'), { ssr: false });

const SumGamePage2 = () => {
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
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
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">Juego Decenas y Unidades</h1>
            <div className="flex justify-between text-2xl mb-4">
              <p className="text-lg">Pregunta: {questionCount}/10</p> {/* Mostramos questionCount */}
              <p className="text-lg">Estrellas: {score}</p>
            </div>
            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h2 className="text-lg font-semibold">Resultado:</h2>
              <p>{feedback}</p>
            </div>
            <Game2 setFeedback={setFeedback} setScore={setScore} setQuestionCount={setQuestionCount} />
          </div>
        </section>
      )}

      <SeparadorVerde />
    </main>
  );
};

export default SumGamePage2;

