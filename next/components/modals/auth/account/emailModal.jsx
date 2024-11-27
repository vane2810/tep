import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

// Modal para cambiar el correo electrónico
const EmailModal = ({ isOpen, onClose, email, onSave }) => {
    const [newEmail, setNewEmail] = useState(email);

    if (!isOpen) return null;

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                <h3 className="mb-4 font-bold text-2xl text-center">Cambiar Correo Electrónico</h3>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-gray-700">Nuevo Correo Electrónico</label>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="border-gray-300 focus:border-purple-500 p-2 border rounded-lg w-full focus:outline-none"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 mr-2 px-4 py-2 rounded-lg font-semibold text-white transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(newEmail)}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white transition"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;