// Juego 1 - Fracciones equivalentes - Nivel 2

"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

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
            const background = this.add.image(400, 150, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            const numerator1 = Phaser.Math.Between(1, 5);
            const denominator1 = Phaser.Math.Between(1, 5);
            const equivalentFactor = Phaser.Math.Between(2, 5);

            const correctNumerator = numerator1 * equivalentFactor;
            const correctDenominator = denominator1 * equivalentFactor;

            correctAnswer = `${correctNumerator}/${correctDenominator}`;

            // Generar una respuesta incorrecta plausible
            const wrongNumerator = correctNumerator + Phaser.Math.Between(1, 3);
            const wrongDenominator = correctDenominator + Phaser.Math.Between(1, 3);
            const wrongAnswer = `${wrongNumerator}/${wrongDenominator}`;

            const questions = [correctAnswer, wrongAnswer].sort(() => Math.random() - 0.5);

            // Mostrar la instrucción
            this.add.text(400, 50, `¿Cuál es la fracción equivalente a ${numerator1}/${denominator1}?`, {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Mostrar las opciones como botones interactivos
            questions.forEach((num, index) => {
                const button = this.add.text(300 + (index * 200), 150, num, {
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
                score = 15; // 15 puntos por escena correcta
                feedbackMessage = '¡Correcto! Buen trabajo.';
                feedbackColor = '#6aa84f'; // Verde para correcto
                button.setStyle({ fill: feedbackColor });
            } else {
                score = 0; // Respuesta incorrecta
                feedbackMessage = 'Incorrecto. ¡Inténtalo de nuevo!';
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor });
            }

            updateFeedback(<span style={{ color: feedbackColor }}>{feedbackMessage}</span>);
            updateScore(score);

            this.children.getAll().forEach(child => child.disableInteractive());

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
                    : 'No alcanzaste el puntaje necesario.';

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
