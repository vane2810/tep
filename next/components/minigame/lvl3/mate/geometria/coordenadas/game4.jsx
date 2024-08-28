//Juego 4 - Coordenadas - Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const CartesianCoordinatesQuizGame = ({ updateFeedback, updateScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1200, // Ajuste de ancho a 1200
            height: 900, // Ajuste de altura a 900 para un mejor centrado
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
            this.add.image(600, 450, 'background').setDisplaySize(1200, 900); // Ajusta la posición y el tamaño del fondo al nuevo tamaño del juego

            this.score = 0;
            this.currentQuestionIndex = 0;

            this.questionText = this.add.text(600, 150, '', {
                fontSize: '24px',
                fill: '#000',
                fontFamily: 'Arial',
                align: 'center',
                wordWrap: { width: 1100 }
            }).setOrigin(0.5);

            this.options = [
                this.add.text(600, 300, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(600, 400, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(600, 500, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(600, 600, '', {
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

            // Botón "Volver a Intentarlo" dentro del juego
            this.retryButton = this.add.text(600, 675, 'Volver a Intentarlo', {
                fontSize: '24px',
                fill: '#fff',
                backgroundColor: '#e74c3c',
                padding: { x: 25, y: 12 },
                borderRadius: 10,
                fontFamily: 'Arial',
                align: 'center'
            }).setInteractive().setOrigin(0.5).setVisible(false);

            this.retryButton.on('pointerdown', () => {
                this.score = 0;
                this.currentQuestionIndex = 0;
                updateFeedback('', '');
                this.retryButton.setVisible(false);
                this.options.forEach(option => option.setVisible(true));
                displayQuestion.call(this);
            });

            this.questions = [
                {
                    question: '¿Qué es un plano?',
                    answers: [
                        'Una superficie plana que se extiende en todas las direcciones.',
                        'Una línea recta que se extiende en una sola dirección.',
                        'Una figura tridimensional con largo, ancho y alto.',
                        'Una curva que se cierra sobre sí misma.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué son las coordenadas cartesianas?',
                    answers: [
                        'Un par de números que indican la posición de un punto en un plano.',
                        'Un conjunto de figuras geométricas.',
                        'Una línea que divide un plano en dos partes.',
                        'La medida del área de una figura en un plano.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cómo se ubica un punto en el plano?',
                    answers: [
                        'Moviéndose a lo largo del eje X y luego a lo largo del eje Y según las coordenadas.',
                        'Moviéndose en un círculo hasta encontrar el punto.',
                        'Dibujando una línea desde el origen hasta el punto.',
                        'Contando el número de cuadrículas en el plano.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Por qué son importantes las coordenadas cartesianas?',
                    answers: [
                        'Porque nos permiten describir la posición exacta de algo en un espacio.',
                        'Porque ayudan a medir el área de un plano.',
                        'Porque permiten calcular el volumen de una figura tridimensional.',
                        'Porque son útiles solo en matemáticas avanzadas.'
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
                this.score += 75; // Aumentar en 75 puntos por cada respuesta correcta
                updateFeedback("¡Correcto!", `Estrellas: ${this.score}`);
            } else {
                updateFeedback("Incorrecto", `Estrellas: ${this.score}`);
            }

            this.currentQuestionIndex += 1;

            if (this.currentQuestionIndex < this.questions.length) {
                displayQuestion.call(this);
            } else {
                endGame.call(this);
            }
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

        function update() {
            // Actualización de la escena si es necesario
        }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true); // Destruir la instancia actual del juego cuando el componente se desmonte
            }
        };
    }, [updateFeedback, updateScore, restartGame]);

    return <div id="game-container" className="w-[1200px] h-[900px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default CartesianCoordinatesQuizGame;
