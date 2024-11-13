// ./components/elements/GameHeader.js
import React from "react";
import PropTypes from "prop-types";

const GameHeader = ({ title, imageSrc }) => {
    return (
        <>
            <div className="relative flex flex-col justify-center items-center bg-white shadow-lg mx-auto p-4 rounded-xl w-full max-w-4xl text-center wonder">
                {/* Elementos decorativos */}
                <div className="-top-1 left-8 absolute bg-yellow-300 shadow-md rounded-full w-10 h-10 animate-bounce"></div>
                <div className="-top-1 right-8 absolute bg-pink-400 shadow-md rounded-full w-10 h-10 animate-bounce"></div>
                <div className="-bottom-5 left-4 absolute bg-teal-400 shadow-md rounded-full w-12 h-12"></div>
                <div className="right-4 -bottom-5 absolute bg-orange-300 shadow-md rounded-full w-12 h-12"></div>

                {/* Título principal */}
                <h1 className="drop-shadow-lg mb-8 font-bold text-5xl text-purple-800 tracking-wider">
                    Juegos de {title}
                </h1>

                {/* Imagen principal */}
                {imageSrc && (
                    <div className="flex justify-center mb-8">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-48 h-auto transform transition-transform animate-tumble"
                        />
                    </div>
                )}
            </div>

            {/* Sección de título adicional y descripción */}
            <div className="flex md:flex-row flex-col justify-center items-center mt-12 text-center md:text-left">
                <h3 className="my-4 md:my-10 font-bold text-4xl text-purple-800 md:text-4xl wonder">
                    ¡Comienza a jugar y recolecta estrellas mientras te diviertes!
                </h3>
                <img
                    src="/img/personajes/starly/starly_corona.png"
                    alt="Juego"
                    className="mt-4 md:mt-0 md:ml-8 w-24 md:w-32 h-auto"
                />
            </div>
        </>
    );
};

GameHeader.propTypes = {
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
};

export default GameHeader;