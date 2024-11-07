// Juego 4 - Perimetro- Nivel 1
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Game4Modal from '@/components/modals/games/mate/geometria/game4Modal';
import dynamic from 'next/dynamic';
import { SeparadorVerde } from "@/components/separador";
import Typewriter from "@/components/elemets/typeWriter";

// Importación del juego
const Game4 = dynamic(() => import('@/components/minigame/lvl1/mate/geometria/perimetro/game4'), { ssr: false });

const GamePage4 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [currentScene, setCurrentScene] = useState(1);
  const [gameKey, setGameKey] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setFeedback('');
    setScore(0);
    setCurrentScene(1);
    setGameKey(prevKey => prevKey + 1);
    setFinalScore(0);
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(<span style={{ color }}>{newFeedback}</span>);
  };

  const updateScore = (points) => {
    setScore(prevScore => prevScore + points);
    setFinalScore(prevScore => prevScore + points);
  };

  const proceedToNextScene = () => {
    if (currentScene < 5) {
      setCurrentScene(currentScene + 1);
      setGameKey(prevKey => prevKey + 1);
    } else {
      setGameStarted(false);
      setGameEnded(true);
    }
  };

  const restartGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setFeedback('');
    setScore(0);
    setCurrentScene(1);
    setGameKey(prevKey => prevKey + 1);
    setFinalScore(0);
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex flex-wrap justify-between items-center">
        <div className="inline-block mb-20 ml-8">
          <Link href="/niveles/nivel1/mate/geometria/perimetro/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        <div className="flex items-center mx-auto my-6">
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/figperi.png" alt="Figuras Geométricas" className="w-auto h-40" />
          </div>
          <div className="flex flex-col">
            <div className="mb-4 font-bold text-xl story">
              <Typewriter
                text="   Lee las indicaciones para comenzar"
                speed={40}
              />
            </div>
            <button className="hover:bg-blue-700 px-4 py-2 rounded text-white text-xl transition duration-300 story verde"
              onClick={toggleInstructions}> Indicaciones
            </button>
          </div>
        </div>
      </div>

      <Game4Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/figperi.png"
        subtitle="Preguntame sobre el perimetro"
      />

      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">Preguntame sobre el perimetro</h1>
            <div className="mt-8">
              <p className="font-semibold text-xl">Ejercicio {currentScene}/5</p>
              <p className="font-semibold text-xl">Feedback: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score}</p>
            </div>
            <Game4 
              key={gameKey} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              proceedToNextScene={proceedToNextScene} 
              isFinalScene={currentScene === 5} 
              finalScore={finalScore} 
              restartGame={restartGame} 
              currentScene={currentScene}
            />
            
          </div>
        </section>
      )}
      
      <SeparadorVerde />
    </main>
  );
};

export default GamePage4;
