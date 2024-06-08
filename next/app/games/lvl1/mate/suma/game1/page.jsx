// Juego 1 - Suma - Nivel 1
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game1 = dynamic(() => import('@/components/minigame/lvl1/mate/suma/game1'), { ssr: false });

const SumGamePage1 = () => {
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <main>
      <div className="mb-8">
        <h1 className="mb-4">Juego de Sumas</h1>
        <p>Pregunta {questionCount + 1}/10</p>
        <p>Puntuación: {score}</p>
        <p>{feedback}</p>
        <Game1 
          updateScore={setScore} 
          updateQuestionCount={setQuestionCount} 
          questionCount={questionCount} 
          setFeedback={setFeedback} 
        />
      </div>
      <SeparadorRosa />
    </main>
  );
};

export default SumGamePage1;
