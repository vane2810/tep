"use client";
import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, finalizeGame }) => {
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

            // Definir las preguntas sobre simetría
            const questions = [
                {
                    figure: 'vertical',
                    question: '¿Qué tipo de simetría representa esta figura?',
                    options: ['Simetría Vertical', 'Simetría Horizontal', 'Simetría Rotacional'],
                    answer: 'Simetría Vertical'
                },
                {
                    figure: 'horizontal',
                    question: '¿Qué tipo de simetría representa esta figura?',
                    options: ['Simetría Horizontal', 'Simetría Vertical', 'Simetría Rotacional'],
                    answer: 'Simetría Horizontal'
                },
                {
                    figure: 'rotational',
                    question: '¿Qué tipo de simetría representa esta figura?',
                    options: ['Simetría Rotacional', 'Simetría Horizontal', 'Simetría Vertical'],
                    answer: 'Simetría Rotacional'
                },
                {
                    figure: 'newShape',
                    question: '¿Qué tipo de simetría tiene esta figura?',
                    options: [],
                    answer: '',
                    showSymmetry: true
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

            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(800, 600);

            const graphics = this.add.graphics();
            let selectedSymmetry = null;

            switch (questionData.figure) {
                case 'vertical':
                    graphics.fillStyle(0xff0000, 1.0);
                    graphics.fillRect(375, 200, 50, 200); // Línea vertical más pequeña

                    // Línea de simetría centrada
                    graphics.lineStyle(4, 0x000000);
                    graphics.lineBetween(400, 200, 400, 400); // Línea centrada verticalmente dentro de la figura
                    break;
                case 'horizontal':
                    graphics.fillStyle(0x00ff00, 1.0);
                    graphics.fillRect(250, 285, 300, 30); // Línea horizontal más pequeña y centrada

                    // Línea de simetría centrada
                    graphics.lineStyle(4, 0x000000);
                    graphics.lineBetween(250, 300, 550, 300); // Línea centrada horizontalmente dentro de la figura
                    break;
                case 'rotational':
                    const square1 = graphics.fillStyle(0x0000ff, 1.0);
                    square1.fillRect(300, 250, 100, 100); // Cuadrado sin rotar
                    const square2 = this.add.rectangle(500, 300, 100, 100, 0x0000ff);
                    square2.setOrigin(0.5);
                    square2.setRotation(Phaser.Math.DegToRad(45)); // Rotar 45 grados
                    break;
                case 'newShape':
                    graphics.fillStyle(0x00ffff, 1.0);
                    graphics.beginPath();
                    graphics.moveTo(400, 200);
                    graphics.lineTo(350, 250);
                    graphics.lineTo(350, 300);
                    graphics.lineTo(400, 350);
                    graphics.lineTo(450, 300);
                    graphics.lineTo(450, 250);
                    graphics.closePath();
                    graphics.fillPath();

                    if (questionData.showSymmetry) {
                        const symmetries = ['vertical', 'horizontal']; // Solo vertical y horizontal
                        selectedSymmetry = Phaser.Math.RND.pick(symmetries);

                        if (selectedSymmetry === 'vertical') {
                            graphics.lineStyle(4, 0x000000); // Línea de simetría en color negro
                            graphics.lineBetween(400, 200, 400, 350); // Línea centrada en la figura
                        } else if (selectedSymmetry === 'horizontal') {
                            graphics.lineStyle(4, 0x000000); // Línea de simetría en color negro
                            graphics.lineBetween(350, 275, 450, 275); // Línea centrada horizontalmente
                        }

                        questionData.options = ['Simetría Vertical', 'Simetría Horizontal', 'Simetría Rotacional']; // Mantener el formato
                        questionData.answer = selectedSymmetry === 'vertical' ? 'Simetría Vertical' : 'Simetría Horizontal';
                    }
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
            }).setOrigin(0.5);

            shuffleArray(questionData.options);

            const buttonStartX = 150;
            const buttonSpacingX = 250;
            const buttonY = 450;
            questionData.options.forEach((option, i) => {
                const x = buttonStartX + i * buttonSpacingX;

                const optionText = this.add.text(x, buttonY, option, {
                    fontSize: '18px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 15, y: 8 },
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
                score += 50; // Cada nivel vale 50 puntos
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

export default Game3;
