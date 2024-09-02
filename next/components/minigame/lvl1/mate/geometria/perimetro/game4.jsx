// Juego 4 - Perimetro - Nivel 1

"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const GeometryQuizGame = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame, currentScene }) => {
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
                    question: '¿Qué es el perímetro?',
                    answers: [
                        'La distancia alrededor de una figura',
                        'El área de una figura',
                        'El volumen de una figura',
                        'La longitud de un lado de una figura'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cómo calculamos el perímetro de un triángulo con lados de 3 cm, 4 cm y 5 cm?',
                    answers: [
                        'Perímetro = 3 cm + 4 cm + 5 cm = 12 cm',
                        'Perímetro = 3 cm × 4 cm × 5 cm',
                        'Perímetro = 2 × (3 cm + 4 cm + 5 cm)',
                        'Perímetro = 3 cm + 4 cm'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cuál es el perímetro de un cuadrado con lados de 2 cm?',
                    answers: [
                        'Perímetro = 2 cm',
                        'Perímetro = 4 cm',
                        'Perímetro = 8 cm',
                        'Perímetro = 16 cm'
                    ],
                    correctAnswer: 2
                },
                {
                    question: '¿Cómo calculamos el perímetro de un rectángulo con lados de 6 cm y 3 cm?',
                    answers: [
                        'Perímetro = 6 cm + 6 cm + 3 cm + 3 cm = 18 cm',
                        'Perímetro = 2 × (6 cm + 3 cm) = 18 cm',
                        'Ambas respuestas anteriores son correctas'
                    ],
                    correctAnswer: 2
                },
                {
                    question: '¿Cómo se llama el perímetro de un círculo?',
                    answers: [
                        'Área',
                        'Volumen',
                        'Circunferencia',
                        'Diámetro'
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
                    fontWeight: 'bold',
                    wordWrap: { width: 700 },
                    backgroundColor: '#ffffff',
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
                    score = 60;
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

export default GeometryQuizGame;
