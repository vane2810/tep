// Juego 3 - Comparación de decimales - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, onCompleteGame }) => {
    const [gameInstance, setGameInstance] = useState(null);
    const [currentRound, setCurrentRound] = useState(1); // Llevar la cuenta de las rondas

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

        let totalScore = 0;
        const scorePerRound = 20; // Puntos por ronda correcta
        const maxRounds = 10; // Número máximo de rondas
        const maxScore = scorePerRound * maxRounds; // Puntuación total al completar todas las rondas

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            const background = this.add.image(400, 200, 'background');
            background.setDisplaySize(config.width, config.height);

            startRound.call(this);
        }

        function startRound() {
            const num1 = (Phaser.Math.Between(1, 99) / 100).toFixed(2);
            const num2 = (Phaser.Math.Between(1, 99) / 100).toFixed(2);
            
            this.add.text(400, 50, '¿Cuál número es mayor?', {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Crear botones para las dos opciones
            const option1 = this.add.text(250, 200, num1, {
                fontSize: '28px',
                fill: '#000000',
                backgroundColor: '#ffffff',
                padding: { x: 20, y: 10 }
            }).setInteractive().setOrigin(0.5);

            const option2 = this.add.text(550, 200, num2, {
                fontSize: '28px',
                fill: '#000000',
                backgroundColor: '#ffffff',
                padding: { x: 20, y: 10 }
            }).setInteractive().setOrigin(0.5);

            option1.on('pointerdown', () => evaluateAnswer.call(this, num1, num2, option1, option2));
            option2.on('pointerdown', () => evaluateAnswer.call(this, num2, num1, option2, option1));
        }

        function evaluateAnswer(selectedNum, otherNum, selectedOption, otherOption) {
            if (parseFloat(selectedNum) > parseFloat(otherNum)) {
                updateFeedback('¡Correcto! ' + selectedNum + ' es mayor.', '#6aa84f'); // Feedback en verde
                totalScore += scorePerRound;
                updateScore(totalScore); // Actualizar la puntuación total
                selectedOption.setStyle({ fill: '#6aa84f' });
            } else {
                updateFeedback('Incorrecto. ' + otherNum + ' es mayor.', '#ff0000'); // Feedback en rojo
                selectedOption.setStyle({ fill: '#ff0000' });
            }

            setTimeout(() => {
                setCurrentRound((prevRound) => {
                    if (prevRound < maxRounds) {
                        clearScene.call(this);
                        startRound.call(this);
                        return prevRound + 1;
                    } else {
                        endGame.call(this);
                        return prevRound;
                    }
                });
            }, 1000);
        }

        function clearScene() {
            this.children.list.forEach(child => child.destroy()); // Limpiar la escena actual
        }

        function endGame() {
            updateFeedback('¡Felicidades! Has completado el juego y obtenido ' + totalScore + ' puntos.', '#6aa84f');
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

