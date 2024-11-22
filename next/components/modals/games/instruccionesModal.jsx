"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaYoutube, FaEdit, FaTrash } from "react-icons/fa"; // Importar íconos de react-icons
import InstructionsModal from "../admin/contenido/instrutionModal";

const InstruccionesModal = ({ isOpen, onClose, instructions, onPlay, isAdmin, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentPoints, setCurrentPoints] = useState({ points_max: "", points_min: "" });
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        if (instructions && instructions.length > 0) {
            // Inicializar puntos máximos y mínimos con los valores de las instrucciones predeterminadas
            setCurrentPoints({
                points_max: instructions[0].points_max || "",
                points_min: instructions[0].points_min || "",
            });
        }
    }, [instructions]);

    if (!isOpen) {
        return null;
    }

    const handleVideoClick = (url) => {
        setVideoUrl(url);
        setIsVideoOpen(true);
    };

    const handleCloseVideo = () => {
        setIsVideoOpen(false);
        setVideoUrl("");
    };

    const convertToEmbedUrl = (url) => {
        try {
            const urlObject = new URL(url);
            if (urlObject.hostname === "www.youtube.com" || urlObject.hostname === "youtube.com") {
                const videoId = urlObject.searchParams.get("v");
                return `https://www.youtube.com/embed/${videoId}`;
            } else if (urlObject.hostname === "youtu.be") {
                const videoId = urlObject.pathname.slice(1);
                return `https://www.youtube.com/embed/${videoId}`;
            } else {
                return url; // Si la URL no es de YouTube, la dejamos como está.
            }
        } catch (error) {
            console.error("URL inválida para el video:", url);
            return "";
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSavePoints = (updatedPoints) => {
        onSave(updatedPoints);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentPoints((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
                <div className="relative bg-white shadow-2xl p-6 rounded-2xl w-full max-w-md transform transition-all scale-100 md:scale-105">
                    {/* Botón para cerrar el modal */}
                    <button
                        onClick={onClose}
                        className="top-3 right-3 absolute font-bold text-2xl text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>

                    <h2 className="mb-3 font-bold text-2xl text-center text-green-600 wonder">
                        Instrucciones del Juego
                    </h2>

                    {/* Imagen decorativa */}
                    <div className="flex justify-center mb-4">
                        <img
                            src="/img/personajes/starly/starly_corona.png" // Cambia la ruta según corresponda
                            alt="Instrucciones"
                            className="w-24 h-auto"
                        />
                    </div>

                    {/* Verificar si las instrucciones están definidas y si tienen elementos */}
                    {instructions && instructions.length > 0 ? (
                        <div className="bg-gray-100 shadow-md p-3 rounded-lg yagora">
                            {/* Puntaje */}
                            <h3 className="mb-2 text-center text-lg wonder">
                                Puntos Máximos: {currentPoints.points_max || "0"}
                            </h3>
                            <h3 className="mb-2 text-center text-lg wonder">
                                Puntos Mínimos: {currentPoints.points_min || "0"}
                            </h3>

                            {/* Lista de instrucciones ordenada */}
                            <ol className="space-y-1 pl-6 text-gray-800 text-sm list-decimal">
                                {instructions[0].instructions.split("\n").map((step, index) => (
                                    <li key={`instruction-step-${index}`}>{step.trim()}</li>
                                ))}
                            </ol>

                            {/* Ícono del video, ubicado a la derecha debajo del contenedor */}
                            {instructions[0].video_url && (
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => handleVideoClick(instructions[0].video_url)}
                                        className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                                    >
                                        <FaYoutube className="w-5 h-5" />
                                        <span className="font-medium text-xs">Ver Video</span>
                                    </button>
                                </div>
                            )}

                            {/* Ícono de edición, solo para el administrador */}
                            {isAdmin && (
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={handleEditClick} // Abre el modal de edición
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaEdit className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="mt-4 text-base text-center text-gray-600">
                            No hay instrucciones disponibles.
                        </p>
                    )}

                    {/* Botones de acción */}
                    <div className="flex justify-center gap-4 mt-6 text-lg wonder">
                        <button
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 shadow-md px-4 py-2 rounded-full font-semibold text-gray-800 transform transition-transform hover:scale-105"
                        >
                            Cerrar
                        </button>
                        <button
                            onClick={onPlay}
                            className="bg-green-500 hover:bg-green-600 shadow-md px-4 py-2 rounded-full font-bold text-white transform transition-transform hover:scale-105"
                        >
                            Jugar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal para editar los puntos máximos y mínimos */}
            {isEditing && (
                <InstructionsModal
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    onSave={handleSavePoints}
                    newInstruction={currentPoints}
                    onInputChange={handleInputChange}
                />
            )}

            {/* Modal del video de YouTube */}
            {isVideoOpen && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
                    <div className="relative bg-white shadow-lg p-4 rounded-xl w-full max-w-2xl">
                        <button
                            onClick={handleCloseVideo}
                            className="top-2 right-2 absolute font-bold text-2xl text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={`${convertToEmbedUrl(videoUrl)}?rel=0`}
                                title="YouTube Video"
                                className="rounded-lg w-full h-56 md:h-80"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

InstruccionesModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    instructions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            instructions: PropTypes.string.isRequired,
            points_max: PropTypes.string.isRequired,
            points_min: PropTypes.string.isRequired,
            video_url: PropTypes.string,
        })
    ).isRequired,
    onPlay: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default InstruccionesModal;
