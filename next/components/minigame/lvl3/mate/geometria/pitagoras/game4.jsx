//Juego 4 - Pitagoras - Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const PythagorasQuizGame = ({ updateFeedback, updateScore, restartGame }) => {
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

            this.questionText = this.add.text(650, 150, '', {
                fontSize: '24px',
                fill: '#000',
                fontFamily: 'Arial',
                align: 'center',
                wordWrap: { width: 1000 }  // Aumentamos el ancho del wordWrap para ajustarlo al nuevo tamaño
            }).setOrigin(0.5);

            this.options = [
                this.add.text(650, 300, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(650, 400, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(650, 500, '', {
                    fontSize: '22px',
                    fill: '#fff',
                    backgroundColor: '#3498db',
                    padding: { x: 20, y: 15 },
                    borderRadius: 10
                }).setInteractive().setOrigin(0.5),

                this.add.text(650, 600, '', {
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

            this.retryButton = this.add.text(650, 700, 'Volver a Intentarlo', {
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
                    question: '¿Qué es un triángulo rectángulo?',
                    answers: [
                        'Un triángulo con un ángulo de 90 grados.',
                        'Un triángulo con todos sus lados iguales.',
                        'Un triángulo con un ángulo obtuso.',
                        'Un triángulo sin ángulos rectos.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué dice el Teorema de Pitágoras?',
                    answers: [
                        'La suma de los cuadrados de los catetos es igual al cuadrado de la hipotenusa.',
                        'La suma de todos los ángulos de un triángulo es 180 grados.',
                        'El perímetro de un triángulo es la suma de sus lados.',
                        'Los ángulos de un triángulo rectángulo son siempre iguales.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cómo se usa el Teorema de Pitágoras?',
                    answers: [
                        'Para calcular la longitud de un lado en un triángulo rectángulo.',
                        'Para medir el área de un triángulo.',
                        'Para dividir un triángulo en dos partes iguales.',
                        'Para sumar los ángulos de un triángulo.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Por qué es importante el Teorema de Pitágoras?',
                    answers: [
                        'Porque se usa en la construcción y navegación para encontrar distancias y alinear objetos.',
                        'Porque se usa para decorar triángulos.',
                        'Porque ayuda a medir el volumen de un triángulo.',
                        'Porque permite crear triángulos más grandes.'
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
                this.retryButton.setVisible(true);
            }
        }

        function update() {
            // Actualización de la escena si es necesario
        }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, restartGame]);

    return <div id="game-container" className="w-[1300px] h-[900px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default PythagorasQuizGame;

