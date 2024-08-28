//Juego 4 - Poligonos - Nivel 2
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const PolygonsQuizGame = ({ updateFeedback, updateScore, restartGame }) => {
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
                    question: '¿Qué es un polígono?',
                    answers: [
                        'Una figura plana con muchos lados rectos.',
                        'Una figura tridimensional con volumen.',
                        'Una figura con solo un lado curvo.',
                        'Una figura sin lados ni vértices.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cuál de los siguientes es un polígono regular?',
                    answers: [
                        'Un cuadrado.',
                        'Un rectángulo.',
                        'Un triángulo escaleno.',
                        'Un trapecio.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué propiedad tiene un polígono regular?',
                    answers: [
                        'Todos sus lados y ángulos son iguales.',
                        'Todos sus lados son desiguales.',
                        'Solo uno de sus ángulos es igual.',
                        'No tiene vértices.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cuál de las siguientes opciones describe un polígono irregular?',
                    answers: [
                        'Todos sus lados son iguales.',
                        'Todos sus lados son desiguales.',
                        'Tiene solo un lado curvo.',
                        'No tiene ángulos interiores.'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Qué ocurre si cuentas los lados de un polígono?',
                    answers: [
                        'Tendrá el mismo número de vértices.',
                        'El número de lados será menor que el de vértices.',
                        'El número de lados será mayor que el de vértices.',
                        'No se pueden contar los lados de un polígono.'
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

export default PolygonsQuizGame;

