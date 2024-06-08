// Juego 2 - Suma - Nivel 1
"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/suma/game2'), { ssr: false });

const SumGamePage2 = () => {
  const [feedback, setFeedback] = useState('');

  return (
    <main>
      <div className="mb-8">
        <h1 className="mb-4">Juego de Sumas</h1>
        <Game2 setFeedback={setFeedback} />
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h2>Feedback:</h2>
          <p>{feedback}</p>
        </div>
      </div>
      <SeparadorRosa />
    </main>
  );
};

export default SumGamePage2;
