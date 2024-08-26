// Juego - Simetría y sus Tipos
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

            // Definir las preguntas sobre simetría y sus tipos
            const questions = [
                {
                    symmetryType: 'Vertical',
                    question: '¿Qué tipo de simetría muestra esta figura?',
                    options: ['Vertical', 'Horizontal', 'Rotacional'],
                    answer: 'Vertical'
                },
                {
                    symmetryType: 'Horizontal',
                    question: '¿Qué tipo de simetría muestra esta figura?',
                    options: ['Horizontal', 'Vertical', 'Rotacional'],
                    answer: 'Horizontal'
                },
                {
                    symmetryType: 'Rotacional',
                    question: '¿Qué tipo de simetría muestra esta figura?',
                    options: ['Rotacional', 'Vertical', 'Horizontal'],
                    answer: 'Rotacional'
                },
                {
                    symmetryType: 'Variable',
                    question: '¿Es esta figura simétrica?',
                    options: ['Sí', 'No'],
                    answer: 'Variable'
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
                finalizeGame(score);
                return;
            }

            const questionData = correctAnswers[index];
            this.children.removeAll();

            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(800, 600);

            const questionText = this.add.text(50, 50, questionData.question, {
                fontSize: '26px',
                fill: '#000000',
                fontWeight: 'bold',
                stroke: '#ffffff',
                strokeThickness: 4,
                wordWrap: { width: 700, useAdvancedWrap: true }
            });

            const symmetry = this.add.graphics({ x: 400, y: 250 });
            
            // Para el cuarto nivel, se decide al azar si la figura es simétrica o no
            if (questionData.symmetryType === 'Variable') {
                const isSymmetrical = Math.random() < 0.5; // 50% de probabilidad

                if (isSymmetrical) {
                    // Dibujar una figura simétrica
                    symmetry.lineStyle(6, 0x00ff00, 1);
                    symmetry.beginPath();
                    symmetry.moveTo(-60, -60);
                    symmetry.lineTo(60, -60);
                    symmetry.moveTo(-60, 60);
                    symmetry.lineTo(60, 60);
                    symmetry.strokePath();
                    symmetry.lineStyle(3, 0x000000, 1);
                    symmetry.moveTo(0, -60);
                    symmetry.lineTo(0, 60);
                    symmetry.strokePath();
                    questionData.answer = 'Sí';
                } else {
                    // Dibujar una figura no simétrica
                    symmetry.lineStyle(6, 0x000000, 1);
                    symmetry.beginPath();
                    symmetry.moveTo(-50, -50);
                    symmetry.lineTo(50, -50);
                    symmetry.lineTo(50, 50);
                    symmetry.lineTo(-50, 50);
                    symmetry.lineTo(-50, 20);
                    symmetry.lineTo(20, 20);
                    symmetry.lineTo(20, -20);
                    symmetry.lineTo(-50, -20);
                    symmetry.lineTo(-50, -50);
                    symmetry.strokePath();
                    questionData.answer = 'No';
                }
            } else {
                switch (questionData.symmetryType) {
                    case 'Vertical':
                        symmetry.lineStyle(6, 0x00ff00, 1);
                        symmetry.beginPath();
                        symmetry.moveTo(-60, -60);
                        symmetry.lineTo(60, -60);
                        symmetry.moveTo(-60, 60);
                        symmetry.lineTo(60, 60);
                        symmetry.strokePath();
                        symmetry.lineStyle(3, 0x000000, 1);
                        symmetry.moveTo(0, -60);
                        symmetry.lineTo(0, 60);
                        symmetry.strokePath();
                        break;
                    case 'Horizontal':
                        symmetry.lineStyle(6, 0x0000ff, 1);
                        symmetry.beginPath();
                        symmetry.moveTo(-60, -60);
                        symmetry.lineTo(-60, 60);
                        symmetry.moveTo(60, -60);
                        symmetry.lineTo(60, 60);
                        symmetry.strokePath();
                        symmetry.lineStyle(3, 0x000000, 1);
                        symmetry.moveTo(-60, 0);
                        symmetry.lineTo(60, 0);
                        symmetry.strokePath();
                        break;
                    case 'Rotacional':
                        symmetry.lineStyle(6, 0xff0000, 1);
                        symmetry.beginPath();
                        symmetry.arc(0, 0, 60, 0, Math.PI * 2, false);
                        symmetry.strokePath();
                        symmetry.lineStyle(3, 0x000000, 1);
                        symmetry.moveTo(-60, 0);
                        symmetry.lineTo(60, 0);
                        symmetry.moveTo(0, -60);
                        symmetry.lineTo(0, 60);
                        symmetry.strokePath();
                        break;
                }
            }

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
