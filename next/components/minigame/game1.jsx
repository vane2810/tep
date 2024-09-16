// game 1 - Llamado "Seleccionar" se puede reutilizar para todos los niveles y asignaturas

"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game1 = ({ gameData, currentScene, updateScore, updateFeedback, proceedToNextScene, score }) => {
  const [gameInstance, setGameInstance] = useState(null);

  useEffect(() => {
    const limiteEscenas = gameData.limiteEscenas || gameData.escenas.length;  

    if (gameData.escenas.length > limiteEscenas) {
      console.warn(`Hay más preguntas (${gameData.escenas.length}) que el número permitido de escenas (${limiteEscenas}). Solo se utilizarán las primeras ${limiteEscenas} preguntas.`);
    }

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 325,
      parent: 'game-container',
      scene: {
        preload: preload,
        create: createScene,
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
    setGameInstance(game);

    function preload() {
      this.load.image('background', '/img/games/mate/ob/game1.jpg');
    }

    function createScene() {
      const background = this.add.image(400, 162.5, 'background');
      background.setDisplaySize(config.width, config.height);

      generateQuestion.call(this);
    }

    function generateQuestion() {
      const { pregunta, opciones, correcta, puntos } = gameData.escenas[currentScene];
    
      // Ajustar el tamaño del texto según su longitud
      let fontSize = 22;
      if (pregunta.length > 80) {
        fontSize = 16; 
      } else if (pregunta.length > 50) {
        fontSize = 18;
      }

      this.add.text(400, 50, pregunta, {
        fontSize: `${fontSize}px`,
        fill: '#ffffff',
        align: 'center',
        wordWrap: { width: 700 }, 
        backgroundColor: '#7966ab',
        padding: { x: 20, y: 10 },
        fontWeight: 'bold'
      }).setOrigin(0.5);
    
      const numOptions = opciones.length;
      const optionIsLong = opciones.some(option => option.length > 10); 

      // Si alguna opción es larga, colocarlas en fila vertical
      if (optionIsLong) {
        opciones.forEach((opcion, index) => {
          const yPosition = 150 + (index * 50); 
          const button = this.add.text(400, yPosition, opcion, {
            fontSize: '22px', 
            fill: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 700 } 
          }).setInteractive().setOrigin(0.5);
    
          button.on('pointerdown', () => checkAnswer(opcion, button, puntos));
        });
      } else {
        // Mostrar las opciones en fila horizontal si son cortas
        const spacing = 800 / (numOptions + 1);
        opciones.forEach((opcion, index) => {
          const xPosition = spacing * (index + 1);
          const button = this.add.text(xPosition, 150, opcion, {
            fontSize: '28px',
            fill: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 10, y: 5 }
          }).setInteractive().setOrigin(0.5);
    
          button.on('pointerdown', () => checkAnswer(opcion, button, puntos));
        });
      }
    }

    function checkAnswer(opcionSeleccionada, button, puntos) {
      let feedbackMessage = '';
      let feedbackColor = '';

      if (opcionSeleccionada === gameData.escenas[currentScene].correcta) {
        feedbackMessage = `¡Correcto! La respuesta es: ${opcionSeleccionada}`;
        feedbackColor = '#6aa84f'; // Verde para correcto
        updateScore(puntos); // Suma los puntos solo si es correcto
      } else {
        feedbackMessage = `Incorrecto. La respuesta es: ${gameData.escenas[currentScene].correcta}`;
        feedbackColor = '#ff0000'; // Rojo para incorrecto
      }

      updateFeedback(feedbackMessage, feedbackColor);
      button.setStyle({ fill: feedbackColor });

      setTimeout(() => {
        proceedToNextScene(); // Avanza a la siguiente escena
        if (gameInstance) {
          gameInstance.destroy(true); // Destruir el juego para avanzar a la siguiente escena
        }
      }, 1500);
    }

    return () => {
      if (gameInstance) {
        gameInstance.destroy(true);
      }
    };
  }, [gameData, currentScene, updateFeedback, updateScore, proceedToNextScene]);

  return <div id="game-container" className="relative shadow-lg mx-auto mt-8 rounded-lg w-[800px] h-[325px] overflow-hidden"></div>;
};

export default Game1;