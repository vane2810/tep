// Juego 2 - Div - Mate - Nivel 1 - Arcade
"use client"
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
    
      // Generar el divisor y el cociente
      const divisor = Phaser.Math.Between(1, 9); // El divisor debe ser entre 1 y 9
      const quotient = Phaser.Math.Between(1, 9); // El cociente debe ser entre 1 y 9
      const dividend = divisor * quotient; // Calcular el dividendo
      
      correctAnswer = quotient; // La respuesta correcta es el cociente
    
      // Mostrar la pregunta
      this.questionBox && this.questionBox.destroy();
      this.questionBox = this.add.rectangle(400, 80, 700, 60, 0x5fb2e6).setAlpha(0.8);
      this.questionText && this.questionText.destroy();
      this.questionText = this.add.text(400, 80, `¿Cuál es el resultado de esta división?`, { fontSize: '28px', fill: '#ffffff' });
      this.questionText.setOrigin(0.5);
    
      // Mostrar los números de la división de forma lineal
      const yPosition = 200; // Posición Y para alinear todos los elementos horizontalmente

      this.dividendText && this.dividendText.destroy();
      this.divSymbolText && this.divSymbolText.destroy();
      this.divisorText && this.divisorText.destroy();
      this.equalsSymbolText && this.equalsSymbolText.destroy();
      this.quotientBox && this.quotientBox.destroy();
      
      // Mostrar los elementos de la división de forma lineal
      this.dividendText = this.add.text(200, yPosition, `${dividend}`, { fontSize: '32px', fill: '#ffffff' });
      this.divSymbolText = this.add.text(300, yPosition, `÷`, { fontSize: '32px', fill: '#ffffff' });
      this.divisorText = this.add.text(350, yPosition, `${divisor}`, { fontSize: '32px', fill: '#ffffff' });
      this.equalsSymbolText = this.add.text(450, yPosition, `=`, { fontSize: '32px', fill: '#ffffff' });

      // Añadir un recuadro para la respuesta correcta
      this.quotientBox = this.add.graphics();
      this.quotientBox.fillStyle(0x5fb2e6, 0.8); // Fondo azul claro
      this.quotientBox.fillRect(500, yPosition - 15, 50, 40); // Rectángulo para la respuesta (cociente)

      this.add.text(525, yPosition, '?', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
    
      // Generar una respuesta incorrecta
      let wrongAnswer;
      do {
        wrongAnswer = quotient + Phaser.Math.Between(-3, 3); // Respuesta incorrecta en el rango +-3
      } while (wrongAnswer === quotient || wrongAnswer <= 0); 
    
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
