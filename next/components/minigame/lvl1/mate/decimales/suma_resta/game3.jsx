"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, isFinalScene, finalScore }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [sceneKey, setSceneKey] = useState(0); // Para forzar la recreación del juego en cada escena
    const [currentScore, setCurrentScore] = useState(0); // Almacena el puntaje actual

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

        let pairs = [];
        let revealedCards = [];
        let cardObjects = []; // Array para almacenar las cartas
        let numberOfPairs = 5; // Cambiar a 5 pares
        let maxScore = 100;
        let scorePerPair = maxScore / numberOfPairs;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            // Ajustar el fondo a todo el ancho del juego
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            generatePairs.call(this);
            createCards.call(this);
        }

        function generatePairs() {
            const decimalPairs = [];

            // Generar pares de decimales que sumen 1.00
            for (let i = 0; i < numberOfPairs; i++) {
                const num1 = (Phaser.Math.Between(1, 99) / 100).toFixed(2);
                const num2 = (1.00 - num1).toFixed(2);
                decimalPairs.push(num1, num2);
            }

            pairs = Phaser.Utils.Array.Shuffle(decimalPairs); // Mezclar las tarjetas
        }

        function createCards() {
            pairs.forEach((value, index) => {
                const card = this.add.text(150 + (index % 4) * 150, 100 + Math.floor(index / 4) * 120, value, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 15, y: 10 },
                    border: '2px solid transparent' // Añadir borde transparente por defecto
                }).setInteractive().setOrigin(0.5);

                cardObjects.push(card); // Añadir la carta al array de objetos
                card.on('pointerdown', () => selectCard.call(this, card, value, index));
            });
        }

        function selectCard(card, value, index) {
            if (revealedCards.length < 2 && !card.selected) {
                card.selected = true;
                revealedCards.push({ card, value });

                // Cambiar el estilo para indicar selección
                card.setStyle({
                    backgroundColor: '#7966ab', // Morado para indicar selección
                    border: '2px solid #000000' // Añadir un borde negro cuando se selecciona
                });

                if (revealedCards.length === 2) {
                    checkForMatch.call(this);
                }
            }
        }

        function checkForMatch() {
            const [firstCard, secondCard] = revealedCards;

            if ((parseFloat(firstCard.value) + parseFloat(secondCard.value)).toFixed(2) === '1.00') {
                updateFeedback('¡Correcto! Encontraste un par que suma 1.00.', true);
                setCurrentScore((prevScore) => {
                    const newScore = prevScore + scorePerPair;
                    updateScore(newScore); // Actualizar el puntaje acumulado
                    return newScore;
                });
                firstCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' }); // Verde para correcto
                secondCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' }); // Verde para correcto
            } else {
                updateFeedback('Incorrecto. Estos no suman 1.00.', false);
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
            return cardObjects.every(card => card.selected === true); // Verificar si todas las cartas han sido emparejadas
        }

        function endGame() {
            setTimeout(() => {
                updateFeedback('¡Felicidades! Has encontrado todos los pares.', true); // Mostrar mensaje de felicitaciones
            }, 500);
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [sceneKey, updateFeedback, updateScore, isFinalScene, finalScore]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
