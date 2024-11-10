"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Volver from '@/components/elements/botonVolver';
import Loading from '@/components/elements/loading';
import { SeparadorMorado } from "@/components/separador";
import Typewriter from "@/components/typeWriter";
import Modal from '@/components/modals/games/instrucciones';

// Función para cargar el componente de juego según el gameType
const getGameComponent = (gameType) => {
  switch (gameType) {
    case "Seleccionar":
      return dynamic(() => import('@/components/minigame/game1'), { ssr: false });
    case "Arrastrar":
      return dynamic(() => import('@/components/minigame/game2'), { ssr: false });
    case "Memoria":
      return dynamic(() => import('@/components/minigame/game3'), { ssr: false });
    // Agregar más juegos según sea necesario
    default:
      return null; // Retorna null si no se encuentra el tipo de juego
  }
};


export default function JuegoPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop(); // Extraer el ID desde el pathname
  const [gameComponent, setGameComponent] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [score, setScore] = useState(0); // Manejo del puntaje
  const [feedback, setFeedback] = useState(''); // Manejo del feedback
  const [currentScene, setCurrentScene] = useState(0); // Manejo de la escena actual
  const [gameKey, setGameKey] = useState(0); // Clave para reiniciar el juego
  const [showInstructions, setShowInstructions] = useState(false); // Estado para mostrar el modal
  const [gameStarted, setGameStarted] = useState(false); // Estado para iniciar el juego

  useEffect(() => {
    if (id) {
      // Cargar el juego específico dinámicamente
      const loadGame = async () => {
        try {
          // Cargar el JSON del juego correspondiente
          const res = await fetch(`/assets/juegos/lenguaje/nivel1/${id}.json`);
          const data = await res.json();
          setGameData(data);

          // Cargar el componente del juego correspondiente basado en gameType
          const component = getGameComponent(data.gameType);
          if (component) {
            setGameComponent(() => component);
          } else {
            console.error(`No se encontró un componente para el tipo de juego: ${data.gameType}`);
          }
        } catch (error) {
          console.error("Error cargando el juego:", error);
        }
      };

      loadGame();
    }
  }, [id]);

  // Función para actualizar el puntaje
  const updateScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  // Función para actualizar el feedback
  const updateFeedback = (message, color) => {
    setFeedback(<span style={{ color }}>{message}</span>);
  };

  // Función para avanzar a la siguiente escena
  const proceedToNextScene = () => {
    if (currentScene < gameData.scenes.length - 1) {
      setCurrentScene(prevScene => prevScene + 1);
      setGameKey(prevKey => prevKey + 1); // Reiniciar el componente para la nueva escena
    } else {
      setFeedback('¡Has completado todas las escenas!');
    }
  };

  const openInstructions = () => {
    setShowInstructions(true); // Mostrar el modal de instrucciones
  };

  const closeInstructions = () => {
    setShowInstructions(false); // Ocultar las instrucciones
  };

  const startGame = () => {
    closeInstructions();
    setGameStarted(true); // Iniciar el juego después de leer las instrucciones
  };

  if (!gameData || !gameComponent) {
    return <Loading />;
  }

  const GameComponent = gameComponent;

  return (
    <main className="bg-gray-100">
      <SeparadorMorado />
      <div className="flex flex-wrap justify-between items-center">
        {/* Botón de Volver */}
        <div className="inline-block mb-20 ml-8">
          <Volver href="/niveles/nivel1/lenguaje" />
        </div>
        {/* Contenedor del Typewriter, la imagen y el botón */}
        <div className="flex items-center mx-auto my-6">
          {/* Imagen */}
          <div className="flex-shrink-0 mr-4">
            <img src={gameData.imageUrl || "/img/niveles/mate/introfig.png"} alt="Decimales" className="w-auto h-40" />
          </div>
          {/* Typewriter y botón */}
          <div className="flex flex-col">
            {/* Texto */}
            <div className="mb-4 font-bold text-xl story">
              <Typewriter
                text="  Lee las indicaciones para comenzar"
                speed={40}
              />
            </div>
            {/* Botón de Indicaciones */}
            <button
              className="hover:bg-purple-700 mt-4 px-4 py-2 rounded font-bold text-white text-xl morado story"
              onClick={openInstructions}
            >
              Indicaciones
            </button>
          </div>
        </div>
      </div>

      {/* Modal de indicaciones */}
      {showInstructions && (
        <Modal
          show={showInstructions}
          onClose={closeInstructions}
          onStartGame={startGame}
          modalData={gameData.modalData} // Pasamos los datos del modal
        />
      )}

      {/* Escena del juego, solo visible si el juego ha comenzado */}
      {gameStarted && (
        <section className='flex flex-col items-center min-h-screen'>
          <div className="bg-white shadow-lg my-16 p-6 rounded-lg w-[850px] story">
            <h1 className="mb-4 font-bold text-3xl text-center">{gameData.nombre}</h1>
            <GameComponent
              key={gameKey}
              gameData={gameData}
              currentScene={currentScene}
              updateScore={updateScore}
              updateFeedback={updateFeedback}
              proceedToNextScene={proceedToNextScene}
            />
            <div className="mt-8">
              <p className="font-semibold text-xl">Ejercicio {currentScene + 1} /5</p>
              <p className="font-semibold text-xl">Resultado: {feedback}</p>
              <p className="font-semibold text-xl">Estrellas: {score} / {gameData.totalPoints}</p>
            </div>
          </div>
        </section>
      )}
      
      <SeparadorMorado />
    </main>
  );
}
