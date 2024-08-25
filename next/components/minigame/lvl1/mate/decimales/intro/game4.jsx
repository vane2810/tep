// Juego 4 - Introduccion de decimales - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Figuras4Game = ({ updateFeedback, updateScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            scene: {
                preload: preload,
                create: create
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
        setGameInstance(game);

        function preload() {
            this.load.image('background', '/img/games/mate/geometria/fondogame1.png');
        }

        function create() {
            let currentScore = 0; // Inicializa el puntaje actual en 0
            let phase = 1;

            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(800, 600);

            const questionText = this.add.text(400, 150, '', {
                fontSize: '28px',
                fill: '#000',
                fontFamily: 'Georgia, serif',
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);

            const optionButtons = [];

            for (let i = 0; i < 4; i++) {
                const button = this.add.text(400, 250 + (i * 70), '', {
                    fontSize: '22px',
                    fill: '#000',
                    backgroundColor: '#E0BBE4',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10,
                    fontFamily: 'Arial',
                    align: 'center',
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer(button.text, button.correctOption, button));
                optionButtons.push(button);
            }

            const nextButton = this.add.text(400, 550, 'Siguiente Fase', {
                fontSize: '24px',
                fill: '#fff',
                backgroundColor: '#006400',
                padding: { x: 25, y: 12 },
                borderRadius: 10,
                fontFamily: 'Arial',
                align: 'center',
            }).setInteractive().setOrigin(0.5);

            nextButton.on('pointerdown', () => {
                updateFeedback('', '');
                phase += 1;
                displayNextQuestion();
            });

            nextButton.setVisible(false);

            const retryButton = this.add.text(400, 350, 'Volver a Intentarlo', {
                fontSize: '24px',
                fill: '#fff',
                backgroundColor: '#ff0000',
                padding: { x: 25, y: 12 },
                borderRadius: 10,
                fontFamily: 'Arial',
                align: 'center',
            }).setInteractive().setOrigin(0.5);

            retryButton.on('pointerdown', () => {
                restartGame();
                if (gameInstance) {
                    gameInstance.destroy(true);
                }
            });

            retryButton.setVisible(false);

            displayNextQuestion();

            function displayNextQuestion() {
                const questions = [
                    {
                        pregunta: "¿Qué tipo de triángulo tiene todos sus lados diferentes?",
                        opciones: [
                            "Equilátero",
                            "Isósceles",
                            "Escaleno", // Correcta
                            "Rectángulo"
                        ],
                        correcta: "Escaleno"
                    },
                    {
                        pregunta: "¿Cuál de las siguientes afirmaciones describe un cuadrado?",
                        opciones: [
                            "Todos los lados y ángulos son iguales.", // Correcta
                            "Tiene lados largos y cortos.",
                            "Es un círculo.",
                            "Solo tiene dos lados iguales."
                        ],
                        correcta: "Todos los lados y ángulos son iguales."
                    },
                    {
                        pregunta: "¿Qué figura geométrica tiene lados opuestos iguales y ángulos rectos?",
                        opciones: [
                            "Triángulo",
                            "Cuadrado",
                            "Rectángulo", // Correcta
                            "Círculo"
                        ],
                        correcta: "Rectángulo"
                    },
                    {
                        pregunta: "¿Cuál es la característica única de un círculo?",
                        opciones: [
                            "Tiene tres lados.",
                            "Todos sus puntos están a la misma distancia del centro.", // Correcta
                            "Tiene cuatro esquinas.",
                            "Es un polígono."
                        ],
                        correcta: "Todos sus puntos están a la misma distancia del centro."
                    },
                    {
                        pregunta: "¿Cuál es el nombre de un triángulo que tiene dos lados iguales?",
                        opciones: [
                            "Equilátero",
                            "Isósceles", // Correcta
                            "Escaleno",
                            "Rectángulo"
                        ],
                        correcta: "Isósceles"
                    }
                ];

                if (phase > 5 || currentScore >= 200) {
                    if (currentScore >= 200) {
                        questionText.setText('¡Felicidades! Has alcanzado los 200 puntos.');
                    } else {
                        questionText.setText('No lograste el total de puntos. Vuelve a intentarlo.');
                        retryButton.setVisible(true);
                    }
                    optionButtons.forEach(button => button.setVisible(false));
                    nextButton.setVisible(false);
                    return;
                }

                const preguntaActual = questions[phase - 1];

                questionText.setText(preguntaActual.pregunta);

                Phaser.Utils.Array.Shuffle(preguntaActual.opciones);

                optionButtons.forEach((button, index) => {
                    button.setText(preguntaActual.opciones[index]);
                    button.correctOption = preguntaActual.correcta;
                    button.setVisible(true);
                    button.setStyle({ fill: '#000', backgroundColor: '#E0BBE4' });
                    button.setInteractive();
                });

                nextButton.setVisible(false);
                retryButton.setVisible(false); // Ocultar el botón de volver a intentar en las preguntas normales
            }

            function checkAnswer(selectedOption, correctOption, button) {
                let score = 0;
                let feedbackMessage = '';
                let feedbackColor = '';

                if (selectedOption === correctOption) {
                    score = 40;
                    feedbackMessage = "¡Correcto! " + correctOption;
                    feedbackColor = '#6aa84f';
                } else {
                    feedbackMessage = "Incorrecto. " + correctOption;
                    feedbackColor = '#ff0000';
                }

                currentScore += score;

                if (currentScore >= 200) {
                    currentScore = 200; // Limitar la puntuación a un máximo de 200
                }

                updateScore(currentScore);  // Actualiza la puntuación acumulada
                updateFeedback(feedbackMessage, `Estrellas: ${currentScore}`);

                button.setStyle({ fill: feedbackColor });

                optionButtons.forEach(btn => btn.disableInteractive());

                if (currentScore >= 200 || phase >= 5) {
                    nextButton.setText('Finalizar');
                } else {
                    nextButton.setText('Siguiente Fase');
                }

                nextButton.setVisible(true);
            }
        }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, restartGame]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Figuras4Game;
