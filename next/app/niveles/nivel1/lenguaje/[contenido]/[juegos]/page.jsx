// Vista para juegos - Lenguaje - Nivel 1
"use client";
import React, { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Volver from '@/components/botonVolver';
import Loading from '@/components/loading';
import { SeparadorMorado } from "@/components/separador";
import Typewriter from "@/components/typeWriter";
import Modal from '@/components/modals/games/instrucciones';
import dynamic from 'next/dynamic';
import { SessionContext } from '@/context/session'; // Importar el contexto de sesión

// Importar los diferentes tipos de juegos de forma dinámica
const getGameComponent = (gameType) => {
    switch (gameType) {
        case "Seleccionar":
            return dynamic(() => import('@/components/minigame/game1'), { ssr: false });
        case "Arrastrar":
            return dynamic(() => import('@/components/minigame/game5'), { ssr: false });
        case "Memoria":
            return dynamic(() => import('@/components/minigame/game6'), { ssr: false });
        default:
            return null;
    }
};

// Función para guardar el progreso en el backend
// Función para guardar el progreso en el backend
const guardarProgresoBackend = async (userId, nivel, puntaje) => {
    try {
        console.log("Datos enviados al backend:", { userId, nivel, puntaje });  // Asegúrate de que puntaje no sea null

        const response = await fetch('http://localhost:3001/api/progreso/guardar-progreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                userId,
                nivel,
                puntaje  // Asegúrate de que se esté enviando un valor no null aquí
            })
        });

        if (response.ok) {
            console.log("Progreso guardado exitosamente en el backend");
        } else {
            console.error("Error al guardar el progreso:", response.statusText);
        }
    } catch (error) {
        console.error("Error al hacer fetch para guardar el progreso:", error);
    }
};



export default function JuegoPage() {
    const { session } = useContext(SessionContext);  // Usar el contexto de sesión
    const pathname = usePathname();
    const id = pathname.split('/').pop();  // Obtener el ID del juego desde la URL
    const [gameComponent, setGameComponent] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [puntos, setScore] = useState(0);  // Estado para manejar el puntaje
    const [feedback, setFeedback] = useState('');  // Estado para manejar el feedback
    const [currentScene, setCurrentScene] = useState(0);  // Estado para manejar la escena actual
    const [gameKey, setGameKey] = useState(0);  // Estado para manejar el reinicio del juego
    const [showInstructions, setShowInstructions] = useState(false);  // Estado para mostrar el modal de instrucciones
    const [gameStarted, setGameStarted] = useState(false);  // Estado para iniciar el juego
    const [showRetry, setShowRetry] = useState(false);  // Estado para mostrar el botón de reinicio

    // Cargar el archivo JSON del juego desde los assets
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

    // Actualizar puntaje
    const updateScore = (points) => {
        setScore(prevScore => prevScore + points);
    };

    // Actualizar feedback
    const updateFeedback = (message, color) => {
        setFeedback(<span style={{ color }}>{message}</span>);
    };

    // Desbloquear el siguiente nivel y actualizar localStorage y backend
    // Desbloquear el siguiente nivel y actualizar localStorage y backend
    const desbloquearSiguienteNivel = async () => {
        const progresoGuardado = JSON.parse(localStorage.getItem('progresoLenguaje')) || [1];  // Cargar el progreso actual
        const nivelActual = parseInt(id);  // Obtener el nivel actual desde la URL

        // Si el siguiente nivel no está desbloqueado, añadirlo al progreso
        if (!progresoGuardado.includes(nivelActual + 1)) {
            const nuevoProgreso = [...progresoGuardado, nivelActual + 1];
            localStorage.setItem('progresoLenguaje', JSON.stringify(nuevoProgreso));  // Guardar el nuevo progreso en localStorage

            // Guardar el progreso en el backend con los puntos
            if (session && session.user) {
                try {
                    await guardarProgresoBackend(session.user, nivelActual + 1, puntos);  // Pasa el valor de `puntos` aquí
                } catch (error) {
                    console.error("Error guardando el progreso en el backend:", error);
                }
            } else {
                console.error('Error: No se encontró la sesión o el userId');
            }
        }
    };


    // Avanzar a la siguiente escena o finalizar el juego
    const proceedToNextScene = () => {
        setFeedback('');  // Limpiar el feedback al pasar a la siguiente escena

        if (currentScene < gameData.escenas.length - 1) {
            setCurrentScene(prevScene => prevScene + 1);
            setGameKey(prevKey => prevKey + 1);
        } else {
            // Al final del juego, verifica el puntaje acumulado
            if (puntos >= gameData.minPuntos) {
                setFeedback(<span style={{ color: '#6aa84f' }}>¡Felicidades! Has completado el juego con éxito</span>);
                desbloquearSiguienteNivel();  // Desbloquear el siguiente nivel
            } else {
                setFeedback(<span style={{ color: '#ff0000' }}>No alcanzaste el puntaje mínimo. ¡Inténtalo de nuevo!</span>);
                setShowRetry(true);
            }
        }
    };

    // Reiniciar el juego
    const retryGame = () => {
        setScore(0);
        setCurrentScene(0);
        setGameKey(prevKey => prevKey + 1);
        setFeedback('');
        setShowRetry(false);
    };

    // Mostrar el modal de instrucciones
    const openInstructions = () => {
        setShowInstructions(true);
    };

    // Cerrar el modal de instrucciones
    const closeInstructions = () => {
        setShowInstructions(false);
    };

    // Iniciar el juego después de cerrar el modal
    const startGame = () => {
        closeInstructions();
        setGameStarted(true);
    };

    if (!gameData || !gameComponent) {
        return <Loading />;  // Mostrar una pantalla de carga mientras se carga el juego
    }

    const GameComponent = gameComponent;

    return (
        <main className="bg-gray-100">
            <SeparadorMorado />
            {/* Sección de las indicaciones */}
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
                            <Typewriter text="Lee las indicaciones para comenzar" speed={40} />
                        </div>
                        <button className="hover:bg-purple-700 mt-4 px-4 py-2 rounded font-bold text-white text-xl morado story" onClick={openInstructions}>
                            Indicaciones
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal con instrucciones */}
            {showInstructions && (
                <Modal show={showInstructions} onClose={closeInstructions} onStartGame={startGame} modalData={gameData.modalData} />
            )}

            {/* Contenedor del juego */}
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
                            puntos={puntos}
                        />
                        <div className="mt-8">
                            <p className="font-semibold text-xl">Ejercicio {currentScene + 1} / {gameData.escenas.length}</p>
                            <p className="font-semibold text-xl">Resultado: {feedback}</p>
                            <p className="font-semibold text-xl">Estrellas: {puntos} / {gameData.totalPuntos}</p>

                            {/* Botón para reiniciar si no alcanza el puntaje mínimo */}
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
