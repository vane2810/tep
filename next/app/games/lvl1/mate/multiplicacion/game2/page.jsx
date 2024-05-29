// Juego 2 - Multiplicación - Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game2 = dynamic(() => import('@/components/minigame/lvl1/mate/multiplicacion/game2'), { ssr: false });

const MulGamePage1 = () => {
  return (
    <main>
      <div className="mb-8">
        <h1 className="mb-4">Juego de Sumas</h1>
        <Game2 />
      </div>
      <SeparadorRosa />
    </main>
  );
};

export default MulGamePage1;