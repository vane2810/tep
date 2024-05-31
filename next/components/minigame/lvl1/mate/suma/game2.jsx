"use client";

"use client";

import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game2 = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 680,
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
          gravity: { y: 200 },
          debug: false
        }
      }
    };

    const game = new Phaser.Game(config);
    let fallingOptions;
    let correctAnswer;

    function preload() {
      this.load.image('background', '/img/games/mate/ob/fondogame2.jpg');
      this.load.image('arrow', '/img/games/mate/ob/flechitajuego.png'); // Cambia esto a la ruta correcta de tu imagen de flecha
    }

    function createScene() {
      const background = this.add.image(340, 300, 'background');
      background.setDisplaySize(680, 600);
      background.setAlpha(0.8);

      fallingOptions = this.physics.add.group();
      createNewQuestion.call(this);

      // Agregar la flecha para pasar a la siguiente pregunta
      const arrow = this.add.image(645, 565, 'arrow').setInteractive();
      arrow.setDisplaySize(50, 50);
      arrow.on('pointerdown', () => {
        setQuestionCount(prevCount => prevCount + 1);
        createNewQuestion.call(this);
      });
    }

    function createNewQuestion() {
      const num1 = Phaser.Math.Between(1, 10);
      const num2 = Phaser.Math.Between(1, 10);
      const sum = num1 + num2;
      correctAnswer = sum;

      this.questionText && this.questionText.destroy();
      this.questionBox && this.questionBox.destroy();

      this.questionBox = this.add.rectangle(340, 100, 400, 50, 0x76ADD0);
      this.questionText = this.add.text(340, 100, `¿Cuánto es ${num1} + ${num2}?`, { fontSize: '24px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);

      const wrongAnswers = Array.from({ length: 6 }, () => Phaser.Math.Between(1, 20)).filter(ans => ans !== sum);
      const options = Phaser.Math.RND.shuffle([correctAnswer, ...wrongAnswers.slice(0, 5)]);

      fallingOptions.clear(true, true);

      options.forEach((option, index) => {
        setTimeout(() => createFallingOption.call(this, option), index * 800); // Añadimos un retraso de 800ms entre caídas
      });
    }

    function createFallingOption(answer) {
      const xPosition = Phaser.Math.Between(50, 630);
      const optionBox = this.add.rectangle(xPosition, 0, 100, 50, 0x76ADD0);
      const optionText = this.add.text(xPosition, 0, answer, { fontSize: '24px', fill: '#ffffff' });
      optionText.setOrigin(0.5);

      this.physics.world.enable([optionBox, optionText]);
      optionBox.body.setVelocityY(1); // Velocidad más lenta
      optionText.body.setVelocityY(1);

      optionBox.setInteractive();
      optionBox.on('pointerdown', () => checkAnswer.call(this, answer, correctAnswer));

      // Asegurar que el texto siga al cuadro
      optionText.update = function () {
        this.x = optionBox.x;
        this.y = optionBox.y;
      };

      fallingOptions.add(optionBox);
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
      if (parseInt(selectedAnswer) === correctAnswer) {
        setFeedback('¡Respuesta Correcta!');
        setScore(prevScore => prevScore + 1); // Incrementa la puntuación
      } else {
        setFeedback('Respuesta Incorrecta. ¡Inténtalo de nuevo!');
      }

      if (questionCount < 9) {
        setQuestionCount(prevCount => prevCount + 1);
        createNewQuestion.call(this);
      } else {
        setTimeout(() => {
          setFeedback('Fin del juego. Has respondido 10 preguntas.');
        }, 1000);
      }
    }

    function update() {
      fallingOptions.children.iterate(option => {
        if (option && option.y > 600) {
          option.destroy();
        }
      });
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
      <div id="game-container" style={{ width: '680px', height: '600px', position: 'relative', zIndex: 0 }}>
        <h1 style={{ background:'#ffffff', color: '#000000', position: 'absolute', top: '20px', left: '20px' }}>Juego de Sumas</h1>
        <p style={{ background:'#ffffff', color: '#000000', position: 'absolute', top: '50px', left: '20px' }}>Pregunta {questionCount + 1}/10</p>
        <p style={{ background:'#ffffff', color: '#000000', position: 'absolute', top: '80px', left: '20px' }}>Puntuación: {score}</p>
        <p id="feedback-box" style={{ background:'#ffffff' , color: '#000000', position: 'absolute', top: '110px', left: '20px' }}>{feedback}</p>
      </div>
    </div>
  );
};

export default Game2;
