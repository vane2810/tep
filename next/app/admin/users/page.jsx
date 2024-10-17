"use client";
import React, { useState, useEffect } from 'react';
import ModalEliminarUsuario from '@/components/modals/admin/eliminarModal';
import ModalAgregarUsuario from '@/components/modals/admin/crearModal';
import Link from 'next/link';
import Volver from '@/components/botonVolver';

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
    return <div>Cargando usuarios...</div>;
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
    <div className="mx-auto p-4 container">
      <Volver href='/admin'/>
      <h1 className="mb-6 font-bold text-4xl text-center">Gestión de Usuarios</h1>

      {/* Botón para agregar un nuevo usuario */}
      <div className="flex justify-end mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
          onClick={abrirModalAgregar}
        >
          Agregar nuevo usuario
        </button>
      </div>

      {/* Pestañas para seleccionar el rol */}
      <div className="flex justify-center mb-8">
        {['estudiante', 'docente', 'padre'].map((rol) => (
          <button
            key={rol}
            className={`px-4 py-2 mx-1 rounded font-bold ${tabSeleccionada === rol ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setTabSeleccionada(rol)}
          >
            {rol.charAt(0).toUpperCase() + rol.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabla de usuarios filtrados */}
      <table className="bg-white shadow-lg rounded-lg min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2">ID</th>
            <th className="px-4 py-2 border-b-2">Nombre</th>
            <th className="px-4 py-2 border-b-2">Correo electronico</th>
            {tabSeleccionada === 'estudiante' && <th className="px-4 py-2 border-b-2">Nivel</th>}
            {tabSeleccionada === 'padre' && <th className="px-4 py-2 border-b-2">Número de Hijos</th>}
            {tabSeleccionada === 'docente' && <th className="px-4 py-2 border-b-2">Número de Estudiantes</th>}
            <th className="px-4 py-2 border-b-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td className="px-4 py-2 border-b">{usuario.id}</td>
                <td className="px-4 py-2 border-b">{usuario.name}</td>
                <td className="px-4 py-2 border-b">{usuario.email}</td>
                {tabSeleccionada === 'estudiante' && <td className="px-4 py-2 border-b">{usuario.levelId}</td>}
                {tabSeleccionada === 'padre' && <td className="px-4 py-2 border-b">{usuario.numeroHijos}</td>}
                {tabSeleccionada === 'docente' && <td className="px-4 py-2 border-b">{usuario.numeroEstudiantes}</td>}
                <td className="flex gap-2 px-4 py-2 border-b">
                  <button className="bg-green-500 hover:bg-green-700 px-2 py-1 rounded font-bold text-white">
                    <Link href={`/admin/users/${usuario.id}`}>
                      Perfil
                    </Link>
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded font-bold text-white"
                    onClick={() => abrirModalEliminar(usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>

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
