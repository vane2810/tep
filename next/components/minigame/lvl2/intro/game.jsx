//Juego intro Nivel 2
"use client";
"use client";
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      class GameScene extends Phaser.Scene {
        constructor() {
          super({ key: 'GameScene' });
          this.isGameOver = false;
        }

        preload() {
          this.load.image('space', '/img/games/mate/ob/space.png');
          this.load.image('ship', '/img/games/mate/ob/ship.png');
          this.load.image('asteroid', '/img/games/mate/ob/asteroid.png');
          this.load.image('astronaut', '/img/games/mate/ob/astronaut.png');
          this.load.image('gameover', '/img/games/mate/ob/gameover.png');
        }

        create() {
          this.space = this.add.tileSprite(400, 300, 800, 600, 'space');
          this.ship = this.physics.add.sprite(100, 300, 'ship').setScale(0.3);
          this.ship.setCollideWorldBounds(true);

          this.cursors = this.input.keyboard.createCursorKeys();
          this.asteroids = this.physics.add.group();

          this.score = 0;
          this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

          this.timer = this.time.addEvent({
            delay: 1500,
            callback: this.addAsteroid,
            callbackScope: this,
            loop: true
          });

          this.gameOverTimer = this.time.delayedCall(120000, () => {
            if (!this.isGameOver) {
              this.endGame(true);
            }
          });

          this.physics.add.overlap(this.ship, this.asteroids, this.hitAsteroid, null, this);
        }

        update() {
          if (!this.isGameOver) {
            if (this.cursors.up.isDown && this.ship.y > 50) {
              this.ship.setVelocityY(-200);
            } else if (this.cursors.down.isDown && this.ship.y < 550) {
              this.ship.setVelocityY(200);
            } else {
              this.ship.setVelocityY(0);
            }

            this.space.tilePositionX += 2;

            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);
          }
        }

        addAsteroid() {
          if (!this.isGameOver) {
            const y = Phaser.Math.Between(50, 550);
            const asteroid = this.asteroids.create(800, y, 'asteroid').setScale(0.15);
            asteroid.setVelocityX(-Phaser.Math.Between(100, 200));
          }
        }

        hitAsteroid(ship, asteroid) {
          if (!this.isGameOver) {
            this.physics.pause();
            ship.setTint(0xff0000);
            this.endGame(false);
          }
        }

        endGame(isTimeUp) {
          this.isGameOver = true;
          this.asteroids.clear(true, true);
          this.timer.remove();

          this.gameOverImage = this.add.image(400, 350, 'gameover').setScale(0.5);
          this.gameOverText = this.add.text(400, 250, isTimeUp ? 'Game Over' : '¡Perdiste!', { fontSize: '48px', fill: '#fff' })
            .setOrigin(0.5);

          this.restartButton = this.add.text(400, 450, 'Volver a jugar', { fontSize: '24px', fill: '#000', backgroundColor: '#fff' })
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive()
            .on('pointerdown', () => {
              this.scene.restart();
              this.isGameOver = false;
              this.score = 0;
            });
        }
      }

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: GameScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      };

      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return <div id="phaser-game" ref={gameRef} className="w-full h-full flex justify-center items-center"></div>;
};

export default Game;

