import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiX, FiFileText, FiImage, FiSave, FiXCircle } from "react-icons/fi";

const GameModal = ({ isOpen, onClose, onSave, newGame, onInputChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [gameTypes, setGameTypes] = useState([]); // Estado para guardar los tipos de juegos
    const [errors, setErrors] = useState({}); // Estado para manejar errores
    const [isLoadingGameTypes, setIsLoadingGameTypes] = useState(false); // Cargar los tipos de juego
    const [isSaving, setIsSaving] = useState(false); // Estado para manejar la carga del guardado
    const [successMessage, setSuccessMessage] = useState(""); // Mensaje de confirmación
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

    // Cargar los tipos de juegos al abrir el modal
    useEffect(() => {
        const fetchGameTypes = async () => {
            setIsLoadingGameTypes(true);
            try {
                const response = await fetch('http://localhost:3001/api/gametypes/'); // Endpoint correcto
                if (!response.ok) {
                    throw new Error('Error al cargar los tipos de juegos.');
                }
                const data = await response.json();
                setGameTypes(data); // Guarda los datos en el estado
            } catch (error) {
                console.error('Error al cargar los tipos de juegos:', error);
                setGameTypes([]); // Manejo de error: asigna un arreglo vacío
                setErrorMessage("No se pudo cargar los tipos de juego.");
            } finally {
                setIsLoadingGameTypes(false);
            }
        };

        if (isOpen) {
            fetchGameTypes(); // Cargar datos solo si el modal está abierto
            setSuccessMessage(""); // Limpiar el mensaje de éxito cuando se abra el modal
            setErrorMessage(""); // Limpiar el mensaje de error cuando se abra el modal
        }
    }, [isOpen]);


    // Función para manejar la selección de archivo
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Función para manejar la carga de imagen y guardado
    const handleSave = async () => {
        setIsSaving(true);
        setSuccessMessage(""); // Limpiar el mensaje de éxito previo
        setErrorMessage(""); // Limpiar el mensaje de error previo

        const validationErrors = {};
        if (!newGame.title.trim()) {
            validationErrors.title = "El título es obligatorio.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSaving(false);
            return;
        }

        let imgUrl = newGame.imgSrc;

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
                    imgUrl = data.secure_url;
                } else {
                    console.error("No se encontró la URL en la respuesta.");
                    setErrorMessage("No se pudo cargar la imagen correctamente.");
                    setIsSaving(false);
                    return;
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
                setErrorMessage("Error al cargar la imagen. Intenta nuevamente.");
                setIsSaving(false);
                return;
            }
        }

        // Llamamos a la función para guardar el juego
        onSave({
            ...newGame,
            imgSrc: imgUrl,
            contentId: newGame.contentId,
        });

        setErrors({});
        setIsSaving(false);
        setSuccessMessage("Juego guardado exitosamente.");
        setSelectedFile(null);
    };

    // Verificamos si el modal está abierto
    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
                <button
                    className="top-4 right-4 absolute text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FiX className="text-2xl" />
                </button>

                <h2 className="mb-6 font-semibold text-3xl text-center text-purple-700">
                    {newGame.id ? "Editar Juego" : "Agregar Juego"}
                </h2>

                {/* Campo de Título */}
                <div className="relative mb-4">
                    <FiFileText className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del juego *"
                        value={newGame.title}
                        onChange={(e) => {
                            onInputChange(e);
                            setErrors((prev) => ({ ...prev, title: "" }));
                        }}
                        className={`border p-3 pl-10 rounded-lg focus:ring-2 w-full focus:outline-none ${errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                            }`}
                    />
                    {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Selector de Tipo de Juego */}
                <div className="relative mb-4">
                    {isLoadingGameTypes ? (
                        <p className="text-gray-500">Cargando tipos de juego...</p>
                    ) : (
                        <select
                            name="gametype_id"
                            value={newGame.gametype_id || ''}
                            onChange={(e) => {
                                onInputChange(e);
                                setErrors((prev) => ({ ...prev, gametype_id: "" }));
                            }}
                            className={`border p-3 rounded-lg w-full ${errors.gametype_id ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="" disabled>
                                {newGame.gametype_id ? "Selecciona el tipo de juego actual o elige otro" : "Selecciona un tipo de juego"}
                            </option>
                            {gameTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.type_name}
                                </option>
                            ))}
                        </select>
                    )}
                    {errors.gametype_id && <p className="mt-1 text-red-500 text-sm">{errors.gametype_id}</p>}
                </div>

                {/* Vista previa de la imagen actual si existe */}
                {newGame.imgSrc && (
                    <div className="mb-4">
                        <p className="mb-1 text-gray-700">Imagen Actual:</p>
                        <img
                            src={newGame.imgSrc}
                            alt="Imagen del juego"
                            className="rounded-md w-full h-40 object-cover"
                        />
                    </div>
                )}

                {/* Campo para subir la imagen */}
                <div className="relative mb-6">
                    <FiImage className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border-gray-300 p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                    {errors.imgSrc && <p className="mt-1 text-red-500 text-sm">{errors.imgSrc}</p>}
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-4">
                    <button
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white"
                        onClick={onClose}
                    >
                        <FiXCircle className="text-xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold text-white"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        <FiSave className="text-xl" />
                        <span>{isSaving ? "Guardando..." : "Guardar"}</span>
                    </button>
                </div>
            </div>

            {/* Minimodal para Mensajes */}
            {isSaving && (
                <div className="top-10 right-10 z-60 fixed bg-yellow-300 shadow-md p-4 rounded-lg text-yellow-800">
                    Guardando el juego, por favor espera...
                </div>
            )}

            {successMessage && (
                <div className="top-10 right-10 z-60 fixed bg-green-300 shadow-md p-4 rounded-lg text-green-800">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="top-10 right-10 z-60 fixed bg-red-300 shadow-md p-4 rounded-lg text-red-800">
                    {errorMessage}
                </div>
            )}
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
        gametype_id: PropTypes.string,
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default GameModal;
