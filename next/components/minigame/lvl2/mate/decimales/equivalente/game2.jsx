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

        // Crear la instancia del juego solo una vez
        if (!gameInstance) {
            const game = new Phaser.Game(config);
            setGameInstance(game);
        }

        let pairs = [];
        let revealedCards = [];
        let cardObjects = []; // Array para almacenar las cartas
        let numberOfPairs = 5; // Cambiar a 5 pares
        let maxScore = 100;
        let scorePerPair = maxScore / numberOfPairs;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game2.jpg'); // Cargar la imagen de fondo
        }

        function createScene() {
            // Crear la imagen de fondo y asegurarse de que se mantenga
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            // Añadir texto para mostrar la instrucción
            const instructionText = this.add.text(400, 30, 'Empareja las fracciones equivalentes', {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            generatePairs.call(this);
            createCards.call(this);
        }

        function generatePairs() {
            const fractionPairs = [];

            // Generar pares de fracciones equivalentes
            for (let i = 0; i < numberOfPairs; i++) {
                const numerator1 = Phaser.Math.Between(1, 5); // Numerador de la primera fracción
                const denominator1 = Phaser.Math.Between(2, 10); // Denominador de la primera fracción
                const numerator2 = numerator1 * 2;
                const denominator2 = denominator1 * 2;

                fractionPairs.push(`${numerator1}/${denominator1}`, `${numerator2}/${denominator2}`);
            }

            pairs = Phaser.Utils.Array.Shuffle(fractionPairs.flat());
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

            const [num1, den1] = firstCard.value.split('/').map(Number);
            const [num2, den2] = secondCard.value.split('/').map(Number);

            if (num1 * den2 === num2 * den1) { // Verificar si las fracciones son equivalentes
                updateFeedback(`¡Correcto! ${firstCard.value} es equivalente a ${secondCard.value}`, true);
                setCurrentScore((prevScore) => {
                    const newScore = prevScore + scorePerPair;
                    updateScore(newScore); // Actualizar el puntaje acumulado
                    return newScore;
                });
                firstCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' }); // Verde para correcto
                secondCard.card.setStyle({ backgroundColor: '#6aa84f', border: '2px solid #6aa84f' }); // Verde para correcto
            } else {
                updateFeedback(`Incorrecto. ${firstCard.value} no es equivalente a ${secondCard.value}`, false);
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
            // No mostrar ningún mensaje en la pantalla del juego
            updateFeedback('¡Felicidades! Has encontrado todos los pares.', true); // Actualizar el feedback al finalizar
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true); // Asegurarse de destruir el juego cuando el componente se desmonte
            }
        };
    }, [gameInstance, sceneKey, updateFeedback, updateScore, isFinalScene, finalScore]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game2;
