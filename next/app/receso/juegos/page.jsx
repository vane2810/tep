// pages/games/index.jsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InstruccionesModal from '@/components/modals/receso/instrucciones';
import Volver from '@/components/elements/botonVolver';
import PropTypes from 'prop-types';

const GamesPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  // Datos de los juegos
  const games = [
    {
      imgSrc: "/img/receso/juego1/game1.png",
      title: "Caza de monstruos",
      buttonText: "Jugar",
      instructions: {
        title: "Caza de Monstruos",
        text: "En este juego, debes cazar monstruos antes de que se escapen.¡Haz clic en cada monstruo para atraparlo!",
        text2: "¡Algunos monstruos por su tamaño te quitan puntos!",
        text3: "¡Llega a 200 puntos antes del tiempo!",
        imageSrc: "/img/receso/juego1/juego1m.png"
      },
      gameRoute: "/receso/juegos/juego1"
    },
    {
      imgSrc: "/img/receso/juego2/game2.png",
      title: "Revienta globos",
      buttonText: "Jugar",
      instructions: {
        title: "Revienta Globos",
        text: "En este juego, debes reventar globos antes de que suban demasiado alto. ¡Haz clic rápido para ganar!",
        imageSrc: "/img/receso/juego2/juego2m.png"
      },
      gameRoute: "/receso/juegos/juego2"
    },
    {
      imgSrc: "/img/receso/juego3/game3.png",
      title: "Cuadrado escapista",
      buttonText: "Jugar",
      instructions: {
        title: "Cuadrado Escapista",
        text: "Ayuda al cuadrado a escapar de los obstáculos. Usa las flechas para moverlo y evitar las trampas.",
        imageSrc: "/img/receso/juego3/juego3m.png"
      },
      gameRoute: "/receso/juegos/juego3"
    },
    {
      imgSrc: "/img/receso/juego4/game4.png",
      title: "Memoria rápida",
      buttonText: "Jugar",
      instructions: {
        title: "Memoria Rápida",
        text: "Encuentra los pares de cartas iguales lo más rápido posible. ¡Pon a prueba tu memoria!",
        imageSrc: "/img/receso/juego4/juego4m.png"
      },
      gameRoute: "/receso/juegos/juego4"
    },   
  ];

  // Función para abrir el modal con las instrucciones del juego seleccionado
  const openInstructionModal = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeInstructionModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  // Función para iniciar el juego
  const handleStartGame = () => {
    if (selectedGame && selectedGame.gameRoute) {
      closeInstructionModal();
      router.push(selectedGame.gameRoute);
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-200 py-10 min-h-screen">
      {/* Botón Volver */}
      <div className="top-4 left-4 absolute">
        <Volver href="/receso" />
      </div>

      <h1 className="mb-4 font-extrabold text-4xl text-blue-800 text-center md:text-5xl super">
        ¡Bienvenido a la Zona de Juegos!
      </h1>
      <p className="mb-6 text-center text-gray-600 text-lg md:text-xl wonder">
        Explora y disfruta de juegos interactivos para aprender y divertirte.
      </p>

      <div className="mb-10">
        <img
          src="/img/receso/juegosp.webp"
          alt="Zona de Juegos"
          className="mx-auto w-40 md:w-60 lg:w-72"
        />
      </div>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 max-w-6xl yagora">
        {games.map((game, index) => (
          <GameCard
            key={index}
            imgSrc={game.imgSrc}
            title={game.title}
            buttonText={game.buttonText}
            onClick={() => openInstructionModal(game)}
          />
        ))}
      </div>

      {selectedGame && (
        <InstruccionesModal
          isOpen={isModalOpen}
          onClose={closeInstructionModal}
          instructions={selectedGame.instructions}
          handleStartGame={handleStartGame}
        />
      )}
    </div>
  );
};

// Componente de Tarjeta de Juego
function GameCard({ imgSrc, title, buttonText, onClick }) {
  return (
    <div className="relative flex flex-col items-center border-gray-200 bg-gradient-to-r from-pink-100 to-pink-200 shadow-lg hover:shadow-2xl p-6 border rounded-3xl transform transition-transform hover:-translate-y-1 duration-300">
      <img src={imgSrc} alt={title} className="mb-4 rounded-full w-24 h-24" />
      <h2 className="mb-2 font-semibold text-2xl text-blue-800 text-center">{title}</h2>
      <button
        onClick={onClick}
        className="border-2 bg-blue-600 hover:bg-blue-700 mt-4 px-6 py-2 border-blue-700 rounded-full text-white transition-colors duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
}

// Definición de PropTypes para GameCard
GameCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GamesPage;
