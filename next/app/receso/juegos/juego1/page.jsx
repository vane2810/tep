"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import Volver from '@/components/elements/botonVolver';

const CazaDeMonstruos = () => {
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
      this.load.image('monster1', '/img/receso/juego1/m1.png');
      this.load.image('monster2', '/img/receso/juego1/m2.png');
      this.load.image('monster3', '/img/receso/juego1/m3.png');
      this.load.image('monster4', '/img/receso/juego1/m4.png');
      this.load.image('monster5', '/img/receso/juego1/m5.png');
      this.load.image('background', '/img/receso/juego1/fondoj1.jpg');
    }

    function create() {
      const bg = this.add.image(0, 0, 'background');
      bg.setOrigin(0, 0);
      bg.displayWidth = this.sys.canvas.width;
      bg.displayHeight = this.sys.canvas.height;

      this.monsters = this.physics.add.group();
      this.maxMonsters = 10;
      this.spawnInterval = 1000;

      this.score = 0;
      this.spawnMonster = spawnMonster.bind(this);
      this.spawnMonster();

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              // Condición de victoria o derrota al acabar el tiempo
              if (score >= 200) {
                setIsGameWon(true);
              } else {
                setIsGameLost(true);
              }
              this.time.removeAllEvents();
              return 0;
            }
            return prevTime - 1;
          });
        },
        loop: true,
      });
    }

    function spawnMonster() {
      if (this.monsters.countActive(true) < this.maxMonsters) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(300, 550);

        const monsterTypes = ['monster1', 'monster2', 'monster3', 'monster4', 'monster5'];
        const randomMonster = Phaser.Utils.Array.GetRandom(monsterTypes);

        const monster = this.monsters.create(x, y, randomMonster).setInteractive();
        const randomScale = Phaser.Math.FloatBetween(0.2, 0.5);
        monster.setScale(randomScale);

        const disappearTime = Phaser.Math.Between(200, 1500);

        monster.on('pointerdown', () => {
          const points = randomScale > 0.3 ? 20 : 10;
          setScore((prevScore) => prevScore + (Math.random() > 0.2 ? points : -15));
          monster.destroy();
        });

        this.time.delayedCall(disappearTime, () => {
          if (monster.active) monster.destroy();
        });
      }

      this.spawnInterval = 1000 - Math.min(500, Math.floor(this.score / 50) * 100);
      this.time.delayedCall(this.spawnInterval, this.spawnMonster, [], this);
    }

    function update() {
      if (score >= 200 && !isGameWon && !isGameLost) {
        setIsGameWon(true);
        this.time.removeAllEvents();
        this.monsters.clear(true, true);
      }
    }

    return () => {
      game.destroy(true);
    };
  }, [isGameStarted, score]);

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
    <div className="relative flex flex-col items-center bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 px-4 min-h-screen yagora">
      <div className="top-4 left-4 absolute">
        <Volver href="/receso/juegos" />
      </div>

      {/* Título del Juego */}
      <h1 className="mt-16 mb-8 font-bold text-4xl text-purple-700">Caza de Monstruos</h1>

      {/* Imagen Decorativa Debajo del Título */}
      <div className="mb-8">
        <img src="/img/receso/juego1/decoracionj1.png" alt="Decoración" className="mx-auto w-24 h-24" />
      </div>

      <div className="flex items-center space-x-8 mb-8">
        {/* Puntaje y Temporizador */}
        <div className="bg-purple-700 px-6 py-3 rounded-full text-lg text-white">
          Puntaje: {score}
        </div>
        <div className="bg-red-700 px-6 py-3 rounded-full text-lg text-white">
          Tiempo: {timeLeft}s
        </div>
      </div>

      <div
        ref={gameContainerRef}
        className={`w-full max-w-2xl h-[600px] bg-white shadow-2xl border-4 border-purple-500 rounded-lg overflow-hidden relative mb-12 ${
          (isGameWon || isGameLost) && 'backdrop-blur-sm'
        }`}
        style={{
          height: "600px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {!isGameStarted && !isGameWon && !isGameLost && (
          <div className="z-10 absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <button
              onClick={handleStartGame}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-bold text-2xl text-white"
            >
              Iniciar Juego
            </button>
          </div>
        )}

        {isGameWon && (
          <div className="z-20 absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 text-white">
            <h2 className="mb-6 font-bold text-4xl">¡Lo lograste!</h2>
            <button
              onClick={handleRestartGame}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-bold text-2xl"
            >
              Volver a Jugar
            </button>
          </div>
        )}

        {isGameLost && (
          <div className="z-20 absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 text-white">
            <h2 className="mb-6 font-bold text-4xl">¡Perdiste!</h2>
            <button
              onClick={handleRestartGame}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-2xl"
            >
              Volver a Intentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CazaDeMonstruos;
