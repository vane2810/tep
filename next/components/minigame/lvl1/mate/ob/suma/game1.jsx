// Juego 1 - Nivel 1 - Suma
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game1 = ({ updateFeedback, updateScore }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 300, 
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

        const game = new Phaser.Game(config);
        setGameInstance(game);

        let terms = [];
        let dropZones = [];
        let checkButton;
        let checkButtonText;
        let allTermsPlaced = false;

        function preload() {
            this.load.image('background', '/img/games/mate/ob/game1.jpg');
        }

        function createScene() {
            // Ajustar el fondo a todo el ancho del juego
            const background = this.add.image(400, 150, 'background'); 
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
            this.add.text(400, 50, 'Identifica los términos de esta suma', {
                fontSize: '22px', 
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab', 
                padding: { x: 20, y: 10 }, 
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Crear los números de la suma
            this.add.text(200, 120, `${num1}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Sumando'); // Mover números hacia arriba y ajustar tamaño de fuente
            this.add.text(300, 120, '+', { fontSize: '28px', fill: '#000000' });
            this.add.text(400, 120, `${num2}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Sumado');
            this.add.text(500, 120, '=', { fontSize: '28px', fill: '#000000' });
            this.add.text(600, 120, `${sum}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Total');

            // Crear zonas de arrastre debajo de los números con fondo de color
            dropZones = [
                createDropZone.call(this, 200, 200, 'Sumando'), 
                createDropZone.call(this, 400, 200, 'Sumado'),
                createDropZone.call(this, 600, 200, 'Total')
            ];

            // Crear términos para arrastrar con fondo de color
            terms = termsArray.map(term => {
                return createDraggableTerm.call(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(250, 280), term.label); // Ajustar las posiciones de los términos
            });

            // Crear botón de comprobación con texto y fondo de color
            checkButton = this.add.graphics();
            checkButton.fillStyle(0x7966ab, 1); 
            checkButton.fillRect(320, 255, 160, 30); 

            checkButtonText = this.add.text(400, 270, 'Comprobar', { 
                fontSize: '24px',
                fill: '#ffffff',
                align: 'center',
                fontWeight: 'bold'
            }).setOrigin(0.5).setInteractive();

            checkButtonText.on('pointerdown', () => checkCompletion.call(this));
            checkButton.setVisible(false); 
            checkButtonText.setVisible(false);
        }

        function createDropZone(x, y, label) {
            const zone = this.add.zone(x, y, 10, 50).setRectangleDropZone(150, 50).setData('label', label);
            const graphics = this.add.graphics();
            graphics.fillStyle(0xd5a6bd, 0.75); 
            graphics.fillRect(x - 75, y - 25, 150, 50); 
            graphics.lineStyle(2, 0xd5a6bd);
            graphics.strokeRect(x - 75, y - 25, 150, 50); 
            return zone;
        }

        function createDraggableTerm(x, y, label) {
            const termBox = this.add.graphics();
            termBox.fillStyle(0xffffff, 1); 
            termBox.fillRect(x - 60, y - 20, 120, 40); 

            const termText = this.add.text(x, y, label, {
                fontSize: '26px', 
                fill: '#000000',
            }).setOrigin(0.5, 0.5).setInteractive({ draggable: true });

            termText.setData('term', { label });

            termText.on('dragstart', () => {
                termBox.setAlpha(0.5); 
            });

            termText.on('drag', (pointer, dragX, dragY) => {
                termText.x = dragX;
                termText.y = dragY;
                termBox.x = dragX - 60; 
                termBox.y = dragY - 20;
            });

            termText.on('dragend', () => {
                termBox.setAlpha(1); 

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
            checkButton.setVisible(allTermsPlaced);
            checkButtonText.setVisible(allTermsPlaced);
        }

        function checkCompletion() {
            let correctTermsCount = 0;

            terms.forEach(term => {
                if (term.getData('placedZone') && term.getData('placedZone').getData('label') === term.getData('term').label) {
                    correctTermsCount++;
                    term.setStyle({ fill: '#6aa84f' });
                } else {
                    term.setStyle({ fill: '#ff0000' });
                }
            });

            let score = 0;
            let feedbackMessage = '';

            if (correctTermsCount === 3) {
                score = 75; // Respuesta completamente correcta
                feedbackMessage = '¡Correcto! Has colocado todos los términos correctamente';
            } else if (correctTermsCount === 2) {
                score = 50; // Se equivocó en 1 término
                feedbackMessage = '¡Casi! Has colocado 2 términos correctamente';
            } else if (correctTermsCount === 1) {
                score = 25; // Se equivocó en 2 términos
                feedbackMessage = 'Has colocado solo 1 término correctamente';
            } else {
                feedbackMessage = 'Incorrecto. No has colocado ningún término correctamente. Inténtalo de nuevo.';
            }

            updateScore(score);
            updateFeedback(feedbackMessage);

            // Ocultar el botón de comprobación después de la verificación
            checkButton.setVisible(false);
            checkButtonText.setVisible(false);

            // Desactivar la interacción con todos los términos
            terms.forEach(term => {
                term.input.enabled = false;
            });

            // No generar nueva pregunta ni reiniciar el juego
            // Terminar el juego después de la verificación
            setTimeout(() => {
                // Verificar si gameInstance no es null antes de destruir
                if (gameInstance) {
                    gameInstance.destroy(true);
                }
            }, 5000); // Esperar 5 segundos antes de destruir el juego para que el usuario vea el feedback
        }

        function update() { }

        return () => {
            // Verificar si gameInstance no es null antes de destruir
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [updateFeedback, updateScore]);

    return <div id="game-container" className="relative shadow-lg mx-auto mt-8 rounded-lg w-[800px] h-[300px] overflow-hidden"></div>; 
};

export default Game1;
