"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, finalizeGame, incrementCorrectCount, resetGame }) => {
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

            // Generar y mostrar las 5 filas de preguntas sobre porcentajes y su relación con decimales y fracciones
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
            const percentage = Phaser.Math.Between(1, 100);
            const fraction = `${percentage}/100`;
            const decimal = (percentage / 100).toFixed(2);
            const correctAnswer = `${percentage}% = ${fraction} = ${decimal}`;

            correctAnswers[rowIndex] = correctAnswer;

            // Mostrar la instrucción para la fila
            this.add.text(400, 50 + rowIndex * 100, `Fila ${rowIndex + 1}: Selecciona la equivalencia correcta para ${percentage}%`, {
                fontSize: '18px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Generar respuestas alternativas
            const wrongAnswer = `${percentage}% = ${percentage + 1}/100 = ${(percentage + 1) / 100}`;
            const answers = [correctAnswer, wrongAnswer].sort(() => Math.random() - 0.5);

            // Mostrar las respuestas como botones interactivos, con mayor separación
            answers.forEach((answer, index) => {
                const button = this.add.text(200 + (index * 400), 100 + rowIndex * 100, answer, {
                    fontSize: '20px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, answer, rowIndex, button));
            });
        }

        function checkAnswer(selectedAnswer, rowIndex, button) {
            let feedbackMessage;
            let feedbackColor;

            if (selectedAnswer === correctAnswers[rowIndex]) {
                score += 40; // Sumar 40 puntos a la puntuación total, cada pregunta vale 40 puntos
                incrementCorrectCount(); // Incrementar el contador de respuestas correctas en la vista
                feedbackMessage = `¡Correcto! La equivalencia es ${correctAnswers[rowIndex]}.`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                button.setStyle({ fill: feedbackColor, backgroundColor: '#d9ead3' });
            } else {
                feedbackMessage = `Incorrecto. La respuesta correcta era ${correctAnswers[rowIndex]}.`;
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

export default Game3;
