"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, finalizeGame }) => {
    const gameContainerRef = useRef(null);
    const gameInstanceRef = useRef(null);
    let score = 0;

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

        const pyramids = [
            { type: 'square', base: 4, height: 9, volume: 48, color: 0xffc0cb },  // Pirámide cuadrada
            { type: 'triangular', base: 6, height: 7, volume: 84, color: 0xadd8e6 },  // Pirámide triangular
            { type: 'rectangular', base: 5, height: 10, volume: 83.33, color: 0x98fb98 },  // Pirámide rectangular
            { type: 'square', base: 8, height: 6, volume: 128, color: 0xffff00 }  // Pirámide cuadrada
        ];

        const startY = 180; // Elevar las pirámides más arriba
        const startXOffset = 80; // Ajuste de la posición horizontal para centrar sobre los cuadros de respuesta
        const widthScale = 15; // Escala uniforme para la base
        const heightScales = [10, 10, 7, 7]; // Diferentes escalas para la altura

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Instrucciones en la parte superior con tamaño de fuente reducido
            this.add.text(400, 30, "Arrastra el volumen correcto al lugar correspondiente.", {
                fontSize: '18px',  // Tamaño reducido
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4,
                fontWeight: 'bold'
            }).setOrigin(0.5);

            const answerBoxes = [];

            pyramids.forEach((pyramid, index) => {
                const startX = startXOffset + index * 180; // Ajuste horizontal para centrar las figuras
                const adjustedBase = pyramid.base * widthScale;
                const adjustedHeight = pyramid.height * heightScales[index];

                const graphics = this.add.graphics();

                // Dibujar pirámides tridimensionales según el tipo
                switch (pyramid.type) {
                    case 'square':
                        drawPyramid(graphics, startX, startY, adjustedBase, adjustedHeight, pyramid.color);
                        break;
                    case 'triangular':
                        drawTriangularPyramid(graphics, startX, startY, adjustedBase, adjustedHeight, pyramid.color);
                        break;
                    case 'rectangular':
                        drawRectangularPyramid(graphics, startX, startY, adjustedBase, adjustedHeight, pyramid.color);
                        break;
                }

                // Mostrar las dimensiones en blanco con bordes negros y más separadas de las figuras
                this.add.text(startX - 10, startY + 40, `Base: ${pyramid.base}`, {
                    fontSize: '16px',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 3,
                    fontWeight: 'bold'
                });
                this.add.text(startX - 50, startY - adjustedHeight / 2 - 30, `Altura: ${pyramid.height}`, {
                    fontSize: '16px',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 3,
                    fontWeight: 'bold'
                });

                // Espacio para la respuesta con borde negro
                const answerBox = this.add.rectangle(startX, startY + 100, 80, 40, 0xffffff)
                    .setOrigin(0.5)
                    .setStrokeStyle(4, 0x000000); // Borde negro
                answerBox.name = `box${index}`;
                answerBoxes.push(answerBox);
            });

            // Crear las respuestas arrastrables del mismo tamaño que los cuadros de respuesta
            const answers = [48, 84, 83.33, 128];
            Phaser.Utils.Array.Shuffle(answers).forEach((answer, index) => {
                const answerText = this.add.text(100 + index * 180, 500, `${answer}`, {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#007bff',
                    padding: { x: 20, y: 10 } // Ajuste para que coincida con el tamaño del cuadro de respuesta
                }).setOrigin(0.5).setInteractive({ draggable: true }); // Centrar el texto y habilitar arrastre

                this.input.setDraggable(answerText);

                answerText.on('drag', (pointer, dragX, dragY) => {
                    answerText.x = dragX;
                    answerText.y = dragY;
                });

                answerText.on('dragend', (pointer) => {
                    let droppedCorrectly = false;

                    answerBoxes.forEach((box, i) => {
                        const boundsA = answerText.getBounds();
                        const boundsB = box.getBounds();

                        if (Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB) && pyramids[i].volume === answer) {
                            answerText.x = box.x;
                            answerText.y = box.y;
                            answerText.disableInteractive(); // Deshabilitar la interacción
                            answerText.setFill('#00ff00'); // Cambiar el color si es correcto
                            score += 50;
                            updateScore(score);
                            updateFeedback("¡Correcto!", "green");
                            droppedCorrectly = true;

                            if (score >= 200) {
                                updateFeedback("¡Felicidades! Has completado el juego.", "green");
                                finalizeGame?.(score);
                            }
                        }
                    });

                    if (!droppedCorrectly) {
                        // Volver a la posición original si es incorrecto
                        answerText.setPosition(100 + index * 180, 500);
                        updateFeedback("¡Incorrecto! Inténtalo de nuevo.", "red");
                    }
                });
            });
        }

        // Funciones de dibujo de pirámides
        function drawPyramid(graphics, x, y, width, height, color) {
            graphics.fillStyle(color, 1.0);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x - width / 2, y + height / 2); // Base izquierda
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.closePath();
            graphics.fillPath();

            // Añadir sombra para dar efecto tridimensional
            graphics.fillStyle(0x000000, 0.2);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.lineTo(x + width / 2 - 20, y + height / 2 + 20); // Sombra derecha
            graphics.closePath();
            graphics.fillPath();
        }

        function drawTriangularPyramid(graphics, x, y, width, height, color) {
            graphics.fillStyle(color, 1.0);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x - width / 2, y + height / 2); // Base izquierda
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.closePath();
            graphics.fillPath();

            // Añadir sombra para dar efecto tridimensional
            graphics.fillStyle(0x000000, 0.2);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.lineTo(x + width / 2 - 20, y + height / 2 + 20); // Sombra derecha
            graphics.closePath();
            graphics.fillPath();
        }

        function drawRectangularPyramid(graphics, x, y, width, height, color) {
            graphics.fillStyle(color, 1.0);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x - width / 2, y + height / 2); // Base izquierda
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.closePath();
            graphics.fillPath();

            // Añadir sombra para dar efecto tridimensional
            graphics.fillStyle(0x000000, 0.2);
            graphics.beginPath();
            graphics.moveTo(x, y - height / 2); // Pico
            graphics.lineTo(x + width / 2, y + height / 2); // Base derecha
            graphics.lineTo(x + width / 2 - 20, y + height / 2 + 20); // Sombra derecha
            graphics.closePath();
            graphics.fillPath();
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
