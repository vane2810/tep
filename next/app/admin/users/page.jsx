"use client";
import React, { useState, useEffect } from "react";
import ModalEliminarUsuario from "@/components/modals/admin/eliminarModal";
import ModalAgregarUsuario from "@/components/modals/admin/crearModal";
import Link from "next/link";
import Volver from "@/components/elements/botonVolver";
import {
  FaUserPlus,
  FaTrash,
  FaUserEdit,
  FaExclamationTriangle,
} from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import Loading from "@/components/elements/loading";
import { SeparadorAzul } from "@/components/separador";

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabSeleccionada, setTabSeleccionada] = useState("estudiante");

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/read-users`);

        if (!response.ok) {
          throw new Error(
            `Error en la respuesta de la API: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const usuariosConRol = data.map((usuario) => ({
            ...usuario,
            rol: usuario.role ? usuario.role.toLowerCase() : "sin-rol",
          }));
          setUsuarios(usuariosConRol);
        } else {
          console.error("La respuesta no es un array:", data);
          setUsuarios([]);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const abrirModalEliminar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalEliminar(true);
  };

  const abrirModalAgregar = () => {
    setModalAgregar(true);
  };

  const usuariosFiltrados =
    tabSeleccionada === "sin-rol"
      ? usuarios.filter((usuario) => usuario.rol === "sin-rol")
      : usuarios.filter((usuario) => usuario.rol === tabSeleccionada);

  return (
    <main className="yagora">
      <SeparadorAzul />
      <div className="mx-auto mb-14 px-6 container">
        <Volver href="/admin" />
        <h1 className="mb-8 font-bold text-5xl text-blue-800 text-center">
          Gestión de Usuarios
        </h1>

        {/* Botón para agregar un nuevo usuario */}
        <div className="flex justify-end mb-8">
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 shadow-md hover:shadow-lg px-4 py-2 rounded-xl font-bold text-white transition duration-300"
            onClick={abrirModalAgregar}
          >
            <FaUserPlus />
            Agregar nuevo usuario
          </button>
        </div>

        {/* Pestañas para seleccionar el rol */}
        <div className="flex justify-center mb-12">
          {["estudiante", "docente", "padre", "sin-rol"].map((rol) => (
            <button
              key={rol}
              className={`flex items-center gap-2 px-6 py-3 mx-2 rounded-xl font-bold shadow-md transition duration-300 ${
                tabSeleccionada === rol
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setTabSeleccionada(rol)}
            >
              <BiUser />
              {rol === "sin-rol"
                ? "Sin Rol"
                : rol.charAt(0).toUpperCase() + rol.slice(1)}
            </button>
          ))}
        </div>

        {/* Tabla de usuarios filtrados */}
        <div className="overflow-x-auto">
          <table className="bg-white shadow-lg rounded-lg min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 border-b-2 text-center">ID</th>
                <th className="px-6 py-4 border-b-2 text-center">Nombre</th>
                <th className="px-6 py-4 border-b-2 text-center">Apellido</th>
                <th className="px-6 py-4 border-b-2 text-center">
                  Correo electrónico
                </th>
                {tabSeleccionada === "estudiante" && (
                  <th className="px-6 py-4 border-b-2 text-center">Nivel</th>
                )}
                {tabSeleccionada === "padre" && (
                  <th className="px-6 py-4 border-b-2 text-center">
                    Número de Hijos
                  </th>
                )}
                {tabSeleccionada === "docente" && (
                  <th className="px-6 py-4 border-b-2 text-center">
                    Número de Estudiantes
                  </th>
                )}
                <th className="px-6 py-4 border-b-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="px-6 py-4 border-b text-center align-middle">
                      {usuario.id}
                    </td>
                    <td className="px-6 py-4 border-b text-center align-middle">
                      {usuario.name}
                    </td>
                    <td className="px-6 py-4 border-b text-center align-middle">
                      {usuario.lastname || "-"}
                    </td>
                    <td className="px-6 py-4 border-b text-center align-middle">
                      {usuario.email}
                    </td>
                    {tabSeleccionada === "estudiante" && (
                      <td className="px-6 py-4 border-b text-center align-middle">
                        {usuario.levelId}
                      </td>
                    )}
                    {tabSeleccionada === "padre" && (
                      <td className="px-6 py-4 border-b text-center align-middle">
                        {usuario.numeroHijos || "N/A"}
                      </td>
                    )}
                    {tabSeleccionada === "docente" && (
                      <td className="px-6 py-4 border-b text-center align-middle">
                        {usuario.numeroEstudiantes || "N/A"}
                      </td>
                    )}
                    <td className="flex justify-center items-center gap-2 px-6 py-4 border-b">
                      <Link href={`/admin/users/${usuario.id}`}>
                        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 shadow-md px-3 py-2 rounded-full font-bold text-white transition duration-300">
                          <FaUserEdit className="text-lg" />
                        </button>
                      </Link>
                      <button
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 shadow-md px-3 py-2 rounded-full font-bold text-white transition duration-300"
                        onClick={() => abrirModalEliminar(usuario)}
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 font-bold text-center text-red-500"
                  >
                    <FaExclamationTriangle className="inline-block mr-2 text-2xl" />
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modales */}
        {modalEliminar && (
          <ModalEliminarUsuario
            usuario={usuarioSeleccionado}
            onClose={() => setModalEliminar(false)}
          />
        )}

        {modalAgregar && (
          <ModalAgregarUsuario
            onClose={() => setModalAgregar(false)}
          />
        )}
      </div>
      <SeparadorAzul />
    </main>
  );
}
