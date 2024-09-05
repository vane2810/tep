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
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            console.log("Creating scene...");

            // Establecer un color de fondo en Phaser para verificar si el fondo se muestra correctamente
            this.cameras.main.setBackgroundColor('#3498db'); // Azul claro

            // Verificar si la imagen de fondo se ha cargado correctamente
            if (this.textures.exists('background')) {
                const background = this.add.image(400, 300, 'background').setDepth(-1);
                background.setDisplaySize(800, 600);
            } else {
                console.error("Background image failed to load");
            }

            // Definir las preguntas sobre coordenadas
            const questions = [
                {
                    point: { x: 2, y: 3 },
                    question: '¿Cuál es la coordenada correcta?',
                    options: ['(2, 3)', '(-2, 3)', '(2, -3)'],
                    answer: '(2, 3)'
                },
                {
                    point: { x: -1, y: -4 },
                    question: '¿Cuál es la coordenada correcta?',
                    options: ['(-1, -4)', '(1, -4)', '(-1, 4)'],
                    answer: '(-1, -4)'
                },
                {
                    point: { x: 0, y: 4 },
                    question: '¿Cuál es la coordenada correcta?',
                    options: ['(0, 4)', '(4, 0)', '(0, -4)'],
                    answer: '(0, 4)'
                },
                {
                    point: { x: 4, y: -2 },
                    question: '¿Cuál es la coordenada correcta?',
                    options: ['(4, -2)', '(-4, -2)', '(4, 2)'],
                    answer: '(4, -2)'
                }
            ];

            correctAnswers = questions;
            generateQuestion.call(this, currentQuestion);
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function drawCartesianPlane(graphics) {
            const planeSize = 150;
            const centerX = 400;
            const centerY = 250;

            // Dibujar los ejes X e Y
            graphics.lineStyle(2, 0xffffff, 1);
            graphics.beginPath();

            graphics.moveTo(centerX - planeSize, centerY);
            graphics.lineTo(centerX + planeSize, centerY);

            graphics.moveTo(centerX, centerY - planeSize);
            graphics.lineTo(centerX, centerY + planeSize);

            for (let i = -4; i <= 4; i++) {
                if (i !== 0) {
                    graphics.moveTo(centerX + i * (planeSize / 4), centerY - 3);
                    graphics.lineTo(centerX + i * (planeSize / 4), centerY + 3);
                    this.add.text(centerX + i * (planeSize / 4), centerY + 10, i.toString(), { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);

                    graphics.moveTo(centerX - 3, centerY - i * (planeSize / 4));
                    graphics.lineTo(centerX + 3, centerY - i * (planeSize / 4));
                    this.add.text(centerX + 10, centerY - i * (planeSize / 4), i.toString(), { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);
                }
            }

            graphics.strokePath();
        }

        function generateQuestion(index) {
            if (index >= correctAnswers.length) {
                if (typeof finalizeGame === 'function') {
                    finalizeGame(score);
                } else {
                    console.error("finalizeGame no está definido o no es una función");
                }
                return;
            }

            const questionData = correctAnswers[index];
            this.children.removeAll();

            const graphics = this.add.graphics();

            // Dibujar el plano cartesiano
            drawCartesianPlane.call(this, graphics);

            // Dibujar el punto en la coordenada correcta
            const planeSize = 150;
            const centerX = 400;
            const centerY = 250;
            graphics.fillStyle(0xff0000, 1.0);
            graphics.fillCircle(centerX + questionData.point.x * (planeSize / 4), centerY - questionData.point.y * (planeSize / 4), 5);

            // Mostrar la pregunta centrada
            const questionText = this.add.text(400, 50, questionData.question, {
                fontSize: '26px',
                fill: '#ffffff',
                fontWeight: 'bold',
                stroke: '#000000',
                strokeThickness: 4,
                wordWrap: { width: 700, useAdvancedWrap: true }
            }).setOrigin(0.5);

            shuffleArray(questionData.options);

            const buttonStartX = 200;
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
                score += 25;
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
        <div 
            ref={gameContainerRef} 
            id="game-container" 
            style={{ 
                width: '800px', 
                height: '600px', 
                backgroundColor: '#3498db' 
            }}
        ></div>
    );
};

export default Game2;
