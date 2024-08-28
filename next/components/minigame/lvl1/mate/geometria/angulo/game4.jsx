// Juego 4 - Angulos - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const AngleQuizGame = ({ updateFeedback, updateScore, restartGame }) => {
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
            }
        };

        const game = new Phaser.Game(config);
        setGameInstance(game);

        function preload() {
            this.load.image('background', '/img/games/mate/geometria/fondo2game1.png');
        }

        function create() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            this.score = 0;
            this.currentQuestionIndex = 0;

            this.questionText = this.add.text(400, 150, '', {
                fontSize: '24px',
                fill: '#000',
                fontFamily: 'Arial',
                align: 'center',
                wordWrap: { width: 700 }
            }).setOrigin(0.5);

            this.options = [
                this.add.text(400, 300, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(400, 375, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(400, 450, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(400, 525, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),
            ];

            this.options.forEach((option, index) => {
                option.on('pointerdown', () => checkAnswer.call(this, index));
            });

            this.retryButton = this.add.text(400, 500, 'Volver a Intentarlo', {
                fontSize: '24px',
                fill: '#fff',
                backgroundColor: '#e74c3c',
                padding: { x: 25, y: 12 },
                borderRadius: 10,
                fontFamily: 'Arial',
                align: 'center'
            }).setInteractive().setOrigin(0.5).setVisible(false);

            this.retryButton.on('pointerdown', () => restartGame());

            this.questions = [
                {
                    question: '¿Qué es un ángulo?',
                    answers: [
                        'Una línea recta.',
                        'El punto donde dos líneas se encuentran.',
                        'La distancia entre dos puntos.',
                        'El área de un círculo.'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Cuál es un ejemplo de un ángulo agudo?',
                    answers: [
                        'El ángulo en la esquina de una hoja de papel.',
                        'El ángulo en la punta de un trozo de pizza.',
                        'El ángulo formado por una puerta abierta de par en par.',
                        'Una línea recta de 180°.'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Qué ángulo mide exactamente 90°?',
                    answers: [
                        'Ángulo agudo',
                        'Ángulo recto',
                        'Ángulo obtuso',
                        'Ángulo llano'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Cuál es un ejemplo de un ángulo obtuso?',
                    answers: [
                        'El ángulo en la esquina de un cuadrado.',
                        'El ángulo en la punta de un lápiz afilado.',
                        'El ángulo formado por un libro abierto ligeramente.',
                        'Una línea recta de 180°.'
                    ],
                    correctAnswer: 2
                },
                {
                    question: '¿Cómo se mide un ángulo?',
                    answers: [
                        'Con una regla.',
                        'Con un compás.',
                        'Con un transportador.',
                        'Con una calculadora.'
                    ],
                    correctAnswer: 2
                }
            ];

            displayQuestion.call(this);
        }

        function displayQuestion() {
            if (this.currentQuestionIndex >= this.questions.length) {
                endGame.call(this);
                return;
            }

            const currentQuestion = this.questions[this.currentQuestionIndex];
            this.questionText.setText(currentQuestion.question);

            currentQuestion.answers.forEach((answer, index) => {
                this.options[index].setText(answer);
            });
        }

        function checkAnswer(index) {
            const currentQuestion = this.questions[this.currentQuestionIndex];
            if (index === currentQuestion.correctAnswer) {
                this.score += 50; // Aumentar en 50 puntos por cada respuesta correcta
                updateFeedback("¡Correcto!", `Estrellas: ${this.score}`);
            } else {
                updateFeedback("Incorrecto", `Estrellas: ${this.score}`);
            }

            this.currentQuestionIndex += 1;
            displayQuestion.call(this);
        }

        function endGame() {
            this.questionText.setText("¡Juego Finalizado!");
            this.options.forEach(option => option.setVisible(false));

            updateScore(this.score);
            if (this.score >= 300) {
                updateFeedback("¡Felicidades! Lo lograste.", `Estrellas: ${this.score}`);
            } else {
                updateFeedback("¡No alcanzaste el puntaje necesario!", `Estrellas: ${this.score}`);
                this.retryButton.setVisible(true); // Mostrar el botón de reinicio si no se alcanzan 300 estrellas
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

export default AngleQuizGame;
