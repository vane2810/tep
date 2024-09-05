// Juego 2 - Comparación de decimales - Nivel 1
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

            // Generar y mostrar las 5 filas de comparaciones
            for (let i = 0; i < 5; i++) {
                generateQuestion.call(this, i);
            }
        }

        function generateQuestion(rowIndex) {
            const num1 = (Phaser.Math.Between(1, 200) / 100).toFixed(2);
            const num2 = (Phaser.Math.Between(1, 200) / 100).toFixed(2);

            let correctAnswer;
            if (num1 > num2) {
                correctAnswer = "Mayor que";
            } else if (num1 < num2) {
                correctAnswer = "Menor que";
            } else {
                correctAnswer = "Igual a";
            }
            correctAnswers[rowIndex] = correctAnswer;

            // Mostrar ambos números para que el jugador los compare
            this.add.text(400, 50 + rowIndex * 100, `Fila ${rowIndex + 1}: ${num1} es... ${num2}`, {
                fontSize: '18px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            const options = ["Mayor que", "Menor que", "Igual a"];
            const buttons = [];

            options.forEach((option, index) => {
                const button = this.add.text(200 + (index * 200), 100 + rowIndex * 100, option, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, option, rowIndex, button, buttons));
                buttons.push(button); // Almacenar los botones de la fila
            });
        }

        function checkAnswer(selectedOption, rowIndex, button, buttons) {
            let feedbackMessage;
            let feedbackColor;

            // Verificar si la respuesta seleccionada es correcta
            if (selectedOption === correctAnswers[rowIndex]) {
                score += 20; // Cada respuesta correcta suma 20 puntos
                localCorrectCount += 1; 
                setCorrectCount(prevCount => prevCount + 1); 
                feedbackMessage = `¡Correcto! ${selectedOption} es la respuesta correcta.`;
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
            if (rowIndex === 4) { 
                setTimeout(() => {
                    if (localCorrectCount === 5) { 
                        updateFeedback(<span style={{ color: '#6aa84f' }}>¡Felicidades! Todas las respuestas son correctas.</span>);
                    } else {
                        updateFeedback(<span style={{ color: '#ff0000' }}>No todas las respuestas son correctas. Inténtalo de nuevo.</span>);
                        if (typeof showRetryButton === 'function') {
                            showRetryButton(true); 
                        }
                    }

                    if (typeof finalizeGame === 'function') {
                        finalizeGame(score);
                    } else {
                        console.error("finalizeGame is not a function");
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
