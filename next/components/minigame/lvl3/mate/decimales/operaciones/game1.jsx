// Juego - Operaciones con fracciones / Nivel 3
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const GameOperationsWithFractions = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
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
            this.load.image('fraction_template', '/img/games/mate/fracciones/template.png'); // Imagen opcional para las fracciones
        }

        function createScene() {
            const background = this.add.image(config.width / 2, config.height / 2, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            const operationType = Phaser.Math.Between(0, 3); // 0: Suma, 1: Resta, 2: Multiplicación, 3: División

            const numerator1 = Phaser.Math.Between(1, 5);
            const denominator1 = Phaser.Math.Between(2, 6);
            const numerator2 = Phaser.Math.Between(1, 5);
            const denominator2 = Phaser.Math.Between(2, 6);

            let questionText = '';
            let correctNumerator, correctDenominator;

            switch (operationType) {
                case 0: // Suma
                    correctNumerator = (numerator1 * denominator2) + (numerator2 * denominator1);
                    correctDenominator = denominator1 * denominator2;
                    questionText = `¿Cuál es el resultado de ${numerator1}/${denominator1} + ${numerator2}/${denominator2}?`;
                    break;
                case 1: // Resta
                    correctNumerator = (numerator1 * denominator2) - (numerator2 * denominator1);
                    correctDenominator = denominator1 * denominator2;
                    questionText = `¿Cuál es el resultado de ${numerator1}/${denominator1} - ${numerator2}/${denominator2}?`;
                    break;
                case 2: // Multiplicación
                    correctNumerator = numerator1 * numerator2;
                    correctDenominator = denominator1 * denominator2;
                    questionText = `¿Cuál es el resultado de ${numerator1}/${denominator1} * ${numerator2}/${denominator2}?`;
                    break;
                case 3: // División
                    correctNumerator = numerator1 * denominator2;
                    correctDenominator = denominator1 * numerator2;
                    questionText = `¿Cuál es el resultado de ${numerator1}/${denominator1} ÷ ${numerator2}/${denominator2}?`;
                    break;
                default:
                    break;
            }

            correctAnswer = `${correctNumerator}/${correctDenominator}`;

            // Mostrar la pregunta
            this.add.text(config.width / 2, 100, questionText, {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Generar una respuesta incorrecta plausible
            let wrongNumerator = correctNumerator + Phaser.Math.Between(1, 2); // Más cerca a la correcta
            let wrongDenominator = correctDenominator + Phaser.Math.Between(1, 2);
            const wrongAnswer = `${wrongNumerator}/${wrongDenominator}`;

            const options = Phaser.Utils.Array.Shuffle([correctAnswer, wrongAnswer]);

            options.forEach((option, index) => {
                const button = this.add.text(250 + (index * 300), 200, option, {
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
                feedbackMessage = `Incorrecto. El resultado correcto era ${correctAnswer}.`;
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
                    : 'Puntaje ideal no alcanzado.';

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

export default GameOperationsWithFractions;
