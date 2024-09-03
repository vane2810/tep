"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PuzzleTransformations = ({ updateFeedback, updateScore, finalizeGame }) => {
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
        let currentPuzzle = 0;
        let puzzles = [];
        let currentFigure = 0;
        let isVerified = false; // Para evitar sumar puntos más de una vez

        function preload() {
            console.log("Preloading assets...");
        }

        function createScene() {
            console.log("Creating scene...");
            this.cameras.main.setBackgroundColor('#f0f0f0');

            puzzles = [
                {
                    original: { x: 300, y: 200, rotation: 0 },
                    transformations: [{ type: 'translate', dx: 200, dy: 0 }],
                    instructions: "Mueve la figura hacia la derecha"
                },
                {
                    original: { x: 300, y: 200, rotation: 0 },
                    transformations: [{ type: 'rotate', angle: 45 }],
                    instructions: "Gira la figura para que encaje con el cuadro objetivo"
                },
                {
                    original: { x: 300, y: 200, rotation: 0 },
                    transformations: [{ type: 'reflect', axis: 'x' }],
                    instructions: "Encuentra la figura reflejada correcta"
                }
            ];

            generatePuzzle.call(this, puzzles[currentPuzzle]);
        }

        function generatePuzzle(puzzle) {
            this.children.removeAll();
            isVerified = false; // Restablecer estado para cada nuevo nivel

            const instructionsText = this.add.text(400, 50, puzzle.instructions, {
                fontSize: '24px',
                fill: '#000000',
                fontWeight: 'bold',
                wordWrap: { width: 700, useAdvancedWrap: true }
            }).setOrigin(0.5);

            if (puzzle.transformations[0].type === 'rotate') {
                let rotationAngle = 0;

                const rotateLeftButton = this.add.text(200, 550, '← Girar a la Izquierda', {
                    fontSize: '20px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 },
                    borderRadius: 5
                }).setInteractive();

                const rotateRightButton = this.add.text(500, 550, 'Girar a la Derecha →', {
                    fontSize: '20px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 },
                    borderRadius: 5
                }).setInteractive();

                const draggablePiece = this.add.rectangle(puzzle.original.x + 50, puzzle.original.y + 50, 100, 100, 0xff0000);
                draggablePiece.setInteractive();

                const targetX = puzzle.original.x + (puzzle.transformations[0].dx || 0) + 50;
                const targetY = puzzle.original.y + (puzzle.transformations[0].dy || 0) + 50;
                const targetRotation = Phaser.Math.DegToRad(puzzle.transformations[0].angle || 0);

                const targetPiece = this.add.graphics();
                targetPiece.lineStyle(2, 0x000000, 1);
                targetPiece.strokeRect(-50, -50, 100, 100);
                targetPiece.x = targetX;
                targetPiece.y = targetY;

                if (targetRotation) {
                    targetPiece.rotation = targetRotation;
                }

                rotateLeftButton.on('pointerdown', () => {
                    rotationAngle -= 15;
                    draggablePiece.rotation = Phaser.Math.DegToRad(rotationAngle);
                });

                rotateRightButton.on('pointerdown', () => {
                    rotationAngle += 15;
                    draggablePiece.rotation = Phaser.Math.DegToRad(rotationAngle);
                });

                this.input.on('pointerup', () => {
                    checkSolution.call(this, draggablePiece, puzzle, targetPiece, "¡La figura encaja correctamente!");
                });
            } else if (puzzle.transformations[0].type === 'reflect') {
                let changeablePiece;

                const figures = [
                    { type: 'square', color: 0xff0000 },
                    { type: 'triangle', color: 0x00ff00 },
                    { type: 'circle', color: 0x0000ff }
                ];

                const correctFigureIndex = 2;

                // Añadir figura objetivo (correcta) para que el jugador pueda verla
                const targetFigure = this.add.circle(300, 300, 50, figures[correctFigureIndex].color);

                const updateFigure = () => {
                    if (changeablePiece) changeablePiece.destroy();
                    const figure = figures[currentFigure];
                    if (figure.type === 'square') {
                        changeablePiece = this.add.rectangle(600, 300, 100, 100, figure.color);
                    } else if (figure.type === 'triangle') {
                        changeablePiece = this.add.polygon(600, 300, [0, -50, 50, 50, -50, 50], figure.color);
                    } else if (figure.type === 'circle') {
                        changeablePiece = this.add.circle(600, 300, 50, figure.color);
                    }
                    changeablePiece.setInteractive();
                };

                updateFigure();

                const changeFigureButton = this.add.text(200, 550, 'Cambiar Figura', {
                    fontSize: '20px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 },
                    borderRadius: 5
                }).setInteractive();

                const verifyButton = this.add.text(500, 550, 'Verificar', {
                    fontSize: '20px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 },
                    borderRadius: 5
                }).setInteractive();

                changeFigureButton.on('pointerdown', () => {
                    // Cambiar figura sin afectar la verificación o el estado del juego
                    currentFigure = (currentFigure + 1) % figures.length;
                    updateFigure();
                });

                verifyButton.on('pointerdown', () => {
                    // Solo verificar la figura seleccionada y sumar puntos si es correcta
                    if (currentFigure === correctFigureIndex && !isVerified) {
                        updateFeedback("¡Correcto! Has completado el puzzle.", "green");
                        score += 50;
                        updateScore(score);
                        isVerified = true; // Marcar como verificado para evitar suma múltiple de puntos
                        if (currentPuzzle < puzzles.length - 1) {
                            currentPuzzle++;
                            generatePuzzle.call(this, puzzles[currentPuzzle]);
                        } else {
                            setTimeout(() => {
                                if (typeof finalizeGame === 'function') {
                                    finalizeGame(score);
                                } else {
                                    console.error('finalizeGame is not defined or is not a function');
                                }
                            }, 1000);
                        }
                    } else if (!isVerified) {
                        updateFeedback("¡Incorrecto! Inténtalo de nuevo.", "red");
                    }
                });
            } else {
                const draggablePiece = this.add.rectangle(puzzle.original.x + 50, puzzle.original.y + 50, 100, 100, 0xff0000);
                draggablePiece.setInteractive();
                this.input.setDraggable(draggablePiece);

                const targetX = puzzle.original.x + (puzzle.transformations[0].dx || 0) + 50;
                const targetY = puzzle.original.y + (puzzle.transformations[0].dy || 0) + 50;

                const targetPiece = this.add.graphics();
                targetPiece.lineStyle(2, 0x000000, 1);
                targetPiece.strokeRect(-50, -50, 100, 100);
                targetPiece.x = targetX;
                targetPiece.y = targetY;

                this.input.on('dragstart', (pointer, gameObject) => {
                    gameObject.setData('startX', gameObject.x);
                    gameObject.setData('startY', gameObject.y);
                });

                this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                    if (!isVerified) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    }
                });

                this.input.on('dragend', (pointer, gameObject) => {
                    checkSolution.call(this, gameObject, puzzle, targetPiece, "¡Correcto!");
                });
            }
        }

        function checkSolution(piece, puzzle, targetPiece, correctMessage) {
            const tolerance = 20; // Aumentamos la tolerancia a 20 píxeles
            const positionMatch = Phaser.Math.Distance.Between(piece.x, piece.y, targetPiece.x, targetPiece.y) < tolerance;

            if (positionMatch) {
                // Auto-ajuste de la posición si está dentro de la tolerancia
                piece.x = targetPiece.x;
                piece.y = targetPiece.y;
            }

            if (puzzle.transformations[0].type === 'rotate') {
                const rotationMatch = Phaser.Math.Within(Phaser.Math.RadToDeg(piece.rotation), Phaser.Math.RadToDeg(targetPiece.rotation), tolerance);
                if (rotationMatch) {
                    if (!isVerified) {
                        updateFeedback(correctMessage, "green");
                        score += 50;
                        updateScore(score);
                        isVerified = true; // Evitar sumar puntos múltiples veces
                        if (currentPuzzle < puzzles.length - 1) {
                            currentPuzzle++;
                            generatePuzzle.call(this, puzzles[currentPuzzle]);
                        } else {
                            setTimeout(() => {
                                if (typeof finalizeGame === 'function') {
                                    finalizeGame(score);
                                } else {
                                    console.error('finalizeGame is not defined or is not a function');
                                }
                            }, 1000);
                        }
                    }
                } else {
                    updateFeedback("¡Incorrecto! Inténtalo de nuevo.", "red");
                }
            } else {
                if (positionMatch) {
                    if (!isVerified) {
                        updateFeedback(correctMessage, "green");
                        score += 50;
                        updateScore(score);
                        isVerified = true; // Evitar sumar puntos múltiples veces
                        if (currentPuzzle < puzzles.length - 1) {
                            currentPuzzle++;
                            generatePuzzle.call(this, puzzles[currentPuzzle]);
                        } else {
                            setTimeout(() => {
                                if (typeof finalizeGame === 'function') {
                                    finalizeGame(score);
                                } else {
                                    console.error('finalizeGame is not defined or is not a function');
                                }
                            }, 1000);
                        }
                    }
                } else {
                    updateFeedback("¡Incorrecto! Inténtalo de nuevo.", "red");
                    piece.x = piece.getData('startX');
                    piece.y = piece.getData('startY');
                }
            }
        }

        function update() {
            // Actualizaciones si es necesario
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

export default PuzzleTransformations;
