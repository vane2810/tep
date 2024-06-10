// JUEGO INTRODUCTORIO 3
"use client";
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const CoinCollectingGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      class GameScene extends Phaser.Scene {
        constructor() {
          super({ key: 'GameScene' });
          this.isGameOver = false;
          this.gameDuration = 60000; // Duración del juego en milisegundos (2 minutos)
        }

        preload() {
          this.load.image('background', '/img/games/mate/ob/background2.jpg'); // Imagen de fondo
          this.load.image('player', '/img/games/mate/ob/player.png'); // Imagen del jugador
          this.load.image('coin', '/img/games/mate/ob/coin.png'); // Imagen de la moneda
          this.load.image('obstacle', '/img/games/mate/ob/obstacle2.png'); // Imagen del obstáculo
        }

        create() {
          // Ajuste del fondo para cubrir toda el área del juego sin repetirse
          this.add.image(400, 300, 'background').setDisplaySize(800, 600);

          // Ajuste del jugador (un poco más pequeño)
          this.player = this.physics.add.sprite(400, 550, 'player').setScale(0.3); // Escalado a 0.3
          this.player.setCollideWorldBounds(true); // El jugador no puede salir de los límites

          this.cursors = this.input.keyboard.createCursorKeys(); // Controles de teclado

          // Inicializar los grupos de monedas y obstáculos
          this.coins = this.physics.add.group({
            defaultKey: 'coin',
            maxSize: 150 // Aumentar el número máximo de monedas a 150
          });
          this.obstacles = this.physics.add.group({
            defaultKey: 'obstacle',
            maxSize: 30
          });

          this.score = 0; // Puntuación inicial
          this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' }); // Texto de la puntuación

          // Añade monedas cada segundo
          this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.addCoin,
            callbackScope: this,
            loop: true
          });

          // Añade obstáculos cada dos segundos
          this.obstacleTimer = this.time.addEvent({
            delay: 2000,
            callback: this.addObstacle,
            callbackScope: this,
            loop: true
          });

          // Detecta colisiones entre el jugador y las monedas
          this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
          // Detecta colisiones entre el jugador y los obstáculos
          this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

          // Ajusta el tamaño del área de colisión del jugador
          this.player.setSize(this.player.width * 0.7, this.player.height * 0.7, true);

          // Temporizador para finalizar el juego después de 2 minutos
          this.gameOverTimer = this.time.addEvent({
            delay: this.gameDuration,
            callback: () => this.endGame(true),
            callbackScope: this
          });

          // Cambiar la velocidad de caída después de 1 minuto
          this.time.addEvent({
            delay: 60000, // 1 minuto
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

        addCoin() {
          if (!this.isGameOver) {
            const x = Phaser.Math.Between(50, 750); // Posición aleatoria de la moneda
            const coin = this.coins.create(x, 0, 'coin').setScale(0.15); // Escala de la moneda a 0.15 (más pequeña)
            coin.setVelocityY(this.coinSpeed || 200); // Velocidad de caída de la moneda
          }
        }

        addObstacle() {
          if (!this.isGameOver) {
            const x = Phaser.Math.Between(50, 750); // Posición aleatoria del obstáculo
            const obstacle = this.obstacles.create(x, 0, 'obstacle').setScale(0.2); // Escala del obstáculo a 0.2 (más pequeña)
            obstacle.setVelocityY(this.obstacleSpeed || 300); // Velocidad de caída del obstáculo

            // Ajusta el tamaño del área de colisión del obstáculo
            obstacle.setSize(obstacle.width * 0.7, obstacle.height * 0.7, true);
          }
        }

        collectCoin(player, coin) {
          coin.disableBody(true, true); // Desactiva la moneda cuando se recoge
          this.score += 10; // Incrementa la puntuación
          this.scoreText.setText('Score: ' + this.score); // Actualiza el texto de la puntuación
        }

        hitObstacle(player, obstacle) {
          if (!this.isGameOver) {
            this.endGame(false);
          }
        }

        increaseDifficulty() {
          // Incrementa la velocidad de los objetos que caen después de 1 minuto
          this.coinSpeed = 300;
          this.obstacleSpeed = 400;
        }

        endGame(isTimeUp) {
          this.isGameOver = true;
          this.physics.pause();
          this.player.setTint(0xff0000); // Cambia el color del jugador para indicar la colisión si es por golpe
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

          // Crear el contenedor del botón
          const restartButtonContainer = this.add.container(400, 400).setDepth(1); // Asegurar que el botón esté por encima de otros elementos

          // Fondo del botón
          const buttonBackground = this.add.rectangle(0, 0, 200, 50, 0x28a745)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => buttonBackground.setFillStyle(0x218838))
            .on('pointerout', () => buttonBackground.setFillStyle(0x28a745))
            .on('pointerdown', () => {
              this.scene.restart(); // Reinicia la escena
              this.isGameOver = false; // Resetea el estado del juego
              this.score = 0; // Resetea la puntuación
            });

          // Texto del botón
          const buttonTextObj = this.add.text(0, 0, buttonText, {
            fontSize: '24px',
            fill: '#fff',
          }).setOrigin(0.5);

          // Agregar fondo y texto al contenedor
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
