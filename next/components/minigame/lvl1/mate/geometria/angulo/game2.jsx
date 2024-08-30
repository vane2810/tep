// Juego - Ángulos y sus Tipos
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

            // Definir las preguntas sobre ángulos y sus tipos
            const questions = [
                {
                    angleType: 'Agudo',
                    question: '¿Qué tipo de ángulo es este?',
                    options: ['Agudo', 'Recto', 'Obtuso'],
                    answer: 'Agudo'
                },
                {
                    angleType: 'Recto',
                    question: '¿Qué tipo de ángulo es este?',
                    options: ['Recto', 'Agudo', 'Obtuso'],
                    answer: 'Recto'
                },
                {
                    angleType: 'Obtuso',
                    question: '¿Qué tipo de ángulo es este?',
                    options: ['Obtuso', 'Agudo', 'Recto'],
                    answer: 'Obtuso'
                },
                {
                    angleType: 'Llano',
                    question: '¿Qué tipo de ángulo es este?',
                    options: ['Llano', 'Recto', 'Agudo'],
                    answer: 'Llano'
                }
            ];

            correctAnswers = questions;
            generateQuestion.call(this, currentQuestion);
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
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

            // Mostrar la pregunta con letras más grandes y resaltadas
            const questionText = this.add.text(50, 50, questionData.question, {
                fontSize: '26px', // Aumentar el tamaño de la fuente para resaltar más la pregunta
                fill: '#000000',
                fontWeight: 'bold',
                stroke: '#ffffff', // Añadir un borde blanco alrededor del texto
                strokeThickness: 4, // Grosor del borde
                wordWrap: { width: 700, useAdvancedWrap: true } // Envolver el texto para que no salga de la pantalla
            });

            // Mostrar el ángulo más pequeño
            const angle = this.add.graphics({ x: 400, y: 250 }); // Ajustar la posición para que esté más centrado
            switch (questionData.angleType) {
                case 'Agudo':
                    angle.lineStyle(6, 0x00ff00, 1); // Línea más fina, color verde
                    angle.beginPath();
                    angle.moveTo(-60, 0);
                    angle.lineTo(0, 0);
                    angle.lineTo(60, 60);
                    angle.strokePath();
                    break;
                case 'Recto':
                    angle.lineStyle(6, 0x0000ff, 1); // Línea más fina, color azul
                    angle.beginPath();
                    angle.moveTo(-60, 0);
                    angle.lineTo(0, 0);
                    angle.lineTo(0, 60);
                    angle.strokePath();
                    break;
                case 'Obtuso':
                    angle.lineStyle(6, 0xff0000, 1); // Línea más fina, color rojo
                    angle.beginPath();
                    angle.moveTo(-60, 0);
                    angle.lineTo(0, 0);
                    angle.lineTo(60, -40);
                    angle.strokePath();
                    break;
                case 'Llano':
                    angle.lineStyle(6, 0xffff00, 1); // Línea más fina, color amarillo
                    angle.beginPath();
                    angle.moveTo(-60, 0);
                    angle.lineTo(60, 0);
                    angle.strokePath();
                    break;
            }

            // Mezclar las opciones para que aparezcan en un orden diferente cada vez
            shuffleArray(questionData.options);

            // Opciones de respuesta alineadas horizontalmente
            const buttonStartX = 150; // Posición inicial del primer botón en X
            const buttonSpacingX = 180; // Espacio entre los botones
            const buttonY = 450; // Posición vertical de los botones
            questionData.options.forEach((option, i) => {
                const x = buttonStartX + i * buttonSpacingX; // Calcular la posición x de cada botón

                const optionText = this.add.text(x, buttonY, option, {
                    fontSize: '22px', // Ajustar el tamaño de la fuente de las opciones
                    fill: '#000000',
                    backgroundColor: '#f0f0f0',
                    padding: { x: 20, y: 10 },
                    borderRadius: 10
                });

                // Asegurarse de que cada opción sea interactiva
                optionText.setInteractive().on('pointerdown', () => handleOptionClick.call(this, option, questionData.answer));
            });

            questionAnswered = false; // Resetear el estado de la pregunta respondida
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
                    generateQuestion.call(this, currentQuestion); // Generar la siguiente pregunta
                } else {
                    updateFeedback("¡Felicidades! Has completado el juego.", "green"); // Mostrar el mensaje de felicitación en verde
                    setTimeout(() => {
                        finalizeGame(score); // Finalizar el juego si ya no hay más preguntas
                    }, 2000); // Espera 2 segundos antes de finalizar para que se vea el mensaje
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
