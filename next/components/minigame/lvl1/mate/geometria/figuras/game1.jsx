// Juego 1 - Figuras geometricas - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const FigurasBasicasGame = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
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

        function preload() {
            this.load.image('Triangulo', '/img/niveles/mate/paso2figugeo.png');
            this.load.image('Cuadrado', '/img/niveles/mate/paso3figugeo.png');
            this.load.image('Rectangulo', '/img/niveles/mate/paso4figugeo.png');
            this.load.image('Circulo', '/img/niveles/mate/paso5figugeo.png');
            this.load.image('background', '/img/games/mate/geometria/fondogame1.png');
        }

        function createScene() {
            // Añadir fondo y ajustarlo al tamaño del escenario
            const background = this.add.image(400, 300, 'background'); 
            background.setDisplaySize(config.width, config.height);

            // Seleccionar una figura geométrica aleatoriamente
            const figuras = ['Triangulo', 'Cuadrado', 'Rectangulo', 'Circulo'];
            const figuraCorrecta = Phaser.Math.RND.pick(figuras);
            this.add.image(400, 300, figuraCorrecta); 

            // Opciones de respuesta
            figuras.forEach((figura, index) => {
                const button = this.add.text(200 + (index * 150), 500, figura, {
                    fontSize: '20px', // Tamaño más pequeño
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 },
                    fontFamily: 'Arial' // Asegurar que la fuente es Arial o similar
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, figura, figuraCorrecta, button));
            });
        }

        function checkAnswer(selectedOption, correctOption, button) {
            let score = 0;
            let feedbackMessage = '';
            let feedbackColor = '';

            if (selectedOption === correctOption) {
                score = 15; 
                feedbackMessage = `¡Correcto! Es un ${correctOption}.`;
                feedbackColor = '#6aa84f';
                button.setStyle({ fill: feedbackColor });
            } else {
                score = 0;
                feedbackMessage = `Incorrecto. Es un ${correctOption}.`;
                feedbackColor = '#ff0000';
                button.setStyle({ fill: feedbackColor });
            }

            updateScore(score);
            updateFeedback(feedbackMessage, feedbackColor);

            this.children.list.forEach((child) => {
                if (child.input && child !== button) {
                    child.disableInteractive();
                }
            });

            if (!isFinalScene) {
                const nextButton = this.add.text(400, 550, 'Siguiente', {
                    fontSize: '24px',
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

                const finalMessage = this.add.text(400, 550, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 60 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 60) {
                    const retryButton = this.add.text(400, 500, 'Volver a Intentarlo', {
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

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default FigurasBasicasGame;
