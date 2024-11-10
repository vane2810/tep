// Vista para juegos - Sociales - Nivel 1
"use client";
import React, { useEffect, useState, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Volver from '@/components/elements/botonVolver';
import Loading from '@/components/elements/loading';
import { SeparadorAzul } from "@/components/separador";
import Typewriter from "@/components/typeWriter";
import Modal from '@/components/modals/games/instrucciones';
import dynamic from 'next/dynamic';
import { SessionContext } from '@/context/session';

// Importaciones de todos los juegos
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

// Función para guardar el progreso en el backend o localStorage
const guardarProgresoBackend = async (userId, nivel, puntos, materia) => {
    try {
        const response = await fetch('http://localhost:3001/api/progreso/guardar-progreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                userId,
                nivel,
                puntaje: puntos,
                materia
            })
        });
        if (response.ok) {
            console.log("Progreso guardado exitosamente");
        } else {
            console.error("Error guardando el progreso:", response.statusText);
        }
    } catch (error) {
        console.error("Error al hacer fetch para guardar el progreso:", error);
    }
};

export default function JuegoPage() {
    const { session } = useContext(SessionContext);
    const pathname = usePathname();
    const id = pathname.split('/').pop();
    const [gameComponent, setGameComponent] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [puntos, setScore] = useState(0); // Manejo del puntaje
    const [feedback, setFeedback] = useState(''); // Manejo del feedback
    const [currentScene, setCurrentScene] = useState(0); // Manejo de la escena actual
    const [gameKey, setGameKey] = useState(0); // Clave para reiniciar el juego
    const [showInstructions, setShowInstructions] = useState(false); // Estado para mostrar el modal
    const [gameStarted, setGameStarted] = useState(false); // Estado para iniciar el juego
    const [showRetry, setShowRetry] = useState(false); // Estado para mostrar el botón de reinicio
    const [materia, setMateria] = useState('Sociales'); // Materia actual
    
    // Cargar el archivo JSON del juego y restaurar progreso
    useEffect(() => {
        if (id) {
            const loadGame = async () => {
                try {
                    const res = await fetch(`/assets/juegos/sociales/nivel1/game${id}.json`);
                    const data = await res.json();
                    setGameData(data);

                    const component = getGameComponent(data.gameType);
                    if (component) {
                        setGameComponent(() => component);
                    } else {
                        console.error(`No se encontró un componente para el tipo de juego: ${data.gameType}`);
                    }

                    // Restaurar el puntaje y la escena desde localStorage si existe
                    const savedPuntaje = localStorage.getItem(`puntajeSociales-${id}`);
                    const savedEscena = localStorage.getItem(`escenaSociales-${id}`);
                    if (savedPuntaje) setScore(parseInt(savedPuntaje));
                    if (savedEscena) setCurrentScene(parseInt(savedEscena));

                } catch (error) {
                    console.error("Error cargando el juego:", error);
                }
            };

            loadGame();
        }
    }, [id]);

    // Actualizar puntaje y guardar en localStorage
    const updateScore = (points) => {
        const newPuntaje = puntos + points;
        setScore(newPuntaje);
        localStorage.setItem(`puntajeSociales-${id}`, newPuntaje); // Guardar en localStorage
    };

    // Actualizar feedback
    const updateFeedback = (message, color) => {
        setFeedback(<span style={{ color }}>{message}</span>);
    };

    // Desbloquear el siguiente nivel y guardar el progreso
    const desbloquearSiguienteNivel = async () => {
        const progresoGuardado = JSON.parse(localStorage.getItem('progresoSociales')) || [1];
        const nivelActual = parseInt(id);

        if (!progresoGuardado.includes(nivelActual + 1)) {
            const nuevoProgreso = [...progresoGuardado, nivelActual + 1];
            localStorage.setItem('progresoSociales', JSON.stringify(nuevoProgreso));

            // Guardar progreso en el backend
            if (session && session.user) {
                try {
                    await guardarProgresoBackend(session.user, nivelActual + 1, puntos, materia);  // Enviar progreso al backend
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
        setFeedback('');  // Limpiar feedback al pasar a la siguiente escena
        if (currentScene < gameData.escenas.length - 1) {
            setCurrentScene(prevScene => prevScene + 1);
            localStorage.setItem(`escenaSociales-${id}`, currentScene + 1);  // Guardar la escena en localStorage
            setGameKey(prevKey => prevKey + 1);
        } else {
            // Verificar el puntaje acumulado
            if (puntos >= gameData.minPuntos) {
                setFeedback(<span style={{ color: '#6aa84f' }}>¡Felicidades! Has completado el juego con éxito</span>);
                desbloquearSiguienteNivel();  // Desbloquear el siguiente nivel
                localStorage.removeItem(`puntajeSociales-${id}`);  // Limpiar localStorage
                localStorage.removeItem(`escenaSociales-${id}`);
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
        localStorage.removeItem(`puntajeSociales-${id}`);
        localStorage.removeItem(`escenaSociales-${id}`);
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
            <SeparadorAzul />
            {/* Sección de las indicaciones */}
            <div className="flex flex-wrap justify-between items-center">
                <div className="inline-block mb-20 ml-8">
                    <Volver href="/niveles/nivel1/sociales" />
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

                            {/* Botón si el puntaje no es suficiente */}
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

            <SeparadorAzul />
        </main>
    );
}
