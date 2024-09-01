"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const GameDragAndDrop = ({ updateFeedback, updateScore, finalizeGame }) => {
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
                create: createScene
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
        const maxScore = 200;
        const pointsPerCorrectAnswer = 50;
        const figures = [
            { key: 'circulo', type: 'circulo' },
            { key: 'triangulo', type: 'triangulo' },
            { key: 'cuadrado', type: 'cuadrado' },
            { key: 'rectangulo', type: 'rectangulo' }
        ];
        let correctMatches = 0;
        const totalMatches = figures.length;
        let dropZones = [];

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            // Agregar la imagen de fondo
            this.add.image(400, 300, 'background').setDisplaySize(800, 600);

            // Definir las posiciones de las zonas de respuesta
            const zonePositions = [
                { x: 150, y: 500 },
                { x: 300, y: 500 },
                { x: 450, y: 500 },
                { x: 600, y: 500 }
            ];

            // Mezclar las posiciones de las zonas
            const shuffledZones = shuffleArray(zonePositions);

            // Crear las zonas de respuesta desordenadas
            dropZones = [
                { text: 'Círculo', key: 'circulo', ...shuffledZones[0] },
                { text: 'Triángulo', key: 'triangulo', ...shuffledZones[1] },
                { text: 'Cuadrado', key: 'cuadrado', ...shuffledZones[2] },
                { text: 'Rectángulo', key: 'rectangulo', ...shuffledZones[3] }
            ].map(zone => createDropZone(this, zone.x, zone.y, zone.text, zone.key));

            // Calcular la posición inicial y el espaciado entre las figuras
            const startX = config.width / 2 - ((figures.length - 1) * 150) / 2;
            const y = 150; // Altura fija para todas las figuras

            figures.forEach((figure, index) => {
                const x = startX + index * 150;
                createDraggableFigure(this, x, y, figure.type, figure.key);
            });
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createDraggableFigure(scene, x, y, type, key) {
            let shape;
            switch (type) {
                case 'circulo':
                    shape = scene.add.circle(x, y, 50, 0xff0000).setInteractive({ draggable: true });
                    break;
                case 'triangulo':
                    shape = scene.add.polygon(x, y + 25, [0, -50, 50, 50, -50, 50], 0x00ff00);
                    shape.setInteractive(new Phaser.Geom.Polygon([0, -50, 50, 50, -50, 50]), Phaser.Geom.Polygon.Contains).setInteractive({ draggable: true });
                    shape.setOrigin(0.5, 0.45); // Ajuste adicional para centrar el triángulo
                    break;
                case 'cuadrado':
                    shape = scene.add.rectangle(x, y, 100, 100, 0x0000ff).setInteractive({ draggable: true });
                    break;
                case 'rectangulo':
                    shape = scene.add.rectangle(x, y, 120, 60, 0xffff00).setInteractive({ draggable: true });
                    break;
                default:
                    break;
            }

            shape.setData('key', key);

            scene.input.setDraggable(shape);

            shape.on('drag', (pointer, dragX, dragY) => {
                shape.x = dragX;
                shape.y = dragY;
            });

            shape.on('dragend', () => {
                const droppedZone = dropZones.find(zone => Phaser.Geom.Intersects.RectangleToRectangle(shape.getBounds(), zone.getBounds()));
                if (droppedZone && droppedZone.getData('key') === key) {
                    correctMatches++;
                    score += pointsPerCorrectAnswer;
                    updateScore(score);

                    // Mostrar feedback en verde
                    updateFeedback(`¡Correcto! Es un ${droppedZone.data.get('key')}.`, "green");

                    shape.destroy(); // Elimina la figura cuando se suelta correctamente
                    droppedZone.fillColor = 0x00ff00; // Marca la zona en verde
                    checkForCompletion();
                }
            });
        }

        function createDropZone(scene, x, y, text, key) {
            const dropZone = scene.add.rectangle(x, y, 100, 40, 0x888888).setInteractive();
            scene.add.text(x, y, text, {
                fontSize: '20px',
                fill: '#ffffff',
                fontWeight: 'bold'
            }).setOrigin(0.5);

            dropZone.setData('key', key);
            return dropZone;
        }

        function checkForCompletion() {
            if (correctMatches === totalMatches) {
                updateFeedback("¡Felicidades! Has completado todas las coincidencias.", "green");
                if (typeof finalizeGame === 'function') {
                    finalizeGame(score);
                } else {
                    console.error("finalizeGame no está definido o no es una función");
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

export default GameDragAndDrop;
