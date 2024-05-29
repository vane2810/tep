// Juego 1 - Resta - Nivel 1

import React from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";

const Game1 = dynamic(() => import('@/components/minigame/lvl1/mate/resta/game1'), { ssr: false });

const ResGamePage1 = () => {
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

export default ResGamePage1;