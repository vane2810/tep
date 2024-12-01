import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiX, FiFileText, FiSave, FiXCircle } from "react-icons/fi";

const InstructionsModal = ({ isOpen, onClose, onSave, newInstruction, onInputChange }) => {
    const [errors, setErrors] = useState({}); // Estado para manejar errores
    const [isSaving, setIsSaving] = useState(false); // Estado para prevenir envíos múltiples
    const [successMessage, setSuccessMessage] = useState(""); // Estado para mostrar mensaje de éxito

    // Inicializa el estado de errores vacío cuando el modal se abre de nuevo
    useEffect(() => {
        if (isOpen) {
            setErrors({});
            setSuccessMessage(""); // Limpiar mensaje de éxito al abrir el modal
        }
    }, [isOpen]);

    if (!isOpen) return null;


    // Función para manejar la carga de datos y guardado
    const handleSave = async () => {
        if (isSaving) return; // Prevenir múltiples clics
        setIsSaving(true);
    
        // Validar que los campos obligatorios no estén vacíos
        const validationErrors = {};
        if (!newInstruction?.points_max) {
            validationErrors.points_max = "Los puntos máximos son obligatorios.";
        }
        if (!newInstruction?.points_min) {
            validationErrors.points_min = "Los puntos mínimos son obligatorios.";
        }
        if (parseInt(newInstruction.points_max) < parseInt(newInstruction.points_min)) {
            validationErrors.points_max = "Los puntos máximos deben ser mayores o iguales a los puntos mínimos";
            validationErrors.points_min = "Los puntos mínimos deben ser menores o iguales a los puntos máximos";
        }
    
        if (parseInt(newInstruction.points_max) < 0) {
            validationErrors.points_max = "Los puntos máximos no pueden ser negativos";
        }
        if (parseInt(newInstruction.points_min) < 0) {
            validationErrors.points_min = "Los puntos mínimos no pueden ser negativos";
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSaving(false);
            return;
        }
    
        try {
            await onSave({ ...newInstruction });
            setErrors({});
            setSuccessMessage("Instrucción guardada con éxito."); // Mensaje de éxito
            onClose(); // Cerrar el modal después de guardar

            // Desaparecer el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error("Error al guardar la instrucción:", error);
            setErrors({ general: "Ocurrió un error al guardar, intenta nuevamente." });
        } finally {
            setIsSaving(false);
        }
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
                    {newInstruction?.id ? "Editar Puntos Máximos y Mínimos" : "Agregar Puntos Máximos y Mínimos"}
                </h2>

                {/* Campo de Puntos Máximos */}
                <div className="relative mb-4">
                    <FiFileText className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="number"
                        name="points_max"
                        placeholder="Puntos Máximos *"
                        value={newInstruction?.points_max || ''}
                        onChange={(e) => {
                            onInputChange(e);
                            setErrors((prev) => ({ ...prev, points_max: "" }));
                        }}
                        className={`border p-3 pl-10 rounded-lg focus:ring-2 w-full focus:outline-none ${
                            errors.points_max ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                    />
                    {errors.points_max && <p className="mt-1 text-red-500 text-sm">{errors.points_max}</p>}
                </div>

                {/* Campo de Puntos Mínimos */}
                <div className="relative mb-6">
                    <FiFileText className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="number"
                        name="points_min"
                        placeholder="Puntos Mínimos *"
                        value={newInstruction?.points_min || ''}
                        onChange={(e) => {
                            onInputChange(e);
                            setErrors((prev) => ({ ...prev, points_min: "" }));
                        }}
                        className={`border p-3 pl-10 rounded-lg focus:ring-2 w-full focus:outline-none ${
                            errors.points_min ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                    />
                    {errors.points_min && <p className="mt-1 text-red-500 text-sm">{errors.points_min}</p>}
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-4">
                    <button
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold text-white transform transition duration-200 ease-in-out hover:scale-105"
                        onClick={onClose}
                    >
                        <FiXCircle className="text-xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        disabled={isSaving} // Deshabilitar mientras se guarda
                        className={`flex items-center space-x-2 ${
                            isSaving ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
                        } px-6 py-2 rounded-lg font-semibold text-white transform transition duration-200 ease-in-out hover:scale-105`}
                        onClick={handleSave}
                    >
                        <FiSave className="text-xl" />
                        <span>{isSaving ? "Guardando..." : "Guardar"}</span>
                    </button>
                </div>

                {/* Mensaje de Éxito */}
                {successMessage && (
                    <div className="mt-4 font-semibold text-center text-green-600">
                        {successMessage}
                    </div>
                )}

                {/* Mensaje de Error General */}
                {errors.general && (
                    <div className="mt-4 font-semibold text-center text-red-600">
                        {errors.general}
                    </div>
                )}
            </div>
        </div>
    );
};

InstructionsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    newInstruction: PropTypes.shape({
        id: PropTypes.number,
        points_max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        points_min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
};

export default InstructionsModal;
