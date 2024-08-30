//Juego 4 - Cuerpos geometricos - Nivel 2
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const GeometricBodiesQuizGame = ({ updateFeedback, updateScore, restartGame }) => {
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
                    question: '¿Qué es un cuerpo geométrico?',
                    answers: [
                        'Una figura tridimensional con largo, ancho y altura.',
                        'Una figura plana con solo dos dimensiones.',
                        'Una figura que tiene solo largo y ancho.',
                        'Una figura que no tiene volumen.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Cuál es la característica principal de un cubo?',
                    answers: [
                        'Tiene dos bases circulares.',
                        'Tiene 6 caras cuadradas iguales.',
                        'Tiene caras laterales triangulares.',
                        'Tiene solo una cara curva.'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Cómo se identifica un prisma?',
                    answers: [
                        'Por tener dos bases paralelas e iguales y caras laterales rectangulares.',
                        'Por tener solo una cara plana y una curva.',
                        'Por no tener aristas ni vértices.',
                        'Por tener solo una base triangular.'
                    ],
                    correctAnswer: 0
                },
                {
                    question: '¿Qué describe mejor a un cilindro?',
                    answers: [
                        'Tiene 6 caras rectangulares.',
                        'Tiene dos bases circulares paralelas y una cara curva.',
                        'Tiene solo una base triangular y una cara lateral.',
                        'Tiene 8 aristas y 6 vértices.'
                    ],
                    correctAnswer: 1
                },
                {
                    question: '¿Cuál es la diferencia entre figuras planas y cuerpos geométricos?',
                    answers: [
                        'Las figuras planas tienen largo, ancho y altura.',
                        'Los cuerpos geométricos tienen solo largo y ancho.',
                        'Las figuras planas tienen largo y ancho, mientras que los cuerpos geométricos tienen largo, ancho y altura.',
                        'No hay diferencia entre figuras planas y cuerpos geométricos.'
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

export default GeometricBodiesQuizGame;

