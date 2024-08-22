// Juego 1 - Angulos - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const AnguloGame = ({ updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [usedQuestions, setUsedQuestions] = useState([]); // Para rastrear las preguntas ya utilizadas
    const [currentScore, setCurrentScore] = useState(0); // Puntuación actual

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
            this.load.image('background', '/img/games/mate/geometria/fondogame1.png');
        }

        function createScene() {
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            const adivinanzas = [
                {
                    pregunta: "Se forma cuando dos líneas se encuentran en un punto. ¿Qué soy?",
                    opciones: [
                        "Un ángulo",
                        "Un círculo",
                        "Una línea recta",
                        "Un triángulo"
                    ],
                    correcta: "Un ángulo"
                },
                {
                    pregunta: "Piensa en las manecillas de un reloj marcando las 3:00. ¿Qué forman?",
                    opciones: [
                        "Un triángulo",
                        "Un ángulo",
                        "Un círculo",
                        "Una línea recta"
                    ],
                    correcta: "Un ángulo"
                },
                {
                    pregunta: "Me utilizas para medir la apertura entre dos líneas que se encuentran en un punto. ¿Qué soy?",
                    opciones: [
                        "Un ángulo",
                        "Una recta",
                        "Un círculo",
                        "Un vértice"
                    ],
                    correcta: "Un ángulo"
                },
                {
                    pregunta: "Cuando las puertas se abren, ¿qué forma se crea en las bisagras?",
                    opciones: [
                        "Un círculo",
                        "Una línea",
                        "Un ángulo",
                        "Una curva"
                    ],
                    correcta: "Un ángulo"
                },
                {
                    pregunta: "Cuando dos líneas se encuentran en un punto, crean...",
                    opciones: [
                        "Una curva",
                        "Un vértice",
                        "Un ángulo",
                        "Un círculo"
                    ],
                    correcta: "Un ángulo"
                },
                {
                    pregunta: "Me usas para entender cómo se abren o se cierran las cosas. ¿Qué soy?",
                    opciones: [
                        "Un ángulo",
                        "Un círculo",
                        "Una línea",
                        "Una puerta"
                    ],
                    correcta: "Un ángulo"
                },
                {
                    pregunta: "Soy el punto donde dos líneas se encuentran para formar un ángulo. ¿Qué soy?",
                    opciones: [
                        "Vértice",
                        "Ángulo",
                        "Curva",
                        "Línea"
                    ],
                    correcta: "Vértice"
                }
            ];

            // Filtrar preguntas no usadas
            const remainingQuestions = adivinanzas.filter(adivinanza => !usedQuestions.includes(adivinanza.pregunta));

            // Si no quedan preguntas sin usar o se alcanza el puntaje máximo, mostramos el mensaje de finalización
            if (remainingQuestions.length === 0 || currentScore >= 75) {
                this.add.text(400, 300, '¡Felicidades! Has completado todas las preguntas.', {
                    fontSize: '24px',
                    fill: '#6aa84f',
                    fontFamily: 'Arial',
                    align: 'center'
                }).setOrigin(0.5);
                return;
            }

            // Escoger una pregunta aleatoria de las que quedan
            const preguntaActual = Phaser.Math.RND.pick(remainingQuestions);
            setUsedQuestions(prev => [...prev, preguntaActual.pregunta]); // Añadir la pregunta a la lista de usadas
            Phaser.Utils.Array.Shuffle(preguntaActual.opciones);

            // Estilo para la pregunta
            this.add.text(400, 150, preguntaActual.pregunta, {
                fontSize: '28px',
                fill: '#000000',  // Color negro
                fontFamily: 'Georgia, serif',
                fontStyle: 'bold',
                wordWrap: { width: 700 },
                align: 'center'
            }).setOrigin(0.5);

            // Estilo para las opciones
            preguntaActual.opciones.forEach((opcion, index) => {
                const button = this.add.text(400, 250 + (index * 70), opcion, {
                    fontSize: '22px',
                    fill: '#000000',  // Negro
                    backgroundColor: '#E0BBE4',  // Morado pastel
                    padding: { x: 20, y: 15 },
                    borderRadius: 10,
                    fontFamily: 'Arial',
                    align: 'center',
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, opcion, preguntaActual.correcta, button));
            });
        }

        function checkAnswer(selectedOption, correctOption, button) {
            let score = 0;
            let feedbackMessage = '';
            let feedbackColor = '';

            if (selectedOption === correctOption) {
                score = 15; 
                feedbackMessage = "¡Correcto! " + correctOption;
                feedbackColor = '#6aa84f';
            } else {
                feedbackMessage = "Incorrecto. " + correctOption;
                feedbackColor = '#ff0000';
            }

            button.setStyle({ fill: feedbackColor });

            setCurrentScore(prevScore => prevScore + score); // Actualizar la puntuación

            updateScore(score);
            updateFeedback(feedbackMessage, feedbackColor);

            this.children.list.forEach((child) => {
                if (child.input && child !== button) {
                    child.disableInteractive();
                }
            });

            if (currentScore + score >= 75) {
                // Si se alcanza el puntaje de 75, mostrar el mensaje de éxito
                this.add.text(400, 300, '¡Felicidades! Has alcanzado 75 puntos.', {
                    fontSize: '24px',
                    fill: '#6aa84f',
                    fontFamily: 'Arial',
                    align: 'center'
                }).setOrigin(0.5);
            } else if (!isFinalScene) {
                const nextButton = this.add.text(400, 550, 'Siguiente', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#006400',  // Verde oscuro
                    padding: { x: 25, y: 12 },
                    borderRadius: 10,
                    fontFamily: 'Arial',
                    align: 'center',
                }).setInteractive().setOrigin(0.5);

                // Efecto hover para cambiar el color del botón
                nextButton.on('pointerover', () => {
                    nextButton.setStyle({ backgroundColor: '#32CD32' });  // Verde claro
                });

                nextButton.on('pointerout', () => {
                    nextButton.setStyle({ backgroundColor: '#006400' });  // Verde oscuro
                });

                nextButton.on('pointerdown', () => {
                    updateFeedback('', '');
                    proceedToNextScene();
                    if (gameInstance) {
                        gameInstance.destroy(true);
                    }
                });
            } else {
                const finalMessageText = currentScore >= 75
                    ? '¡Felicidades! Has completado el juego.'
                    : 'Puntaje ideal no alcanzado.';

                const finalMessage = this.add.text(400, 550, finalMessageText, {
                    fontSize: '20px',
                    fill: '#ffffff',
                    backgroundColor: currentScore >= 75 ? '#6aa84f' : '#ff0000',
                    padding: { x: 25, y: 12 },
                    borderRadius: 10,
                    fontFamily: 'Arial',
                    align: 'center',
                }).setOrigin(0.5);

                if (currentScore < 75) {
                    const retryButton = this.add.text(400, 500, 'Volver a Intentarlo', {
                        fontSize: '20px',
                        fill: '#ffffff',
                        backgroundColor: '#ff0000',
                        padding: { x: 25, y: 12 },
                        borderRadius: 10,
                        fontFamily: 'Arial',
                        align: 'center',
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
    }, [currentScore, usedQuestions, updateFeedback, updateScore, proceedToNextScene, isFinalScene, finalScore, restartGame]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default AnguloGame;


