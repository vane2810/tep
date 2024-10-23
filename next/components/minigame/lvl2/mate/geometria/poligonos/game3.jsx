"use client";
import React, { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

const PolygonsGame = ({ updateFeedback, updateScore, finalizeGame }) => {
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
        let selectedPolygon = null;
        const connectedPolygons = new Set();  // Para rastrear figuras conectadas
        const usedResponses = new Set();  // Para rastrear respuestas usadas

        const levels = [
            {
                polygons: [
                    { type: 'triangle', sides: 3, regular: true, color: 0x00ff00 },  // Triángulo equilátero
                    { type: 'square', sides: 4, regular: true, color: 0x0000ff },    // Cuadrado
                    { type: 'pentagon', sides: 5, regular: false, color: 0xff0000 }, // Pentágono irregular
                    { type: 'hexagon', sides: 6, regular: false, color: 0xffff00 }   // Hexágono irregular
                ],
                names: ['Polígono regular', 'Polígono irregular', 'Polígono regular', 'Polígono irregular']
            }
        ];

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Agregar texto en la parte superior explicando la tarea
            this.add.text(400, 20, "Une cada polígono con su tipo correcto.", {
                fontSize: '24px',
                fill: '#000000',
                stroke: '#ffffff',
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

            // Barajar los polígonos antes de dibujarlos
            shuffleArray(level.polygons);

            const polygonStartX = 120;
            const nameStartX = 600;
            const startY = 80;
            const spacingY = 120;

            level.polygons.forEach((polygon, index) => {
                const y = startY + index * spacingY;
                const graphics = this.add.graphics();

                if (polygon.sides === 3) {
                    // Dibujar triángulo equilátero
                    graphics.fillStyle(polygon.color, 1.0);
                    graphics.beginPath();
                    graphics.moveTo(polygonStartX + 30, y);
                    graphics.lineTo(polygonStartX, y + 60);
                    graphics.lineTo(polygonStartX + 60, y + 60);
                    graphics.closePath();
                    graphics.fillPath();
                } else if (polygon.sides === 4) {
                    // Dibujar cuadrado
                    graphics.fillStyle(polygon.color, 1.0);
                    graphics.fillRect(polygonStartX, y, 60, 60);
                } else if (polygon.sides === 5 && !polygon.regular) {
                    // Dibujar pentágono irregular
                    graphics.fillStyle(polygon.color, 1.0);
                    graphics.beginPath();
                    graphics.moveTo(polygonStartX + 20, y);
                    graphics.lineTo(polygonStartX + 10, y + 30);
                    graphics.lineTo(polygonStartX + 30, y + 50);
                    graphics.lineTo(polygonStartX + 50, y + 30);
                    graphics.lineTo(polygonStartX + 40, y + 10);
                    graphics.closePath();
                    graphics.fillPath();
                } else if (polygon.sides === 6 && !polygon.regular) {
                    // Dibujar hexágono irregular
                    graphics.fillStyle(polygon.color, 1.0);
                    graphics.beginPath();
                    graphics.moveTo(polygonStartX + 20, y);
                    graphics.lineTo(polygonStartX, y + 40);
                    graphics.lineTo(polygonStartX + 30, y + 60);
                    graphics.lineTo(polygonStartX + 60, y + 40);
                    graphics.lineTo(polygonStartX + 50, y + 10);
                    graphics.lineTo(polygonStartX + 30, y);
                    graphics.closePath();
                    graphics.fillPath();
                }

                const polygonObject = graphics.setInteractive(
                    new Phaser.Geom.Rectangle(polygonStartX, y, 60, 60),
                    Phaser.Geom.Rectangle.Contains
                );
                polygonObject.polygonData = polygon;
                polygonObject.startX = polygonStartX + 30;
                polygonObject.startY = y + 30;

                polygonObject.on('pointerdown', (pointer) => startDrawingLine.call(this, polygonObject, pointer));
            });

            // Barajar los nombres para que aparezcan en orden aleatorio
            shuffleArray(level.names);

            level.names.forEach((name, index) => {
                const y = startY + index * spacingY;
                const nameText = this.add.text(nameStartX, y, name, {
                    fontSize: '22px',
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

        function startDrawingLine(polygonObject, pointer) {
            // Verificar si la figura ya ha sido conectada
            if (connectedPolygons.has(polygonObject)) {
                updateFeedback("Esta figura ya está conectada.", "red");
                return;
            }

            if (activeLine) {
                activeLine.destroy();
            }
            selectedPolygon = polygonObject;
            activeLine = this.add.line(
                0, 0,
                polygonObject.startX, polygonObject.startY,
                pointer.x, pointer.y,
                polygonObject.polygonData.color
            ).setOrigin(0, 0).setLineWidth(6);
        }

        function completeDrawingLine(nameText) {
            if (!activeLine || !selectedPolygon) return;

            // Verificar si la figura o la respuesta ya están conectadas
            if (connectedPolygons.has(selectedPolygon) || usedResponses.has(nameText)) {
                updateFeedback("¡Ya están conectados!", "red");
                activeLine.destroy();
                activeLine = null;
                return;
            }

            activeLine.setTo(
                selectedPolygon.startX, selectedPolygon.startY,
                nameText.x, nameText.y
            );

            // Comprobar si la conexión es correcta
            const isCorrect = (selectedPolygon.polygonData.regular && nameText.nameValue === 'Polígono regular') ||
                              (!selectedPolygon.polygonData.regular && nameText.nameValue === 'Polígono irregular');

            if (isCorrect) {
                updateFeedback("¡Correcto! Has conectado el polígono con su tipo adecuado.", "green");
                score += 50;
                updateScore(score);
                correctConnections++;
                activeLine.setStrokeStyle(6, selectedPolygon.polygonData.color);
                connectedPolygons.add(selectedPolygon);  // Marcar la figura como conectada
                usedResponses.add(nameText);  // Marcar la respuesta como usada
                activeLine = null;
                nameText.setBackgroundColor('#00ff00');

                if (correctConnections === levels[0].polygons.length) {
                    updateFeedback("¡Felicidades! Has completado el nivel.", "green");
                    finalizeGame?.(score);
                }
            } else {
                updateFeedback("¡Incorrecto! Intenta de nuevo.", "red");
                activeLine.destroy();
                activeLine = null;
            }
        }

        function update() {
            if (activeLine && selectedPolygon) {
                const pointer = this.input.activePointer;
                activeLine.setTo(
                    selectedPolygon.startX, selectedPolygon.startY,
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

export default PolygonsGame;
