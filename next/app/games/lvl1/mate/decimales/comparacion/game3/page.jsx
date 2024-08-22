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
  const [feedbackColor, setFeedbackColor] = useState('#000000'); // Color del feedback
  const [score, setScore] = useState(0);
  const [currentScene, setCurrentScene] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false); // Controla la visibilidad del botón "Siguiente"
  const [gameKey, setGameKey] = useState(0); 

  const totalScenes = 5; // Número total de escenas
  const pointsPerScene = 40; // Puntos por escena
  const maxScore = pointsPerScene * totalScenes; // Puntuación máxima

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback(''); 
    setFeedbackColor('#000000');
    setScore(0); 
    setCurrentScene(1);
    setShowNextButton(false); // Ocultar el botón al iniciar el juego
  };

  const updateFeedback = (newFeedback, color) => {
    setFeedback(newFeedback);
    setFeedbackColor(color); // Establecer el color del feedback
  };

  const updateScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  const onCompleteScene = (sceneScore) => {
    updateScore(sceneScore);
    setShowNextButton(true); // Mostrar el botón "Siguiente" al completar la escena
  };

  const handleNextScene = () => {
    if (currentScene < totalScenes) {
      setCurrentScene(prevScene => prevScene + 1);
      setGameKey(prevKey => prevKey + 1); // Reiniciar la escena
      setShowNextButton(false); // Ocultar el botón después de pasar de escena
      setFeedback(''); 
    } else {
      setGameStarted(false); // Terminar el juego si es la última escena
    }
  };

  const handleRetry = () => {
    setFeedback(''); 
    setFeedbackColor('#000000');
    setScore(0); 
    setCurrentScene(1);
    setGameKey(prevKey => prevKey + 1); 
    setShowNextButton(false); // Ocultar el botón de "Siguiente" en el reinicio
  };

  return (
    <main className="bg-gray-100">
      <SeparadorVerde />
      <div className="flex items-center justify-between flex-wrap">
        {/* Botón de Volver */}
        <div className="ml-8 inline-block mb-20">
          <Link href="/niveles/nivel1/mate/decimales/comparacion/juegos">
            <img src="/img/home/regresar.png" alt="Volver" className="w-10 h-auto" title="Volver a la página anterior" />
          </Link>
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center my-6 mx-auto">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src="/img/niveles/mate/compafig.png" alt="Decimales" className="h-40 w-auto" />
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
      <Game1Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/compafig.png"
        subtitle="Decimales"
      />

      {/* Escena del juego */}
      {gameStarted && (
        <section className='min-h-screen flex flex-col items-center'>
          <div className="my-16 p-6 story bg-white rounded-lg shadow-lg w-[850px]">
            <h1 className="text-3xl font-bold mb-4 text-center">Escena {currentScene} de {totalScenes}</h1>
            <Game3 
              key={gameKey} 
              updateFeedback={updateFeedback} 
              updateScore={updateScore} 
              onCompleteScene={onCompleteScene}
              isFinalScene={currentScene === totalScenes}
            />
            <div className="mt-8">
              <p className="text-xl font-semibold" style={{ color: feedbackColor }}>Feedback: {feedback}</p>
              <p className="text-xl font-semibold">Estrellas: {score}/{maxScore}</p>
              {showNextButton && (
                <button 
                  onClick={handleNextScene} 
                  className="mt-4 py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                  Siguiente
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
