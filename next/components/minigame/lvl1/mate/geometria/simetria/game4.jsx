// Juego 4 - Simetria - Nivel 1

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
                    question: '¿Qué es la simetría?',
                    answers: [
                        'Cuando una figura puede dividirse en dos partes que son iguales',
                        'Cuando una figura tiene diferentes formas en cada lado',
                        'Cuando una figura es tridimensional',
                        'Cuando una figura no tiene lados iguales'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué es la simetría vertical?',
                    answers: [
                        'Cuando puedes dibujar una línea de lado a lado y las dos mitades son iguales',
                        'Cuando puedes girar una figura y se ve igual en algún momento',
                        'Cuando puedes dibujar una línea de arriba hacia abajo y las dos mitades son iguales',
                        'Cuando una figura no tiene simetría'
                    ],
                    correctAnswer: 2
                },
                {
                    question: '¿Qué es un ejemplo de simetría horizontal?',
                    answers: [
                        'Una mariposa',
                        'Un lago que refleja las montañas',
                        'Una estrella de mar',
                        'Un edificio alto'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Qué es la simetría rotacional?',
                    answers: [
                        'Cuando puedes girar una figura y en algún momento se ve igual',
                        'Cuando puedes dividir una figura en dos partes iguales horizontalmente',
                        'Cuando una figura tiene un eje de simetría vertical',
                        'Cuando una figura no se puede girar'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Por qué es importante la simetría?',
                    answers: [
                        'Ayuda a ver el equilibrio y la armonía en las formas',
                        'Es útil en el arte, la naturaleza y en hacer cosas bonitas y organizadas',
                        'Ambas respuestas anteriores son correctas',
                        'No es importante'
                    ],
                    correctAnswer: 2
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
