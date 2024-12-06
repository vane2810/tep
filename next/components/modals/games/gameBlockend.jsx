import React from "react";
import PropTypes from "prop-types";

const LockedGameModal = ({ isOpen, onClose, description }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-sm md:max-w-md text-center transform transition-all scale-100 md:scale-105">

                {/* Título del Modal */}
                <h2 className="mb-2 font-bold text-purple-700 text-xl md:text-2xl wonder">
                    Juego Bloqueado
                </h2>

                {/* Imagen decorativa */}
                <div className="flex justify-center mb-4">
                    <img
                        src="/img/home/llave.webp"
                        alt="Juego Bloqueado"
                        className="w-20 md:w-24 h-20 md:h-24"
                    />
                </div>

            
                {/* Mensaje explicativo */}
                <p className="mb-4 text-gray-700 text-md md:text-lg yagora">
                    {description}
                </p>

                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-purple-600 hover:from-purple-700 to-purple-700 hover:to-purple-800 px-6 py-2 rounded-full font-semibold text-white transform transition-transform hover:scale-105 wonder"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

LockedGameModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    description: PropTypes.string,
};

export default LockedGameModal;
