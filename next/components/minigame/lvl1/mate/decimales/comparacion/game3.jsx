// Juego 3 - COmparacion - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

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

        let decimalNumbers = [];
        const totalNumbers = 8;
        let selectedNumbers = [];
        let selectableTexts = [];

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            generateNumbers.call(this);
            createSelectableNumbers.call(this);
        }

        function generateNumbers() {
            decimalNumbers = [];
            for (let i = 0; i < totalNumbers; i++) {
                const num = (Phaser.Math.Between(1, 99) / 100).toFixed(2);
                decimalNumbers.push(num);
            }
        }

        function createSelectableNumbers() {
            selectableTexts = [];
            const shuffledNumbers = Phaser.Utils.Array.Shuffle(decimalNumbers.slice()); // Desordenar números

            shuffledNumbers.forEach((value, index) => {
                const text = this.add.text(100 + (index % 4) * 150, 100 + Math.floor(index / 4) * 120, value, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 15, y: 10 },
                    border: '2px solid #000000'
                }).setInteractive().setOrigin(0.5);

                text.on('pointerdown', () => selectNumber(value, text));

                selectableTexts.push(text);
            });
        }

        function selectNumber(value, textObject) {
            const lastSelectedNumber = selectedNumbers[selectedNumbers.length - 1];

            if (selectedNumbers.length === 0 || value <= lastSelectedNumber) {
                selectedNumbers.push(value);
                textObject.setFill('#d3d3d3'); // Marcar como seleccionado
                checkOrder();
            } else {
                updateFeedback('Debe seleccionar los números de mayor a menor.', '#ff0000');
            }
        }

        function checkOrder() {
            if (selectedNumbers.length === decimalNumbers.length) {
                const correctOrder = [...decimalNumbers].sort((a, b) => b - a);
                
                if (JSON.stringify(selectedNumbers) === JSON.stringify(correctOrder)) {
                    updateFeedback('¡Correcto! Has ordenado los números correctamente.', '#6aa84f');
                    updateScore(200);
                    onCompleteGame();
                } else {
                    updateFeedback('El orden no es correcto. Intenta nuevamente.', '#ff0000');
                }
            }
        }

        function update() {}

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore, onCompleteGame]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game3;
