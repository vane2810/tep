import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
                <h3 className="mb-4 font-bold text-xl">Eliminar Cuenta</h3>
                <p className="mb-6 text-gray-600">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-semibold text-gray-800 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-white transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
