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

            // Definir las preguntas sobre los tipos de polígonos
            const questions = [
                {
                    figure: 'triangle',
                    question: '¿Qué tipo de polígono es este?',
                    options: ['Triángulo', 'Cuadrilátero', 'Pentágono'],
                    answer: 'Triángulo'
                },
                {
                    figure: 'square',
                    question: '¿Qué tipo de polígono es este?',
                    options: ['Cuadrado', 'Pentágono', 'Hexágono'],
                    answer: 'Cuadrado'
                },
                {
                    figure: 'pentagon',
                    question: '¿Qué tipo de polígono es este?',
                    options: ['Pentágono', 'Hexágono', 'Cuadrado'],
                    answer: 'Pentágono'
                },
                {
                    figure: 'random',
                    question: '¿Qué tipo de polígono es este?',
                    options: null, // Se establecerán dinámicamente
                    answer: null // Se establecerán dinámicamente
                }
            ];

            // Asignar figura y opciones aleatorias para la última pregunta
            const randomOptions = [
                {
                    figure: 'hexagon',
                    question: '¿Qué tipo de polígono es este?',
                    options: ['Hexágono', 'Pentágono', 'Heptágono'],
                    answer: 'Hexágono'
                },
                {
                    figure: 'heptagon',
                    question: '¿Qué tipo de polígono es este?',
                    options: ['Heptágono', 'Hexágono', 'Octágono'],
                    answer: 'Heptágono'
                },
                {
                    figure: 'octagon',
                    question: '¿Qué tipo de polígono es este?',
                    options: ['Octágono', 'Hexágono', 'Nonágono'],
                    answer: 'Octágono'
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

            // Mostrar la figura correspondiente usando gráficos en lugar de imágenes
            const graphics = this.add.graphics();
            switch (questionData.figure) {
                case 'triangle':
                    graphics.fillStyle(0xff0000, 1.0); // Rojo
                    graphics.beginPath();
                    graphics.moveTo(400, 220); // Ajuste de posición para centrar
                    graphics.lineTo(350, 320);
                    graphics.lineTo(450, 320);
                    graphics.closePath();
                    graphics.fillPath();
                    break;
                case 'square':
                    graphics.fillStyle(0x00ff00, 1.0); // Verde
                    graphics.fillRect(350, 220, 120, 120); // Cuadrado de 120x120, ajustado para centrar y agrandar
                    break;
                case 'pentagon':
                    graphics.fillStyle(0x0000ff, 1.0); // Azul
                    graphics.beginPath();
                    graphics.moveTo(400, 200);
                    graphics.lineTo(350, 250);
                    graphics.lineTo(370, 320);
                    graphics.lineTo(430, 320);
                    graphics.lineTo(450, 250);
                    graphics.closePath();
                    graphics.fillPath();
                    break;
                case 'hexagon':
                    graphics.fillStyle(0xffff00, 1.0); // Amarillo
                    graphics.beginPath();
                    graphics.moveTo(400, 200);
                    graphics.lineTo(350, 250);
                    graphics.lineTo(350, 300);
                    graphics.lineTo(400, 350);
                    graphics.lineTo(450, 300);
                    graphics.lineTo(450, 250);
                    graphics.closePath();
                    graphics.fillPath();
                    break;
                case 'heptagon':
                    graphics.fillStyle(0xff00ff, 1.0); // Morado
                    graphics.beginPath();
                    graphics.moveTo(400, 180);
                    graphics.lineTo(350, 220);
                    graphics.lineTo(340, 280);
                    graphics.lineTo(370, 330);
                    graphics.lineTo(430, 330);
                    graphics.lineTo(460, 280);
                    graphics.lineTo(450, 220);
                    graphics.closePath();
                    graphics.fillPath();
                    break;
                case 'octagon':
                    graphics.fillStyle(0x00ffff, 1.0); // Cian
                    graphics.beginPath();
                    graphics.moveTo(380, 180);
                    graphics.lineTo(420, 180);
                    graphics.lineTo(450, 210);
                    graphics.lineTo(450, 250);
                    graphics.lineTo(420, 280);
                    graphics.lineTo(380, 280);
                    graphics.lineTo(350, 250);
                    graphics.lineTo(350, 210);
                    graphics.closePath();
                    graphics.fillPath();
                    break;
            }

            // Mostrar la pregunta centrada
            const questionText = this.add.text(400, 50, questionData.question, {
                fontSize: '26px',
                fill: '#000000',
                fontWeight: 'bold',
                stroke: '#ffffff',
                strokeThickness: 4,
                wordWrap: { width: 700, useAdvancedWrap: true }
            }).setOrigin(0.5); // Centrar la pregunta

            shuffleArray(questionData.options);

            const buttonStartX = 200; // Ajuste para separar más los botones
            const buttonSpacingX = 200; // Separación entre botones
            const buttonY = 450;
            questionData.options.forEach((option, i) => {
                const x = buttonStartX + i * buttonSpacingX;

                const optionText = this.add.text(x, buttonY, option, {
                    fontSize: '22px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                }).setOrigin(0.5); // Centrar los botones

                optionText.setInteractive().on('pointerdown', () => handleOptionClick.call(this, option, questionData.answer));
            });

            questionAnswered = false;
        }

        function handleOptionClick(selectedOption, correctAnswer) {
            if (questionAnswered) return;

            const isCorrect = selectedOption === correctAnswer;
            const feedbackColor = isCorrect ? "green" : "red"; // Verde si es correcto, rojo si es incorrecto

            updateFeedback(isCorrect ? "¡Muy bien! ¡Respuesta correcta!" : "¡Ups! Intenta de nuevo.", feedbackColor);
            
            if (isCorrect) {
                score += 25;
                updateScore(score);
                questionAnswered = true;

                if (currentQuestion < correctAnswers.length - 1) {
                    currentQuestion++;
                    generateQuestion.call(this, currentQuestion);
                } else {
                    setTimeout(() => {
                        if (typeof finalizeGame === 'function') {
                            finalizeGame(score); // Verificar que finalizeGame sea una función
                        } else {
                            console.error("finalizeGame no está definido o no es una función");
                        }
                        updateFeedback("¡Felicidades! Has completado el juego.", "green"); // Mensaje de felicitaciones en verde
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
