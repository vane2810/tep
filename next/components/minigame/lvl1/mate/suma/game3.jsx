// Juego de Caza de Números
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Phaser from 'phaser';

const Game3 = ({ updateFeedback, updateScore, endGame, updateQuestionCount }) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Memoización de las funciones pasadas como props para evitar reinicios innecesarios del juego
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
        // Cargar cualquier imagen o recurso necesario
      }

      create() {
        this.cameras.main.setBackgroundColor('#acd0ef'); // Cambiar el color de fondo de la escena

        this.grid = [];
        this.selectedNumbers = [];
        this.targetSum = Phaser.Math.Between(10, 18); // Número objetivo aleatorio para la suma
        this.canSelect = true;

        this.generateNewQuestion();
        
        // Mostrar el número objetivo al jugador
        this.targetSumText = this.add.text(400, 50, `Encuentra números que sumen ${this.targetSum}`, {
          fontSize: '24px',
          fill: '#000000'
        }).setOrigin(0.5);

        // Botón para pasar a la siguiente pregunta
        this.nextQuestionButton = this.add.text(400, 450, 'Siguiente Pregunta', {
          fontSize: '24px',
          fill: '#ffffff',
          backgroundColor: '8e7cc3',
          padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive();

        this.nextQuestionButton.on('pointerdown', () => {
          this.moveToNextQuestion();
        });

        // Inicialmente ocultar el botón de "Siguiente Pregunta"
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
        // Crear el texto del número y asegurarse de que es visible
        const numberText = this.add.text(x, y, number, {
          fontSize: '32px',
          fill: '#ffffff',
          backgroundColor: '#ff0000', // Asegurar visibilidad
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

        const sum = this.selectedNumbers.reduce((acc, curr) => acc + curr, 0);

        if (sum === this.targetSum) {
          memoizedUpdateFeedback('¡Correcto! Has encontrado una combinación que suma al objetivo.');
          memoizedUpdateScore(prevScore => prevScore + 25); // Aumentar el puntaje en 25 por respuesta correcta
          this.canSelect = false; // Evitar más selecciones hasta mostrar el feedback

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
              this.input.enabled = false; // Desactivar la entrada del usuario
              setTimeout(() => {
                memoizedEndGame(); // Llama a endGame después de un ligero retraso para asegurar que el feedback se muestra
              }, 500);
            }

            return newCount;
          });
        } else if (sum > this.targetSum) {
          memoizedUpdateFeedback('La suma excede el objetivo. Inténtalo de nuevo.');
          this.resetSelection();
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
        this.canSelect = true; // Permitir nuevas selecciones
      }

      moveToNextQuestion() {
        this.cleanUpScene();
        this.generateNewQuestion();
        this.targetSum = Phaser.Math.Between(10, 18); // Generar nuevo número objetivo
        this.targetSumText.setText(`Encuentra números que sumen ${this.targetSum}`);
        this.nextQuestionButton.setVisible(false); // Ocultar el botón de "Siguiente Pregunta"
      }

      cleanUpScene() {
        // Limpiar los elementos de la escena antes de generar la nueva pregunta
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
        {/* El juego se renderiza aquí */}
      </div>
    </div>
  );
};

export default Game3;
