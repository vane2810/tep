// Juego 4 - Comparación de Decimales - Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game4 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame, currentScene }) => {
    const [userInput, setUserInput] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showRetryButton, setShowRetryButton] = useState(false);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);

    const questions = [
        { question: '¿Cuál es mayor? 0.5 o 0.7', correctAnswer: '0.7' },
        { question: '¿Cuál es menor? 1.25 o 1.2', correctAnswer: '1.2' },
        { question: '¿Cuál es mayor? 0.33 o 0.35', correctAnswer: '0.35' },
        { question: '¿Cuál es menor? 2.45 o 2.5', correctAnswer: '2.45' },
        { question: '¿Cuál es mayor? 0.8 o 0.88', correctAnswer: '0.88' },
        { question: '¿Cuál es menor? 1.75 o 1.7', correctAnswer: '1.7' }
    ];

    useEffect(() => {
        const preload = function () {
            this.load.image('background', '/img/games/mate/decimales/game4.jpg');
        };

        const create = function () {
            const background = this.add.image(400, 100, 'background');
            background.setDisplaySize(800, 200);

            const currentQuestion = questions[currentScene - 1];
            setCorrectAnswer(currentQuestion.correctAnswer);

            this.add.text(400, 100, currentQuestion.question, {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold',
                wordWrap: { width: 760, useAdvancedWrap: true }
            }).setOrigin(0.5);
        };

        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 200,
            parent: 'game-container',
            scene: {
                preload: preload,
                create: create,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, [currentScene]);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        let feedbackMessage = '';
        let feedbackColor = '';
        let score = 0;

        if (userInput.trim() === correctAnswer) {
            feedbackMessage = `¡Correcto! La respuesta es ${correctAnswer}.`;
            feedbackColor = '#6aa84f';
            score = 50;
        } else {
            feedbackMessage = `Incorrecto. La respuesta correcta era ${correctAnswer}.`;
            feedbackColor = '#ff0000';
        }

        updateScore(score);
        updateFeedback(<span style={{ color: feedbackColor }}>{feedbackMessage}</span>);
        setShowNextButton(true);
    };

    const handleNextScene = () => {
        setShowNextButton(false);
        setIsSubmitted(false);
        setUserInput('');
        updateFeedback('');

        if (currentScene < 6) {
            proceedToNextScene();
        } else {
            if (finalScore >= 200) {
                setShowCompletionMessage(true);
            } else {
                updateFeedback(<span style={{ color: '#ff0000' }}>No alcanzaste el puntaje necesario. Debes volver a intentarlo.</span>);
                setShowRetryButton(true);
            }
        }
    };

    const handleRetry = () => {
        setShowRetryButton(false);
        restartGame();
    };

    return (
        <div className="game-container">
            <div id="game-container" className="w-[800px] h-[200px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>
            {!isSubmitted && !showRetryButton && !showCompletionMessage && (
                <div className="input-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        style={{
                            fontSize: '24px',
                            padding: '10px',
                            width: '150px',
                            textAlign: 'center',
                            border: '2px solid #000000',
                            marginRight: '10px'
                        }}
                    />
                    <button
                        onClick={handleSubmit}
                        style={{
                            fontSize: '24px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Comprobar
                    </button>
                </div>
            )}
            {showNextButton && !showRetryButton && !showCompletionMessage && (
                <div className="next-button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={handleNextScene}
                        style={{
                            fontSize: '24px',
                            backgroundColor: '#7966ab',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Siguiente
                    </button>
                </div>
            )}
            {showRetryButton && (
                <div className="retry-button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={handleRetry}
                        style={{
                            fontSize: '24px',
                            backgroundColor: '#ff0000',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Volver a Intentarlo
                    </button>
                </div>
            )}
            {showCompletionMessage && (
                <div className="completion-message" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span style={{ color: '#6aa84f', fontSize: '24px', fontWeight: 'bold' }}>
                        ¡Felicidades! Has completado el juego con éxito.
                    </span>
                </div>
            )}
        </div>
    );
};

export default Game4;
