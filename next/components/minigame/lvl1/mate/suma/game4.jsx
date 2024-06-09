"use client"
import React, { useState, useEffect } from 'react';
import Phaser from 'phaser';

const planetImages = [
  '/img/games/mate/ob/mercurio.png',
  '/img/games/mate/ob/venus.png',
  '/img/games/mate/ob/tierra.png',
  '/img/games/mate/ob/marte.png',
  '/img/games/mate/ob/jupiter.png',
  '/img/games/mate/ob/saturno.png',
  '/img/games/mate/ob/urano.png',
  '/img/games/mate/ob/neptuno.png',
];

const MemoryGame = () => {
  const [game, setGame] = useState(null);
  const [matches, setMatches] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'memory-game', 
      width: 700,
      height: 600,
      scene: {
        preload: preload,
        create: create,
      },
    };

    const phaserGame = new Phaser.Game(config);

    setGame(phaserGame);

    function preload() {
      planetImages.forEach((image, index) => {
        this.load.image(`planet-${index}`, image);
      });
      this.load.image('card-back', '/img/games/mate/ob/card-back.png');
      this.load.image('congrats', '/img/games/mate/ob/congrats.png');
      this.load.image('background', '/img/games/mate/ob/background.png'); // Carga la imagen de fondo

      this.load.on('preloadcomplete', () => {
        setTimeout(() => {
          cards.forEach(card => {
            card.setTexture('card-back');
          });
        }, 3000); // Espera 3 segundos antes de voltear las cartas al reverso
      });
    }

    function create() {
      this.add.image(290, 289, 'background').setScale(1.5);
    
      const shuffledImages = Phaser.Utils.Array.Shuffle([...planetImages, ...planetImages]);
      const cards = shuffledImages.map((image, index) => {
        const card = this.add.image(100 + (index % 4) * 120, 100 + Math.floor(index / 4) * 150, 'card-back');
        card.setInteractive();
        card.imageName = `planet-${planetImages.indexOf(image)}`;
        card.flipped = false;
        card.setScale(0.2);
        return card;
      });
    
      this.flippedCards = [];
      this.cards = cards;
    
      cards.forEach(card => {
        card.on('pointerdown', () => handleCardClick(card, this));
      });
    }
    

    function handleCardClick(card, scene) {
      if (scene.flippedCards.length < 2 && !card.flipped) {
        card.setTexture(card.imageName);
        card.flipped = true;
        scene.flippedCards.push(card);
      }

      if (scene.flippedCards.length === 2) {
        const [firstCard, secondCard] = scene.flippedCards;
        if (firstCard.imageName === secondCard.imageName) {
          setMatches(prevMatches => {
            const newMatches = prevMatches + 1;
            if (newMatches === 8) {
              setIsGameFinished(true);
              showCongrats(scene);
            }
            return newMatches;
          });
          scene.flippedCards = [];
        } else {
          setTimeout(() => {
            firstCard.setTexture('card-back');
            secondCard.setTexture('card-back');
            firstCard.flipped = false;
            secondCard.flipped = false;
            scene.flippedCards = [];
          }, 1000);
        }
      }
    }

    function showCongrats(scene) {
      const congratsImage = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, 'congrats');
      congratsImage.setScale(0.5);

      const restartButton = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY + 100, 'Volver a Jugar', {
        fontSize: '32px',
        fill: '#000',
        backgroundColor: '#fff',
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => restartGame(scene));
    }

    function restartGame(scene) {
      setMatches(0);
      setIsGameFinished(false);
      scene.scene.restart();
    }

    return () => {
      phaserGame.destroy(true);
    };
  }, []);

  const toggleInstructions = () => {
    setInstructionsVisible(!instructionsVisible);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
      <div id="memory-game" style={{ marginRight: '20px' }}></div>
      <div>
        <h2>Aciertos: {matches}</h2>
        <button style={{ 
          backgroundColor: instructionsVisible ? '#F8BBD0' : '#F06292 ',

          border: 'none', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          }}
          onClick={toggleInstructions}>
          {instructionsVisible ? 'Ocultar Instrucciones' : 'Mostrar Instrucciones'}
        </button>
        {instructionsVisible && (
          <div style={{ backgroundColor: '#F9E79F', padding: '20px', borderRadius: '10px', marginTop: '10px' }}>
            <h3>Instrucciones:</h3>
            <p>¡Bienvenido al juego de memoria de planetas!</p>
            <p>El objetivo es encontrar todas las parejas de planetas.</p>
            <p>Para jugar, simplemente haz clic en las cartas para revelarlas.</p>
            <p>Si encuentras dos cartas iguales, permanecerán visibles.</p>
            <p>Si las cartas no coinciden, se ocultarán después de un segundo.</p>
            <p>¡Intenta recordar la ubicación de los planetas para hacer coincidir las parejas!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
