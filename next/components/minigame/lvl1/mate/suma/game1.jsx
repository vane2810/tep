"use client";

import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game1 = () => {
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
        create: createScene
      }
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('background', '/img/games/mate/ob/galaxy.jpg');
    }

    function createScene() {
      const background = this.add.image(340, 300, 'background');
      background.setDisplaySize(680, 600);
      background.setAlpha(0.8);

      createNewQuestion.call(this);
    }

    function createNewQuestion() {
      const num1 = Phaser.Math.Between(1, 10);
      const num2 = Phaser.Math.Between(1, 10);
      const sum = num1 + num2;

      this.questionText && this.questionText.destroy();
      this.option1 && this.option1.destroy();
      this.option2 && this.option2.destroy();
      this.option3 && this.option3.destroy();
      this.questionBox && this.questionBox.destroy();
      this.optionBox1 && this.optionBox1.destroy();
      this.optionBox2 && this.optionBox2.destroy();
      this.optionBox3 && this.optionBox3.destroy();

      this.questionBox = this.add.rectangle(340, 200, 400, 50, 0x76ADD0);
      this.questionText = this.add.text(340, 200, `¿Cuánto es ${num1} + ${num2}?`, { fontSize: '24px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);

      const correctAnswer = sum;
      const wrongAnswer1 = sum - Phaser.Math.Between(1, 5);
      const wrongAnswer2 = sum + Phaser.Math.Between(1, 5);

      const options = Phaser.Math.RND.shuffle([correctAnswer, wrongAnswer1, wrongAnswer2]);

      this.optionBox1 = this.add.rectangle(200, 300, 100, 50, 0x76ADD0);
      this.option1 = this.add.text(200, 300, options[0], { fontSize: '24px', fill: '#ffffff' });
      this.option1.setOrigin(0.5);
      this.option1.setInteractive();
      this.option1.on('pointerdown', () => checkAnswer.call(this, options[0], correctAnswer));
      this.option1.on('pointerover', () => {
        this.optionBox1.setScale(1.05);
        this.optionBox1.setFillStyle(0xAD76D0);
      });
      this.option1.on('pointerout', () => {
        this.optionBox1.setScale(1);
        this.optionBox1.setFillStyle(0x76ADD0);
      });

      this.optionBox2 = this.add.rectangle(340, 300, 100, 50, 0x76ADD0);
      this.option2 = this.add.text(340, 300, options[1], { fontSize: '24px', fill: '#ffffff' });
      this.option2.setOrigin(0.5);
      this.option2.setInteractive();
      this.option2.on('pointerdown', () => checkAnswer.call(this, options[1], correctAnswer));
      this.option2.on('pointerover', () => {
        this.optionBox2.setScale(1.05);
        this.optionBox2.setFillStyle(0xAD76D0);
      });
      this.option2.on('pointerout', () => {
        this.optionBox2.setScale(1);
        this.optionBox2.setFillStyle(0x76ADD0);
      });

      this.optionBox3 = this.add.rectangle(480, 300, 100, 50, 0x76ADD0);
      this.option3 = this.add.text(480, 300, options[2], { fontSize: '24px', fill: '#ffffff' });
      this.option3.setOrigin(0.5);
      this.option3.setInteractive();
      this.option3.on('pointerdown', () => checkAnswer.call(this, options[2], correctAnswer));
      this.option3.on('pointerover', () => {
        this.optionBox3.setScale(1.05);
        this.optionBox3.setFillStyle(0xAD76D0);
      });
      this.option3.on('pointerout', () => {
        this.optionBox3.setScale(1);
        this.optionBox3.setFillStyle(0x76ADD0);
      });
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

export default Game1;
