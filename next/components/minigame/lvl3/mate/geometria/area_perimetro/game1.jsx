// Juego 1 - AREA Y VOLUMEN DE CUERPOS - Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const FigurasTridimensionalesGame = ({ updateFeedback, updateScore, restartGame }) => {
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
            let usedQuestions = [];

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

            const nextButton = this.add.text(400, 550, 'Siguiente', {
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
                const adivinanzas = [
                    {
                        pregunta: "¿Qué diferencia a una figura tridimensional de una figura plana?",
                        opciones: [
                            "Tiene tres dimensiones: largo, ancho y alto",
                            "Es más grande",
                            "Es más colorida",
                            "Tiene más lados"
                        ],
                        correcta: "Tiene tres dimensiones: largo, ancho y alto"
                    },
                    {
                        pregunta: "¿Cuál de las siguientes es un ejemplo de figura tridimensional?",
                        opciones: [
                            "Pirámide",
                            "Círculo",
                            "Cuadrado",
                            "Rectángulo"
                        ],
                        correcta: "Pirámide"
                    },
                    {
                        pregunta: "¿Qué característica define a una esfera como figura tridimensional?",
                        opciones: [
                            "Tiene volumen",
                            "Tiene lados rectos",
                            "Tiene vértices",
                            "Es plana"
                        ],
                        correcta: "Tiene volumen"
                    },
                    {
                        pregunta: "¿Qué figura tridimensional tiene una base cuadrada y cuatro caras triangulares?",
                        opciones: [
                            "Pirámide",
                            "Esfera",
                            "Cubo",
                            "Cilindro"
                        ],
                        correcta: "Pirámide"
                    },
                    {
                        pregunta: "¿Qué figura tridimensional es perfectamente redonda?",
                        opciones: [
                            "Esfera",
                            "Pirámide",
                            "Cubo",
                            "Prisma"
                        ],
                        correcta: "Esfera"
                    }
                ];

                const remainingQuestions = adivinanzas.filter(adivinanza => !usedQuestions.includes(adivinanza.pregunta));

                if (remainingQuestions.length === 0 || currentScore >= 75) {
                    if (currentScore >= 75) {
                        questionText.setText('¡Felicidades! Has logrado el total de puntos.');
                    } else {
                        questionText.setText('No lograste el total de puntos. Vuelve a intentarlo.');
                        retryButton.setVisible(true);
                    }
                    optionButtons.forEach(button => button.setVisible(false));
                    nextButton.setVisible(false);
                    return;
                }

                const preguntaActual = Phaser.Math.RND.pick(remainingQuestions);
                usedQuestions.push(preguntaActual.pregunta);

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
                    score = 15;
                    feedbackMessage = "¡Correcto! " + correctOption;
                    feedbackColor = '#6aa84f';
                } else {
                    feedbackMessage = "Incorrecto. " + correctOption;
                    feedbackColor = '#ff0000';
                }

                currentScore += score;

                if (currentScore >= 75) {
                    currentScore = 75; // Limitar la puntuación a un máximo de 75
                }

                updateScore(currentScore);  // Actualiza la puntuación acumulada
                updateFeedback(feedbackMessage, `Estrellas: ${currentScore}`);

                button.setStyle({ fill: feedbackColor });

                optionButtons.forEach(btn => btn.disableInteractive());

                if (currentScore >= 75) {
                    questionText.setText('¡Felicidades! Has alcanzado 75 puntos.');
                    optionButtons.forEach(button => button.setVisible(false));
                } else {
                    nextButton.setVisible(true);
                }
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

export default FigurasTridimensionalesGame;
