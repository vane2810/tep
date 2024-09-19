// JUEGO DE ARRASTRAR 
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const GameDragDrop = ({ gameData, currentScene, updateScore, updateFeedback, proceedToNextScene }) => {
    const [gameInstance, setGameInstance] = useState(null);

    useEffect(() => {
        const limiteEscenas = gameData.limiteEscenas || gameData.escenas.length;

        if (gameData.escenas.length > limiteEscenas) {
            console.warn(`Hay más escenas (${gameData.escenas.length}) que el número permitido (${limiteEscenas}). Solo se utilizarán las primeras ${limiteEscenas} escenas.`);
        }

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
            const background = this.add.image(400, 150, 'background');
            background.setDisplaySize(config.width, config.height);

            generateQuestion.call(this, gameData.escenas[currentScene]);
        }

        function generateQuestion(sceneData) {
            const { num1, num2, termsArray, puntos } = sceneData;
            const sum = num1 + num2;

            termsArray.sort(() => Math.random() - 0.5); // Mezclar términos

            this.add.text(400, 50, 'Identifica los términos de esta suma', {
                fontSize: '22px',
                fill: '#ffffff',
                align: 'center',
                backgroundColor: '#7966ab',
                padding: { x: 20, y: 10 },
                fontWeight: 'bold'
            }).setOrigin(0.5);

            this.add.text(200, 120, `${num1}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Sumando');
            this.add.text(300, 120, '+', { fontSize: '28px', fill: '#000000' });
            this.add.text(400, 120, `${num2}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Sumado');
            this.add.text(500, 120, '=', { fontSize: '28px', fill: '#000000' });
            this.add.text(600, 120, `${sum}`, { fontSize: '28px', fill: '#000000' }).setData('label', 'Total');

            dropZones = [
                createDropZone.call(this, 200, 200, 'Sumando'),
                createDropZone.call(this, 400, 200, 'Sumado'),
                createDropZone.call(this, 600, 200, 'Total')
            ];

            terms = termsArray.map(term => {
                return createDraggableTerm.call(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(250, 280), term.label);
            });

            checkButton = this.add.graphics();
            checkButton.fillStyle(0x7966ab, 1);
            checkButton.fillRect(320, 255, 160, 30);

            checkButtonText = this.add.text(400, 270, 'Comprobar', {
                fontSize: '24px',
                fill: '#ffffff',
                align: 'center',
                fontWeight: 'bold'
            }).setOrigin(0.5).setInteractive();

            checkButtonText.on('pointerdown', () => checkCompletion.call(this, puntos));
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

        function checkCompletion(puntos) {
            let correctTermsCount = 0;
            const totalTerms = terms.length; // Número total de términos

            terms.forEach(term => {
                if (term.getData('placedZone') && term.getData('placedZone').getData('label') === term.getData('term').label) {
                    correctTermsCount++;
                    term.setStyle({ fill: '#6aa84f' }); // Verde para correcto
                } else {
                    term.setStyle({ fill: '#ff0000' }); // Rojo para incorrecto
                }
            });

            // Calcula el puntaje basado en el número de términos correctos
            const puntosPorTermino = puntos / totalTerms;
            let score = correctTermsCount * puntosPorTermino;
            let feedbackMessage = '';

            // Genera el mensaje de feedback según el número de términos correctos
            if (correctTermsCount === totalTerms) {
                feedbackMessage = '¡Correcto! Has colocado todos los términos correctamente';
            } else if (correctTermsCount > 0) {
                feedbackMessage = `¡Casi! Has colocado ${correctTermsCount} término(s) correctamente`;
            } else {
                feedbackMessage = 'Incorrecto. No has colocado ningún término correctamente. Inténtalo de nuevo.';
            }

            // Actualiza el puntaje y el feedback
            updateScore(score);
            updateFeedback(feedbackMessage);

            // Desactiva el botón y los términos después de la verificación
            checkButton.setVisible(false);
            checkButtonText.setVisible(false);

            terms.forEach(term => {
                term.input.enabled = false;
            });

            // Avanza a la siguiente escena después de 3 segundos
            setTimeout(() => {
                proceedToNextScene(); // Avanza a la siguiente escena
                if (gameInstance) {
                    gameInstance.destroy(true);
                }
            }, 3000);
        }


        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [gameData, currentScene, updateFeedback, updateScore, proceedToNextScene]);

    return <div id="game-container" className="relative shadow-lg mx-auto mt-8 rounded-lg w-[800px] h-[300px] overflow-hidden"></div>;
};

export default GameDragDrop;
