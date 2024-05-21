import React from 'react';
import dynamic from 'next/dynamic';

// Carga dinámica del componente Game para evitar problemas de SSR con Phaser
const SumGame = dynamic(() => import('@/components/Game'), { ssr: false });

const SumGamePage = () => {
    return (
      <main>
        <div id="game-container">
          <h1>Juego de Sumas</h1>
          <SumGame />
        </div>
      </main>
    );
  };
  
export default SumGamePage;
