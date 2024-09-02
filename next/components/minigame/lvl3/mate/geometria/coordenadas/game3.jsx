"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, finalizeGame }) => {
    const gameContainerRef = useRef(null);
    const gameInstanceRef = useRef(null);
    let score = 0;
    let currentRound = 0;
    let currentText = null; // Variable para manejar el texto de coordenada
    let usedCoordinates = new Set(); // Conjunto para evitar clics repetidos en la misma coordenada correcta
    let gameCompleted = false; // Indicador para verificar si el juego ha terminado

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameContainerRef.current,
            scene: {
                preload: preload,
                create: createScene
            }
        };

        if (gameInstanceRef.current) {
            gameInstanceRef.current.destroy(true);
        }

        gameInstanceRef.current = new Phaser.Game(config);

        const rounds = [
            { x: 2, y: 3 },
            { x: -4, y: 2 },
            { x: 1, y: -3 },
            { x: -2, y: -4 },
            { x: 5, y: 5 }
        ];

        const gridSize = 40; // Tamaño del paso entre cada punto
        const originX = 400; // Centro del plano en X
        const originY = 300; // Centro del plano en Y
        const gridLimit = 8; // Limitar el plano a -8 a 8

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Dibujar el plano cartesiano
            drawGrid(this, originX, originY, gridSize, gridLimit);

            // Iniciar la primera ronda
            startRound.call(this);
        }

        function startRound() {
            if (currentRound >= rounds.length) {
                updateFeedback("¡Felicidades! Has completado el juego.", "green");
                finalizeGame?.(score);
                gameCompleted = true; // Indicar que el juego ha terminado
                return;
            }

            const round = rounds[currentRound];

            // Remover el texto de coordenada anterior
            if (currentText) {
                currentText.destroy();
            }

            // Mostrar la nueva coordenada a buscar
            currentText = this.add.text(400, 50, `Encuentra la coordenada: (${round.x}, ${round.y})`, {
                fontSize: '24px',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            // Detectar clic en el plano
            this.input.on('pointerdown', (pointer) => {
                if (gameCompleted) return; // No permitir más clics si el juego ha terminado

                const clickedX = Math.round((pointer.x - originX) / gridSize);
                const clickedY = Math.round((originY - pointer.y) / gridSize);
                const coordinateKey = `${clickedX},${clickedY}`;

                if (clickedX === round.x && clickedY === round.y) {
                    if (!usedCoordinates.has(coordinateKey)) {
                        // Marcar el punto correcto
                        this.add.circle(pointer.x, pointer.y, 10, 0x00ff00);
                        score += 40; // Ahora cada coordenada otorga 40 puntos
                        updateScore(score);
                        updateFeedback("¡Correcto!", "green");
                        usedCoordinates.add(coordinateKey); // Marcar como usado
                        currentRound++;
                        startRound.call(this);
                    } else {
                        updateFeedback("Esta coordenada ya ha sido seleccionada.", "orange");
                    }
                } else {
                    // Marcar el punto incorrecto
                    this.add.circle(pointer.x, pointer.y, 10, 0xff0000);
                    updateFeedback("¡Incorrecto! Inténtalo de nuevo.", "red");
                }
            });
        }

        function drawGrid(scene, originX, originY, gridSize, gridLimit) {
            const graphics = scene.add.graphics();
            
            // Dibujar ejes X e Y con un grosor y color distintivos
            graphics.lineStyle(4, 0xff0000, 1); // Rojo y más grueso para los ejes
            graphics.moveTo(0, originY);
            graphics.lineTo(800, originY); // Eje X
            graphics.moveTo(originX, 0);
            graphics.lineTo(originX, 600); // Eje Y
            graphics.strokePath();

            // Etiquetas para los ejes
            scene.add.text(originX + 5, 10, 'Y', { fontSize: '20px', fill: '#ff0000' });
            scene.add.text(780, originY - 25, 'X', { fontSize: '20px', fill: '#ff0000' });

            // Dibujar líneas de la cuadrícula con un color más claro y uniformes
            graphics.lineStyle(1, 0xaaaaaa, 1); // Gris claro para la cuadrícula
            for (let x = originX - gridLimit * gridSize; x <= originX + gridLimit * gridSize; x += gridSize) {
                graphics.moveTo(x, originY - gridLimit * gridSize);
                graphics.lineTo(x, originY + gridLimit * gridSize);
            }

            for (let y = originY - gridLimit * gridSize; y <= originY + gridLimit * gridSize; y += gridSize) {
                graphics.moveTo(originX - gridLimit * gridSize, y);
                graphics.lineTo(originX + gridLimit * gridSize, y);
            }

            graphics.strokePath();

            // Dibujar marcas de puntos en los ejes
            graphics.lineStyle(2, 0x000000, 1); // Marcas de puntos en negro
            for (let x = originX - gridLimit * gridSize; x <= originX + gridLimit * gridSize; x += gridSize) {
                graphics.moveTo(x, originY - 5);
                graphics.lineTo(x, originY + 5);
            }

            for (let y = originY - gridLimit * gridSize; y <= originY + gridLimit * gridSize; y += gridSize) {
                graphics.moveTo(originX - 5, y);
                graphics.lineTo(originX + 5, y);
            }

            graphics.strokePath();

            // Añadir etiquetas numéricas a las marcas de los ejes
            for (let i = -gridLimit; i <= gridLimit; i++) {
                if (i !== 0) {
                    scene.add.text(originX + i * gridSize - 10, originY + 10, `${i}`, { fontSize: '16px', fill: '#000000' });
                    scene.add.text(originX + 10, originY - i * gridSize - 10, `${i}`, { fontSize: '16px', fill: '#000000' });
                }
            }
        }

        return () => {
            if (gameInstanceRef.current) {
                gameInstanceRef.current.destroy(true);
            }
        };
    }, []);

    return (
        <div ref={gameContainerRef} id="game-container" style={{ width: '800px', height: '600px' }}></div>
    );
};

export default Game3;
