// Juego 2 - Conversión entre Decimales y Fracciones - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, finalizeGame, incrementCorrectCount, resetGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600, // Aumentar altura para acomodar 5 filas
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
        let score = 0; // Inicializamos la puntuación en 0
        let finishButton;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            // Generar y mostrar las 5 filas de preguntas de conversión
            for (let i = 0; i < 5; i++) {
                generateQuestion.call(this, i);
            }

            // Crear botón de Finalizar
            finishButton = this.add.text(400, 550, 'Finalizar', {
                fontSize: '24px',
                fill: '#ffffff',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                className: 'button-finish' // Añadir clase para fácil selección
            }).setInteractive().setOrigin(0.5);

            finishButton.on('pointerdown', () => {
                finishButton.destroy(); // Eliminar el botón "Finalizar" inmediatamente
                finalizeGame(score); // Llamar a la función que maneja el final del juego
            });
        }

        function generateQuestion(rowIndex) {
            const isDecimalToFraction = Phaser.Math.Between(0, 1) === 0;
            let question, correctAnswer, incorrectAnswer;

            if (isDecimalToFraction) {
                // Conversión de decimal a fracción (solo valores hasta 10)
                const decimalValue = (Phaser.Math.Between(1, 10) / 10).toFixed(2);
                const fractionValue = `${(decimalValue * 10).toFixed(0)}/10`;

                question = `¿Cuál es la fracción correspondiente al decimal ${decimalValue}?`;
                correctAnswer = fractionValue;
                incorrectAnswer = `${Phaser.Math.Between(1, 10)}/10`;
            } else {
                // Conversión de fracción a decimal (solo valores hasta 10)
                const numerator = Phaser.Math.Between(1, 10);
                const denominator = 10;
                const decimalValue = (numerator / denominator).toFixed(2);
                const fractionValue = `${numerator}/${denominator}`;

                question = `¿Cuál es el decimal correspondiente a la fracción ${fractionValue}?`;
                correctAnswer = decimalValue;
                incorrectAnswer = (Phaser.Math.Between(1, 10) / 10).toFixed(2);
            }

            correctAnswers[rowIndex] = correctAnswer;

            // Mostrar la instrucción para la fila
            this.add.text(400, 50 + rowIndex * 100, `Fila ${rowIndex + 1}: ${question}`, {
                fontSize: '18px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Mostrar las opciones como botones interactivos
            const options = [correctAnswer, incorrectAnswer].sort(() => Math.random() - 0.5);

            options.forEach((option, index) => {
                const button = this.add.text(300 + (index * 200), 100 + rowIndex * 100, option, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, option, rowIndex, button));
            });
        }

        function checkAnswer(selectedOption, rowIndex, button) {
            let feedbackMessage;
            let feedbackColor;

            if (selectedOption === correctAnswers[rowIndex]) {
                score += 20; // Sumar 20 puntos a la puntuación total, cada pregunta vale 20 puntos
                incrementCorrectCount(); // Incrementar el contador de respuestas correctas en la vista
                feedbackMessage = `¡Correcto! Has seleccionado la conversión correcta en la fila ${rowIndex + 1}.`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                button.setStyle({ fill: feedbackColor, backgroundColor: '#d9ead3' });
            } else {
                feedbackMessage = `Incorrecto. No has seleccionado la conversión correcta en la fila ${rowIndex + 1}.`;
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor, backgroundColor: '#f4cccc' });
            }

            updateScore(score); // Actualizar la puntuación en la vista
            updateFeedback(feedbackMessage, feedbackColor);

            // Desactivar la interacción con todos los números en la fila actual
            this.children.getAll().forEach((child) => {
                if (child.y === button.y) {
                    child.disableInteractive();
                }
            });
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [incrementCorrectCount, finalizeGame, resetGame]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
