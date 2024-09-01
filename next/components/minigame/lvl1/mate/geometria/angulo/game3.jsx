"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, finalizeGame }) => {
    const gameContainerRef = useRef(null);
    const gameInstanceRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameContainerRef.current,
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

        if (gameInstanceRef.current) {
            gameInstanceRef.current.destroy(true);
        }

        gameInstanceRef.current = new Phaser.Game(config);

        let score = 0;
        let currentLevel = 0;
        let gameFinished = false;

        const levels = [
            {
                instruction: "Haz clic en el ángulo recto",
                angles: ['agudo', 'recto', 'obtuso', 'llano'],
                correctAnswer: 'recto'
            },
            {
                instruction: "Haz clic en el ángulo obtuso",
                angles: ['agudo', 'recto', 'obtuso', 'llano'],
                correctAnswer: 'obtuso'
            },
            {
                instruction: "Haz clic en el ángulo agudo",
                angles: ['agudo', 'recto', 'obtuso', 'llano'],
                correctAnswer: 'agudo'
            },
            {
                instruction: "Haz clic en el ángulo llano",
                angles: ['agudo', 'recto', 'obtuso', 'llano'],
                correctAnswer: 'llano'
            },
        ];

        function preload() {
            console.log("Preloading assets...");
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            console.log("Creating scene...");
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            loadLevel.call(this, currentLevel);
        }

        function loadLevel(levelIndex) {
            if (gameFinished) return;

            const level = levels[levelIndex];
            if (!level) {
                finalizeGameIfNeeded();
                return;
            }

            this.children.removeAll();
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(800, 600);

            const instructionText = this.add.text(400, 50, level.instruction, {
                fontSize: '26px',
                fill: '#000000',
                fontWeight: 'bold',
                stroke: '#ffffff',
                strokeThickness: 4,
                wordWrap: { width: 700, useAdvancedWrap: true }
            }).setOrigin(0.5);

            const positions = shufflePositions();

            level.angles.forEach((type, index) => {
                const [x, y] = positions[index];
                const graphics = drawAngle.call(this, type, x, y);

                let hitArea;
                switch (type) {
                    case 'agudo':
                        hitArea = new Phaser.Geom.Rectangle(x - 100, y - 100, 100, 100);
                        break;
                    case 'recto':
                        hitArea = new Phaser.Geom.Rectangle(x - 50, y - 50, 100, 100);
                        break;
                    case 'obtuso':
                        hitArea = new Phaser.Geom.Rectangle(x - 100, y, 200, 100);
                        break;
                    case 'llano':
                        hitArea = new Phaser.Geom.Rectangle(x - 50, y - 10, 100, 20);
                        break;
                }

                graphics.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
                graphics.on('pointerdown', () => handleAngleSelection.call(this, type, level.correctAnswer));
            });
        }

        function shufflePositions() {
            const positions = [
                [250, 250],
                [550, 250],
                [250, 450],
                [550, 450]
            ];
            return Phaser.Utils.Array.Shuffle(positions);
        }

        function drawAngle(type, x, y) {
            const size = 100;
            const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0x000000 } });
            
            // Asignar color de relleno
            let fillColor;
            switch (type) {
                case 'agudo':
                    fillColor = 0xff9999; // Relleno rojo claro
                    break;
                case 'recto':
                    fillColor = 0x99ccff; // Relleno azul claro
                    break;
                case 'obtuso':
                    fillColor = 0x99ff99; // Relleno verde claro
                    break;
                case 'llano':
                    fillColor = 0xffff99; // Relleno amarillo claro
                    break;
            }

            graphics.fillStyle(fillColor, 1.0); // Aplicar color de relleno

            switch (type) {
                case 'agudo':
                    graphics.fillTriangle(x - size, y, x, y, x, y - size);
                    graphics.strokeTriangle(x - size, y, x, y, x, y - size);
                    break;
                case 'recto':
                    graphics.fillRect(x - size / 2, y - size / 2, size, size);
                    graphics.strokeRect(x - size / 2, y - size / 2, size, size);
                    break;
                case 'obtuso':
                    graphics.beginPath();
                    graphics.moveTo(x, y);
                    graphics.lineTo(x - size, y + size);
                    graphics.lineTo(x + size, y + size);
                    graphics.closePath();
                    graphics.fillPath();
                    graphics.strokePath();
                    break;
                case 'llano':
                    graphics.fillRect(x - size / 2, y - 10, size, 20);
                    graphics.strokeRect(x - size / 2, y - 10, size, 20);
                    break;
            }
            return graphics;
        }

        function handleAngleSelection(selectedType, correctAnswer) {
            if (gameFinished) return;

            if (selectedType === correctAnswer) {
                updateFeedback("¡Correcto!", "green");
                score += 50;
                updateScore(score);
                currentLevel++;
                if (currentLevel >= levels.length) {
                    finalizeGameIfNeeded();
                } else {
                    this.time.delayedCall(1000, () => loadLevel.call(this, currentLevel), [], this);
                }
            } else {
                updateFeedback("¡Incorrecto! Intenta de nuevo.", "red");
            }
        }

        function finalizeGameIfNeeded() {
            if (!gameFinished) {
                gameFinished = true;
                if (typeof finalizeGame === 'function') {
                    finalizeGame(score);
                } else {
                    console.error("finalizeGame no está definido o no es una función");
                }
                updateFeedback("¡Felicidades! Has completado el juego.", "green");
            }
        }

        function update() {
            // Actualizaciones del juego si es necesario
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
