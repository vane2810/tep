// Juego 2 - Multiplicación - Mate - Nivel 1 - Arcade
"use client";
import React, { useEffect } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ setFeedback, setScore, setQuestionCount, questionCount, onGameEnd }) => {

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
      this.load.image('background', '/img/games/mate/ob/game3.jpg');
    }

    function createScene() {
      loadBackground.call(this);
      createNewQuestion.call(this);
    }

    function loadBackground() {
      this.backgroundImage = this.add.image(400, 300, 'background');
      const scaleFactor = Math.min(800 / this.backgroundImage.width, 600 / this.backgroundImage.height);
      this.backgroundImage.setScale(scaleFactor).setScrollFactor(0);
      this.backgroundImage.setPosition(400, 300);
    }

    function createNewQuestion() {
      // 10 preguntas
      if (questionCount >= 10) {
        setFeedback('Fin del juego. Has respondido 10 preguntas.');
        onGameEnd(); 
        return;
      }

      // Generar los factores para la multiplicación
      const factor1 = Phaser.Math.Between(1, 10); // Primer factor
      const factor2 = Phaser.Math.Between(1, 10); // Segundo factor
      const result = factor1 * factor2;

      correctAnswer = result; // Respuesta correcta

      // Mostrar la pregunta
      this.questionBox && this.questionBox.destroy();
      this.questionBox = this.add.rectangle(400, 80, 700, 60, 0x5fb2e6).setAlpha(0.8);
      this.questionText && this.questionText.destroy();
      this.questionText = this.add.text(400, 80, `¿Cuál es el resultado de esta multiplicación?`, { fontSize: '24px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);

      // Mostrar los números a multiplicar
      const backgroundRectMult = this.add.rectangle(395, 200, 230, 150, 0x5fb2e6).setAlpha(0.8);
      this.factorText1 && this.factorText1.destroy();
      this.factorText2 && this.factorText2.destroy();
      this.equalsText && this.equalsText.destroy();
      this.factorText1 = this.add.text(370, 200, `${factor1}`, { fontSize: '32px', fill: '#ffffff' });
      this.factorText2 = this.add.text(420, 200, `${factor2}`, { fontSize: '32px', fill: '#ffffff' });
      this.equalsText = this.add.text(395, 200, `x`, { fontSize: '32px', fill: '#ffffff' });

      // Contenedor de los textos
      this.add.group([backgroundRectMult, this.factorText1, this.factorText2, this.equalsText]);

      // Generar una respuesta incorrecta
      let wrongAnswer;
      do {
        wrongAnswer = result + Phaser.Math.Between(-10, 10); // Respuesta incorrecta, en el rango +-10
      } while (wrongAnswer === result || wrongAnswer < 0 || wrongAnswer >= 100); 

      // Mezclar opciones
      const options = Phaser.Math.RND.shuffle([correctAnswer, wrongAnswer]);

      // Limpiar opciones anteriores
      answerOptions && answerOptions.clear(true, true);
      answerOptions = this.physics.add.group();

      options.forEach((option, index) => {
        createAnswerOption.call(this, option, index);
      });
    }

    function createAnswerOption(answer, index) {
      const xPosition = 400;
      const yPosition = 350 + (index * 100);

      // Rectángulo de fondo para la opción de respuesta
      const optionBox = this.add.rectangle(xPosition, yPosition, 200, 80, 0x5fb2e6).setAlpha(0.8);

      // Texto de la opción de respuesta
      const optionText = this.add.text(xPosition, yPosition, answer, { fontSize: '24px', fill: '#ffffff' });
      optionText.setOrigin(0.5);

      // Opción de respuesta
      optionBox.setInteractive();
      optionBox.on('pointerdown', () => checkAnswer.call(this, answer, correctAnswer));

      // Cambiar color al pasar el cursor
      optionBox.on('pointerover', () => {
        optionBox.setFillStyle(0xffd966);
      });

      // Restaurar color al quitar el cursor
      optionBox.on('pointerout', () => {
        optionBox.setFillStyle(0x5fb2e6);
      });

      answerOptions.add(optionBox);
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
      setTimeout(() => {
        if (parseInt(selectedAnswer) === correctAnswer) {
          setFeedback('¡Respuesta Correcta!');
          setScore(prevScore => prevScore + 10); // Incrementa la puntuación
        } else {
          setFeedback('Respuesta Incorrecta. ¡Inténtalo de nuevo!');
        }

        // Incrementar el contador de preguntas
        setQuestionCount(prevCount => {
          const newCount = prevCount + 1;
          if (newCount < 10) {
            createNewQuestion.call(this);
          } else {
            setFeedback('Fin del juego. Has respondido 10 preguntas.');
            onGameEnd(); // Notificar que el juego ha terminado
          }
          return newCount;
        });
      }, 1000); // Reducir el tiempo 
    }

    function update() { }

    return () => {
      game.destroy(true);
    };
  }, [setFeedback, setScore, setQuestionCount, questionCount, onGameEnd]);

  return (
    <div id="game-container" className="w-[800px] h-[600px] relative shadow-lg rounded-lg overflow-hidden mx-auto mt-8"></div>
  );
};

export default Game2;
