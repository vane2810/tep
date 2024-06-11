// Juego 3 - Nivel 1 - Div - Caza de Números con División
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, endGame, updateQuestionCount }) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const memoizedUpdateFeedback = useCallback(updateFeedback, []);
  const memoizedUpdateScore = useCallback(updateScore, []);
  const memoizedEndGame = useCallback(endGame, []);
  const memoizedUpdateQuestionCount = useCallback(updateQuestionCount, []);

  useEffect(() => {
    class NumberHuntScene extends Phaser.Scene {
      constructor() {
        super({ key: 'NumberHuntScene' });
      }

      preload() {
        // Aquí puedes cargar imágenes o recursos si los necesitas
      }

      create() {
        this.cameras.main.setBackgroundColor('#acd0ef'); // Cambiar el color de fondo de la escena

        this.grid = [];
        this.selectedNumbers = [];
        this.targetQuotient = Phaser.Math.Between(1, 9); // Cociente objetivo aleatorio
        this.canSelect = true;

        this.generateNewQuestion();
        
        // Mostrar el cociente objetivo al jugador
        this.targetQuotientText = this.add.text(400, 50, `Encuentra dos números cuya división sea ${this.targetQuotient}`, {
          fontSize: '24px',
          fill: '#000000'
        }).setOrigin(0.5);

        // Botón para pasar a la siguiente pregunta
        this.nextQuestionButton = this.add.text(400, 450, 'Siguiente Pregunta', {
          fontSize: '24px',
          fill: '#ffffff',
          backgroundColor: '#8e7cc3',
          padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        this.nextQuestionButton.on('pointerdown', () => {
          this.moveToNextQuestion();
        });

        // Ocultar el botón de "Siguiente Pregunta"
        this.nextQuestionButton.setVisible(false);
      }

      generateNewQuestion() {
        // Limpiar la cuadrícula y restablecer las selecciones
        if (this.grid) {
          this.grid.forEach(numberText => numberText.destroy());
        }
        this.grid = [];
        this.selectedNumbers = [];

        // Generar una cuadrícula de números aleatorios
        const numbers = Phaser.Utils.Array.NumberArray(1, 9);
        const pairedNumbers = numbers.concat(numbers.slice(0, 3)); // Duplicar números y tomar solo 3 más para un total de 12
        Phaser.Utils.Array.Shuffle(pairedNumbers); // Mezclar las tarjetas

        let index = 0;
        for (let i = 0; i < 12; i++) {
          const x = 150 + (i % 6) * 100;
          const y = 200 + Math.floor(i / 6) * 150;
          const number = pairedNumbers[index % pairedNumbers.length];
          this.createNumber(x, y, number);
          index++;
        }
      }

      createNumber(x, y, number) {
        // Crea el texto del número 
        const numberText = this.add.text(x, y, number, {
          fontSize: '32px',
          fill: '#ffffff',
          backgroundColor: '#51a4e3', 
          padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        console.log(`Número creado: ${number} en posición (${x}, ${y})`);

        numberText.setData('number', number);
        numberText.setData('selected', false);

        numberText.on('pointerdown', () => {
          if (this.canSelect && !gameCompleted) {
            this.selectNumber(numberText);
          }
        });

        this.grid.push(numberText);
      }

      selectNumber(numberText) {
        if (numberText.getData('selected')) {
          return;
        }

        const number = numberText.getData('number');
        this.selectedNumbers.push(number);
        numberText.setData('selected', true);
        numberText.setStyle({ fill: '#00ff00' }); // Cambiar el color al seleccionar

        if (this.selectedNumbers.length === 2) {
          const [num1, num2] = this.selectedNumbers;
          const quotient = Math.floor(num1 / num2); // Calcular el cociente

          if (quotient === this.targetQuotient) {
            memoizedUpdateFeedback('¡Correcto! Has encontrado una combinación que cumple con la división objetivo.');
            memoizedUpdateScore(prevScore => prevScore + 25); // Aumentar el puntaje en 25 
            this.canSelect = false; 

            // Actualizar el contador de preguntas
            setQuestionCount(prevCount => {
              const newCount = prevCount + 1;
              memoizedUpdateQuestionCount(newCount);

              // Mostrar el botón de "Siguiente Pregunta" solo si no es la última pregunta
              if (newCount < 8) {
                this.nextQuestionButton.setVisible(true);
              } else {
                // Si es la última pregunta, marcar el juego como completado
                memoizedUpdateFeedback('¡Felicidades! Has completado las 8 preguntas.');
                setGameCompleted(true);
                // Detener las interacciones y dejar la escena visible para mostrar el mensaje final
                this.input.enabled = false; 
                setTimeout(() => {
                  memoizedEndGame(); 
                }, 500);
              }

              return newCount;
            });
          } else {
            memoizedUpdateFeedback('El cociente no es correcto. Inténtalo de nuevo.');
            this.resetSelection();
          }
        }
      }

      resetSelection() {
        this.selectedNumbers = [];
        this.grid.forEach(numberText => {
          if (numberText) {
            numberText.setData('selected', false);
            numberText.setStyle({ fill: '#ffffff' });
          }
        });
        this.canSelect = true; 
      }

      moveToNextQuestion() {
        this.cleanUpScene();
        this.generateNewQuestion();
        this.targetQuotient = Phaser.Math.Between(1, 9); // Nuevo número objetivo para el cociente
        this.targetQuotientText.setText(`Encuentra dos números cuya división sea ${this.targetQuotient}`);
        this.nextQuestionButton.setVisible(false); 
      }

      cleanUpScene() {
        // Limpiar los elementos de la escena 
        if (this.grid) {
          this.grid.forEach(numberText => numberText.destroy());
        }
        this.selectedNumbers = [];
        this.canSelect = true;
      }
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 500,
      parent: 'game-container',
      scene: NumberHuntScene,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [memoizedUpdateFeedback, memoizedUpdateScore, memoizedEndGame, memoizedUpdateQuestionCount, gameCompleted]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <div id="game-container" style={{ width: '800px', height: '600px', position: 'relative', zIndex: 0 }}>
        {gameCompleted && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <h2>¡Felicidades! Has completado las 8 preguntas.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game3;
