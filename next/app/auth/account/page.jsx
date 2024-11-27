"use client"
import React, { useState } from "react";
import { SeparadorMorado } from "@/components/separador";
import Volver from "@/components/botonVolver";
import { FaUser, FaKey, FaEnvelope, FaEdit, FaInfoCircle, FaAward, FaUserShield, FaCogs, FaTrash } from "react-icons/fa";
import EmailModal from "@/components/modals/auth/account/emailModal";
import PasswordModal from "@/components/modals/auth/account/passwordModal";
import DeleteModal from "@/components/modals/auth/account/deleteModal";

const AccountSettings = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [showInfo, setShowInfo] = useState(false);
    const [isEditingEmailModalOpen, setIsEditingEmailModalOpen] = useState(false);
    const [email, setEmail] = useState("juan.perez@example.com");
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    // Datos ficticios del usuario
    const userData = {
        nombre: "Juan",
        apellido: "Pérez",
        nivel: "Avanzado",
        rol: "Estudiante",
        fotoPerfil: "/img/personajes/starly/starly_explorador.png"
    };

    // Función para manejar el cambio de correo electrónico
    const handleEmailChange = (newEmail) => {
        // Aquí podrías agregar lógica para validar y cambiar el correo electrónico
        setEmail(newEmail);
        setIsEditingEmailModalOpen(false);
    };

    // Función para manejar el cambio de contraseña
    const handlePasswordChange = (currentPassword, newPassword) => {
        // Aquí podrías agregar lógica para validar y cambiar la contraseña
        console.log("Contraseña actual:", currentPassword);
        console.log("Nueva contraseña:", newPassword);
        setIsPasswordModalOpen(false);
    };

    // Función para manejar la eliminación de la cuenta
    const handleDeleteAccount = () => {
        // Aquí puedes realizar la acción de eliminar cuenta
        console.log("Cuenta eliminada");
        setIsDeleteModalOpen(false); // Cierra el modal después de eliminar la cuenta
    };

    return (
        <main className="bg-gray-50">
            <SeparadorMorado />
            <Volver href="/" img="/img/home/regresar/morado.png" className="mb-1" />
            <div className="flex flex-col items-center mb-8 p-4 min-h-screen yagora">
                {/* Título general de la sección de configuración */}
                <div className="flex flex-col items-center mt-2 mb-4 text-center">
                    <h2 className="font-bold text-3xl text-purple-800 sm:text-4xl">¡Bienvenido a tu Centro de Configuración!</h2>
                    <img src="/img/personajes/starly/starly_explorador.png" alt="Bienvenida" className="mt-4 w-28 h-28 animate-float" />
                </div>
                {/* Menú de navegación (pestañas) y contenido */}
                <div className="flex md:flex-row flex-col mt-2 w-full max-w-5xl">
                    {/* Menú de navegación (pestañas) */}
                    <div className="bg-white shadow-lg mt-4 md:mt-0 md:mr-4 p-6 rounded-lg w-full md:w-1/2 self-start">

                        <ul className="space-y-4">
                            <li>
                                <button
                                    className={`w-full text-left py-2 px-4 text-lg font-semibold flex items-center transition ${activeTab === "personal" ? "text-purple-500 border-l-4 border-purple-500" : "text-gray-500"
                                        }`}
                                    onClick={() => setActiveTab("personal")}
                                >
                                    <FaUser className="mr-2" /> Datos Personales
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`w-full text-left py-2 px-4 text-lg font-semibold flex items-center transition ${activeTab === "account" ? "text-purple-500 border-l-4 border-purple-500" : "text-gray-500"
                                        }`}
                                    onClick={() => setActiveTab("account")}
                                >
                                    <FaKey className="mr-2" /> Datos de la Cuenta
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`w-full text-left py-2 px-4 text-lg font-semibold flex items-center transition ${activeTab === "advanced" ? "text-purple-500 border-l-4 border-purple-500" : "text-gray-500"
                                        }`}
                                    onClick={() => setActiveTab("advanced")}
                                >
                                    <FaCogs className="mr-2" /> Configuraciones Avanzadas
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contenido de cada pestaña */}
                    <div className="flex flex-col items-start bg-white shadow-lg mt-4 md:mt-0 p-6 sm:p-8 rounded-lg w-full md:w-3/2">
                        {activeTab === "personal" && (
                            <div className="w-full">
                                <div className="relative flex justify-center items-center mb-4">
                                    <h3 className="font-bold text-2xl text-center sm:text-3xl">Datos Personales</h3>
                                    <FaInfoCircle
                                        className="ml-2 text-purple-500 hover:text-purple-700 transition cursor-pointer"
                                        onClick={() => setShowInfo(!showInfo)}
                                    />
                                    {showInfo && (
                                        <div className="top-full z-10 absolute border-gray-300 bg-white shadow-lg mt-2 p-4 border rounded-lg w-64">
                                            <p className="text-gray-700 text-sm">
                                                ¡Hola, bienvenido a la sección de Datos Personales! Aquí puedes modificar tu información personal.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-white shadow-md p-6 rounded-lg w-full">
                                    <div className="flex flex-col items-center mb-6">
                                        <img
                                            src={userData.fotoPerfil}
                                            alt="Foto de Perfil"
                                            className="border-4 border-purple-500 shadow-md mb-6 rounded-full w-32 h-32"
                                        />
                                        <div className="gap-x-8 gap-y-4 grid grid-cols-1 sm:grid-cols-2 ml-12 w-full">
                                            <div className="flex items-center">
                                                <FaUser className="mr-3 text-purple-500 text-xl" />
                                                <p className="font-semibold text-lg">Nombre: <span className="text-gray-600">{userData.nombre}</span></p>
                                            </div>
                                            <div className="flex items-center">
                                                <FaUser className="mr-3 text-purple-500 text-xl" />
                                                <p className="font-semibold text-lg">Apellido: <span className="text-gray-600">{userData.apellido}</span></p>
                                            </div>
                                            <div className="flex items-center">
                                                <FaAward className="mr-3 text-purple-500 text-xl" />
                                                <p className="font-semibold text-lg">Nivel: <span className="text-gray-600">{userData.nivel}</span></p>
                                            </div>
                                            <div className="flex items-center">
                                                <FaUserShield className="mr-3 text-purple-500 text-xl" />
                                                <p className="font-semibold text-lg">Rol: <span className="text-gray-600">{userData.rol}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end w-full">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold text-white transition"
                                        >
                                            <FaEdit className="mr-2 text-xl" /> Editar Información
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "account" && (
                            <div className="w-full">
                                <div className="relative flex justify-center items-center mb-4">
                                    <h3 className="font-bold text-2xl text-center sm:text-3xl">Datos de la Cuenta</h3>
                                    <FaInfoCircle className="ml-2 text-purple-500 hover:text-purple-700 transition cursor-pointer" onClick={() => setShowInfo(!showInfo)} />
                                    {showInfo && (
                                        <div className="top-full z-10 absolute border-gray-300 bg-white shadow-lg mt-2 p-4 border rounded-lg w-64">
                                            <p className="text-gray-700 text-sm">
                                                Aquí puedes modificar tus datos de autenticación. ¡Se cuidadoso con tus acciones!
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-white shadow-md p-6 rounded-lg w-full">
                                    <div className="flex items-center mb-6">
                                        <FaEnvelope className="mr-3 text-purple-500 text-xl" />
                                        <p className="font-semibold text-lg">Correo Electrónico: <span className="mr-2 text-gray-500">{email}</span></p>
                                        <button
                                            onClick={() => setIsEditingEmailModalOpen(true)}
                                            className="bg-transparent hover:bg-purple-100 px-2 py-1 rounded-md font-semibold text-purple-600 transition"
                                        >
                                            <FaEdit className="text-lg" />
                                        </button>
                                    </div>
                                    <div className="flex items-center mb-6">
                                        <FaKey className="mr-3 text-purple-500 text-xl" />
                                        <p className="font-semibold text-lg">Contraseña:</p>
                                        <button className="flex items-center bg-yellow-500 hover:bg-yellow-600 ml-4 px-4 py-2 rounded-lg font-semibold text-white transition"
                                            onClick={() => setIsPasswordModalOpen(true)}
                                        >
                                            <FaKey className="mr-2 text-lg" /> Cambiar Contraseña
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "advanced" && (
                            <div className="w-full">
                                <div className="relative flex justify-center items-center mb-4">
                                    <h3 className="font-bold text-2xl text-center sm:text-3xl">Configuraciones Avanzadas</h3>
                                    <FaInfoCircle className="ml-2 text-purple-500 hover:text-purple-700 transition cursor-pointer" onClick={() => setShowInfo(!showInfo)} />
                                    {showInfo && (
                                        <div className="top-full z-10 absolute border-gray-300 bg-white shadow-lg mt-2 p-4 border rounded-lg w-64">
                                            <p className="text-gray-700 text-sm">
                                                En esta sección puedes realizar acciones avanzadas, como eliminar tu cuenta. ¡Ten cuidado, estas acciones son permanentes!
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-white shadow-md p-6 rounded-lg w-full">
                                    <div className="flex items-center mb-6">
                                        <FaTrash className="mr-3 text-red-500 text-xl" />
                                        <button
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="flex items-center bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold text-white transition"
                                        >
                                            Eliminar Cuenta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modales para cambiar correo electrónico y contraseña */}
            <EmailModal
                isOpen={isEditingEmailModalOpen}
                onClose={() => setIsEditingEmailModalOpen(false)}
                email={email}
                onSave={handleEmailChange}
            />
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSave={handlePasswordChange}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccount}
            />
            <SeparadorMorado />
        </main>
    );
};

export default AccountSettings; 