// Juego 3 - Comparacion - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, onCompleteGame }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [gameFinished, setGameFinished] = useState(false);
    
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1000, // Aumentado el ancho para acomodar más opciones
            height: 600, // Aumentado el alto para acomodar más filas
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
        const totalNumbers = 15; // Ahora hay 15 opciones en total
        let selectedNumbers = [];
        let selectableTexts = [];

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            const background = this.add.image(500, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            generateNumbers.call(this);
            createSelectableNumbers.call(this);

            // Crear botón para comprobar selección
            const checkButton = this.add.text(500, 550, 'Comprobar', {
                fontSize: '28px',
                fill: '#ffffff',
                backgroundColor: '#0000ff',
                padding: { x: 15, y: 10 },
                border: '2px solid #000000',
                cursor: 'pointer'
            }).setInteractive().setOrigin(0.5);

            checkButton.on('pointerdown', () => checkOrder());
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
            const shuffledNumbers = Phaser.Utils.Array.Shuffle(decimalNumbers.slice()); 

            shuffledNumbers.forEach((value, index) => {
                const xPosition = 100 + (index % 5) * 180; // Ajuste de las posiciones en el eje X
                const yPosition = 100 + Math.floor(index / 5) * 140; // Ajuste de las posiciones en el eje Y
                const text = this.add.text(xPosition, yPosition, value, {
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
            if (!selectedNumbers.includes(value)) {
                selectedNumbers.push(value);
                textObject.setFill('#d3d3d3'); // Marcar como seleccionado
                textObject.setInteractive(false); // Deshabilitar la interacción para evitar seleccionar el mismo número de nuevo
            }
        }

        function checkOrder() {
            if (selectedNumbers.length === decimalNumbers.length) {
                const correctOrder = [...decimalNumbers].sort((a, b) => b - a);
                
                if (JSON.stringify(selectedNumbers) === JSON.stringify(correctOrder)) {
                    updateFeedback('¡Correcto! Has ordenado los números correctamente.', '#6aa84f');
                    updateScore(200);
                    setGameFinished(true); // Marcar el juego como finalizado
                } else {
                    updateFeedback('El orden no es correcto. Intenta nuevamente.', '#ff0000');
                    resetSelection();
                }
            } else {
                updateFeedback('Selecciona todos los números antes de comprobar.', '#ff0000');
            }
        }

        function resetSelection() {
            selectedNumbers = [];
            selectableTexts.forEach(text => {
                text.setFill('#000000'); // Restaurar el color original
                text.setInteractive(true); // Habilitar la interacción nuevamente
            });
        }

        function update() {}

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore]);

    return (
        <div id="game-container" className="w-[1000px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8">
            {gameFinished && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <p className="text-3xl font-bold text-white">Juego Finalizado</p>
                </div>
            )}
        </div>
    );
};

export default Game3;

