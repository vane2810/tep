"use client"
import React, { useState, useEffect } from 'react';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulación de obtención de usuarios desde el backend
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        // Simular llamada a la API
        const data = await fetch(`http://localhost:3001/api/users/read-users`); // Reemplaza con tu ruta de API
        const usuarios = await data.json();
        setUsuarios(usuarios);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="mx-auto mt-10 p-4 container">
      <h1 className="mb-6 font-bold text-4xl text-center">Gestión de Usuarios</h1>

      <table className="bg-white shadow-lg rounded-lg min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2">Nombre</th>
            <th className="px-4 py-2 border-b-2">Correo</th>
            <th className="px-4 py-2 border-b-2">Rol</th>
            <th className="px-4 py-2 border-b-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="px-4 py-2 border-b">{usuario.nombre}</td>
              <td className="px-4 py-2 border-b">{usuario.email}</td>
              <td className="px-4 py-2 border-b">{usuario.rol}</td>
              <td className="flex gap-2 px-4 py-2 border-b">
                <button className="bg-yellow-500 hover:bg-yellow-700 px-2 py-1 rounded font-bold text-white">
                  Editar
                </button>
                <button className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded font-bold text-white">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para agregar un nuevo usuario */}
      <div className="mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white">
          Agregar nuevo usuario
        </button>
      </div>
    </div>
  );
}
