"use client";
import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

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

        const triangles = [
            { a: 3, b: 4, c: 5, color: 0xff0000 },  // Rojo
            { a: 5, b: 12, c: 13, color: 0x00ff00 }, // Verde
            { a: 8, b: 15, c: 17, color: 0x0000ff }, // Azul
            { a: 7, b: 24, c: 25, color: 0xffff00 }  // Amarillo
        ];

        const startY = 250; // Mover los triángulos más abajo
        const widthScale = 10; // Escala uniforme para la base (cateto 'a')
        const heightScales = [10, 10, 7, 7]; // Diferentes escalas para la altura

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Instrucciones en la parte superior con tamaño de fuente reducido
            this.add.text(400, 30, "Arrastra la respuesta correcta al triángulo correspondiente.", {
                fontSize: '18px',  // Tamaño reducido
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4,
                fontWeight: 'bold'
            }).setOrigin(0.5);

            const answerBoxes = [];

            triangles.forEach((triangle, index) => {
                // Dibujar el triángulo con borde negro más grueso y relleno de color
                const startX = 100 + index * 150;
                const adjustedA = triangle.a * widthScale;
                const adjustedB = triangle.b * heightScales[index];

                const graphics = this.add.graphics();
                graphics.lineStyle(4, 0x000000); // Borde negro más grueso
                graphics.fillStyle(triangle.color, 1); // Relleno de color
                graphics.beginPath();
                graphics.moveTo(startX, startY);
                graphics.lineTo(startX + adjustedA, startY);
                graphics.lineTo(startX, startY - adjustedB);
                graphics.closePath();
                graphics.fillPath();
                graphics.strokePath();

                // Mostrar las especificaciones de los catetos en blanco con bordes negros
                this.add.text(startX - 10, startY + 10, `a: ${triangle.a}`, {
                    fontSize: '16px',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 3,
                    fontWeight: 'bold'
                });
                this.add.text(startX - 50, startY - adjustedB / 2, `b: ${triangle.b}`, {
                    fontSize: '16px',
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 3,
                    fontWeight: 'bold'
                });

                // Espacio para la respuesta con borde negro, todos con el mismo tamaño
                const answerBox = this.add.rectangle(startX + adjustedA / 2, startY + 50, 80, 40, 0xffffff)
                    .setOrigin(0.5)
                    .setStrokeStyle(4, 0x000000); // Borde negro más grueso
                answerBox.name = `box${index}`;
                answerBoxes.push(answerBox);
            });

            // Crear las respuestas arrastrables del mismo tamaño que los cuadros de respuesta
            const answers = [5, 13, 17, 25];
            Phaser.Utils.Array.Shuffle(answers).forEach((answer, index) => {
                const answerText = this.add.text(100 + index * 150, 500, `${answer}`, {
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

                        if (Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB) && triangles[i].c === answer) {
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
                        answerText.setPosition(100 + index * 150, 500);
                        updateFeedback("¡Incorrecto! Inténtalo de nuevo.", "red");
                    }
                });
            });
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
