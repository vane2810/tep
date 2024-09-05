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

            // Definir las preguntas sobre transformaciones geométricas
            const questions = [
                {
                    figure: 'move',
                    question: '¿Qué transformación se ha aplicado a la figura?',
                    options: ['Traslación', 'Rotación', 'Reflexión'],
                    answer: 'Traslación'
                },
                {
                    figure: 'rotate',
                    question: '¿Qué transformación se ha aplicado a la figura?',
                    options: ['Rotación', 'Reflexión', 'Traslación'],
                    answer: 'Rotación'
                },
                {
                    figure: 'reflect',
                    question: '¿Qué transformación se ha aplicado a la figura?',
                    options: ['Reflexión', 'Rotación', 'Traslación'],
                    answer: 'Reflexión'
                },
                {
                    figure: 'random',
                    question: null, // Se establecerá dinámicamente
                    options: ['Sí', 'No'], // Respuestas de Sí o No
                    answer: null // Se establecerá dinámicamente
                }
            ];

            // Configurar la última pregunta con una transformación al azar
            const lastQuestionOptions = [
                {
                    figure: 'move',
                    question: '¿Esta figura ha sido movida?',
                    answer: 'Sí'
                },
                {
                    figure: 'rotate',
                    question: '¿Esta figura ha sido rotada?',
                    answer: 'Sí'
                },
                {
                    figure: 'reflect',
                    question: '¿Esta figura ha sido reflejada?',
                    answer: 'Sí'
                },
                {
                    figure: 'move',
                    question: '¿Esta figura ha sido rotada?',
                    answer: 'No'
                },
                {
                    figure: 'rotate',
                    question: '¿Esta figura ha sido movida?',
                    answer: 'No'
                },
                {
                    figure: 'reflect',
                    question: '¿Esta figura ha sido movida?',
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

            // Mostrar la figura transformada usando gráficos
            const graphics = this.add.graphics();

            switch (questionData.figure) {
                case 'move':
                    graphics.fillStyle(0xff0000, 1.0); // Rojo
                    // Dibujar un cuadrado original y su versión trasladada
                    graphics.fillRect(250, 250, 100, 100); // Cuadrado original
                    graphics.fillRect(450, 250, 100, 100); // Cuadrado trasladado
                    // Dibujar una flecha indicando la dirección de la traslación
                    drawArrow(graphics, 350, 300, 50, 0); // Flecha horizontal hacia la derecha, más corta
                    break;
                case 'rotate':
                    graphics.fillStyle(0x00ff00, 1.0); // Verde
                    // Dibujar un cuadrado original y su versión rotada manualmente
                    graphics.fillRect(250, 250, 100, 100); // Cuadrado original
                    drawRotatedSquare(graphics, 550, 300, 100, Phaser.Math.DegToRad(45)); // Cuadrado rotado, desplazado a la derecha
                    break;
                case 'reflect':
                    graphics.fillStyle(0x0000ff, 1.0); // Azul
                    // Dibujar un triángulo escaleno original y su versión reflejada horizontalmente
                    drawScaleneTriangle(graphics, 250, 300); // Triángulo escaleno original
                    drawReflectedScaleneTriangle(graphics, 550, 300); // Triángulo escaleno reflejado
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

        function drawArrow(graphics, fromX, fromY, length, angle) {
            const arrowHeadLength = 10; // Reduce el tamaño de la punta de la flecha
            const arrowHeadAngle = Math.PI / 6;
            const toX = fromX + length * Math.cos(angle);
            const toY = fromY + length * Math.sin(angle);

            graphics.lineStyle(4, 0x000000, 1);
            graphics.beginPath();
            graphics.moveTo(fromX, fromY);
            graphics.lineTo(toX, toY);
            graphics.strokePath();

            graphics.beginPath();
            graphics.moveTo(toX, toY);
            graphics.lineTo(
                toX - arrowHeadLength * Math.cos(angle - arrowHeadAngle),
                toY - arrowHeadLength * Math.sin(angle - arrowHeadAngle)
            );
            graphics.lineTo(
                toX - arrowHeadLength * Math.cos(angle + arrowHeadAngle),
                toY - arrowHeadLength * Math.sin(angle + arrowHeadAngle)
            );
            graphics.closePath();
            graphics.fillPath();
        }

        function drawRotatedSquare(graphics, x, y, size, angle) {
            const halfSize = size / 2;
            const points = [
                { x: -halfSize, y: -halfSize },
                { x: halfSize, y: -halfSize },
                { x: halfSize, y: halfSize },
                { x: -halfSize, y: halfSize }
            ];

            const rotatedPoints = points.map(point => ({
                x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
                y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
            }));

            graphics.beginPath();
            graphics.moveTo(x + rotatedPoints[0].x, y + rotatedPoints[0].y);
            rotatedPoints.forEach(point => {
                graphics.lineTo(x + point.x, y + point.y);
            });
            graphics.closePath();
            graphics.fillPath();
        }

        function drawScaleneTriangle(graphics, x, y) {
            graphics.beginPath();
            graphics.moveTo(x, y - 50);        // Vértice superior
            graphics.lineTo(x - 70, y + 60);   // Vértice inferior izquierdo
            graphics.lineTo(x + 50, y + 40);   // Vértice inferior derecho
            graphics.closePath();
            graphics.fillPath();
        }

        function drawReflectedScaleneTriangle(graphics, x, y) {
            graphics.beginPath();
            graphics.moveTo(x, y - 50);        // Vértice superior
            graphics.lineTo(x + 70, y + 60);   // Vértice inferior izquierdo (reflejado)
            graphics.lineTo(x - 50, y + 40);   // Vértice inferior derecho (reflejado)
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
