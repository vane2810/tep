import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiX, FiFileText, FiSave, FiXCircle } from "react-icons/fi";

const InstructionsModal = ({ isOpen, onClose, onSave, newInstruction, onInputChange }) => {
    const [errors, setErrors] = useState({}); // Estado para manejar errores

    // Inicializa el estado de errores vacío cuando el modal se abre de nuevo
    useEffect(() => {
        if (isOpen) {
            setErrors({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Función para manejar la carga de datos y guardado
    const handleSave = async () => {
        // Validar que los campos obligatorios no estén vacíos
        const validationErrors = {};
        if (
            newInstruction?.points_max === undefined ||
            newInstruction.points_max === null ||
            newInstruction.points_max === ""
        ) {
            validationErrors.points_max = "Los puntos máximos son obligatorios.";
        }
        if (
            newInstruction?.points_min === undefined ||
            newInstruction.points_min === null ||
            newInstruction.points_min === ""
        ) {
            validationErrors.points_min = "Los puntos mínimos son obligatorios.";
        }

        // Si hay errores, establecer el estado de errores y salir de la función
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Llamar a la función onSave con todos los datos de los puntos
        await onSave({
            ...newInstruction,
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
                    {newInstruction?.id ? "Editar Puntos Máximos y Mínimos" : "Agregar Puntos Máximos y Mínimos"}
                </h2>

                {/* Campo de Puntos Máximos con Icono y Asterisco Rojo */}
                <div className="relative mb-4">
                    <FiFileText className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="number"
                        name="points_max"
                        placeholder="Puntos Máximos *"
                        value={newInstruction?.points_max || ''}
                        onChange={(e) => {
                            onInputChange(e);
                            setErrors((prev) => ({ ...prev, points_max: "" })); // Limpiar error al escribir
                        }}
                        className={`border p-3 pl-10 rounded-lg focus:ring-2 w-full focus:outline-none ${
                            errors.points_max ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                    />
                    {errors.points_max && <p className="mt-1 text-red-500 text-sm">{errors.points_max}</p>}
                </div>

                {/* Campo de Puntos Mínimos con Icono y Asterisco Rojo */}
                <div className="relative mb-6">
                    <FiFileText className="top-3 left-3 absolute text-gray-400" />
                    <input
                        type="number"
                        name="points_min"
                        placeholder="Puntos Mínimos *"
                        value={newInstruction?.points_min || ''}
                        onChange={(e) => {
                            onInputChange(e);
                            setErrors((prev) => ({ ...prev, points_min: "" })); // Limpiar error al escribir
                        }}
                        className={`border p-3 pl-10 rounded-lg focus:ring-2 w-full focus:outline-none ${
                            errors.points_min ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                        }`}
                    />
                    {errors.points_min && <p className="mt-1 text-red-500 text-sm">{errors.points_min}</p>}
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
