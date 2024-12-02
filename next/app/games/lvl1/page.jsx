// Juego intro 1
"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SeparadorRosa } from "@/components/separador";
import Volver from '@/components/elements/botonVolver';
import PropTypes from 'prop-types';

// Carga dinámica del juego (deshabilita el SSR)
const Game = dynamic(() => import('@/components/minigame/introductorios/lvl1'), { ssr: false });

// Componente modal para mostrar las instrucciones del juego
const InstructionsModal = ({ onClose, onPlay }) => {
    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 wonder">
            <div className="bg-white mx-auto p-8 rounded-lg max-w-lg">
                <h2 className="mb-4 font-bold text-3xl text-center text-green-600">Instrucciones del Juego</h2>
                <img src="/img/personajes/starly/starly_corona.webp" alt="Instrucciones" className="mx-auto mb-4 w-1/2" />
                <ul className="mb-4 text-center yagora">
                    <li>1. Encuentra la pareja de los planetas</li>
                    <li>2. Memoriza donde se encuentran las imagenes</li>
                    <li>3. Encuentra todos los pares</li>
                </ul>

                <div className="flex justify-center space-x-4 text-lg">
                    <button
                        className="bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded-full"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white"
                        onClick={onPlay}
                    >
                        Jugar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Definir correctamente los PropTypes
InstructionsModal.propTypes = {
    onClose: PropTypes.func.isRequired,  
    onPlay: PropTypes.func.isRequired,   
};

const IntroGame1 = () => {
    // Estado para manejar si el modal está abierto o si el juego ya se debe mostrar
    const [isModalOpen, setIsModalOpen] = useState(false);  // Inicializamos en false para no mostrar el modal al cargar la página
    const [showGame, setShowGame] = useState(false);

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Función para empezar a jugar (cerrar modal y mostrar el juego)
    const handlePlayGame = () => {
        setIsModalOpen(false);
        setShowGame(true);
    };

    // Función para abrir el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <main className="bg-gray-50">
            <SeparadorRosa />
            {/* Volver */}
            <Volver img='/img/home/regresar/rosa.webp' />

            <div className="flex md:flex-row flex-col justify-center items-center mb-8">
                <h1 className="ml-10 font-bold text-4xl text-center text-pink-700 super">JUEGO INTRODUCTORIO NIVEL I</h1>
                <img
                    src="/img/receso/planet1.webp"
                    alt="Planeta Celestia"
                    className="md:mr-10 mb-6 md:mb-0 md:ml-10 w-auto h-32 md:h-40 animate-float"
                />
            </div>

            {/* Zona del juego */}
            <div className="flex flex-col flex-grow justify-center items-center w-full">
                {/* Zona del juego */}
                {!showGame && (
                    <div className="flex flex-col items-center space-y-6 my-12">
                        <p className="font-medium text-2xl text-center text-gray-700 yagora">Lee las indicaciones para comenzar</p>

                        <button
                            className="bg-green-500 hover:bg-green-600 shadow-lg px-8 py-4 rounded-full font-semibold text-white text-xl transform transition-all duration-300 wonder hover:scale-105"
                            onClick={handleOpenModal} // Cambié OnPlay a handleOpenModal para abrir el modal
                        >
                            Indicaciones
                        </button>

                        <img
                            src="/img/games/intro/n1.png"
                            alt="Pre-Game"
                            className="mb-4 w-36 h-36 transform transition-all duration-300 object-contain hover:scale-105"
                        />
                    </div>
                )}

                {/* Mostrar el juego solo si el estado showGame es verdadero */}
                {showGame && (
                    <div className="my-40">
                        <Game />
                    </div>
                )}
            </div>

            {/* Mostrar el modal de instrucciones si está abierto */}
            {isModalOpen && (
                <InstructionsModal onClose={handleCloseModal} onPlay={handlePlayGame} />
            )}

            <SeparadorRosa />
        </main>
    );
};

export default IntroGame1;