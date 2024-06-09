// Juego 4 - Suma - Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game4 = dynamic(() => import('@/components/minigame/lvl1/mate/suma/game4'), { ssr: false });

const SumGamePage4 = () => {
  return (
    <main>
      <div className="mb-8">
        <h1 className="mb-4"></h1>
        <Game4 />
      </div>
      <SeparadorRosa />
    </main>
  );
};

export default SumGamePage4;