// ./components/modals/admin/contenido/ContentModal.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiX, FiSave, FiPlusCircle, FiTrash2, FiEdit3, FiImage, FiMusic } from "react-icons/fi";

const ContentModal = ({ isOpen, onClose, onSave, content }) => {
    const [formData, setFormData] = useState({
        title: content?.title || "",
        description: content?.description || "",
    });

    const [steps, setSteps] = useState(content?.steps || []); // Estado para los pasos del contenido
    const [selectedStepIndex, setSelectedStepIndex] = useState(0); // Estado para saber qué paso está seleccionado
    const [errors, setErrors] = useState({});
    const [activeTab, setActiveTab] = useState('content'); // Control de la pestaña activa

    if (!isOpen) return null;

    // Función para manejar el cambio en los campos de entrada del contenido
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Función para manejar la validación y guardado
    const handleSave = () => {
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

        // Llamar a la función onSave con todos los datos del contenido, incluyendo los pasos
        const newContentData = {
            ...formData,
            steps: steps,
        };

        onSave(newContentData);

        // Limpiar los errores y cerrar el modal
        setErrors({});
        onClose();
    };

    // Manejar el cambio de los pasos
    const handleStepChange = (field, value) => {
        setSteps((prevSteps) =>
            prevSteps.map((step, i) =>
                i === selectedStepIndex ? { ...step, [field]: value } : step
            )
        );
    };

    // Agregar un nuevo paso
    const handleAddStep = () => {
        setSteps((prevSteps) => [
            ...prevSteps,
            { title: "", description: "", img_url: "", audio_url: "", aditional: "", order: prevSteps.length + 1 },
        ]);
        setSelectedStepIndex(steps.length); // Seleccionar el nuevo paso agregado
    };

    // Eliminar un paso
    const handleDeleteStep = (index) => {
        setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
        if (index === selectedStepIndex) {
            setSelectedStepIndex(0); // Seleccionar el primer paso si se elimina el seleccionado
        }
    };

    // Manejar la subida de archivos a Cloudinary
    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); // Reemplaza con tu upload preset

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dikgrq4yt/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            const url = data.secure_url;

            setSteps((prevSteps) =>
                prevSteps.map((step, i) =>
                    i === selectedStepIndex ? { ...step, [type]: url } : step
                )
            );
        } catch (error) {
            console.error("Error subiendo el archivo:", error);
        }
    };

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70">
            <div className="relative bg-white shadow-lg p-10 rounded-lg w-full max-w-5xl h-5/6 overflow-hidden yagora">
                {/* Icono de cierre en la esquina superior derecha */}
                <button
                    className="top-4 right-4 absolute text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <FiX className="text-3xl" />
                </button>

                <h2 className="mb-6 font-bold text-3xl text-center text-purple-700">
                    {content ? "Editar Contenido" : "Agregar Contenido"}
                </h2>

                {/* Pestañas (Tabs) para cambiar entre contenido y pasos */}
                <div className="flex justify-center mb-8 border-b">
                    <button
                        className={`p-4 text-xl font-semibold flex items-center ${
                            activeTab === 'content' ? 'border-b-2 border-purple-500 text-purple-700' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('content')}
                    >
                        <FiEdit3 className="mr-3" />
                        Información General
                    </button>
                    <button
                        className={`p-4 text-xl font-semibold flex items-center ${
                            activeTab === 'steps' ? 'border-b-2 border-purple-500 text-purple-700' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('steps')}
                    >
                        <FiPlusCircle className="mr-3" />
                        Cuerpo del Contenido
                    </button>
                </div>

                {/* Contenido principal */}
                {activeTab === 'content' && (
                    <div className="pr-4 h-4/6 overflow-y-auto">
                        {/* Campo de Título */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                name="title"
                                placeholder="Título del contenido"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`border p-4 rounded-lg w-full text-lg focus:ring-2 focus:outline-none ${
                                    errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                                }`}
                            />
                            {errors.title && <p className="mt-2 text-lg text-red-500">{errors.title}</p>}
                        </div>

                        {/* Campo de Descripción */}
                        <div className="relative mb-6">
                            <textarea
                                name="description"
                                placeholder="Descripción del contenido"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`border p-4 rounded-lg w-full text-lg resize-none focus:ring-2 focus:outline-none ${
                                    errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                                }`}
                                rows="5"
                            />
                            {errors.description && <p className="mt-2 text-lg text-red-500">{errors.description}</p>}
                        </div>
                    </div>
                )}

                {/* Sección de pasos */}
                {activeTab === 'steps' && (
                    <div className="pr-4 h-4/6 overflow-y-auto">
                        <div className="relative mb-8">
                            <h3 className="mb-4 font-bold text-xl">Información del contenido</h3>
                            <div className="flex space-x-4 mb-6 overflow-x-auto">
                                {steps.map((step, index) => (
                                    <button
                                        key={index}
                                        className={`p-2 border rounded-lg text-lg ${
                                            selectedStepIndex === index ? 'bg-purple-500 text-white' : 'bg-gray-200'
                                        }`}
                                        onClick={() => setSelectedStepIndex(index)}
                                    >
                                        Sección {index + 1}
                                    </button>
                                ))}
                                <button
                                    className="flex items-center space-x-3 text-green-600 hover:text-green-800"
                                    onClick={handleAddStep}
                                >
                                    <FiPlusCircle />
                                    <span>Agregar Información</span>
                                </button>
                            </div>

                            {steps.length > 0 && (
                                <div className="bg-gray-100 p-6 border rounded-xl overflow-y-auto max-h">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="font-bold text-2xl">Sección {selectedStepIndex + 1}</h4>
                                        <FiTrash2
                                            className="text-2xl text-red-500 hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDeleteStep(selectedStepIndex)}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Título de la sección"
                                        value={steps[selectedStepIndex]?.title || ""}
                                        onChange={(e) => handleStepChange("title", e.target.value)}
                                        className="mb-4 p-4 border rounded-lg w-full text-lg"
                                    />
                                    <textarea
                                        placeholder="Descripción de la sección"
                                        value={steps[selectedStepIndex]?.description || ""}
                                        onChange={(e) => handleStepChange("description", e.target.value)}
                                        className="mb-4 p-4 border rounded-lg w-full text-lg resize-none"
                                        rows="3"
                                    />
                                    <div className="flex items-center mb-4">
                                        <label className="flex items-center space-x-3">
                                            <FiImage className="mr-3 text-xl" />
                                            <span className="text-lg">Subir Imagen:</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, "img_url")}
                                                className="ml-4"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <label className="flex items-center space-x-3">
                                            <FiMusic className="mr-3 text-xl" />
                                            <span className="text-lg">Subir Audio:</span>
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                onChange={(e) => handleFileUpload(e, "audio_url")}
                                                className="ml-4"
                                            />
                                        </label>
                                    </div>
                                    <textarea
                                        placeholder="Información adicional"
                                        value={steps[selectedStepIndex]?.aditional || ""}
                                        onChange={(e) => handleStepChange("aditional", e.target.value)}
                                        className="p-4 border rounded-lg w-full text-lg resize-none"
                                        rows="2"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Botones con Iconos siempre visibles al final */}
                <div className="bottom-0 sticky flex justify-end space-x-6 bg-white mt-6 p-6">
                    <button
                        className="flex items-center space-x-3 bg-gray-500 hover:bg-gray-600 px-8 py-3 rounded-lg font-semibold text-lg text-white"
                        onClick={onClose}
                    >
                        <FiX className="text-2xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold text-lg text-white"
                        onClick={handleSave}
                    >
                        <FiSave className="text-2xl" />
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
        steps: PropTypes.arrayOf(
            PropTypes.shape({
                order: PropTypes.number,
                title: PropTypes.string,
                description: PropTypes.string,
                img_url: PropTypes.string,
                audio_url: PropTypes.string,
                aditional: PropTypes.string,
            })
        ),
    }),
};

export default ContentModal;
