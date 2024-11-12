// components/modals/admin/contenido/DeleteModal.jsx
import React from "react";
import PropTypes from "prop-types";
import { FiAlertTriangle, FiXCircle, FiTrash } from "react-icons/fi";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 yagora">
            <div className="relative bg-white shadow-lg p-8 rounded-lg w-full max-w-sm text-center">

                {/* Icono de advertencia y pregunta como título */}
                <div className="flex flex-col items-center mb-4">
                    <FiAlertTriangle className="mb-4 text-4xl text-red-500" />
                    <h2 className="font-semibold text-2xl text-gray-800">¿Estás seguro de que deseas eliminar este contenido?</h2>
                </div>

                {/* Mensaje de confirmación */}
                <p className="mb-6 text-gray-600">Esta acción no se puede deshacer.</p>

                {/* Botones de acción */}
                <div className="flex justify-around">

                    <button
                        className="flex items-center space-x-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-semibold text-gray-800 transform transition duration-200 ease-in-out hover:scale-105"
                        onClick={onClose}
                    >
                        <FiXCircle className="text-xl" />
                        <span>Cancelar</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold text-white transform transition duration-200 ease-in-out hover:scale-105"
                        onClick={onConfirm}
                    >
                        <FiTrash className="text-xl" />
                        <span>Eliminar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteModal;
