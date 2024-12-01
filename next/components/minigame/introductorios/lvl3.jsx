// Juego intro Nivel 3
"use client";
import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';

const CoinCollectingGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      class GameScene extends Phaser.Scene {
        constructor() {
          super({ key: 'GameScene' });
          this.isGameOver = false;
          this.gameDuration = 60000; 
        }

        preload() {
          this.load.image('background', '/img/games/intro/background2.jpg'); 
          this.load.image('player', '/img/games/intro/player.png'); 
          this.load.image('coin', '/img/games/intro/coin.png'); 
          this.load.image('obstacle', '/img/games/intro/obstacle2.png'); 
        }

        create() {
          this.add.image(400, 300, 'background').setDisplaySize(800, 600);

          this.player = this.physics.add.sprite(400, 550, 'player').setScale(0.3); 
          this.player.setCollideWorldBounds(true); 

          this.cursors = this.input.keyboard.createCursorKeys(); 

          // Inicializar los grupos de monedas y obstáculos
          this.coins = this.physics.add.group({
            defaultKey: 'coin',
            maxSize: 150 
          });
          this.obstacles = this.physics.add.group({
            defaultKey: 'obstacle',
            maxSize: 30
          });

          this.score = 0; // Puntuación inicial
          this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

          //Monedas cada segundo
          this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.addCoin,
            callbackScope: this,
            loop: true
          });

          // Obstáculos cada dos segundos
          this.obstacleTimer = this.time.addEvent({
            delay: 2000,
            callback: this.addObstacle,
            callbackScope: this,
            loop: true
          });

          this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
          
          this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

          this.player.setSize(this.player.width * 0.7, this.player.height * 0.7, true);

          // Temporizador para finalizar el juego
          this.gameOverTimer = this.time.addEvent({
            delay: this.gameDuration,
            callback: () => this.endGame(true),
            callbackScope: this
          });

          this.time.addEvent({
            delay: 60000,
            callback: this.increaseDifficulty,
            callbackScope: this
          });
        }

        update() {
          if (!this.isGameOver) {
            // Movimiento del jugador
            if (this.cursors.left.isDown) {
              this.player.setVelocityX(-200);
            } else if (this.cursors.right.isDown) {
              this.player.setVelocityX(200);
            } else {
              this.player.setVelocityX(0);
            }
          }
        }
        //Configuracion de la moneda
        addCoin() {
          if (!this.isGameOver) {
            const x = Phaser.Math.Between(50, 750); 
            const coin = this.coins.create(x, 0, 'coin').setScale(0.15); 
            coin.setVelocityY(this.coinSpeed || 200); 
          }
        }
        //Configuracion del obstaculo
        addObstacle() {
          if (!this.isGameOver) {
            const x = Phaser.Math.Between(50, 750); 
            const obstacle = this.obstacles.create(x, 0, 'obstacle').setScale(0.2); 
            obstacle.setVelocityY(this.obstacleSpeed || 300);
            obstacle.setSize(obstacle.width * 0.7, obstacle.height * 0.7, true);
          }
        }

        collectCoin(player, coin) {
          coin.disableBody(true, true); 
          this.score += 10; 
          this.scoreText.setText('Score: ' + this.score); 
        }

        hitObstacle(player, obstacle) {
          if (!this.isGameOver) {
            this.endGame(false);
          }
        }

        increaseDifficulty() {
          this.coinSpeed = 300;
          this.obstacleSpeed = 400;
        }

        endGame(isTimeUp) {
          this.isGameOver = true;
          this.physics.pause();
          this.player.setTint(0xff0000); 
          this.timer.remove();
          this.obstacleTimer.remove();

          const endMessage = isTimeUp ? '¡Genial! Lograste recolectar todas las monedas' : '¡Perdiste!';
          const messageColor = isTimeUp ? '#fff' : '#000';
          this.add.text(400, 300, endMessage, { fontSize: '40px', fill: messageColor, fontWeight: 'bold' }).setOrigin(0.5);

          const buttonText = isTimeUp ? 'Volver a jugar' : 'Reiniciar';
          const buttonStyle = {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#28a745',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            shadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          };

          
          const restartButtonContainer = this.add.container(400, 400).setDepth(1); 

          
          const buttonBackground = this.add.rectangle(0, 0, 200, 50, 0x28a745)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => buttonBackground.setFillStyle(0x218838))
            .on('pointerout', () => buttonBackground.setFillStyle(0x28a745))
            .on('pointerdown', () => {
              this.scene.restart(); 
              this.isGameOver = false; 
              this.score = 0; 
            });

          
          const buttonTextObj = this.add.text(0, 0, buttonText, {
            fontSize: '24px',
            fill: '#fff',
          }).setOrigin(0.5);

          
          restartButtonContainer.add(buttonBackground);
          restartButtonContainer.add(buttonTextObj);
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
      };

      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return <div ref={gameRef} className="w-full h-full"></div>;
};

export default CoinCollectingGame;
