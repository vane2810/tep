// components/modals/admin/contenido/ContentModal.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiX, FiSave } from "react-icons/fi";

const ContentModal = ({ isOpen, onClose, onSave, content }) => {
    const [formData, setFormData] = useState({
        title: content?.title || "",
        description: content?.description || "",
        img_url: content?.img_url || "",
        audio_url: content?.audio_url || "",
        aditional: content?.aditional || ""
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    // Función para manejar el cambio en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Función para manejar la selección de archivo (para img_url)
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Función para manejar la validación y guardado
    const handleSave = async () => {
        const validationErrors = {};
        if (!formData.title.trim()) {
            validationErrors.title = "El título es obligatorio.";
        }
        if (!formData.description.trim()) {
            validationErrors.description = "La descripción es obligatoria.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let imgUrl = formData.img_url;

        // Subir la nueva imagen si hay una seleccionada
        if (selectedFile) {
            const uploadFormData = new FormData();
            uploadFormData.append("file", selectedFile);
            uploadFormData.append("upload_preset", "ml_default");

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dikgrq4yt/image/upload", {
                    method: "POST",
                    body: uploadFormData,
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
        }

        // Llamar a la función onSave con todos los datos del contenido
        const newContentData = {
            ...formData,
            img_url: imgUrl,
        };

        onSave(newContentData);

        // Limpiar los errores y cerrar el modal
        setErrors({});
        onClose();
    };

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
                {/* Icono de cierre en la esquina superior derecha */}
                <button
                    className="top-4 right-4 absolute text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FiX className="text-2xl" />
                </button>

                <h2 className="mb-6 font-semibold text-3xl text-center text-purple-700">
                    {content ? "Editar Contenido" : "Agregar Contenido"}
                </h2>

                {/* Campo de Título */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título del contenido"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`border p-3 rounded-lg w-full focus:ring-2 focus:outline-none ${
                            errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                    />
                    {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Campo de Descripción */}
                <div className="relative mb-4">
                    <textarea
                        name="description"
                        placeholder="Descripción del contenido"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`border p-3 rounded-lg w-full resize-none focus:ring-2 focus:outline-none ${
                            errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                        rows="4"
                    />
                    {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Campo de Carga de Imagen */}
                <div className="relative mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                </div>

                {/* Campo de URL de Audio */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        name="audio_url"
                        placeholder="URL del audio"
                        value={formData.audio_url}
                        onChange={handleInputChange}
                        className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full focus:outline-none"
                    />
                </div>

                {/* Campo de Información Adicional */}
                <div className="relative mb-6">
                    <textarea
                        name="aditional"
                        placeholder="Información adicional"
                        value={formData.aditional}
                        onChange={handleInputChange}
                        className="border-gray-300 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 w-full resize-none focus:outline-none"
                        rows="3"
                    />
                </div>

                {/* Botones con Iconos */}
                <div className="flex justify-end space-x-4">
                    <button
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white"
                        onClick={onClose}
                    >
                        <FiX className="text-xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold text-white"
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

ContentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    content: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        img_url: PropTypes.string,
        audio_url: PropTypes.string,
        aditional: PropTypes.string,
    }),
};

export default ContentModal;
