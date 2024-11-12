"use client";

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

const RevientaGlobos = () => {
  const gameContainerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25); // Tiempo limitado a 25 segundos

  useEffect(() => {
    if (!isGameStarted) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      parent: gameContainerRef.current,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('balloon1', '/img/receso/juego2/g1.png');
      this.load.image('balloon2', '/img/receso/juego2/g2.png');
      this.load.image('balloon3', '/img/receso/juego2/g3.png');
      this.load.image('balloon4', '/img/receso/juego2/g4.png');
      this.load.image('balloon5', '/img/receso/juego2/g5.png');
      this.load.image('balloon6', '/img/receso/juego2/g6.png');
      this.load.image('background', '/img/receso/juego2/fondoj2.jpg');
    }

    function create() {
      const bg = this.add.image(0, 0, 'background');
      bg.setOrigin(0, 0);
      bg.displayWidth = this.sys.canvas.width;
      bg.displayHeight = this.sys.canvas.height;

      this.balloons = this.physics.add.group();
      this.spawnInterval = 1000;
      this.spawnBalloon = spawnBalloon.bind(this);
      this.spawnBalloon();

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              if (score < 200) setIsGameLost(true); // Si no alcanzaron los 200 puntos
              this.time.removeAllEvents();
              return 0;
            }
            return prevTime - 1;
          });
        },
        loop: true,
      });
    }

    function spawnBalloon() {
      const x = Phaser.Math.Between(50, 750);
      const y = Phaser.Math.Between(600, 800);

      const balloonTypes = ['balloon1', 'balloon2', 'balloon3', 'balloon4', 'balloon5', 'balloon6'];
      const randomBalloon = Phaser.Utils.Array.GetRandom(balloonTypes);

      const balloon = this.balloons.create(x, y, randomBalloon).setInteractive();
      const randomScale = Phaser.Math.FloatBetween(0.5, 1.2); // Escala aleatoria
      balloon.setScale(randomScale);
      balloon.setVelocityY(Phaser.Math.Between(-300, -100)); // Velocidad aleatoria

      balloon.on('pointerdown', () => {
        setScore((prevScore) => {
          const newScore = prevScore + 10;
          if (newScore >= 200 && timeLeft > 0) {
            setIsGameWon(true);
            this.time.removeAllEvents();
            this.balloons.clear(true, true);
          }
          return newScore;
        });
        balloon.destroy();
      });

      this.time.delayedCall(this.spawnInterval, this.spawnBalloon, [], this);
    }

    function update() {
      if (score >= 200 && timeLeft > 0) {
        setIsGameWon(true);
        this.time.removeAllEvents();
        this.balloons.clear(true, true);
      }
    }

    return () => {
      game.destroy(true);
    };
  }, [isGameStarted]);

  const handleStartGame = () => {
    setScore(0);
    setIsGameWon(false);
    setIsGameLost(false);
    setTimeLeft(25); // Reiniciar el tiempo a 25 segundos
    setIsGameStarted(true);
  };

  const handleRestartGame = () => {
    setIsGameStarted(false);
    setIsGameWon(false);
    setIsGameLost(false);
    setTimeout(handleStartGame, 500); // Reiniciar el juego después de 500ms
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 via-red-100 to-yellow-100 relative px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Revienta Globos</h1>

      {/* Imagen Decorativa */}
      <div className="mb-4">
        <img src="/img/receso/juego2/decoracionj2.png" alt="Decoración" className="w-24 h-24 mx-auto" />
      </div>

      <div className="flex items-center space-x-6">
        <div className="bg-red-700 text-white px-4 py-2 rounded-full text-lg">
          Puntaje: {score}
        </div>
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-lg">
          Tiempo: {timeLeft}s
        </div>
      </div>

      <div
        ref={gameContainerRef}
        className={`w-full max-w-2xl h-[600px] bg-white shadow-2xl border-4 border-red-500 rounded-lg overflow-hidden relative ${
          (isGameWon || isGameLost) && 'backdrop-blur-sm'
        }`}
      >
        {!isGameStarted && !isGameWon && !isGameLost && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <button
              onClick={handleStartGame}
              className="px-8 py-4 bg-green-500 text-white rounded-lg text-2xl font-bold hover:bg-red-700"
            >
              Iniciar Juego
            </button>
          </div>
        )}

        {isGameWon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white z-20">
            <h2 className="text-4xl font-bold mb-4">¡Lo lograste!</h2>
            <button
              onClick={handleRestartGame}
              className="px-8 py-4 bg-red-600 rounded-lg text-2xl font-bold hover:bg-red-700"
            >
              Volver a Jugar
            </button>
          </div>
        )}

        {isGameLost && (
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
      </div>
    </div>
  );
};

export default RevientaGlobos;



