// components/modals/admin/contenido/SubtemasModal.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiX, FiFileText, FiEdit, FiImage, FiSave, FiXCircle } from "react-icons/fi";

const SubtemasModal = ({ isOpen, onClose, onSave, newSubtema, onInputChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isFileValid, setIsFileValid] = useState(true);

    

    // Limpiar los estados al abrir/cerrar el modal
    useEffect(() => {
        if (isOpen) {
            setSelectedFile(null);
            setErrors({});
            setSuccessMessage("");
            setIsFileValid(true);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Función para manejar la selección de archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
            if (!validFormats.includes(file.type)) {
                setErrors((prev) => ({
                    ...prev,
                    file: "Formato de archivo no permitido. Solo se aceptan archivos jpg, jpeg, png, webp.",
                }));
                setSelectedFile(null);
                setIsFileValid(false);
            } else {
                setErrors((prev) => ({ ...prev, file: "" }));
                setSelectedFile(file);
                setIsFileValid(true);
            }
        } else {
            setIsFileValid(true);
        }
    };

    // Función para manejar la carga de imagen y guardado
    const handleSave = async () => {
        // Limpiar mensajes previos
        setErrors({});
        setSuccessMessage("");
        setIsLoading(true);

        // Validar que los campos obligatorios no estén vacíos
        const validationErrors = {};
        if (!newSubtema.title.trim()) {
            validationErrors.title = "El título es obligatorio.";
        }
        if (!newSubtema.description.trim()) {
            validationErrors.description = "La descripción es obligatoria.";
        }

        // Si hay errores, establecer el estado de errores y salir de la función
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        let imgUrl = newSubtema.imgSrc;

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
                    setIsLoading(false);
                    return;
                }
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
                setIsLoading(false);
                return;
            }
        } else {
            // Usar una imagen predeterminada si no se ha seleccionado ninguna imagen
            imgUrl = "/img/personajes/starly/starly2.webp"; // Ruta de la imagen predeterminada
        }

        // Llamar a la función onSave con todos los datos del subtema, incluyendo la URL de la imagen actualizada
        onSave({
            ...newSubtema,
            imgSrc: imgUrl,
        });

        // Limpiar los errores después de un guardado exitoso
        setErrors({});
        setIsLoading(false);
        setSuccessMessage("Subtema guardado exitosamente.");

        // Limpiar el mensaje de éxito después de 3 segundos
        setTimeout(() => {
            setSuccessMessage("");
            onClose(); // Cerrar el modal después de un guardado exitoso
        }, 3000);
    };


    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70 yagora">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">

                {/* Mensaje de estado */}
                {successMessage && (
                    <div className="top-0 left-0 absolute bg-purple-400 p-3 rounded-t-lg w-full text-center text-white">
                        {successMessage}
                    </div>
                )}
                {isLoading && (
                    <div className="top-0 left-0 absolute bg-purple-400 p-3 rounded-t-lg w-full text-center text-white">
                        Guardando subtema, por favor espera...
                    </div>
                )}

                {/* Icono de cierre en la esquina superior derecha */}
                <button
                    className="top-4 right-4 absolute text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    <FiX className="text-2xl" />
                </button>

                <h2 className="mt-12 mb-6 font-semibold text-3xl text-center text-purple-700">Agregar Subtema</h2>

                {/* Campo de Título con Icono y Asterisco Rojo */}
                <div className="relative mb-4">
                    <FiFileText className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del subtema *"
                        value={newSubtema.title}
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

                {/* Campo de Descripción con Icono y Asterisco Rojo */}
                <div className="relative mb-4">
                    <FiEdit className="top-3 left-3 absolute text-gray-400" />
                    <textarea
                        name="description"
                        placeholder="Descripción *"
                        value={newSubtema.description}
                        onChange={(e) => {
                            onInputChange(e);
                            setErrors((prev) => ({ ...prev, description: "" })); // Limpiar error al escribir
                        }}
                        className={`border p-3 pl-10 rounded-lg focus:ring-2 w-full resize-none focus:outline-none ${
                            errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                        rows="4"
                    />
                    {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Campo de Carga de Imagen */}
                <div className="relative mb-6">
                    <FiImage className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        onChange={handleFileChange}
                        className="border-gray-300 p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                    {errors.file && <p className="mt-1 text-red-500 text-sm">{errors.file}</p>}
                </div>

                {/* Botones con Iconos */}
                <div className="flex justify-end space-x-4">
                    <button
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white transform transition duration-200 ease-in-out hover:scale-105"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <FiXCircle className="text-xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold text-white transform transition duration-200 ease-in-out hover:scale-105 ${
                            isLoading || !isFileValid ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={handleSave}
                        disabled={isLoading || !isFileValid}
                    >
                        <FiSave className="text-xl" />
                        <span>Guardar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

SubtemasModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    newSubtema: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        imgSrc: PropTypes.string,
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default SubtemasModal;
