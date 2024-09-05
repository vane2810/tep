// Juego 2 - Identificación de Figuras - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, finalizeGame, showRetryButton }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
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

        const game = new Phaser.Game(config);
        setGameInstance(game);

        let correctAnswers = [];
        let score = 0;
        let localCorrectCount = 0;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            // Generar y mostrar las 4 preguntas sin repetir figuras
            const shapes = Phaser.Utils.Array.Shuffle(['Triángulo', 'Cuadrado', 'Círculo', 'Rectángulo']);
            for (let i = 0; i < 4; i++) {
                generateQuestion.call(this, i, shapes[i]);
            }
        }

        function generateQuestion(rowIndex, shapeName) {
            correctAnswers[rowIndex] = shapeName;

            // Mostrar la pregunta centrada y cerca de la figura
            this.add.text(350, 50 + rowIndex * 150, `¿Qué tipo de figura es esta?`, {
                fontSize: '18px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Dibujar la figura a la derecha de la pregunta, con una pequeña separación
            drawShape.call(this, shapeName, 555, 50 + rowIndex * 150);

            // Colocar las opciones de respuesta debajo de la pregunta
            const buttons = ['Triángulo', 'Cuadrado', 'Círculo', 'Rectángulo'].map((shape, index) => {
                const button = this.add.text(200 + (index * 150), 90 + rowIndex * 150, shape, {
                    fontSize: '18px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, shape, rowIndex, button, buttons));
                return button; // Almacenar los botones de la fila
            });
        }

        function drawShape(shapeName, x, y) {
            const graphics = this.add.graphics();

            if (shapeName === 'Triángulo') {
                graphics.fillStyle(0xff0000); // Rojo
                graphics.fillTriangle(x, y - 20, x - 20, y + 20, x + 20, y + 20);
            } else if (shapeName === 'Cuadrado') {
                graphics.fillStyle(0x00ff00); // Verde
                graphics.fillRect(x - 20, y - 20, 40, 40);
            } else if (shapeName === 'Círculo') {
                graphics.fillStyle(0x0000ff); // Azul
                graphics.fillCircle(x, y, 20);
            } else if (shapeName === 'Rectángulo') {
                graphics.fillStyle(0xffff00); // Amarillo
                graphics.fillRect(x - 30, y - 15, 60, 30);
            }
        }

        function checkAnswer(selectedOption, rowIndex, button, buttons) {
            let feedbackMessage;
            let feedbackColor;

            // Verificar si la respuesta seleccionada es correcta
            if (selectedOption === correctAnswers[rowIndex]) {
                score += 25; // Cada respuesta correcta suma 25 puntos
                localCorrectCount += 1;
                setCorrectCount(prevCount => prevCount + 1);
                feedbackMessage = `¡Correcto! Es un ${selectedOption}.`;
                feedbackColor = '#6aa84f';
            } else {
                feedbackMessage = `Incorrecto. La respuesta correcta era "${correctAnswers[rowIndex]}".`;
                feedbackColor = '#ff0000';
            }

            button.setStyle({ fill: feedbackColor, backgroundColor: feedbackColor === '#6aa84f' ? '#d9ead3' : '#f4cccc' });

            // Actualizar el feedback con el color correspondiente
            updateFeedback(<span style={{ color: feedbackColor }}>{feedbackMessage}</span>);
            updateScore(score);

            // Desactivar la interacción con todos los botones de la fila actual
            buttons.forEach(btn => btn.disableInteractive());

            // Verificar si es la última fila y si todas las respuestas fueron correctas
            if (rowIndex === 3) { // Última fila es la cuarta (index 3)
                setTimeout(() => {
                    if (localCorrectCount === 4) { // 4 respuestas correctas
                        updateFeedback(<span style={{ color: '#6aa84f' }}>¡Felicidades! Todas las respuestas son correctas.</span>);
                        finalizeGame(score);
                    } else {
                        updateFeedback(<span style={{ color: '#ff0000' }}>No todas las respuestas son correctas. Inténtalo de nuevo.</span>);
                        if (typeof showRetryButton === 'function') {
                            showRetryButton(true);
                        }
                    }
                }, 500);
            }
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [finalizeGame]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
