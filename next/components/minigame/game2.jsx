//game 2 - "Operaciones" seleccionar pero con cantidades al azar (recomendado para mate nada más)
"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game2 = ({ gameData, currentScene, updateScore, updateFeedback, proceedToNextScene }) => {
  const [gameInstance, setGameInstance] = useState(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 300,
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
      this.load.image('background', gameData.imageUrl || '/img/games/mate/ob/game1.jpg');
    }

    function createScene() {
      const background = this.add.image(400, 150, 'background');
      background.setDisplaySize(config.width, config.height);

      // Generar una pregunta aleatoria para esta escena
      generateRandomQuestion.call(this);
    }

    function generateRandomQuestion() {
      const { rangoNumeros, tiposOperaciones } = gameData;
      const numero1 = Math.floor(Math.random() * (rangoNumeros.max - rangoNumeros.min + 1)) + rangoNumeros.min;
      const numero2 = Math.floor(Math.random() * (rangoNumeros.max - rangoNumeros.min + 1)) + rangoNumeros.min;
      const operacion = tiposOperaciones[Math.floor(Math.random() * tiposOperaciones.length)];

      let pregunta = "";
      let respuestaCorrecta = 0;

      // Generar pregunta y respuesta correcta basadas en el tipo de operación
      if (operacion === "suma") {
        pregunta = `${numero1} + ${numero2}`;
        respuestaCorrecta = numero1 + numero2;
      } else if (operacion === "resta") {
        pregunta = `${numero1} - ${numero2}`;
        respuestaCorrecta = numero1 - numero2;
      } else if (operacion === "multiplicacion") {
        pregunta = `${numero1} x ${numero2}`;
        respuestaCorrecta = numero1 * numero2;
      }

      this.add.text(400, 50, pregunta, {
        fontSize: '22px',
        fill: '#ffffff',
        align: 'center',
        backgroundColor: '#7966ab',
        padding: { x: 20, y: 10 },
        fontWeight: 'bold'
      }).setOrigin(0.5);

      // Generar opciones de respuesta (incluyendo la correcta y otras dos incorrectas)
      const opciones = generateRandomOptions(respuestaCorrecta);

      // Mostrar las opciones como botones interactivos
      opciones.forEach((opcion, index) => {
        const button = this.add.text(160 + (index * 120), 150, opcion.toString(), {
          fontSize: '28px',
          fill: '#000000',
          backgroundColor: '#ffffff',
          padding: { x: 10, y: 5 }
        }).setInteractive().setOrigin(0.5);

        button.on('pointerdown', () => checkAnswer(opcion, button, respuestaCorrecta));
      });
    }

    function generateRandomOptions(correct) {
      const opciones = [correct];
      while (opciones.length < 3) {
        const randomOption = correct + Math.floor(Math.random() * 10) - 5;
        if (!opciones.includes(randomOption)) {
          opciones.push(randomOption);
        }
      }
      return opciones.sort(() => Math.random() - 0.5); // Ordenar al azar
    }

    function checkAnswer(opcionSeleccionada, button, correcta) {
      let feedbackMessage = '';
      let feedbackColor = '';

      if (opcionSeleccionada === correcta) {
        feedbackMessage = `¡Correcto! La respuesta es: ${opcionSeleccionada}`;
        feedbackColor = '#6aa84f'; // Verde para correcto
        updateScore(20); // Asignar puntos arbitrarios, puedes modificarlo
      } else {
        feedbackMessage = `Incorrecto. La respuesta es: ${correcta}`;
        feedbackColor = '#ff0000'; // Rojo para incorrecto
      }

      updateFeedback(feedbackMessage, feedbackColor);
      button.setStyle({ fill: feedbackColor });

      // Pasar a la siguiente escena después de un tiempo
      setTimeout(() => {
        proceedToNextScene();
        if (gameInstance) {
          gameInstance.scene.stop(); // Detener la escena
        }
      }, 1500);
    }

    return () => {
      if (gameInstance) {
        gameInstance.destroy(true);
      }
    };
  }, [gameData, currentScene, updateFeedback, updateScore, proceedToNextScene]);

  return <div id="game-container" className="relative shadow-lg mx-auto mt-8 rounded-lg w-[800px] h-[300px] overflow-hidden"></div>;
};

export default Game2;
