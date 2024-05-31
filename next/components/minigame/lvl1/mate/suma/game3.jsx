"use client";

import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game3 = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
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

    const game = new Phaser.Game(config);
    let correctAnswer;
    let answerOptions;

    function preload() {
      this.load.image('background', '/img/games/mate/ob/fondogame3.jpg');
      this.load.image('arrow', '/img/games/mate/ob/respuestagame3.png'); // Asegúrate de usar la ruta correcta
    }

    function createScene() {
      this.add.image(400, 300, 'background').setDisplaySize(800, 600);

      createNewQuestion.call(this);

      // Agregar un temporizador para actualizar las preguntas
      this.time.addEvent({
        delay: 10000, // Cambiar pregunta cada 10 segundos
        callback: () => {
          setQuestionCount(prevCount => prevCount + 1);
          createNewQuestion.call(this);
        },
        loop: true
      });
    }

    function createNewQuestion() {
      const num1 = Phaser.Math.Between(10, 99);
      const num2 = Phaser.Math.Between(10, 99);
      const sum = num1 + num2;
      correctAnswer = sum;

      this.questionText && this.questionText.destroy();
      this.questionBox && this.questionBox.destroy();
      this.unitsText1 && this.unitsText1.destroy();
      this.unitsText2 && this.unitsText2.destroy();
      this.tensText1 && this.tensText1.destroy();
      this.tensText2 && this.tensText2.destroy();

      // Pregunta
      this.questionBox = this.add.rectangle(400, 80, 700, 60, 0x76ADD0).setAlpha(0.8);
      this.questionText = this.add.text(400, 80, `¿Cuál es el resultado de esta suma?`, { fontSize: '32px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);

      // Unidades y Decenas
      this.unitsText1 = this.add.text(420, 150, `U`, { fontSize: '24px', fill: '#ffffff' });
      this.tensText1 = this.add.text(370, 150, `D`, { fontSize: '24px', fill: '#ffffff' });
      this.unitsText2 = this.add.text(420, 190, `${num1 % 10}`, { fontSize: '32px', fill: '#ffffff' });
      this.tensText2 = this.add.text(370, 190, `${Math.floor(num1 / 10)}`, { fontSize: '32px', fill: '#ffffff' });

      this.unitsText3 = this.add.text(420, 230, `${num2 % 10}`, { fontSize: '32px', fill: '#ffffff' });
      this.tensText3 = this.add.text(370, 230, `${Math.floor(num2 / 10)}`, { fontSize: '32px', fill: '#ffffff' });

      const wrongAnswers = Array.from({ length: 6 }, () => Phaser.Math.Between(20, 198)).filter(ans => ans !== sum);
      const options = Phaser.Math.RND.shuffle([correctAnswer, ...wrongAnswers.slice(0, 1)]);

      answerOptions && answerOptions.clear(true, true);
      answerOptions = this.physics.add.group();

      options.forEach((option, index) => {
        createAnswerOption.call(this, option, index);
      });
    }

    function createAnswerOption(answer, index) {
      const xPosition = 400;
      const yPosition = 350 + (index * 100);
      const optionBox = this.add.image(xPosition, yPosition, 'arrow');
      const optionText = this.add.text(xPosition, yPosition, answer, { fontSize: '27px', fill: '#000000' });
      optionBox.setDisplaySize(100, 100);
      optionText.setOrigin(0.5);

      optionBox.setInteractive();
      optionBox.on('pointerdown', () => checkAnswer.call(this, answer, correctAnswer));

      answerOptions.add(optionBox);
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
      if (parseInt(selectedAnswer) === correctAnswer) {
        setFeedback('¡Respuesta Correcta!');
        setScore(prevScore => prevScore + 1); // Incrementa la puntuación
      } else {
        setFeedback('Respuesta Incorrecta. ¡Inténtalo de nuevo!');
      }

      setTimeout(() => {
        setFeedback('');
      }, 2000);
    }

    function update() {
      // Actualización de la lógica del juego (si es necesario)
    }

    return () => {
      game.destroy(true);
    };
  }, [questionCount]);

  useEffect(() => {
    const feedbackBox = document.getElementById('feedback-box');
    if (feedbackBox) {
      feedbackBox.textContent = feedback;
    }
  }, [feedback]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div id="game-container" style={{ width: '800px', height: '600px', position: 'relative', zIndex: 0 }}>
        <h1 style={{ background:'#ffffff', color: '#000000', position: 'absolute', top: '20px', left: '20px' }}>Juego de Sumas</h1>
        <p style={{ background:'#ffffff', color: '#000000', position: 'absolute', top: '50px', left: '20px' }}>Pregunta {questionCount + 1}/10</p>
        <p style={{ background:'#ffffff', color: '#000000', position: 'absolute', top: '80px', left: '20px' }}>Puntuación: {score}</p>
        <p id="feedback-box" style={{ background:'#ffffff' , color: '#000000', position: 'absolute', top: '110px', left: '20px' }}>{feedback}</p>
      </div>
    </div>
  );
};

export default Game3;
