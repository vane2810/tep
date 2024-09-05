// Juego 2 - Intro de decimales - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, finalizeGame, incrementCorrectCount }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
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
        let score = 0;
        let localCorrectCount = 0;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            correctAnswers = []; 
            score = 0; 
            localCorrectCount = 0;

            for (let i = 0; i < 5; i++) {
                generateQuestion.call(this, i);
            }
        }

        function generateQuestion(rowIndex) {
            const num1 = (Phaser.Math.Between(1, 200) / 100).toFixed(2);
            const num2 = (Phaser.Math.Between(1, 200) / 100).toFixed(2);

            const numbers = [num1, num2];
            correctAnswers[rowIndex] = Math.max(num1, num2).toFixed(2);

            this.add.text(400, 50 + rowIndex * 100, `Fila ${rowIndex + 1}: Selecciona el número mayor`, {
                fontSize: '18px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            numbers.forEach((num, index) => {
                const button = this.add.text(300 + (index * 200), 100 + rowIndex * 100, num, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, num, rowIndex, button));
            });
        }

        function checkAnswer(selectedNum, rowIndex, button) {
            let feedbackMessage;
            let feedbackColor;

            if (selectedNum === correctAnswers[rowIndex]) {
                score += 20; 
                localCorrectCount += 1; 
                incrementCorrectCount(); 
                feedbackMessage = `¡Correcto! Has seleccionado el número mayor en la fila ${rowIndex + 1}.`;
                feedbackColor = '#6aa84f'; 
                button.setStyle({ fill: feedbackColor, backgroundColor: '#d9ead3' });
            } else {
                feedbackMessage = `Incorrecto. No has seleccionado el número mayor en la fila ${rowIndex + 1}.`;
                feedbackColor = '#ff0000'; 
                button.setStyle({ fill: feedbackColor, backgroundColor: '#f4cccc' });
            }

            updateScore(score); 
            updateFeedback(feedbackMessage, feedbackColor);

            this.children.getAll().forEach((child) => {
                if (child.y === button.y) {
                    child.disableInteractive();
                }
            });

            if (rowIndex === 4) {
                setTimeout(() => {
                    if (localCorrectCount === 5) {
                        updateFeedback(<span style={{ color: '#6aa84f' }}>¡Felicidades! Todas las respuestas son correctas.</span>);
                    } else {
                        updateFeedback(<span style={{ color: '#ff0000' }}>No todas las respuestas son correctas. Inténtalo de nuevo.</span>);
                        finalizeGame(score);
                    }
                }, 500);
            }
        }

        function update() {}

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [incrementCorrectCount, finalizeGame]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
