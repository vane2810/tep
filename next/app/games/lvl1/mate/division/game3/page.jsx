// Juego 3 - División - Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game3 = dynamic(() => import('@/components/minigame/lvl1/mate/division/game3'), { ssr: false });

const DivGamePage3 = () => {
  return (
    <main>
      <div className="mb-8">
        <h1 className="mb-4">Juego de Sumas</h1>
        <Game3 />
      </div>
      <SeparadorRosa />
    </main>
  );
};

export default DivGamePage3;