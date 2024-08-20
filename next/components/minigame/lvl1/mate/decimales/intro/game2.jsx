// Juego - ¿Cuál es mayor? - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [currentScene, setCurrentScene] = useState(1);

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

        let numbers = [];
        let correctAnswer;
        const pointsPerScene = 20; // Cada escena vale 20 puntos para un total de 100 puntos

        function preload() {
            this.load.image('background', '/img/games/mate/bg.jpg'); // Cambiar la ruta según la imagen que quieras usar
        }

        function createScene() {
            // Ajustar el fondo a todo el ancho del juego
            const background = this.add.image(400, 150, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            // Generar dos números decimales aleatorios
            const num1 = (Phaser.Math.Between(1, 200) / 100).toFixed(2);
            const num2 = (Phaser.Math.Between(1, 200) / 100).toFixed(2);

            numbers = [num1, num2];
            correctAnswer = Math.max(num1, num2).toFixed(2); // Obtener el número mayor

            // Mostrar la instrucción
            this.add.text(400, 50, `Selecciona el número mayor`, {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Mostrar los números como botones interactivos
            numbers.forEach((num, index) => {
                const button = this.add.text(250 + (index * 300), 150, num, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, num, button));
            });
        }

        function checkAnswer(selectedNum, button) {
            let score = 0;
            let feedbackMessage = '';
            let feedbackColor = '';

            if (selectedNum == correctAnswer) {
                score = pointsPerScene; // Cada escena otorga 20 puntos por respuesta correcta
                feedbackMessage = '¡Correcto! Has seleccionado el número mayor.';
                feedbackColor = '#6aa84f'; // Verde para correcto
                button.setStyle({ fill: feedbackColor });
            } else {
                feedbackMessage = 'Incorrecto. Inténtalo de nuevo.';
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor });
            }

            updateScore(score);
            updateFeedback(feedbackMessage, feedbackColor);

            // Desactivar la interacción con todos los números
            numbers.forEach(() => {
                button.disableInteractive();
            });

            // Si no es la última escena, mostrar botón "Siguiente"
            if (currentScene < 5) {
                const nextButton = this.add.text(400, 250, 'Siguiente', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#7966ab',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    setCurrentScene(currentScene + 1);
                    proceedToNextScene(); // Avanzar a la siguiente escena
                    this.scene.restart(); // Reiniciar la escena
                });
            } else {
                // En la última escena, mostrar mensaje de finalización basado en el puntaje
                const finalMessageText = finalScore >= 100
                    ? '¡Felicidades! Has completado el juego con éxito.'
                    : 'Puntaje ideal no alcanzado.';

                const finalMessage = this.add.text(400, 250, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 100 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 100) {
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
                }
            }
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [currentScene, updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame]);

    return <div id="game-container" className="w-[800px] h-[300px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
