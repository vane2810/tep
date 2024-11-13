// ./components/elements/GameCanvasContainer.js
import React from "react";
import PropTypes from "prop-types";

const GamesContainer = ({ gameName, exercise, result, stars }) => {
    return (
        <div className="relative flex flex-col justify-between items-center bg-white shadow-xl mx-auto my-20 p-8 rounded-xl w-full max-w-4xl text-center">
            {/* Información del juego */}
            <div className="flex flex-col items-start mb-8 w-full">
                <h1 className="font-bold text-3xl text-purple-800 wonder">{gameName}</h1>
                <p className="mt-2 text-gray-600 text-lg">Ejercicio: {exercise}</p>
            </div>

            {/* Canvas del juego */}
            <div className="flex justify-center items-center bg-gray-100 shadow-inner mb-8 rounded-lg w-full h-[400px]">
                {/* Aquí irá el canvas del juego */}
                <p className="text-gray-500">[El canvas del juego se cargará aquí]</p>
            </div>

            {/* Resultado */}
            <div className="flex justify-between items-center mt-4 w-full">
                <p className="text-gray-600 text-lg">Resultado: {result}</p>
                <div className="flex items-center">
                    <span className="font-semibold text-lg text-purple-800">Estrellas: </span>
                    <span className="ml-2 font-bold text-lg text-yellow-500">{stars}</span>
                </div>
            </div>
        </div>
    );
};

GamesContainer.propTypes = {
    gameName: PropTypes.string.isRequired,
    exercise: PropTypes.string.isRequired,
    result: PropTypes.string,
    stars: PropTypes.number.isRequired,
};

export default GamesContainer;