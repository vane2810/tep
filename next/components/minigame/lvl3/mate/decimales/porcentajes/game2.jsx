"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, onComplete }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [currentScore, setCurrentScore] = useState(0);

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

        if (!gameInstance) {
            const game = new Phaser.Game(config);
            setGameInstance(game);
        }

        let pairs = [];
        let revealedCards = [];
        let cardObjects = [];
        let numberOfPairs = 5; // 5 pares de tarjetas
        let maxScore = 100;
        let scorePerPair = maxScore / numberOfPairs;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game2.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            const targetText = this.add.text(400, 30, `Empareja los porcentajes y sus decimales equivalentes`, {
                fontSize: '20px',  // Tamaño de fuente reducido
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            generatePairs.call(this);
            createCards.call(this);
        }

        function generatePairs() {
            const values = [
                { percentage: '25%', decimal: '0.25' },
                { percentage: '50%', decimal: '0.50' },
                { percentage: '75%', decimal: '0.75' },
                { percentage: '20%', decimal: '0.20' },
                { percentage: '40%', decimal: '0.40' }
            ];

            // Generar pares de tarjetas
            pairs = Phaser.Utils.Array.Shuffle(values.flatMap(value => [
                value.percentage,
                value.decimal
            ]));
        }

        function createCards() {
            pairs.forEach((value, index) => {
                const card = this.add.text(150 + (index % 4) * 150, 100 + Math.floor(index / 4) * 120, value, {
                    fontSize: '24px',  // Tamaño de fuente reducido para mejor ajuste
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 8 },  // Padding ajustado
                    border: '2px solid transparent'
                }).setInteractive().setOrigin(0.5);

                cardObjects.push(card);
                card.on('pointerdown', () => selectCard.call(this, card, value));
            });
        }

        function selectCard(card, value) {
            if (revealedCards.length < 2 && !card.selected) {
                card.selected = true;
                revealedCards.push({ card, value });

                card.setStyle({
                    backgroundColor: '#7966ab',
                    border: '2px solid #000000'
                });

                if (revealedCards.length === 2) {
                    checkForMatch.call(this);
                }
            }
        }

        function checkForMatch() {
            const [firstCard, secondCard] = revealedCards;

            if (areEquivalent(firstCard.value, secondCard.value)) {
                updateFeedback(`¡Correcto! ${firstCard.value} es equivalente a ${secondCard.value}`, true);
                setCurrentScore((prevScore) => {
                    const newScore = prevScore + scorePerPair;
                    updateScore(newScore);
                    return newScore;
                });
                firstCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' });
                secondCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' });
            } else {
                updateFeedback(`Incorrecto. ${firstCard.value} no es equivalente a ${secondCard.value}.`, false);
                setTimeout(() => {
                    firstCard.card.setStyle({ backgroundColor: '#ffffff', border: '2px solid transparent' });
                    secondCard.card.setStyle({ backgroundColor: '#ffffff', border: '2px solid transparent' });
                    firstCard.card.selected = false;
                    secondCard.card.selected = false;
                }, 1000);
            }

            revealedCards = [];

            if (checkForCompletion()) {
                endGame.call(this);
            }
        }

        function areEquivalent(value1, value2) {
            const equivalents = {
                '25%': '0.25',
                '50%': '0.50',
                '75%': '0.75',
                '20%': '0.20',
                '40%': '0.40'
            };

            return equivalents[value1] === value2 || equivalents[value2] === value1;
        }

        function checkForCompletion() {
            return cardObjects.every(card => card.selected === true);
        }

        function endGame() {
            updateFeedback('¡Felicidades! Has encontrado todas las equivalencias.', true);
            onComplete(); // Llama a la función para pasar a la siguiente fase
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [gameInstance, updateFeedback, updateScore, onComplete]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
