// Juego 4 - Multiplicación - Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game4 = dynamic(() => import('@/components/minigame/lvl1/mate/multiplicacion/game4'), { ssr: false });

const MulGamePage4 = () => {
  return (
    <main>
      <div className="mb-8">
        <h1 className="mb-4">Juego de Sumas</h1>
        <Game4 />
      </div>
      <SeparadorRosa />
    </main>
  );
};

export default MulGamePage4;