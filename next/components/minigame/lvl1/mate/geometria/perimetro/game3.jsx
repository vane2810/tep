"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PerimeterConnectionGame = ({ updateFeedback, updateScore, finalizeGame }) => {
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

        const levels = [
            {
                figures: [
                    { type: 'square', side: 2.5, correctPerimeter: 10, color: 0x00ff00, label: '2.5cm cada lado' },  // Perímetro = 4 * 2.5 = 10
                    { type: 'rectangle', sides: [3, 5], correctPerimeter: 16, color: 0x0000ff, label: '2x(3cm+5cm)' },  // Perímetro = 2 * (3 + 5) = 16
                    { type: 'triangle', sides: [3, 4, 5], correctPerimeter: 12, color: 0xff0000, label: '3cm + 4cm + 5cm' },  // Perímetro = 3 + 4 + 5 = 12
                    { type: 'pentagon', side: 4, correctPerimeter: 20, color: 0xffff00, label: '4cm cada lado' }  // Pentágono regular, Perímetro = 5 * 4 = 20
                ],
                perimeters: [10, 12, 16, 20]  // Asegurar que cada figura tenga un perímetro único
            }
        ];

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Agregar texto en la parte superior explicando la tarea
            this.add.text(400, 20, "Une cada figura con su perímetro correspondiente.", {
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
            const perimeterStartX = 600;
            const startY = 80;  // Mover las figuras más arriba
            const spacingY = 120;  // Ajustar la separación para acomodar cuatro figuras
            const labelOffsetX = 90;  // Separar más las etiquetas de las figuras

            level.figures.forEach((figure, index) => {
                const y = startY + index * spacingY;
                const graphics = this.add.graphics();

                if (figure.type === 'square') {
                    graphics.fillStyle(figure.color, 1.0);
                    graphics.fillRect(figureStartX, y, figure.side * 30, figure.side * 30);
                } else if (figure.type === 'rectangle') {
                    graphics.fillStyle(figure.color, 1.0);
                    graphics.fillRect(figureStartX, y, figure.sides[0] * 20, figure.sides[1] * 20);  // Tamaño reducido visualmente
                } else if (figure.type === 'triangle') {
                    graphics.fillStyle(figure.color, 1.0);
                    graphics.beginPath();
                    graphics.moveTo(figureStartX + 30, y);
                    graphics.lineTo(figureStartX, y + 60);
                    graphics.lineTo(figureStartX + 60, y + 60);
                    graphics.closePath();
                    graphics.fillPath();
                } else if (figure.type === 'pentagon') {
                    graphics.fillStyle(figure.color, 1.0);
                    graphics.beginPath();
                    graphics.moveTo(figureStartX + 30, y);
                    graphics.lineTo(figureStartX + 10, y + 30);
                    graphics.lineTo(figureStartX + 20, y + 60);
                    graphics.lineTo(figureStartX + 40, y + 60);
                    graphics.lineTo(figureStartX + 50, y + 30);
                    graphics.closePath();
                    graphics.fillPath();
                }

                // Mostrar la etiqueta con las características de la figura con mayor separación
                this.add.text(figureStartX + labelOffsetX, y + 20, figure.label, {
                    fontSize: '20px',
                    fill: '#000000',  // Texto negro
                    stroke: '#ffffff',  // Borde blanco
                    strokeThickness: 4,
                    fontWeight: 'bold'
                });

                const figureObject = graphics.setInteractive(
                    new Phaser.Geom.Rectangle(figureStartX, y, 60, 60),
                    Phaser.Geom.Rectangle.Contains
                );
                figureObject.figureData = figure;
                figureObject.startX = figureStartX + 30;
                figureObject.startY = y + 30;

                figureObject.on('pointerdown', (pointer) => startDrawingLine.call(this, figureObject, pointer));
            });

            // Barajar las respuestas para que aparezcan en orden aleatorio
            shuffleArray(level.perimeters);

            level.perimeters.forEach((perimeter, index) => {
                const y = startY + index * spacingY;
                const perimeterText = this.add.text(perimeterStartX, y, `${perimeter} unidades`, {
                    fontSize: '22px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                }).setOrigin(0.5);

                perimeterText.setInteractive();
                perimeterText.perimeterValue = perimeter;

                perimeterText.on('pointerdown', () => completeDrawingLine.call(this, perimeterText));
            });
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
            ).setOrigin(0, 0).setLineWidth(6); // Línea más gruesa
        }

        function completeDrawingLine(perimeterText) {
            if (!activeLine || !selectedFigure) return;

            activeLine.setTo(
                selectedFigure.startX, selectedFigure.startY,
                perimeterText.x, perimeterText.y
            );

            // Comprobar si la conexión es correcta
            if (selectedFigure.figureData.correctPerimeter === perimeterText.perimeterValue) {
                updateFeedback("¡Correcto! Has conectado la figura con su perímetro adecuado.", "green");
                score += 50;
                updateScore(score);  // Actualizar la puntuación en la vista
                correctConnections++;
                activeLine.setStrokeStyle(6, selectedFigure.figureData.color);  // Mantener la línea en el color de la figura
                activeLine = null;  // Detener la línea activa
                perimeterText.setBackgroundColor('#00ff00');  // Cambiar el fondo del texto a verde

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

export default PerimeterConnectionGame;
