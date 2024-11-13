// ./components/modals/admin/games/gameModal.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiX, FiFileText, FiImage, FiSave, FiXCircle } from "react-icons/fi";

const GameModal = ({ isOpen, onClose, onSave, newGame, onInputChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({}); // Estado para manejar errores

    if (!isOpen) return null;

    // Función para manejar la selección de archivo
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Función para manejar la carga de imagen y guardado
    const handleSave = async () => {
        // Validar que los campos obligatorios no estén vacíos
        const validationErrors = {};
        if (!newGame.title.trim()) {
            validationErrors.title = "El título es obligatorio.";
        }

        // Si hay errores, establecer el estado de errores y salir de la función
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let imgUrl = newGame.imgSrc;

        // Subir la nueva imagen si hay una nueva imagen seleccionada
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "ml_default");

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dikgrq4yt/image/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                if (data.secure_url) {
                    imgUrl = data.secure_url; // Actualiza la URL de la imagen
                } else {
                    console.error("No se encontró la URL en la respuesta.");
                    return;
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
                return;
            }
        } else {
            // Usar una imagen predeterminada si no se ha seleccionado ninguna imagen
            imgUrl = "/img/personajes/starly/starly_gorro.png"; // Ruta de la imagen predeterminada
        }

        // Llamar a la función onSave con todos los datos del juego, incluyendo la URL de la imagen actualizada
        onSave({
            ...newGame,
            imgSrc: imgUrl,
            contentId: newGame.contentId, // Asegúrate de incluir el contentId
        });

        // Limpiar los errores después de un guardado exitoso
        setErrors({});
        onClose(); // Cerrar el modal después de guardar
    };

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70 yagora">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">

                {/* Icono de cierre en la esquina superior derecha */}
                <button
                    className="top-4 right-4 absolute text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FiX className="text-2xl" />
                </button>

                <h2 className="mb-6 font-semibold text-3xl text-center text-purple-700">
                    {newGame.id ? "Editar Juego" : "Agregar Juego"}
                </h2>

                {/* Campo de Título con Icono y Asterisco Rojo */}
                <div className="relative mb-4">
                    <FiFileText className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del juego *"
                        value={newGame.title}
                        onChange={(e) => {
                            onInputChange(e);
                            setErrors((prev) => ({ ...prev, title: "" })); // Limpiar error al escribir
                        }}
                        className={`border p-3 pl-10 rounded-lg focus:ring-2 w-full focus:outline-none ${
                            errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                    />
                    {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Campo de Carga de Imagen */}
                <div className="relative mb-6">
                    <FiImage className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border-gray-300 p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                </div>

                {/* Botones con Iconos */}
                <div className="flex justify-end space-x-4">
                    <button
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white transform transition duration-200 ease-in-out hover:scale-105"
                        onClick={onClose}
                    >
                        <FiXCircle className="text-xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold text-white transform transition duration-200 ease-in-out hover:scale-105"
                        onClick={handleSave}
                    >
                        <FiSave className="text-xl" />
                        <span>Guardar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

GameModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    newGame: PropTypes.shape({
        title: PropTypes.string,
        imgSrc: PropTypes.string,
        contentId: PropTypes.string,
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default GameModal;
