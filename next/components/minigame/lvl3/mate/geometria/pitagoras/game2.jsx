"use client";
import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, finalizeGame }) => {
    const gameContainerRef = useRef(null);
    const gameInstanceRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameContainerRef.current,
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

        if (gameInstanceRef.current) {
            gameInstanceRef.current.destroy(true);
        }

        gameInstanceRef.current = new Phaser.Game(config);

        let correctAnswers = [];
        let score = 0;
        let currentQuestion = 0;
        let questionAnswered = false;

        function preload() {
            console.log("Preloading assets...");
            this.load.image('background', '/img/games/mate/ob/game2.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            console.log("Creating scene...");
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            // Definir las preguntas sobre el teorema de Pitágoras
            const questions = [
                {
                    triangleSides: [3, 4, 5], // Triángulo rectángulo simple
                    question: '¿Es un triángulo rectángulo?',
                    options: ['Sí', 'No'],
                    answer: 'Sí',
                    scale: 40
                },
                {
                    triangleSides: [5, 12, 13], // Otro triángulo rectángulo simple
                    question: '¿Es un triángulo rectángulo?',
                    options: ['Sí', 'No'],
                    answer: 'Sí',
                    scale: 20
                },
                {
                    triangleSides: [6, 7, 7], // Triángulo escaleno (no rectángulo)
                    question: '¿Es un triángulo rectángulo?',
                    options: ['Sí', 'No'],
                    answer: 'No',
                    scale: 25
                },
                {
                    triangleSides: [8, 15, 17], // Triángulo rectángulo simple
                    question: '¿Es un triángulo rectángulo?',
                    options: ['Sí', 'No'],
                    answer: 'Sí',
                    scale: 18
                },
                {
                    triangleSides: [6, 6, 6], // Triángulo equilátero (no rectángulo)
                    question: '¿Es un triángulo rectángulo?',
                    options: ['Sí', 'No'],
                    answer: 'No',
                    scale: 35
                }
            ];

            correctAnswers = questions;
            generateQuestion.call(this, currentQuestion);
        }

        function generateQuestion(index) {
            if (index >= correctAnswers.length) {
                if (typeof finalizeGame === 'function') {
                    finalizeGame(score);  // Verificar que finalizeGame sea una función
                } else {
                    console.error("finalizeGame no está definido o no es una función");
                }
                return;
            }

            const questionData = correctAnswers[index];
            this.children.removeAll();

            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(800, 600);

            const graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });

            const [a, b, c] = questionData.triangleSides;

            const scale = questionData.scale;
            const x0 = 400;
            const y0 = 350;

            graphics.beginPath();
            graphics.moveTo(x0, y0);

            if (index === 2) {
                // Triángulo escaleno
                graphics.lineTo(x0 + a * scale, y0);
                graphics.lineTo(x0 + (a * scale) / 2, y0 - b * scale);
            } else if (index === 4) {
                // Triángulo equilátero
                graphics.lineTo(x0 + a * scale, y0);
                graphics.lineTo(x0 + (a * scale) / 2, y0 - (Math.sqrt(3) / 2) * a * scale);
            } else {
                // Triángulo rectángulo
                graphics.lineTo(x0 + a * scale, y0);
                graphics.lineTo(x0, y0 - b * scale);
            }

            graphics.closePath();
            graphics.fillPath();

            // Mostrar los lados del triángulo con estilo mejorado y mayor separación
            const textStyle = {
                fontSize: '22px',
                fill: '#ffffff',
                fontWeight: 'bold',
                stroke: '#000000',
                strokeThickness: 6
            };

            this.add.text(x0 + (a * scale) / 2, y0 + 40, `a = ${a}`, textStyle).setOrigin(0.5);
            this.add.text(x0 - 40, y0 - (b * scale) / 2, `b = ${b}`, textStyle).setOrigin(0.5);
            this.add.text(x0 + (a * scale) / 2 + 60, y0 - (b * scale) / 2 - 60, `c = ${c}`, textStyle).setOrigin(0.5);

            const questionText = this.add.text(400, 50, questionData.question, {
                fontSize: '28px',
                fill: '#000000',
                fontWeight: 'bold',
                stroke: '#ffffff',
                strokeThickness: 4,
                wordWrap: { width: 700, useAdvancedWrap: true }
            }).setOrigin(0.5);

            const buttonStartX = 300;
            const buttonSpacingX = 200;
            const buttonY = 450;

            questionData.options.forEach((option, i) => {
                const x = buttonStartX + i * buttonSpacingX;

                const optionText = this.add.text(x, buttonY, option, {
                    fontSize: '22px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                }).setOrigin(0.5);

                optionText.setInteractive().on('pointerdown', () => handleOptionClick.call(this, option, questionData.answer));
            });

            questionAnswered = false;
        }

        function handleOptionClick(selectedOption, correctAnswer) {
            if (questionAnswered) return;

            const isCorrect = selectedOption === correctAnswer;
            const feedbackColor = isCorrect ? "green" : "red";

            updateFeedback(isCorrect ? "¡Muy bien! ¡Respuesta correcta!" : "¡Ups! Intenta de nuevo.", feedbackColor);

            if (isCorrect) {
                score += 20;
                updateScore(score);
                questionAnswered = true;

                if (currentQuestion < correctAnswers.length - 1) {
                    currentQuestion++;
                    generateQuestion.call(this, currentQuestion);
                } else {
                    setTimeout(() => {
                        if (typeof finalizeGame === 'function') {
                            finalizeGame(score);
                        } else {
                            console.error("finalizeGame no está definido o no es una función");
                        }
                        updateFeedback("¡Felicidades! Has completado el juego.", "green");
                    }, 2000);
                }
            }
        }

        function update() {
            // Actualizaciones del juego si es necesario
        }

        return () => {
            if (gameInstanceRef.current) {
                gameInstanceRef.current.destroy(true);
            }
        };
    }, []);

    return (
        <div ref={gameContainerRef} id="game-container" style={{ width: '800px', height: '600px' }}></div>
    );
};

export default Game2;
