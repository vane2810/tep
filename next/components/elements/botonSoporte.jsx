// Componte de Soporte 
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";

const SoporteButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleCloseMenu = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    // Cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        document.addEventListener("mousedown", handleCloseMenu);
        return () => {
            document.removeEventListener("mousedown", handleCloseMenu);
        };
    }, []);

    return (
        <>
            {/* Botón de Soporte */}
            <div className="right-5 bottom-5 z-50 fixed">
                <button
                    className="flex justify-center items-center bg-white hover:bg-blue-300 shadow-lg p-1 rounded-full text-purple-600 hover:text-white transition duration-200"
                    onClick={handleToggleMenu}
                >
                    {/* Imagen del ícono de soporte */}
                    <img
                        src="/img/personajes/starly/starly_faq.webp"
                        alt="Soporte"
                        className="w-12 h-12"
                    />
                </button>
            </div>

            {/* Menú Flotante de Soporte */}
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="right-5 bottom-20 z-50 fixed bg-gray-600 shadow-lg p-4 rounded-lg w-64 text-white yagora"
                >
                    {/* Contenido del Menú */}
                    <div className="flex flex-col space-y-3">
                        <button
                            className="flex items-center space-x-2 w-full text-left hover:text-blue-300"
                            onClick={() => window.location.href = "/help/userGuide"}
                        >
                            <FiExternalLink size={20} />
                            <span>Manual de Usuario</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 w-full text-left hover:text-blue-300"
                            onClick={() => window.location.href = "/help/faq"}
                        >
                            <FiExternalLink size={20} />
                            <span>Resportar un problema</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 w-full text-left hover:text-blue-300"
                            onClick={() => window.location.href = "/help/faq"}
                        >
                            <FiExternalLink size={20} />
                            <span>Preguntas Frecuentes</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 w-full text-left hover:text-blue-300"
                            onClick={() => window.location.href = "/help/about"}
                        >
                            <FiExternalLink size={20} />
                            <span>Acerca de Nosotros</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SoporteButton;