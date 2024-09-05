// Juego 1 - Suma y Resta de Decimales - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game1 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 300,
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

        let correctAnswer;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            // Ajustar el fondo a todo el ancho del juego
            const background = this.add.image(400, 150, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            const operation = Phaser.Math.Between(0, 1) === 0 ? 'suma' : 'resta';
            const base = Phaser.Math.Between(10, 100) / 10;
            const delta = Phaser.Math.Between(1, 10) / 10;

            const number1 = base.toFixed(1);
            const number2 = delta.toFixed(1);

            if (operation === 'suma') {
                correctAnswer = (parseFloat(number1) + parseFloat(number2)).toFixed(1);
            } else {
                correctAnswer = (parseFloat(number1) - parseFloat(number2)).toFixed(1);
            }

            // Mostrar la operación
            this.add.text(400, 50, `${number1} ${operation === 'suma' ? '+' : '-'} ${number2} = ?`, {
                fontSize: '40px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Opciones de respuesta (dos opciones en lugar de tres)
            const wrongAnswer1 = (parseFloat(correctAnswer) + Phaser.Math.Between(-10, 10) / 10).toFixed(1);
            const options = Phaser.Utils.Array.Shuffle([correctAnswer, wrongAnswer1]);

            options.forEach((option, index) => {
                const button = this.add.text(300 + (index * 200), 130, option, {
                    fontSize: '40px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, option, button));
            });
        }

        function checkAnswer(selectedOption, button) {
            let feedbackMessage = '';
            let feedbackColor = '';
            let score = 0;

            if (selectedOption === correctAnswer) {
                feedbackMessage = `¡Correcto! La respuesta es ${correctAnswer}.`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                score = 15; // 15 puntos por respuesta correcta
                button.setStyle({ fill: feedbackColor });
            } else {
                feedbackMessage = `Incorrecto. La respuesta correcta era ${correctAnswer}.`;
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor });
            }

            updateScore(score);
            updateFeedback(feedbackMessage, feedbackColor);

            // Desactivar la interacción con todos los botones
            this.children.list.forEach((child) => {
                if (child.input && child !== button) {
                    child.disableInteractive();
                }
            });

            // Si no es la última escena, mostrar botón "Siguiente"
            if (!isFinalScene) {
                const nextButton = this.add.text(400, 250, 'Siguiente', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#7966ab',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    // Limpiar feedback anterior
                    updateFeedback('', '');
                    proceedToNextScene();
                    if (gameInstance) {
                        gameInstance.destroy(true); // Destruir el juego para avanzar a la siguiente escena
                    }
                });
            } else {
                // En la última escena, mostrar mensaje de finalización basado en el puntaje
                const finalMessageText = finalScore >= 60
                    ? '¡Felicidades! Has completado el juego.'
                    : 'Puntaje ideal no alcanzado.';

                const finalMessage = this.add.text(400, 250, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 60 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 60) {
                    // Mostrar botón de "Volver a Intentarlo"
                    const retryButton = this.add.text(400, 200, 'Volver a Intentarlo', {
                        fontSize: '20px',
                        fill: '#ffffff',
                        backgroundColor: '#ff0000',
                        padding: { x: 20, y: 10 }
                    }).setInteractive().setOrigin(0.5);

                    retryButton.on('pointerdown', () => {
                        if (gameInstance) {
                            gameInstance.destroy(true); // Destruir el juego actual
                        }
                        restartGame(); // Reiniciar el juego desde la escena 1
                    });
                } else {
                    setTimeout(() => {
                        if (gameInstance) {
                            gameInstance.destroy(true);
                        }
                    }, 4000); // Esperar un poco antes de destruir el juego para que el mensaje se vea
                }
            }
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame]);

    return <div id="game-container" className="w-[800px] h-[300px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game1;
