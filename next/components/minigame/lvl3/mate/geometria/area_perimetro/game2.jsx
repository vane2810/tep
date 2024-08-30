"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

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

            // Definir las preguntas sobre el área y volumen de pirámides
            const questions = [
                {
                    figure: 'square_pyramid',
                    question: '¿Cuál es el área de la base de una pirámide cuadrada con un lado de 4 cm?',
                    options: ['16 cm²', '8 cm²', '12 cm²'],
                    answer: '16 cm²'
                },
                {
                    figure: 'triangular_pyramid',
                    question: '¿Cuál es el volumen de una pirámide triangular con una base de 6 cm² y una altura de 9 cm?',
                    options: ['18 cm³', '54 cm³', '27 cm³'],
                    answer: '18 cm³'
                },
                {
                    figure: 'rectangular_pyramid',
                    question: '¿Cuál es el área de la base de una pirámide rectangular con lados de 3 cm y 5 cm?',
                    options: ['15 cm²', '8 cm²', '10 cm²'],
                    answer: '15 cm²'
                },
                {
                    figure: 'random',
                    question: '¿Cuál es el volumen de una pirámide cuadrada con una base de 4 cm² y una altura de 6 cm?',
                    options: null, // Se establecerán dinámicamente
                    answer: null // Se establecerán dinámicamente
                }
            ];

            // Asignar figura y opciones aleatorias para la última pregunta
            const randomOptions = [
                {
                    figure: 'triangular_pyramid',
                    question: '¿Cuál es el volumen de una pirámide triangular con una base de 9 cm² y una altura de 4 cm?',
                    options: ['12 cm³', '18 cm³', '36 cm³'],
                    answer: '12 cm³'
                },
                {
                    figure: 'square_pyramid',
                    question: '¿Cuál es el área de la base de una pirámide cuadrada con un lado de 5 cm?',
                    options: ['25 cm²', '20 cm²', '15 cm²'],
                    answer: '25 cm²'
                },
                {
                    figure: 'rectangular_pyramid',
                    question: '¿Cuál es el volumen de una pirámide rectangular con una base de 10 cm² y una altura de 7 cm?',
                    options: ['35 cm³', '70 cm³', '105 cm³'],
                    answer: '35 cm³'
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

            // Mostrar la figura correspondiente usando gráficos más complejos
            const graphics = this.add.graphics();
            switch (questionData.figure) {
                case 'square_pyramid':
                    drawPyramid(graphics, 400, 300, 100, 100, 0xffc0cb); // Pirámide cuadrada
                    break;
                case 'triangular_pyramid':
                    drawTriangularPyramid(graphics, 400, 300, 100, 100, 0xadd8e6); // Pirámide triangular
                    break;
                case 'rectangular_pyramid':
                    drawRectangularPyramid(graphics, 400, 300, 150, 100, 0x98fb98); // Pirámide rectangular
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

        function drawPyramid(graphics, x, y, width, height, color) {
            graphics.fillStyle(color, 1.0);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x - width / 2, y + height / 2); // Base izquierda
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.closePath();
            graphics.fillPath();

            // Añadir sombra para dar efecto tridimensional
            graphics.fillStyle(0x000000, 0.2);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.lineTo(x + width / 2 - 20, y + height / 2 + 20); // Sombra derecha
            graphics.closePath();
            graphics.fillPath();
        }

        function drawTriangularPyramid(graphics, x, y, width, height, color) {
            graphics.fillStyle(color, 1.0);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x - width / 2, y + height / 2); // Base izquierda
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.closePath();
            graphics.fillPath();

            // Añadir sombra para dar efecto tridimensional
            graphics.fillStyle(0x000000, 0.2);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.lineTo(x + width / 2 - 20, y + height / 2 + 20); // Sombra derecha
            graphics.closePath();
            graphics.fillPath();
        }

        function drawRectangularPyramid(graphics, x, y, width, height, color) {
            graphics.fillStyle(color, 1.0);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x - width / 2, y + height / 2); // Base izquierda
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.closePath();
            graphics.fillPath();

            // Añadir sombra para dar efecto tridimensional
            graphics.fillStyle(0x000000, 0.2);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.lineTo(x + width / 2 - 20, y + height / 2 + 20); // Sombra derecha
            graphics.closePath();
            graphics.fillPath();
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
