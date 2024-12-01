// ./components/modals/admin/contenido/ContentModal.js
import React, { useState, useEffect } from "react";
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
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
    const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
    const [isFileValid, setIsFileValid] = useState(true); // Validar archivo seleccionado
    const [uploadErrors, setUploadErrors] = useState(""); // Estado para errores de subida de archivos

    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: content?.title || "",
                description: content?.description || "",
            });
            setSteps(content?.steps || []);
            setErrors({});
            setIsLoading(false);
            setSuccessMessage("");
            setIsFileValid(true);
            setUploadErrors("");
        }
    }, [isOpen, content]);

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

        setIsLoading(true);
        const newContentData = {
            ...formData,
            steps: steps,
        };

        onSave(newContentData);

        setErrors({});
        setIsLoading(false);
        setSuccessMessage("Contenido guardado exitosamente.");

        setTimeout(() => {
            setSuccessMessage("");
            onClose();
        }, 3000);
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

        // Validar formatos permitidos
        const validImageFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        const validAudioFormats = ["audio/mp3", "audio/mpeg"];

        if (type === "img_url" && !validImageFormats.includes(file.type)) {
            setUploadErrors("Formato de imagen no permitido. Solo se aceptan jpg, jpeg, png, webp.");
            setIsFileValid(false);
            return;
        } else if (type === "audio_url" && !validAudioFormats.includes(file.type)) {
            setUploadErrors("Formato de audio no permitido. Solo se acepta mp3.");
            setIsFileValid(false);
            return;
        } else {
            setUploadErrors("");
            setIsFileValid(true);
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

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
            setUploadErrors("Error subiendo el archivo, inténtelo nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70">
            <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl lg:max-w-6xl h-3/4 lg:h-4/5 overflow-auto yagora">
                {/* Mensajes de estado (Error, Carga, Éxito) */}
                {(successMessage || isLoading || Object.keys(errors).length > 0 || uploadErrors) && (
                    <div className="top-0 left-0 absolute bg-purple-400 p-3 rounded-t-lg w-full text-center text-white">
                        {isLoading && "Guardando contenido, por favor espera..."}
                        {successMessage && successMessage}
                        {uploadErrors && <span className="text-red-500">{uploadErrors}</span>}
                        {errors.title && <span className="text-red-500">{errors.title}</span>}
                        {errors.description && <span className="text-red-500">{errors.description}</span>}
                    </div>
                )}

                {/* Icono de cierre en la esquina superior derecha */}
                <button
                    className="top-4 right-4 absolute text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    <FiX className="text-3xl" />
                </button>

                <h2 className="mt-10 mb-4 font-bold text-3xl text-center text-purple-700">
                    {content ? "Editar Contenido" : "Agregar Contenido"}
                </h2>

                {/* Pestañas (Tabs) para cambiar entre contenido y pasos */}
                <div className="flex justify-center mb-4 border-b">
                    <button
                        className={`p-4 text-lg font-semibold flex items-center ${activeTab === 'content' ? 'border-b-2 border-purple-500 text-purple-700' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('content')}
                    >
                        <FiEdit3 className="mr-3" />
                        Información General
                    </button>
                    <button
                        className={`p-4 text-lg font-semibold flex items-center ${activeTab === 'steps' ? 'border-b-2 border-purple-500 text-purple-700' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('steps')}
                    >
                        <FiPlusCircle className="mr-3" />
                        Cuerpo del Contenido
                    </button>
                </div>

                {/* Contenido principal */}
                {activeTab === 'content' && (
                    <div className="pr-4 h-full overflow-y-auto">
                        {/* Campo de Título */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Título del contenido"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`border p-3 rounded-lg w-full text-base focus:ring-2 focus:outline-none ${errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                                    }`}
                            />
                        </div>

                        {/* Campo de Descripción */}
                        <div className="relative mb-4">
                            <textarea
                                name="description"
                                placeholder="Descripción del contenido"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`border p-3 rounded-lg w-full text-base resize-none focus:ring-2 focus:outline-none ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                                    }`}
                                rows="4"
                            />
                        </div>
                    </div>
                )}

                {/* Sección de pasos */}
                {activeTab === 'steps' && (
                    <div className="pr-4 h-full overflow-y-auto">
                        <div className="relative mb-4">
                            <h3 className="mb-2 font-bold text-xl">Información del contenido</h3>
                            <div className="flex space-x-4 mb-4 overflow-x-auto">
                                {steps.map((step, index) => (
                                    <button
                                        key={index}
                                        className={`p-2 border rounded-lg text-base ${selectedStepIndex === index ? 'bg-purple-500 text-white' : 'bg-gray-200'
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
                                <div className="bg-gray-100 p-4 border rounded-xl overflow-y-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-lg">Sección {selectedStepIndex + 1}</h4>
                                        <FiTrash2
                                            className="text-red-500 text-xl hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDeleteStep(selectedStepIndex)}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Título de la sección"
                                        value={steps[selectedStepIndex]?.title || ""}
                                        onChange={(e) => handleStepChange("title", e.target.value)}
                                        className="mb-3 p-3 border rounded-lg w-full text-base"
                                    />
                                    <textarea
                                        placeholder="Descripción de la sección"
                                        value={steps[selectedStepIndex]?.description || ""}
                                        onChange={(e) => handleStepChange("description", e.target.value)}
                                        className="mb-3 p-3 border rounded-lg w-full text-base resize-none"
                                        rows="3"
                                    />
                                    <div className="flex items-center mb-3">
                                        <label className="flex items-center space-x-3">
                                            <FiImage className="mr-3 text-xl" />
                                            <span className="text-base">Subir Imagen:</span>
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                                onChange={(e) => handleFileUpload(e, "img_url")}
                                                className="ml-4"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center mb-3">
                                        <label className="flex items-center space-x-3">
                                            <FiMusic className="mr-3 text-xl" />
                                            <span className="text-base">Subir Audio:</span>
                                            <input
                                                type="file"
                                                accept="audio/mp3,audio/mpeg"
                                                onChange={(e) => handleFileUpload(e, "audio_url")}
                                                className="ml-4"
                                            />
                                        </label>
                                    </div>
                                    <textarea
                                        placeholder="Información adicional"
                                        value={steps[selectedStepIndex]?.aditional || ""}
                                        onChange={(e) => handleStepChange("aditional", e.target.value)}
                                        className="p-3 border rounded-lg w-full text-base resize-none"
                                        rows="2"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Botones con Iconos siempre visibles al final */}
                <div className="bottom-0 sticky flex justify-end space-x-6 bg-white mt-6 p-4">
                    <button
                        className="flex items-center space-x-3 bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-base text-white"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <FiX className="text-2xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className={`flex items-center space-x-3 px-6 py-2 rounded-lg font-semibold text-base text-white ${isLoading || !isFileValid ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                            }`}
                        onClick={handleSave}
                        disabled={isLoading || !isFileValid}
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
