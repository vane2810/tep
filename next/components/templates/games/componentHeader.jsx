import React from "react";
import PropTypes from "prop-types";

const ComponentHeader = ({ title, imageSrc, onInstructionsClick }) => {
    return (
        <div className="relative flex flex-col justify-center items-center bg-white shadow-lg mx-auto p-4 rounded-xl w-full max-w-3xl text-center wonder">
            {/* Elementos decorativos */}
            <div className="-top-1 left-8 absolute shadow-md rounded-full w-10 h-10 amarillo"></div>
            <div className="-top-1 right-8 absolute shadow-md rounded-full w-10 h-10 rosado"></div>
            <div className="-bottom-5 left-4 absolute shadow-md rounded-full w-12 h-12 celeste"></div>
            <div className="right-4 -bottom-5 absolute shadow-md rounded-full w-12 h-12 anaranjado"></div>

            {/* Imagen principal y botón de instrucciones alineados */}
            <div className="flex justify-center items-center space-x-8 mb-8">
                {imageSrc && (
                    <div>
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-48 h-auto transform transition-transform"
                        />
                    </div>
                )}
                <div className="flex flex-col items-center mt-8">
                    <p className="mb-6 font-medium text-2xl text-gray-800">Lee las instrucciones antes de comenzar</p>
                    <button
                        onClick={onInstructionsClick}
                        className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-purple-700 hover:to-purple-800 px-8 py-3 rounded-full font-bold text-2xl text-white transform transition-all hover:scale-105 wonder"
                    >
                        Instrucciones
                    </button>
                </div>
            </div>
        </div>
    );
};

ComponentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    onInstructionsClick: PropTypes.func.isRequired, // Prop para manejar clic en el botón de instrucciones
};

export default ComponentHeader;
