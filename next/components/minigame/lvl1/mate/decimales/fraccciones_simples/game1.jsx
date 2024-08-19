// Juego 1 - Fracciones Simples - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game1 = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 450, // Altura ligeramente aumentada
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
            // Ajustar el fondo a todo el ancho y alto del juego
            const background = this.add.image(400, 225, 'background'); // Centrar el fondo
            background.setDisplaySize(config.width, config.height); // Ajustar al nuevo tamaño

            generateQuestion.call(this);
        }

       function generateQuestion() {
    const denominator = Phaser.Math.Between(2, 5); // Denominador entre 2 y 5
    const numerator = Phaser.Math.Between(1, denominator - 1); // Numerador menor que el denominador

    correctAnswer = `${numerator}/${denominator}`;

    // Dibujar el círculo y dividirlo en partes
    const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff } });

    const radius = 60;
    const centerX = 400;
    const centerY = 150;

    // Dibujar el círculo completo
    graphics.strokeCircle(centerX, centerY, radius);

    // Dibujar las divisiones del círculo
    for (let i = 0; i < denominator; i++) {
        const startAngle = (i / denominator) * Phaser.Math.PI2;
        const endAngle = ((i + 1) / denominator) * Phaser.Math.PI2;

        const color = i < numerator ? 0x6aa84f : 0xffffff; // Colorear las secciones correspondientes al numerador

        graphics.fillStyle(color, 1);
        graphics.slice(centerX, centerY, radius, startAngle, endAngle, false);
        graphics.fillPath();
        graphics.strokePath();
    }

    // Mostrar la pregunta
    this.add.text(400, 250, `Selecciona la fracción que representa la parte coloreada:`, {
        fontSize: '20px',
        fill: '#ffffff',
        align: 'center',
        backgroundColor: '#7966ab',
        padding: { x: 20, y: 10 },
        fontWeight: 'bold'
    }).setOrigin(0.5);

    // Generar una respuesta incorrecta que no sea igual a la correcta
    let wrongNumerator;
    do {
        wrongNumerator = Phaser.Math.Between(1, denominator - 1);
    } while (wrongNumerator === numerator);

    const wrongAnswer = `${wrongNumerator}/${denominator}`;
    const options = Phaser.Utils.Array.Shuffle([correctAnswer, wrongAnswer]);

    options.forEach((option, index) => {
        const button = this.add.text(300 + (index * 200), 300, option, {
            fontSize: '30px',
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
                feedbackMessage = `¡Correcto! La fracción es ${correctAnswer}.`;
                feedbackColor = '#6aa84f'; // Verde para correcto
                score = 15; // 15 puntos por respuesta correcta
                button.setStyle({ fill: feedbackColor });
            } else {
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
                const nextButton = this.add.text(400, 350, 'Siguiente', {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: '#7966ab',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    // Limpiar feedback anterior
                    updateFeedback('', '');
                    proceedToNextScene();
                    if (gameInstance) {
                        gameInstance.destroy(true); // Destruir el juego para avanzar a la siguiente escena
                    }
                });
            } else {
                // En la última escena, mostrar mensaje de finalización basado en el puntaje
                const finalMessageText = finalScore >= 60
                    ? '¡Felicidades! Has completado el juego.'
                    : 'Puntaje ideal no alcanzado.';

                const finalMessage = this.add.text(400, 350, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: finalScore >= 60 ? '#6aa84f' : '#ff0000',
                    padding: { x: 20, y: 10 }
                }).setOrigin(0.5);

                if (finalScore < 60) {
                    // Mostrar botón de "Volver a Intentarlo"
                    const retryButton = this.add.text(400, 400, 'Volver a Intentarlo', {
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

    return <div id="game-container" className="w-[800px] h-[450px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game1;
