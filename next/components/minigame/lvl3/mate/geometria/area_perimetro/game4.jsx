//Juego 4 - área y perimetro - Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const ThreeDShapesQuizGame = ({ updateFeedback, updateScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1300,
            height: 900,
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
            this.add.image(650, 450, 'background').setDisplaySize(1300, 900);

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

            // Botón "Volver a Intentarlo" dentro del juego
            this.retryButton = this.add.text(400, 575, 'Volver a Intentarlo', {
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
                    question: '¿Qué es una figura tridimensional?',
                    answers: [
                        'Una figura con tres dimensiones: largo, ancho y alto.',
                        'Una figura plana con solo dos dimensiones.',
                        'Una figura sin volumen.',
                        'Una figura que solo tiene una dimensión.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué es el área de una pirámide?',
                    answers: [
                        'La cantidad de superficie que cubre la pirámide.',
                        'El volumen de espacio dentro de la pirámide.',
                        'El perímetro de la base de la pirámide.',
                        'La altura de la pirámide.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué nos dice el volumen de una pirámide?',
                    answers: [
                        'Cuánto espacio ocupa dentro la pirámide.',
                        'Cuántos lados tiene la pirámide.',
                        'La longitud de los bordes de la pirámide.',
                        'Cuánto papel de regalo se necesita para cubrir la pirámide.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué sucede si la pirámide es más alta o más ancha?',
                    answers: [
                        'Su volumen será mayor.',
                        'Su volumen será menor.',
                        'Su área se reduce.',
                        'El número de caras aumenta.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Por qué es importante entender el área y el volumen?',
                    answers: [
                        'Para diseñar objetos y entender cuánto espacio ocupan.',
                        'Para cambiar la forma de los objetos.',
                        'Para reducir el tamaño de una figura.',
                        'Para eliminar las dimensiones de una figura.'
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

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default ThreeDShapesQuizGame;

