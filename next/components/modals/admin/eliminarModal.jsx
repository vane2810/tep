import React, { useState } from 'react';
import { FiTrash2, FiXCircle } from 'react-icons/fi'; // Usar iconos

export default function ModalEliminarUsuario({ onClose, usuario }) {
  const [mensaje, setMensaje] = useState('');

  const handleEliminar = async () => {
    if (!usuario || !usuario.id) {
      setMensaje('Error: Usuario no válido');
      return;
    }
    console.log('Usuario a eliminar:', usuario);
    try {
      const response = await fetch(`http://localhost:3001/api/users/${usuario.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMensaje('Usuario eliminado exitosamente');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (response.status === 404) {
        setMensaje('Error: Usuario no encontrado');
      } else {
        const errorData = await response.text();
        setMensaje(`Error: ${errorData || 'No se pudo eliminar el usuario'}`);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setMensaje('Error al eliminar el usuario');
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="relative bg-white shadow-2xl p-8 rounded-lg w-full max-w-md">
        <h2 className="flex items-center mb-4 font-bold text-2xl text-red-600">
          <FiTrash2 className="mr-2" /> Eliminar Cuenta de {usuario?.name}
        </h2>
        <p className="mb-6 text-gray-600">
          ¿Estás seguro de que deseas eliminar a <span className="font-bold">{usuario?.name}</span>? Esta acción no se puede deshacer.
        </p>
        {mensaje && (
          <div
            className={`p-3 mb-4 rounded text-center font-semibold text-white transition-all duration-300 ${
              mensaje.includes('exitosamente') ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {mensaje}
          </div>
        )}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded font-bold text-gray-700 transform transition-transform hover:-translate-y-1 duration-200"
            onClick={onClose}
          >
            <FiXCircle /> Cancelar
          </button>
          <button
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold text-white transform transition-transform hover:-translate-y-1 duration-200"
            onClick={handleEliminar}
          >
            <FiTrash2 /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
