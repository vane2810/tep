// Juego 1 - Perimetro - Nivel 1
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const ConceptosPerimetroGame = () => {
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
            // Carga los recursos necesarios
            this.load.image('background', '/img/games/mate/geometria/fondogame1.png');
            this.load.image('triangulo', '/img/niveles/mate/paso2figugeo.png');
            this.load.image('cuadrado', '/img/niveles/mate/paso3figugeo.png');
            this.load.image('rectangulo', '/img/niveles/mate/paso4figugeo.png');
            this.load.image('circulo', '/img/niveles/mate/paso5figugeo.png');
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
                    instructionText = '¿Qué es el perímetro?\nSelecciona la opción que mejor lo describe.';
                    options = ['La suma de todos los lados de una figura', 'El área de una figura', 'El volumen de una figura'];
                    correctOption = 'La suma de todos los lados de una figura';
                    imageKey = 'triangulo'; // Imagen genérica para representar figuras
                    break;
                case 2:
                    instructionText = '¿Cuál de estas figuras tiene un perímetro más grande?';
                    options = ['Triángulo con lados de 3 cm', 'Cuadrado con lados de 2 cm', 'Rectángulo con lados de 6 cm y 3 cm'];
                    correctOption = 'Rectángulo con lados de 6 cm y 3 cm';
                    imageKey = ''; // Puedes agregar una imagen que represente un conjunto de figuras
                    break;
                case 3:
                    instructionText = 'Si sumas todos los lados de un cuadrado, ¿qué concepto estás aplicando?';
                    options = ['Perímetro', 'Área', 'Volumen'];
                    correctOption = 'Perímetro';
                    imageKey = 'cuadrado';
                    break;
                case 4:
                    instructionText = '¿Cuál de las siguientes afirmaciones es verdadera?\n"El perímetro de un círculo se llama..."';
                    options = ['Circunferencia', 'Diámetro', 'Radio'];
                    correctOption = 'Circunferencia';
                    imageKey = 'circulo';
                    break;
                default:
                    instructionText = '¡Felicitaciones! Has completado el juego de conceptos sobre el perímetro.';
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

export default ConceptosPerimetroGame;

