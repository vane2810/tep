"use client";
import React, { useState, useEffect } from 'react';
import ModalEliminarUsuario from '@/components/modals/admin/eliminarModal';
import ModalAgregarUsuario from '@/components/modals/admin/crearModal';
import Link from 'next/link';
import Volver from '@/components/botonVolver';
import { FaPlus, FaTrash, FaUserEdit, FaUser } from 'react-icons/fa';
import { MdOutlinePersonSearch } from 'react-icons/md';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabSeleccionada, setTabSeleccionada] = useState('estudiante');

  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/read-users`);

        if (!response.ok) {
          throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const usuariosConRol = data.map(usuario => ({
            ...usuario,
            rol: usuario.role ? usuario.role.toLowerCase() : 'sin-rol'
          }));
          setUsuarios(usuariosConRol);
        } else {
          console.error('La respuesta no es un array:', data);
          setUsuarios([]);
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando usuarios...</div>;
  }

  const abrirModalEliminar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalEliminar(true);
  };

  const abrirModalAgregar = () => {
    setModalAgregar(true);
  };

  const usuariosFiltrados = usuarios.filter(usuario => usuario.rol === tabSeleccionada);

  return (
    <div className="mx-auto p-6 container">
      <Volver href='/admin' />
      <h1 className="my-10 font-bold text-4xl text-center">Gestión de Usuarios</h1>

      {/* Botón para agregar un nuevo usuario */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 shadow-md px-5 py-3 rounded font-bold text-white transition duration-300 ease-in-out"
          onClick={abrirModalAgregar}
        >
          <FaPlus /> Agregar Usuario
        </button>
      </div>

      {/* Pestañas para seleccionar el rol */}
      <div className="flex justify-center mb-10">
        {['estudiante', 'docente', 'padre'].map((rol) => (
          <button
            key={rol}
            className={`flex items-center gap-2 px-5 py-3 mx-2 rounded font-bold transition duration-300 ease-in-out ${tabSeleccionada === rol ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            onClick={() => setTabSeleccionada(rol)}
          >
            <FaUser /> {rol.charAt(0).toUpperCase() + rol.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabla de usuarios filtrados */}
      <div className="overflow-x-auto">
        <table className="bg-white shadow-md rounded-lg min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 border-b-2 text-left">ID</th>
              <th className="px-6 py-4 border-b-2 text-left">Nombre</th>
              <th className="px-6 py-4 border-b-2 text-left">Correo electrónico</th>
              {tabSeleccionada === 'estudiante' && <th className="px-6 py-4 border-b-2 text-left">Nivel</th>}
              {tabSeleccionada === 'padre' && <th className="px-6 py-4 border-b-2 text-left">Número de Hijos</th>}
              {tabSeleccionada === 'docente' && <th className="px-6 py-4 border-b-2 text-left">Número de Estudiantes</th>}
              <th className="px-6 py-4 border-b-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                  <td className="px-6 py-4 border-b">{usuario.id}</td>
                  <td className="px-6 py-4 border-b">{usuario.name}</td>
                  <td className="px-6 py-4 border-b">{usuario.email}</td>
                  {tabSeleccionada === 'estudiante' && <td className="px-6 py-4 border-b">{usuario.levelId}</td>}
                  {tabSeleccionada === 'padre' && <td className="px-6 py-4 border-b">{usuario.numeroHijos}</td>}
                  {tabSeleccionada === 'docente' && <td className="px-6 py-4 border-b">{usuario.numeroEstudiantes}</td>}
                  <td className="flex gap-3 px-6 py-4 border-b">
                    <Link href={`/admin/users/${usuario.id}`} className="flex items-center gap-2 bg-green-500 hover:bg-green-700 shadow-md px-3 py-2 rounded font-bold text-white transition duration-300 ease-in-out">
                      <FaUserEdit /> Perfil
                    </Link>
                    <button
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-700 shadow-md px-3 py-2 rounded font-bold text-white transition duration-300 ease-in-out"
                      onClick={() => abrirModalEliminar(usuario)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">No se encontraron usuarios.</td>
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
  );
}
