// Modal de protección de rutas
import React from "react";

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 yagora">
            <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">

                <h2 className="font-bold text-2xl">¡Debes iniciar sesión!</h2>
                {/* Imagen del Modal (si proporcionada) */}

                <img
                    src="/img/personajes/starly/starly_ve.webp"
                    alt="Imagen del Modal"
                    className="w-24 h-24 object-contain"
                />

                <p className="mt-2 text-center text-lg">Para acceder a esta página, debes iniciar sesión primero</p>
                {/* Contenido del Modal */}
                <div className="text-center text-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
