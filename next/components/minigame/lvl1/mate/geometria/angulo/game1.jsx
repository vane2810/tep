// Juego 1 - Angulos - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const ConceptosAngulosGame = () => {
    const [gameInstance, setGameInstance] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

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

        const game = new Phaser.Game(config);
        setGameInstance(game);

        function preload() {
            this.load.image('background', '/img/games/mate/geometria/fondogame1.png');
            this.load.image('reloj', '/img/games/mate/geometria/reloj.png'); 
            this.load.image('vertex', '/img/games/mate/geometria/vertice.png');
        }

        function createScene() {
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height);

            let instructionText = '';
            let options = [];
            let correctOption = '';
            let imageKey = '';

            switch (currentStep) {
                case 1:
                    instructionText = '¿Qué es un ángulo?\nSelecciona la opción que mejor lo describe.';
                    options = ['La abertura entre dos líneas que se encuentran en un punto', 'La longitud de una línea', 'El área entre dos superficies'];
                    correctOption = 'La abertura entre dos líneas que se encuentran en un punto';
                    imageKey = 'vertex';
                    break;
                case 2:
                    instructionText = 'Cuando las manecillas del reloj señalan las 3:00, ¿qué tipo de ángulo forman?';
                    options = ['Ángulo recto', 'Ángulo agudo', 'Ángulo obtuso'];
                    correctOption = 'Ángulo recto';
                    imageKey = 'reloj';
                    break;
                case 3:
                    instructionText = '¿Cómo se llama el punto donde se encuentran dos líneas para formar un ángulo?';
                    options = ['Vértice', 'Centro', 'Radio'];
                    correctOption = 'Vértice';
                    imageKey = 'vertex';
                    break;
                case 4:
                    instructionText = '¿Cuál de las siguientes afirmaciones es verdadera?\n"Un ángulo recto es..."';
                    options = ['Un ángulo de 90 grados', 'Un ángulo menor que 90 grados', 'Un ángulo mayor que 90 grados'];
                    correctOption = 'Un ángulo de 90 grados';
                    imageKey = '';
                    break;
                default:
                    instructionText = '¡Felicitaciones! Has completado el juego de conceptos sobre los ángulos.';
                    options = [];
                    imageKey = '';
            }

            // Mostrar las instrucciones
            this.add.text(400, 50, instructionText, {
                fontSize: '24px',
                fill: '#ffffff',
                align: 'center',
                wordWrap: { width: 750, useAdvancedWrap: true },
                fontFamily: 'Arial'
            }).setOrigin(0.5);

            // Mostrar la imagen relevante
            if (imageKey) {
                this.add.image(400, 200, imageKey).setDisplaySize(200, 200).setOrigin(0.5);
            }

            // Mostrar las opciones
            options.forEach((option, index) => {
                const button = this.add.text(400, 350 + index * 50, option, {
                    fontSize: '24px',
                    fill: '#000000',
                    backgroundColor: '#ffffff',
                    padding: { x: 10, y: 5 },
                    fontFamily: 'Arial'
                }).setInteractive().setOrigin(0.5);

                button.on('pointerdown', () => checkAnswer.call(this, option, correctOption, button));
            });
        }

        function checkAnswer(selectedOption, correctOption, button) {
            let feedbackMessage = '';
            let feedbackColor = '';

            if (selectedOption === correctOption) {
                feedbackMessage = '¡Correcto!';
                feedbackColor = '#6aa84f';
                button.setStyle({ fill: feedbackColor });
            } else {
                feedbackMessage = `Incorrecto. La respuesta correcta es ${correctOption}.`;
                feedbackColor = '#ff0000';
                button.setStyle({ fill: feedbackColor });
            }

            this.add.text(400, 500, feedbackMessage, {
                fontSize: '24px',
                fill: feedbackColor,
                fontFamily: 'Arial'
            }).setOrigin(0.5);

            if (currentStep < 4) {
                const nextButton = this.add.text(400, 550, 'Siguiente', {
                    fontSize: '24px',
                    fill: '#ffffff',
                    backgroundColor: '#007bff',
                    padding: { x: 20, y: 10 },
                    fontFamily: 'Arial'
                }).setInteractive().setOrigin(0.5);

                nextButton.on('pointerdown', () => {
                    setCurrentStep(currentStep + 1);
                    gameInstance.destroy(true);
                    setGameInstance(new Phaser.Game(config));
                });
            } else {
                this.add.text(400, 550, '¡Juego completado!', {
                    fontSize: '24px',
                    fill: '#6aa84f',
                    fontFamily: 'Arial'
                }).setOrigin(0.5);
            }
        }

        function update() { }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [currentStep]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default ConceptosAngulosGame;
