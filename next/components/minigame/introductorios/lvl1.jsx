//Juego intro Nivel 1
"use client"
import React, { useState, useEffect } from 'react';
import * as Phaser from 'phaser';

const planetImages = [
  '/img/games/intro/mercurio.png',
  '/img/games/intro/venus.png',
  '/img/games/intro/tierra.png',
  '/img/games/intro/marte.png',
  '/img/games/intro/jupiter.png',
  '/img/games/intro/saturno.png',
  '/img/games/intro/urano.png',
  '/img/games/intro/neptuno.png',
];

const MemoryGame = () => {
  const [game, setGame] = useState(null);
  const [matches, setMatches] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

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
      this.load.image('card-back', '/img/games/intro/card-back.png');
      this.load.image('congrats', '/img/games/intro/congrats.png');
      this.load.image('background', '/img/games/intro/background.png'); 

      this.load.on('preloadcomplete', () => {
        setTimeout(() => {
          cards.forEach(card => {
            card.setTexture('card-back');
          });
        }, 3000); 
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


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
      <div id="memory-game" style={{ marginRight: '20px' }}></div>
      <div className='bg-purple-200 px-4 text-center'>
        <h1 className='font-bold text-3xl text-purple-900 wonder'>Aciertos: {matches}</h1>
        
      </div>
    </div>
  );
};

export default MemoryGame;