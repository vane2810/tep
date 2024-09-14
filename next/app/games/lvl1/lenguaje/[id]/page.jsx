"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Volver from '@/components/botonVolver';
import Loading from '@/components/loading';

export default function JuegoPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = pathname.split('/').pop(); // Extraer el ID desde el pathname
  const [gameComponent, setGameComponent] = useState(null);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    if (id) {
      // Cargar el juego específico dinámicamente
      const loadGame = async () => {
        try {
          // Cargar el JSON del juego correspondiente
          const res = await fetch(`/assets/juegos/lenguaje/nivel1/${id}.json`);
          const data = await res.json();
          setGameData(data);

          // Cargar el componente del juego correspondiente de manera dinámica
          const component = await import(`@/components/minigame/game${id}`);
          setGameComponent(() => component.default);
        } catch (error) {
          console.error("Error cargando el juego:", error);
        }
      };

      loadGame();
    }
  }, [id]);

  if (!gameData || !gameComponent) {
    return <Loading/>;
  }

  // Renderizar el juego cargado dinámicamente
  const GameComponent = gameComponent;
  return (
    <div>
      <Volver href="/niveles/nivel1/lenguaje" />
      <h1>{gameData.nombre}</h1>
      <GameComponent gameData={gameData} />
    </div>
  );
}
