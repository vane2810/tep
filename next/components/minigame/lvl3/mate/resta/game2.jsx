// Juego 2 - Resta - Mate - Nivel 1 - Arcade
"use client"
import React, { useEffect } from 'react';
import Phaser from 'phaser';

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
    
      // Generar el minuendo y el sustraendo asegurando que num1 >= num2
      const num1 = Phaser.Math.Between(10, 99); // Asegurar que num1 tiene al menos dos dígitos para hacer las preguntas más variadas
      const num2 = Phaser.Math.Between(1, num1); // Asegurar que num2 siempre es menor o igual a num1
      const result = num1 - num2;
    
      correctAnswer = result; // Respuesta correcta
    
      // Mostrar la pregunta
      this.questionBox && this.questionBox.destroy();
      this.questionBox = this.add.rectangle(400, 80, 700, 60, 0x5fb2e6).setAlpha(0.8);
      this.questionText && this.questionText.destroy();
      this.questionText = this.add.text(400, 80, `¿Cuál es el resultado de esta resta?`, { fontSize: '32px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);
    
      // Mostrar los números a restar
      const backgroundRectSum = this.add.rectangle(395, 200, 230, 150, 0x5fb2e6).setAlpha(0.8);
      this.unitsText1 && this.unitsText1.destroy();
      this.tensText1 && this.tensText1.destroy();
      this.unitsText2 && this.unitsText2.destroy();
      this.tensText2 && this.tensText2.destroy();
      this.unitsText3 && this.unitsText3.destroy();
      this.tensText3 && this.tensText3.destroy();
      this.unitsText1 = this.add.text(420, 150, `U`, { fontSize: '35px', fill: '#ffffff' });
      this.tensText1 = this.add.text(370, 150, `D`, { fontSize: '35px', fill: '#ffffff' });
      this.unitsText2 = this.add.text(420, 190, `${num1 % 10}`, { fontSize: '32px', fill: '#ffffff' });
      this.tensText2 = this.add.text(370, 190, `${Math.floor(num1 / 10)}`, { fontSize: '32px', fill: '#ffffff' });
      this.unitsText3 = this.add.text(420, 230, `${num2 % 10}`, { fontSize: '32px', fill: '#ffffff' });
      this.tensText3 = this.add.text(370, 230, `${Math.floor(num2 / 10)}`, { fontSize: '32px', fill: '#ffffff' });
    
      // Contenedor de los textos
      this.add.group([backgroundRectSum, this.unitsText1, this.tensText1, this.unitsText2, this.tensText2, this.unitsText3, this.tensText3]);
    
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
          if (newCount <= 10) {
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
