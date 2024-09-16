"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Volver from '@/components/botonVolver';
import Loading from '@/components/loading';
import { SeparadorMorado } from "@/components/separador";
import Typewriter from "@/components/typeWriter";
import Modal from '@/components/modals/games/instrucciones';
import dynamic from 'next/dynamic';

const getGameComponent = (gameType) => {
    switch (gameType) {
        case "Seleccionar":
            return dynamic(() => import('@/components/minigame/game1'), { ssr: false });

        case "Operaciones":
            return dynamic(() => import('@/components/minigame/game2'), { ssr: false });

        default:
            return null;
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
    const [showRetry, setShowRetry] = useState(false); // Estado para mostrar el botón de reinicio

    useEffect(() => {
        if (id) {
            const loadGame = async () => {
                try {
                    const res = await fetch(`/assets/juegos/lenguaje/nivel1/game${id}.json`);
                    const data = await res.json();
                    setGameData(data);

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

    const updateScore = (points) => {
        setScore(prevScore => prevScore + points);
    };

    const updateFeedback = (message, color) => {
        setFeedback(<span style={{ color }}>{message}</span>);
    };

    const proceedToNextScene = () => {
        // Limpiar el feedback al pasar a la siguiente escena
        setFeedback(''); // Borra el feedback anterior
    
        if (currentScene < gameData.escenas.length - 1) {
            setCurrentScene(prevScene => prevScene + 1);
            setGameKey(prevKey => prevKey + 1); // Reiniciar el componente para la nueva escena
        } else {
            if (score >= gameData.minPuntos) {
                setFeedback(<span style={{ color: '#6aa84f' }}>¡Felicidades! Has completado el juego</span>); // Verde para éxito
            } else {
                setFeedback(<span style={{ color: '#ff0000' }}>No alcanzaste el puntaje mínimo. ¡Inténtalo de nuevo!</span>); // Rojo para fallo
                setShowRetry(true); // Mostrar botón de reiniciar
            }
        }
    };
    

    const retryGame = () => {
        setScore(0);
        setCurrentScene(0);
        setGameKey(prevKey => prevKey + 1);
        setFeedback('');
        setShowRetry(false);
    };

    const openInstructions = () => {
        setShowInstructions(true);
    };

    const closeInstructions = () => {
        setShowInstructions(false);
    };

    const startGame = () => {
        closeInstructions();
        setGameStarted(true);
    };

    if (!gameData || !gameComponent) {
        return <Loading />;
    }

    const GameComponent = gameComponent;

    return (
        <main className="bg-gray-100">
            <SeparadorMorado />
            <div className="flex flex-wrap justify-between items-center">
                <div className="inline-block mb-20 ml-8">
                    <Volver href="/niveles/nivel1/lenguaje" />
                </div>
                <div className="flex items-center mx-auto my-6">
                    <div className="flex-shrink-0 mr-4">
                        <img src={gameData.imageUrl || "/img/personajes/starly/starly.png"} alt="Imagen" className="w-auto h-40" />
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-4 font-bold text-xl story">
                            <Typewriter text="    Lee las indicaciones para comenzar" speed={40} />
                        </div>
                        <button className="hover:bg-purple-700 mt-4 px-4 py-2 rounded font-bold text-white text-xl morado story" onClick={openInstructions}>
                            Indicaciones
                        </button>
                    </div>
                </div>
            </div>

            {showInstructions && (
                <Modal show={showInstructions} onClose={closeInstructions} onStartGame={startGame} modalData={gameData.modalData} />
            )}

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
                            score={score}
                        />
                        <div className="mt-8">
                            <p className="font-semibold text-xl">Ejercicio {currentScene + 1} / {gameData.escenas.length}</p>
                            <p className="font-semibold text-xl">Resultado: {feedback}</p>
                            <p className="font-semibold text-xl">Estrellas: {score} / {gameData.totalPuntos}</p>

                            {/* Botón de "Volver a Intentarlo" si el puntaje no es suficiente */}
                            {showRetry && (
                                <button
                                    className="bg-red-500 hover:bg-red-700 mt-4 px-4 py-2 rounded font-bold text-white"
                                    onClick={retryGame}
                                >
                                    Volver a Intentarlo
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <SeparadorMorado />
        </main>
    );
}
