// Juego 3 - Introducción a decimales - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, onCompleteGame }) => {
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
        const scorePerPair = 20; // Puntos por par correcto
        const maxScore = 200; // Puntuación total al completar todos los pares (10 parejas = 200 puntos)

        function preload() {
            this.load.image('background', '/img/games/mate/decimales/game3.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            generatePairs.call(this);
        }

        function generatePairs() {
            const pairs = [];
            for (let i = 0; i < 10; i++) {  // Generar exactamente 10 pares de números decimales (20 cantidades en total)
                const num = (Phaser.Math.Between(1, 99) / 100).toFixed(2);
                pairs.push(num, num); // Crear un par por cada número generado
            }
            decimalPairs = Phaser.Utils.Array.Shuffle(pairs); // Mezclar las tarjetas para mayor dificultad

            decimalPairs.forEach((value, index) => {
                const card = this.add.text(120 + (index % 5) * 140, 80 + Math.floor(index / 5) * 80, value, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 }
                }).setInteractive().setOrigin(0.5);

                card.on('pointerdown', () => selectCard.call(this, value, card));
                decimalPairs[index] = { value, card }; // Guardar referencia a la carta para verificar su estilo más tarde
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
                totalScore += scorePerPair;
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
            updateFeedback('¡Felicidades! Has completado el juego y obtenido 200 puntos.', '#6aa84f');
            onCompleteGame(); // Llamar a la función para finalizar el juego
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, onCompleteGame]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game3;
