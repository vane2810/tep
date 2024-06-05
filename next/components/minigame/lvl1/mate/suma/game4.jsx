"use client";

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Home = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true // Activar el modo de depuración para ver colisiones
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('space', '/assets/space.png'); // Fondo del espacio
    }

    function create() {
      // Fondo del espacio
      this.add.image(400, 300, 'space');

      // Crear la nave espacial
      this.ship = this.add.graphics();
      this.ship.fillStyle(0xff0000, 1);
      this.ship.fillTriangle(0, -15, -10, 15, 10, 15);
      const shipTexture = this.ship.generateTexture('ship', 20, 30);
      this.ship.destroy();
      this.ship = this.physics.add.sprite(400, 300, 'ship');
      this.ship.setCollideWorldBounds(true);

      // Crear estrellas
      this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
      });

      this.stars.children.iterate((child) => {
        child.y = Phaser.Math.Between(50, 550);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        // Dibujar estrella
        child.setTexture(this.add.graphics().fillStyle(0xffff00, 1).fillCircle(10, 10, 10).generateTexture('star', 20, 20));
      });

      // Hacer que la nave colisione con las estrellas
      this.physics.add.overlap(this.ship, this.stars, collectStar, null, this);

      // Crear controles de teclado
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      if (this.cursors.left.isDown) {
        this.ship.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.ship.setVelocityX(200);
      } else {
        this.ship.setVelocityX(0);
      }

      if (this.cursors.up.isDown) {
        this.ship.setVelocityY(-200);
      } else if (this.cursors.down.isDown) {
        this.ship.setVelocityY(200);
      } else {
        this.ship.setVelocityY(0);
      }
    }

    function collectStar(ship, star) {
      star.disableBody(true, true);
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #000;
          color: #fff;
        }

        h1 {
          margin: 0;
          font-size: 4rem;
        }

        .game-container {
          width: 800px;
          height: 600px;
        }
      `}</style>
      <div className="container">
        <h1>Aventura Espacial</h1>
        <div ref={gameContainer} className="game-container" />
      </div>
    </div>
  );
};

export default Home;
