"use client";
import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';

const Game1 = ({ gameData }) => {
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
        update: update,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);
    setGameInstance(game);

    function preload() {
      this.load.image('background', gameData.backgroundImage);
    }

    function createScene() {
      const background = this.add.image(400, 150, 'background');
      background.setDisplaySize(config.width, config.height);
    }

    function update() {}

    return () => {
      if (gameInstance) {
        gameInstance.destroy(true);
      }
    };
  }, [gameData]);

  return <div id="game-container" className="w-[800px] h-[300px]"></div>;
};

export default Game1;
