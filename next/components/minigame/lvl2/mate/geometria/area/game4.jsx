//Juego 4 - Área - Nivel 2

"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game4 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame, currentScene }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            scene: {
                preload: preload,
                create: createScene,
                update: update
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
            this.load.image('background', '/img/games/mate/geometria/fondo2game1.png');
        }

        function createScene() {
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            const questions = [
                {
                    question: '¿Qué es el área?',
                    answers: [
                        'La cantidad de espacio dentro de una figura plana',
                        'La longitud de los lados de una figura',
                        'El volumen de una figura tridimensional',
                        'La distancia alrededor de una figura'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cuál es la fórmula para calcular el área de un rectángulo?',
                    answers: [
                        'Largo + Ancho',
                        'Largo x Ancho',
                        'Lado x Lado',
                        'Base x Altura ÷ 2'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Cómo calculamos el área de un cuadrado?',
                    answers: [
                        'Largo x Ancho',
                        'Base x Altura ÷ 2',
                        'Lado x Lado',
                        'Lado + Lado'
                    ],
                    correctAnswer: 2
                },
                {
                    question: '¿Cuál es la fórmula para calcular el área de un triángulo?',
                    answers: [
                        'Lado x Lado',
                        'Largo x Ancho',
                        'Base x Altura ÷ 2',
                        'Lado x Lado ÷ 2'
                    ],
                    correctAnswer: 2
                },
                {
                    question: '¿Por qué es importante saber calcular el área?',
                    answers: [
                        'Para saber cuánta alfombra necesitas para cubrir el suelo de una habitación',
                        'Para saber cuánta pintura necesitas para un cuadro',
                        'Para saber cuánta tierra necesitas para llenar un jardín en forma de triángulo',
                        'Todas las anteriores'
                    ],
                    correctAnswer: 3
                }
            ];

            // Ajuste para utilizar currentScene como índice
            let currentQuestionIndex = currentScene - 1;

            showQuestion.call(this, questions[currentQuestionIndex]);

            function showQuestion(question) {
                this.questionText = this.add.text(400, 100, question.question, {
                    fontSize: '24px',
                    fill: '#000000',
                    fontFamily: 'Arial',
                    align: 'center',
                    wordWrap: { width: 700 },
                    backgroundColor: '#7966ab',
                    padding: { x: 10, y: 10 }
                }).setOrigin(0.5);

                this.options = [];

                question.answers.forEach((answer, index) => {
                    const option = this.add.text(400, 200 + (index * 60), answer, {
                        fontSize: '20px',
                        fill: '#000000',
                        backgroundColor: '#eeeeee',
                        padding: { x: 20, y: 10 },
                        fontFamily: 'Arial'
                    }).setInteractive().setOrigin(0.5);

                    option.on('pointerdown', () => checkAnswer.call(this, index, question.correctAnswer, option));
                    this.options.push(option);
                });
            }


            function checkAnswer(selectedIndex, correctIndex, button) {
                let score = 0;
                let feedbackMessage = '';
                let feedbackColor = '';

                if (selectedIndex === correctIndex) {
                    score = 60; // Puntos por respuesta correcta
                    feedbackMessage = '¡Correcto! Sigue así';
                    feedbackColor = '#6aa84f';
                    button.setStyle({ fill: feedbackColor });
                } else {
                    feedbackMessage = 'Incorrecto. Ve a la siguiente';
                    feedbackColor = '#ff0000';
                    button.setStyle({ fill: feedbackColor });
                }

                updateScore(score);
                updateFeedback(feedbackMessage, feedbackColor);

                this.children.list.forEach(child => {
                    if (child.input && child !== button) {
                        child.disableInteractive();
                    }
                });

                if (!isFinalScene) {
                    const nextButton = this.add.text(400, 450, 'Siguiente', {
                        fontSize: '24px',
                        fill: '#ffffff',
                        backgroundColor: '#7966ab',
                        padding: { x: 20, y: 10 }
                    }).setInteractive().setOrigin(0.5);

                    nextButton.on('pointerdown', () => {
                        updateFeedback('', '');
                        proceedToNextScene();
                        if (gameInstance) {
                            gameInstance.destroy(true);
                        }
                    });
                } else {
                    const finalMessageText = finalScore >= 240
                        ? '¡Felicidades! Has completado el juego'
                        : 'Puntaje ideal no alcanzado';

                    const finalMessage = this.add.text(400, 450, finalMessageText, {
                        fontSize: '20px',
                        fill: '#ffffff',
                        backgroundColor: finalScore >= 240 ? '#6aa84f' : '#ff0000',
                        padding: { x: 20, y: 10 }
                    }).setOrigin(0.5);

                    if (finalScore < 240) {
                        const retryButton = this.add.text(400, 500, 'Volver a Intentarlo', {
                            fontSize: '20px',
                            fill: '#ffffff',
                            backgroundColor: '#ff0000',
                            padding: { x: 20, y: 10 }
                        }).setInteractive().setOrigin(0.5);

                        retryButton.on('pointerdown', () => {
                            if (gameInstance) {
                                gameInstance.destroy(true);
                            }
                            restartGame();
                        });
                    } else {
                        setTimeout(() => {
                            if (gameInstance) {
                                gameInstance.destroy(true);
                            }
                        }, 4000);
                    }
                }
            }
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame, currentScene]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game4;
