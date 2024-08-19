// Juego 1 - Suma y Resta de Decimales - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game1 = ({ updateFeedback, updateScore, showRetryButton }) => {
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

        let number1, number2, correctAnswer;

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

            number1 = base.toFixed(1);
            number2 = delta.toFixed(1);

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

            // Opciones de respuesta
            const wrongAnswer1 = (parseFloat(correctAnswer) + Phaser.Math.Between(-10, 10) / 10).toFixed(1);
            const wrongAnswer2 = (parseFloat(correctAnswer) + Phaser.Math.Between(-10, 10) / 10).toFixed(1);
            const options = Phaser.Utils.Array.Shuffle([correctAnswer, wrongAnswer1, wrongAnswer2]);

            options.forEach((option, index) => {
                const button = this.add.text(260 + (index * 140), 130, option, {
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
                feedbackMessage = `¡Correcto! ${number1} ${correctAnswer}`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                score = 15;
                button.setStyle({ fill: feedbackColor });
            } else {
                feedbackMessage = `Incorrecto. La respuesta correcta era ${correctAnswer}.`;
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor });
            }

            updateScore(prevScore => prevScore + score);
            updateFeedback(feedbackMessage, feedbackColor);

            // Desactivar la interacción con todos los botones
            this.children.list.forEach((child) => {
                if (child.input && child !== button) {
                    child.disableInteractive();
                }
            });

            // Verificar si el puntaje es menor a 50
            if (score < 50) {
                showRetryButton(true);
            } else {
                showRetryButton(false);
            }
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, showRetryButton]);

    return <div id="game-container" className="w-[800px] h-[300px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game1;
