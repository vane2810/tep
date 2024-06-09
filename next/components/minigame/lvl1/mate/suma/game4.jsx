"use client";

import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game4 = ({ updateScore = (f) => f, updateQuestionCount = (f) => f, questionCount = 0 }) => {
  const [questions] = useState([
    { image: 'mercury', options: ['Mercurio', 'Venus', 'Tierra', 'Marte'], correct: 'Mercurio' },
    { image: 'venus', options: ['Júpiter', 'Venus', 'Saturno', 'Urano'], correct: 'Venus' },
    { image: 'earth', options: ['Marte', 'Venus', 'Tierra', 'Neptuno'], correct: 'Tierra' },
    { image: 'mars', options: ['Saturno', 'Marte', 'Mercurio', 'Júpiter'], correct: 'Marte' },
    { image: 'jupiter', options: ['Saturno', 'Júpiter', 'Urano', 'Neptuno'], correct: 'Júpiter' },
    { image: 'saturn', options: ['Urano', 'Neptuno', 'Saturno', 'Venus'], correct: 'Saturno' },
    { image: 'uranus', options: ['Tierra', 'Urano', 'Marte', 'Júpiter'], correct: 'Urano' },
    { image: 'neptune', options: ['Neptuno', 'Venus', 'Mercurio', 'Saturno'], correct: 'Neptuno' },
    { image: 'sun', options: ['Sol', 'Luna', 'Estrella', 'Cometa'], correct: 'Sol' },
    { image: 'moon', options: ['Planeta', 'Satélite', 'Estrella', 'Luna'], correct: 'Luna' }
  ]);

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
      this.load.image('background', '/img/games/mate/ob/fondoji1.png');
      this.load.image('mercury', '/img/games/mate/ob/mercurio.png');
      this.load.image('venus', '/img/games/mate/ob/venus.png');
      this.load.image('earth', '/img/games/mate/ob/tierra.png');
      this.load.image('mars', '/img/games/mate/ob/marte.png');
      this.load.image('jupiter', '/img/games/mate/ob/jupiter.png');
      this.load.image('saturn', '/img/games/mate/ob/saturno.png');
      this.load.image('uranus', '/img/games/mate/ob/urano.png');
      this.load.image('neptune', '/img/games/mate/obe/neptuno.png');
      this.load.image('sun', '/img/games/mate/ob/sol.png');
      this.load.image('moon', '/img/games/mate/ob/luna.png');
      this.load.image('next', '/img/games/mate/ob/flechitajuego.png'); // Imagen de la flecha
    }

    function createScene() {
      const background = this.add.image(340, 300, 'background');
      background.setDisplaySize(680, 600);
      background.setAlpha(0.8);

      createNewQuestion.call(this);
    }

    function createNewQuestion() {
      if (questionCount >= questions.length) {
        this.add.text(340, 300, '¡Juego terminado!', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        return;
      }

      const currentQuestion = questions[questionCount];

      this.questionText && this.questionText.destroy();
      this.planetImage && this.planetImage.destroy();
      this.option1 && this.option1.destroy();
      this.option2 && this.option2.destroy();
      this.option3 && this.option3.destroy();
      this.option4 && this.option4.destroy();
      this.optionBox1 && this.optionBox1.destroy();
      this.optionBox2 && this.optionBox2.destroy();
      this.optionBox3 && this.optionBox3.destroy();
      this.optionBox4 && this.optionBox4.destroy();
      this.scoreText && this.scoreText.destroy();
      this.nextButton && this.nextButton.destroy();

      this.planetImage = this.add.image(340, 150, currentQuestion.image);
      this.planetImage.setDisplaySize(200, 200);

      this.questionText = this.add.text(340, 50, `Pregunta ${questionCount + 1}`, { fontSize: '24px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);

      this.scoreText = this.add.text(50, 50, `Puntuación: ${updateScore}`, { fontSize: '20px', fill: '#ffffff' });

      this.optionBox1 = this.add.rectangle(200, 400, 100, 50, 0x76ADD0);
      this.option1 = this.add.text(200, 400, currentQuestion.options[0], { fontSize: '24px', fill: '#ffffff' });
      this.option1.setOrigin(0.5);
      this.option1.setInteractive();
      this.option1.on('pointerdown', () => checkAnswer.call(this, currentQuestion.options[0], currentQuestion.correct));
      this.option1.on('pointerover', () => {
        this.optionBox1.setScale(1.05);
        this.optionBox1.setFillStyle(0xAD76D0);
      });
      this.option1.on('pointerout', () => {
        this.optionBox1.setScale(1);
        this.optionBox1.setFillStyle(0x76ADD0);
      });

      this.optionBox2 = this.add.rectangle(340, 400, 100, 50, 0x76ADD0);
      this.option2 = this.add.text(340, 400, currentQuestion.options[1], { fontSize: '24px', fill: '#ffffff' });
      this.option2.setOrigin(0.5);
      this.option2.setInteractive();
      this.option2.on('pointerdown', () => checkAnswer.call(this, currentQuestion.options[1], currentQuestion.correct));
      this.option2.on('pointerover', () => {
        this.optionBox2.setScale(1.05);
        this.optionBox2.setFillStyle(0xAD76D0);
      });
      this.option2.on('pointerout', () => {
        this.optionBox2.setScale(1);
        this.optionBox2.setFillStyle(0x76ADD0);
      });

      this.optionBox3 = this.add.rectangle(480, 400, 100, 50, 0x76ADD0);
      this.option3 = this.add.text(480, 400, currentQuestion.options[2], { fontSize: '24px', fill: '#ffffff' });
      this.option3.setOrigin(0.5);
      this.option3.setInteractive();
      this.option3.on('pointerdown', () => checkAnswer.call(this, currentQuestion.options[2], currentQuestion.correct));
      this.option3.on('pointerover', () => {
        this.optionBox3.setScale(1.05);
        this.optionBox3.setFillStyle(0xAD76D0);
      });
      this.option3.on('pointerout', () => {
        this.optionBox3.setScale(1);
        this.optionBox3.setFillStyle(0x76ADD0);
      });

      this.optionBox4 = this.add.rectangle(340, 500, 100, 50, 0x76ADD0);
      this.option4 = this.add.text(340, 500, currentQuestion.options[3], { fontSize: '24px', fill: '#ffffff' });
      this.option4.setOrigin(0.5);
      this.option4.setInteractive();
      this.option4.on('pointerdown', () => checkAnswer.call(this, currentQuestion.options[3], currentQuestion.correct));
      this.option4.on('pointerover', () => {
        this.optionBox4.setScale(1.05);
        this.optionBox4.setFillStyle(0xAD76D0);
      });
      this.option4.on('pointerout', () => {
        this.optionBox4.setScale(1);
        this.optionBox4.setFillStyle(0x76ADD0);
      });

      this.nextButton = this.add.image(640, 550, 'next');
      this.nextButton.setInteractive();
      this.nextButton.on('pointerdown', () => nextQuestion.call(this));
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
      if (selectedAnswer === correctAnswer) {
        updateScore(score => score + 1);
      }
      updateQuestionCount(count => count + 1);
      this.nextButton.setVisible(true);
    }

    function nextQuestion() {
      this.nextButton.setVisible(false);
      if (questionCount < 9) {
        createNewQuestion.call(this);
      } else {
        this.add.text(340, 300, '¡Juego terminado!', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
      }
    }

    return () => {
      game.destroy(true);
    };
  }, [questionCount, updateScore, updateQuestionCount, questions]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div id="game-container" style={{ width: '680px', height: '600px', position: 'relative', zIndex: 0 }}></div>
    </div>
  );
};

export default Game4;

