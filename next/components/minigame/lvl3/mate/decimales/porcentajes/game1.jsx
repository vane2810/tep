// Juego - Porcetanjes - Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const GamePercentageDecimalFraction = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
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
                    question: 'Compras un artículo con un descuento del 25%. El precio original es $40.00.\n¿Cuánto pagarás después del descuento?',
                    correctAnswer: '$30.00',
                    wrongAnswer: '$32.00'
                },
                {
                    question: 'Tienes una pizza y comes 3/4 de ella. ¿Qué porcentaje de la pizza has comido?',
                    correctAnswer: '75%',
                    wrongAnswer: '50%'
                },
                {
                    question: 'En una clase de 20 estudiantes, 15 pasaron el examen.\n¿Qué porcentaje de los estudiantes aprobaron?',
                    correctAnswer: '75%',
                    wrongAnswer: '80%'
                },
                {
                    question: 'Una camiseta cuesta $20.00 y está en oferta con un 20% de descuento.\n¿Cuánto costará después del descuento?',
                    correctAnswer: '$16.00',
                    wrongAnswer: '$18.00'
                },
                {
                    question: 'Convertir 0.25 en fracción. ¿Cuál es la fracción equivalente?',
                    correctAnswer: '1/4',
                    wrongAnswer: '1/5'
                }
            ];

            const scenario = Phaser.Utils.Array.GetRandom(scenarios);

            correctAnswer = scenario.correctAnswer;

            // Mostrar la pregunta
            this.add.text(config.width / 2, 100, scenario.question, {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold',
                wordWrap: { width: config.width - 40, useAdvancedWrap: true } // Configuración de ajuste de texto
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
                feedbackMessage = `¡Correcto! La respuesta es ${correctAnswer}.`;
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

export default GamePercentageDecimalFraction;
