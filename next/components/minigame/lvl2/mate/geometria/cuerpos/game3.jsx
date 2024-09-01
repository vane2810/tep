"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const GameCuerposGeometricos = ({ updateFeedback, updateScore, finalizeGame }) => {
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
        let correctConnections = 0;
        let activeLine = null;
        let selectedFigure = null;

        const levels = [
            {
                figures: [
                    { type: 'cube', color: 0xff0000, label: 'Cubo' },
                    { type: 'prism', color: 0x00ff00, label: 'Prisma Rectangular' },
                    { type: 'cylinder', color: 0x0000ff, label: 'Cilindro' },
                    { type: 'cone', color: 0xffff00, label: 'Cono' }
                ],
                names: ['Cubo', 'Prisma Rectangular', 'Cilindro', 'Cono']
            }
        ];

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Agregar texto en la parte superior explicando la tarea
            this.add.text(400, 20, "Une cada cuerpo geométrico con su nombre.", {
                fontSize: '24px',
                fill: '#000000',  // Texto negro
                stroke: '#ffffff',  // Borde blanco
                strokeThickness: 4,
                fontWeight: 'bold'
            }).setOrigin(0.5);

            loadLevel.call(this, 0);
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function loadLevel(levelIndex) {
            const level = levels[levelIndex];

            const figureStartX = 120;  // Mover las figuras más a la izquierda
            const nameStartX = 600;
            const startY = 100;  // Mover las figuras más arriba
            const spacingY = 120;  // Ajustar la separación para acomodar las figuras

            level.figures.forEach((figure, index) => {
                let y = startY + index * spacingY;
                const graphics = this.add.graphics();

                let centerX, centerY;

                // Dibujar la figura correspondiente
                switch (figure.type) {
                    case 'cube':
                        drawCube(graphics, figureStartX, y, 80);
                        centerX = figureStartX + 40; // Centro del cubo
                        centerY = y + 40;
                        break;
                    case 'prism':
                        drawPrism(graphics, figureStartX, y, 80, 50);
                        centerX = figureStartX + 40; // Centro del prisma (ajustado para centrarse en la altura)
                        centerY = y + 25; 
                        break;
                    case 'cylinder':
                        drawCylinder(graphics, figureStartX, y, 40, 100);
                        centerX = figureStartX + 40; // Centro del cilindro
                        centerY = y + 50;
                        break;
                    case 'cone':
                        drawCone(graphics, figureStartX, y, 40, 100);
                        centerX = figureStartX + 40; // Centro del cono
                        centerY = y + 50;
                        break;
                }

                const figureObject = graphics.setInteractive(
                    new Phaser.Geom.Rectangle(figureStartX, y, 100, 100),
                    Phaser.Geom.Rectangle.Contains
                );
                figureObject.figureData = figure;
                figureObject.startX = centerX;
                figureObject.startY = centerY;

                figureObject.on('pointerdown', (pointer) => {
                    if (!figureObject.isConnected) {
                        startDrawingLine.call(this, figureObject, pointer);
                    }
                });
            });

            // Barajar los nombres para que aparezcan en orden aleatorio
            shuffleArray(level.names);

            level.names.forEach((name, index) => {
                const y = startY + index * spacingY;
                const nameText = this.add.text(nameStartX, y, name, {
                    fontSize: '24px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                }).setOrigin(0.5);

                nameText.setInteractive();
                nameText.nameValue = name;

                nameText.on('pointerdown', () => completeDrawingLine.call(this, nameText));
            });
        }

        function drawCube(graphics, x, y, size) {
            const offset = size / 3;
            graphics.fillStyle(0xff0000, 1.0); // Rojo
            graphics.fillRect(x, y, size, size); // Frente
            graphics.fillStyle(0xaa0000, 1.0); // Sombra lateral
            graphics.beginPath();
            graphics.moveTo(x, y);
            graphics.lineTo(x + offset, y - offset);
            graphics.lineTo(x + size + offset, y - offset);
            graphics.lineTo(x + size, y);
            graphics.closePath();
            graphics.fillPath();
            graphics.fillStyle(0xcc0000, 1.0); // Sombra superior
            graphics.beginPath();
            graphics.moveTo(x + size, y);
            graphics.lineTo(x + size + offset, y - offset);
            graphics.lineTo(x + size + offset, y - offset + size);
            graphics.lineTo(x + size, y + size);
            graphics.closePath();
            graphics.fillPath();
        }

        function drawPrism(graphics, x, y, width, height) {
            const offset = width / 3;
            graphics.fillStyle(0x00ff00, 1.0); // Verde
            graphics.fillRect(x, y, width, height); // Frente
            graphics.fillStyle(0x007700, 1.0); // Sombra lateral
            graphics.beginPath();
            graphics.moveTo(x, y);
            graphics.lineTo(x + offset, y - offset);
            graphics.lineTo(x + width + offset, y - offset);
            graphics.lineTo(x + width, y);
            graphics.closePath();
            graphics.fillPath();
            graphics.fillStyle(0x00aa00, 1.0); // Sombra superior
            graphics.beginPath();
            graphics.moveTo(x + width, y);
            graphics.lineTo(x + width + offset, y - offset);
            graphics.lineTo(x + width + offset, y - offset + height);
            graphics.lineTo(x + width, y + height);
            graphics.closePath();
            graphics.fillPath();
        }

        function drawCylinder(graphics, x, y, radius, height) {
            const ellipseHeight = radius / 2;
            graphics.fillStyle(0x0000ff, 1.0); // Azul

            // Dibuja la parte superior del cilindro
            graphics.fillEllipse(x + radius, y, radius * 2, ellipseHeight);
            graphics.strokeEllipse(x + radius, y, radius * 2, ellipseHeight);

            // Dibuja las líneas laterales del cilindro
            graphics.fillRect(x, y, radius * 2, height);
            graphics.strokeRect(x, y, radius * 2, height);

            // Dibuja la parte inferior del cilindro
            graphics.fillEllipse(x + radius, y + height, radius * 2, ellipseHeight);
            graphics.strokeEllipse(x + radius, y + height, radius * 2, ellipseHeight);
        }

        function drawCone(graphics, x, y, radius, height) {
            const ellipseHeight = radius / 2;
            graphics.fillStyle(0xffff00, 1.0); // Amarillo

            // Dibuja la base del cono (elipse)
            graphics.fillEllipse(x + radius, y + height, radius * 2, ellipseHeight);
            graphics.strokeEllipse(x + radius, y + height, radius * 2, ellipseHeight);

            // Dibuja las líneas laterales del cono (conectando la base al vértice)
            graphics.beginPath();
            graphics.moveTo(x, y + height); // borde izquierdo de la base
            graphics.lineTo(x + radius, y); // vértice superior
            graphics.lineTo(x + 2 * radius, y + height); // borde derecho de la base
            graphics.closePath();
            graphics.fillPath();
            graphics.strokePath();
        }

        function startDrawingLine(figureObject, pointer) {
            if (activeLine) {
                activeLine.destroy();
            }
            selectedFigure = figureObject;
            activeLine = this.add.line(
                0, 0,
                figureObject.startX, figureObject.startY,
                pointer.x, pointer.y,
                figureObject.figureData.color
            ).setOrigin(0, 0).setLineWidth(6); // Línea más gruesa con el color de la figura
        }

        function completeDrawingLine(nameText) {
            if (!activeLine || !selectedFigure) return;

            activeLine.setTo(
                selectedFigure.startX, selectedFigure.startY,
                nameText.x, nameText.y
            );

            // Comprobar si la conexión es correcta
            if (selectedFigure.figureData.label === nameText.nameValue) {
                updateFeedback("¡Correcto! Has conectado el cuerpo geométrico con su nombre adecuado.", "green");
                score += 50;
                updateScore(score);  // Actualizar la puntuación en la vista
                correctConnections++;
                activeLine.setStrokeStyle(6, selectedFigure.figureData.color);  // Mantener la línea en el color de la figura
                selectedFigure.isConnected = true;  // Marcar la figura como conectada para deshabilitarla
                activeLine = null;  // Detener la línea activa
                nameText.setBackgroundColor('#00ff00');  // Cambiar el fondo del texto a verde

                if (correctConnections === levels[0].figures.length) {
                    updateFeedback("¡Felicidades! Has completado el nivel.", "green");  // Mensaje de felicitaciones en verde
                    finalizeGame?.(score);
                }
            } else {
                updateFeedback("¡Incorrecto! Intenta de nuevo.", "red");
                activeLine.destroy();
                activeLine = null;
            }
        }

        function update() {
            if (activeLine && selectedFigure) {
                const pointer = this.input.activePointer;
                activeLine.setTo(
                    selectedFigure.startX, selectedFigure.startY,
                    pointer.x, pointer.y
                );
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

export default GameCuerposGeometricos;
