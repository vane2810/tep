"use client";
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game4 = ({ updateScore = (f) => f, updateQuestionCount = (f) => f, questionCount = 0 }) => {
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
      this.load.image('fondo', '/img/games/mate/ob/fondoji1.png');
      this.load.image('mercurio', '/img/games/mate/ob/mercurio.png');
      this.load.image('venus', '/img/games/mate/ob/venus.png');
      this.load.image('tierra', '/img/games/mate/ob/tierra.png');
      this.load.image('marte', '/img/games/mate/ob/marte.png');
      this.load.image('jupiter', '/img/games/mate/ob/jupiter.png');
      this.load.image('saturno', '/img/games/mate/ob/saturno.png');
      this.load.image('urano', '/img/games/mate/ob/urano.png');
      this.load.image('neptuno', '/img/games/mate/ob/neptuno.png');
      this.load.image('sol', '/img/games/mate/ob/sol.png');
      this.load.image('luna', '/img/games/mate/ob/luna.png');
      this.load.image('flechita', '/img/games/mate/ob/flechitajuego.png');
    }

    function createScene() {
      const background = this.add.image(340, 300, 'fondo');
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
      this.feedbackText && this.feedbackText.destroy();

      this.planetImage = this.add.image(340, 250, currentQuestion.image);
      this.planetImage.setDisplaySize(200, 200);

      this.questionText = this.add.text(340, 50, `¡Conoces este planeta! ¿Cuál es?`, { fontSize: '24px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);

      const options = Phaser.Math.RND.shuffle(currentQuestion.options);

      for (let i = 0; i < options.length; i++) {
        const optionBox = this.add.rectangle(200 + i * 140, 450, 100, 50, 0x76ADD0);
        const optionText = this.add.text(200 + i * 140, 450, options[i], { fontSize: '24px', fill: '#ffffff' });
        optionText.setOrigin(0.5);
        optionText.setInteractive();
        optionText.on('pointerdown', () => checkAnswer.call(this, options[i], currentQuestion.correct));
        optionText.on('pointerover', () => {
          optionBox.setScale(1.05);
          optionBox.setFillStyle(0xAD76D0);
        });
        optionText.on('pointerout', () => {
          optionBox.setScale(1);
          optionBox.setFillStyle(0x76ADD0);
        });
      }

      this.nextButton = this.add.image(640, 550, 'flechita');
      this.nextButton.setDisplaySize(50, 50);
      this.nextButton.setVisible(false);
      this.nextButton.setInteractive();
      this.nextButton.on('pointerdown', () => {
        changePlanetImage.call(this);
        nextQuestion.call(this);
      });
    }

    function changePlanetImage() {
      this.planetImage.setTexture(Phaser.Math.RND.pick(['mercurio', 'venus', 'tierra', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'sol', 'luna']));
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
      this.feedbackText && this.feedbackText.destroy();
      if (selectedAnswer === correctAnswer) {
        this.feedbackText = this.add.text(340, 350, '¡Es correcta!', { fontSize: '24px', fill: '#00ff00' }).setOrigin(0.5);
        updateScore(score => score + 1);
      } else {
        this.feedbackText = this.add.text(340, 350, '¡Es incorrecta!', { fontSize: '24px', fill: '#ff0000' }).setOrigin(0.5);
      }
      this.nextButton.setVisible(true);
    }

    function nextQuestion() {
      this.feedbackText && this.feedbackText.destroy();
      this.nextButton.setVisible(false);
      updateQuestionCount(count => count + 1);
      createNewQuestion.call(this);
    }

    return () => {
      game.destroy(true);
    };
  }, [questionCount, updateScore, updateQuestionCount]);

  const [questions] = useState([
    { image: 'mercurio', options: ['Mercurio', 'Venus', 'Tierra', 'Marte'], correct: 'Mercurio' },
    { image: 'venus', options: ['Júpiter', 'Venus', 'Saturno', 'Urano'], correct: 'Venus' },
    { image: 'tierra', options: ['Marte', 'Venus', 'Tierra', 'Neptuno'], correct: 'Tierra' },
    { image: 'marte', options: ['Saturno', 'Marte', 'Mercurio', 'Júpiter'], correct: 'Marte' },
    { image: 'jupiter', options: ['Saturno', 'Júpiter', 'Urano', 'Neptuno'], correct: 'Júpiter' },
    { image: 'saturno', options: ['Urano', 'Neptuno', 'Saturno', 'Tierra'], correct: 'Saturno' },
    { image: 'urano', options: ['Urano', 'Neptuno', 'Tierra', 'Marte'], correct: 'Urano' },
    { image: 'neptuno', options: ['Urano', 'Neptuno', 'Venus', 'Marte'], correct: 'Neptuno' },
    { image: 'sol', options: ['Saturno', 'Sol', 'Mercurio', 'Júpiter'], correct: 'Sol' },
    { image: 'luna', options: ['Tierra', 'Luna', 'Venus', 'Marte'], correct: 'Luna' },
  ]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div id="game-container" style={{ width: '680px', height: '600px', position: 'relative', zIndex: 0 }}></div>
    </div>
  );
};

export default Game4;


