// Componente de Soporte 
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import ReportCreationModal from "@/components/modals/reportesModal";

const SoporteButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuRef = useRef();

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleCloseMenu = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                            onClick={handleOpenModal}
                        >
                            <FiExternalLink size={20} />
                            <span>Reportar un problema</span>
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

            {/* Modal de Reporte */}
            {isModalOpen && (
                <div className="z-50 fixed inset-0 flex justify-center items-center modal">
                    <div className="absolute inset-0 bg-black opacity-50 modal-overlay"></div>
                    <div className="z-50 bg-white shadow-lg mx-auto rounded w-11/12 md:max-w-md overflow-y-auto modal-container">
                        <div className="top-0 right-0 absolute mt-4 mr-4 modal-close">
                            <button onClick={handleCloseModal}>&times;</button>
                        </div>
                        <ReportCreationModal show={isModalOpen} handleClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </>
    );
};

export default SoporteButton;
