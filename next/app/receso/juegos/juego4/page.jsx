"use client";

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

// Imágenes de objetos para las cartas
const cardImages = [
  '/img/receso/juego4/pa1.png',
  '/img/receso/juego4/pa2.png',
  '/img/receso/juego4/pa3.png',
  '/img/receso/juego4/pa4.png',
  '/img/receso/juego4/pa5.png',
  '/img/receso/juego4/pa6.png',
  '/img/receso/juego4/pa7.png',
  '/img/receso/juego4/pa8.png',
];

const MemoryGame = () => {
  const gameContainerRef = useRef(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [pairsFound, setPairsFound] = useState(0); // Contador de pares encontrados
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    if (!isGameStarted) return;

    const config = {
      type: Phaser.AUTO,
      width: 1000, // Aumentar el ancho del juego
      height: 600,
      parent: gameContainerRef.current,
      scene: {
        preload: preload,
        create: create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('background', '/img/receso/juego4/fondoj4.jpg');
      this.load.image('card-back', '/img/receso/juego4/carta.png');
      cardImages.forEach((image, index) => {
        this.load.image(`card-${index}`, image);
      });
    }

    function create() {
      // Agregar fondo y ajustarlo al tamaño del juego
      this.add.image(500, 300, 'background').setDisplaySize(1000, 600);

      // Barajar las cartas
      const shuffledImages = Phaser.Utils.Array.Shuffle([...cardImages, ...cardImages]);
      this.flippedCards = [];
      this.cards = [];

      // Crear las cartas en una cuadrícula más pequeña y centrada
      const cardWidth = 80; // Reducir aún más el tamaño de las tarjetas
      const cardHeight = 120;
      const offsetX = (1000 - 4 * cardWidth) / 2;
      const offsetY = (600 - 4 * cardHeight) / 2;

      shuffledImages.forEach((image, index) => {
        const x = offsetX + (index % 4) * cardWidth + cardWidth / 2;
        const y = offsetY + Math.floor(index / 4) * cardHeight + cardHeight / 2;
        const card = this.add.sprite(x, y, 'card-back').setInteractive().setDisplaySize(cardWidth, cardHeight);
        card.imageId = `card-${cardImages.indexOf(image)}`;
        card.flipped = false;

        // Evento para voltear la carta
        card.on('pointerdown', () => {
          if (!card.flipped && this.flippedCards.length < 2) {
            flipCard(card, this);
          }
        });

        this.cards.push(card);
      });
    }

    function flipCard(card, scene) {
      card.setTexture(card.imageId).setDisplaySize(80, 120); // Ajustar el tamaño de la imagen al voltear
      card.flipped = true;
      scene.flippedCards.push(card);

      // Revisar si hay dos cartas volteadas
      if (scene.flippedCards.length === 2) {
        const [firstCard, secondCard] = scene.flippedCards;

        // Si las cartas coinciden
        if (firstCard.imageId === secondCard.imageId) {
          setPairsFound((prevPairs) => {
            const newPairs = prevPairs + 1;
            if (newPairs === 8) {
              setIsGameFinished(true);
            }
            return newPairs;
          });
          scene.flippedCards = [];
        } else {
          // Si las cartas no coinciden, voltearlas nuevamente después de un breve retraso
          scene.time.delayedCall(1000, () => {
            firstCard.setTexture('card-back').setDisplaySize(80, 120);
            secondCard.setTexture('card-back').setDisplaySize(80, 120);
            firstCard.flipped = false;
            secondCard.flipped = false;
            scene.flippedCards = [];
          });
        }
      }
    }

    return () => game.destroy(true);
  }, [isGameStarted]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    setPairsFound(0);
    setIsGameFinished(false);
  };

  const handleRestartGame = () => {
    setIsGameStarted(false);
    setTimeout(handleStartGame, 500); // Reiniciar el juego después de 500ms
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 relative px-4">
      <h1 className="text-4xl font-bold text-yellow-700 mb-4">Juego de Memoria</h1>

      {/* Imagen Decorativa Debajo del Título */}
      <div className="mb-4">
        <img src="/img/receso/juego4/decoracionj4.png" alt="Decoración" className="w-24 h-24 mx-auto" />
      </div>

      <div className="flex items-center space-x-6">
        <div className="bg-yellow-500 text-black px-4 py-2 rounded-full text-lg">
          Pares encontrados: {pairsFound}
        </div>
      </div>

      <div
        ref={gameContainerRef}
        className={`w-full max-w-3xl h-[600px] bg-white shadow-2xl border-4 border-yellow-500 rounded-lg overflow-hidden relative ${
          isGameFinished && 'backdrop-blur-sm'
        }`}
      >
        {!isGameStarted && !isGameFinished && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <button
              onClick={handleStartGame}
              className="px-8 py-4 bg-yellow-600 text-white rounded-lg text-2xl font-bold hover:bg-yellow-700"
            >
              Iniciar Juego
            </button>
          </div>
        )}

        {isGameFinished && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white z-20">
            <h2 className="text-4xl font-bold mb-4">¡Felicidades, encontraste todos los pares!</h2>
            <button
              onClick={handleRestartGame}
              className="px-8 py-4 bg-yellow-600 rounded-lg text-2xl font-bold hover:bg-yellow-700"
            >
              Volver a Jugar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
