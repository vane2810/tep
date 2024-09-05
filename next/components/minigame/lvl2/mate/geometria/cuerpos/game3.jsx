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

            // Definir las preguntas sobre los tipos de cuerpos geométricos
            const questions = [
                {
                    figure: 'cube',
                    question: '¿Qué cuerpo geométrico es este?',
                    options: ['Cubo', 'Prisma', 'Cilindro'],
                    answer: 'Cubo'
                },
                {
                    figure: 'prism',
                    question: '¿Qué cuerpo geométrico es este?',
                    options: ['Prisma', 'Cubo', 'Cilindro'],
                    answer: 'Prisma'
                },
                {
                    figure: 'cylinder',
                    question: '¿Qué cuerpo geométrico es este?',
                    options: ['Cilindro', 'Cubo', 'Prisma'],
                    answer: 'Cilindro'
                },
                {
                    figure: 'random',
                    question: null, // Se establecerá dinámicamente
                    options: ['Sí', 'No'], // Respuestas de Sí o No
                    answer: null // Se establecerá dinámicamente
                }
            ];

            // Configurar la última pregunta
            const lastQuestionOptions = [
                {
                    figure: 'cube',
                    question: '¿Es esta figura un Cubo?',
                    answer: 'Sí'
                },
                {
                    figure: 'prism',
                    question: '¿Es esta figura un Prisma?',
                    answer: 'Sí'
                },
                {
                    figure: 'cylinder',
                    question: '¿Es esta figura un Cilindro?',
                    answer: 'Sí'
                },
                {
                    figure: 'cube',
                    question: '¿Es esta figura un Prisma?',
                    answer: 'No'
                },
                {
                    figure: 'prism',
                    question: '¿Es esta figura un Cubo?',
                    answer: 'No'
                },
                {
                    figure: 'cylinder',
                    question: '¿Es esta figura un Cubo?',
                    answer: 'No'
                }
            ];

            // Seleccionar aleatoriamente la configuración para la última pregunta
            const randomLastQuestion = Phaser.Math.RND.pick(lastQuestionOptions);
            questions[3].figure = randomLastQuestion.figure;
            questions[3].question = randomLastQuestion.question;
            questions[3].answer = randomLastQuestion.answer;

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

            // Mostrar la figura correspondiente usando gráficos con una apariencia 3D
            const graphics = this.add.graphics();
            switch (questionData.figure) {
                case 'cube':
                    drawCube(graphics, 300, 200, 100); // Dibujar un cubo pequeño
                    break;
                case 'prism':
                    drawPrism(graphics, 300, 200, 100, 60); // Dibujar un prisma
                    break;
                case 'cylinder':
                    drawCylinder(graphics, 350, 200, 60, 150); // Dibujar un cilindro
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

            // Centrando las opciones de respuesta, ajustando a la derecha
            const totalButtonWidth = 200 + (questionData.options.length - 1) * 200; // Ancho total de los botones
            const buttonStartX = 450 - totalButtonWidth / 2; // Desplazar más a la derecha
            const buttonY = 450;

            questionData.options.forEach((option, i) => {
                const x = buttonStartX + i * 200;

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

        // Función para dibujar un cubo en perspectiva
        function drawCube(graphics, x, y, size) {
            const offset = size / 3;
            graphics.fillStyle(0xff0000, 1.0); // Rojo
            graphics.fillRect(x, y, size, size); // Frente
            graphics.fillStyle(0xaa0000, 1.0); // Sombra lateral
            graphics.beginPath();
            graphics.moveTo(x, y);
            graphics.lineTo(x + offset, y - offset);
            graphics.lineTo(x + size + offset, y - offset);
            graphics.lineTo(x + size, y);
            graphics.closePath();
            graphics.fillPath();
            graphics.fillStyle(0xcc0000, 1.0); // Sombra superior
            graphics.beginPath();
            graphics.moveTo(x + size, y);
            graphics.lineTo(x + size + offset, y - offset);
            graphics.lineTo(x + size + offset, y - offset + size);
            graphics.lineTo(x + size, y + size);
            graphics.closePath();
            graphics.fillPath();
        }

        // Función para dibujar un prisma en perspectiva
        function drawPrism(graphics, x, y, width, height) {
            const offset = width / 3;
            graphics.fillStyle(0x00ff00, 1.0); // Verde
            graphics.fillRect(x, y, width, height); // Frente
            graphics.fillStyle(0x007700, 1.0); // Sombra lateral
            graphics.beginPath();
            graphics.moveTo(x, y);
            graphics.lineTo(x + offset, y - offset);
            graphics.lineTo(x + width + offset, y - offset);
            graphics.lineTo(x + width, y);
            graphics.closePath();
            graphics.fillPath();
            graphics.fillStyle(0x00aa00, 1.0); // Sombra superior
            graphics.beginPath();
            graphics.moveTo(x + width, y);
            graphics.lineTo(x + width + offset, y - offset);
            graphics.lineTo(x + width + offset, y - offset + height);
            graphics.lineTo(x + width, y + height);
            graphics.closePath();
            graphics.fillPath();
        }

        // Función para dibujar un cilindro en perspectiva
        function drawCylinder(graphics, x, y, radius, height) {
            const ellipseHeight = radius / 2;
            graphics.fillStyle(0x0000ff, 1.0); // Azul

            // Dibuja la parte superior del cilindro
            graphics.beginPath();
            graphics.arc(x, y, radius, Math.PI, 2 * Math.PI, false); // Semi-círculo superior
            graphics.lineTo(x + radius, y + height);
            graphics.arc(x, y + height, radius, 0, Math.PI, true); // Semi-círculo inferior
            graphics.closePath();
            graphics.fillPath();

            // Dibuja las líneas laterales del cilindro
            graphics.beginPath();
            graphics.moveTo(x - radius, y);
            graphics.lineTo(x - radius, y + height);
            graphics.moveTo(x + radius, y);
            graphics.lineTo(x + radius, y + height);
            graphics.strokePath();

            // Dibuja un círculo más oscuro en la parte inferior
            graphics.fillStyle(0x000055, 1.0); // Azul oscuro
            graphics.beginPath();
            graphics.arc(x, y + height, radius, 0, Math.PI * 2, false); // Círculo completo en la base
            graphics.closePath();
            graphics.fillPath();
        }

        function handleOptionClick(selectedOption, correctAnswer) {
            if (questionAnswered) return;

            const isCorrect = selectedOption === correctAnswer;
            const feedbackColor = isCorrect ? "green" : "red"; // Verde si es correcto, rojo si es incorrecto

            updateFeedback(isCorrect ? "¡Muy bien! ¡Respuesta correcta!" : "¡Ups! Intenta de nuevo.", feedbackColor);
            
            if (isCorrect) {
                score += 50;
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
