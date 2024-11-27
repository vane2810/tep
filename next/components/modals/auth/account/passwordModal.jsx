import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaKey, FaEye, FaEyeSlash, FaExclamationTriangle, FaKey as FaKeyTitle } from "react-icons/fa";

// Modal para cambiar la contraseña
const PasswordModal = ({ isOpen, onClose, onSave }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleSave = () => {
        if (newPassword.length < 8) {
            setErrorMessage("La nueva contraseña debe tener al menos 8 caracteres.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("La confirmación de la contraseña no coincide con la nueva contraseña.");
            return;
        }
        setErrorMessage("");
        setShowConfirmationModal(true);
    };

    const handleConfirmSave = () => {
        onSave(currentPassword, newPassword, confirmNewPassword);
        setShowConfirmationModal(false);
    };

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
                <h3 className="flex justify-center items-center mb-4 font-bold text-2xl text-center">
                    <FaKeyTitle className="mr-2" /> Cambiar Contraseña
                </h3>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-gray-700">Contraseña Actual</label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border-gray-300 focus:border-purple-500 p-2 border rounded-lg w-full focus:outline-none"
                        />
                        <button
                            type="button"
                            className="top-3 right-3 absolute text-gray-600"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-gray-700">Nueva Contraseña</label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border-gray-300 focus:border-purple-500 p-2 border rounded-lg w-full focus:outline-none"
                        />
                        <button
                            type="button"
                            className="top-3 right-3 absolute text-gray-600"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-gray-700">Confirmar Nueva Contraseña</label>
                    <div className="relative">
                        <input
                            type={showConfirmNewPassword ? "text" : "password"}
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="border-gray-300 focus:border-purple-500 p-2 border rounded-lg w-full focus:outline-none"
                        />
                        <button
                            type="button"
                            className="top-3 right-3 absolute text-gray-600"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        >
                            {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                {errorMessage && (
                    <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>
                )}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 mr-2 px-4 py-2 rounded-lg font-semibold text-white transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white transition"
                    >
                        Guardar
                    </button>
                </div>
            </div>

            {showConfirmationModal && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm text-center">
                        <div className="flex justify-center items-center mb-4">
                            <FaExclamationTriangle className="text-4xl text-yellow-500" />
                        </div>
                        <h4 className="mb-4 font-bold text-xl">¿Confirmar cambio de contraseña?</h4>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="bg-gray-500 hover:bg-gray-600 mr-2 px-4 py-2 rounded-lg font-semibold text-white transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmSave}
                                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold text-white transition"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

PasswordModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default PasswordModal;
