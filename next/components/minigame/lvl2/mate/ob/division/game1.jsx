// Juego 1 - Nivel 1 - Div
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game1 = ({ updateFeedback, updateScore, showRetryButton }) => {
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
            const background = this.add.image(400, 150, 'background'); // Cambiar el centro del fondo a 150 (la mitad de la nueva altura)
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this);
        }

        function generateQuestion() {
            const divisor = Phaser.Math.Between(1, 9); // Generar un número entre 1 y 9 para el divisor
            const quotient = Phaser.Math.Between(1, 9); // Generar un número entre 1 y 9 para el cociente
            const dividend = divisor * quotient; // Calcular el dividendo

            const termsArray = [
                { label: 'Dividendo' },
                { label: 'Divisor' },
                { label: 'Cociente' }
            ];

            termsArray.sort(() => Math.random() - 0.5); // Mezclar términos

            // Mostrar la pregunta con fondo
            this.add.text(400, 50, 'Identifica los términos de esta división', { // Mover texto de pregunta más arriba
                fontSize: '22px', // Ajustar tamaño de fuente para caber mejor en la escena
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab', // Color de fondo para la pregunta
                padding: { x: 20, y: 10 }, // Añadir relleno alrededor del texto
                fontWeight: 'bold'
            }).setOrigin(0.5);

            // Crear los números de la división
            this.add.text(200, 120, `${dividend}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Dividendo');
            this.add.text(300, 120, '/', { fontSize: '28px', fill: '#000000' });
            this.add.text(400, 120, `${divisor}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Divisor');
            this.add.text(500, 120, '=', { fontSize: '28px', fill: '#000000' });
            this.add.text(600, 120, `${quotient}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Cociente');

            // Crear zonas de arrastre debajo de los números con fondo de color
            dropZones = [
                createDropZone.call(this, 200, 200, 'Dividendo'), // Mover zonas hacia arriba
                createDropZone.call(this, 400, 200, 'Divisor'),
                createDropZone.call(this, 600, 200, 'Cociente')
            ];

            // Crear términos para arrastrar con fondo de color
            terms = termsArray.map(term => {
                return createDraggableTerm.call(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(250, 280), term.label); // Ajustar las posiciones de los términos
            });

            // Crear botón de comprobación con texto y fondo de color
            checkButton = this.add.graphics();
            checkButton.fillStyle(0x7966ab, 1); // Fondo azul sólido
            checkButton.fillRect(320, 255, 160, 30); // Ajustar la posición y el tamaño del botón de comprobación

            checkButtonText = this.add.text(400, 270, 'Comprobar', { // Ajustar la posición del texto del botón
                fontSize: '24px',
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
            graphics.fillStyle(0xd5a6bd, 0.75); // Fondo verde claro con transparencia
            graphics.fillRect(x - 75, y - 25, 150, 50); // Ajustar el tamaño y posición del rectángulo para la zona de arrastre
            graphics.lineStyle(2, 0xd5a6bd);
            graphics.strokeRect(x - 75, y - 25, 150, 50); // Ajustar el borde
            return zone;
        }

        function createDraggableTerm(x, y, label) {
            const termBox = this.add.graphics();
            termBox.fillStyle(0xffffff, 1); // Fondo blanco sólido
            termBox.fillRect(x - 60, y - 20, 120, 40); // Dibujar rectángulo de fondo

            const termText = this.add.text(x, y, label, {
                fontSize: '26px', // Ajustar tamaño de fuente
                fill: '#000000',
            }).setOrigin(0.5, 0.5).setInteractive({ draggable: true });

            termText.setData('term', { label });

            termText.on('dragstart', () => {
                termBox.setAlpha(0.5); // Hacer el fondo semitransparente al arrastrar
            });

            termText.on('drag', (pointer, dragX, dragY) => {
                termText.x = dragX;
                termText.y = dragY;
                termBox.x = dragX - 60; // Mantener el fondo en la posición del texto
                termBox.y = dragY - 20;
            });

            termText.on('dragend', () => {
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

    return <div id="game-container" className="w-[800px] h-[300px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>; // Ajustar el contenedor a la nueva altura
};

export default Game1;
