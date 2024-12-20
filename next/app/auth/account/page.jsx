// Configuración de la cuenta
"use client";
import React, { useState, useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { SeparadorMorado } from "@/components/separador";
import Volver from "@/components/elements/botonVolver";
import { FaUser, FaKey, FaEnvelope, FaEdit, FaInfoCircle, FaAward, FaUserShield, FaCogs, FaTrash } from "react-icons/fa";
import ModalEditarUsuario from "@/components/modals/auth/account/datosModal"; // Modal de edición de datos
import EmailModal from "@/components/modals/auth/account/emailModal"; // Modal de editar email
import PasswordModal from "@/components/modals/auth/account/passwordModal"; // Modal de editar contraseña
import DeleteModal from "@/components/modals/auth/account/deleteModal"; // Modal de eliminar cuenta
import useSession from "@/hooks/useSession"; // Hook de sesión para obtener la data del usuario

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showInfo, setShowInfo] = useState(false);
  const [isEditingEmailModalOpen, setIsEditingEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para abrir/cerrar el modal de edición
  const { session } = useSession(); // Obtención de la sesión

  // Datos de usuario obtenidos desde la sesión
  const userData = {
    nombre: session?.name || "-", // Si no hay nombre, mostrar guion
    apellido: session?.lastname || "-", // Si no hay apellido, mostrar guion
    nivel: session?.level?.name || "-", // Si no hay nivel, mostrar guion
    rol: session?.role || "-", // Si no hay rol, mostrar guion
    fotoPerfil: session?.character?.imageUrl || "/img/personajes/estudiante/maomao.webp", // Foto por defecto
    email: session?.email || "-", // Si no hay correo, mostrar guion
  };

  // Ruta de regreso dependiendo del rol del usuario
  const volverHref = session?.role === "estudiante" ? `/niveles/nivel${session.nivel}` : "/";

  return (
    <PrivateRoute>
      <main className="bg-gray-50">
        <SeparadorMorado />
        <Volver href={volverHref} img="/img/home/regresar/morado.webp" />
        <div className="flex flex-col items-center mb-8 p-4 min-h-screen yagora">
          <div className="flex flex-col items-center mt-2 mb-4 text-center">
            <h2 className="font-bold text-4xl text-purple-800 sm:text-5xl super">
              CENTRO DE CONFIGURACIÓN
            </h2>
            <img
              src="/img/personajes/starly/starly_admin.webp"
              alt="Bienvenida"
              className="mt-4 w-40 h-36 animate-float"
            />
          </div>
          <div className="flex md:flex-row flex-col mt-2 w-full max-w-5xl">
            <div className="bg-white shadow-lg mt-4 md:mt-0 md:mr-4 p-6 rounded-lg w-full md:w-1/2 self-start">
              <ul className="space-y-4">
                <li>
                  <button
                    className={`w-full text-left py-2 px-4 text-lg font-semibold flex items-center transition ${activeTab === "personal" ? "text-purple-500 border-l-4 border-purple-500" : "text-gray-500"}`}
                    onClick={() => setActiveTab("personal")}
                  >
                    <FaUser className="mr-2" /> Datos Personales
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left py-2 px-4 text-lg font-semibold flex items-center transition ${activeTab === "account" ? "text-purple-500 border-l-4 border-purple-500" : "text-gray-500"}`}
                    onClick={() => setActiveTab("account")}
                  >
                    <FaKey className="mr-2" /> Datos de la Cuenta
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left py-2 px-4 text-lg font-semibold flex items-center transition ${activeTab === "advanced" ? "text-purple-500 border-l-4 border-purple-500" : "text-gray-500"}`}
                    onClick={() => setActiveTab("advanced")}
                  >
                    <FaCogs className="mr-2" /> Configuraciones Avanzadas
                  </button>
                </li>
              </ul>
            </div>

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
                        className="shadow-md mb-6 rounded-lg w-28 h-28"
                      />
                      <div className="gap-x-8 gap-y-4 grid grid-cols-1 sm:grid-cols-2 ml-12 w-full">
                        <div className="flex items-center">
                          <FaUser className="mr-3 text-purple-500 text-xl" />
                          <p className="font-semibold text-lg">
                            Nombre: <span className="text-gray-600">{userData.nombre}</span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-3 text-purple-500 text-xl" />
                          <p className="font-semibold text-lg">
                            Apellido: <span className="text-gray-600">{userData.apellido}</span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <FaAward className="mr-3 text-purple-500 text-xl" />
                          <p className="font-semibold text-lg">
                            Nivel: <span className="text-gray-600">{userData.nivel}</span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <FaUserShield className="mr-3 text-purple-500 text-xl" />
                          <p className="font-semibold text-lg">
                            Rol: <span className="text-gray-600">{userData.rol}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end w-full">
                      <button
                        onClick={() => setIsEditModalOpen(true)} // Cambia el estado a 'true'
                        className="flex items-center bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold text-white transition"
                      >
                        <FaEdit className="mr-2 text-xl" /> Editar Información
                      </button>

                      <ModalEditarUsuario
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)} // Cierra el modal
                        usuario={userData} // Pasas los datos del usuario al modal
                      />

                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div className="w-full">
                  <div className="relative flex justify-center items-center mb-4">
                    <h3 className="font-bold text-2xl text-center sm:text-3xl">Datos de la Cuenta</h3>
                    <FaInfoCircle
                      className="ml-2 text-purple-500 hover:text-purple-700 transition cursor-pointer"
                      onClick={() => setShowInfo(!showInfo)}
                    />
                    {showInfo && (
                      <div className="top-full z-10 absolute border-gray-300 bg-white shadow-lg mt-2 p-4 border rounded-lg w-64">
                        <p className="text-gray-700 text-sm">
                          Aquí puedes modificar tus datos de autenticación. ¡Sé cuidadoso con tus acciones!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-white shadow-md p-6 rounded-lg w-full">
                    <div className="flex items-center mb-6">
                      <FaEnvelope className="mr-3 text-purple-500 text-xl" />
                      <p className="font-semibold text-lg">
                        Correo Electrónico: <span className="mr-2 text-gray-500">{userData.email}</span>
                      </p>
                      <button
                        onClick={() => setIsEditingEmailModalOpen(true)} // Abrimos el modal de Email
                        className="bg-transparent hover:bg-purple-100 px-2 py-1 rounded-md font-semibold text-purple-600 transition"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                    </div>
                    <div className="flex items-center mb-6">
                      <FaKey className="mr-3 text-purple-500 text-xl" />
                      <p className="font-semibold text-lg">Contraseña:</p>
                      <button
                        className="flex items-center bg-yellow-500 hover:bg-yellow-600 ml-4 px-4 py-2 rounded-lg font-semibold text-white transition"
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
                    <FaInfoCircle
                      className="ml-2 text-purple-500 hover:text-purple-700 transition cursor-pointer"
                      onClick={() => setShowInfo(!showInfo)}
                    />
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

        {/* Modales */}
        <EmailModal
          isOpen={isEditingEmailModalOpen}
          onClose={() => setIsEditingEmailModalOpen(false)}
        />
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
        <ModalEditarUsuario
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          usuario={userData} // Pasamos los datos del usuario al modal
        />
        <SeparadorMorado />
      </main>
    </PrivateRoute>
  );
};

export default AccountSettings;
