// Juego 1 - Decimales en la vida cotidiana - Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game1 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 450,
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
            const background = this.add.image(config.width / 2, config.height / 2, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            const scenarios = [
                {
                    question: 'Compras una manzana que pesa 0.75 kg \n y una pera que pesa 0.45 kg \n ¿Cuánto pesa la fruta en total?',
                    correctAnswer: '1.20 kg',
                    wrongAnswer: '1.30 kg'
                },
                {
                    question: 'Estás cocinando y necesitas 0.5 litros de leche para la receta, \n pero ya has agregado 0.3 litros. \n ¿Cuánto más necesitas?',
                    correctAnswer: '0.2 litros',
                    wrongAnswer: '0.3 litros'
                },
                {
                    question: 'Corres 2.4 km en la primera vuelta y \n 2.6 km en la segunda vuelta. \n ¿Cuántos kilómetros corriste en total?',
                    correctAnswer: '5.0 km',
                    wrongAnswer: '4.8 km'
                },
                {
                    question: 'Compras un artículo por $12.99 \n y otro por $15.50. \n ¿Cuál es el costo total?',
                    correctAnswer: '$28.49',
                    wrongAnswer: '$27.49'
                },
                {
                    question: 'Una botella contiene 1.75 litros de agua. \n Bebes 0.65 litros. \n ¿Cuánto queda?',
                    correctAnswer: '1.10 litros',
                    wrongAnswer: '1.20 litros'
                }
            ];

            const scenario = Phaser.Utils.Array.GetRandom(scenarios);

            correctAnswer = scenario.correctAnswer;

            // Mostrar la pregunta
            this.add.text(config.width / 2, 100, scenario.question, {
                fontSize: '20px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            const options = Phaser.Utils.Array.Shuffle([scenario.correctAnswer, scenario.wrongAnswer]);

            options.forEach((option, index) => {
                const button = this.add.text(250 + (index * 300), 300, option, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 15, y: 8 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, option, button));
            });
        }

        function checkAnswer(selectedOption, button) {
            let feedbackMessage = '';
            let feedbackColor = '';
            let score = 0;

            if (selectedOption === correctAnswer) {
                feedbackMessage = `¡Correcto! El resultado es ${correctAnswer}.`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                score = 15;
                button.setStyle({ fill: feedbackColor });
            } else {
                feedbackMessage = `Incorrecto. La respuesta correcta era ${correctAnswer}.`;
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor });
            }

            // Actualizar el feedback con el color apropiado
            updateFeedback(<span style={{ color: feedbackColor }}>{feedbackMessage}</span>);
            updateScore(score);

            this.children.list.forEach((child) => {
                if (child.input && child !== button) {
                    child.disableInteractive();
                }
            });

            if (!isFinalScene) {
                const nextButton = this.add.text(config.width / 2, 350, 'Siguiente', {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: '#7966ab',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    updateFeedback('', '');
                    proceedToNextScene();
                    if (gameInstance) {
                        gameInstance.destroy(true);
                    }
                });
            } else {
                const finalMessageText = finalScore >= 60
                    ? '¡Felicidades! Has completado el juego.'
                    : 'No alcanzaste el puntaje ideal.';

                const finalMessage = this.add.text(config.width / 2, 350, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 60 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 60) {
                    const retryButton = this.add.text(config.width / 2, 400, 'Volver a Intentarlo', {
                        fontSize: '20px',
                        fill: '#ffffff',
                        backgroundColor: '#ff0000',
                        padding: { x: 20, y: 10 }
                    }).setInteractive().setOrigin(0.5);

                    retryButton.on('pointerdown', () => {
                        if (gameInstance) {
                            gameInstance.destroy(true);
                        }
                        restartGame();
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

    return <div id="game-container" className="w-[800px] h-[450px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game1;
