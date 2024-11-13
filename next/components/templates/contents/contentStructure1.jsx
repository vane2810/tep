// ./components/templates/ContentStructure.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiVolume2, FiEdit, FiTrash2, FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import EmptyContentMessage from "@/components/menssages/mensajeVacio";
import Link from "next/link";

const ContentStructure1 = ({ content, onEdit, onDelete, isAdmin, playLink }) => {
    // Estado para gestionar el estado del audio (reproduciendo o no)
    const [audioState, setAudioState] = useState({
        currentAudio: null,
        isPlaying: false,
    });

    // Función para reproducir o pausar el audio desde la URL proporcionada
    const handlePlayPauseAudio = (audioUrl) => {
        if (audioState.currentAudio && audioState.isPlaying) {
            // Pausar el audio si está reproduciéndose
            audioState.currentAudio.pause();
            setAudioState({ ...audioState, isPlaying: false });
        } else {
            // Reproducir un nuevo audio
            if (audioState.currentAudio) {
                // Detener cualquier otro audio que se esté reproduciendo
                audioState.currentAudio.pause();
            }

            const newAudio = new Audio(audioUrl);
            newAudio.play();
            setAudioState({
                currentAudio: newAudio,
                isPlaying: true,
            });

            // Gestionar el evento de finalización del audio para actualizar el estado
            newAudio.onended = () => {
                setAudioState({
                    currentAudio: null,
                    isPlaying: false,
                });
            };
        }
    };

    return (
        <div key={content.id} className="relative bg-white shadow-md mx-4 my-8 p-6 md:p-10 border rounded-lg yagora">
            <div className="relative border-2 border-gray-300 p-6 md:p-10 rounded-lg">
                <h2 className="mb-2 font-bold text-3xl text-center md:text-4xl">{content.title}</h2>
                <p className="mb-12 text-center text-xl md:text-2xl">{content.description}</p>

                {content.steps && content.steps.length === 0 ? (
                    <EmptyContentMessage />
                ) : (
                    content.steps &&
                    content.steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="relative border-purple-300 bg-purple-50 shadow-sm mt-10 p-6 border-l-8 rounded-lg"
                        >
                            {/* Número del paso */}
                            <div className="top-4 -left-12 absolute bg-purple-500 shadow-lg px-4 py-2 rounded-full font-bold text-white">
                                {step.title}
                            </div>

                            {/* Contenido del paso */}
                            <div className="flex items-start md:items-center space-x-4 mb-4">
                                {step.audio_url ? (
                                    <>
                                        {audioState.isPlaying && audioState.currentAudio?.src === step.audio_url ? (
                                            <FiPauseCircle
                                                className="text-6xl text-blue-700 md:text-8xl hover:text-blue-900 cursor-pointer"
                                                onClick={() => handlePlayPauseAudio(step.audio_url)}
                                            />
                                        ) : (
                                            <FiVolume2
                                                className="text-6xl text-blue-700 md:text-8xl hover:text-blue-900 cursor-pointer"
                                                onClick={() => handlePlayPauseAudio(step.audio_url)}
                                            />
                                        )}
                                    </>
                                ) : (
                                    // Añadimos un espacio vacío si no hay audio para mantener el alineamiento
                                    <div className="w-16 md:w-24"></div>
                                )}
                                <p className="text-lg md:text-left">{step.description}</p>
                            </div>

                            {/* Imagen del paso */}
                            {step.img_url && (
                                <div className="flex justify-center mt-4 md:mt-0 w-full">
                                    <img
                                        src={step.img_url}
                                        alt={`Paso ${step.order}`}
                                        className="rounded-lg w-auto h-32 object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}

                {isAdmin && (
                    <div className="top-4 right-4 absolute flex space-x-4 border-2 border-gray-300 bg-white shadow-md p-2 rounded-lg">
                        <FiEdit
                            className="text-4xl text-blue-500 hover:text-blue-600 cursor-pointer"
                            onClick={() => onEdit(content)}
                        />
                        <FiTrash2
                            className="text-4xl text-red-500 hover:text-red-600 cursor-pointer"
                            onClick={() => onDelete(content.id)}
                        />
                    </div>
                )}

                {/* Botón de jugar */}
                <div className="flex justify-end mt-8">
                    <Link href={playLink} className="flex items-center bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-bold text-white transform transition-all hover:scale-105">
                        <span className="mr-2 text-xl yagora">Vamos a Jugar</span>
                        <FiPlayCircle className="text-3xl text-white" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

ContentStructure1.propTypes = {
    content: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    playLink: PropTypes.string.isRequired, // Propiedad para el enlace del botón de jugar
};

export default ContentStructure1;
