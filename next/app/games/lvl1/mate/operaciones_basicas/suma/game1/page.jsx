// Juego 1 - Suma - Nivel 1
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import GameTemplate from '@/components/templates/games/templateMate';
import Game1Modal from '@/components/modals/games/mate/ob/game1Modal';  

// Importación del juego 
const Game1 = dynamic(() => import('@/components/minigame/lvl1/mate/ob/suma/game1'), { ssr: false });

const GamePage1 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const startGame = () => {
    setGameStarted(true);
    setFeedback(''); 
    setScore(0); 
    setShowRetry(false); 
  };

  const updateFeedback = (newFeedback) => {
    setFeedback(newFeedback);
  };

  const updateScore = (newScore) => {
    setScore(newScore);
    if (newScore <= 50) {
      setShowRetry(true);
    } else {
      setShowRetry(false);
    }
  };

  const handleRetry = () => {
    setGameKey(prevKey => prevKey + 1);
    setFeedback(''); 
    setScore(0); 
    setShowRetry(false); 
  };

  return (
    <>
      {/* Modal reutilizable */}
      <Game1Modal
        show={showInstructions}
        onClose={toggleInstructions}
        onStartGame={startGame}
        imageUrl="/img/niveles/mate/signomas.png"
        subtitle="Suma"
      />

      {/* Componente reutilizable */}
      <GameTemplate
        gameStarted={gameStarted}
        gameKey={gameKey}
        feedback={feedback}
        score={score}
        showRetry={showRetry}
        toggleInstructions={toggleInstructions}
        startGame={startGame}
        updateFeedback={updateFeedback}
        updateScore={updateScore}
        handleRetry={handleRetry}
        showInstructions={showInstructions}
        GameComponent={Game1} 
        title="Términos de la Suma"
        subtitle="Suma"
        imageUrl="/img/niveles/mate/signomas.png"
        backLink="/niveles/nivel1/mate/operaciones_basicas/suma/juegos"

      />
    </>
  );
};

export default GamePage1;