"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore }) => {
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
        let scorePerPair = 20; // Cada par correcto otorga 20 puntos

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
            const fractionPairs = [];

            // Generar pares de fracciones simples y sus equivalentes decimales
            const fractions = [
                { fraction: '1/2', decimal: '0.50' },
                { fraction: '1/3', decimal: '0.33' },
                { fraction: '1/4', decimal: '0.25' },
                { fraction: '2/3', decimal: '0.67' },
                { fraction: '3/4', decimal: '0.75' }
            ];

            fractions.forEach(pair => {
                fractionPairs.push(pair.fraction, pair.decimal);
            });

            pairs = Phaser.Utils.Array.Shuffle(fractionPairs); // Mezclar las tarjetas
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
                card.on('pointerdown', () => selectCard.call(this, card, value));
            });
        }

        function selectCard(card, value) {
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

            const isMatch = (
                (firstCard.value === '1/2' && secondCard.value === '0.50') ||
                (firstCard.value === '1/3' && secondCard.value === '0.33') ||
                (firstCard.value === '1/4' && secondCard.value === '0.25') ||
                (firstCard.value === '2/3' && secondCard.value === '0.67') ||
                (firstCard.value === '3/4' && secondCard.value === '0.75') ||
                (secondCard.value === '1/2' && firstCard.value === '0.50') ||
                (secondCard.value === '1/3' && firstCard.value === '0.33') ||
                (secondCard.value === '1/4' && firstCard.value === '0.25') ||
                (secondCard.value === '2/3' && firstCard.value === '0.67') ||
                (secondCard.value === '3/4' && firstCard.value === '0.75')
            );

            if (isMatch) {
                updateFeedback('¡Correcto! Encontraste un par equivalente.', true);
                setCurrentScore((prevScore) => {
                    const newScore = prevScore + scorePerPair;
                    updateScore(newScore); // Actualizar el puntaje acumulado
                    return newScore;
                });
                firstCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' }); // Verde para correcto
                secondCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' }); // Verde para correcto
            } else {
                updateFeedback('Incorrecto. Estos no son equivalentes.', false);
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
    }, [sceneKey, updateFeedback, updateScore]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
