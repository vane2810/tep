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
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            console.log("Creating scene...");
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            // Definir las preguntas sobre el área de figuras planas con cálculos corregidos
            const questions = [
                {
                    figure: 'square',
                    question: '¿Cuál es el área de un cuadrado con lados de 5 cm?',
                    options: ['25', '20', '15'],  // Área correcta: 25 (5 * 5)
                    answer: '25'
                },
                {
                    figure: 'rectangle',
                    question: '¿Cuál es el área de un rectángulo con lados de 4 y 6 cm?',
                    options: ['24', '20', '26'], // Área correcta: 24 (4 * 6)
                    answer: '24'
                },
                {
                    figure: 'triangle',
                    question: '¿Cuál es el área de un triángulo con base de 3cm y altura de 4cm?',
                    options: ['6', '12', '8'], // Área correcta: 6 (0.5 * 3 * 4)
                    answer: '6'
                },
                {
                    figure: 'random',
                    question: '¿Cuál es el área de la siguiente figura?',
                    options: null, // Se establecerán dinámicamente
                    answer: null // Se establecerán dinámicamente
                }
            ];

            // Asignar figura y opciones aleatorias para la última pregunta
            const randomOptions = [
                {
                    figure: 'square_large',
                    question: '¿Cuál es el área de un cuadrado con lados de 10cm?',
                    options: ['100', '50', '75'], // Área correcta: 100 (10 * 10)
                    answer: '100'
                },
                {
                    figure: 'rectangle_large',
                    question: '¿Cuál es el área de un rectángulo con lados de 7 y 8 cm?',
                    options: ['56', '48', '62'], // Área correcta: 56 (7 * 8)
                    answer: '56'
                },
                {
                    figure: 'triangle_large',
                    question: '¿Cuál es el área de un triángulo con base de 5cm y altura de 6cm?',
                    options: ['15', '30', '25'], // Área correcta: 15 (0.5 * 5 * 6)
                    answer: '15'
                }
            ];

            // Seleccionar una opción al azar para la última pregunta
            const randomSelection = Phaser.Math.RND.pick(randomOptions);
            questions[3].figure = randomSelection.figure;
            questions[3].question = randomSelection.question;
            questions[3].options = randomSelection.options;
            questions[3].answer = randomSelection.answer;

            correctAnswers = questions;
            generateQuestion.call(this, currentQuestion);
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function generateQuestion(index) {
            if (index >= correctAnswers.length) {
                finalizeGame(score);
                return;
            }

            const questionData = correctAnswers[index];
            this.children.removeAll();

            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(800, 600);

            // Mostrar la figura correspondiente usando gráficos en lugar de imágenes
            const graphics = this.add.graphics();
            switch (questionData.figure) {
                case 'square':
                    graphics.fillStyle(0xff0000, 1.0); // Rojo
                    graphics.fillRect(300, 200, 100, 100); // Cuadrado de 100x100
                    break;
                case 'rectangle':
                    graphics.fillStyle(0x00ff00, 1.0); // Verde
                    graphics.fillRect(250, 200, 200, 100); // Rectángulo de 200x100
                    break;
                case 'triangle':
                    graphics.fillStyle(0x0000ff, 1.0); // Azul
                    graphics.beginPath();
                    graphics.moveTo(300, 300);
                    graphics.lineTo(400, 300);
                    graphics.lineTo(350, 200);
                    graphics.closePath();
                    graphics.fillPath();
                    break;
                case 'square_large':
                    graphics.fillStyle(0xff0000, 1.0); // Rojo (cuadrado grande)
                    graphics.fillRect(275, 175, 150, 150); // Cuadrado de 150x150
                    break;
                case 'rectangle_large':
                    graphics.fillStyle(0xff00ff, 1.0); // Morado (rectángulo grande)
                    graphics.fillRect(230, 180, 240, 120); // Rectángulo de 240x120
                    break;
                case 'triangle_large':
                    graphics.fillStyle(0x0000ff, 1.0); // Azul (triángulo grande)
                    graphics.beginPath();
                    graphics.moveTo(275, 300);
                    graphics.lineTo(425, 300);
                    graphics.lineTo(350, 180);
                    graphics.closePath();
                    graphics.fillPath();
                    break;
            }

            // Mostrar la pregunta
            const questionText = this.add.text(50, 50, questionData.question, {
                fontSize: '26px',
                fill: '#000000',
                fontWeight: 'bold',
                stroke: '#ffffff',
                strokeThickness: 4,
                wordWrap: { width: 700, useAdvancedWrap: true }
            });

            shuffleArray(questionData.options);

            const buttonStartX = 150;
            const buttonSpacingX = 180;
            const buttonY = 450;
            questionData.options.forEach((option, i) => {
                const x = buttonStartX + i * buttonSpacingX;

                const optionText = this.add.text(x, buttonY, option, {
                    fontSize: '22px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                });

                optionText.setInteractive().on('pointerdown', () => handleOptionClick.call(this, option, questionData.answer));
            });

            questionAnswered = false;
        }

        function handleOptionClick(selectedOption, correctAnswer) {
            if (questionAnswered) return;

            const isCorrect = selectedOption === correctAnswer;
            if (isCorrect) {
                score += 25;
                updateScore(score);
                updateFeedback("¡Muy bien! ¡Respuesta correcta!", "green");
                questionAnswered = true;

                if (currentQuestion < correctAnswers.length - 1) {
                    currentQuestion++;
                    generateQuestion.call(this, currentQuestion);
                } else {
                    updateFeedback("¡Felicidades! Has completado el juego.", "green");
                    setTimeout(() => {
                        finalizeGame(score);
                    }, 2000);
                }
            } else {
                updateFeedback("¡Ups! Intenta de nuevo.", "red");
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
