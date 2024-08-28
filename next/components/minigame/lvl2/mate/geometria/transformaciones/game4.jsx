//Juego 4 - Transformaciones - Nivel 2
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const TransformationsQuizGame = ({ updateFeedback, updateScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            scene: {
                preload: preload,
                create: create,
                update: update
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


            this.questions = [
                {
                    question: '¿Qué es una transformación geométrica?',
                    answers: [
                        'Es un cambio en la posición u orientación de una figura sin alterar su forma o tamaño.',
                        'Es cuando cambiamos el tamaño de una figura.',
                        'Es cuando creamos una figura nueva.',
                        'Es cuando eliminamos una figura.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué es una traslación?',
                    answers: [
                        'Es mover una figura de un lugar a otro sin girarla ni cambiar su tamaño.',
                        'Es girar una figura alrededor de un punto.',
                        'Es reflejar una figura en un espejo.',
                        'Es cambiar el color de una figura.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué ocurre durante una rotación?',
                    answers: [
                        'Una figura se gira alrededor de un punto fijo.',
                        'Una figura se refleja a través de una línea.',
                        'Una figura se mueve en línea recta.',
                        'Una figura cambia de tamaño.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué es una reflexión?',
                    answers: [
                        'Es reflejar una figura a través de un eje como si estuviera en un espejo.',
                        'Es girar una figura alrededor de un punto.',
                        'Es mover una figura en línea recta.',
                        'Es cambiar el tamaño de una figura.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué tienen en común las traslaciones, rotaciones y reflexiones?',
                    answers: [
                        'No cambian el tamaño ni la forma de la figura, solo su posición o orientación.',
                        'Cambian el tamaño de la figura.',
                        'Eliminan una parte de la figura.',
                        'Cambian el color de la figura.'
                    ],
                    correctAnswer: 0
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
            }
        }

        function update() {
            // Actualización de la escena si es necesario
        }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true); // Destruir la instancia actual del juego cuando el componente se desmonte
            }
        };
    }, [updateFeedback, updateScore, restartGame]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default TransformationsQuizGame;
