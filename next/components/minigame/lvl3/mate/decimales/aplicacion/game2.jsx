"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ targetAmount, updateFeedback, updateScore }) => {
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
        let numberOfPairs = 5; // 5 pares de productos
        let maxScore = 100;
        let scorePerPair = maxScore / numberOfPairs;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game2.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            const targetText = this.add.text(400, 30, `Selecciona productos que sumen $${targetAmount}`, {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            generatePairs.call(this);
            createCards.call(this);
        }

        function generatePairs() {
            const productPairs = [];

            for (let i = 0; i < numberOfPairs; i++) {
                const num1 = (Phaser.Math.Between(1, 100) / 100).toFixed(2); // Precio entre $0.01 y $1.00
                const num2 = (targetAmount - num1).toFixed(2);
                productPairs.push(num1, num2);
            }

            pairs = Phaser.Utils.Array.Shuffle(productPairs);
        }

        function createCards() {
            pairs.forEach((value, index) => {
                const card = this.add.text(150 + (index % 4) * 150, 100 + Math.floor(index / 4) * 120, `$${value}`, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 15, y: 10 },
                    border: '2px solid transparent'
                }).setInteractive().setOrigin(0.5);

                cardObjects.push(card);
                card.on('pointerdown', () => selectCard.call(this, card, value, index));
            });
        }

        function selectCard(card, value, index) {
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
            const sum = (parseFloat(firstCard.value) + parseFloat(secondCard.value)).toFixed(2);

            if (sum === targetAmount.toFixed(2)) {
                updateFeedback(`¡Correcto! $${firstCard.value} + $${secondCard.value} = $${targetAmount}`, true);
                setCurrentScore((prevScore) => {
                    const newScore = prevScore + scorePerPair;
                    updateScore(newScore);
                    return newScore;
                });
                firstCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' });
                secondCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' });
            } else {
                updateFeedback(`Incorrecto. $${firstCard.value} + $${secondCard.value} no es igual a $${targetAmount}.`, false);
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

        function checkForCompletion() {
            return cardObjects.every(card => card.selected === true);
        }

        function endGame() {
            updateFeedback('¡Felicidades! Has encontrado todos los pares.', true);
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [gameInstance, targetAmount, updateFeedback, updateScore]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
