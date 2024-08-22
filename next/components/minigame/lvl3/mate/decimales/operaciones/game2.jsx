"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
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
            this.load.image('fraction_template', '/img/games/mate/fracciones/template.png');
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
                    questionText = `${numerator1}/${denominator1} + ${numerator2}/${denominator2} = ?`;
                    break;
                case 1: // Resta
                    correctNumerator = (numerator1 * denominator2) - (numerator2 * denominator1);
                    correctDenominator = denominator1 * denominator2;
                    questionText = `${numerator1}/${denominator1} - ${numerator2}/${denominator2} = ?`;
                    break;
                case 2: // Multiplicación
                    correctNumerator = numerator1 * numerator2;
                    correctDenominator = denominator1 * denominator2;
                    questionText = `${numerator1}/${denominator1} * ${numerator2}/${denominator2} = ?`;
                    break;
                case 3: // División
                    correctNumerator = numerator1 * denominator2;
                    correctDenominator = denominator1 * numerator2;
                    questionText = `${numerator1}/${denominator1} ÷ ${numerator2}/${denominator2} = ?`;
                    break;
                default:
                    break;
            }

            correctAnswer = `${correctNumerator}/${correctDenominator}`;

            // Mostrar la pregunta
            this.add.text(config.width / 2, 100, questionText, {
                fontSize: '24px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            createDraggableOptions.call(this, correctAnswer, correctNumerator, correctDenominator);
        }

        function createDraggableOptions(correctAnswer, correctNumerator, correctDenominator) {
            const wrongNumerator = correctNumerator + Phaser.Math.Between(1, 2);
            const wrongDenominator = correctDenominator + Phaser.Math.Between(1, 2);
            const wrongAnswer = `${wrongNumerator}/${wrongDenominator}`;
            const options = Phaser.Utils.Array.Shuffle([correctAnswer, wrongAnswer]);

            options.forEach((option, index) => {
                const fraction = this.add.text(150 + (index * 300), 300, option, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 15, y: 10 }
                }).setInteractive({ draggable: true }).setOrigin(0.5);

                this.input.setDraggable(fraction);

                fraction.on('dragstart', (pointer) => {
                    fraction.setStyle({ backgroundColor: '#7966ab', fill: '#ffffff' });
                });

                fraction.on('dragend', (pointer, gameObject, dropped) => {
                    if (!dropped) {
                        fraction.setStyle({ backgroundColor: '#ffffff', fill: '#000000' });
                    }
                });
            });

            const dropZone = this.add.zone(config.width / 2, 200, 200, 50).setRectangleDropZone(200, 50);
            dropZone.setData('answer', correctAnswer);

            const dropZoneGraphics = this.add.graphics();
            dropZoneGraphics.lineStyle(2, 0xffffff);
            dropZoneGraphics.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);

            this.input.on('drop', (pointer, gameObject, dropZone) => {
                checkAnswer.call(this, gameObject.text, dropZone);
            });
        }

        function checkAnswer(selectedOption, dropZone) {
            let feedbackMessage = '';
            let feedbackColor = '';
            let score = 0;

            if (selectedOption === dropZone.getData('answer')) {
                feedbackMessage = `¡Correcto! El resultado es ${selectedOption}.`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                score = 15;
            } else {
                feedbackMessage = `Incorrecto. El resultado correcto era ${dropZone.getData('answer')}.`;
                feedbackColor = '#ff0000'; // Rojo para incorrecto
            }

            // Actualizar el feedback con el color apropiado
            updateFeedback(<span style={{ color: feedbackColor }}>{feedbackMessage}</span>);
            updateScore(score);

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

export default Game2;
