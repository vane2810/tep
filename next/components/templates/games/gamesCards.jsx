// Componente de tarjetas de juegos
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FiEdit, FiTrash } from "react-icons/fi";
import LockedGameModal from "@/components/modals/games/gameBlockend";

const GameCard = ({ href, imageSrc, title, isAdmin, onEdit, onDelete, studentId, gameId, previousGameId }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal

    useEffect(() => {
        // Función para verificar el progreso del juego anterior
        const fetchProgress = async () => {
            try {
                // Si no hay un juego anterior, significa que este es el primer juego
                if (!previousGameId) {
                    setIsUnlocked(true);
                    return;
                }

                // Verificar si el estudiante ha completado el juego anterior
                if (studentId && previousGameId) {
                    const response = await fetch(`http://localhost:3001/api/progreso/${studentId}/${previousGameId}`);

                    if (response.ok) {
                        const progressData = await response.json();
                        // Si el progreso está marcado como 'completado', desbloquea el juego actual
                        if (progressData.completed || progressData.status === 'completado') {
                            setIsUnlocked(true);
                        } else {
                            setIsUnlocked(false);
                        }
                    } else {
                        console.error('Error desconocido al verificar el progreso del juego anterior:', response.statusText);
                    }
                }
            } catch (error) {
                console.error('Error al obtener el progreso del juego anterior:', error);
                setIsUnlocked(false);
            }
        };

        fetchProgress();
    }, [studentId, previousGameId]);

    // Función para abrir el modal si se intenta interactuar con un juego bloqueado
    const handleLockedClick = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div
            className={`relative flex flex-col justify-between items-center border-2 border-gray-100 shadow-xl hover:shadow-2xl p-8 rounded-xl w-full max-w-md text-center transform transition-all hover:scale-105 ${isUnlocked ? 'bg-white' : 'bg-gray-300 opacity-75'
                }`}
        >
            {/* Decoración superior izquierda */}
            <div className="-top-4 -left-4 absolute bg-purple-500 shadow-md rounded-full w-12 h-12"></div>

            {/* Decoración superior derecha */}
            <div className="-top-4 -right-4 absolute bg-yellow-300 shadow-md rounded-full w-8 h-8"></div>

            {/* Título */}
            <h3 className="mb-6 font-bold text-3xl text-purple-800 wonder">{title}</h3>

            {/* Imagen del juego */}
            <div className="relative mb-8 rounded-lg w-full">
                <img src={imageSrc} alt={title} className="w-full h-auto" />
                {!isUnlocked && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-80 rounded-lg">
                        <img
                            src="/img/home/candado.webp"
                            alt="Juego Bloqueado"
                            className="w-1/2 max-w-xs h-auto"
                        />
                    </div>
                )}
            </div>

            {/* Botón para jugar */}
            {isUnlocked ? (
                <Link href={href}>
                    <button className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-purple-700 hover:to-purple-800 px-10 py-3 rounded-full w-full font-bold text-2xl text-white transform transition-all hover:scale-105 wonder">
                        Jugar
                    </button>
                </Link>
            ) : (
                <button
                    onClick={handleLockedClick}
                    className="bg-gray-400 px-10 py-3 rounded-full w-full font-bold text-2xl text-white cursor-not-allowed wonder"
                >
                    Bloqueado
                </button>
            )}

            {/* Iconos de editar y eliminar solo para el administrador */}
            {isAdmin && (
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={onEdit}
                        className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full text-white transform transition duration-200 ease-in-out hover:scale-105"
                    >
                        <FiEdit className="text-xl" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 hover:bg-red-600 p-3 rounded-full text-white transform transition duration-200 ease-in-out hover:scale-105"
                    >
                        <FiTrash className="text-xl" />
                    </button>
                </div>
            )}

            {/* Modal de Juego Bloqueado */}
            <LockedGameModal
                description="Debes desbloquear el juego anterior"
                isOpen={isModalOpen}
                onClose={handleModalClose} />

            {/* Decoración inferior derecha */}
            <div className="-right-4 -bottom-4 absolute shadow-md rounded-full w-14 h-14 celeste"></div>
        </div>
    );
};

GameCard.propTypes = {
    href: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    studentId: PropTypes.number,  // Id del estudiante para la solicitud de progreso
    gameId: PropTypes.number.isRequired,  // Id del juego actual
    previousGameId: PropTypes.number,  // Id del juego anterior
};

export default GameCard;
