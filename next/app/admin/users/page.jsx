// Importación de hooks y dependencias necesarias
"use client";
import React, { useState, useEffect } from "react";
import ModalEliminarUsuario from "@/components/modals/admin/eliminarModal";
import ModalAgregarUsuario from "@/components/modals/admin/crearModal";
import Link from "next/link";
import Volver from "@/components/elements/botonVolver";
import {FaUserPlus, FaTrash, FaUserEdit, FaExclamationTriangle,} from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import Loading from "@/components/elements/loading";
import useSession from '@/hooks/useSession';
import { SeparadorAzul } from "@/components/separador";
import MensajePermiso from '@/components/menssages/mensajePermiso';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabSeleccionada, setTabSeleccionada] = useState("estudiante");
  const { session } = useSession();

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Función para obtener la lista de usuarios
  const obtenerUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/users/read-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
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

  // Obtener usuarios al cargar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Función para abrir el modal de eliminación
  const abrirModalEliminar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalEliminar(true);
  };

  // Función para cerrar el modal y actualizar usuarios después de la eliminación
  const cerrarModalEliminar = (usuarioEliminado) => {
    setModalEliminar(false);
    if (usuarioEliminado) {
      // Actualiza la lista de usuarios excluyendo el usuario eliminado
      setUsuarios((usuarios) =>
        usuarios.filter((usuario) => usuario.id !== usuarioEliminado.id)
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // Verificar si el usuario tiene permiso para acceder
  if (!session || session.role !== 'admin') {
    return <MensajePermiso />;
  }

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
                tabSeleccionada === rol ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setTabSeleccionada(rol)}
            >
              <BiUser />
              {rol === "sin-rol" ? "Sin Rol" : rol.charAt(0).toUpperCase() + rol.slice(1)}
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
                <th className="px-6 py-4 border-b-2 text-center">Correo electrónico</th>
                <th className="px-6 py-4 border-b-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-100 transition duration-200">
                    <td className="px-6 py-4 border-b text-center align-middle">{usuario.id}</td>
                    <td className="px-6 py-4 border-b text-center align-middle">{usuario.name}</td>
                    <td className="px-6 py-4 border-b text-center align-middle">{usuario.lastname || "-"}</td>
                    <td className="px-6 py-4 border-b text-center align-middle">{usuario.email}</td>
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
                  <td colSpan="5" className="py-8 font-bold text-center text-red-500">
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
            onClose={(success) => {
              cerrarModalEliminar(success ? usuarioSeleccionado : null);
            }}
          />
        )}

        {modalAgregar && (
          <ModalAgregarUsuario onClose={() => setModalAgregar(false)} />
        )}
      </div>
      <SeparadorAzul />
    </main>
  );
}
