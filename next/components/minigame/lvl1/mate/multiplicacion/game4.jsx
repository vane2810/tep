// Juego 4 - Multiplicación - Mate - Nivel 1 - Preguntas tres opciones

"use client";

import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game4 = ({ updateFeedback, updateScore, updateQuestionCount }) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: '650',
      height: '500',
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

      // Escuchar eventos de Phaser y actualizar el estado de React
      this.events.on('updateScore', (newScore) => {
        setScore(newScore);
        updateScore(newScore);
      });

      this.events.on('updateFeedback', (newFeedback) => {
        setFeedback(newFeedback);
        updateFeedback(newFeedback);
      });

      this.events.on('updateQuestionCount', (newCount) => {
        setQuestionCount(newCount);
        updateQuestionCount(newCount);
      });
    }

    function createNewQuestion() {
      // Si se ha alcanzado el límite de 10 preguntas, no crear una nueva
      if (questionCount >= 10) {
        return;
      }

      // Generar dos números para la multiplicación
      const num1 = Phaser.Math.Between(1, 10);
      const num2 = Phaser.Math.Between(1, 10);
      const product = num1 * num2;

      // Destruir las preguntas y opciones anteriores si existen
      this.questionText && this.questionText.destroy();
      this.option1 && this.option1.destroy();
      this.option2 && this.option2.destroy();
      this.option3 && this.option3.destroy();
      this.questionBox && this.questionBox.destroy();
      this.optionBox1 && this.optionBox1.destroy();
      this.optionBox2 && this.optionBox2.destroy();
      this.optionBox3 && this.optionBox3.destroy();

      // Crear la nueva pregunta
      this.questionBox = this.add.rectangle(340, 200, 400, 50, 0x76ADD0);
      this.questionText = this.add.text(340, 200, `¿Cuánto es ${num1} x ${num2}?`, { fontSize: '24px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);

      // Respuesta correcta y respuestas incorrectas
      const correctAnswer = product;
      const wrongAnswer1 = product + Phaser.Math.Between(1, 10);
      const wrongAnswer2 = product - Phaser.Math.Between(1, 10);

      // Asegurarse de que las respuestas incorrectas son positivas y no iguales a la correcta
      const options = Phaser.Utils.Array.Shuffle([correctAnswer, Math.max(wrongAnswer1, 1), Math.max(wrongAnswer2, 1)]);

      // Crear las opciones de respuesta
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
      let newFeedback = '';
      let newScore = score;
      let newQuestionCount = questionCount;

      if (parseInt(selectedAnswer) === correctAnswer) {
        newFeedback = '¡Respuesta Correcta!';
        newScore += 30;
      } else {
        newFeedback = 'Respuesta Incorrecta. ¡Inténtalo de nuevo!';
      }

      newQuestionCount += 1;

      if (newQuestionCount < 10) {
        createNewQuestion.call(this);
      } else {
        newFeedback = 'Fin del juego. Has respondido 10 preguntas.';
      }

      // Emitir eventos para actualizar el estado en React
      this.events.emit('updateScore', newScore);
      this.events.emit('updateFeedback', newFeedback);
      this.events.emit('updateQuestionCount', newQuestionCount);
    }

    return () => {
      game.destroy(true);
    };
  }, [questionCount, score, feedback, updateFeedback, updateScore, updateQuestionCount]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div id="game-container" style={{ width: '680px', height: '600px', position: 'relative', zIndex: 0 }}>
        {/* El juego se renderiza aquí */}
      </div>
    </div>
  );
};

export default Game4;
