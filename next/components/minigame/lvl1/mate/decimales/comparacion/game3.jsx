// Juego 3 - Comparación de decimales - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, onCompleteScene, isFinalScene }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [currentOrder, setCurrentOrder] = useState([]);

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
        let sceneScore = 0;
        const scorePerCorrect = 40; // Puntos por escena completada

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            generateNumbers.call(this);
        }

        function generateNumbers() {
            decimalNumbers = [];
            for (let i = 0; i < 5; i++) {  // Generar 5 números decimales
                const num = (Phaser.Math.Between(1, 99) / 100).toFixed(2);
                decimalNumbers.push(num);
            }
            decimalNumbers.sort((a, b) => b - a); // Ordenar los números de mayor a menor

            decimalNumbers.forEach((value, index) => {
                const card = this.add.text(160 + (index % 5) * 120, 150, value, {
                    fontSize: '28px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 20, y: 10 }
                }).setInteractive().setOrigin(0.5);

                card.on('pointerdown', () => selectNumber.call(this, value, card));
            });
        }

        function selectNumber(value, card) {
            const correctNextValue = decimalNumbers[currentOrder.length];

            if (parseFloat(value) === parseFloat(correctNextValue)) {
                updateFeedback('¡Correcto!', '#6aa84f'); // Feedback en verde
                sceneScore += scorePerCorrect / decimalNumbers.length; // 40 puntos distribuidos entre los 5 números
                setCurrentOrder([...currentOrder, value]);
                card.setStyle({ fill: '#6aa84f' });

                if (currentOrder.length === decimalNumbers.length) {
                    // Notificar a React que la escena se completó
                    onCompleteScene(sceneScore);
                }
            } else {
                updateFeedback('Incorrecto. Vuelve a intentarlo.', '#ff0000'); // Feedback en rojo
                setTimeout(() => {
                    onCompleteScene(0); // Notificar a React que la escena fue incorrecta
                }, 1000);
            }
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true); // Destruir la instancia del juego al desmontar el componente
            }
        };
    }, [currentOrder, updateFeedback, updateScore, onCompleteScene, isFinalScene]);

    return <div id="game-container" className="w-[800px] h-[400px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game3;
