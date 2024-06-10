// Juego 1 - Suma - Mate - Nivel 1 - Preguntas de términos
"use client"
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game1 = () => {
    const [game, setGame] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
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

        const gameInstance = new Phaser.Game(config);
        setGame(gameInstance);

        let terms = [];
        let numbers = [];
        let questionText;
        let dropZones = [];
        let feedbackText;
        let checkButton;
        let checkButtonText;
        let allTermsPlaced = false;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            // Ajustar el fondo a todo el ancho del juego
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            const num1 = Phaser.Math.Between(1, 9);
            const num2 = Phaser.Math.Between(1, 9);
            const sum = num1 + num2;

            const termsArray = [
                { label: 'Sumando' },
                { label: 'Sumado' },
                { label: 'Total' }
            ];

            termsArray.sort(() => Math.random() - 0.5); // Mezclar términos

            // Mostrar la pregunta con fondo
            questionText = this.add.text(400, 100, '¿Cuáles son los términos de esta suma?', {
                fontSize: '28px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab', // Color de fondo para la pregunta
                padding: { x: 20, y: 10 }, // Añadir relleno alrededor del texto
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Crear los números de la suma
            numbers = [
                this.add.text(200, 200, `${num1}`, { fontSize: '32px', fill: '#000000' }).setData('label', 'Sumando'),
                this.add.text(300, 200, '+', { fontSize: '32px', fill: '#000000' }),
                this.add.text(400, 200, `${num2}`, { fontSize: '32px', fill: '#000000' }).setData('label', 'Sumado'),
                this.add.text(500, 200, '=', { fontSize: '32px', fill: '#000000' }),
                this.add.text(600, 200, `${sum}`, { fontSize: '32px', fill: '#000000' }).setData('label', 'Total')
            ];

            // Crear zonas de arrastre debajo de los números con fondo de color
            dropZones = [
                createDropZone.call(this, 200, 300, 'Sumando'),
                createDropZone.call(this, 400, 300, 'Sumado'),
                createDropZone.call(this, 600, 300, 'Total')
            ];

            // Crear términos para arrastrar con fondo de color
            terms = termsArray.map(term => {
                return createDraggableTerm.call(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(400, 500), term.label);
            });

            // Texto de retroalimentación (feedback)
            feedbackText = this.add.text(400, 500, '', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);

            // Crear botón de comprobación con texto y fondo de color
            checkButton = this.add.graphics();
            checkButton.fillStyle(0x0000ff, 1); // Fondo azul sólido
            checkButton.fillRect(300, 540, 160, 40); // Dibujar el fondo del botón

            checkButtonText = this.add.text(380, 560, 'Comprobar', {
                fontSize: '26px',
                fill: '#ffffff',
                align: 'center',
                fontWeight: 'bold'
            }).setOrigin(0.5).setInteractive();

            checkButtonText.on('pointerdown', () => checkCompletion.call(this));
            checkButton.setVisible(false); // Ocultar el botón al inicio
            checkButtonText.setVisible(false);
        }

        function createDropZone(x, y, label) {
            const zone = this.add.zone(x, y, 10, 50).setRectangleDropZone(150, 50).setData('label', label);
            const graphics = this.add.graphics();
            graphics.fillStyle(0x00ff00, 0.5); // Fondo verde claro con transparencia
            graphics.fillRect(x - 50, y - 25, 100, 50); // Dibujar rectángulo
            graphics.lineStyle(2, 0x00ff00);
            graphics.strokeRect(x - 50, y - 25, 100, 50); // Dibujar borde
            return zone;
        }

        function createDraggableTerm(x, y, label) {
            const termBox = this.add.graphics();
            termBox.fillStyle(0xffffff, 1); // Fondo blanco sólido
            termBox.fillRect(x - 60, y - 20, 120, 40); // Dibujar rectángulo de fondo

            const termText = this.add.text(x, y, label, {
                fontSize: '32px',
                fill: '#000000',
            }).setOrigin(0.5, 0.5).setInteractive({ draggable: true });

            termText.setData('term', { label });

            termText.on('dragstart', (pointer, dragX, dragY) => {
                termBox.setAlpha(0.5); // Hacer el fondo semitransparente al arrastrar
            });

            termText.on('drag', (pointer, dragX, dragY) => {
                termText.x = dragX;
                termText.y = dragY;
                termBox.x = dragX - 60; // Mantener el fondo en la posición del texto
                termBox.y = dragY - 20;
            });

            termText.on('dragend', (pointer, dragX, dragY) => {
                termBox.setAlpha(1); // Restablecer la opacidad del fondo al soltar

                dropZones.forEach(zone => {
                    if (zone.getBounds().contains(termText.x, termText.y)) {
                        termText.input.enabled = false;
                        termText.x = zone.x;
                        termText.y = zone.y;
                        termBox.x = zone.x - 60;
                        termBox.y = zone.y - 20;
                        termText.setData('placedZone', zone);
                        checkAllTermsPlaced();
                    }
                });
            });

            return termText;
        }

        function checkAllTermsPlaced() {
            allTermsPlaced = terms.every(term => term.input.enabled === false);
            checkButton.setVisible(allTermsPlaced); // Mostrar el botón solo si todos los términos están colocados
            checkButtonText.setVisible(allTermsPlaced);
        }

        function checkCompletion() {
            let correctTermsCount = 0;
        
            terms.forEach(term => {
                if (term.getData('placedZone') && term.getData('placedZone').getData('label') === term.getData('term').label) {
                    correctTermsCount++;
                }
            });
        
            let score = 0;
        
            if (correctTermsCount === 3) {
                score = 75; // Respuesta completamente correcta
            } else if (correctTermsCount === 2) {
                score = 50; // Se equivocó en 1 término
            } else if (correctTermsCount === 1) {
                score = 25; // Se equivocó en 2 términos
            }
        
            if (score > 0) {
                feedbackText.setText(`¡Correcto! Has colocado ${correctTermsCount} términos. Puntuación: ${score}`);
                feedbackText.setStyle({ fill: '#00ff00' }); // Cambiar a verde para correcto
            } else {
                feedbackText.setText('Incorrecto. Inténtalo de nuevo.');
                feedbackText.setStyle({ fill: '#ff0000' }); // Cambiar a rojo para incorrecto
            }
        
            // Ocultar términos y zonas, no generar nueva pregunta
            terms.forEach(term => {
                term.destroy();
            });
            dropZones.forEach(zone => {
                zone.destroy();
            });
            checkButton.setVisible(false);
            checkButtonText.setVisible(false);
        }

        

        function update() { }

        return () => {
            gameInstance.destroy(true);
        };
    }, []);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default Game1;
