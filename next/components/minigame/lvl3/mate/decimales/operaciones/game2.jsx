"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [currentScore, setCurrentScore] = useState(0);
    const [correctPairs, setCorrectPairs] = useState(0);

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
        const numberOfPairs = 5;
        const scorePerPair = 10; // Puntos por par correcto
        const targetFraction = { numerator: 1, denominator: 2 };

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game2.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            this.add.text(400, 30, `Busca pares que sumen a ${targetFraction.numerator}/${targetFraction.denominator}`, {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            generatePairs.call(this);
            createCards.call(this);
        }

        function generatePairs() {
            const fractionPairs = [];

            for (let i = 0; i < numberOfPairs; i++) {
                const num1 = Phaser.Math.Between(1, 3);
                const den1 = Phaser.Math.Between(2, 5);
                const fraction1 = { numerator: num1, denominator: den1 };

                const num2 = targetFraction.numerator * den1 - num1 * targetFraction.denominator;
                const den2 = targetFraction.denominator * den1;
                const fraction2 = { numerator: num2, denominator: den2 };

                fractionPairs.push(fraction1, fraction2);
            }

            pairs = Phaser.Utils.Array.Shuffle(fractionPairs);
        }

        function createCards() {
            pairs.forEach((fraction, index) => {
                const card = this.add.text(150 + (index % 4) * 150, 100 + Math.floor(index / 4) * 120, `${fraction.numerator}/${fraction.denominator}`, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 15, y: 10 },
                    border: '2px solid transparent'
                }).setInteractive().setOrigin(0.5);

                cardObjects.push({ card, fraction });
                card.on('pointerdown', () => selectCard.call(this, card, fraction));
            });
        }

        function selectCard(card, fraction) {
            if (revealedCards.length < 2 && !card.selected) {
                card.selected = true;
                revealedCards.push({ card, fraction });

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

            const sumNumerator = firstCard.fraction.numerator * secondCard.fraction.denominator + secondCard.fraction.numerator * firstCard.fraction.denominator;
            const sumDenominator = firstCard.fraction.denominator * secondCard.fraction.denominator;

            const correctSum = targetFraction.numerator * sumDenominator === sumNumerator * targetFraction.denominator;

            if (correctSum) {
                // Incrementar la cantidad de pares correctos y sumar los puntos solo una vez
                setCorrectPairs(prevPairs => {
                    const newPairs = prevPairs + 1;
                    const newScore = currentScore + scorePerPair;
                    if (newPairs <= numberOfPairs) {
                        setCurrentScore(newScore);
                        updateScore(newScore);
                    }
                    return newPairs;
                });

                updateFeedback(`¡Correcto! ${firstCard.fraction.numerator}/${firstCard.fraction.denominator} + ${secondCard.fraction.numerator}/${secondCard.fraction.denominator} = ${targetFraction.numerator}/${targetFraction.denominator}`, true);

                firstCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' });
                secondCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' });
            } else {
                updateFeedback(`Incorrecto. ${firstCard.fraction.numerator}/${firstCard.fraction.denominator} + ${secondCard.fraction.numerator}/${secondCard.fraction.denominator} no es igual a ${targetFraction.numerator}/${targetFraction.denominator}.`, false);
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
            return cardObjects.every(card => card.card.selected === true);
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
    }, [gameInstance, correctPairs, updateFeedback, updateScore, currentScore]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
