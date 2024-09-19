"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const GameFromJSON = ({ gameData, updateFeedback, updateScore, onCompleteGame }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 400,
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

        let decimalPairs = [];
        let revealedCards = [];
        let totalScore = 0;
        const { paresDecimales, puntosPorPar } = gameData.escenas[0];
        const maxScore = paresDecimales.length * puntosPorPar; // Puntuación total basada en los pares

        function preload() {
            this.load.image('background', '/img/games/mate/decimales/game3.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            generatePairs.call(this, paresDecimales);
        }

        function generatePairs(paresDecimales) {
            const pairs = [];

            paresDecimales.forEach(par => {
                pairs.push(par.valor, par.valor); // Crear un par por cada valor
            });

            decimalPairs = Phaser.Utils.Array.Shuffle(pairs); // Mezclar las tarjetas

            decimalPairs.forEach((value, index) => {
                const card = this.add.text(120 + (index % 5) * 140, 80 + Math.floor(index / 5) * 80, value, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                card.on('pointerdown', () => selectCard.call(this, value, card));
                decimalPairs[index] = { value, card }; // Guardar referencia a la carta para verificar más tarde
            });
        }

        function selectCard(value, card) {
            if (revealedCards.length < 2) {
                revealedCards.push({ value, card });

                card.setStyle({ fill: '#7966ab' });

                if (revealedCards.length === 2) {
                    checkForMatch.call(this);
                }
            }
        }

        function checkForMatch() {
            const [first, second] = revealedCards;

            if (first.value === second.value) {
                updateFeedback('¡Correcto! Has seleccionado un par correcto.', '#6aa84f'); // Feedback en verde
                totalScore += puntosPorPar;
                updateScore(totalScore); // Actualizar la puntuación total
                first.card.setStyle({ fill: '#6aa84f' });
                second.card.setStyle({ fill: '#6aa84f' });
            } else {
                updateFeedback('Incorrecto. Inténtalo de nuevo.', '#ff0000'); // Feedback en rojo
                setTimeout(() => {
                    first.card.setStyle({ fill: '#000000' });
                    second.card.setStyle({ fill: '#000000' });
                }, 1000);
            }

            revealedCards = [];

            if (totalScore === maxScore) {
                endGame.call(this);
            }
        }

        function endGame() {
            updateFeedback(`¡Felicidades! Has completado el juego y obtenido ${totalScore} puntos.`, '#6aa84f');
            onCompleteGame(); // Llamar a la función para finalizar el juego
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [gameData, updateFeedback, updateScore, onCompleteGame]);

    return <div id="game-container" className="relative shadow-lg mx-auto mt-8 rounded-lg w-[800px] h-[400px] overflow-hidden"></div>;
};

export default GameFromJSON;
