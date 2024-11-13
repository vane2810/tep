// ./components/elements/GameCard.js
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FiEdit, FiTrash } from "react-icons/fi";

const GameCard = ({ href, imageSrc, title, isAdmin, onEdit, onDelete }) => {
    return (
        <div className="relative flex flex-col justify-between items-center border-2 border-gray-100 bg-white shadow-xl hover:shadow-2xl p-8 rounded-xl w-full max-w-md text-center transform transition-all hover:scale-105">
            {/* Decoración superior izquierda */}
            <div className="-top-4 -left-4 absolute bg-purple-500 shadow-md rounded-full w-12 h-12"></div>

            {/* Decoración superior derecha */}
            <div className="-top-4 -right-4 absolute bg-yellow-300 shadow-md rounded-full w-8 h-8"></div>

            {/* Título */}
            <h3 className="mb-6 font-bold text-3xl text-purple-800 wonder">
                {title}
            </h3>
            
            {/* Imagen del juego */}
            <div className="bg-gray-200 shadow-inner mb-8 rounded-lg w-full">
                <img src={imageSrc} alt={title} className="w-full h-auto" />
            </div>

            {/* Botón para jugar */}
            <Link href={href}>
                <button className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-purple-700 hover:to-purple-800 px-10 py-3 rounded-full w-full font-bold text-2xl text-white transform transition-all hover:scale-105 wonder">
                    Jugar
                </button>
            </Link>

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
};

export default GameCard;
