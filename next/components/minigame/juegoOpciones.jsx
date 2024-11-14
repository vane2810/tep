import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const JuegoOpciones = ({ gameData, currentScene, puntos }) => {
  const [gameInstance, setGameInstance] = useState(null);

  useEffect(() => {
    // Verificar si `gameData` está bien estructurado
    console.log("Game Data recibido:", gameData);

    // Destruir cualquier instancia anterior de Phaser
    if (gameInstance) {
      gameInstance.destroy(true);
      setGameInstance(null);
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
      if (!gameData || !gameData.questions || gameData.questions.length === 0) {
        console.error("Las preguntas no están definidas en `gameData`.");
        return;
      }
    
      const { text, options, correct } = gameData.questions[currentScene] || {};

      if (!text || !options) {
        console.error("Pregunta o opciones no definidas en la pregunta actual.");
        return;
      }

      this.add.text(400, 50, text, {
        fontSize: '22px',
        fill: '#ffffff',
        align: 'center',
        wordWrap: { width: 700 },
        backgroundColor: '#7966ab',
        padding: { x: 20, y: 10 },
        fontWeight: 'bold'
      }).setOrigin(0.5);

      options.forEach((option, index) => {
        const yPosition = 150 + (index * 50);
        const button = this.add.text(400, yPosition, option, {
          fontSize: '22px',
          fill: '#000000',
          backgroundColor: '#ffffff',
          padding: { x: 10, y: 5 },
        }).setInteractive().setOrigin(0.5);

        button.on('pointerdown', () => checkAnswer(index, button, correct));
      });
    }

    function checkAnswer(selectedIndex, button, correctIndex) {
      let feedbackMessage = '';

      if (selectedIndex === correctIndex) {
        feedbackMessage = `¡Correcto! La respuesta es: ${gameData.questions[currentScene].options[selectedIndex]}`;
      } else {
        feedbackMessage = `Incorrecto. La respuesta correcta es: ${gameData.questions[currentScene].options[correctIndex]}`;
      }

      console.log(feedbackMessage);
    }

    return () => {
      if (gameInstance) {
        gameInstance.destroy(true);
      }
    };
  }, [gameData, currentScene, puntos]);

  return <div id="game-container" className="relative shadow-lg mx-auto mt-8 rounded-lg w-[800px] h-[325px] overflow-hidden"></div>;
};

export default JuegoOpciones;
