// Juego 2 - Perímetros Sencillos - Nivel 1
"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game2 = ({ updateFeedback, updateScore, finalizeGame }) => {
    const gameContainerRef = useRef(null); // Referencia al contenedor del juego
    const gameInstanceRef = useRef(null); // Referencia a la instancia del juego

    useEffect(() => {
        // Configuración del juego Phaser
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameContainerRef.current, // Usar la referencia al contenedor
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

        // Destruir cualquier instancia anterior antes de crear una nueva
        if (gameInstanceRef.current) {
            gameInstanceRef.current.destroy(true);
        }

        // Crear una nueva instancia del juego
        gameInstanceRef.current = new Phaser.Game(config);

        let correctAnswers = [];
        let score = 0;
        let currentQuestion = 0;
        let questionAnswered = false; // Estado para rastrear si la pregunta actual ya fue respondida

        function preload() {
            console.log("Preloading assets...");
            this.load.image('background', '/img/games/mate/ob/game1.jpg'); // Verifica que la ruta sea correcta
        }

        function createScene() {
            console.log("Creating scene...");

            // Crear el fondo y asegurarse de que ocupe toda la pantalla
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(config.width, config.height); // Asegura que el fondo ocupe toda la pantalla

            // Definir las preguntas sencillas sobre perímetros en centímetros
            const questions = [
                {
                    shape: 'Cuadrado',
                    question: 'Si cada lado de este cuadrado mide 2 cm, ¿cuál es su perímetro?',
                    options: ['6 cm', '8 cm', '10 cm'],
                    answer: '8 cm'
                },
                {
                    shape: 'Rectángulo',
                    question: 'Este rectángulo tiene lados de 3 cm y 2 cm. ¿Cuál es su perímetro?',
                    options: ['10 cm', '8 cm', '12 cm'],
                    answer: '10 cm'
                },
                {
                    shape: 'Triángulo',
                    question: 'Un triángulo con lados de 3 cm cada uno. ¿Cuál es su perímetro?',
                    options: ['9 cm', '6 cm', '12 cm'],
                    answer: '9 cm'
                },
                {
                    shape: 'Círculo',
                    question: 'Este círculo tiene un radio de 2 cm. ¿Cuál es su perímetro aproximado? (2 × π × radio en cm)',
                    options: ['12 cm', '6 cm', '8 cm'],
                    answer: '12 cm'
                }
            ];

            correctAnswers = questions;
            generateQuestion.call(this, currentQuestion);
        }

        function generateQuestion(index) {
            if (index >= correctAnswers.length) {
                finalizeGame(score); // Finalizar el juego si se completaron todas las preguntas
                return;
            }

            const questionData = correctAnswers[index];

            // Limpiar cualquier contenido anterior de la escena
            this.children.removeAll();

            // Volver a aplicar el fondo al reiniciar la escena
            const background = this.add.image(400, 300, 'background');
            background.setDisplaySize(800, 600);

            // Mostrar la pregunta con envoltura de texto y ajustar el tamaño de la fuente
            const questionText = this.add.text(50, 50, questionData.question, {
                fontSize: '18px', // Ajustar el tamaño de la fuente para que quepa en la pantalla
                fill: '#000000',
                fontWeight: 'bold',
                wordWrap: { width: 700, useAdvancedWrap: true } // Envolver el texto para que no salga de la pantalla
            });

            // Mostrar la figura
            const shape = this.add.graphics({ x: 400, y: 200 });
            switch (questionData.shape) {
                case 'Cuadrado':
                    shape.fillStyle(0x00ff00); // Color verde
                    shape.fillRect(-50, -50, 100, 100);
                    break;
                case 'Rectángulo':
                    shape.fillStyle(0x0000ff); // Color azul
                    shape.fillRect(-75, -50, 150, 100);
                    break;
                case 'Triángulo':
                    shape.fillStyle(0xff0000); // Color rojo
                    shape.beginPath();
                    shape.moveTo(0, -50);
                    shape.lineTo(-50, 50);
                    shape.lineTo(50, 50);
                    shape.closePath();
                    shape.fillPath();
                    break;
                case 'Círculo':
                    shape.fillStyle(0xffff00); // Color amarillo
                    shape.fillCircle(0, 0, 50);
                    break;
            }

            // Resetear el estado de la pregunta respondida
            questionAnswered = false;

            // Opciones de respuesta
            questionData.options.forEach((option, i) => {
                const x = 100 + (i % 2) * 300;
                const y = 350 + Math.floor(i / 2) * 100;

                this.add.text(x, y, option, {
                    fontSize: '20px',
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                })
                .setInteractive()
                .on('pointerdown', () => handleOptionClick.call(this, option, questionData.answer));
            });
        }

        function handleOptionClick(selectedOption, correctAnswer) {
            if (questionAnswered) return; // No permitir más clics después de haber respondido

            const isCorrect = selectedOption === correctAnswer;
            if (isCorrect) {
                score += 25; // Cada respuesta correcta suma 25 puntos
                updateScore(score);
                updateFeedback("¡Muy bien! ¡Respuesta correcta!", "green");
                questionAnswered = true; // Marcar la pregunta como respondida

                // Solo reiniciar la escena si hay más preguntas
                if (currentQuestion < correctAnswers.length - 1) {
                    currentQuestion++;
                    this.scene.restart(); // Reinicia la escena para mostrar la siguiente pregunta
                } else {
                    finalizeGame(score); // Finalizar el juego si ya no hay más preguntas
                }
            } else {
                updateFeedback("¡Ups! Intenta de nuevo.", "red");
            }
        }

        function update() {
            // Actualizaciones del juego si es necesario
        }

        return () => {
            // Destruir el juego cuando el componente se desmonte
            if (gameInstanceRef.current) {
                gameInstanceRef.current.destroy(true);
            }
        };
    }, []);

    return (
        <div ref={gameContainerRef} id="game-container" style={{ width: '800px', height: '600px' }}></div>
    );
};

export default Game2;
