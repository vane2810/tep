// Juego 1 - División de decimales -  Nivel 2
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
            this.load.image('background', '/img/games/mate/decimales/gamee.jpg');
        }

        function createScene() {
            // Ajustar el fondo a todo el ancho del juego
            const background = this.add.image(400, 150, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            const decimal1 = (Phaser.Math.Between(10, 30) / 10).toFixed(1); // Un decimal con una cifra
            const decimal2 = 2; // Mantener el divisor constante para simplicidad

            const correctQuotient = (decimal1 / decimal2).toFixed(1); // Resultado simple

            correctAnswer = `${correctQuotient}`;

            // Generar una respuesta incorrecta plausible
            const wrongAnswer = ((parseFloat(correctQuotient) + Phaser.Math.FloatBetween(0.1, 0.9)).toFixed(1));

            const questions = [correctAnswer, wrongAnswer].sort(() => Math.random() - 0.5); // Mezclar respuestas

            // Mostrar la instrucción
            this.add.text(400, 50, `Divide ${decimal1} ÷ ${decimal2}`, {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Mostrar las opciones como botones interactivos
            questions.forEach((num, index) => {
                const button = this.add.text(350 + (index * 100), 150, num, {
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

            if (selectedNum === correctAnswer) {
                score = 15; // 15 estrellas por escena correcta
                feedbackMessage = '¡Correcto! Buen trabajo.';
                feedbackColor = '#6aa84f'; // Verde para correcto
                button.setStyle({ fill: feedbackColor });
            } else {
                score = 0; // Respuesta incorrecta
                feedbackMessage = 'Incorrecto. ¡Inténtalo de nuevo!';
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor });
            }

            // Actualizar el feedback con el color apropiado
            updateFeedback(<span style={{ color: feedbackColor }}>{feedbackMessage}</span>);
            updateScore(score);

            // Desactivar la interacción con todos los números
            this.children.getAll().forEach(child => child.disableInteractive());

            // Si no es la última escena, mostrar botón "Siguiente"
            if (!isFinalScene) {
                const nextButton = this.add.text(400, 250, 'Siguiente', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#7966ab',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    updateFeedback('', '');
                    proceedToNextScene();
                    if (gameInstance) {
                        gameInstance.destroy(true); // Destruir el juego para avanzar a la siguiente escena
                    }
                });
            } else {
                const finalMessageText = finalScore >= 60
                    ? '¡Felicidades! Has completado el juego.'
                    : 'No alcanzaste el puntaje necesario';

                const finalMessage = this.add.text(400, 250, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 60 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 60) {
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
                    }, 4000);
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
