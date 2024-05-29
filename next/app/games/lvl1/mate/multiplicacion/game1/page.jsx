// Juego 1 - Multiplicación - Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game1 = dynamic(() => import('@/components/minigame/lvl1/mate/multiplicacion/game1'), { ssr: false });

const MulGamePage2 = () => {
  return (
    <main>
      <div className="mb-8">
        <h1 className="mb-4">Juego de Sumas</h1>
        <Game1 />
      </div>
      <SeparadorRosa />
    </main>
  );
};

export default MulGamePage2;