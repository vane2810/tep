"use client";

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

const CuadradoEscapista = () => {
  const gameContainerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Tiempo limitado a 60 segundos para el juego

  useEffect(() => {
    if (!isGameStarted) return;

    let game;
    let player;
    let cursors;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainerRef.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    game = new Phaser.Game(config);

    function preload() {
      this.load.image('square', '/img/receso/juego3/cuadro.png');  // Imagen del cuadrado
      this.load.image('obstacle1', '/img/receso/juego3/ob1.png');  // Primer tipo de obstáculo
      this.load.image('obstacle2', '/img/receso/juego3/ob2.png');  // Segundo tipo de obstáculo
      this.load.image('obstacle3', '/img/receso/juego3/ob3.png');  // Tercer tipo de obstáculo
      this.load.image('background', '/img/receso/juego3/fondoj3.jpg');  // Fondo del juego
    }

    function create() {
      this.add.image(400, 300, 'background').setOrigin(0.5, 0.5).setDisplaySize(800, 600);

      player = this.physics.add.sprite(400, 300, 'square').setScale(0.3); // Cuadro más pequeño
      player.setCollideWorldBounds(true);

      cursors = this.input.keyboard.createCursorKeys();

      const obstacles = this.physics.add.group();

      this.obstacleTimer = this.time.addEvent({
        delay: 2000,  // Comienza con un obstáculo cada 2 segundos
        callback: () => spawnObstacle(this, obstacles),
        loop: true,
      });

      this.gameTimer = this.time.addEvent({
        delay: 1000,
        callback: () => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              setIsGameWon(true);
              game.scene.pause();
              return 0;
            }

            // Aumentar la dificultad 10 segundos antes de que termine el tiempo
            if (prevTime <= 11) {
              this.obstacleTimer.delay = 1000; // Reducir el intervalo de aparición de obstáculos
              obstacles.children.iterate((obstacle) => {
                obstacle.setVelocityY(obstacle.body.velocity.y * 1.5); // Aumentar la velocidad de los obstáculos
              });
            }

            return prevTime - 1;
          });

          // Incrementar la dificultad reduciendo el delay
          if (this.obstacleTimer.delay > 600) {
            this.obstacleTimer.delay -= 30;
          }
        },
        loop: true,
      });

      this.physics.add.collider(player, obstacles, endGame, null, this);
    }

    function spawnObstacle(scene, obstacles) {
      const x = Phaser.Math.Between(50, 750);
      const typeIndex = Phaser.Math.Between(1, 3);
      const obstacle = obstacles.create(x, 0, `obstacle${typeIndex}`).setScale(0.1); // Obstáculos más pequeños
      obstacle.setVelocityY(Phaser.Math.Between(100, 200));
    }

    function endGame() {
      setIsGameLost(true);
      game.scene.pause();
    }

    function update() {
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
      } else {
        player.setVelocityX(0);
      }

      if (cursors.up.isDown) {
        player.setVelocityY(-160);
      } else if (cursors.down.isDown) {
        player.setVelocityY(160);
      } else {
        player.setVelocityY(0);
      }
    }

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, [isGameStarted]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    setIsGameLost(false);
    setIsGameWon(false);
    setTimeLeft(60);
  };

  const handleRestartGame = () => {
    setIsGameStarted(false);
    setTimeout(handleStartGame, 500);
  };

  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 relative px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Cuadrado Escapista</h1>

      {/* Imagen Decorativa */}
      <div className="mb-4">
        <img src="/img/receso/juego3/decoracionj3.png" alt="Decoración" className="w-24 h-24 mx-auto" />
      </div>

      <div className="flex items-center space-x-6 mb-4">
        <div className="bg-blue-700 text-white px-4 py-2 rounded-full text-lg">
          Tiempo: {timeLeft}s
        </div>
      </div>

      <div
        ref={gameContainerRef}
        className={`w-full max-w-2xl h-[600px] bg-white shadow-2xl border-4 border-blue-500 rounded-lg overflow-hidden relative ${
          (isGameLost || isGameWon) && 'backdrop-blur-sm'
        }`}
      >
        {!isGameStarted && !isGameLost && !isGameWon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <button
              onClick={handleStartGame}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-2xl font-bold hover:bg-blue-700"
            >
              Iniciar Juego
            </button>
          </div>
        )}

        {isGameLost && !isGameWon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white z-20">
            <h2 className="text-4xl font-bold mb-4">¡Perdiste!</h2>
            <button
              onClick={handleRestartGame}
              className="px-8 py-4 bg-red-600 rounded-lg text-2xl font-bold hover:bg-red-700"
            >
              Volver a Intentar
            </button>
          </div>
        )}

        {isGameWon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white z-20">
            <h2 className="text-4xl font-bold mb-4">¡Felicidades lo lograste!</h2>
            <button
              onClick={handleRestartGame}
              className="px-8 py-4 bg-blue-600 rounded-lg text-2xl font-bold hover:bg-blue-700"
            >
              Volver a Jugar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CuadradoEscapista;

