// components/GameLogic.js
"use client";
import React, { useState } from 'react';
import Loading from '@/components/loading';

export default function GameLogic({ gameData }) {
    const [score, setScore] = useState(0); // Manejo del puntaje
    const [feedback, setFeedback] = useState(''); // Manejo del feedback
    const [currentScene, setCurrentScene] = useState(0); // Manejo de la escena actual
    const [gameKey, setGameKey] = useState(0); // Clave para reiniciar el juego
    const [gameStarted, setGameStarted] = useState(false); // Estado para iniciar el juego
    const [showRetry, setShowRetry] = useState(false); // Estado para mostrar el botón de reinicio

    const updateScore = (points) => {
        setScore(prevScore => prevScore + points);
    };

    const updateFeedback = (message, color) => {
        setFeedback(<span style={{ color }}>{message}</span>);
    };

    const proceedToNextScene = () => {
        setFeedback(''); // Borra el feedback anterior

        if (currentScene < gameData.escenas.length - 1) {
            setCurrentScene(prevScene => prevScene + 1);
            setGameKey(prevKey => prevKey + 1); // Reiniciar el componente para la nueva escena
        } else {
            if (score >= gameData.minPuntos) {
                setFeedback(<span style={{ color: '#6aa84f' }}>¡Felicidades! Has completado el juego</span>);
            } else {
                setFeedback(<span style={{ color: '#ff0000' }}>No alcanzaste el puntaje mínimo. ¡Inténtalo de nuevo!</span>);
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

    if (!gameData) {
        return <Loading />;
    }

    return (
        <>
            <GameRender
                gameData={gameData}
                gameKey={gameKey}
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

                {showRetry && (
                    <button
                        className="bg-red-500 hover:bg-red-700 mt-4 px-4 py-2 rounded font-bold text-white"
                        onClick={retryGame}
                    >
                        Volver a Intentarlo
                    </button>
                )}
            </div>
        </>
    );
}
