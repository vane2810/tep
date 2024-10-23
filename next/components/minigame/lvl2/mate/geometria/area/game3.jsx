"use client";
import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

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
        let connectedFigures = new Set();

        const levels = [
            {
                figures: [
                    { type: 'square', side: 4, correctArea: 16, color: 0x00ff00, label: 'Lado: 4cm' },  // Área = 4 * 4 = 16
                    { type: 'rectangle', sides: [5, 3], correctArea: 15, color: 0x0000ff, label: 'Lados: 5cm y 3cm' },  // Área = 5 * 3 = 15
                    { type: 'triangle', base: 6, height: 4, correctArea: 12, color: 0xff0000, label: 'Base: 6cm, Altura: 4cm' },  // Área = (6 * 4) / 2 = 12
                    { type: 'circle', radius: 3, correctArea: 28.27, color: 0xffff00, label: 'Radio: 3cm' }  // Área = π * 3^2 = 28.27
                ],
                areas: [16, 15, 12, 28.27]  // Asegurar que cada figura tenga un área única
            }
        ];

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Agregar texto en la parte superior explicando la tarea
            this.add.text(400, 20, "Une cada figura con su área correspondiente.", {
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
            const areaStartX = 600;
            const startY = 80;  // Mover las figuras más arriba
            const spacingY = 120;  // Ajustar la separación para acomodar cuatro figuras
            const labelOffsetX = 90;  // Separar más las etiquetas de las figuras

            level.figures.forEach((figure, index) => {
                const y = startY + index * spacingY;
                const graphics = this.add.graphics();

                if (figure.type === 'square' || figure.type === 'rectangle') {
                    graphics.fillStyle(figure.color, 1.0);
                    const width = figure.sides ? figure.sides[0] * 20 : figure.side * 20;
                    const height = figure.sides ? figure.sides[1] * 20 : figure.side * 20;
                    graphics.fillRect(figureStartX, y, width, height);

                    const figureObject = graphics.setInteractive(
                        new Phaser.Geom.Rectangle(figureStartX, y, width, height),
                        Phaser.Geom.Rectangle.Contains
                    );
                    figureObject.figureData = figure;
                    figureObject.startX = figureStartX + width / 2;
                    figureObject.startY = y + height / 2;

                    figureObject.on('pointerdown', (pointer) => startDrawingLine.call(this, figureObject, pointer));
                } else if (figure.type === 'triangle') {
                    const triangleCenterX = figureStartX + (figure.base * 20) / 2;
                    const triangleTopY = y - 20;  // Mover el triángulo más hacia arriba
                    graphics.fillStyle(figure.color, 1.0);
                    graphics.beginPath();
                    graphics.moveTo(triangleCenterX, triangleTopY);  // Vértice superior
                    graphics.lineTo(figureStartX, triangleTopY + figure.height * 20);  // Vértice inferior izquierdo
                    graphics.lineTo(figureStartX + figure.base * 20, triangleTopY + figure.height * 20);  // Vértice inferior derecho
                    graphics.closePath();
                    graphics.fillPath();

                    const figureObject = graphics.setInteractive(
                        new Phaser.Geom.Triangle(triangleCenterX, triangleTopY, figureStartX, triangleTopY + figure.height * 20, figureStartX + figure.base * 20, triangleTopY + figure.height * 20),
                        Phaser.Geom.Triangle.Contains
                    );
                    figureObject.figureData = figure;
                    figureObject.startX = triangleCenterX;
                    figureObject.startY = triangleTopY + figure.height * 20 / 2;

                    figureObject.on('pointerdown', (pointer) => startDrawingLine.call(this, figureObject, pointer));
                } else if (figure.type === 'circle') {
                    graphics.fillStyle(figure.color, 1.0);
                    graphics.fillCircle(figureStartX + 30, y + 30, figure.radius * 20 / 2);  // Ajuste visual

                    const figureObject = graphics.setInteractive(
                        new Phaser.Geom.Circle(figureStartX + 30, y + 30, figure.radius * 20 / 2),
                        Phaser.Geom.Circle.Contains
                    );
                    figureObject.figureData = figure;
                    figureObject.startX = figureStartX + 30;
                    figureObject.startY = y + 30;

                    figureObject.on('pointerdown', (pointer) => startDrawingLine.call(this, figureObject, pointer));
                }

                // Mostrar la etiqueta con las características de la figura con mayor separación
                this.add.text(figureStartX + labelOffsetX, y + 20, figure.label, {
                    fontSize: '20px',
                    fill: '#000000',  // Texto negro
                    stroke: '#ffffff',  // Borde blanco
                    strokeThickness: 4,
                    fontWeight: 'bold'
                });
            });

            // Barajar las respuestas para que aparezcan en orden aleatorio
            shuffleArray(level.areas);

            level.areas.forEach((area, index) => {
                const y = startY + index * spacingY;
                const areaText = this.add.text(areaStartX, y, `${area.toFixed(2)} cm²`, {
                    fontSize: '22px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                }).setOrigin(0.5);

                areaText.setInteractive();
                areaText.areaValue = area;

                areaText.on('pointerdown', () => completeDrawingLine.call(this, areaText));
            });
        }

        function startDrawingLine(figureObject, pointer) {
            if (activeLine || connectedFigures.has(figureObject.figureData)) {
                return;  // Evitar dibujar una nueva línea si ya hay una activa o si la figura ya está conectada
            }
            selectedFigure = figureObject;
            activeLine = this.add.line(
                0, 0,
                figureObject.startX, figureObject.startY,
                pointer.x, pointer.y,
                figureObject.figureData.color
            ).setOrigin(0, 0).setLineWidth(6); // Línea más gruesa
        }

        function completeDrawingLine(areaText) {
            if (!activeLine || !selectedFigure) return;

            activeLine.setTo(
                selectedFigure.startX, selectedFigure.startY,
                areaText.x, areaText.y
            );

            // Comprobar si la conexión es correcta
            if (selectedFigure.figureData.correctArea === areaText.areaValue) {
                updateFeedback("¡Correcto! Has conectado la figura con su área adecuada.", "green");
                score += 50;
                updateScore(score);  // Actualizar la puntuación en la vista
                correctConnections++;
                activeLine.setStrokeStyle(6, selectedFigure.figureData.color);  // Mantener la línea en el color de la figura
                connectedFigures.add(selectedFigure.figureData);  // Marcar la figura como conectada
                activeLine = null;  // Detener la línea activa
                areaText.setBackgroundColor('#00ff00');  // Cambiar el fondo del texto a verde

                if (correctConnections === levels[0].figures.length) {
                    finalizeGame?.(score);
                    updateFeedback("¡Felicidades! Has completado el nivel.", "green");
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

export default Game3