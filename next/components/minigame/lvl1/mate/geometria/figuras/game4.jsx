// Juego 4 - figuras - Nivel 1
// TrueFalseGame.js
"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const TrueFalseGame = () => {
    const [gameInstance, setGameInstance] = useState(null);
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [feedback, setFeedback] = useState('');

    const questions = [
        { question: "El triángulo tiene 3 lados.", correctAnswer: true },
        { question: "Un cuadrado tiene 5 lados.", correctAnswer: false },
        { question: "El círculo tiene esquinas.", correctAnswer: false },
        { question: "Un rectángulo tiene 4 lados.", correctAnswer: true },
        { question: "Un hexágono tiene 6 lados.", correctAnswer: true },
    ];

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            scene: {
                preload: preload,
                create: create,
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
        }

        function create() {
            this.add.image(400, 300, 'background');

            showQuestion.call(this, questions[questionIndex]);

            const trueButton = this.add.text(300, 400, 'Verdadero', {
                fontSize: '32px',
                fill: '#00ff00',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 },
                borderRadius: 5
            }).setInteractive().on('pointerdown', () => checkAnswer.call(this, true));

            const falseButton = this.add.text(500, 400, 'Falso', {
                fontSize: '32px',
                fill: '#ff0000',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 },
                borderRadius: 5
            }).setInteractive().on('pointerdown', () => checkAnswer.call(this, false));

            this.nextButton = this.add.text(400, 500, 'Siguiente', {
                fontSize: '24px',
                fill: '#ffffff',
                backgroundColor: '#0000ff',
                padding: { x: 20, y: 10 },
                borderRadius: 5
            }).setInteractive().setOrigin(0.5);
            this.nextButton.visible = false; // Ocultar el botón "Siguiente" al principio

            this.nextButton.on('pointerdown', () => {
                setQuestionIndex(prevIndex => prevIndex + 1);
                this.scene.restart();
            });
        }

        function showQuestion(question) {
            this.add.text(400, 200, question.question, {
                fontSize: '28px',
                fill: '#ffffff',
                fontFamily: 'Arial',
                wordWrap: { width: 700 },
                align: 'center'
            }).setOrigin(0.5);

            this.add.text(400, 550, `Feedback: ${feedback}`, {
                fontSize: '20px',
                fill: '#ffffff',
                fontFamily: 'Arial',
                align: 'center'
            }).setOrigin(0.5);
        }

        function checkAnswer(selectedAnswer) {
            const currentQuestion = questions[questionIndex];
            if (selectedAnswer === currentQuestion.correctAnswer) {
                setScore(prevScore => prevScore + 10);
                setFeedback('¡Correcto!');
            } else {
                setFeedback('Incorrecto.');
            }
            this.nextButton.visible = true; // Mostrar el botón "Siguiente" después de responder
        }

        function update() {
            // Lógica de actualización si es necesario
        }

        return () => {
            if (gameInstance) {
                gameInstance.destroy(true);
            }
        };
    }, [questionIndex, feedback]);

    return <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>;
};

export default TrueFalseGame;


