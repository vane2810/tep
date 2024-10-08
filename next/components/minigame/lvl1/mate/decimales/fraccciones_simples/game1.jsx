// Juego 1 - Fracciones simples - Nivel 2
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game1 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        // Configuración del juego Phaser
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
        let numerator, denominator;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            // Ajustar el fondo a todo el ancho del juego
            const background = this.add.image(400, 150, 'background');
            background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            denominator = Phaser.Math.Between(2, 5); // Denominador entre 2 y 5
            numerator = Phaser.Math.Between(1, denominator - 1); // Numerador menor que el denominador

            correctAnswer = `${numerator}/${denominator}`;

            // Mostrar la instrucción
            this.add.text(400, 50, `¿Cuál es la fracción correcta para el numerador ${numerator} y denominador ${denominator}?`, {
                fontSize: '18px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Generar una respuesta incorrecta
            let wrongNumerator;
            do {
                wrongNumerator = Phaser.Math.Between(1, denominator - 1);
            } while (wrongNumerator === numerator);

            const wrongAnswer = `${wrongNumerator}/${denominator}`;
            const options = Phaser.Utils.Array.Shuffle([correctAnswer, wrongAnswer]);

            // Mostrar las opciones
            options.forEach((option, index) => {
                const button = this.add.text(260 + (index * 280), 130, option, {
                    fontSize: '40px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, option, button));
            });
        }

        function checkAnswer(selectedOption, button) {
            let score = 0;
            let feedbackMessage = '';
            let feedbackColor = '';

            if (selectedOption === correctAnswer) {
                score = 15; // 15 estrellas por escena correcta
                feedbackMessage = `¡Correcto! La fracción es ${correctAnswer}.`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                button.setStyle({ fill: feedbackColor });
            } else {
                score = 0; // Respuesta incorrecta
                feedbackMessage = `Incorrecto. La fracción correcta era ${correctAnswer}.`;
                feedbackColor = '#ff0000'; // Rojo para incorrecto
                button.setStyle({ fill: feedbackColor });
            }

            updateScore(score);
            updateFeedback(feedbackMessage, feedbackColor);

            // Desactivar la interacción con todos los botones
            this.children.list.forEach((child) => {
                if (child.input && child !== button) {
                    child.disableInteractive();
                }
            });

            // Si no es la última escena, mostrar botón "Siguiente"
            if (!isFinalScene) {
                const nextButton = this.add.text(400, 250, 'Siguiente', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#7966ab',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    // Limpiar feedback anterior
                    updateFeedback('', '');
                    proceedToNextScene();
                    // Destruir la instancia del juego después de un pequeño retraso para evitar conflictos
                    setTimeout(() => {
                        if (gameInstance) {
                            gameInstance.destroy(true); // Destruir el juego para avanzar a la siguiente escena
                            setGameInstance(null);
                        }
                    }, 100);
                });
            } else {
                // En la última escena, mostrar mensaje de finalización basado en el puntaje
                const finalMessageText = finalScore >= 60
                    ? '¡Felicidades! Has completado el juego.'
                    : 'Puntaje ideal no alcanzado.';

                const finalMessage = this.add.text(400, 250, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 60 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 60) {
                    // Mostrar botón de "Volver a Intentarlo"
                    const retryButton = this.add.text(400, 200, 'Volver a Intentarlo', {
                        fontSize: '20px',
                        fill: '#ffffff',
                        backgroundColor: '#ff0000',
                        padding: { x: 20, y: 10 }
                    }).setInteractive().setOrigin(0.5);

                    retryButton.on('pointerdown', () => {
                        setTimeout(() => {
                            if (gameInstance) {
                                gameInstance.destroy(true); // Destruir el juego actual
                                setGameInstance(null);
                            }
                            restartGame(); // Reiniciar el juego desde la escena 1
                        }, 100);
                    });
                } else {
                    setTimeout(() => {
                        if (gameInstance) {
                            gameInstance.destroy(true);
                            setGameInstance(null);
                        }
                    }, 4000); // Esperar un poco antes de destruir el juego para que el mensaje se vea
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



