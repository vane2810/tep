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
                    question: '¿Qué figura tiene todos sus lados iguales?',
                    answers: ['Cuadrado', 'Triángulo Isósceles', 'Rectángulo'],
                    correctAnswer: 0
                },
                {
                    question: '¿Cuál figura tiene un ángulo recto?',
                    answers: ['Triángulo Equilátero', 'Rectángulo', 'Círculo'],
                    correctAnswer: 1
                },
                {
                    question: '¿Qué figura tiene tres lados?',
                    answers: ['Círculo', 'Cuadrado', 'Triángulo'],
                    correctAnswer: 2
                },
                {
                    question: '¿Qué figura no tiene lados?',
                    answers: ['Rectángulo', 'Triángulo', 'Círculo'],
                    correctAnswer: 2
                },
                {
                    question: '¿Qué figura tiene cuatro lados de diferentes longitudes?',
                    answers: ['Rectángulo', 'Cuadrado', 'Triángulo Isósceles'],
                    correctAnswer: 0
                }
            ];

            let currentQuestionIndex = currentScene - 1;

            showQuestion.call(this, questions[currentQuestionIndex]);

            function showQuestion(question) {
                this.questionText = this.add.text(400, 100, question.question, {
                    fontSize: '24px',
                    fill: '#000000',
                    fontFamily: 'Arial',
                    align: 'center',
                    wordWrap: { width: 700 }
                }).setOrigin(0.5);

                this.options = [];

                question.answers.forEach((answer, index) => {
                    const option = this.add.text(400, 200 + (index * 60), answer, {
                        fontSize: '20px',
                        fill: '#000000',
                        backgroundColor: '#ffffff',
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
                    feedbackMessage = '¡Correcto!';
                    feedbackColor = '#6aa84f';
                    button.setStyle({ fill: feedbackColor });
                } else {
                    feedbackMessage = 'Incorrecto.';
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

                const nextButton = this.add.text(400, 500, 'Siguiente', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#7966ab',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    this.questionText.destroy();
                    this.options.forEach(option => option.destroy());
                    nextButton.destroy();
                    updateFeedback('');
                    proceedToNextScene();

                    if (!isFinalScene) {
                        currentQuestionIndex++;
                        if (currentQuestionIndex < questions.length) {
                            showQuestion.call(this, questions[currentQuestionIndex]);
                        } else {
                            endGame.call(this);
                        }
                    } else {
                        endGame.call(this);
                    }
                });
            }

            function endGame() {
                const finalMessageText = finalScore >= 250
                    ? '¡Felicidades! Has completado el juego.'
                    : 'No alcanzaste el puntaje necesario. Debes volver a intentarlo para obtener al menos 250 puntos.';

                const finalMessage = this.add.text(400, 300, finalMessageText, {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 250 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 250) {
                    const retryButton = this.add.text(400, 400, 'Volver a Intentarlo', {
                        fontSize: '20px',
                        fill: '#ffffff',
                        backgroundColor: '#e74c3c',
                        padding: { x: 20, y: 10 }
                    }).setInteractive().setOrigin(0.5);

                    retryButton.on('pointerdown', () => {
                        restartGame();
                    });
                }

            }
        }

        function update() {}

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame, currentScene]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default GeometryQuizGame;


